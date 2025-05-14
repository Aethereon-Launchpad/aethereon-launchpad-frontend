import ProposalCard from "../Global/ProposalCard";
import { useQuery } from "@apollo/client";
import { GET_VOTES } from "../../graphql/queries";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { getVotingSlotData } from "../../utils/web3/actions";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import { FaVoteYea } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function ActiveProposal() {
  const { authenticated } = usePrivy();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<{ message: string }>({ message: "" });
  // const {loading, error, data, refetch} = useQuery(GET_VOTES, {
  //   context: {clientName: 'voting' }
  // });



  useEffect(() => {
    getAllVotingData()
  }, [authenticated])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-deepspace/50 p-8 rounded-lg border border-cosmic/30 flex flex-col items-center"
        >
          <SiSolana className="text-cosmic text-3xl mb-4" />
          <Preloader
            use={ThreeDots}
            size={60}
            strokeWidth={6}
            strokeColor="#6c5ce7"
            duration={2000}
          />
          <p className="text-cosmic mt-4 font-orbitron">Loading Proposals...</p>
        </motion.div>
      </div>
    );
  }

  async function getAllVotingData() {
    setLoading(true)
    try {
      const votingSlotData = await getVotingSlotData();
      console.log(votingSlotData)
      setData(votingSlotData)
    } catch (error) {
      console.error(error)
      setError((prevError) => ({ ...prevError, message: "Failed to retrieve voting slot data" }))
    } finally {
      setLoading(false)
    }
  }

  if (error.message) {
    return (
      <div className="flex justify-center items-center h-[300px] bg-gradient-to-b from-deepspace/10 to-deepspace/30">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-deepspace/50 p-8 rounded-lg border border-red-500/30 flex flex-col items-center max-w-md"
        >
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-red-500 text-4xl mb-4"
          >
            ⚠️
          </motion.div>
          <p className="text-red-500 text-center font-orbitron">Error loading proposals: {error.message}</p>
          <motion.button
            className="mt-4 bg-deepspace border border-cosmic/30 px-4 py-2 rounded-md text-cosmic font-orbitron"
            whileHover={{ scale: 1.05, borderColor: "rgba(108, 92, 231, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => getAllVotingData()}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const votingSlots = data;

  return (
    <div className="p-[60px_20px] lg:p-[80px_40px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden" id="currentProposals">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <motion.div
        className="flex flex-col w-full max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="text-[32px] lg:text-[40px] font-bold font-orbitron sci-fi-text-glow flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <FaVoteYea className="text-cosmic" />
            Active Proposals
          </motion.h2>

          <motion.div
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent my-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>

          <motion.p
            className="text-[18px] text-gray-300 font-space leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Vote on critical protocol decisions and help shape the future of Aethereon in the Solana ecosystem.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {votingSlots.length > 0 ? (
            votingSlots.map((slot: any, index: number) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                <ProposalCard item={slot} refetch={getAllVotingData} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-3 flex flex-col items-center justify-center p-8 bg-deepspace/30 rounded-lg border border-cosmic/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-cosmic text-5xl mb-4"
              >
                <SiSolana />
              </motion.div>
              <p className="text-gray-300 font-orbitron text-center">No active proposals available at the moment</p>
              <p className="text-gray-400 font-space text-center mt-2">Check back soon for new governance opportunities</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ActiveProposal