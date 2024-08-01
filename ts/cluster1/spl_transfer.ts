import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("CW3fBWxSVuaTA2GjAEoAhdftgG4F3RS7Caksu9hGR1EY");

// Recipient address
const to = new PublicKey("7wxVFNuK35shzgrF1wjdrTmfkUd3SSkRCXrZqxYjQVDX");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to)

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection, keypair, fromTokenAccount.address, toTokenAccount.address, keypair, 1000);

        console.log(`Transaction successful ${tx}`)

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();