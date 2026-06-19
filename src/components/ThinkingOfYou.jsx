import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function ThinkingOfYou({ state, setState, currentProfile, pName }) {
  const [input, setInput] = useState('')

  function send() {
    const val = input.trim()
    if (!val) return
    setState(s => ({ ...s, thinking: { msg: val, from: currentProfile } }))
    setInput('')
  }

  return (
    <div style={{
      background: 'var(--cream)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 2px 16px var(--shadow)',
      border: '1px solid rgba(232,196,184,0.35)',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--rose), var(--rose-dark))' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem' }}>
          <span style={{ fontSize: '1.1rem' }}>💌</span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: 'var(--mauve)', fontWeight: 600 }}>
            Thinking of you...
          </span>
          <span style={{
            marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '20px',
            background: 'var(--blush)', color: 'var(--rose-dark)',
          }}>shared</span>
        </div>

        {/* Message display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state.thinking?.msg || 'empty'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            style={{
              background: 'linear-gradient(135deg, #fdf0eb, #fce8e0)',
              borderRadius: '14px',
              padding: '1rem 1.1rem',
              marginBottom: '1rem',
              border: '1px solid var(--rose)',
              minHeight: '72px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--mauve-light)', marginBottom: '0.4rem',
            }}>latest message</div>
            <div style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '1.15rem',
              color: 'var(--mauve)',
              lineHeight: 1.5,
            }}>
              {state.thinking
                ? `"${state.thinking.msg}" — ${pName(state.thinking.from)}`
                : 'no message yet — send one! 🌷'}
            </div>
          </motion.div>
        </AnimatePresence>

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a sweet little message..."
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          style={{
            width: '100%', border: '1.5px solid var(--blush)', borderRadius: '12px',
            padding: '0.7rem 0.9rem', fontSize: '0.875rem', background: 'var(--parchment)',
            color: 'var(--text)', outline: 'none', resize: 'none', minHeight: '68px',
            transition: 'border 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--rose-dark)'}
          onBlur={e => e.target.style.borderColor = 'var(--blush)'}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.6rem' }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={send}
            style={{
              background: 'var(--rose-dark)', color: 'white', border: 'none',
              borderRadius: '50px', padding: '0.55rem 1.2rem', fontWeight: 700,
              fontSize: '0.8rem', letterSpacing: '0.03em',
            }}
          >
            Send with love 🌸
          </motion.button>
        </div>
      </div>
    </div>
  )
}
