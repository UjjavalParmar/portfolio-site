/**
 * Site content. Cards, steps and tags stay as data so they are easy to extend
 * without touching markup. Copy here is final — do not reword.
 */

export const profile = {
  name: 'Ujjaval Parmar',
  role: 'Associate DevOps Engineer',
  email: 'ujjavalworkmail22@gmail.com',
  phone: '+91 75738 69598',
  phoneHref: 'tel:+917573869598',
  location: 'Ahmedabad, Gujarat, India',
  github: 'https://github.com/UjjavalParmar',
  linkedin: 'https://www.linkedin.com/in/ujjaval-parmar-6055b7178/',
  resume:
    'https://docs.google.com/document/d/1tr2V0XPsnVvAlyg_PLxKM9fIT-34jmLq/edit?usp=sharing&ouid=108587002836749340351&rtpof=true&sd=true',
}

export const metrics = [
  { value: '50%', caption: 'Cut in deployment time', accent: true },
  { value: '99.99%', caption: 'Uptime SLA on multi-AZ AWS' },
  { value: '40%', caption: 'Faster incident debugging' },
  { value: '0', caption: 'Downtime incidents in 90 days' },
]

/**
 * `href` is where "Read the writeup →" points. The design calls for a
 * dedicated case-study page per project; until those exist each card points at
 * the blog, where the writeups live. Change one field to repoint a card.
 */
export const projects = [
  {
    num: '01',
    impact: '50% faster deployments',
    title: 'Automated GitOps CI/CD with Kubernetes & ArgoCD',
    desc: 'A multi-branch Jenkins pipeline that updates manifests and image tags itself, so five microservices deploy without anyone editing YAML.',
    tech: ['Jenkins', 'ArgoCD', 'Kubernetes', 'Helm', 'Doppler'],
    href: '/blog',
  },
  {
    num: '02',
    impact: '99.99% uptime SLA',
    title: 'Scalable & secure AWS architecture with load balancing',
    desc: 'Multi-AZ VPC, application load balancing and scoped security groups, provisioned end to end in Terraform so the whole environment is reproducible.',
    tech: ['AWS', 'Terraform', 'VPC', 'ALB', 'Route 53'],
    href: '/blog',
  },
  {
    num: '03',
    impact: '40% faster debugging',
    title: 'Centralized monitoring & logging infrastructure',
    desc: 'ELK for logs, Prometheus and Grafana for metrics, New Relic for traces. One place to look when something is slow at 2am.',
    tech: ['ELK Stack', 'Prometheus', 'Grafana', 'New Relic'],
    href: '/blog',
  },
  {
    num: '04',
    impact: 'Zero downtime',
    title: 'Kubernetes high availability cluster',
    desc: 'Multi-node clusters with rolling updates, liveness and readiness probes, pod disruption budgets and automated rollback on a failed check.',
    tech: ['Kubernetes', 'EKS', 'Helm', 'Docker'],
    href: '/blog',
  },
]

export const steps = [
  {
    num: 'STEP 01',
    title: 'Build',
    desc: 'Jenkins builds the image, tags it by commit and pushes to Docker Hub with version retention.',
  },
  {
    num: 'STEP 02',
    title: 'Declare',
    desc: 'The pipeline updates Helm values in the manifest repo. That commit is the deploy request.',
  },
  {
    num: 'STEP 03',
    title: 'Reconcile',
    desc: 'ArgoCD detects drift and syncs the cluster, scoped by RBAC per environment.',
  },
  {
    num: 'STEP 04',
    title: 'Verify',
    desc: 'Probes and Grafana alerts decide. A failed check rolls back before anyone pages me.',
  },
]

export const shift = {
  before: [
    'Manifests edited by hand, image tags drifting between environments.',
    'Secrets pasted into CI variables, with rotation nobody tracked.',
    "Onboarding a service meant copying last week's YAML and hoping.",
    'Debugging started with SSH and ended in three unrelated log files.',
  ],
  after: [
    'Git is the only source of truth. ArgoCD reconciles, RBAC scoped per environment.',
    'Doppler holds every secret. Nothing sensitive lives in a pipeline config.',
    'One reusable Helm chart. A new service onboards in an afternoon.',
    'ELK, Prometheus and Grafana. The dashboard answers before I do.',
  ],
}

export const tools = [
  'AWS',
  'Kubernetes',
  'EKS',
  'Terraform',
  'Jenkins',
  'ArgoCD',
  'Helm',
  'Docker',
  'ELK Stack',
  'Prometheus',
  'Grafana',
  'New Relic',
  'Doppler',
  'Bash',
  'Python',
  'Linux',
]

/** Static, mid-deploy by design. It does not tick. */
export const pipeline = {
  service: 'PIPELINE · payments-api',
  status: 'PASSING',
  steps: [
    { glyph: '✓', tone: 'ok', label: 'build → docker hub', timing: '42s' },
    { glyph: '✓', tone: 'ok', label: 'helm values bump', timing: '8s' },
    { glyph: '✓', tone: 'ok', label: 'argocd sync · staging', timing: '1m 04s' },
    { glyph: '▸', tone: 'accent', label: 'rolling update · prod', timing: '3/5 pods' },
  ],
  footer: { label: 'downtime this deploy', value: '0.00s' },
}

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'How I work', href: '#how', nowrap: true },
  { label: 'Stack', href: '#stack' },
  { label: 'Blog', href: '/blog', route: true },
]
