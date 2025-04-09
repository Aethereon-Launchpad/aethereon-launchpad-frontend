import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

// Create HttpLink instances for each subgraph
const votingLink = new HttpLink({ 
  uri: "https://api.goldsky.com/api/public/project_cm76yksjty5q801sz9ogub9x8/subgraphs/derhex-sonic/votingSlots/gn"
});

const stakingLink = new HttpLink({
  uri: "https://api.goldsky.com/api/public/project_cm76yksjty5q801sz9ogub9x8/subgraphs/derhex-sonic/Staking/gn"
});

const presaleLink = new HttpLink({
  uri: "https://api.goldsky.com/api/public/project_cm76yksjty5q801sz9ogub9x8/subgraphs/derhex-sonic/Presale/gn"
});

// Create a link that splits between voting and other subgraphs
const splitLink = ApolloLink.split(
  operation => operation.getContext().clientName === "voting",
  votingLink, // if true
  ApolloLink.split(
    operation => operation.getContext().clientName === "presale",
    presaleLink, // if true
    stakingLink // if false
  )
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});