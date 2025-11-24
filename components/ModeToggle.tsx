'use client';

import { VaultMode, MODE_CONFIGS } from '@/lib/types';

interface ModeToggleProps {
  mode: VaultMode;
  onChange: (mode: VaultMode) => void;
}

export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-xl border border-[#1a2847] p-1 bg-[#0d1229]">
      <button
        onClick={() => onChange('high-octane')}
        className={`px-10 py-3.5 rounded-lg text-sm font-bold transition-all ${
          mode === 'high-octane'
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
            : 'bg-transparent text-gray-400 hover:text-white hover:bg-[#1a2847]'
        }`}
      >
        {MODE_CONFIGS['high-octane'].displayName}
      </button>
      <button
        onClick={() => onChange('long-glide')}
        className={`px-10 py-3.5 rounded-lg text-sm font-bold transition-all ${
          mode === 'long-glide'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
            : 'bg-transparent text-gray-400 hover:text-white hover:bg-[#1a2847]'
        }`}
      >
        {MODE_CONFIGS['long-glide'].displayName}
      </button>
    </div>
  );
}
