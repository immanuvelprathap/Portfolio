import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md';

const AudioButton = styled.button`
  position: fixed;
  bottom: 2.4rem;
  right: 2.4rem;
  z-index: 200;
  width: 4.8rem;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.62);
  border: 1px solid var(--line);
  color: var(--blue-bright);
  backdrop-filter: blur(12px);
  transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    border-color: var(--blue);
    color: var(--white);
    transform: scale(1.08);
  }

  svg {
    width: 2.2rem;
    height: 2.2rem;
  }

  .audio-ping {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid var(--blue);
    opacity: ${({ $playing }) => ($playing ? 0.6 : 0)};
    animation: ${({ $playing }) => ($playing ? 'ping 2.4s ease-out infinite' : 'none')};
  }

  @keyframes ping {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.45); opacity: 0; }
  }

  @media only screen and (max-width: 768px) {
    bottom: 1.6rem;
    right: 1.6rem;
    width: 4.2rem;
    height: 4.2rem;

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export default function AmbientAudio() {
  const [muted, setMuted] = useState(
    () => localStorage.getItem('ambient-muted') === 'true'
  );
  const [started, setStarted] = useState(false);

  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const intervalRef = useRef(null);
  const nextHitRef = useRef(0);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const fadeTo = useCallback((target, duration = 0.3) => {
    if (!masterRef.current || !ctxRef.current) return;
    const now = ctxRef.current.currentTime;
    masterRef.current.gain.cancelScheduledValues(now);
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now);
    masterRef.current.gain.linearRampToValueAtTime(target, now + duration);
  }, []);

  const start = useCallback(async () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    // Resume existing context if available.
    if (ctxRef.current) {
      if (ctxRef.current.state === 'suspended') {
        try {
          await ctxRef.current.resume();
          fadeTo(mutedRef.current ? 0 : 1, 0.8);
          setStarted(true);
        } catch {
          // Ignore.
        }
      }
      return;
    }

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    // Tanpura-style drone: Sa, Pa, upper Sa.
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.08;
    droneGain.connect(master);

    const droneFreqs = [110, 165, 220];
    droneFreqs.forEach((f) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.connect(droneGain);
      osc.start();
    });

    // Slow breathing motion on the drone.
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain);
    lfoGain.connect(droneGain.gain);
    lfo.start();

    // One damru strike: two-headed drum - "dam" then "ru".
    const playStrike = (when) => {
      // Dam - high tone dropping.
      const damGain = ctx.createGain();
      damGain.gain.setValueAtTime(0.28, when);
      damGain.gain.exponentialRampToValueAtTime(0.001, when + 0.12);
      damGain.connect(master);

      const damOsc = ctx.createOscillator();
      damOsc.type = 'triangle';
      damOsc.frequency.setValueAtTime(175, when);
      damOsc.frequency.exponentialRampToValueAtTime(95, when + 0.12);
      damOsc.connect(damGain);
      damOsc.start(when);
      damOsc.stop(when + 0.12);

      // Ru - lower tone dropping.
      const ruGain = ctx.createGain();
      ruGain.gain.setValueAtTime(0.22, when + 0.12);
      ruGain.gain.exponentialRampToValueAtTime(0.001, when + 0.3);
      ruGain.connect(master);

      const ruOsc = ctx.createOscillator();
      ruOsc.type = 'sine';
      ruOsc.frequency.setValueAtTime(95, when + 0.12);
      ruOsc.frequency.exponentialRampToValueAtTime(58, when + 0.3);
      ruOsc.connect(ruGain);
      ruOsc.start(when + 0.12);
      ruOsc.stop(when + 0.3);

      // Brief noise texture for the drum skin.
      const len = 0.06;
      const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * len), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 650;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, when);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, when + len);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(when);
    };

    const lookAhead = 0.1;
    nextHitRef.current = ctx.currentTime + lookAhead;

    const tick = () => {
      if (!ctxRef.current || ctxRef.current.state !== 'running') return;
      while (nextHitRef.current < ctxRef.current.currentTime + 0.5) {
        playStrike(nextHitRef.current);
        nextHitRef.current += 1.55;
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 250);

    try {
      await ctx.resume();
      fadeTo(mutedRef.current ? 0 : 1, 2.4);
      setStarted(true);
    } catch {
      // AudioContext could not start.
    }
  }, [fadeTo]);

  useEffect(() => {
    const wake = () => start();
    window.addEventListener('damru:enter', wake);

    return () => {
      window.removeEventListener('damru:enter', wake);
      if (intervalRef.current) clearInterval(intervalRef.current);
      ctxRef.current?.close();
    };
  }, [start]);

  useEffect(() => {
    fadeTo(muted ? 0 : 1, 0.4);
    localStorage.setItem('ambient-muted', muted.toString());
  }, [muted, fadeTo]);

  return (
    <AudioButton
      type="button"
      $playing={started && !muted}
      aria-label={muted ? 'Unmute damru' : 'Mute damru'}
      title={muted ? 'Unmute damru' : 'Mute damru'}
      onClick={() => {
        start();
        setMuted((m) => !m);
      }}
    >
      <span className="audio-ping" aria-hidden="true" />
      {muted ? <MdVolumeOff /> : <MdVolumeUp />}
    </AudioButton>
  );
}
