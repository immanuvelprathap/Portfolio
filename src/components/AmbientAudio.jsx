import { useEffect, useRef, useState } from 'react';
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

const HiddenAudio = styled.audio`
  display: none;
`;

export default function AmbientAudio() {
  const [muted, setMuted] = useState(
    () => localStorage.getItem('ambient-muted') === 'true'
  );
  const [started, setStarted] = useState(false);

  const audioRef = useRef(null);
  const initialMuted = localStorage.getItem('ambient-muted') === 'true';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.8;
    audio.muted = initialMuted;

    const handlePlay = () => setStarted(true);
    const handlePause = () => setStarted(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
    };
  }, [initialMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
    localStorage.setItem('ambient-muted', muted.toString());
  }, [muted]);

  useEffect(() => {
    const wake = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    window.addEventListener('damru:enter', wake);

    return () => {
      window.removeEventListener('damru:enter', wake);
    };
  }, []);

  const toggleMuted = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setMuted((m) => !m);
    audio.play().catch(() => {});
  };

  return (
    <>
      <AudioButton
        type="button"
        $playing={started && !muted}
        aria-label={muted ? 'Unmute drone' : 'Mute drone'}
        title={muted ? 'Unmute drone' : 'Mute drone'}
        onClick={toggleMuted}
      >
        <span className="audio-ping" aria-hidden="true" />
        {muted ? <MdVolumeOff /> : <MdVolumeUp />}
      </AudioButton>
      <HiddenAudio ref={audioRef} src="/audio/drone.mp3" />
    </>
  );
}
