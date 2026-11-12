/** Shared portfolio copy, grounded in the supplied resume. */
export const profile = {
  name: 'Ujjaval Parmar',
  role: 'Associate DevOps Engineer',
  email: 'ujjavalworkmail22@gmail.com',
  phone: '+91 75738 69598',
  phoneHref: 'tel:+917573869598',
  location: 'Ahmedabad, India',
  github: 'https://github.com/UjjavalParmar',
  linkedin: 'https://www.linkedin.com/in/ujjaval-devops/',
  resume: '/Ujjaval-Parmar-DevOps-Resume.pdf',
}

export const metrics = [
  { value: '10+', caption: 'Microservices supported by GitOps pipelines', accent: true },
  { value: '5', caption: 'Environments using reusable Helm charts' },
  { value: 'GitOps', caption: 'Jenkins CI and Argo CD delivery' },
  { value: 'IaC', caption: 'AWS infrastructure defined in Terraform' },
]

export const projects = [
  {
    num: '01',
    slug: 'gitops-delivery',
    impact: '10+ microservices',
    title: 'From image build to GitOps delivery',
    desc: 'Jenkins builds, image-tag updates, and Argo CD reconciliation connect development, test, and production deployments.',
    tech: ['Jenkins', 'Argo CD', 'Kubernetes', 'Doppler'],
    problem: 'A release needs a clear path from application code to the configuration running in each environment. Image versions, deployment permissions, and secrets all need a place in that workflow.',
    contribution: [
      'Designed and maintained Jenkins and Argo CD delivery pipelines for 10+ microservices across development, test, and production.',
      'Built multi-branch pipelines with automated image-tag updates and manifest synchronization.',
      'Integrated Doppler for runtime secret injection and configured Argo CD RBAC for environment-specific deployment access.',
    ],
    outcome: 'Application builds and deployment configuration are connected through a repeatable GitOps workflow, with environment access defined through RBAC.',
    considerations: 'CI builds an artifact; Argo CD reconciles the declared deployment state. Deployment access and secret handling remain separate controls in that flow.',
    flow: [
      { title: 'Jenkins CI', detail: 'Build and tag image' },
      { title: 'Manifest repository', detail: 'Update image version' },
      { title: 'Argo CD', detail: 'Reconcile desired state' },
      { title: 'Kubernetes', detail: 'Run declared workloads' },
    ],
  },
  {
    num: '02',
    slug: 'helm-environments',
    impact: 'Five environments',
    title: 'One Helm foundation, separate environments',
    desc: 'Reusable service and frontend charts share deployment structure while keeping configuration specific to each environment.',
    tech: ['Helm', 'Amazon EKS', 'Kubernetes', 'Gateway API'],
    problem: 'Services need a consistent deployment structure without sharing the same configuration everywhere. The platform needs to express both the common resources and the differences between environments.',
    contribution: [
      'Authored reusable base-service and base-frontend Helm charts and standardized EKS delivery across five environments.',
      'Parameterized Deployments, Services, ConfigMaps, Secrets, and HTTPRoutes for each environment.',
      'Defined resource requests and limits, image pull secrets, and versioned chart releases within the shared chart structure.',
    ],
    outcome: 'Services use reusable chart templates with isolated environment configuration, giving Kubernetes delivery a consistent structure across five environments.',
    considerations: 'Shared templates need explicit environment values. Resource settings and chart versions still need review for each workload; a reusable chart does not make every workload identical.',
    flow: [
      { title: 'Base charts', detail: 'Service and frontend' },
      { title: 'Environment values', detail: 'Separate configuration' },
      { title: 'Helm resources', detail: 'Templates and versions' },
      { title: 'Five environments', detail: 'Consistent delivery' },
    ],
  },
  {
    num: '03',
    slug: 'terraform-aws',
    impact: 'Reproducible infrastructure',
    title: 'AWS infrastructure, defined in Terraform',
    desc: 'A multi-AZ network, TLS-enabled load balancing, and scoped access controls described as reusable infrastructure code.',
    tech: ['AWS', 'Terraform', 'VPC', 'ALB', 'IAM'],
    problem: 'Infrastructure needs an explicit description of its network boundaries, traffic entry points, and access permissions. Those choices need to be reproducible when an environment is provisioned again.',
    contribution: [
      'Designed a multi-AZ AWS architecture with public and private subnets, an Application Load Balancer, and security groups using Terraform.',
      'Configured ALB TLS termination and health checks within the infrastructure definition.',
      'Applied least-privilege IAM and network segmentation, and managed AWS resources through Terraform modules.',
    ],
    outcome: 'Network topology, load balancing, and access controls are represented in Terraform, providing a reproducible foundation for AWS environments.',
    considerations: 'Network segmentation defines access boundaries; workload resilience also depends on placement and application dependencies. Infrastructure changes need review alongside the services that use them.',
    flow: [
      { title: 'Terraform', detail: 'Infrastructure modules' },
      { title: 'Multi-AZ VPC', detail: 'Public and private subnets' },
      { title: 'Application LB', detail: 'TLS and health checks' },
      { title: 'Workload network', detail: 'Scoped security groups' },
    ],
  },
  {
    num: '04',
    slug: 'gateway-api-migration',
    impact: 'Production routing migration',
    title: 'Moving production routing to Gateway API',
    desc: 'Migrated legacy Ingress routing to Gateway API with centralized, namespace-aware HTTPRoute rules.',
    tech: ['Kubernetes', 'Gateway API', 'HTTPRoute', 'Helm'],
    problem: 'Production traffic routing needs a clear relationship between the gateway, route rules, and the services receiving requests. The migration moved that routing configuration from legacy Ingress to Gateway API.',
    contribution: [
      'Migrated production traffic routing from legacy Ingress to Kubernetes Gateway API.',
      'Replaced legacy routing configuration with centralized, namespace-aware HTTPRoute rules.',
      'Parameterized HTTPRoutes alongside the other Kubernetes resources in the environment-specific Helm configuration.',
    ],
    outcome: 'Production routing uses Gateway API and HTTPRoute configuration with namespace-aware rules, replacing the legacy Ingress setup.',
    considerations: 'Gateway configuration and application routes have distinct responsibilities. Route matching and namespace permissions need to reflect the intended service boundaries.',
    flow: [
      { title: 'Gateway', detail: 'Traffic entry point' },
      { title: 'HTTPRoute', detail: 'Namespace-aware rules' },
      { title: 'Kubernetes Service', detail: 'Route destination' },
      { title: 'Workload pods', detail: 'Application traffic' },
    ],
  },
]

