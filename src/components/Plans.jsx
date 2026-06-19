import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Plans({ state, setState }) {
  const [text, setText] = useState('')
  const [date, setDate] = useState('')

  function addPlan() {
    if (!text.trim()) return
    const newPlan = { text: text.trim(), date, id: Date.now() }
    setState(s => ({
      ...s,
      plans: [...s.plans, newPlan].sort((a, b) => {
        if (!a.date && !b.date) return 0
        if (!a.date) return 1
        if (!b.date) return -1
        return a.date > b.date ? 1 : -1
      })
    }))
    setText('')
    setDate('')
  }

  function delPlan(id) {
    setState(s => ({ ...s, plans: s.plans.filter(p => p.id !== id) }))
  }

  function formatDate(d) {
    if (!d) return 'soon'
    return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div style={{
      background: 'var(--cream)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 2px 16px var(--shadow)',
      border: '1px solid rgba(168,184,154,0.35)',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--sage), var(--sage-dark))' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem' }}>
          <span style={{ fontSize: '1.1rem' }}>📅</span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: 'var(--mauve)', fontWeight: 600 }}>
            Plans together
          </span>
          <span style={{
            marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '20px',
            background: '#ede4ef', color: '#8a6090',
          }}>shared</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.9rem', minHeight: '40px' }}>
          <AnimatePresence>
            {state.plans.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--mauve-light)', fontSize: '0.82rem', padding: '0.5rem 0', opacity: 0.7 }}
              >
                no plans yet — what are we doing? 💕
              </motion.div>
            )}
            {state.plans.map(pl => (
              <motion.div
                key={pl.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                  padding: '0.55rem 0.75rem', background: 'var(--parchment)',
                  borderRadius: '10px', fontSize: '0.83rem',
                }}
              >
                <span style={{ fontWeight: 700, color: 'var(--sage-dark)', fontSize: '0.75rem', flexShrink: 0, minWidth: '55px' }}>
                  📅 {formatDate(pl.date)}
                </span>
                <span style={{ flex: 1 }}>{pl.text}</span>
                <button
                  onClick={() => delPlan(pl.id)}
                  style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: '0.75rem', color: 'var(--mauve-light)', opacity: 0.4, cursor: 'pointer' }}
                  onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.color = '#c05050' }}
                  onMouseLeave={e => { e.target.style.opacity = 0.4; e.target.style.color = 'var(--mauve-light)' }}
                >✕</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addPlan()}
            placeholder="What are we doing?"
            style={{
              border: '1.5px solid var(--blush)', borderRadius: '10px',
              padding: '0.6rem 0.85rem', fontSize: '0.85rem', background: 'var(--parchment)',
              color: 'var(--text)', outline: 'none', transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--sage-dark)'}
            onBlur={e => e.target.style.borderColor = 'var(--blush)'}
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{
              border: '1.5px solid var(--blush)', borderRadius: '10px',
              padding: '0.6rem 0.85rem', fontSize: '0.85rem', background: 'var(--parchment)',
              color: 'var(--text)', outline: 'none', transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--sage-dark)'}
            onBlur={e => e.target.style.borderColor = 'var(--blush)'}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={addPlan}
            style={{
              background: 'var(--sage-dark)', color: 'white', border: 'none',
              borderRadius: '50px', padding: '0.5rem 1.1rem', fontWeight: 700, fontSize: '0.8rem',
            }}
          >Add plan 🌿</motion.button>
        </div>
      </div>
    </div>
  )
}
