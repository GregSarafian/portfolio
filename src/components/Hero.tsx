import { useState } from 'react'
import profilePhoto from '../assets/profile.jpg'
import { XIcon, MailIcon, LocketDotsIcon } from './icons'
import { triggerHaptic } from '../utils/haptics'
import styles from './Hero.module.css'

export default function Hero() {
  const [photoLoaded, setPhotoLoaded] = useState(false)
  return (
    <section className={styles.hero}>
      <div className={`appear ${styles.photoWrap}`} style={{ '--appear-delay': '0ms' } as React.CSSProperties}>
        <img
          src={profilePhoto}
          alt="Greg Sarafian"
          className={styles.photo}
          onLoad={() => setPhotoLoaded(true)}
          style={{ opacity: photoLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
      </div>

      <div className={`appear ${styles.intro}`} style={{ '--appear-delay': '60ms' } as React.CSSProperties}>
        <h1 className={styles.name}>Greg Sarafian</h1>
        <p className={styles.title}>
          Head of Design at{' '}
          <a
            href="https://locket.camera"
            className={styles.titleLink}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={triggerHaptic}
          >
            Locket
          </a>
        </p>
      </div>

      <div className={`appear ${styles.socials}`} style={{ '--appear-delay': '120ms' } as React.CSSProperties}>
        <a
          href="https://x.com/GregSarafian"
          className={styles.iconPill}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Greg Sarafian on X"
          onPointerDown={triggerHaptic}
        >
          <XIcon size={24} />
        </a>
        <a
          href="mailto:greg@sarafian.me"
          className={styles.iconPill}
          aria-label="Email Greg"
          onPointerDown={triggerHaptic}
        >
          <MailIcon size={24} />
        </a>
        <a
          href="tel:2015080659"
          className={styles.iconPill}
          aria-label="Call Greg"
          onPointerDown={triggerHaptic}
        >
          <LocketDotsIcon size={24} />
        </a>
      </div>
    </section>
  )
}
