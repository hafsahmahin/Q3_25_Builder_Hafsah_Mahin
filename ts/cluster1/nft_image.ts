import wallet from "../hafsah-q3-builders (2).json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({address: "https://devnet.irys.xyz/",}));
umi.use(signerIdentity(signer));


(async () => {
    try {
        //1. Load image
        const imagePath = await readFile("ts/cluster1/download.jpeg");

        //2. Convert image to generic file.
const image = createGenericFile(imagePath, "download.jpeg", {contentType: "image/jpeg"});

        //3. Upload image



        // const image = ???

         const [myUri] = await umi.uploader.upload([image]); 
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
