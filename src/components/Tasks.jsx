import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Tasks({ state, setState, currentProfile, pName }) {
  const [input, setInput] = useState('')
  const key = `p${currentProfile}`
  const tasks = state.tasks[key] || []

  function addTask() {
    const val = input.trim()
    if (!val) return
    setState(s => ({
      ...s,
      tasks: { ...s.tasks, [key]: [...(s.tasks[key] || []), { text: val, done: false, id: Date.now() }] }
    }))
    setInput('')
  }

  function toggleTask(id) {
    setState(s => ({
      ...s,
      tasks: {
        ...s.tasks,
        [key]: s.tasks[key].map(t => t.id === id ? { ...t, done: !t.done } : t)
      }
    }))
  }

  function delTask(id) {
    setState(s => ({
      ...s,
      tasks: { ...s.tasks, [key]: s.tasks[key].filter(t => t.id !== id) }
    }))
  }

  const done = tasks.filter(t => t.done).length

  return (
    <div style={{
      background: 'var(--cream)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 2px 16px var(--shadow)',
      border: '1px solid rgba(245,221,213,0.5)',
    }}>
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #f5ddd5, var(--rose-dark))' }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem' }}>
          <span style={{ fontSize: '1.1rem' }}>✅</span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: 'var(--mauve)', fontWeight: 600 }}>
            Today's little tasks
          </span>
          <span style={{
            marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '20px',
            background: 'var(--blush)', color: 'var(--rose-dark)',
          }}>{pName(currentProfile)}'s list</span>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.9rem', minHeight: '40px' }}>
          <AnimatePresence>
            {tasks.length === 0 && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--mauve-light)', fontSize: '0.82rem', padding: '0.5rem 0', opacity: 0.7 }}
              >
                nothing yet — add something ✨
              </motion.li>
            )}
            {tasks.map(t => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.55rem 0.75rem', background: 'var(--parchment)',
                  borderRadius: '10px', fontSize: '0.85rem',
                  opacity: t.done ? 0.5 : 1, transition: 'opacity 0.2s',
                  textDecoration: t.done ? 'line-through' : 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                  style={{ accentColor: 'var(--rose-dark)', width: '14px', height: '14px', flexShrink: 0, cursor: 'pointer' }}
                />
                <span style={{ flex: 1 }}>{t.text}</span>
                <button
                  onClick={() => delTask(t.id)}
                  style={{
                    background: 'none', border: 'none', fontSize: '0.75rem',
                    color: 'var(--mauve-light)', opacity: 0.4, cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.color = '#c05050' }}
                  onMouseLeave={e => { e.target.style.opacity = 0.4; e.target.style.color = 'var(--mauve-light)' }}
                >✕</button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a task..."
            style={{
              flex: 1, border: '1.5px solid var(--blush)', borderRadius: '10px',
              padding: '0.6rem 0.85rem', fontSize: '0.875rem', background: 'var(--parchment)',
              color: 'var(--text)', outline: 'none', transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--rose-dark)'}
            onBlur={e => e.target.style.borderColor = 'var(--blush)'}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addTask}
            style={{
              background: 'var(--rose-dark)', color: 'white', border: 'none',
              borderRadius: '10px', padding: '0.6rem 1rem', fontWeight: 700, fontSize: '0.8rem',
            }}
          >+ Add</motion.button>
        </div>

        {tasks.length > 0 && (
          <p style={{ fontSize: '0.72rem', color: 'var(--mauve-light)', marginTop: '0.5rem', textAlign: 'right' }}>
            {done === tasks.length ? '🎉 all done!' : `${done} of ${tasks.length} done`}
          </p>
        )}
      </div>
    </div>
  )
}
