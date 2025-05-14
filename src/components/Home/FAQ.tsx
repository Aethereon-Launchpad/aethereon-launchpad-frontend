import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle, FaStar } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-cosmic/30 rounded-lg overflow-hidden sci-fi-panel relative mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.button
        className="w-full p-5 text-left flex justify-between items-center text-white"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(108, 92, 231, 0.1)" }}
      >
        <span className="text-[16px] lg:text-[18px] font-[600] flex items-center">
          <SiSolana className="text-cosmic mr-3" />
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-cosmic" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-cosmic/20">
              <p className="text-[16px] text-gray-300 font-space leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>
    </motion.div>
  );
};

function FAQ() {
  const faqItems = [
    {
      question: "What is Aethereon?",
      answer: "Aethereon is a cutting-edge decentralized launchpad built specifically for the Solana ecosystem. It enables users to participate in IDOs (Initial DEX Offerings), stake tokens, and engage in governance. Powered by $ATH tokens, Aethereon leverages Solana's high-speed, low-cost infrastructure to provide a seamless experience."
    },
    {
      question: "How do I participate in IDOs?",
      answer: "To participate in IDOs on Aethereon, connect your Solana wallet, meet the minimum staking requirements, and browse upcoming projects in the launchpad section. You can participate in both public and whitelist sales, with priority access based on your staking tier."
    },
    {
      question: "What are the staking options available?",
      answer: "Aethereon offers multiple staking opportunities including regular staking pools with competitive APY rates, seasonal staking challenges, and farming options. Our Solana-based staking system provides fast transactions and minimal fees, while also providing benefits for IDO participation and governance voting power."
    },
    {
      question: "How does the governance system work?",
      answer: "Aethereon token holders can participate in governance by voting on active proposals that shape the platform's future. Each proposal has a specific voting period, and users can earn voting rewards for participating. The voting power is determined by your staked $ATH tokens, with Solana's fast infrastructure ensuring a smooth voting experience."
    },
    {
      question: "What makes an IDO refundable?",
      answer: "Refundable IDOs on Aethereon offer a safety mechanism where investors can request a refund within a specified period after the IDO ends. Leveraging Solana's efficient blockchain, refunds are processed quickly and with minimal fees. This feature is clearly marked on each IDO card and detailed in the project information."
    },
    {
      question: "What are the benefits of staking Aethereon tokens?",
      answer: "Staking $ATH tokens provides multiple benefits including earning passive rewards with competitive APY, increased IDO allocation chances, enhanced governance voting power, and access to exclusive sci-fi themed seasonal staking challenges and NFT rewards that reflect our cosmic space station aesthetic."
    },
    {
      question: "How can I stay updated with new IDOs and platform updates?",
      answer: "You can stay informed by joining our Discord community, following our social media channels (Twitter, Telegram, Facebook, LinkedIn), and subscribing to our newsletter for updates about upcoming Solana token sales and Aethereon platform features."
    },
    {
      question: "Why did Aethereon choose Solana?",
      answer: "Aethereon is built on Solana to leverage its high throughput, low transaction costs, and growing ecosystem. Solana's technology allows us to provide a seamless user experience with near-instant transactions and minimal fees, making it ideal for IDO participation and token staking."
    }
  ];

  return (
    <div className="p-[60px_20px] lg:p-[80px_40px] font-orbitron bg-gradient-to-b from-deepspace/10 to-deepspace/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid line */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      {/* Animated stars */}
      <motion.div
        className="absolute top-[15%] right-[10%] text-cosmic text-xl"
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaStar />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[15%] text-skyblue text-sm"
        animate={{
          y: [0, -8, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaStar />
      </motion.div>

      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="flex flex-col items-center justify-center gap-3 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
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
              <FaQuestionCircle className="text-cosmic text-4xl" />
            </motion.div>
            <h2 className="text-[30px] lg:text-[42px] font-bold text-white sci-fi-text-glow">
              Frequently Asked Questions
            </h2>
          </div>

          <motion.div
            className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>

          <motion.p
            className="text-[16px] lg:text-[18px] text-gray-300 max-w-2xl font-space"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Everything you need to know about Aethereon and the Solana ecosystem
          </motion.p>
        </motion.div>

        <div className="mt-[40px]">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 font-space">
            Have more questions? <a href="https://t.me/+SZiyw7ZP9gliM2Fk" target="_blank" rel="noopener noreferrer" className="text-cosmic hover:underline">Join our community</a> for support.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;