export const steps = [
  { num: 'STEP 01', title: 'Build', desc: 'Jenkins builds and tags the application image.' },
  { num: 'STEP 02', title: 'Declare', desc: 'The pipeline updates image versions in the deployment manifests.' },
  { num: 'STEP 03', title: 'Reconcile', desc: 'Argo CD syncs the declared state, with access scoped by environment.' },
  { num: 'STEP 04', title: 'Observe', desc: 'Probes, metrics, alerts, and logs support rollout checks and incident investigation.' },
]

export const skillGroups = [
  { title: 'Delivery automation', tools: 'Jenkins · Argo CD · Helm · Doppler', evidence: 'GitOps pipelines for 10+ microservices.', href: '/work/gitops-delivery' },
  { title: 'Kubernetes delivery', tools: 'Amazon EKS · Kubernetes · Gateway API', evidence: 'Reusable charts across five environments and a production routing migration.', href: '/work/helm-environments' },
  { title: 'Infrastructure as code', tools: 'AWS · Terraform · IAM · VPC · ALB', evidence: 'Multi-AZ infrastructure with explicit network and access boundaries.', href: '/work/terraform-aws' },
  { title: 'Production visibility', tools: 'Prometheus · Grafana · ELK · New Relic', evidence: 'Custom alert rules and centralized logs for production investigation.' },
  { title: 'Operations and security', tools: 'Linux · Bash · Python · Ansible · NetworkPolicies', evidence: 'Provisioning, patching, log rotation, and pod communication controls.' },
]

export const experience = [
  {
    title: 'Associate DevOps Engineer',
    dates: 'July 2024–Present',
    bullets: [
      'Designed and maintained Jenkins and Argo CD pipelines for 10+ microservices, automating deployments across development, test, and production.',
      'Standardized Amazon EKS delivery across five environments with reusable Helm charts and isolated environment configuration.',
      'Migrated production routing from legacy Ingress to Kubernetes Gateway API using centralized, namespace-aware HTTPRoute rules.',
      'Deployed Prometheus, Grafana, New Relic, and ELK with custom alerts and centralized logs to support production monitoring and incident investigation.',
      'Managed AWS infrastructure through Terraform modules, making environment configurations reproducible.',
      'Applied Kubernetes NetworkPolicies to restrict pod communication and implement workload isolation in production.',
      'Automated provisioning, patching, and log rotation with Bash, Python, and Ansible, replacing manual operational steps.',
    ],
  },
  {
    title: 'Software Engineering Trainee (Internship)',
    dates: 'January–June 2024',
    bullets: [
      'Containerized legacy services with multi-stage Docker builds, standardizing application builds and packaging.',
      'Configured Kubernetes liveness and readiness probes and graceful-shutdown hooks to support rolling updates.',
      'Provisioned ACM certificates and configured Nginx TLS termination for internal staging domains.',
    ],
  },
]

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Blog', href: '/blog', route: true },
]
