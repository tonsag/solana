import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
const fs = require('fs');

const walletData = fs.readFileSync('./wallet/wallet.json');
const wallet = JSON.parse(walletData);
const connection = new Connection(clusterApiUrl("devnet"));
const publicKey = new PublicKey(wallet.publicKey);

const airdropSignature = await connection.requestAirdrop(publicKey, 2*LAMPORTS_PER_SOL);

console.log(`Airdrop signature: ${airdropSignature}`);