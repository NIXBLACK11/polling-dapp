import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export type Poll = {
    description: string;
    option1: string;
    option2: string;
    endTime: Date;
};

export type PollData = {
    polled: boolean;
    idx: number;
    authority: PublicKey;
    description: string;
    option1: string;
    option1Count: number;
    option2: string;
    option2Count: number;
    winner: number;
    endTime: BN;
    voters: PublicKey[];
}