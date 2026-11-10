import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, MicOff, PhoneCall, PhoneOff, Settings, Volume2, Sparkles, Copy, Check, Info, X, HelpCircle } from 'lucide-react';
import { VAPI_CONFIG_GUIDE } from '../data/vapiPrompt';
import { COMPANY_INFO } from '../data/mockData';

// Safely resolve Vapi constructor across ESM / CommonJS / Vite bundling
function getVapiConstructor(): any {
  if (typeof Vapi === 'function') {
    return Vapi;
  }
  if (typeof (Vapi as any)?.default === 'function') {
    return (Vapi as any).default;
  }
  if (typeof (window as any)?.Vapi === 'function') {
    return (window as any).Vapi;
  }
  return null;
}

export const VapiWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'call' | 'setup'>('call');
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'speaking'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcripts, setTranscripts] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: VAPI_CONFIG_GUIDE.firstMessage
    }
  ]);

  // Keys can come from env or localStorage
  const envPublicKey = (import.meta as any).env?.VITE_VAPI_PUBLIC_KEY || '';
  const envAssistantId = (import.meta as any).env?.VITE_VAPI_ASSISTANT_ID || '';

  const [publicKey, setPublicKey] = useState(() => {
    const stored = localStorage.getItem('vapi_public_key');
    if (stored) return stored;
    return envPublicKey && !envPublicKey.includes('YOUR_') && !envPublicKey.includes('MY_') ? envPublicKey : '';
  });
  const [assistantId, setAssistantId] = useState(() => {
    const stored = localStorage.getItem('vapi_assistant_id');
    if (stored) return stored;
    return envAssistantId && !envAssistantId.includes('YOUR_') && !envAssistantId.includes('MY_') ? envAssistantId : '';
  });

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const vapiRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Initialize Vapi instance when publicKey changes
  useEffect(() => {
    const isRealKey = publicKey && 
      publicKey.trim().length > 10 && 
      !publicKey.includes('YOUR_') && 
      !publicKey.includes('MY_');

    if (isRealKey) {
      try {
        const VapiConstructor = getVapiConstructor();
        if (VapiConstructor) {
          const vapiInstance = new VapiConstructor(publicKey);

          vapiInstance.on('call-start', () => {
            setCallStatus('connected');
          });

          vapiInstance.on('call-end', () => {
            setCallStatus('idle');
            clearInterval(timerRef.current);
            setCallDuration(0);
          });

          vapiInstance.on('speech-start', () => {
            setCallStatus('speaking');
          });

          vapiInstance.on('speech-end', () => {
            setCallStatus('connected');
          });

          vapiInstance.on('message', (message: any) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
              setTranscripts((prev) => [
                ...prev,
                {
                  sender: message.role === 'assistant' ? 'ai' : 'user',
                  text: message.transcript
                }
              ]);
            }
          });

          vapiInstance.on('error', (e: any) => {
            console.error('Vapi error:', e);
            setCallStatus('idle');
            clearInterval(timerRef.current);
          });

          vapiRef.current = vapiInstance;
        }
      } catch (err) {
        console.error('Failed to init Vapi:', err);
      }
    }

    return () => {
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (_) {}
      }
      clearInterval(timerRef.current);
    };
  }, [publicKey]);

  // Timer effect
  useEffect(() => {
    if (callStatus === 'connected' || callStatus === 'speaking') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [callStatus]);

  const handleStartCall = async () => {
    const isRealKey = publicKey && 
      publicKey.trim().length > 10 && 
      !publicKey.includes('YOUR_') && 
      !publicKey.includes('MY_');
    const isRealAssistant = assistantId && 
      assistantId.trim().length > 5 && 
      !assistantId.includes('YOUR_') && 
      !assistantId.includes('MY_');

    if (!isRealKey || !isRealAssistant) {
      // Simulate call if keys aren't configured yet so user can test the UI and voice
      setCallStatus('connecting');
      setTimeout(() => {
        setCallStatus('connected');
        setTranscripts([
          {
            sender: 'ai',
            text: VAPI_CONFIG_GUIDE.firstMessage
          }
        ]);
        // Speak using web speech API if available
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(VAPI_CONFIG_GUIDE.firstMessage);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          utterance.onstart = () => setCallStatus('speaking');
          utterance.onend = () => setCallStatus('connected');
          window.speechSynthesis.speak(utterance);
        }
      }, 1000);
      return;
    }

    try {
      if (!vapiRef.current) {
        const VapiConstructor = getVapiConstructor();
        if (VapiConstructor) {
          vapiRef.current = new VapiConstructor(publicKey);
        }
      }

      setCallStatus('connecting');
      if (vapiRef.current) {
        await vapiRef.current.start(assistantId);
      } else {
        throw new Error('Vapi constructor not available');
      }
    } catch (err) {
      console.error('Error starting Vapi call:', err);
      // Fallback gracefully to simulated voice
      setCallStatus('connected');
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(VAPI_CONFIG_GUIDE.firstMessage);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleEndCall = () => {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch (_) {}
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallStatus('idle');
    setCallDuration(0);
  };

  const handleToggleMute = () => {
    if (vapiRef.current) {
      try {
        vapiRef.current.setMuted(!isMuted);
      } catch (_) {}
    }
    setIsMuted(!isMuted);
  };

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('vapi_public_key', publicKey);
    localStorage.setItem('vapi_assistant_id', assistantId);
    setActiveTab('call');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(VAPI_CONFIG_GUIDE.systemPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating AI Receptionist Widget Trigger Button (Bottom Left) */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 border cursor-pointer ${
            callStatus === 'connected' || callStatus === 'speaking'
              ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-400/30 animate-pulse'
              : 'bg-[#0b1a30] hover:bg-slate-900 text-white border-amber-400/80 hover:border-amber-400'
          }`}
          aria-label="Open AI Receptionist"
        >
          {/* Animated Mic Icon */}
          <div className="relative flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full ${callStatus === 'speaking' ? 'bg-amber-400 animate-ping' : 'bg-amber-400'}`}></div>
            <Mic className="w-4 h-4 text-white absolute" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold tracking-wider text-amber-300 uppercase leading-none">
              AI Reception
            </span>
            <span className="text-xs font-bold leading-tight">
              {callStatus === 'idle'
                ? 'Talk to AI Receptionist'
                : callStatus === 'connecting'
                ? 'Connecting...'
                : `In Call (${formatDuration(callDuration)})`}
            </span>
          </div>

          <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1"></span>
        </button>
      </div>

      {/* Main AI Receptionist Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-start p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="bg-[#0b1a30] text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base font-display">
                    Signature AI Reception
                  </h3>
                  <p className="text-[11px] text-amber-300">
                    Instant Voice Quotes & Auckland Support
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab(activeTab === 'call' ? 'setup' : 'call')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'setup' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Receptionist Settings & Prompt"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('call')}
                className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                  activeTab === 'call'
                    ? 'border-b-2 border-amber-500 text-slate-900 bg-white font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Live Voice Call
              </button>
              <button
                onClick={() => setActiveTab('setup')}
                className={`flex-1 py-2.5 text-center transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                  activeTab === 'setup'
                    ? 'border-b-2 border-amber-500 text-slate-900 bg-white font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>AI Reception Settings</span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              </button>
            </div>

            {/* Body: Tab 1 (Live Voice Call) */}
            {activeTab === 'call' && (
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                
                {/* Visualizer & Status Avatar */}
                <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                  <div className="relative mb-3">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                        callStatus === 'speaking'
                          ? 'border-amber-400 bg-amber-50 ring-8 ring-amber-400/20 scale-105'
                          : callStatus === 'connected'
                          ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-400/20'
                          : callStatus === 'connecting'
                          ? 'border-blue-400 bg-blue-50 animate-pulse'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {callStatus === 'idle' ? (
                        <Mic className="w-8 h-8 text-slate-400" />
                      ) : (
                        <Volume2
                          className={`w-8 h-8 ${
                            callStatus === 'speaking'
                              ? 'text-amber-500'
                              : callStatus === 'connected'
                              ? 'text-emerald-600'
                              : 'text-blue-500'
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900">
                      {callStatus === 'idle'
                        ? 'AI Receptionist Ready'
                        : callStatus === 'connecting'
                        ? 'Connecting to AI Reception...'
                        : callStatus === 'speaking'
                        ? 'Receptionist is Speaking...'
                        : 'Listening to you...'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {callStatus === 'idle'
                        ? 'Click below to start a live voice conversation'
                        : `Call Duration: ${formatDuration(callDuration)}`}
                    </p>
                  </div>

                  {/* Audio Wave Bar Indicators */}
                  {(callStatus === 'connected' || callStatus === 'speaking') && (
                    <div className="flex items-center gap-1 mt-3">
                      {[12, 24, 18, 30, 16, 28, 14, 22].map((height, i) => (
                        <span
                          key={i}
                          className="w-1 bg-amber-400 rounded-full transition-all duration-150"
                          style={{
                            height: callStatus === 'speaking' ? `${height}px` : '6px',
                            animation: callStatus === 'speaking' ? `pulse 0.8s ease-in-out infinite ${i * 0.1}s` : 'none'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  {callStatus === 'idle' ? (
                    <button
                      onClick={handleStartCall}
                      className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Start Voice Call With AI Reception</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleToggleMute}
                        className={`p-3 rounded-full border transition-colors cursor-pointer ${
                          isMuted ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                        title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                      >
                        {isMuted ? <MicOff className="w-5 h-5 text-rose-500" /> : <Mic className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={handleEndCall}
                        className="flex-1 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                      >
                        <PhoneOff className="w-4 h-4" />
                        <span>End Voice Call</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Live Conversation Transcript */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Live Transcripts</span>
                    <span className="text-[10px] text-amber-600 font-normal">Real-Time</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 max-h-40 overflow-y-auto">
                    {transcripts.map((t, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-xs leading-relaxed ${
                          t.sender === 'ai'
                            ? 'bg-white border border-slate-200 text-slate-800'
                            : 'bg-amber-100/70 border border-amber-200 text-slate-900 ml-4'
                        }`}
                      >
                        <span className="font-bold text-[10px] uppercase text-slate-400 block mb-0.5">
                          {t.sender === 'ai' ? 'Signature AI' : 'You'}
                        </span>
                        {t.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notice if keys are simulated vs live */}
                {(!publicKey || publicKey === 'YOUR_VAPI_PUBLIC_KEY') && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span>Running in Preview Simulator mode. Click <strong>"AI Reception Settings"</strong> tab above to connect your real Assistant ID!</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Body: Tab 2 (AI Reception Settings & Setup Guide) */}
            {activeTab === 'setup' && (
              <div className="p-5 flex-1 overflow-y-auto space-y-5 text-xs">
                
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#0b1a30] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>AI Receptionist Configuration</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Here are the configuration settings and prompt to power your Auckland painting voice assistant:
                  </p>
                </div>

                {/* 1. Public API Key & Assistant ID Inputs */}
                <form onSubmit={handleSaveKeys} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    1. Voice Assistant Credentials:
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5">
                      Public API Key (Safe for frontend):
                    </label>
                    <input
                      type="text"
                      value={publicKey}
                      onChange={(e) => setPublicKey(e.target.value)}
                      placeholder="e.g. 59f71c42-83b6-4b82-..."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                    />
                    <span className="text-[10px] text-slate-400">Account API Public Key</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5">
                      Assistant ID:
                    </label>
                    <input
                      type="text"
                      value={assistantId}
                      onChange={(e) => setAssistantId(e.target.value)}
                      placeholder="e.g. 48a27d91-3e01-49b2-..."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                    />
                    <span className="text-[10px] text-slate-400">Your Voice Assistant ID</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg font-bold bg-[#0b1a30] hover:bg-slate-800 text-white cursor-pointer transition-colors"
                  >
                    Save & Apply Credentials
                  </button>
                </form>

                {/* 2. System Prompt Ready to Copy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      2. Receptionist Prompt (System Instructions):
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-[10px] cursor-pointer transition-colors"
                    >
                      {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[10px] max-h-36 overflow-y-auto leading-relaxed border border-slate-800">
                    {VAPI_CONFIG_GUIDE.systemPrompt}
                  </div>
                </div>

                {/* 3. First Message & Recommended Voice */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                    3. First Message & Voice Settings:
                  </span>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">First Message:</span>
                    <p className="text-slate-700 italic">"{VAPI_CONFIG_GUIDE.firstMessage}"</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">Recommended Voice:</span>
                    <p className="text-slate-700 font-medium">{VAPI_CONFIG_GUIDE.voiceRecommendation}</p>
                  </div>
                </div>

                {/* 4. What Information the AI Captures */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                  <span className="font-bold text-[11px] uppercase tracking-wider block">
                    4. What Customer Info AI Reception Captures:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                    <li>Caller's Full Name & Phone Number</li>
                    <li>Property Suburb (Papakura, Manukau, Remuera, etc.)</li>
                    <li>Painting Service (Interior, Exterior, Plastering)</li>
                    <li>Preferred Day for FREE On-Site Inspection</li>
                  </ul>
                </div>

              </div>
            )}

            {/* Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Signature Premium Paint Services</span>
              <a href={COMPANY_INFO.phoneTel} className="font-bold text-slate-800 hover:text-amber-600">
                Direct: {COMPANY_INFO.phone}
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
