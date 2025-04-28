// pages/index.js
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Confetti component (simple, for demonstration)
const Confetti = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 pointer-events-none z-50"
    >
        {/* Simple SVG confetti burst, stylized */}
        <svg width="100%" height="100%" viewBox="0 0 500 200">
            <g>
                {[...Array(18)].map((_, i) => (
                    <circle
                        key={i}
                        cx={250 + 180 * Math.cos((i * 2 * Math.PI) / 18)}
                        cy={100 + 80 * Math.sin((i * 2 * Math.PI) / 18)}
                        r={8 + (i % 3) * 4}
                        fill={i % 2 === 0 ? "#AC7FF4" : "#fff"}
                        opacity={0.9}
                    />
                ))}
            </g>
        </svg>
    </motion.div>
);

const steps = [
    { label: "Upload received", icon: "⬆️" },
    { label: "Unpacking files", icon: "🗜️" },
    { label: "Security audit", icon: "🛡️" },
    { label: "Badge injection", icon: "🏅" },
    { label: "Build & compile", icon: "⚙️" },
    { label: "Serverless deploy", icon: "☁️" },
    { label: "DNS update", icon: "🌐" },
    { label: "Success!", icon: "🎉" }
];

const silverGradient = "bg-gradient-to-br from-white via-zinc-200 to-zinc-300";

export default function ZealDeployDashboard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [trackingNo, setTrackingNo] = useState < string | null > (null);
    const [done, setDone] = useState(false);
    const audioRef = useRef(null);

    // Advance steps automatically for demo (simulate live updates)
    useEffect(() => {
        if (currentStep < steps.length - 1) {
            const t = setTimeout(() => setCurrentStep(currentStep + 1), 1100 + Math.random() * 800);
            return () => clearTimeout(t);
        } else if (currentStep === steps.length - 1) {
            setTimeout(() => setDone(true), 1200);
            // Generate a mock tracking number
            setTrackingNo("Z" + Date.now().toString().slice(-6));
        }
    }, [currentStep]);

    // Play "diiing" on final step
    useEffect(() => {
        if (done && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }, [done]);

    return (
        <div className={`min-h-screen ${silverGradient} relative`}>
            {/* Hero header */}
            <header className="w-full flex flex-col items-center pt-12 mb-4">
                <img src="/zeal.svg" alt="Zeal Logo" className="w-16 h-16 drop-shadow-xl mb-4" />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black/90 drop-shadow"
                    style={{ fontFamily: "Inter, SF Pro, Arial, sans-serif" }}>
                    Zeal Automated Deploy
                </h1>
                <p className="mt-3 text-lg text-zinc-700 max-w-xl text-center">
                    <span className="font-semibold text-purple-700">Secure, serverless, and elegant.</span>
                    Your site, <span className="text-purple-700">zeal-ified</span> in moments.
                </p>
            </header>

            {/* Timeline/Stepper */}
            <section className="max-w-2xl mx-auto mt-8 px-4">
                <div className="grid gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.label}
                            initial={{ scale: 0.9, opacity: 0.2 }}
                            animate={{
                                scale: currentStep === i ? 1.04 : 1,
                                opacity: currentStep >= i ? 1 : 0.4,
                                backgroundColor: currentStep === i
                                    ? "rgba(50, 20, 80, 0.19)"
                                    : "rgba(24,24,32,0.05)"
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 22 }}
                            className={`
                flex items-center rounded-2xl shadow-lg px-7 py-6
                ${currentStep >= i ? "backdrop-blur bg-black/70" : "bg-black/40"}
                border border-white/15`}
                            style={{
                                boxShadow: currentStep >= i ? "0 2px 16px #8160F4AA" : "0 1px 6px #BBB2",
                                color: currentStep === i ? "#AC7FF4" : "#fff"
                            }}
                        >
                            <span className="text-2xl md:text-3xl mr-5">{step.icon}</span>
                            <span className="text-xl md:text-2xl font-bold tracking-wide">
                                {step.label}
                            </span>
                            {currentStep === i && (
                                <motion.span
                                    layoutId="pulse"
                                    className="ml-auto w-5 h-5 rounded-full bg-purple-500 shadow-lg"
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.5, 1, 0.6]
                                    }}
                                    transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Status Card */}
            <section className="w-full flex justify-center mt-12">
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/60 border border-zinc-300 shadow-2xl rounded-3xl px-9 py-7 text-center"
                >
                    {done ? (
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 flex items-center justify-center gap-2">
                                <span>🎉</span> Deployment Complete!
                            </h2>
                            <div className="text-purple-700 font-bold text-lg mb-1">Tracking Number</div>
                            <div className="text-2xl font-mono text-black/90 mb-2 select-all">
                                #{trackingNo}
                            </div>
                            <div className="text-md text-zinc-800/80">
                                Your app is live, secure, and Zeal-approved.
                                <br />
                                Check your badge at the bottom right of your site!
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 mb-2">Deploying your package...</h2>
                            <div className="text-purple-700 text-lg font-mono tracking-tight">
                                Step {currentStep + 1} / {steps.length}: {steps[currentStep].label}
                            </div>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Confetti & Sound */}
            <AnimatePresence>{done && <Confetti />}</AnimatePresence>
            <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_123rfcdpmp.mp3" preload="auto" />

            {/* Footer */}
            <footer className="absolute left-0 right-0 bottom-0 flex items-center justify-between p-5">
                <span className="text-zinc-500 text-sm">&copy; {new Date().getFullYear()} Somcro & Zeal Deploy</span>
                <div className="flex items-center gap-2">
                    <img src="/zeal.svg" alt="Zeal Mini" className="w-7 h-7" />
                    <span className="text-xs text-purple-700 font-bold tracking-wide">Zeal of Approval</span>
                </div>
            </footer>
        </div>
    );
}
