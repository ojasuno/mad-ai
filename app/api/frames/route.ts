import { NextRequest, NextResponse } from "next/server";
import { getFrameMessage, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { mintCompressedNFT } from "../../utils/mint";

const baseURL = "https://mad-ai.vercel.app";

export async function POST(req: NextRequest): Promise<Response> {
    const body = await req.json();

    // Validate the frame message and extract the user ID
    const { isValid, message } = await getFrameMessage(body, {
        neynarApiKey: "NEYNAR_ONCHAIN_KIT",
    });

    console.log(JSON.stringify(message, null, 2));

    // Make sure they're following us before they can mint the cFNT
    if (isValid && !message.following) {
        return new NextResponse(getFrameHtmlResponse({
            image: {
                src: `${baseURL}/error.jpg`,
                aspectRatio: "1:1",
            },
            buttons: [
                {
                    label: "Please Follow, to be able to Mint! Click to Retry!",
                    action: "post",
                },
            ],
            postUrl: `${baseURL}api/frames`,
        }));
        // Make sure they have a verified Solana address
    } else if (isValid && message.interactor.verified_addresses.sol_addresses) {
        const solanaAddresses = message.interactor.verified_addresses.sol_addresses;
        console.log(`SOLANA ADDRESSES: ${solanaAddresses}`);

        if (solanaAddresses.length !== 0) {
            try {
                console.log(`MINTING to ${solanaAddresses[0]}`);
                // We take the first address, in case there is more than one
                const mintResult = await mintCompressedNFT(solanaAddresses[0]!);

                return new NextResponse(getFrameHtmlResponse({
                    image: {
                        src: `${baseURL}/success.jpg`,
                        aspectRatio: "1:1",
                    },
                    buttons: [
                        {
                            label: "Success! View your cNFT on XRAY",
                            action: "link",
                            target: `https://xray.helius.xyz/token/${mintResult.assetId}?network=mainnet`
                        },
                    ],
                }));
            } catch (e: any) {
                console.log(`Minting failed: ${e}`);
                return new NextResponse(getFrameHtmlResponse({
                    image: {
                        src: `${baseURL}/error.jpg`,
                        aspectRatio: "1:1",
                    },
                    buttons: [
                        {
                            label: "Minting failed. Click to Retry!",
                            action: "post",
                        },
                    ],
                    postUrl: `${baseURL}api/frames`,
                }));
            }
        } else {
            console.log(`No Solana address found`);
            return new NextResponse(getFrameHtmlResponse({
                image: {
                    src: `${baseURL}/error.jpg`,
                    aspectRatio: "1:1",
                },
                buttons: [
                    {
                        label: "No Solana address found. Click to Retry!",
                        action: "post",
                    },
                ],
                postUrl: `${baseURL}api/frames`
            }));
        }
    } else {
        return new NextResponse(getFrameHtmlResponse({
            image: {
                src: `${baseURL}/error.jpg`,
                aspectRatio: "1:1",
            },
            buttons: [
                {
                    label: "Invalid Frame message. Click to Retry!",
                    action: "post",
                },
            ],
            postUrl: `${baseURL}api/frames`,
        }));
    }
}