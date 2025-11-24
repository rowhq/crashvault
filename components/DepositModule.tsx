'use client';

import { useState } from 'react';
import { calculateCVT, getCurrentNAV } from '@/lib/calculations';

interface DepositModuleProps {
  annualDecay: number;
  onDeposit?: (amount: number) => void;
}

export default function DepositModule({ annualDecay, onDeposit }: DepositModuleProps) {
  const [amount, setAmount] = useState<string>('');
  const nav = getCurrentNAV(annualDecay);
  const cvtAmount = amount ? calculateCVT(parseFloat(amount), annualDecay) : 0;

  const handleDeposit = () => {
    if (amount && parseFloat(amount) > 0) {
      onDeposit?.(parseFloat(amount));
      setAmount('');
    }
  };

  return (
    <div className="w-full bg-[#111936] border border-[#1a2847] rounded-xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-white">Deposit USDC</h3>

      <div className="space-y-6">
        <div>
          <label htmlFor="deposit-amount" className="block text-sm text-gray-400 mb-3 font-medium">
            Deposit Amount
          </label>
          <div className="relative">
            <input
              id="deposit-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000.00"
              className="w-full px-6 py-4 bg-[#0d1229] border border-[#1a2847] rounded-lg text-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-600"
              min="0"
              step="0.01"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">
              USDC
            </span>
          </div>
        </div>

        <div className="bg-[#0d1229] p-6 rounded-lg border border-[#1a2847] space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current NAV</span>
            <span className="font-semibold text-white">${nav.toFixed(4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">CVT tokens received</span>
            <span className="font-bold text-xl text-cyan-400">{cvtAmount.toFixed(4)} CVT</span>
          </div>
        </div>

        <button
          onClick={handleDeposit}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-bold text-base hover:from-cyan-400 hover:to-blue-500 transition-colors disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/10"
        >
          Confirm Deposit
        </button>

        <p className="text-xs text-gray-500 text-center">
          Instant settlement. Withdraw at current NAV anytime.
        </p>
      </div>
    </div>
  );
}
