"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.6,
    direction = 'up',
    distance = 50
}: ScrollRevealProps) {

    const getInitialPosition = () => {
        switch (direction) {
            case 'up': return { y: distance, opacity: 0 };
            case 'down': return { y: -distance, opacity: 0 };
            case 'left': return { x: distance, opacity: 0 };
            case 'right': return { x: -distance, opacity: 0 };
            case 'none': return { opacity: 0 };
            default: return { y: distance, opacity: 0 };
        }
    };

    const getFinalPosition = () => {
        switch (direction) {
            case 'up': case 'down': return { y: 0, opacity: 1 };
            case 'left': case 'right': return { x: 0, opacity: 1 };
            case 'none': return { opacity: 1 };
            default: return { y: 0, opacity: 1 };
        }
    };

    return (
        <motion.div
            initial={getInitialPosition()}
            whileInView={getFinalPosition()}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "easeOut"
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
