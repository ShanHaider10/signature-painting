import React, { useState } from 'react';
import { POPULAR_COLORS } from '../data/mockData';
import { ColorSwatch } from '../types';
import { Palette, Check, Sparkles, Sliders, ArrowRight } from 'lucide-react';

interface ColorVisualizerProps {
  onOpenEstimate: () => void;
}

export const ColorVisualizer: React.FC<ColorVisualizerProps> = ({ onOpenEstimate }) => {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(POPULAR_COLORS[0]);
  const [sheen, setSheen] = useState<'Matt' | 'Low Sheen' | 'Semi-Gloss'>('Low Sheen');

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: selectedColor.hex }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Room Preview that updates live! */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Colour Swatch Preview</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Explore Auckland’s Most Loved Paint Tones
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Wondering how a shade behaves under natural Kiwi light? Test our trade-curated palette from Dulux New Zealand and Resene.
            </p>

            {/* Room simulator canvas */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl p-6 transition-colors duration-500 min-h-[260px] flex flex-col justify-between"
              style={{ backgroundColor: selectedColor.hex }}
            >
              {/* Overlay for sheen and architectural shadows */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none"></div>

              {/* Top Room Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                  <span className="font-bold text-white">{selectedColor.name}</span>
                  <span className="text-slate-400 ml-1.5">({selectedColor.brand})</span>
                </div>
                <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-amber-300">
                  {selectedColor.code}
                </div>
              </div>

              {/* Interior Living Room Mock Silhouette */}
              <div className="relative z-10 my-4 text-center">
                <div className="inline-block bg-slate-950/85 backdrop-blur-md p-4 rounded-xl max-w-sm text-left border border-slate-700/80 shadow-lg">
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    "{selectedColor.description}"
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Recommended Sheen:</span>
                    <span className="font-bold text-amber-300">{sheen}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Room Footer */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 bg-slate-950/70 p-2 rounded-lg backdrop-blur-xs">
                <span>Natural North-Facing Light Simulation</span>
                <span className="font-semibold text-amber-400">Dulux / Resene Premium System</span>
              </div>
            </div>

            {/* Sheen Selector */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-400 font-medium">Sheen Finish:</span>
              {(['Matt', 'Low Sheen', 'Semi-Gloss'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSheen(s)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    sheen === s
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Clickable Swatches */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Select A Popular Colour To Preview:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {POPULAR_COLORS.map((color) => {
                const isSelected = selectedColor.id === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {/* Circle Swatch */}
                    <div
                      className="w-10 h-10 rounded-full border border-slate-600 shrink-0 shadow-sm flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check className="w-5 h-5 text-slate-950 drop-shadow-sm stroke-[3]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">
                          {color.name}
                        </span>
                        <span className="text-[10px] text-amber-300 font-mono">
                          {color.brand}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {color.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Need In-Home Swatch testing? */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
              <div>
                <p className="text-xs font-bold text-white">Need Free Sample Brush-Outs?</p>
                <p className="text-[11px] text-slate-400">We bring large colour fan decks and test pots to your Auckland home.</p>
              </div>
              <button
                onClick={onOpenEstimate}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 shrink-0 cursor-pointer"
              >
                Book Colour Visit →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
