import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import React from 'react';

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
        <section className="py-12 text-primary p-[60px]">
            <h2 className="text-left font-bold mb-8 uppercase font-space">Supported By</h2>
            <motion.div
                ref={carousel}
                className="cursor-grab overflow-hidden"
                whileTap={{ cursor: 'grabbing' }}
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
                        >
                            <img
                                src={brand}
                                alt={`Supported brand ${index % brands.length}`}
                                className="w-full h-auto max-h-[50px] object-contain"
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