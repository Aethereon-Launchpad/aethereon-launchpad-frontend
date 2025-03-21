import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#FFFFFF1A]">
      <button
        className="w-full py-5 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[16px] lg:text-[18px] font-[500] text-white">{question}</span>
        {isOpen ? (
          <FiChevronUp className="text-primary" size={24} />
        ) : (
          <FiChevronDown className="text-primary" size={24} />
        )}
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-[14px] lg:text-[16px] text-[#A1A1AA]">{answer}</p>
        </div>
      )}
    </div>
  );
};

function FAQ() {
  const faqItems = [
    {
      question: "What is DerHex?",
      answer: "DerHex is a decentralized platform that enables users to participate in IDOs (Initial DEX Offerings), stake tokens, and engage in governance. It's built on @soniclabs and powered by $D & $S tokens."
    },
    {
      question: "How do I participate in IDOs?",
      answer: "To participate in IDOs, you need to connect your wallet, and meet the minimum staking requirements. You can then browse upcoming projects in the launchpad section and participate in both public and whitelist sales."
    },
    {
      question: "What are the staking options available?",
      answer: "DerHex offers multiple staking opportunities including regular staking pools with competitive APY rates, seasonal staking challenges, and farming options. Staking also provides benefits for IDO participation and governance voting power."
    },
    {
      question: "How does the governance system work?",
      answer: "Token holders can participate in governance by voting on active proposals that shape the platform's future. Each proposal has a specific voting period, and users can earn voting rewards for participating. The voting power is determined by your staked tokens."
    },
    {
      question: "What makes an IDO refundable?",
      answer: "Refundable IDOs offer a safety mechanism where investors can request a refund within a specified period (usually measured in days) after the IDO ends. This feature is clearly marked on each IDO card and detailed in the project information."
    },
    {
      question: "What are the benefits of staking DerHex tokens?",
      answer: "Staking provides multiple benefits including earning passive rewards (APY), increased IDO allocation chances, enhanced governance voting power, and access to exclusive seasonal staking challenges and NFT rewards."
    },
    {
      question: "How can I stay updated with new IDOs and platform updates?",
      answer: "You can stay informed by joining our Discord community, following our social media channels (Twitter, Telegram, Facebook, LinkedIn), and subscribing to our newsletter for updates about upcoming token sales and platform features."
    }
  ];

  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[30px] lg:text-[38px] text-white font-[500] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[16px] lg:text-[18px] text-[#A1A1AA]">
            Everything you need to know about DerHex
          </p>
        </div>
        <div className="grid gap-2">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;