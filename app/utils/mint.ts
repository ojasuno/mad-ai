// const url = `Get a URL at dev.helius.xyz`;
const url =`https://rpc-proxy.ojasuno.workers.dev`;

export const mintCompressedNFT = async (address: string) => {
 const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        id: "frames-sol-mint",
        method: "mintCompressedNft",
        params: {
            name: "Mad AI",
            symbol: "MAI",
            owner: address,
            description: "A Mad Lad Collector & Mad AI Artist in the making backed by Solana's most loved RPC Nodes, APIs, Webhooks, and Developer Tooling",
            attributes: [
                {
                    trait_type: "Collection",
                    value: "Mad AI",
                },
                {
                    trait_type: "Artist",
                    value: "M4D",
                },
            ],
            // modify this imageUrl and externalUrl to suit your project needs
            imageUrl: "https://shdw-drive.genesysgo.net/HmvVwYAy7cxWECLbu2cjWBSHysVoriTqgdugyePVg3rY/cnftmint.jpg",
            externalUrl: "mad-ai.ojas.one",
            sellerFeeBasisPoints: 8888,
        },
    }),
 });

 const data = await response.json();
 console.log(`data: ${JSON.stringify(data, null, 2)}`);

 if (!response.ok) {
    throw new Error(`The response was not okay - ${response.status}`);
 }

 if (!data.result || !data.result.assetId) {
    throw new Error(`The responses did not include the expected data.result.assetId field`);
 }

 return data.result;
};
