import wallet from "../hafsah-q3-builders (2).json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("BL9Sz7SVCpXv4K7g5SGBoA6MmU3F1VyreM9ijJPDU3Rt")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint,
            mintAuthority: signer,
        }
        // let accounts: CreateMetadataAccountV3InstructionAccounts = {
        //     ???
        // }


        let data: DataV2Args = {
            name: "My NFT",
            symbol: "NFT",
            uri: "https://arweave.net/123456",
            sellerFeeBasisPoints: 5, // 5%
            creators: null, // No creators
            collection: null, // No collection
            uses: null // No uses
        }
        //     ???
        // }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true, // Metadata account is mutable
            collectionDetails: null // No collection details
        }
        //     ???
        // }

        let tx = createMetadataAccountV3(
           umi,
             {
                 ...accounts,
                 ...args
             }
         )

        let result = await tx.sendAndConfirm(umi);
         console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
