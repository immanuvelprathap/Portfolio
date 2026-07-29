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

  const start = useCallback(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (ctxRef.current) {
      if (ctxRef.current.state !== 'closed') {
        ctxRef.current.resume();
      }
      return;
    }

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -12;
    compressor.knee.value = 20;
    compressor.ratio.value = 6;
    compressor.attack.value = 0.005;
    compressor.release.value = 0.15;
    compressor.connect(ctx.destination);

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(compressor);
    masterRef.current = master;

    // Generated plate reverb for a temple-like space.
    const convolver = ctx.createConvolver();
    const reverbDur = 2.4;
    const reverbSamples = Math.ceil(ctx.sampleRate * reverbDur);
    const reverbBuffer = ctx.createBuffer(2, reverbSamples, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch += 1) {
      const data = reverbBuffer.getChannelData(ch);
      for (let i = 0; i < reverbSamples; i += 1) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbSamples, 2.6);
      }
    }
    convolver.buffer = reverbBuffer;

    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.32;
    convolver.connect(wetGain);
    wetGain.connect(compressor);
    master.connect(convolver);

    // Consciousness drone: 432 Hz tanpura (Sa / Pa / Sa) with a 4.5 Hz theta binaural beat.
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.24;
    droneGain.connect(master);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 960;
    droneFilter.Q.value = 0.5;
    droneFilter.connect(droneGain);

    const theta = 4.5;
    const droneBases = [108, 162, 216];
    droneBases.forEach((f) => {
      const left = ctx.createOscillator();
      left.type = 'triangle';
      left.frequency.value = f - theta / 2;

      const right = ctx.createOscillator();
      right.type = 'triangle';
      right.frequency.value = f + theta / 2;

      const leftPan = ctx.createStereoPanner();
      leftPan.pan.value = -1;
      const rightPan = ctx.createStereoPanner();
      rightPan.pan.value = 1;

      left.connect(leftPan);
      right.connect(rightPan);
      leftPan.connect(droneFilter);
      rightPan.connect(droneFilter);
      left.start();
      right.start();
    });

    // Solfeggio overtone for clarity / awakening (528 Hz, 963 Hz).
    [528, 963].forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.value = freq === 528 ? 0.05 : 0.025;
      osc.connect(gain);
      gain.connect(master);
      osc.start();
    });

    // Slow breathing motion on the drone.
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain);
    lfoGain.connect(droneGain.gain);
    lfo.start();

    // One damru strike: two-headed drum "dam" then "ru".
    const playStrike = (when) => {
      // Dam - bright head dropping from Sa 432 to lower Sa 216.
      const damGain = ctx.createGain();
      damGain.gain.setValueAtTime(0.8, when);
      damGain.gain.exponentialRampToValueAtTime(0.001, when + 0.13);
      damGain.connect(master);

      const damOsc = ctx.createOscillator();
      damOsc.type = 'triangle';
      damOsc.frequency.setValueAtTime(432, when);
      damOsc.frequency.exponentialRampToValueAtTime(216, when + 0.13);
      damOsc.connect(damGain);
      damOsc.start(when);
      damOsc.stop(when + 0.13);

      // Ru - low head dropping from 216 to 108.
      const ruGain = ctx.createGain();
      ruGain.gain.setValueAtTime(0.65, when + 0.07);
      ruGain.gain.exponentialRampToValueAtTime(0.001, when + 0.28);
      ruGain.connect(master);

      const ruOsc = ctx.createOscillator();
      ruOsc.type = 'sine';
      ruOsc.frequency.setValueAtTime(216, when + 0.07);
      ruOsc.frequency.exponentialRampToValueAtTime(108, when + 0.28);
      ruOsc.connect(ruGain);
      ruOsc.start(when + 0.07);
      ruOsc.stop(when + 0.28);

      // Drum skin snap.
      const len = 0.05;
      const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * len), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * 0.9;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 2600;
      noiseFilter.Q.value = 0.9;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, when);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, when + len);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(when);
    };

    nextHitRef.current = ctx.currentTime + 0.05;

    const tick = () => {
      if (!ctxRef.current || ctxRef.current.state !== 'running') return;
      while (nextHitRef.current < ctxRef.current.currentTime + 0.5) {
        playStrike(nextHitRef.current);
        nextHitRef.current += 1.75;
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 220);

    const onStateChange = () => {
      if (ctx.state === 'running') {
        fadeTo(mutedRef.current ? 0 : 1, 0.6);
        setStarted(true);
      }
    };
    ctx.onstatechange = onStateChange;

    // Resume synchronously inside the user-gesture stack; also handle the promise.
    ctx.resume().then(() => {
      onStateChange();
    });
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
    fadeTo(muted ? 0 : 1, 0.25);
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
