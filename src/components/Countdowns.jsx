import { motion } from 'motion/react'

function getDaysUntilNext(targetDay) {
  const now = new Date()
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), targetDay)
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, targetDay)
  const target = now.getDate() <= targetDay ? thisMonth : nextMonth
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24))
  return diff === 0 ? 0 : diff
}

function getDaysSince(targetDay) {
  const now = new Date()
  // Most recent occurrence of this day
  let d = new Date(now.getFullYear(), now.getMonth(), targetDay)
  if (d > now) d = new Date(now.getFullYear(), now.getMonth() - 1, targetDay)
  return Math.floor((now - d) / (1000 * 60 * 60 * 24))
}

function CountCard({ label, sublabel, targetDay, emoji, accent }) {
  const daysUntil = getDaysUntilNext(targetDay)
  const daysSince = getDaysSince(targetDay)
  const isToday = daysUntil === 0

  const accentStyles = {
    rose: {
      border: '1px solid #e8c4b8',
      topBar: 'linear-gradient(90deg, #e8c4b8, #c9897a)',
      numColor: '#c9897a',
      badgeBg: '#fce8e2',
      badgeColor: '#c9897a',
    },
    sage: {
      border: '1px solid #a8b89a',
      topBar: 'linear-gradient(90deg, #a8b89a, #7a9868)',
      numColor: '#7a9868',
      badgeBg: '#e4ede0',
      badgeColor: '#5a7a48',
    },
  }

  const a = accentStyles[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      style={{
        background: 'var(--cream)',
        borderRadius: '20px',
        border: a.border,
        boxShadow: '0 2px 20px var(--shadow)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* top accent bar */}
      <div style={{ height: '3px', background: a.topBar }} />

      <div style={{ padding: '1.4rem 1.5rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
          <div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '0.95rem',
              color: 'var(--mauve)',
              fontWeight: 600,
            }}>{label}</div>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--mauve-light)',
            }}>{sublabel}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.2rem 0.65rem',
              borderRadius: '20px',
              background: a.badgeBg,
              color: a.badgeColor,
            }}>
              {isToday ? '🎉 today!' : `${targetDay}th monthly`}
            </span>
          </div>
        </div>

        {isToday ? (
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            style={{
              textAlign: 'center',
              padding: '0.75rem',
              background: a.badgeBg,
              borderRadius: '14px',
            }}
          >
            <div style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '1.5rem',
              color: a.numColor,
            }}>It's our day! 🌸</div>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <motion.div
                key={daysUntil}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  color: a.numColor,
                  lineHeight: 1,
                }}
              >
                {daysUntil}
              </motion.div>
              <div style={{ fontSize: '0.7rem', color: 'var(--mauve-light)', marginTop: '0.25rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                days until
              </div>
            </div>
            <div style={{
              width: '1px',
              background: 'var(--blush)',
              alignSelf: 'stretch',
              margin: '0.25rem 0',
            }} />
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '2.5rem',
                fontWeight: 600,
                color: a.numColor,
                lineHeight: 1,
                opacity: 0.6,
              }}>
                {daysSince}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--mauve-light)', marginTop: '0.25rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                days since
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Countdowns() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1rem',
    }}>
      <CountCard
        label="Where it all began"
        sublabel="The day we met ✦ 5th"
        targetDay={5}
        emoji="🌷"
        accent="rose"
      />
      <CountCard
        label="When you became mine"
        sublabel="Our anniversary ✦ 11th"
        targetDay={11}
        emoji="💕"
        accent="sage"
      />
    </div>
  )
}
