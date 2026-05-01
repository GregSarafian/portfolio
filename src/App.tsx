import Hero from './components/Hero'
import ProjectCard, { type ProjectCardProps, type PhoneSlide } from './components/ProjectCard'
import Footer from './components/Footer'
import { blurhashes } from './data/blurhashes'
import styles from './App.module.css'

import locketLogo from './assets/locket.png'
import fetiiLogo from './assets/fetii.png'
import doordashLogo from './assets/doordash.png'
import diveChatLogo from './assets/dive-chat.png'

/* ─── Glob-import all project assets ────────────────────────────────────── */

const locketRaw    = import.meta.globEager('./assets/locket/*.mp4')      as Record<string, { default: string }>
const fetiiRaw     = import.meta.globEager('./assets/fetii/*.png')       as Record<string, { default: string }>
const doordashRaw  = import.meta.globEager('./assets/doordash/*.png')    as Record<string, { default: string }>
const diveChatRaw  = import.meta.globEager('./assets/dive-chat/*.png')   as Record<string, { default: string }>

function toSlides(
  raw: Record<string, { default: string }>,
  type: PhoneSlide['type'] = 'image',
): PhoneSlide[] {
  return Object.keys(raw)
    .sort()
    .map((path) => {
      const stem   = path.split('/').pop()?.replace(/\.\w+$/, '') ?? ''
      const folder = path.split('/').slice(-2)[0]
      return {
        src:  raw[path].default,
        alt:  stem,
        type,
        hash: blurhashes[`${folder}/${stem}`],
      }
    })
}

const locketSlides    = toSlides(locketRaw, 'video')
const fetiiSlides     = toSlides(fetiiRaw,  'image')
const doordashSlides  = toSlides(doordashRaw, 'image')
const diveChatSlides  = toSlides(diveChatRaw, 'image')

/* ─── App icon helper ───────────────────────────────────────────────────── */
function AppIcon({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
}

/* ─── Dive Chat process label (shown below the YouTube embed) ───────────── */
function DiveChatLabel() {
  return (
    <div className={styles.processText}>
      <div>
        <p className={styles.processTitle}>Product Process at Dive Chat</p>
        <p className={styles.processSub}>Leveraging metrics, user feedback, and intuition</p>
      </div>
    </div>
  )
}

/* ─── Project data ──────────────────────────────────────────────────────── */
const projects: (ProjectCardProps & { key: string })[] = [
  {
    key: 'locket',
    id: 'locket',
    name: 'Locket',
    tagline: 'Live pics from best friends',
    logo: <AppIcon src={locketLogo} alt="Locket" />,
    slides: locketSlides,
    siteUrl: 'https://locket.camera',
    xUrl: 'https://x.com/locketcamera',
    badgeUrl: 'https://apps.apple.com/us/story/id1647059807',
    badgeIconSize: 26,
    appStoreUrl: 'https://apps.apple.com/us/app/locket-widget/id1600525061',
  },
  {
    key: 'fetii',
    id: 'fetii',
    name: 'Fetii',
    tagline: 'On-demand group ridesharing',
    logo: <AppIcon src={fetiiLogo} alt="Fetii" />,
    slides: fetiiSlides,
    siteUrl: 'https://fetii.com',
    xUrl: 'https://x.com/fetiiride',
    appStoreUrl: 'https://apps.apple.com/us/app/fetii-ride/id1470368285',
  },
  {
    key: 'doordash',
    id: 'doordash',
    name: 'DoorDash',
    tagline: 'Delivery, take out, and dining',
    logo: <AppIcon src={doordashLogo} alt="DoorDash" />,
    slides: doordashSlides,
    siteUrl: 'https://doordash.com',
    xUrl: 'https://x.com/doordash',
    appStoreUrl: 'https://apps.apple.com/us/app/doordash-food-delivery/id719972451',
  },
  {
    key: 'dive-chat',
    id: 'dive-chat',
    name: 'Dive Chat',
    tagline: 'Make Moments Happen',
    logo: <AppIcon src={diveChatLogo} alt="Dive Chat" />,
    slides: diveChatSlides,
  },
  {
    key: 'dive-chat-extra',
    id: 'dive-chat-extra',
    name: 'Dive Chat',
    tagline: 'Make Moments Happen',
    logo: <AppIcon src={diveChatLogo} alt="Dive Chat" />,
    youtubeId: '3ol4-0a7ifk',
    footerContent: <DiveChatLabel />,
  },
]

/* ─── App ───────────────────────────────────────────────────────────────── */
const CARD_BASE_DELAY = 180
const CARD_STAGGER = 80

export default function App() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Hero />
        <div className={styles.projects}>
          {projects.map(({ key, ...p }, i) => (
            <div
              key={key}
              className="appear"
              style={{ '--appear-delay': `${CARD_BASE_DELAY + i * CARD_STAGGER}ms` } as React.CSSProperties}
            >
              <ProjectCard {...p} baseDelay={CARD_BASE_DELAY + i * CARD_STAGGER} />
            </div>
          ))}
        </div>
        <div
          className="appear"
          style={{ '--appear-delay': `${CARD_BASE_DELAY + projects.length * CARD_STAGGER}ms` } as React.CSSProperties}
        >
          <Footer />
        </div>
      </div>
    </main>
  )
}
