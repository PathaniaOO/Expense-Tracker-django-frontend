
---

## 🔹 2. Frontend README (`PathaniaOO/Expense-Tracker-django-frontend`)

```markdown
# 💰 Expense Tracker Frontend (React + Vite)

A **React (Vite)** frontend for the Expense Tracker project.  
Connects to the Django REST API backend for authentication, expenses, incomes, and reports.  
Deployed on **Vercel**.

---

## 🚀 Live Demo
- Frontend: [https://expense-tracker-django-frontend.vercel.app](https://expense-tracker-django-frontend.vercel.app)
- Backend API: [https://expense-tracker-django-ig0o.onrender.com/api/docs/](https://expense-tracker-django-ig0o.onrender.com/api/docs/)

---

## 🔧 Tech Stack
- **Frontend:** React + Vite
- **State Management:** React hooks + Context
- **HTTP:** Axios (with JWT interceptors for refresh)
- **Deployment:** Vercel

---

## ✨ Features
- 🔐 Login & signup (JWT auth)
- 💳 Manage accounts
- 💵 Track income & expenses
- 📊 View summaries and reports
- 🌐 API integration with Django backend

---

## ⚙️ Setup Locally

```bash
# Clone repo
git clone https://github.com/PathaniaOO/Expense-Tracker-django-frontend.git
cd Expense-Tracker-django-frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start dev server
npm run dev

VITE_API_URL=http://localhost:8000/api/   # local backend
# In production (Vercel):
VITE_API_URL=https://expense-tracker-django-ig0o.onrender.com/api/
