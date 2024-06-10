import { createMint, Mint, mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
    getKeypairFromFile,
  getExplorerLink, 
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";
const fs = require('fs');


async function createToken() {
    const walletData = fs.readFileSync('./wallet/wallet.json');
    const wallet = JSON.parse(walletData);
    const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
    console.log(`The public key is: `, wallet.publicKey);
  
    console.log(`All the information load. Start creating a new token...`);
    const publicKey = new PublicKey(wallet.publicKey);
    const secretKey = Keypair.fromSecretKey(new Uint8Array(wallet.secretKey));

    const tokenMint = await createMint(connection, secretKey , publicKey, null, 3);
  
    const link = getExplorerLink("address", tokenMint.toString(), "devnet");
    console.log(`✅ Finished! Created token mint: ${link}`);
  }
  
createToken().catch(err => console.error(err));