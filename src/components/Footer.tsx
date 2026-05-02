import { CopyrightIcon, TexasIcon, DataIcon } from './icons'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.col}>
        <CopyrightIcon size={20} />
        <p className={styles.line1}>Copyright {new Date().getFullYear()}</p>
        <p className={styles.line2}>All Rights Reserved.</p>
      </div>

      <div className={styles.col}>
        <TexasIcon size={20} />
        <p className={styles.line1}>Designed in</p>
        <p className={styles.line2}>Austin, Texas</p>
      </div>

      <div className={styles.col}>
        <DataIcon size={20} />
        <p className={styles.line1}>This site doesn't collect</p>
        <p className={styles.line2}>any data about you.</p>
      </div>
    </footer>
  )
}
