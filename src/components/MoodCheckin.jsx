import { motion } from 'motion/react'

const MOODS = [
  { label: '☀️ Sunny', val: '☀️ Sunny' },
  { label: '🌸 Soft', val: '🌸 Soft' },
  { label: '🌧️ Rainy', val: '🌧️ Rainy' },
  { label: '🌙 Dreamy', val: '🌙 Dreamy' },
  { label: '🔥 Excited', val: '🔥 Excited' },
  { label: '🍵 Cozy', val: '🍵 Cozy' },
  { label: '🌿 Calm', val: '🌿 Calm' },
  { label: '💤 Tired', val: '💤 Tired' },
]

export default function MoodCheckin({ state, setState, currentProfile, pName }) {
  const myKey = `p${currentProfile}`
  const otherKey = `p${currentProfile === 1 ? 2 : 1}`
  const myMood = state.moods[myKey]
  const otherMood = state.moods[otherKey]

  function setMood(val) {
    setState(s => ({ ...s, moods: { ...s.moods, [myKey]: val } }))
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
          <span style={{ fontSize: '1.1rem' }}>🌤️</span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: 'var(--mauve)', fontWeight: 600 }}>
            How are you today?
          </span>
          <span style={{
            marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '20px',
            background: '#e4ede0', color: 'var(--sage-dark)',
          }}>{pName(currentProfile)}'s mood</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1rem' }}>
          {MOODS.map(m => (
            <motion.button
              key={m.val}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setMood(m.val)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '50px',
                border: `1.5px solid ${myMood === m.val ? 'var(--sage-dark)' : 'var(--blush)'}`,
                background: myMood === m.val ? 'var(--sage)' : 'transparent',
                fontSize: '0.8rem',
                color: myMood === m.val ? '#3a5030' : 'var(--text)',
                fontWeight: myMood === m.val ? 700 : 400,
                transition: 'all 0.15s',
              }}
            >
              {m.label}
            </motion.button>
          ))}
        </div>

        <div style={{
          fontSize: '0.83rem',
          color: 'var(--mauve-light)',
          fontStyle: 'italic',
          textAlign: 'center',
          minHeight: '1.2rem',
        }}>
          {myMood && <span>you're feeling {myMood}</span>}
          {myMood && otherMood && <span style={{ margin: '0 0.4rem', opacity: 0.4 }}>·</span>}
          {otherMood && <span>{pName(currentProfile === 1 ? 2 : 1)} is {otherMood}</span>}
          {!myMood && !otherMood && <span style={{ opacity: 0.6 }}>pick a mood ✨</span>}
        </div>
      </div>
    </div>
  )
}
