import { gql } from "@apollo/client";

export const GET_VOTES = gql`
    query GetAllVotingSlots {
        votingSlots {
            blockNumber
            blockTimestamp
            description
            id
            image
            name
            maxFreeVotesPerDay
            negativeVoteWeight
            slot
            positiveVoteWeight
            voteEndDate
            stakingPool
            voteStartDate
        }
    }
`


export const GET_STAKING_POOLS = gql`
    query GetAllStakingPools {
        stakingPools {
            apyRate
            availableRewards
            blockNumber
            blockTimestamp
            id
            totalRewardsReleased
            stakingFeePercentage
            totalStaked
            withdrawalFeePercentage
            withdrawalIntervals
            rewardToken {
            decimals
            id
            name
            symbol
            }
            stakeToken {
            decimals
            id
            name
            symbol
            }
        }
    }
`

export const GET_STAKING_POOL_BY_ID = gql`
    query getStakingPoolById($id: String!) {
        stakingPool(id: $id) {
            apyRate
            availableRewards
            blockNumber
            blockTimestamp
            id
            stakingFeePercentage
            totalRewardsReleased
            totalStaked
            withdrawalFeePercentage
            withdrawalIntervals
            stakeToken {
                decimals
                id
                name
                symbol
            }
            rewardToken {
                decimals
                id
                name
                symbol
            }
        }
    }
`