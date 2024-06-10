import {
    getExplorerLink,
    getKeypairFromEnvironment,
  } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl, Keypair } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
const fs = require('fs');


const walletData = fs.readFileSync('./wallet/wallet.json');
const wallet = JSON.parse(walletData);
const sender = Keypair.fromSecretKey(new Uint8Array(wallet.secretKey));
const connection = new Connection(clusterApiUrl("devnet"));

let tokenMintAccountIn = process.argv[2];
let recipientIn = process.argv[3];


const valToTranfesr = 2;

const tokenMintAccount = tokenMintAccountIn ? 
                         new PublicKey(tokenMintAccountIn) : new PublicKey("F3856AzmPMzmj3Q5n4KK9qStiME3Aekbvj1kiGP7EDD7");

const tokenMintATA = new PublicKey("CGvmhww7K1mwSPk4z8JbFNjRYs7DSsQgX1TmCu2Q4eJ5");

const recipient = recipientIn ? 
                new PublicKey(recipientIn) : new PublicKey("8gqxCPGZregyyFSGfusYi6A3uDjcpSQvWPWJDDuguTSo")

console.log(
  ` 🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}\n \
🔑 Loaded sender: ${tokenMintAccount}\n \
🔑 Loaded recipient: ${recipient}`
);

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 3);
const amount = valToTranfesr * MINOR_UNITS_PER_MAJOR_UNITS;

console.log(`💸 Attempting to send ${valToTranfesr} token to ${recipient.toBase58()}...`);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

console.log(
    `🔑 Recipient is: ${destinationTokenAccount.address}\n`
  );
// Transfer the tokens
const signature = await transfer(
  connection,
  sender,
  tokenMintATA,
  destinationTokenAccount.address,
  sender,
  amount
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`✅ Transaction confirmed, explorer link is: \n\n${explorerLink}!\n\n`);