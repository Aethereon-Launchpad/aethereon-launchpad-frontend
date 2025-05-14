import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaExternalLinkAlt } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function Guaranteed() {
  return (
    <div className="p-[60px_20px] justify-center flex items-center w-full lg:p-[80px_40px] font-orbitron text-white bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <motion.div
        className="relative w-full max-w-5xl mx-auto p-[40px] overflow-hidden text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cosmic/20 to-deepspace/80 clip-path-polygon z-0"
          whileHover={{
            boxShadow: "0 0 30px rgba(108, 92, 231, 0.3)"
          }}
          animate={{
            boxShadow: ['0 0 10px rgba(108, 92, 231, 0.1)', '0 0 20px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.1)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>

        {/* Border effect */}
        <div className="absolute top-0 right-0 w-[40px] h-[40px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg z-10"></div>
        <div className="absolute bottom-0 left-0 w-[40px] h-[40px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg z-10"></div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <FaShieldAlt className="text-cosmic text-4xl" />
              <motion.div
                className="absolute inset-0 bg-cosmic rounded-full blur-md -z-10"
                animate={{
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </motion.div>
            <h2 className="text-[32px] lg:text-[40px] font-bold sci-fi-text-glow text-cosmic">
              Solana Secure Refunds
            </h2>
          </motion.div>

          <motion.div
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-8"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>

          <motion.p
            className="text-[18px] text-gray-300 max-w-2xl mx-auto mb-10 font-space leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Participate in Solana token sales with complete confidence. Our secure refund protocol
            leverages Solana's high-speed blockchain to ensure that if a token sale doesn't meet its goals,
            your funds are automatically and instantly returned. Experience the security of Aethereon's
            transparent and trustless system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="https://timmyweb3.notion.site/DerHex-Documentation-1ba6e8fffcc5801b8a9dc1d73e7b15f9?pvs=4"
                target="_blank"
                className="relative text-white px-8 py-3 overflow-hidden inline-flex items-center"
              >
                <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
                <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
                <motion.span
                  className="relative flex items-center"
                  whileHover={{
                    textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                  }}
                >
                  <SiSolana className="mr-2" /> View Security Protocol <FaExternalLinkAlt className="ml-2 text-sm" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Guaranteed;
