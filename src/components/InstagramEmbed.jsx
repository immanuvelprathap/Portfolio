import { useEffect, useRef } from 'react';

export default function InstagramEmbed({ shortcode, caption }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const processEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process) {
        requestAnimationFrame(() => window.instgrm.Embeds.process());
      }
    };

    if (!document.querySelector('script[data-instagram-embed="true"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      script.dataset.instagramEmbed = 'true';
      script.onload = processEmbeds;
      document.body.appendChild(script);
    } else {
      processEmbeds();
    }
  }, []);

  return (
    <blockquote
      ref={ref}
      className="instagram-media"
      data-instgrm-permalink={`https://www.instagram.com/p/${shortcode}/?utm_source=ig_embed&utm_campaign=loading`}
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        border: 0,
        borderRadius: '24px',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
        margin: '0 auto',
        maxWidth: '540px',
        minWidth: '280px',
        padding: 0,
        width: '100%',
      }}
    >
      <p style={{ color: '#c9c9c9', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: 17, marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <a
          href={`https://www.instagram.com/p/${shortcode}/?utm_source=ig_embed&utm_campaign=loading`}
          style={{ color: '#c9c9c9', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '17px', textDecoration: 'none' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {caption || 'View this post on Instagram'}
        </a>
      </p>
    </blockquote>
  );
}
