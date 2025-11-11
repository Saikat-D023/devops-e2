---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│  ┌──────────────┐            ┌──────────────┐              │
│  │   Backend    │            │   Frontend   │              │
│  │  (Node.js)   │            │   (React)    │              │
│  └──────────────┘            └──────────────┘              │
└─────────────────────────────────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │ GitHub Actions │
                    │    CI/CD       │
                    └───────┬────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
        ┌─────▼─────┐             ┌──────▼──────┐
        │  Docker   │             │ Kubernetes  │
        │    Hub    │────────────▶│   Cluster   │
        └───────────┘             └─────────────┘
                                        │
                        ┌───────────────┼───────────────┐
                        │               │               │
                  ┌─────▼─────┐  ┌──────▼──────┐  ┌────▼────┐
                  │  Backend  │  │  Frontend   │  │ MongoDB │
                  │    Pods   │  │    Pods     │  │   Pod   │
                  └───────────┘  └─────────────┘  └─────────┘
```

---

## 📁 Project Structure

```
mern-k8s-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   ├── .dockerignore
│   └── server.test.js
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── k8s/
│   ├── namespace.yaml
│   ├── secrets.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mongo-deployment.yaml
│   └── ingress.yaml
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml
└── README.md
```

---

## ⚡ Quick Start

### Step 1. Prerequisites

* **Node.js** ≥ 18
* **Docker & Docker Compose**
* **GitHub Account & Docker Hub Account**
* (Optional) **kubectl** & **Minikube** for local K8s testing

---

### Step 2. Clone & Setup

```bash
git clone https://github.com/YOUR_USERNAME/mern-k8s-app.git
cd mern-k8s-app

# Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

---

### Step 3. Local Development with Docker Compose

```bash
docker-compose up --build

# Frontend → http://localhost:3000
# Backend → http://localhost:5000/api/health
# MongoDB → localhost:27017

# Stop services
docker-compose down
```

---

### Step 4. Build & Push Docker Images

```bash
# Build
docker build -t YOUR_DOCKERHUB_USERNAME/backend:latest ./backend
docker build -t YOUR_DOCKERHUB_USERNAME/frontend:latest ./frontend

# Push
docker login
docker push YOUR_DOCKERHUB_USERNAME/backend:latest
docker push YOUR_DOCKERHUB_USERNAME/frontend:latest
```

---

## 🔄 CI/CD with GitHub Actions

The GitHub Actions pipeline:

* Runs backend & frontend tests
* Builds Docker images
* Pushes images to Docker Hub
* (Optional) Deploys to Kubernetes when configured

---

### 🔐 GitHub Secrets Required

| Secret Name                     | Description                                       |
| ------------------------------- | ------------------------------------------------- |
| `DOCKER_USERNAME`               | Your Docker Hub username                          |
| `DOCKER_PASSWORD`               | Your Docker Hub access token                      |
| `KUBE_CONFIG_DATA` *(optional)* | Base64 encoded kubeconfig (for K8s deploys later) |

If you haven’t set up Kubernetes yet, you can safely **skip** `KUBE_CONFIG_DATA` — your workflow will still build and push images successfully.

---

## ☸️ Deploying to Kubernetes 

Once you’re ready to deploy:

```bash
# Start Minikube
minikube start --cpus=2 --memory=4096
minikube addons enable ingress

# Update image names with your Docker Hub username
kubectl apply -f k8s/

# Check resources
kubectl get all -n mern-app

# Access app
minikube ip
```

✅ You can later add your kubeconfig to GitHub Secrets for automatic deployment.

---

## ☁️ (Optional) AWS EKS Setup

If you want to deploy to a cloud Kubernetes cluster, see:

```bash
# Create EKS cluster
eksctl create cluster --name mern-cluster --region us-east-1
```

Then update kubeconfig, install ingress, and apply your manifests.

---

## 🧠 Developer Notes

* For now, your pipeline stops after **pushing Docker images**.
* You can add **automatic Kubernetes deploy** later by uncommenting the `kubectl apply` step in `ci-cd.yml`.
* Keep your **Docker Hub credentials** secure via GitHub Secrets.

---

## 👤 Author

**Saikat Dey**
GitHub: [@Saikat-D023](https://github.com/Saikat-D023)

---
