import { ApolloClient, InMemoryCache } from '@apollo/client';

export const votingClient = new ApolloClient({
    uri: 'https://api.goldsky.com/api/public/project_cm76yksjty5q801sz9ogub9x8/subgraphs/derhex-sonic/votingSlots/gn', // Replace with your subgraph URL
    cache: new InMemoryCache(),
});

export const stakingClient = new ApolloClient({
    uri: 'https://api.goldsky.com/api/public/project_cm76yksjty5q801sz9ogub9x8/subgraphs/derhex-sonic/Staking/gn', // Replace with your subgraph URL
    cache: new InMemoryCache(),
});