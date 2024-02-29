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
      label: "Click to mint this Mad AI cNFT on Solana",
      action: "post",
    },
  ],
  postUrl: `${baseURL}api/frames`,
});

export const metadata: Metadata = {
  title: "Mint a Mad AI cNFT on Solana",
  description: "Mint a cNFT to your verified Solana address using the Helius Mint API",
  openGraph: {
    title: "Mint a Mad AI cNFT on Solana",
    description: "Mint a cNFT to your verified Solana address using the Helius Mint API",
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
    <h2>Powered by Farcaster x Helius</h2>
    <div>
      <a href="https://twitter.com/ojasuno" className="block">Built by ojas</a>
    </div>
    <div>
      <a href="https://github.com/ojasuno/mad-ai" className="block">GitHub</a>
    </div>
  </div>
  );
}