import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowCircleRight, FaChartLine, FaShieldAlt, FaLock, FaPercentage } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function BondsCTA() {
  const navigate = useNavigate();

  return (
    <div className="p-[60px_20px] lg:p-[80px_40px] font-orbitron bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <div className="w-full max-w-7xl mx-auto rounded-[10px] grid lg:grid-cols-2 gap-[60px] items-center">
        <motion.div
          className="flex flex-col justify-center items-center lg:items-start order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative sci-fi-panel p-10 rounded-lg w-full max-w-[400px]">
            {/* Animated bond icon */}
            <motion.div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-cosmic/20 p-5 rounded-full border border-cosmic/30"
              animate={{
                boxShadow: ['0 0 10px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.5)', '0 0 10px rgba(108, 92, 231, 0.3)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <SiSolana className="text-5xl text-cosmic" />
            </motion.div>

            {/* Bond features */}
            <div className="mt-12 space-y-6">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <FaPercentage className="text-2xl text-cosmic" />
                <div>
                  <h3 className="text-lg font-bold text-white">Discounted Rates</h3>
                  <p className="text-sm text-gray-300 font-space">Purchase tokens below market value</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <FaLock className="text-2xl text-cosmic" />
                <div>
                  <h3 className="text-lg font-bold text-white">Fixed Returns</h3>
                  <p className="text-sm text-gray-300 font-space">Guaranteed yield at maturity</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <FaShieldAlt className="text-2xl text-cosmic" />
                <div>
                  <h3 className="text-lg font-bold text-white">Lower Risk</h3>
                  <p className="text-sm text-gray-300 font-space">Reduced volatility exposure</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <FaChartLine className="text-2xl text-cosmic" />
                <div>
                  <h3 className="text-lg font-bold text-white">Solana Speed</h3>
                  <p className="text-sm text-gray-300 font-space">Lightning-fast transactions</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-[30px] order-1 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[32px] lg:text-[48px] font-[700] text-white leading-[40px] lg:leading-[55px] sci-fi-text-glow">
              Secure Your Future with <span className="text-cosmic">Solana Token Bonds</span>
            </h2>
          </motion.div>

          <motion.div
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>

          <motion.p
            className="text-[16px] lg:text-[18px] text-gray-300 font-space leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Aethereon Bonds represent the next evolution in DeFi investing on Solana. Unlike volatile IDOs,
            our bonds offer predictable returns with fixed maturity dates and guaranteed yields.
          </motion.p>

          <motion.p
            className="text-[16px] lg:text-[18px] text-gray-300 font-space leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Purchase tokens at below-market rates today and secure your position in promising Solana projects
            with significantly reduced risk. Perfect for strategic investors looking to diversify their
            portfolio with stable, predictable assets in the Solana ecosystem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => navigate("/deals/bonds")}
              className="relative px-8 py-3 font-medium text-white flex items-center overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
              <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
              <motion.span
                className="relative flex items-center"
                whileHover={{
                  textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                }}
              >
                <SiSolana className="mr-2" /> Explore Solana Bonds <FaArrowCircleRight className="text-skyblue ml-2" />
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default BondsCTA;
