import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function SongOfDay({ state, setState, currentProfile, pName }) {
  const [name, setName] = useState('')
  const [artist, setArtist] = useState('')

  const key = `p${currentProfile}`
  const otherKey = `p${currentProfile === 1 ? 2 : 1}`
  const song = state.songs[key] || state.songs[otherKey]

  function addSong() {
    if (!name.trim()) return
    setState(s => ({
      ...s,
      songs: { ...s.songs, [key]: { name: name.trim(), artist: artist.trim(), from: currentProfile } }
    }))
    setName('')
    setArtist('')
  }

  return (
    <div style={{
      background: 'var(--cream)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 2px 16px var(--shadow)',
      border: '1px solid rgba(232,223,240,0.5)',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #c8a8d8, #9a70b0)' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🎵</span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: 'var(--mauve)', fontWeight: 600 }}>
            Song of the day
          </span>
          <span style={{
            marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '20px',
            background: '#ede4ef', color: '#8a6090',
          }}>shared</span>
        </div>

        <AnimatePresence mode="wait">
          {song ? (
            <motion.div
              key={song.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.9rem',
                padding: '0.9rem', marginBottom: '1rem',
                background: 'linear-gradient(135deg, #f0e4f0, #fce8f0)',
                borderRadius: '14px', border: '1px solid #dfc0df',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{ fontSize: '2rem', flexShrink: 0 }}
              >🎶</motion.div>
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a890a8' }}>
                  shared by {pName(song.from)} {song.from === 1 ? '🌸' : '🌿'}
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.98rem', color: 'var(--mauve)', marginTop: '0.1rem' }}>
                  {song.name}
                </div>
                {song.artist && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--mauve-light)' }}>{song.artist}</div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--mauve-light)', fontSize: '0.82rem', marginBottom: '1rem', opacity: 0.7 }}
            >
              no song yet — share what you're listening to 🎧
            </motion.p>
          )}
        </AnimatePresence>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addSong()}
          placeholder="Song name"
          style={{
            width: '100%', border: '1.5px solid var(--blush)', borderRadius: '10px',
            padding: '0.6rem 0.85rem', fontSize: '0.875rem', background: 'var(--parchment)',
            color: 'var(--text)', outline: 'none', transition: 'border 0.2s', marginBottom: '0.4rem', display: 'block',
          }}
          onFocus={e => e.target.style.borderColor = '#c8a8d8'}
          onBlur={e => e.target.style.borderColor = 'var(--blush)'}
        />
        <input
          type="text"
          value={artist}
          onChange={e => setArtist(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addSong()}
          placeholder="Artist"
          style={{
            width: '100%', border: '1.5px solid var(--blush)', borderRadius: '10px',
            padding: '0.6rem 0.85rem', fontSize: '0.875rem', background: 'var(--parchment)',
            color: 'var(--text)', outline: 'none', transition: 'border 0.2s', marginBottom: '0.6rem', display: 'block',
          }}
          onFocus={e => e.target.style.borderColor = '#c8a8d8'}
          onBlur={e => e.target.style.borderColor = 'var(--blush)'}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={addSong}
            style={{
              background: '#9a70b0', color: 'white', border: 'none',
              borderRadius: '50px', padding: '0.5rem 1.1rem', fontWeight: 700, fontSize: '0.8rem',
            }}
          >Share it 🎵</motion.button>
        </div>
      </div>
    </div>
  )
}
