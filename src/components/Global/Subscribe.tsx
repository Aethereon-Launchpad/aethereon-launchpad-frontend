import { motion } from 'framer-motion';
import { FaSpaceShuttle, FaEnvelope, FaBell, FaPaperPlane, FaStar } from "react-icons/fa";
import { useState } from 'react';
import { SiSolana } from "react-icons/si";
import { IoMdMail, IoMdNotifications } from "react-icons/io";

function Subscribe() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center p-[60px_20px] lg:p-[60px] bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <motion.div
        className="relative w-full max-w-7xl p-[30px] grid lg:grid-cols-2 gap-[60px] overflow-hidden group sci-fi-panel rounded-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Newsletter visualization using React Icons */}
          <div className="relative w-full max-w-[400px] h-[300px] flex items-center justify-center">
            {/* Central mail icon */}
            <motion.div
              className="absolute z-20 bg-deepspace p-6 rounded-lg border-2 border-cosmic/50"
              animate={{
                boxShadow: ['0 0 10px rgba(108, 92, 231, 0.3)', '0 0 20px rgba(108, 92, 231, 0.5)', '0 0 10px rgba(108, 92, 231, 0.3)']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <IoMdMail className="text-5xl text-cosmic" />
            </motion.div>

            {/* Floating notification icons */}
            <motion.div
              className="absolute top-[20%] left-[20%] bg-cosmic/20 p-2 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <IoMdNotifications className="text-xl text-skyblue" />
            </motion.div>

            <motion.div
              className="absolute bottom-[20%] right-[20%] bg-cosmic/20 p-2 rounded-full"
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaBell className="text-xl text-purple-400" />
            </motion.div>

            {/* Email icons */}
            <motion.div
              className="absolute top-[30%] right-[30%] bg-deepspace p-2 rounded-full border border-skyblue/50"
              animate={{
                x: [0, 20, 40, 60, 80, 100],
                y: [0, -10, -5, 5, 10, 0],
                opacity: [1, 1, 1, 1, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaEnvelope className="text-sm text-skyblue" />
            </motion.div>

            <motion.div
              className="absolute bottom-[30%] left-[30%] bg-deepspace p-2 rounded-full border border-purple-400/50"
              animate={{
                x: [0, 20, 40, 60, 80, 100],
                y: [0, 10, 5, -5, -10, 0],
                opacity: [1, 1, 1, 1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <FaEnvelope className="text-sm text-purple-400" />
            </motion.div>

            {/* Solana logo */}
            <motion.div
              className="absolute bottom-6 right-6 bg-deepspace p-2 rounded-full border border-cosmic/50"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <SiSolana className="text-xl text-cosmic" />
            </motion.div>

            {/* Floating stars */}
            <motion.div
              className="absolute top-[10%] right-[10%] text-skyblue"
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaStar className="text-sm" />
            </motion.div>

            <motion.div
              className="absolute bottom-[10%] left-[10%] text-cosmic"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaStar className="text-sm" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
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
            >
              <FaSpaceShuttle className="text-cosmic text-3xl" />
            </motion.div>
            <p className="text-[24px] lg:text-[36px] leading-[48px] font-orbitron text-cosmic sci-fi-text-glow">
              Join the Aethereon <br className="hidden lg:block" /> Mission
            </p>
          </div>

          <motion.div
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>

          <p className="text-[#CDCDCD] font-space text-[16px] lg:text-[18px] mt-[5px] lg:mt-[10px] mb-6">
            Subscribe to receive updates on Solana IDOs, exclusive airdrops, and early access to new features on the Aethereon launchpad.
          </p>

          <form
            className="w-full font-space mt-[20px]"
            onSubmit={handleSubmit}
          >
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-cosmic/70" />
              </div>
              <input
                placeholder="Your Email address..."
                className="w-full p-4 pl-10 bg-deepspace/50 border border-cosmic/30 rounded-lg text-white focus:outline-none focus:border-cosmic"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <motion.button
              className="relative w-full py-3 text-white overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
            >
              <span className="absolute inset-0 w-full h-full bg-cosmic clip-path-polygon"></span>
              <span className="absolute inset-[2px] bg-deepspace transition-all duration-300 clip-path-polygon"></span>
              <motion.span
                className="relative flex items-center justify-center"
                whileHover={{
                  textShadow: "0 0 8px rgba(135, 206, 235, 0.8)"
                }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FaPaperPlane className="mr-2 animate-pulse" /> Sending...
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    className="flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <SiSolana className="mr-2" /> Subscribed!
                  </motion.div>
                ) : (
                  <motion.div className="flex items-center">
                    <SiSolana className="mr-2" /> Join the Mission
                  </motion.div>
                )}
              </motion.span>
            </motion.button>
          </form>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Subscribe