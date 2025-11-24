'use client';

import { MIN_ANNUAL_DECAY, MAX_ANNUAL_DECAY } from '@/lib/types';

export default function ProductPage() {

  return (
    <main className="min-h-screen bg-[#0a0e27]">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-8 py-28">
        <h1 className="text-6xl font-bold tracking-tight mb-8 text-white">
          Permabear Strategy
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
          A USDC-denominated vault that aggregates institutional crash-hedging
          derivatives. Adjustable burn rate from 60% to 95% annual decay.
          <strong className="text-white"> You lose everything in 5 years max.</strong> Asymmetric payoffs during crashes.
        </p>
      </section>

      {/* Who This Is For */}
      <section className="max-w-5xl mx-auto px-8 py-20 border-t border-[#1a2847]/50">
        <h2 className="text-4xl font-bold mb-10 text-white">Who This Is For</h2>
        <div className="bg-[#111936] p-10 rounded-2xl border border-[#1a2847]">
          <p className="text-gray-300 leading-relaxed mb-4 text-lg">
            Permabear is designed for users who strongly believe a major global
            downturn is coming within a specific timeframe. This product
            intentionally loses value in normal markets as it continuously buys
            crash protection.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            If you expect markets to remain stable or grow, this vault is not
            suitable. <strong className="text-white">Capital erosion is guaranteed.</strong> You are paying an
            ongoing insurance premium that bleeds your capital to zero in exchange for exponential upside during
            extreme market dislocations.
          </p>
        </div>
      </section>

      {/* Burn Rate Spectrum */}
      <section className="max-w-5xl mx-auto px-8 py-20 border-t border-[#1a2847]/50">
        <h2 className="text-4xl font-bold mb-10 text-white">Adjustable Burn Rate</h2>

        <div className="space-y-8">
          {/* Burn Rate Spectrum */}
          <div className="bg-[#111936] p-10 rounded-2xl border border-[#1a2847]">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Continuous Decay Spectrum
            </h3>
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              Choose your annual decay rate from <strong className="text-red-400">{Math.round(MIN_ANNUAL_DECAY * 100)}%</strong> (lose everything in 5 years)
              to <strong className="text-red-400">{Math.round(MAX_ANNUAL_DECAY * 100)}%</strong> (lose everything in ~2 months).
              Higher burn = higher crash multipliers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#0d1229] p-6 rounded-xl border border-[#1a2847]">
                <h4 className="text-lg font-bold text-cyan-400 mb-4">Lower Burn (60-75% annual)</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Lose everything in 2-5 years</li>
                  <li>• Crash multipliers: 10x to 13x</li>
                  <li>• Medium-dated puts (6-18 months)</li>
                  <li>• Balanced VIX exposure</li>
                </ul>
              </div>
              <div className="bg-[#0d1229] p-6 rounded-xl border border-[#1a2847]">
                <h4 className="text-lg font-bold text-orange-400 mb-4">Maximum Burn (85-95% annual)</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Lose everything in 2-6 months</li>
                  <li>• Crash multipliers: 15x to 19x</li>
                  <li>• Short-dated deep OTM puts</li>
                  <li>• Concentrated VIX exposure</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-6 rounded-xl border-2 border-red-500/30">
              <p className="text-red-300 font-bold text-center">
                ⚠️ ALL BURN RATES LEAD TO ZERO WITHOUT A CRASH
              </p>
            </div>
          </div>

          {/* Allocation */}
          <div className="bg-[#111936] p-10 rounded-2xl border border-[#1a2847]">
            <h3 className="text-3xl font-bold mb-6 text-white">Core Allocation</h3>
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              All strategies use the same institutional derivatives, with duration adjusted based on your decay rate.
            </p>

            <div className="space-y-4">
              <div className="bg-[#0d1229] p-6 rounded-xl border border-[#1a2847]">
                <h4 className="font-bold text-white mb-3">50% Deep OTM S&P 500 Puts</h4>
                <p className="text-sm text-gray-400">
                  3-36 month expiry, 25-60% below spot, depending on decay rate
                </p>
              </div>
              <div className="bg-[#0d1229] p-6 rounded-xl border border-[#1a2847]">
                <h4 className="font-bold text-white mb-3">30% VIX Volatility Exposure</h4>
                <p className="text-sm text-gray-400">
                  VIX futures and call spreads, short or long-dated based on configuration
                </p>
              </div>
              <div className="bg-[#0d1229] p-6 rounded-xl border border-[#1a2847]">
                <h4 className="font-bold text-white mb-3">20% Credit Default Swaps</h4>
                <p className="text-sm text-gray-400">
                  CDX IG/HY protection, 6 months to 3 years tenor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Underlying Exposure */}
      <section className="max-w-5xl mx-auto px-8 py-20 border-t border-[#1a2847]/50">
        <h2 className="text-4xl font-bold mb-10 text-white">Execution & Management</h2>

        <div className="space-y-8">
          <div className="bg-[#111936] p-10 rounded-2xl border border-[#1a2847]">
            <h3 className="text-2xl font-bold mb-6 text-white">General Rules</h3>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li>✓ All hedges are long premium only (no infinite risk)</li>
              <li>✓ All exposures are non-levered and cannot go negative</li>
              <li>✓ NAV updates daily based on marked-to-market derivative values</li>
              <li>✓ All execution is handled automatically by Permabear (no user action required)</li>
              <li>✓ Positions are held off-chain with institutional counterparties</li>
            </ul>
          </div>

          <div className="bg-[#111936] p-10 rounded-2xl border border-[#1a2847]">
            <h3 className="text-2xl font-bold mb-6 text-white">Rolling & Rebalancing</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Position rolling frequency scales with your decay rate:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0d1229] p-6 rounded-xl border border-[#1a2847]">
                <h4 className="font-bold text-cyan-400 mb-4">Low Decay (18-40%)</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• S&P puts: Rolled every 3-6 months</li>
                  <li>• VIX exposure: Rolled every 2-4 months</li>
                  <li>• CDS protection: Rolled every 6-12 months</li>
                </ul>
              </div>
              <div className="bg-[#0d1229] p-6 rounded-xl border border-[#1a2847]">
                <h4 className="font-bold text-orange-400 mb-4">High Decay (60-95%)</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• S&P puts: Rolled every 30-45 days</li>
                  <li>• VIX exposure: Rolled monthly</li>
                  <li>• CDS protection: Rolled quarterly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-8 py-28 border-t border-[#1a2847]/50 text-center">
        <h2 className="text-5xl font-bold mb-6 text-white">Ready to short the market?</h2>
        <p className="text-gray-400 mb-4 max-w-2xl mx-auto text-lg leading-relaxed">
          Connect your wallet and choose your burn rate. Capital erosion starts immediately.
        </p>
        <p className="text-red-400 font-bold mb-12 text-base">
          Remember: You lose everything in 5 years max without a crash.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-xl text-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-2xl shadow-cyan-500/25"
        >
          Access Vault
        </a>
      </section>
    </main>
  );
}
