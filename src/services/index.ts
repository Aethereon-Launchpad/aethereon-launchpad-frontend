export const getTokenData = async (tokenAddress: `0x${string}`) => {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/sonic/contract/${tokenAddress}`,
        {
            headers: {
                Accept: "application/json",
                "x-cg-api-key": "CG-JUXFfJ4wCNPcjR9UUVSqJdS3",
            },
        }
    );

    return await response.json();
};