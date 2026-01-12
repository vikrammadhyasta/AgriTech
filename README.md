# 🌾 AgriTech — Enterprise-Grade GitOps CI/CD Platform



---

## 🧱 Architecture

    Developer (GitHub Push)
            |
            ▼
       GitHub Repository
            |
            ▼
         Jenkins CI
     (Build & Push Image)
            |
            ▼
         AWS ECR
     (Private Docker Registry)
            |
            ▼
       Kubernetes (k3s)
            |
            ▼
          ArgoCD
    (GitOps Deployment)
            |
            ▼
      AgriTech Website

---

## ⚙️ Technology Stack

| Layer | Technology |
|------|-----------|
| Source Control | GitHub |
| CI | Jenkins |
| Containerization | Docker |
| Registry | AWS ECR |
| Orchestration | Kubernetes (k3s) |
| GitOps | ArgoCD |
| Cloud | AWS EC2 |
| Application | AgriTech Frontend |

---

## 📦 Repository Structure

    AgriTech/
    ├── Dockerfile
    ├── Jenkinsfile
    └── k8s/
        ├── deployment.yaml
        ├── service.yaml
        └── application.yaml

---

## 🔁 CI/CD Flow

- Developer pushes code to GitHub
- Jenkins automatically:
  - Builds Docker image
  - Pushes image to AWS ECR
- ArgoCD continuously watches GitHub
- ArgoCD updates Kubernetes manifests automatically
- Kubernetes pulls the latest image from AWS ECR
- Website updates without any manual action



---

## 🔐 Private Registry Handling 

The Kubernetes cluster securely pulls images from **private AWS ECR** using a Kubernetes secret.

    kubectl create secret docker-registry ecr-secret \
      --docker-server=<aws_account>.dkr.ecr.<region>.amazonaws.com \
      --docker-username=AWS \
      --docker-password=$(aws ecr get-login-password)

The Kubernetes Deployment uses:

    imagePullSecrets:
      - name: ecr-secret

This prevents **ImagePullBackOff errors** and enables **secure enterprise-grade deployments**.

---

## 🌐 Live Application

The AgriTech platform allows:

- Farmers to list produce
- Distributors to verify quality
- Retailers to sell products
- Customers to place orders

The application is deployed on **Kubernetes** and exposed using a **service**.

---






