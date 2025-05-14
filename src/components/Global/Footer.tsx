// import React from 'react'

import { Link } from "react-router-dom";
import { FaRocket, FaStar, FaTelegram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const footerLinks = [
    {
      name: "Launchpad",
      link: "/launchpad",
    },
    {
      name: "Staking & Farming",
      link: "/staking-pool",
    },
    {
      name: "Bonds",
      link: "/deals/bonds",
    },
    {
      name: "Governance",
      link: "/governance",
    },
    {
      name: "Giveaways",
      link: "/deals/giveaways",
    },
    {
      name: "Community",
      link: "/launchpad",
    },
    {
      name: "Customer Support",
      link: "/support",
    },
    {
      name: "Documentation",
      link: "https://aethereon.notion.site/Aethereon-Documentation",
    },
    {
      name: "Terms of Service",
      link: "/terms-of-service",
    },
    {
      name: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      name: "Cookies Policy",
      link: "/cookies-policy",
    },
    {
      name: "Disclaimer",
      link: "/disclaimer",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Telegram",
      link: "https://t.me/aethereon",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/aethereon",
    },
    {
      name: "Facebook",
      link: "https://facebook.com/aethereon",
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/aethereon",
    },
  ];

  const footerSocials = [
    { icon: FaTelegram, url: "https://t.me/aethereon" },
    { icon: FaTwitter, url: "https://twitter.com/aethereon" },
    { icon: FaFacebook, url: "https://facebook.com/aethereon" },
    { icon: FaLinkedin, url: "https://linkedin.com/in/aethereon" }
  ];

  return (
    <div className="relative overflow-hidden bg-deepspace/95 border-t border-cosmic/20">
      {/* Cosmic effects */}
      <div className="absolute inset-0">
        <div className="h-[400px] w-[400px] absolute -bottom-1/2 -left-1/2 blur-[100px] bg-cosmic/20"></div>
        <div className="h-[500px] w-[500px] absolute -bottom-1/2 -right-1/2 blur-[100px] bg-purple-400/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <h1 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-primary via-cosmic to-skyblue bg-clip-text text-transparent">
                Aethereon
              </h1>
            </div>
            <p className="text-gray-300 text-sm font-space">
              Aethereon is a premier decentralized launchpad built on Solana, empowering the next generation of blockchain innovators with lightning-fast, low-cost token launches powered by $ATH
            </p>
            <div className="mt-6">
              <FaRocket className="text-3xl text-cosmic animate-pulse" />
            </div>
          </motion.div>

          {/* Products Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-cosmic font-orbitron text-xl font-semibold mb-4 sci-fi-text-glow">
              Products
            </h3>
            <div className="flex flex-col items-start space-y-2">
              {footerLinks.slice(0, 5).map((link, index) => (
                <Link
                  to={link.link}
                  key={index}
                  className="text-gray-300 hover:text-cosmic transition-colors flex items-center space-x-2"
                >
                  <FaStar className="text-xs text-cosmic" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-cosmic font-orbitron text-xl font-semibold mb-4 sci-fi-text-glow">
              Help
            </h3>
            <div className="flex flex-col items-start space-y-2">
              {footerLinks.slice(5, 9).map((link, index) => (
                <Link
                  to={link.link}
                  key={index}
                  className="text-gray-300 hover:text-cosmic transition-colors flex items-center space-x-2"
                >
                  <FaStar className="text-xs text-cosmic" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Community Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-cosmic font-orbitron text-xl font-semibold mb-4 sci-fi-text-glow">
              Community
            </h3>
            <div className="flex flex-col items-start space-y-2">
              {footerLinks.slice(9).map((link, index) => (
                <a
                  href={link.link}
                  key={index}
                  className="text-gray-300 hover:text-cosmic transition-colors flex items-center space-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaStar className="text-xs text-cosmic" />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Social Links & Copyright */}
        <motion.div
          className="mt-8 pt-8 border-t border-cosmic/20 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 font-space sci-fi-text-glow">
            Copyright Aethereon {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {footerSocials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cosmic transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Footer;
