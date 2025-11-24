'use client';

import { useState } from 'react';
import { DEFAULT_ANNUAL_DECAY, getTimeToZero } from '@/lib/types';
import { getCurrentNAV, generateNAVHistory } from '@/lib/calculations';
import DecaySlider from '@/components/DecaySlider';
import NAVChart from '@/components/NAVChart';
import ProjectionsTable from '@/components/ProjectionsTable';
import DepositModule from '@/components/DepositModule';
import WithdrawModule from '@/components/WithdrawModule';

export default function DashboardPage() {
  const [annualDecay, setAnnualDecay] = useState(DEFAULT_ANNUAL_DECAY);
  const [walletBalance] = useState(12000);
  const [vaultHoldings, setVaultHoldings] = useState(9500);

  const nav = getCurrentNAV(annualDecay);
  const navHistory = generateNAVHistory(annualDecay, 90);
  const timeToZero = getTimeToZero(annualDecay);

  const handleDeposit = (amount: number) => {
    setVaultHoldings(vaultHoldings + amount);
    alert(`Deposited $${amount.toLocaleString()} USDC successfully.`);
  };

  const handleWithdraw = (cvtAmount: number) => {
    const usdcAmount = cvtAmount * nav;
    const fee = usdcAmount * 0.005;
    const netAmount = usdcAmount - fee;
    setVaultHoldings(Math.max(0, vaultHoldings - netAmount));
    alert(`Withdrew ${cvtAmount.toFixed(2)} CVT. Net redemption: $${netAmount.toFixed(2)} USDC`);
  };

  return (
    <main className="min-h-screen bg-[#0a0e27]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Portfolio Dashboard
          </h1>
          <p className="text-gray-400">
            Real-time position monitoring and execution interface
          </p>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111936] border border-[#1a2847] rounded-xl p-8">
            <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Wallet Balance</div>
            <div className="text-4xl font-bold text-white mb-1">
              ${walletBalance.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Available for deposit</div>
          </div>
          <div className="bg-[#111936] border border-[#1a2847] rounded-xl p-8">
            <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Vault Holdings</div>
            <div className="text-4xl font-bold text-cyan-400 mb-1">
              ${vaultHoldings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {(vaultHoldings / nav).toFixed(4)} CVT
            </div>
          </div>
          <div className="bg-[#111936] border border-[#1a2847] rounded-xl p-8">
            <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Current NAV</div>
            <div className="text-4xl font-bold text-white mb-1">${nav.toFixed(4)}</div>
            <div className="text-sm text-red-400 font-semibold">
              -{Math.round(annualDecay * 100)}% annual decay
            </div>
          </div>
        </div>

        {/* Decay Configuration */}
        <div className="mb-12">
          <div className="bg-[#111936] border border-[#1a2847] rounded-xl p-10">
            <h2 className="text-2xl font-bold mb-3 text-white text-center">Decay Rate Configuration</h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
              Adjust your burn rate. Even at minimum (60%), you lose everything in 5 years without a crash.
            </p>
            <DecaySlider annualDecay={annualDecay} onChange={setAnnualDecay} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="bg-[#0d1229] p-6 rounded-lg border border-[#1a2847]">
                <h3 className="font-semibold mb-4 text-white text-base uppercase tracking-wide">Current Configuration</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Time to zero</span>
                    <span className="font-semibold text-white text-sm">
                      {timeToZero}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Capital decay rate</span>
                    <span className="font-bold text-red-400">
                      -{Math.round(annualDecay * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#0d1229] p-6 rounded-lg border border-[#1a2847]">
                <h3 className="font-semibold mb-4 text-white text-base uppercase tracking-wide">Crash Multipliers</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Moderate decline</span>
                    <span className="font-semibold text-cyan-400 text-sm">
                      {(2 + (annualDecay * 3)).toFixed(1)}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Severe decline</span>
                    <span className="font-semibold text-cyan-400 text-sm">
                      {(4 + (annualDecay * 5)).toFixed(1)}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Extreme dislocation</span>
                    <span className="font-bold text-cyan-400">
                      {(8 + (annualDecay * 12)).toFixed(1)}x
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NAV Chart */}
        <div className="mb-12">
          <div className="bg-[#111936] border border-[#1a2847] rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-3 text-white">NAV Performance (90 Days)</h2>
            <p className="text-gray-400 mb-8 text-sm">
              Initial: ${navHistory[0]?.nav.toFixed(4)} | Current: ${nav.toFixed(4)}
              {' '}({((nav / navHistory[0]?.nav - 1) * 100).toFixed(2)}%)
            </p>
            <NAVChart data={navHistory} height={360} />
            <div className="mt-6 p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
              <p className="text-orange-400 text-sm font-medium">
                <span className="font-bold uppercase tracking-wide">Notice:</span> Capital decay accelerates during bull market conditions due to opportunity cost dynamics.
              </p>
            </div>
          </div>
        </div>

        {/* Crash Projections */}
        <div className="mb-12">
          <ProjectionsTable annualDecay={annualDecay} investment={vaultHoldings} />
        </div>

        {/* Deposit & Withdraw */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <DepositModule annualDecay={annualDecay} onDeposit={handleDeposit} />
          <WithdrawModule annualDecay={annualDecay} onWithdraw={handleWithdraw} />
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-orange-500/5 to-red-500/5 border-2 border-orange-500/20 rounded-xl p-8">
          <h3 className="font-bold mb-3 text-orange-400 text-base uppercase tracking-wide">Risk Disclosure</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            This vault systematically erodes capital in normal market environments. Decay rate accelerates during bullish conditions.
            Only suitable for sophisticated allocators with strong bearish convictions. Not appropriate for capital preservation objectives.
            Allocate only capital you can afford to lose entirely.
          </p>
        </div>
      </div>
    </main>
  );
}
