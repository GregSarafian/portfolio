import profilePhoto from '../assets/profile.jpg'
import { XIcon, MailIcon, LocketDotsIcon } from './icons'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`appear ${styles.photoWrap}`} style={{ '--appear-delay': '0ms' } as React.CSSProperties}>
        <img src={profilePhoto} alt="Greg Sarafian" className={styles.photo} />
      </div>

      <div className={`appear ${styles.intro}`} style={{ '--appear-delay': '60ms' } as React.CSSProperties}>
        <h1 className={styles.name}>Greg Sarafian</h1>
        <p className={styles.title}>
          Design Lead at{' '}
          <a href="https://locket.camera" className={styles.titleLink} target="_blank" rel="noopener noreferrer">
            Locket
          </a>
        </p>
      </div>

      <div className={`appear ${styles.socials}`} style={{ '--appear-delay': '120ms' } as React.CSSProperties}>
        <a href="https://x.com/GregSarafian" className={styles.iconPill} target="_blank" rel="noopener noreferrer" aria-label="Greg Sarafian on X">
          <XIcon size={18} />
        </a>
        <a href="mailto:greg@sarafian.me" className={styles.iconPill} aria-label="Email Greg">
          <MailIcon size={18} />
        </a>
        <a href="tel:2015080659" className={styles.iconPill} aria-label="Call Greg">
          <LocketDotsIcon size={18} />
        </a>
      </div>
    </section>
  )
}
