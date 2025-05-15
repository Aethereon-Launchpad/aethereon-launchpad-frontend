import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import React from 'react';
import { SiSolana } from "react-icons/si";

const brands: string[] = [
    "/icons/brands/logo-bitmart.svg",
    "/icons/brands/logo-mexc.svg",
    // "/icons/brands/logo-metamask.svg",
    "/icons/brands/logo-kyberswap.svg",
    "/icons/brands/logo-kucoin.svg",
    "/icons/brands/logo-coinmarketcap.svg",
    "/icons/brands/logo-pancakeswap.svg",
    "/icons/brands/logo-gateIo.svg",
    "/icons/brands/logo-bigget.svg"
]

const SupportedBy = () => {
    const [width, setWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null);
    const duplicatedBrands = [...brands, ...brands]; // Duplicate the array for seamless looping

    useEffect(() => {
        if (carousel.current) {
            const scrollWidth = carousel.current.scrollWidth;
            const offsetWidth = carousel.current.offsetWidth;
            setWidth(scrollWidth - offsetWidth);
        }
    }, []);

    return (
        <section className="py-12 bg-gradient-to-b from-deepspace/10 to-deepspace/30 p-[60px]">
            <motion.div
                className="flex items-center justify-center gap-2 mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <SiSolana className="text-cosmic text-3xl animate-pulse" />
                <h2 className="text-2xl font-extrabold uppercase font-orbitron text-cosmic sci-fi-text-glow">
                    Solana Ecosystem Partners
                </h2>
            </motion.div>

            <motion.div
                ref={carousel}
                className="cursor-grab overflow-hidden"
                whileTap={{ cursor: 'grabbing' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-8"
                    animate={{
                        x: [-width / 2, 0],
                        transition: {
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear'
                        }
                    }}
                >
                    {duplicatedBrands.map((brand, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[150px] flex items-center justify-center"
                            whileHover={{
                                scale: 1.1,
                                filter: "brightness(1.2)",
                                transition: { duration: 0.2 }
                            }}
                        >
                            <img
                                src={brand}
                                alt={`Solana Ecosystem Partner ${index % brands.length}`}
                                className="w-full h-auto max-h-[50px] object-contain filter brightness-0 invert opacity-80 hover:opacity-100"
                                draggable={false}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SupportedBy