import { useState } from 'react'
import { XIcon, AppStoreIcon, AwardIcon, GlobeIcon } from './icons'
import { BlurhashCanvas } from './BlurhashCanvas'
import { triggerHaptic } from '../utils/haptics'
import styles from './ProjectCard.module.css'

export interface PhoneSlide {
  alt: string
  src: string
  type?: 'image' | 'video'
  hash?: string
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
  badgeIconSize?: number
  /** Base page-load delay (ms) so frame stagger is anchored to the card's own appear time */
  baseDelay?: number
  /** When set, replaces the entire footer bar with custom content */
  footerContent?: React.ReactNode
}

const FRAME_STAGGER = 50

function PhoneFrame({ slide, delay }: { slide: PhoneSlide; delay: number }) {
  const [loaded, setLoaded] = useState(false)
  const [shown, setShown] = useState(false)
  return (
    <div
      className={`frameAppear ${styles.phoneOuter}`}
      style={{ '--appear-delay': `${delay}ms` } as React.CSSProperties}
    >
      {/* Placeholder — unmounts after media has fully faded in */}
      {!shown && (
        <div
          className={styles.phonePlaceholder}
          style={{ opacity: loaded ? 0 : 1, transition: 'opacity 0.4s ease' }}
        >
          {slide.hash
            ? <BlurhashCanvas hash={slide.hash} />
            : <div className={styles.phonePlaceholderFill} />}
        </div>
      )}

      {/* Actual media — fades in once loaded */}
      <div
        className={styles.phoneInner}
        style={{ opacity: loaded ? 1 : 0 }}
        onTransitionEnd={() => { if (loaded) setShown(true) }}
      >
        {slide.type === 'video' ? (
          <video
            src={slide.src}
            className={styles.phoneScreenshot}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setLoaded(true)}
          />
        ) : (
          <img
            src={slide.src}
            alt={slide.alt}
            className={styles.phoneScreenshot}
            onLoad={() => setLoaded(true)}
          />
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
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1`}
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
  badgeIconSize = 22,
  baseDelay = 0,
  footerContent,
}: ProjectCardProps) {
  return (
    <article className={styles.card} id={id}>
      {/* ── Media area ──────────────────────────────────────────────── */}
      {youtubeId ? (
        <YouTubeEmbed youtubeId={youtubeId} />
      ) : slides && slides.length > 0 ? (
        <div className={styles.carousel}>
          {slides.map((slide, i) => (
            <PhoneFrame key={i} slide={slide} delay={baseDelay + i * FRAME_STAGGER} />
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
                <a
                  href={siteUrl}
                  className={styles.iconBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} website`}
                  onPointerDown={triggerHaptic}
                >
                  <GlobeIcon size={22} />
                </a>
              )}
              {xUrl && (
                <a
                  href={xUrl}
                  className={styles.iconBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on X`}
                  onPointerDown={triggerHaptic}
                >
                  <XIcon size={22} />
                </a>
              )}
              {badgeUrl && (
                <a
                  href={badgeUrl}
                  className={styles.iconBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} App Store feature`}
                  onPointerDown={triggerHaptic}
                >
                  <AwardIcon size={badgeIconSize} />
                </a>
              )}
              {appStoreUrl && (
                <a
                  href={appStoreUrl}
                  className={styles.iconBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${name} on App Store`}
                  onPointerDown={triggerHaptic}
                >
                  <AppStoreIcon size={22} />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  )
}
