import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
    getKeypairFromFile,
  getExplorerLink, 
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";
const fs = require('fs');


const walletData = fs.readFileSync('./wallet/wallet.json');
const wallet = JSON.parse(walletData);
const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');

const publicKey = new PublicKey(wallet.publicKey);
const user = Keypair.fromSecretKey(new Uint8Array(wallet.secretKey));

let tokenMintIn = process.argv[2];
const tokenMint = tokenMintIn ? tokenMintIn : "F3856AzmPMzmj3Q5n4KK9qStiME3Aekbvj1kiGP7EDD7";

if (!tokenMintIn) {
    console.log(`❗️ No token mint address provided. ❗️\n❗️ Default is: F3856AzmPMzmj3Q5n4KK9qStiME3Aekbvj1kiGP7EDD7 ❗️`);
};

const tokenMintAccount = new PublicKey(tokenMint);

console.log(
    `🔑 Token account mint is: ${tokenMintAccount}`
  );
  
const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      user,
      tokenMintAccount,
      publicKey, 
  );
  
console.log(`🛠  Token Account: ${tokenAccount.address.toBase58()}`);
  
const link = getExplorerLink(
      "address",
      tokenAccount.address.toBase58(),
      "devnet"
    );
    
console.log(`✅ Created token Account: ${link}\nCreating ATA...`);

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 3);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    tokenAccount.address,
    user,
    2222 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link1 = getExplorerLink("transaction", transactionSignature, "devnet");
console.log(`✅ Success! Mint Token Transaction: ${link}`);
