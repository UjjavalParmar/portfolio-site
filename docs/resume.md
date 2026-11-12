# Ujjaval Parmar

DevOps / Platform Engineer | Kubernetes, AWS, GitOps, Terraform

Ahmedabad, India (open to relocation and remote) | +91 7573869598 | ujjavalworkmail22@gmail.com

linkedin.com/in/ujjaval-devops | github.com/UjjavalParmar | devopslife.space

## Summary

DevOps Engineer with 2+ years running production Kubernetes delivery on Amazon Web Services (AWS): GitOps (Jenkins, Argo CD), Helm, Terraform IaC, and Prometheus, Grafana, and ELK monitoring.

## Skills

Cloud & IaC: AWS (EC2, VPC, IAM, ALB, Route 53, RDS, S3, ACM, CloudWatch), Terraform, Ansible

Kubernetes & Platform: Kubernetes (EKS, kubeadm, MicroK8s), Helm, Docker, Gateway API, HPA, RBAC

CI/CD & GitOps: Jenkins, Argo CD (ArgoCD), GitHub Actions, Bitbucket Pipelines

Observability: Prometheus, Grafana, Alertmanager, New Relic, ELK Stack (Elasticsearch, Logstash, Kibana)

Security & DevSecOps: Doppler (secrets management), IAM least privilege, NetworkPolicies, TLS (ACM)

Languages, OS & Tools: Bash, Python, Linux (Ubuntu, Amazon Linux, Arch), systemd, Cron, Git

Databases: PostgreSQL, MySQL, Redis

## Work Experience

### Associate DevOps Engineer | Jul 2024 – Present

GlobalVoxInc, Ahmedabad, India

- Designed and maintained GitOps pipelines (Jenkins CI, Argo CD) for 10+ microservices, automating deployments across dev, test, and production.

- Standardized Kubernetes delivery on Amazon EKS with reusable Helm base charts across 5 environments, enforcing zero-downtime rollouts and per-environment config isolation.

- Migrated production traffic routing from legacy Ingress to Kubernetes Gateway API (HTTPRoute), replacing it with centralized, namespace-aware routing rules.

- Deployed Prometheus, Grafana, New Relic, and ELK with custom alert rules and centralized log analysis for proactive incident detection.

- Managed AWS infrastructure (VPC, EC2, RDS, S3, ALB, IAM) with Terraform modules, keeping environments reproducible and every change auditable.

- Enforced pod-level isolation with NetworkPolicies, restricting lateral movement in production.

- Automated provisioning, patching, and log rotation with Bash, Python, and Ansible, removing manual steps.

### Software Engineering Trainee (Internship) | Jan 2024 – Jun 2024

GlobalVoxInc, Ahmedabad, India

- Containerized legacy services with multi-stage Docker builds, shrinking images and standardizing builds.

- Configured Kubernetes liveness/readiness probes and graceful-shutdown hooks for safe rolling updates.

- Provisioned ACM certificates and Nginx TLS termination for internal domains, securing staging.

## Projects

### Multi-Environment Helm Platform

- Authored reusable Helm base charts (base-service, base-frontend) serving 10 microservices across 5 environments, cutting new-service onboarding from days to hours.

- Parameterized Deployments, Services, ConfigMaps, Secrets, and HTTPRoutes per environment.

- Enforced resource requests/limits, pull secrets, and versioned chart releases to prevent config drift.

### GitOps CI/CD Pipeline with Jenkins and Argo CD

- Built multi-branch GitOps pipelines with automated image-tag updates and manifest sync, supporting parallel feature delivery across environments.

- Integrated Doppler for runtime secret injection, removing hardcoded credentials from source control and CI.

- Configured Argo CD RBAC to gate production promotion and give developers dev/test self-service.

### Highly Available AWS Infrastructure with Terraform

- Designed a multi-AZ AWS architecture (VPC, public and private subnets, ALB with TLS termination and health checks, security groups) fully provisioned with Terraform.

- Applied least-privilege IAM and network segmentation aligned to the AWS Well-Architected security pillar.

## Education

B.Tech, Computer Science & Engineering | 2020 – 2024

Pandit Deendayal Energy University | CGPA: 8.9 / 10

---

Source: [User-supplied Google document](https://docs.google.com/document/d/1QLxQgclnrqF6O0aouiT4-1KBc_NKRG67/edit). PDF and Word downloads are unchanged exports of this source.

Source note: “zero-downtime” and “days to hours” appear in the supplied document. They have not been added to the website’s accomplishment copy because the user previously said these outcomes were not measured.
