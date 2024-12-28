import {IdlAccounts, Program} from "@coral-xyz/anchor";
import IDL from "./polling_app.json";
import type { PollingApp } from "./polling_app";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
export const program = new Program(IDL as unknown as PollingApp, { connection,});

export type PollingData = IdlAccounts<PollingApp>['pollAccount'];
