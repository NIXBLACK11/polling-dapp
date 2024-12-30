import { BN, web3 } from '@coral-xyz/anchor';
import { program } from './setup';
import { Connection, SystemProgram } from '@solana/web3.js';
import { SendTransactionOptions } from '@solana/wallet-adapter-base';
import { POLL_TAG, USER_TAG } from '@/constants';

export const initializeUser = async (
    publicKey: web3.PublicKey, 
    sendTransaction: { (transaction: web3.Transaction | web3.VersionedTransaction, connection: Connection, options?: SendTransactionOptions): Promise<web3.TransactionSignature>; (arg0: web3.Transaction, arg1: web3.Connection): any; },
    connection: Connection
) => {
    const [userProfilePDA, _] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(USER_TAG),
            publicKey.toBuffer(),
        ],
        program.programId
    );

    let transactionSignature;

    try {
        const transaction = await program.methods
        .initializeUser()
        .accounts({
            authority: publicKey,
            userProfile: userProfilePDA,
            systemProgram: SystemProgram.programId,
        }).transaction();
    
        transactionSignature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(transactionSignature, 'confirmed');
    } catch(err: any) {
        console.log("User exists already!!")
    }

    let profile;
	try {
		profile = await program.account.userProfile.fetch(userProfilePDA);
        return profile;
	} catch(err: any) {
		return null;
	}
};

export const makePoll = async (
    publicKey: web3.PublicKey,
    sendTransaction: { (transaction: web3.Transaction | web3.VersionedTransaction, connection: web3.Connection, options?: SendTransactionOptions): Promise<web3.TransactionSignature>; (arg0: web3.Transaction, arg1: web3.Connection): any; },
    connection: web3.Connection,
    description: string,
    option1: string,
    option2: string,
    endTime: BN
) => {
    const [userProfilePDA, _a] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(USER_TAG),
            publicKey.toBuffer(),
        ],
        program.programId
    );
    let profile;
	try {
		profile = await program.account.userProfile.fetch(userProfilePDA);
	} catch(err: any) {
		return null;
	}
    const totalPolls = profile.totalPolls;

    const [pollAccountPDA, _b] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(POLL_TAG),
            publicKey.toBuffer(),
            Buffer.from([totalPolls])
        ],
        program.programId
    );
    console.log(pollAccountPDA);

    let transactionSignature;

    try {
        const transaction = await program.methods
            .makePoll(description, option1, option2, endTime)
            .accounts({
                authority: publicKey,
                userProfile: userProfilePDA,
                pollAccount: pollAccountPDA,
                systemProgram: SystemProgram.programId,
            })
            .transaction();

        transactionSignature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(transactionSignature, 'confirmed')
    } catch (err: any) {
        console.error("Error while making poll:", err);
        return null;
    }

    return transactionSignature;
};

export const fetchUser = async (
    publicKey: web3.PublicKey,
) => {
    const [userProfilePDA, _] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(USER_TAG),
            publicKey.toBuffer(),
        ],
        program.programId
    );

    let profile;
	try {
		profile = await program.account.userProfile.fetch(userProfilePDA);
        return profile;
	} catch(err: any) {
		return null;
	}
}

export const fetchUserDetails = async (
    publicKey: web3.PublicKey,
) => {
    const [userProfilePDA, _] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(USER_TAG),
            publicKey.toBuffer(),
        ],
        program.programId
    );

    let profile;
	try {
		profile = await program.account.userProfile.fetch(userProfilePDA);
	} catch(err: any) {
		return null;
	}

    const total_polls = profile.totalPolls;
    let userPollDetails = [];

    for(let idx = 0; idx<total_polls;idx++) {
        const [pollAccountPDA, _b] = web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from(POLL_TAG),
                publicKey.toBuffer(),
                Buffer.from([idx])
            ],
            program.programId
        );

        let pollDetail;
        try {
            pollDetail = await program.account.pollAccount.fetch(pollAccountPDA);
        } catch(err: any) {
            pollDetail = null;
        }

        if (pollDetail) {
            const hasVoted = pollDetail.voters.some(voter => voter.equals(publicKey));
        
            const updatedPollDetail = {
                ...pollDetail,
                polled: hasVoted,
                pollAccountPDA: pollAccountPDA
            };
        
            userPollDetails.push(updatedPollDetail);
        }
    }

    return userPollDetails;
};

export const selectOption = async (
    publicKey: web3.PublicKey,
    sendTransaction: { (transaction: web3.Transaction | web3.VersionedTransaction, connection: web3.Connection, options?: SendTransactionOptions): Promise<web3.TransactionSignature>; (arg0: web3.Transaction, arg1: web3.Connection): any; },
    connection: web3.Connection,
    authority: web3.PublicKey,
    idx: number,
    option: number
) => {
    const [pollAccountPDA, _b] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(POLL_TAG),
            authority.toBuffer(),
            Buffer.from([idx])
        ],
        program.programId
    );

    let transactionSignature;

    try {
        const transaction = await program.methods
            .selectOption(idx, option)
            .accounts({
                authority: publicKey,
                pollAccount: pollAccountPDA,
                systemProgram: SystemProgram.programId,
            })
            .transaction();

        transactionSignature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(transactionSignature, 'confirmed')
    } catch (err: any) {
        console.error("Error while making poll:", err);
        return null;
    }

    return transactionSignature;
}

export const fetchPoll = async (
    publicKey: web3.PublicKey,
    pollAccountPDA: web3.PublicKey
) => {
    let pollDetail;
    try {
        pollDetail = await program.account.pollAccount.fetch(pollAccountPDA);
    } catch(err: any) {
        return null;
    }

    let updatedPollDetail;
    if (pollDetail) {
        const hasVoted = pollDetail.voters.some(voter => voter.equals(publicKey));
    
        updatedPollDetail = {
            ...pollDetail,
            polled: hasVoted,
            pollAccountPDA: pollAccountPDA
        };
    }

    return updatedPollDetail;
}