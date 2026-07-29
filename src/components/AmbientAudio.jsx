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
    compressor.threshold.value = -10;
    compressor.knee.value = 20;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.005;
    compressor.release.value = 0.2;
    compressor.connect(ctx.destination);

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(compressor);
    masterRef.current = master;

    // Soft hall reverb wash.
    const convolver = ctx.createConvolver();
    const reverbDur = 2.2;
    const reverbSamples = Math.ceil(ctx.sampleRate * reverbDur);
    const reverbBuffer = ctx.createBuffer(2, reverbSamples, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch += 1) {
      const data = reverbBuffer.getChannelData(ch);
      for (let i = 0; i < reverbSamples; i += 1) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbSamples, 2.8);
      }
    }
    convolver.buffer = reverbBuffer;

    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.22;
    convolver.connect(wetGain);
    wetGain.connect(compressor);
    master.connect(convolver);

    // Cinematic 432 Hz organ drone: a deep, slowly swelling pad under the damru.
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.34;
    droneGain.connect(master);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 780;
    droneFilter.Q.value = 0.8;
    droneFilter.connect(droneGain);

    // Interstellar-style organ stops.
    const organStops = [
      [216, 0.18],
      [432, 0.24],
      [864, 0.08],
    ];

    organStops.forEach(([freq, amp]) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;

      const stopGain = ctx.createGain();
      stopGain.gain.value = amp;

      osc.connect(stopGain);
      stopGain.connect(droneFilter);
      osc.start();
    });

    // Pure OM harmonic series layered underneath.
    const omFilter = ctx.createBiquadFilter();
    omFilter.type = 'lowpass';
    omFilter.frequency.value = 1600;
    omFilter.Q.value = 0.4;
    omFilter.connect(droneGain);

    const omHarmonics = [
      [108, 0.16],
      [216, 0.2],
      [432, 0.26],
      [648, 0.1],
      [864, 0.04],
      [1080, 0.025],
    ];

    omHarmonics.forEach(([freq, amp]) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const hGain = ctx.createGain();
      hGain.gain.value = amp;

      osc.connect(hGain);
      hGain.connect(omFilter);
      osc.start();
    });

    // Slow amplitude swell for a cinematic pad.
    const swellLfo = ctx.createOscillator();
    swellLfo.type = 'sine';
    swellLfo.frequency.value = 0.04;
    const swellGain = ctx.createGain();
    swellGain.gain.value = 0.1;
    swellLfo.connect(swellGain);
    swellGain.connect(droneGain.gain);
    swellLfo.start();

    // Slow filter sweep for a pipe-organ vowel-like motion.
    const sweepLfo = ctx.createOscillator();
    sweepLfo.type = 'sine';
    sweepLfo.frequency.value = 0.03;
    const sweepGain = ctx.createGain();
    sweepGain.gain.value = 380;
    sweepLfo.connect(sweepGain);
    sweepGain.connect(droneFilter.frequency);
    sweepLfo.start();

    const onStateChange = () => {
      if (ctx.state === 'running') {
        fadeTo(mutedRef.current ? 0 : 1, 1.0);
        setStarted(true);
      }
    };
    ctx.onstatechange = onStateChange;

    ctx.resume().then(() => {
      onStateChange();
    });
  }, [fadeTo]);

  useEffect(() => {
    const wake = () => start();
    window.addEventListener('damru:enter', wake);

    return () => {
      window.removeEventListener('damru:enter', wake);
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
      aria-label={muted ? 'Unmute drone' : 'Mute drone'}
      title={muted ? 'Unmute drone' : 'Mute drone'}
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
