import { web3 } from '@coral-xyz/anchor';
import { program } from './setup';
import { Connection, SystemProgram } from '@solana/web3.js';
import { SendTransactionOptions } from '@solana/wallet-adapter-base';

export const initializeUser = async (publicKey: web3.PublicKey, sendTransaction: { (transaction: web3.Transaction | web3.VersionedTransaction, connection: Connection, options?: SendTransactionOptions): Promise<web3.TransactionSignature>; (arg0: web3.Transaction, arg1: web3.Connection): any; }, connection: Connection) => {
    const USER_PROFILE_SEED = Buffer.from("USER_STATE");

    const [userProfilePDA, _] = web3.PublicKey.findProgramAddressSync(
        [
            USER_PROFILE_SEED,
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

        transactionSignature = await sendTransaction(
            transaction,
            connection
          );
    } catch(err: any) {
        console.log(`Error in creation ${err}`);
    }

    return transactionSignature;
};
