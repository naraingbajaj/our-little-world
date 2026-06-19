import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function LoveNotes({ state, setState, currentProfile, pName }) {
  const [input, setInput] = useState('')

  function addNote() {
    const val = input.trim()
    if (!val) return
    setState(s => ({
      ...s,
      notes: [{ text: val, from: currentProfile, id: Date.now() }, ...s.notes]
    }))
    setInput('')
  }

  function delNote(id) {
    setState(s => ({ ...s, notes: s.notes.filter(n => n.id !== id) }))
  }

  const noteStyles = {
    1: { bg: '#fce8e2', border: '1px solid #f0c4b8', authorColor: 'var(--rose-dark)' },
    2: { bg: '#e4f0e0', border: '1px solid #b8d4b0', authorColor: 'var(--sage-dark)' },
  }

  return (
    <div style={{
      background: 'var(--cream)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 2px 16px var(--shadow)',
      border: '1px solid rgba(232,196,184,0.25)',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--rose), var(--rose-dark))' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem' }}>
          <span style={{ fontSize: '1.1rem' }}>💕</span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: 'var(--mauve)', fontWeight: 600 }}>
            Love notes pinboard
          </span>
          <span style={{
            marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '20px',
            background: '#ede4ef', color: '#8a6090',
          }}>shared</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '0.6rem',
          marginBottom: '1rem',
          minHeight: '60px',
        }}>
          <AnimatePresence>
            {state.notes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  gridColumn: '1/-1', textAlign: 'center',
                  fontStyle: 'italic', color: 'var(--mauve-light)', fontSize: '0.82rem', padding: '1rem 0',
                }}
              >
                no notes yet — leave each other something sweet 🌷
              </motion.div>
            )}
            {state.notes.slice(0, 8).map(n => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ rotate: 1, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: '0.85rem',
                  borderRadius: '12px',
                  background: noteStyles[n.from].bg,
                  border: noteStyles[n.from].border,
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  position: 'relative',
                  minHeight: '80px',
                  wordBreak: 'break-word',
                }}
              >
                <button
                  onClick={() => delNote(n.id)}
                  style={{
                    position: 'absolute', top: '0.35rem', right: '0.45rem',
                    background: 'none', border: 'none', fontSize: '0.65rem', opacity: 0.3, cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.target.style.opacity = 0.8; e.target.style.color = '#c05050' }}
                  onMouseLeave={e => { e.target.style.opacity = 0.3; e.target.style.color = 'inherit' }}
                >✕</button>
                <div style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', marginBottom: '0.35rem',
                  color: noteStyles[n.from].authorColor,
                }}>
                  {pName(n.from)} {n.from === 1 ? '🌸' : '🌿'}
                </div>
                <div style={{ fontFamily: 'Dancing Script, cursive', fontSize: '0.95rem', color: 'var(--mauve)' }}>
                  {n.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Leave a little note for them..."
            style={{
              flex: 1, border: '1.5px solid var(--blush)', borderRadius: '12px',
              padding: '0.65rem 0.85rem', fontSize: '0.875rem', background: 'var(--parchment)',
              color: 'var(--text)', outline: 'none', resize: 'none', minHeight: '55px',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--rose-dark)'}
            onBlur={e => e.target.style.borderColor = 'var(--blush)'}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addNote}
            style={{
              background: 'var(--rose-dark)', color: 'white', border: 'none',
              borderRadius: '10px', padding: '0.6rem 0.9rem', fontWeight: 700,
              fontSize: '0.8rem', flexShrink: 0,
            }}
          >Pin 📌</motion.button>
        </div>
      </div>
    </div>
  )
}
