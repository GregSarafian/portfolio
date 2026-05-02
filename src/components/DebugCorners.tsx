import { useState, useEffect } from 'react'

const isSafari = CSS.supports('corner-shape', 'squircle')

type Vars = {
  cardT: number
  cardB: number
  phone: number
  youtube: number
  logo: number
}

type MdVars = {
  cardTMd: number
  cardBMd: number
  phoneMd: number
}

type SmVars = {
  cardTSm: number
  cardBSm: number
  phoneSm: number
}

const DESKTOP_DEFAULTS: Vars = isSafari
  ? { cardT: 47, cardB: 26, phone: 32, youtube: 23, logo: 0 }
  : { cardT: 50, cardB: 26, phone: 34, youtube: 0,  logo: 0 }

const TABLET_DEFAULTS: MdVars = isSafari
  ? { cardTMd: 47, cardBMd: 26, phoneMd: 32 }
  : { cardTMd: 50, cardBMd: 26, phoneMd: 34 }

const MOBILE_DEFAULTS: SmVars = isSafari
  ? { cardTSm: 33, cardBSm: 36, phoneSm: 22 }
  : { cardTSm: 35, cardBSm: 35, phoneSm: 24 }

function setVar(name: string, value: number) {
  document.documentElement.style.setProperty(name, `${value}px`)
}

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 12 }}>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{label}</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}px</span>
      </span>
      <input
        type="range" min={0} max={120} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />
    </label>
  )
}

export default function DebugCorners() {
  const [desktop, setDesktop] = useState<Vars>(DESKTOP_DEFAULTS)
  const [tablet,  setTablet]  = useState<MdVars>(TABLET_DEFAULTS)
  const [mobile,  setMobile]  = useState<SmVars>(MOBILE_DEFAULTS)

  useEffect(() => {
    setVar('--r-card-t',  desktop.cardT)
    setVar('--r-card-b',  desktop.cardB)
    setVar('--r-phone',   desktop.phone)
    setVar('--r-youtube', desktop.youtube)
    setVar('--r-logo',    desktop.logo)
  }, [desktop])

  useEffect(() => {
    setVar('--r-card-t-md', tablet.cardTMd)
    setVar('--r-card-b-md', tablet.cardBMd)
    setVar('--r-phone-md',  tablet.phoneMd)
  }, [tablet])

  useEffect(() => {
    setVar('--r-card-t-sm', mobile.cardTSm)
    setVar('--r-card-b-sm', mobile.cardBSm)
    setVar('--r-phone-sm',  mobile.phoneSm)
  }, [mobile])

  const setD = (k: keyof Vars)   => (v: number) => setDesktop(p => ({ ...p, [k]: v }))
  const setT = (k: keyof MdVars) => (v: number) => setTablet(p  => ({ ...p, [k]: v }))
  const setM = (k: keyof SmVars) => (v: number) => setMobile(p  => ({ ...p, [k]: v }))

  const panel: React.CSSProperties = {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 9999,
    background: 'rgba(0,0,0,0.85)',
    color: '#fff',
    padding: '12px 14px',
    borderRadius: 12,
    width: 240,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    fontSize: 13,
    backdropFilter: 'blur(8px)',
  }

  const label: React.CSSProperties = {
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    opacity: 0.5,
    marginBottom: 2,
  }

  return (
    <div style={panel}>
      <div style={{ fontWeight: 700, fontSize: 13 }}>
        Corner Debug · {isSafari ? 'Safari' : 'Chrome'}
      </div>

      <div>
        <div style={label}>Desktop (≥1200px)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="Card top"    value={desktop.cardT}   onChange={setD('cardT')} />
          <Slider label="Card bottom" value={desktop.cardB}   onChange={setD('cardB')} />
          <Slider label="Phone"       value={desktop.phone}   onChange={setD('phone')} />
          <Slider label="YouTube"     value={desktop.youtube} onChange={setD('youtube')} />
          <Slider label="Logo"        value={desktop.logo}    onChange={setD('logo')} />
        </div>
      </div>

      <div>
        <div style={label}>Tablet (750–1199px)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="Card top"    value={tablet.cardTMd}  onChange={setT('cardTMd')} />
          <Slider label="Card bottom" value={tablet.cardBMd}  onChange={setT('cardBMd')} />
          <Slider label="Phone"       value={tablet.phoneMd}  onChange={setT('phoneMd')} />
        </div>
      </div>

      <div>
        <div style={label}>Mobile (≤749px)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="Card top"    value={mobile.cardTSm}  onChange={setM('cardTSm')} />
          <Slider label="Card bottom" value={mobile.cardBSm}  onChange={setM('cardBSm')} />
          <Slider label="Phone"       value={mobile.phoneSm}  onChange={setM('phoneSm')} />
        </div>
      </div>
    </div>
  )
}
