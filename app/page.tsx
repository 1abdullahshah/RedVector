import TriageTerminal from "@/components/TriageTerminal";
import { Zap, Shield, Lock } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground bg-grid-pattern selection:bg-red-500 selection:text-black">
      {/* Hero Section */}
      <section className="w-full py-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          RED<span className="text-red-500 text-neon-red">VECTOR</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 font-light">
          AGGRESSIVE VULNERABILITY TRIAGE. <br />
          <span className="text-red-500 font-bold">WE HUNT BUGS. FAST.</span>
        </p>

        {/* The Main App Interface */}
        <TriageTerminal />
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border border-gray-800 bg-black/50 hover:border-red-500/50 transition-colors group">
          <Zap className="text-red-500 mb-4 group-hover:animate-pulse" size={32} />
          <h3 className="text-xl font-bold mb-2">Instant Analysis</h3>
          <p className="text-gray-400">Raw data to structured JSON in milliseconds. No fluff.</p>
        </div>
        <div className="p-6 border border-gray-800 bg-black/50 hover:border-red-500/50 transition-colors group">
          <Shield className="text-red-500 mb-4 group-hover:animate-pulse" size={32} />
          <h3 className="text-xl font-bold mb-2">CVSS v3.1 Precision</h3>
          <p className="text-gray-400">Automated scoring based on impact and exploitability.</p>
        </div>
        <div className="p-6 border border-gray-800 bg-black/50 hover:border-red-500/50 transition-colors group">
          <Lock className="text-red-500 mb-4 group-hover:animate-pulse" size={32} />
          <h3 className="text-xl font-bold mb-2">Zero-Retention</h3>
          <p className="text-gray-400">We don't store your data. Local browser processing only.</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-20 px-4 bg-black/80 border-t border-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">DEPLOYMENT TIERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="border border-gray-700 p-8 rounded-lg bg-gray-900/50">
              <h3 className="text-2xl font-bold mb-2">SCOUT</h3>
              <div className="text-4xl font-black text-white mb-6">$0<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="text-left space-y-3 text-gray-400 mb-8">
                <li>✓ 3 Reports / Day</li>
                <li>✓ Basic JSON Export</li>
                <li>✓ Community Support</li>
              </ul>
              <button className="w-full py-3 border border-white text-white font-bold hover:bg-white hover:text-black transition-all">
                START HUNTING
              </button>
            </div>

            {/* Pro Tier */}
            <div className="border border-red-500 p-8 rounded-lg bg-red-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-black text-xs font-bold px-3 py-1">RECOMMENDED</div>
              <h3 className="text-2xl font-bold mb-2 text-red-500">HUNTER</h3>
              <div className="text-4xl font-black text-white mb-6">$19<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="text-left space-y-3 text-gray-300 mb-8">
                <li>✓ <span className="text-white font-bold">Unlimited</span> Triage</li>
                <li>✓ PDF & Jira Export</li>
                <li>✓ AI Mitigation Engine</li>
                <li>✓ Priority Processing</li>
              </ul>
              <button className="w-full py-3 bg-red-600 text-white font-bold hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(255,0,60,0.4)]">
                UPGRADE NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-600 text-sm border-t border-gray-900">
        <p>© 2025 REDVECTOR. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
