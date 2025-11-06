import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label }) => {
  return (
    <label htmlFor={label} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id={label}
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={() => onChange(!enabled)}
        />
        <div className={`block w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enabled ? 'translate-x-6' : ''}`}></div>
      </div>
      <div className="ml-3 text-sm text-slate-300">
        {label}
      </div>
    </label>
  );
};
