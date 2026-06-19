import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Countdowns from './components/Countdowns'
import ThinkingOfYou from './components/ThinkingOfYou'
import MoodCheckin from './components/MoodCheckin'
import Tasks from './components/Tasks'
import Plans from './components/Plans'
import LoveNotes from './components/LoveNotes'
import SongOfDay from './components/SongOfDay'

const initialState = {
  names: { p1: 'Her', p2: 'Him' },
  thinking: null,
  moods: { p1: '', p2: '' },
  tasks: { p1: [], p2: [] },
  plans: [],
  notes: [],
  songs: { p1: null, p2: null },
}

function pName(names, n) {
  return names[`p${n}`] || (n === 1 ? 'Her' : 'Him')
}

export default function App() {
  const [state, setState] = useState(initialState)
  const [currentProfile, setCurrentProfile] = useState(1)
  const [editingNames, setEditingNames] = useState(false)
  const [nameInputs, setNameInputs] = useState({ p1: '', p2: '' })

  const name = (n) => pName(state.names, n)

  function saveNames() {
    setState(s => ({
      ...s,
      names: {
        p1: nameInputs.p1.trim() || 'Her',
        p2: nameInputs.p2.trim() || 'Him',
      }
    }))
    setEditingNames(false)
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <header style={{ textAlign: 'center', padding: '2.5rem 1rem 1rem', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontFamily: 'Nunito, sans-serif', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: '0.5rem',
          }}>
            ✦ a space just for us ✦
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--mauve)',
            lineHeight: 1.2,
          }}>
            Our <em style={{ fontStyle: 'italic', color: 'var(--rose-dark)' }}>Little</em> World
          </h1>

          <p style={{ fontSize: '0.85rem', color: 'var(--mauve-light)', marginTop: '0.4rem', fontWeight: 400 }}>
            made with love, for the two of us
          </p>

          {/* decorative divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            justifyContent: 'center', margin: '1.25rem auto 0', color: 'var(--rose)',
          }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, var(--rose))' }} />
            🌸
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, var(--rose))' }} />
          </div>
        </motion.div>
      </header>

      {/* ── PROFILE SWITCHER ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1.25rem 1rem' }}
      >
        {[1, 2].map(n => (
          <motion.button
            key={n}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setCurrentProfile(n)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.4rem', borderRadius: '50px',
              border: currentProfile === n
                ? `2px solid ${n === 1 ? 'var(--rose-dark)' : 'var(--sage-dark)'}`
                : '2px solid transparent',
              background: currentProfile === n
                ? (n === 1 ? 'var(--rose)' : 'var(--sage)')
                : 'var(--cream)',
              color: currentProfile === n
                ? (n === 1 ? 'var(--mauve)' : '#3a5030')
                : 'var(--mauve-light)',
              fontWeight: 700, fontSize: '0.85rem',
              boxShadow: '0 2px 8px var(--shadow)',
              transition: 'background 0.2s, border 0.2s, color 0.2s',
            }}
          >
            <span>{n === 1 ? '🌸' : '🌿'}</span>
            <span>{name(n)}</span>
          </motion.button>
        ))}

        {/* Edit names button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setNameInputs({ p1: state.names.p1, p2: state.names.p2 })
            setEditingNames(true)
          }}
          style={{
            background: 'none', border: '2px dashed var(--blush)',
            borderRadius: '50px', padding: '0.5rem 0.9rem',
            color: 'var(--mauve-light)', fontSize: '0.75rem', fontWeight: 600,
          }}
          title="Edit names"
        >✏️</motion.button>
      </motion.div>

      {/* ── EDIT NAMES MODAL ── */}
      <AnimatePresence>
        {editingNames && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditingNames(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(107,79,79,0.25)',
              backdropFilter: 'blur(4px)', zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--cream)', borderRadius: '24px',
                padding: '2rem', maxWidth: '340px', width: '100%',
                boxShadow: '0 8px 40px rgba(107,79,79,0.2)',
              }}
            >
              <h2 style={{
                fontFamily: 'Playfair Display, serif', color: 'var(--mauve)',
                fontSize: '1.2rem', marginBottom: '0.4rem',
              }}>Customize our names 💖</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--mauve-light)', marginBottom: '1.25rem' }}>
                names appear across the whole page
              </p>

              {[1, 2].map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{n === 1 ? '🌸' : '🌿'}</span>
                  <input
                    type="text"
                    value={nameInputs[`p${n}`]}
                    onChange={e => setNameInputs(prev => ({ ...prev, [`p${n}`]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && saveNames()}
                    placeholder={n === 1 ? 'Her name' : 'His name'}
                    style={{
                      flex: 1, border: '1.5px solid var(--blush)', borderRadius: '10px',
                      padding: '0.6rem 0.85rem', fontSize: '0.875rem',
                      background: 'var(--parchment)', color: 'var(--text)', outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--rose-dark)'}
                    onBlur={e => e.target.style.borderColor = 'var(--blush)'}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', marginTop: '1.1rem' }}>
                <button
                  onClick={() => setEditingNames(false)}
                  style={{
                    background: 'none', border: '1.5px solid var(--blush)',
                    borderRadius: '50px', padding: '0.5rem 1rem',
                    color: 'var(--mauve-light)', fontWeight: 600, fontSize: '0.8rem',
                  }}
                >Cancel</button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={saveNames}
                  style={{
                    background: 'var(--rose-dark)', color: 'white', border: 'none',
                    borderRadius: '50px', padding: '0.5rem 1.2rem',
                    fontWeight: 700, fontSize: '0.8rem',
                  }}
                >Save 🌸</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── COUNTDOWNS ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.25rem 1.25rem' }}
      >
        <Countdowns />
      </motion.div>

      {/* ── MAIN GRID ── */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.25rem 3rem',
      }}>
        {[
          <ThinkingOfYou state={state} setState={setState} currentProfile={currentProfile} pName={name} />,
          <MoodCheckin state={state} setState={setState} currentProfile={currentProfile} pName={name} />,
          <Tasks state={state} setState={setState} currentProfile={currentProfile} pName={name} />,
          <Plans state={state} setState={setState} currentProfile={currentProfile} pName={name} />,
          <SongOfDay state={state} setState={setState} currentProfile={currentProfile} pName={name} />,
        ].map((Component, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.45 }}
          >
            {Component}
          </motion.div>
        ))}

        {/* Love notes spans full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.45 }}
          style={{ gridColumn: '1 / -1' }}
        >
          <LoveNotes state={state} setState={setState} currentProfile={currentProfile} pName={name} />
        </motion.div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.75rem', color: 'var(--mauve-light)', fontStyle: 'italic' }}>
        made with 🌷 for you two
      </footer>

    </div>
  )
}
