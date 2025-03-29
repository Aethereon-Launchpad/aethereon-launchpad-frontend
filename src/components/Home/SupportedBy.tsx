import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import React from 'react';

const brands: string[] = [
    "https://static.pad.chaingpt.org/images/trusted-websites/logo-bitmart.svg",
    "https://static.pad.chaingpt.org/images/trusted-websites/logo-mexc.svg",
    "https://finceptor.app/svg/partnerships/chainlink.svg",
    "https://static.pad.chaingpt.org/images/trusted-websites/logo-kyberswap.svg",
    "https://finceptor.app/svg/partnerships/supra-oracles.svg",
    "https://static.pad.chaingpt.org/images/trusted-websites/logo-kucoin.svg",
    "https://static.pad.chaingpt.org/images/trusted-websites/logo-coinmarketcap.svg",
    "https://static.pad.chaingpt.org/images/trusted-websites/logo-pancakeswap.svg",
    "https://static.pad.chaingpt.org/images/trusted-websites/logo-gateIo.svg",
    "https://static.pad.chaingpt.org/images/trusted-websites/logo-bigget.svg"
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
            <h2 className="font-thin text-left mb-8 uppercase font-space">Supported By</h2>
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

export default React.memo(SupportedBy);