"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Copy, Check, Download, Share2, FileText } from "lucide-react";
import VectorWolf from "./VectorWolf";

export default function TriageTerminal() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<any | null>(null);
    const [wolfState, setWolfState] = useState<"idle" | "scanning" | "processing" | "success" | "error">("idle");
    const [copied, setCopied] = useState(false);
    const [isSucked, setIsSucked] = useState(false);

    const handleTriage = async () => {
        if (!input.trim()) return;

        // 1. Black Hole Effect
        setIsSucked(true);
        setWolfState("scanning");
        setOutput(null);

        try {
            // 2. Real API Call
            setWolfState("processing");

            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setOutput(data);
            setWolfState("success");
            setIsSucked(false);
            setInput("");

            // Reset to idle after a moment
            setTimeout(() => setWolfState("idle"), 5000);

        } catch (error) {
            console.error("Triage Failed:", error);
            setWolfState("error");
            setIsSucked(false);
            // Optional: Show error state in UI
        }
    };

    const copyToClipboard = () => {
        if (output) {
            navigator.clipboard.writeText(JSON.stringify(output, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center gap-12">
            {/* The Mascot */}
            <VectorWolf state={wolfState} />

            {/* The Terminal Interface */}
            <div className="w-full relative">
                <div className="w-full bg-gray-900/80 backdrop-blur-md border border-red-500/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(255,0,60,0.15)] z-10 relative">
                    {/* Header */}
                    <div className="bg-black/80 p-3 flex items-center justify-between border-b border-red-500/20">
                        <div className="flex items-center gap-2 text-red-500 font-mono text-sm tracking-widest">
                            <Terminal size={16} />
                            <span>THREAT_INGESTION_PROTOCOL_V1</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-2 py-0.5 bg-red-900/30 rounded text-[10px] text-red-400 border border-red-500/20">3 FREE CREDITS LEFT</div>
                        </div>
                    </div>

                    {/* Input Area with Black Hole Animation */}
                    <div className="p-4 relative min-h-[200px]">
                        <AnimatePresence>
                            {!isSucked && (
                                <motion.textarea
                                    initial={{ scale: 1, opacity: 1 }}
                                    exit={{
                                        scale: 0,
                                        opacity: 0,
                                        rotate: 720,
                                        transition: { duration: 0.8, ease: "anticipate" }
                                    }}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="PASTE RAW VULNERABILITY DATA HERE..."
                                    className="w-full h-40 bg-transparent text-red-500 font-mono placeholder-red-900/50 focus:outline-none resize-none text-lg"
                                    spellCheck={false}
                                />
                            )}
                        </AnimatePresence>

                        {/* The Black Hole (Visual Only) */}
                        {isSucked && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-0 h-0 bg-black rounded-full shadow-[0_0_50px_#FF003C] animate-[ping_1s_ease-in-out_infinite]" />
                            </div>
                        )}

                        {/* Scan Line Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(255,0,60,0.05)_50%)] bg-[length:100%_4px]" />
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 border-t border-red-500/20 flex justify-between items-center bg-black/40">
                        <div className="text-xs text-gray-500 font-mono">
                            {wolfState === "processing" ? "ANALYZING VECTORS..." : "READY FOR INGESTION"}
                        </div>
                        <button
                            onClick={handleTriage}
                            disabled={wolfState !== "idle" || !input}
                            className="group relative px-8 py-3 bg-red-600 hover:bg-red-500 text-black font-bold font-mono uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden clip-path-slant"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {wolfState === "idle" ? "INITIATE SCAN" : "PROCESSING"}
                                <ShieldAlert size={18} />
                            </span>
                            {/* Hover Glitch Effect */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Output Display */}
            <AnimatePresence>
                {output && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="w-full bg-black border border-red-500 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,0,60,0.2)]"
                    >
                        {/* Report Header */}
                        <div className="bg-red-900/20 p-4 border-b border-red-500/30 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">{output.title}</h2>
                                <div className="flex gap-3 mt-2">
                                    <span className="px-3 py-1 bg-red-600 text-black font-bold text-xs rounded-sm">
                                        {output.severity}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-800 text-red-400 font-mono text-xs rounded-sm border border-red-500/30">
                                        CVSS: {output.cvss_score}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={copyToClipboard} className="p-2 hover:bg-red-500/20 rounded text-red-500 transition-colors" title="Copy JSON">
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                                <button className="p-2 hover:bg-red-500/20 rounded text-red-500 transition-colors" title="Export PDF (Pro)">
                                    <FileText size={20} />
                                </button>
                                <button className="p-2 hover:bg-red-500/20 rounded text-red-500 transition-colors" title="Download">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Report Body */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2">Description</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{output.description}</p>
                                </div>
                                <div>
                                    <h3 className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2">Proof of Concept</h3>
                                    <pre className="bg-gray-900/50 p-3 rounded text-xs text-gray-400 font-mono whitespace-pre-wrap border border-gray-800">
                                        {output.poc}
                                    </pre>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2">Mitigation</h3>
                                    <div className="bg-red-900/10 p-4 rounded border border-red-500/20">
                                        <p className="text-gray-300 text-sm">{output.mitigation}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2">Vector String</h3>
                                    <code className="text-xs text-red-400 font-mono break-all">{output.cvss_vector}</code>
                                </div>
                            </div>
                        </div>

                        {/* Upsell Footer */}
                        <div className="bg-gradient-to-r from-red-900/20 to-black p-3 text-center border-t border-red-500/20">
                            <p className="text-xs text-gray-500">
                                Want AI-generated exploitability scores? <span className="text-red-500 font-bold cursor-pointer hover:underline">Upgrade to Hunter Tier</span>
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
