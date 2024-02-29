import type { Metadata } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";
import { onChainEventTypeToJSON } from "@farcaster/core";

const baseURL = "https://mad-ai.vercel.app"
// const baseURL = "https://mad-ai.ojas.one"

const frameMetadata = getFrameMetadata({
  image: {
    src: `${baseURL}/default.jpg`,
    aspectRatio: "1:1",
  },
  buttons: [
    {
      label: "Mint a Mad AI cNFT on Solana",
      action: "post",
    },
  ],
  postUrl: `${baseURL}api/frames`,
});

export const metadata: Metadata = {
  title: "Mint a Mad AI cNFT on Solana",
  description: "Mint a Mad AI cNFT to your verified Solana address, via Faracster Frames, using the Helius Mint API",
  openGraph: {
    title: "Mint a Mad AI cNFT on Solana",
    description: "Mint a Mad AI cNFT to your verified Solana address, via Farcaster Frames, using the Helius Mint API",
    images: ["https://mad-ai.vercep.app/default.jpg"],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
    <h1>Mint a Mad AI cNFT</h1>
    <h3>Powered by Helius Frames x Farcaster</h3>
    <img src="default.jpg" alt="A Mad Lad exploring Web3 via Bakcpack Wallet"></img>
    <div>
      <a href="https://twitter.com/ojasuno" className="block">Built by ojas</a>
    </div>
    <div>
      <a href="https://github.com/ojasuno/mad-ai" className="block">GitHub</a>
    </div>
  </div>
  );
}