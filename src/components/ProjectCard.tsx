import { XIcon, AppStoreIcon, AwardIcon, GlobeIcon } from './icons'
import styles from './ProjectCard.module.css'

export interface PhoneSlide {
  alt: string
  src: string
  type?: 'image' | 'video'
}

export interface ProjectCardProps {
  id?: string
  name: string
  tagline: string
  logo?: React.ReactNode
  slides?: PhoneSlide[]
  /** When set, replaces the carousel with a full-width YouTube embed */
  youtubeId?: string
  siteUrl?: string
  xUrl?: string
  appStoreUrl?: string
  badgeUrl?: string
  /** When set, replaces the entire footer bar with custom content */
  footerContent?: React.ReactNode
}

function PhoneFrame({ slide }: { slide: PhoneSlide }) {
  return (
    <div className={styles.phoneOuter}>
      <div className={styles.phoneInner}>
        {slide.type === 'video' ? (
          <video
            src={slide.src}
            className={styles.phoneScreenshot}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img src={slide.src} alt={slide.alt} className={styles.phoneScreenshot} />
        )}
      </div>
    </div>
  )
}

function YouTubeEmbed({ youtubeId }: { youtubeId: string }) {
  return (
    <div className={styles.youtubeWrap}>
      <iframe
        className={styles.youtubeFrame}
        src={`https://www.youtube.com/embed/${youtubeId}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default function ProjectCard({
  id,
  name,
  tagline,
  logo,
  slides,
  youtubeId,
  siteUrl,
  xUrl,
  appStoreUrl,
  badgeUrl,
  footerContent,
}: ProjectCardProps) {
  return (
    <article className={styles.card} id={id}>
      {/* ── Media area: carousel or YouTube ─────────────────────────── */}
      {youtubeId ? (
        <YouTubeEmbed youtubeId={youtubeId} />
      ) : slides && slides.length > 0 ? (
        <div className={styles.carousel}>
          {slides.map((slide, i) => (
            <PhoneFrame key={i} slide={slide} />
          ))}
        </div>
      ) : null}

      {/* ── Card footer bar ─────────────────────────────────────────── */}
      <div className={styles.footer}>
        {footerContent ? footerContent : (
          <>
            <div className={styles.footerLeft}>
              {logo && <div className={styles.logo}>{logo}</div>}
              <div className={styles.textBlock}>
                <p className={styles.projectName}>{name}</p>
                <p className={styles.tagline}>{tagline}</p>
              </div>
            </div>

            <div className={styles.buttons}>
              {siteUrl && (
                <a href={siteUrl} className={styles.iconBtn} target="_blank" rel="noopener noreferrer" aria-label={`${name} website`}>
                  <GlobeIcon size={16} />
                </a>
              )}
              {xUrl && (
                <a href={xUrl} className={styles.iconBtn} target="_blank" rel="noopener noreferrer" aria-label={`${name} on X`}>
                  <XIcon size={16} />
                </a>
              )}
              {badgeUrl && (
                <a href={badgeUrl} className={styles.iconBtn} target="_blank" rel="noopener noreferrer" aria-label={`${name} App Store feature`}>
                  <AwardIcon size={16} />
                </a>
              )}
              {appStoreUrl && (
                <a href={appStoreUrl} className={styles.iconBtn} target="_blank" rel="noopener noreferrer" aria-label={`Download ${name} on App Store`}>
                  <AppStoreIcon size={16} />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  )
}
