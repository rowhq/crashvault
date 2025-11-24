'use client';

import { MIN_ANNUAL_DECAY, MAX_ANNUAL_DECAY, getTimeToZero } from '@/lib/types';

interface DecaySliderProps {
  annualDecay: number;
  onChange: (decay: number) => void;
}

export default function DecaySlider({ annualDecay, onChange }: DecaySliderProps) {
  const percentage = Math.round(annualDecay * 100);
  const timeToZero = getTimeToZero(annualDecay);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-[#111936] to-[#0d1229] p-8 rounded-2xl border border-[#1a2847]">
        <div className="mb-8 text-center">
          <div className="text-6xl font-black text-white mb-3 tracking-tight">
            -{percentage}%
            <span className="text-2xl text-gray-400 font-semibold ml-2">annual</span>
          </div>
          <div className="text-lg text-red-400 font-bold">
            Lose everything in {timeToZero} without crash
          </div>
        </div>

        <div className="relative">
          <input
            type="range"
            min={MIN_ANNUAL_DECAY * 100}
            max={MAX_ANNUAL_DECAY * 100}
            step={1}
            value={annualDecay * 100}
            onChange={(e) => onChange(parseFloat(e.target.value) / 100)}
            className="w-full h-3 bg-[#0a0e27] rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-6
                       [&::-webkit-slider-thumb]:h-6
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-gradient-to-r
                       [&::-webkit-slider-thumb]:from-cyan-400
                       [&::-webkit-slider-thumb]:to-blue-500
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:shadow-cyan-500/50
                       [&::-webkit-slider-thumb]:border-2
                       [&::-webkit-slider-thumb]:border-white
                       [&::-moz-range-thumb]:w-6
                       [&::-moz-range-thumb]:h-6
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-gradient-to-r
                       [&::-moz-range-thumb]:from-cyan-400
                       [&::-moz-range-thumb]:to-blue-500
                       [&::-moz-range-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:shadow-lg
                       [&::-moz-range-thumb]:border-2
                       [&::-moz-range-thumb]:border-white"
            style={{
              background: `linear-gradient(to right,
                rgb(34 211 238) 0%,
                rgb(251 146 60) ${((annualDecay - MIN_ANNUAL_DECAY) / (MAX_ANNUAL_DECAY - MIN_ANNUAL_DECAY)) * 100}%,
                rgb(239 68 68) 100%)`
            }}
          />
        </div>

        <div className="flex justify-between mt-6 text-sm">
          <div className="text-left">
            <div className="text-cyan-400 font-bold">{Math.round(MIN_ANNUAL_DECAY * 100)}% MIN</div>
            <div className="text-gray-500 text-xs mt-1">Lose all in 5 years</div>
          </div>
          <div className="text-right">
            <div className="text-red-400 font-bold">{Math.round(MAX_ANNUAL_DECAY * 100)}% MAX</div>
            <div className="text-gray-500 text-xs mt-1">Lose all in ~2 months</div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-orange-500/10 border-2 border-orange-500/30 rounded-xl">
        <p className="text-orange-300 text-sm font-semibold text-center leading-relaxed">
          ⚠️ <strong>EXTREME BURN RATE:</strong> Even at minimum (60%), you lose everything in 5 years if no crash happens. This is crash insurance, not an investment.
        </p>
      </div>
    </div>
  );
}
