"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";

type WolfState = "idle" | "scanning" | "processing" | "success" | "error";

interface VectorWolfProps {
    state: WolfState;
    className?: string;
}

export default function VectorWolf({ state, className }: VectorWolfProps) {
    return (
        <div className={clsx("relative w-80 h-80 flex items-center justify-center", className)}>
            {/* Background Glow */}
            <motion.div
                className="absolute inset-0 bg-red-500/20 blur-[50px] rounded-full"
                animate={{
                    scale: state === "idle" ? [1, 1.1, 1] : 1.3,
                    opacity: state === "idle" ? [0.2, 0.4, 0.2] : 0.6,
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* The Cyber Wolf Image */}
            <div className="relative w-full h-full z-10">
                <Image
                    src="/wolf.png"
                    alt="VectorWolf"
                    fill
                    className={clsx(
                        "object-contain drop-shadow-[0_0_15px_rgba(255,0,60,0.5)]",
                        state === "processing" && "animate-glitch"
                    )}
                />

                {/* Laser Eyes Overlay */}
                <motion.div
                    className="absolute top-[40%] left-[35%] w-[10%] h-[5%] bg-red-500 blur-sm mix-blend-screen"
                    animate={{ opacity: state === "scanning" ? [0, 1, 0] : 0 }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-[40%] right-[35%] w-[10%] h-[5%] bg-red-500 blur-sm mix-blend-screen"
                    animate={{ opacity: state === "scanning" ? [0, 1, 0] : 0 }}
                    transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                />
            </div>

            {/* Scanning Beam */}
            {state === "scanning" && (
                <motion.div
                    className="absolute top-0 left-0 w-full h-2 bg-red-500 shadow-[0_0_20px_#FF003C] z-20 mix-blend-overlay"
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            )}

            {/* Holographic Grid Overlay (Idle) */}
            {state === "idle" && (
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,60,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30" />
            )}
        </div>
    );
}
