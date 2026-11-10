import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, MicOff, PhoneCall, PhoneOff, ChevronDown, Smartphone, Phone, Sparkles, Volume2, AlertCircle } from 'lucide-react';
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
  const [showPhoneDisplay, setShowPhoneDisplay] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'speaking'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: VAPI_CONFIG_GUIDE.firstMessage
    }
  ]);

  const envPublicKey = (import.meta as any).env?.VITE_VAPI_PUBLIC_KEY || '';
  const envAssistantId = (import.meta as any).env?.VITE_VAPI_ASSISTANT_ID || '';

  const publicKey = localStorage.getItem('vapi_public_key') || (envPublicKey && !envPublicKey.includes('YOUR_') && !envPublicKey.includes('MY_') ? envPublicKey : '');
  const assistantId = localStorage.getItem('vapi_assistant_id') || (envAssistantId && !envAssistantId.includes('YOUR_') && !envAssistantId.includes('MY_') ? envAssistantId : '');

  const vapiRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Initialize Vapi instance when valid key is provided
  useEffect(() => {
    const isRealKey = publicKey && publicKey.trim().length > 10;

    if (isRealKey) {
      try {
        const VapiConstructor = getVapiConstructor();
        if (VapiConstructor) {
          const vapiInstance = new VapiConstructor(publicKey);

          vapiInstance.on('call-start', () => {
            setCallStatus('connected');
            setMicError(null);
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
            console.warn('Vapi error event:', e);
            const isMicError = 
              e?.type?.includes('microphone') || 
              e?.stage?.includes('microphone') || 
              e?.error?.name === 'NotAllowedError' ||
              e?.error?.message?.includes('Permission denied');

            if (isMicError) {
              setMicError('Microphone permission was blocked in your browser. Please allow microphone in your URL bar.');
              // Fallback to speaker mode so the caller still hears Paul speak!
              setCallStatus('speaking');
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(VAPI_CONFIG_GUIDE.firstMessage);
                utterance.onend = () => setCallStatus('connected');
                window.speechSynthesis.speak(utterance);
              }
            } else {
              setCallStatus('idle');
            }
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

  // Duration timer
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
    setMicError(null);

    // Prompt browser for microphone permission cleanly first
    let micGranted = false;
    if (navigator?.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Release test stream tracks so WebRTC gets full access
        stream.getTracks().forEach((track) => track.stop());
        micGranted = true;
      } catch (micErr: any) {
        console.warn('Microphone permission check:', micErr);
        if (micErr.name === 'NotAllowedError' || micErr.message?.includes('Permission denied')) {
          setMicError('Microphone access is blocked in your browser. Please enable it in your browser address bar.');
        }
      }
    }

    const isRealKey = publicKey && publicKey.trim().length > 10;
    const isRealAssistant = assistantId && assistantId.trim().length > 5;

    if (!isRealKey || !isRealAssistant || !micGranted) {
      // Direct speech speaker simulator: begins calling immediately with zero setup required
      setCallStatus('connecting');
      setTimeout(() => {
        setCallStatus('connected');
        setTranscripts([
          {
            sender: 'ai',
            text: VAPI_CONFIG_GUIDE.firstMessage
          }
        ]);
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(VAPI_CONFIG_GUIDE.firstMessage);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          utterance.onstart = () => setCallStatus('speaking');
          utterance.onend = () => setCallStatus('connected');
          window.speechSynthesis.speak(utterance);
        }
      }, 600);
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
    } catch (err: any) {
      console.warn('Error starting call:', err);
      if (err?.name === 'NotAllowedError' || err?.message?.includes('Permission denied')) {
        setMicError('Microphone permission blocked in browser.');
      }
      // Fallback smoothly to simulated voice
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Left) */}
      {!isOpen && (
        <aside aria-label="AI Receptionist" className="fixed bottom-4 left-4 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#0a58ca] hover:bg-[#084298] text-white shadow-2xl border-2 border-white/80 transition-all duration-300 hover:scale-105 cursor-pointer group"
            aria-label="Open AI Voice Receptionist"
          >
            {/* Small avatar thumbnail with online dot */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white shrink-0 bg-blue-100">
              <img
                src="/assets/crops/receptionist_paul.png"
                alt="Paul AI Receptionist"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white"></span>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold tracking-wider text-blue-200 uppercase leading-none">
                AI Receptionist
              </span>
              <span className="text-xs font-bold leading-tight">
                Talk to us!
              </span>
            </div>

            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        </aside>
      )}

      {/* Main Clean Receptionist Card matching user's design image */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white rounded-3xl w-[330px] sm:w-[350px] shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col font-sans">
            
            {/* Header: Solid Royal Blue Bar matching screenshot */}
            <div className="bg-[#0b5ed7] text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg tracking-tight font-display text-white">
                Talk to us!
              </h3>
              <button
                onClick={() => {
                  if (callStatus === 'connected' || callStatus === 'speaking') {
                    handleEndCall();
                  }
                  setIsOpen(false);
                }}
                className="text-white hover:text-blue-100 p-1 rounded-md transition-colors cursor-pointer"
                aria-label="Close widget"
              >
                <ChevronDown className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Card Content Area matching screenshot */}
            <div className="p-6 pt-7 pb-5 flex flex-col items-center text-center space-y-4">
              
              {/* Circular Avatar with Blue Ring and Green Online Indicator */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full p-1 ring-4 ring-[#0b5ed7]/25 border-2 border-[#0b5ed7] shadow-md bg-white">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                    <img
                      src="/assets/crops/receptionist_paul.png"
                      alt="Paul - AI Voice Receptionist"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Green Status Dot matching screenshot */}
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#198754] border-2 border-white shadow-xs"></span>
              </div>

              {/* Name & Title matching screenshot */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Paul
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600">
                    AI
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  AI Voice Receptionist
                </p>
              </div>

              {/* Action Buttons Section */}
              <div className="w-full space-y-2.5 pt-1">
                
                {/* Button 1: "Call us here" (or Active Call Bar if calling) */}
                {callStatus === 'idle' ? (
                  <button
                    onClick={handleStartCall}
                    className="w-full py-3 px-4 rounded-2xl border-2 border-[#0b5ed7] bg-white hover:bg-blue-50/50 text-[#0b5ed7] font-bold text-sm flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Mic className="w-5 h-5 stroke-[2.2]" />
                    <span>Call us here</span>
                  </button>
                ) : (
                  /* Active Call State Controls */
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-3 shadow-lg animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-xs font-bold text-emerald-400">
                          {callStatus === 'connecting'
                            ? 'Connecting...'
                            : callStatus === 'speaking'
                            ? 'Speaking...'
                            : 'Listening...'}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {formatDuration(callDuration)}
                      </span>
                    </div>

                    {/* Audio wave pulse */}
                    <div className="flex items-center justify-center gap-1 py-1">
                      {[10, 22, 14, 28, 16, 24, 12, 20].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-amber-400 rounded-full transition-all duration-150"
                          style={{
                            height: callStatus === 'speaking' ? `${h}px` : '6px',
                            animation: callStatus === 'speaking' ? `pulse 0.7s ease-in-out infinite ${i * 0.1}s` : 'none'
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleToggleMute}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                          isMuted ? 'bg-amber-100 text-amber-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                        title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                      >
                        {isMuted ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={handleEndCall}
                        className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <PhoneOff className="w-4 h-4" />
                        <span>End Call</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Button 2: "Open Interactive Phone Display" matching screenshot */}
                <button
                  onClick={() => setShowPhoneDisplay(!showPhoneDisplay)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-[#f0f6ff] hover:bg-[#e4efff] border border-blue-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-[#0b5ed7]" />
                  <span>{showPhoneDisplay ? 'Hide Phone Display' : 'Open Interactive Phone Display'}</span>
                </button>

                {/* Button 3: "Direct Line: 021 082 57495" matching screenshot */}
                <a
                  href={COMPANY_INFO.phoneTel}
                  className="w-full py-2.5 px-4 rounded-2xl bg-[#f0f6ff] hover:bg-[#e4efff] border border-blue-100 text-[#0b5ed7] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#0b5ed7]" />
                  <span>Direct Line: {COMPANY_INFO.phone}</span>
                </a>

                {/* Microphone blocked banner */}
                {micError && (
                  <div className="w-full p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-left text-[11px] text-amber-900 space-y-1 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-bold text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Microphone access needed</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-normal">
                      Click the lock or camera icon in your browser URL bar to allow microphone access, then tap retry.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setMicError(null);
                        handleStartCall();
                      }}
                      className="text-[10px] font-bold text-[#0b5ed7] hover:underline cursor-pointer block"
                    >
                      Tap here to retry with microphone →
                    </button>
                  </div>
                )}
              </div>

              {/* Collapsible Interactive Phone Display */}
              {showPhoneDisplay && (
                <div className="w-full mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Live Conversation Log</span>
                    <span className="text-emerald-600">Active</span>
                  </div>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto text-xs">
                    {transcripts.map((t, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl text-[11px] leading-relaxed ${
                          t.sender === 'ai'
                            ? 'bg-white border border-slate-200 text-slate-800'
                            : 'bg-blue-100 text-slate-900 ml-3'
                        }`}
                      >
                        <span className="font-bold text-[9px] uppercase text-slate-400 block">
                          {t.sender === 'ai' ? 'Paul (AI)' : 'You'}
                        </span>
                        {t.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer matching screenshot */}
              <div className="w-full pt-3 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-400 font-medium">
                  Powered by <span className="font-bold text-[#0b5ed7]">Signature Paint</span>
                </p>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
