'use client';

import { useState } from 'react';
import { calculateUSDC, getCurrentNAV } from '@/lib/calculations';

interface WithdrawModuleProps {
  annualDecay: number;
  onWithdraw?: (amount: number) => void;
}

export default function WithdrawModule({ annualDecay, onWithdraw }: WithdrawModuleProps) {
  const [amount, setAmount] = useState<string>('');
  const nav = getCurrentNAV(annualDecay);
  const usdcAmount = amount ? calculateUSDC(parseFloat(amount), annualDecay) : 0;
  const feeAmount = usdcAmount * 0.005;
  const netAmount = usdcAmount - feeAmount;

  const handleWithdraw = () => {
    if (amount && parseFloat(amount) > 0) {
      onWithdraw?.(parseFloat(amount));
      setAmount('');
    }
  };

  return (
    <div className="w-full bg-[#111936] border border-[#1a2847] rounded-xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-white">Withdraw CVT</h3>

      <div className="space-y-6">
        <div>
          <label htmlFor="withdraw-amount" className="block text-sm text-gray-400 mb-3 font-medium">
            Withdrawal Amount
          </label>
          <div className="relative">
            <input
              id="withdraw-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
              className="w-full px-6 py-4 bg-[#0d1229] border border-[#1a2847] rounded-lg text-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-600"
              min="0"
              step="0.01"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">
              CVT
            </span>
          </div>
        </div>

        <div className="bg-[#0d1229] p-6 rounded-lg border border-[#1a2847] space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current NAV</span>
            <span className="font-semibold text-white">${nav.toFixed(4)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Gross redemption</span>
            <span className="text-gray-300">${usdcAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Withdrawal fee (0.5%)</span>
            <span className="text-red-400">-${feeAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-[#1a2847]">
            <span className="text-gray-400 font-medium">Net redemption</span>
            <span className="font-bold text-xl text-cyan-400">${netAmount.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-lg font-bold text-base hover:from-orange-400 hover:to-red-500 transition-colors disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed shadow-lg shadow-orange-500/10"
        >
          Confirm Withdrawal
        </button>

        <p className="text-xs text-gray-500 text-center">
          Instant settlement at current NAV.
        </p>
      </div>
    </div>
  );
}
