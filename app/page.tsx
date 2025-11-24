'use client';

import { useState } from 'react';
import Link from 'next/link';
import NAVChart from '@/components/NAVChart';
import DecaySlider from '@/components/DecaySlider';
import { generateCrashScenario, generateNAVProjection } from '@/lib/calculations';
import { DEFAULT_ANNUAL_DECAY, getTimeToZero } from '@/lib/types';

export default function Home() {
  const [annualDecay, setAnnualDecay] = useState(DEFAULT_ANNUAL_DECAY);

  const crashData = generateCrashScenario(annualDecay, 180);
  const decayData = generateNAVProjection(annualDecay, 365);
  const timeToZero = getTimeToZero(annualDecay);

  return (
    <main className="min-h-screen bg-[#0a0e27]">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-40 text-center relative overflow-hidden">
        {/* Sophisticated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative">
          <h1 className="text-[5.5rem] font-bold mb-10 leading-[1.05] text-white max-w-4xl mx-auto">
            Short the market
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
              like institutions do
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-5 max-w-2xl mx-auto leading-relaxed">
            Access professional crash hedging strategies previously only available to institutional investors.
          </p>
          <p className="text-base text-gray-400 mb-16 max-w-xl mx-auto leading-relaxed">
            Deposit USDC. We execute the same tail-risk strategies used by hedge funds. 3x to 18x returns when markets crash.
          </p>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl text-base font-bold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
          >
            Access Vault
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Decay Slider */}
      <section className="max-w-7xl mx-auto px-8 py-28 border-t border-[#1a2847]/50">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Choose your decay rate
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            This is ultra-high burn crash insurance. Even at the <strong className="text-white">minimum 60% decay</strong>,
            you lose everything in 5 years if no crash happens. Increase the burn for higher crash multipliers.
          </p>
        </div>

        <DecaySlider annualDecay={annualDecay} onChange={setAnnualDecay} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-[#111936] p-8 rounded-2xl border border-[#1a2847]">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mb-6 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5h2v2H9V5zm0 4h2v6H9V9z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Deep OTM Puts</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Short-dated or LEAPS puts 30-60% below spot, depending on your decay rate.
            </p>
          </div>
          <div className="bg-[#111936] p-8 rounded-2xl border border-[#1a2847]">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl mb-6 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M3 3l14 14M3 17L17 3"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">VIX Exposure</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              VIX futures and call spreads that spike during volatility events.
            </p>
          </div>
          <div className="bg-[#111936] p-8 rounded-2xl border border-[#1a2847]">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-6 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M10 3v14m-7-7h14"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Credit Protection</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              CDX IG/HY credit default swaps for credit market dislocations.
            </p>
          </div>
        </div>
      </section>

      {/* Capital Decay Chart */}
      <section className="max-w-5xl mx-auto px-8 py-32 border-t border-[#1a2847]/50">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-white max-w-3xl mx-auto leading-tight">
            Your money bleeds in normal markets
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-3">
            This is crash insurance. Your capital decays continuously while you wait for the crash.
            <strong className="text-white"> Even at minimum 60% decay, you lose everything in 5 years.</strong>
          </p>
          <p className="text-red-400 font-bold text-base">
            Without a crash, you reach $0 in {timeToZero}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#111936] via-[#0d1229] to-[#0a0e27] p-12 rounded-3xl border-2 border-red-500/30 relative overflow-hidden shadow-2xl shadow-red-500/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-4xl font-bold text-white">1-Year Decay Projection</h3>
              <span className="px-5 py-2.5 bg-red-500/20 text-red-300 text-sm font-black rounded-xl border-2 border-red-500/40">
                -{Math.round(annualDecay * 100)}% ANNUAL
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-10 font-medium">
              Starting NAV: $1.00 → Ending NAV: ${decayData[decayData.length - 1].nav.toFixed(4)} after 1 year
            </p>
            <NAVChart data={decayData} height={380} />
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border-2 border-orange-500/30">
          <p className="text-orange-200 font-semibold text-center text-base leading-relaxed">
            💀 <strong>GUARANTEED WIPEOUT:</strong> In normal market conditions, this investment goes to zero.
            The only way to profit is a major market crash. This is not a hedge—it's pure crash speculation.
          </p>
        </div>
      </section>

      {/* Crash Scenario */}
      <section className="max-w-5xl mx-auto px-8 py-32 border-t border-[#1a2847]/50 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-20 relative">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent max-w-3xl mx-auto leading-tight">
            When markets crash, you win big
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Asymmetric payoff designed for tail events. Higher burn = higher crash multipliers.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#111936] via-[#0d1229] to-[#111936] p-12 rounded-3xl border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none"></div>
          <div className="relative">
            <h3 className="text-4xl font-bold text-white mb-4">6-Month Crash Scenario</h3>
            <p className="text-base text-gray-400 mb-10 font-medium">
              Example extreme market crash at day 180 with current decay rate
            </p>
            <NAVChart data={crashData} height={380} showCrash />
            <div className="mt-10 p-6 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-2xl border-2 border-cyan-500/30">
              <p className="text-cyan-200 font-black text-center text-xl tracking-wide">
                {(crashData[180].nav / decayData[180].nav).toFixed(1)}x MULTIPLIER ON REMAINING CAPITAL
              </p>
              <p className="text-cyan-400 text-center text-sm mt-2">
                Crash multiplier scales with your decay rate: higher burn = bigger crash gains
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-5xl mx-auto px-8 py-32 border-t border-[#1a2847]/50">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-5 text-white">
            Execution process
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three steps to access institutional crash hedging
          </p>
        </div>
        <div className="space-y-8">
          <div className="group bg-gradient-to-r from-[#111936] to-[#0d1229] p-8 rounded-2xl border border-[#1a2847] hover:border-cyan-500/30 transition-all flex gap-7 items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-cyan-500/20">
              1
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-2xl font-bold mb-3 text-white">
                Deposit USDC
              </h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Transfer USDC to vault contract. Receive CVT tokens representing proportional share based on current NAV.
              </p>
            </div>
          </div>

          <div className="group bg-gradient-to-r from-[#111936] to-[#0d1229] p-8 rounded-2xl border border-[#1a2847] hover:border-cyan-500/30 transition-all flex gap-7 items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-cyan-500/20">
              2
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-2xl font-bold mb-3 text-white">
                Select execution mode
              </h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Choose High Octane for imminent crash expectations (3-9 months) or Long Glide for extended timelines (2-5 years).
              </p>
            </div>
          </div>

          <div className="group bg-gradient-to-r from-[#111936] to-[#0d1229] p-8 rounded-2xl border border-[#1a2847] hover:border-cyan-500/30 transition-all flex gap-7 items-start">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-cyan-500/20">
              3
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-2xl font-bold mb-3 text-white">
                Automated hedge execution
              </h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Protocol executes and maintains off-chain derivative positions. NAV updates daily. Capital erodes systematically until market dislocation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/product"
            className="group inline-flex items-center gap-2 border-2 border-[#1a2847] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#111936] hover:border-cyan-500/30 transition-all"
          >
            View Complete Strategy
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Risk Disclosure */}
      <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-[#1a2847]/50">
        <div className="bg-gradient-to-br from-orange-500/8 to-red-500/8 border-2 border-orange-500/30 rounded-2xl p-10 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative">
            <h3 className="text-xl font-black text-orange-400 mb-4 uppercase tracking-wider flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              Important Information
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Permabear gives you access to professional crash hedging strategies. These strategies lose money every day in normal markets.
              Your capital decays continuously. When markets go up, you lose faster. Only deposit money you're willing to watch shrink in exchange for massive upside if markets crash.
              This is high-risk. Not suitable for anyone seeking steady returns or capital preservation.
            </p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm font-medium">
          © 2025 Permabear. Not financial advice. Do your own research.
        </p>
      </footer>
    </main>
  );
}
