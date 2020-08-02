import { ethers } from "ethers";
import { verifySignature } from "./VerifySignature";

export async function signInk(artist, inkUrl, jsonUrl, limit, provider, contract) {

  console.log("INK", artist, inkUrl, jsonUrl, limit, provider, contract)

  let hashToSign = await ethers.utils.solidityKeccak256(
    ['bytes','bytes','address','address','string','string','uint256'],
    ['0x19','0x0',contract.address,artist,inkUrl,jsonUrl,limit])

  console.log("hashToSign",hashToSign)

  let signature = await provider.send("personal_sign", [hashToSign, artist]);

  let artistSignedMessage = await verifySignature(artist, signature, hashToSign, provider)
  console.log('signature', signature)

  if(artistSignedMessage) {
    return signature
  }
  else {
    throw console.log('Signer is not the artist!')
  }

}
