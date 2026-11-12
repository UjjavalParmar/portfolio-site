/** Original conceptual illustrations; no production telemetry or screenshots. */
export function HeroInfrastructure() {
  return (
    <svg viewBox="0 0 640 580" fill="none" aria-hidden="true" className="hero-infrastructure">
      <defs>
        <linearGradient id="rack-face" x1="250" y1="180" x2="430" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#414638" /><stop offset="1" stopColor="#151811" />
        </linearGradient>
        <linearGradient id="rack-side" x1="420" y1="260" x2="460" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2c3223" /><stop offset="1" stopColor="#10120e" />
        </linearGradient>
        <radialGradient id="rack-halo"><stop stopColor="#c8ff31" stopOpacity=".11" /><stop offset="1" stopColor="#c8ff31" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="330" cy="320" rx="290" ry="245" fill="url(#rack-halo)" />
      <g stroke="#c8ff31" strokeOpacity=".24">
        <ellipse cx="330" cy="345" rx="264" ry="135" transform="rotate(-24 330 345)" />
        <ellipse cx="330" cy="345" rx="238" ry="110" transform="rotate(-24 330 345)" strokeDasharray="3 8" />
        <path d="M74 352 330 490 583 342M122 425 332 536 529 432M330 490v46" />
      </g>
      <path d="m182 399 150 82 157-85-149-80z" fill="#1c2115" stroke="#626f42" />
      <path d="m182 399 150 82v19l-150-82z" fill="#191d13" stroke="#3e482d" />
      <path d="m332 481 157-85v19l-157 85z" fill="#252d18" stroke="#626f42" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${-i * 77})`}>
          <path d="m230 303 111-61 112 61-111 62z" fill="#39422b" stroke="#87945e" />
          <path d="m230 303 112 62v61l-112-62z" fill="url(#rack-face)" stroke="#65734d" />
          <path d="m342 365 111-62v61l-111 62z" fill="url(#rack-side)" stroke="#65734d" />
          <path d="m247 330 61 34m-61-24 42 24" stroke="#9baa76" strokeWidth="3" />
          <path d="m366 366 65-36m-65 47 65-36" stroke="#4b5836" strokeWidth="2" />
          <circle cx="320" cy="384" r="3" fill="#c8ff31" />
          <circle cx="320" cy="373" r="3" fill="#c8ff31" fillOpacity=".4" />
        </g>
      ))}
      <g stroke="#c8ff31" strokeWidth="1.2">
        <path d="M242 189v52H67M451 266h50l39-39h59M282 442H210l-30 40" strokeDasharray="5 5" />
        <circle cx="242" cy="189" r="4" fill="#c8ff31" />
        <circle cx="451" cy="266" r="4" fill="#c8ff31" />
        <circle cx="282" cy="442" r="4" fill="#c8ff31" />
      </g>
      <g fill="#dce3cb" fontFamily="var(--font-mono), monospace" fontSize="11" letterSpacing="1">
        <text x="67" y="227">DECLARE / GITOPS</text>
        <text x="482" y="210">RECONCILE</text>
        <text x="180" y="504">AWS / TERRAFORM</text>
      </g>
      <g transform="translate(480 392)">
        <circle r="32" fill="#c8ff31" /><path d="m-12 8 24-16M-3-10l15 2-4 15" stroke="#10110e" strokeWidth="2" />
      </g>
      <g stroke="#9ba783"><path d="M327 88h18m-9-9v18M563 356h14m-7-7v14M119 284h14m-7-7v14" /></g>
    </svg>
  )
}

export default function ProjectArt({ slug }) {
  return (
    <svg viewBox="0 0 600 300" fill="none" aria-hidden="true" className={`project-art project-art--${slug}`}>
      <g className="art-grid" stroke="currentColor" opacity=".09">
        {[60, 120, 180, 240, 300, 360, 420, 480, 540].map(x => <path key={x} d={`M${x} 0v300`} />)}
        {[60, 120, 180, 240].map(y => <path key={y} d={`M0 ${y}h600`} />)}
      </g>
      {slug === 'gitops-delivery' && <>
        <g stroke="currentColor" opacity=".4"><path d="M105 151h390M300 79v144" strokeDasharray="4 6" /><ellipse cx="300" cy="150" rx="207" ry="99" /></g>
        {[{ x: 65, label: 'BUILD', icon: '>_' }, { x: 235, label: 'DECLARE', icon: '{ }' }, { x: 405, label: 'SYNC', icon: '↻' }].map(({ x, label, icon }, i) => <g key={label} transform={`translate(${x} 99)`}>
          <rect width="130" height="102" fill="var(--art-panel)" stroke="currentColor" strokeOpacity=".6" />
          <text x="15" y="24" className="art-label">0{i + 1} / {label}</text>
          {i === 2
            ? <path d="M84 55a22 22 0 1 0 2 23M84 37v18H66" stroke="currentColor" strokeWidth="2" />
            : <text x="65" y="76" textAnchor="middle" className="art-symbol">{icon}</text>}
        </g>)}
        <path d="m205 145 6 6-6 6m170-12 6 6-6 6" stroke="currentColor" strokeWidth="2" />
        <text x="300" y="266" textAnchor="middle" className="art-label">JENKINS → MANIFESTS → ARGO CD</text>
      </>}
      {slug === 'helm-environments' && <>
        <path d="M300 103v44M72 147h456M72 147v30m114-30v30m114-30v30m114-30v30m114-30v30" stroke="currentColor" />
        <rect x="218" y="43" width="164" height="62" fill="var(--art-panel)" stroke="currentColor" />
        <text x="300" y="79" textAnchor="middle" className="art-label">BASE HELM CHART</text>
        {[72,186,300,414,528].map((x,i) => <g key={x} transform={`translate(${x-43} 177)`}>
          <path d="m0 18 43-23 43 23v47l-43 23L0 65z" fill="var(--art-panel)" stroke="currentColor" strokeOpacity=".6" />
          <path d="m0 18 43 23 43-23M43 41v47" stroke="currentColor" strokeOpacity=".3" />
          <text x="43" y="28" textAnchor="middle" className="art-label">0{i+1}</text>
        </g>)}
        <text x="300" y="286" textAnchor="middle" className="art-label">SHARED STRUCTURE / SEPARATE VALUES</text>
      </>}
      {slug === 'terraform-aws' && <>
        <rect x="62" y="54" width="476" height="207" stroke="currentColor" strokeDasharray="5 5" />
        <text x="80" y="78" className="art-label">AWS / MULTI-AZ VPC</text>
        <rect x="230" y="90" width="140" height="37" fill="var(--art-panel)" stroke="currentColor" />
        <text x="300" y="114" textAnchor="middle" className="art-label">ALB / TLS</text>
        <path d="M300 127v23H170v27m130-27h130v27" stroke="currentColor" />
        {[108,368].map((x,i) => <g key={x}>
          <rect x={x} y="166" width="124" height="74" fill="var(--art-panel)" stroke="currentColor" strokeOpacity=".5" />
          <text x={x+62} y="190" textAnchor="middle" className="art-label">ZONE {i===0?'A':'B'}</text>
          <path d={`M${x+22} 207h80m-80 10h80`} stroke="currentColor" strokeOpacity=".4" />
        </g>)}
        <text x="300" y="283" textAnchor="middle" className="art-label">TERRAFORM / NETWORK BOUNDARIES AS CODE</text>
      </>}
      {slug === 'gateway-api-migration' && <>
        <path d="M75 150h128m74 0h115m0 0v-65h115m-115 65v65h115" stroke="currentColor" />
        <circle cx="240" cy="150" r="54" fill="var(--art-panel)" stroke="currentColor" />
        <path d="m224 164 31-28m-18-1h19v19" stroke="currentColor" strokeWidth="2" />
        <text x="240" y="231" textAnchor="middle" className="art-label">GATEWAY</text>
        {[85,215].map((y,i) => <g key={y}>
          <rect x="412" y={y-28} width="134" height="56" fill="var(--art-panel)" stroke="currentColor" strokeOpacity=".6" />
          <text x="479" y={y+5} textAnchor="middle" className="art-label">SERVICE 0{i+1}</text>
        </g>)}
        <text x="61" y="129" className="art-label">TRAFFIC</text>
        <text x="300" y="283" textAnchor="middle" className="art-label">HTTPROUTE / NAMESPACE-AWARE ROUTING</text>
      </>}
    </svg>
  )
}
