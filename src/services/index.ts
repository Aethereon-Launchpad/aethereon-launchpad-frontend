export const getTokenData = async (tokenAddress: `0x${string}`, chain: string = "base") => {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${chain}/contract/${tokenAddress}`,
        {
            headers: {
                Accept: "application/json",
                "x-cg-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
            },
        }
    );

    return await response.json();
};