# InsightStack — Enterprise SaaS Analytics Platform

> **Transform business data into actionable insights with real-time dashboards, AI-powered analytics, and role-based reporting.**

---

## 📌 Executive Summary

**InsightStack** is a full-stack, enterprise-grade Business Intelligence & Analytics platform built with **React 18 (TypeScript)** and **Django 4.2 (REST Framework)**. Designed for modern multi-tenant businesses, startups, and enterprise operations, it aggregates complex business datasets into intuitive dashboards, trend analysis tools, and AI-driven automated insights powered by **Google Gemini AI**.

---

## 🛠️ Technology Stack

### **Frontend**
* **Core Framework**: React 18 + TypeScript (Vite build engine)
* **Styling**: Modern Tailwind CSS design system with custom dark mode & glassmorphism
* **Data Visualization**: Recharts (Area charts, Bar charts, Pie charts)
* **State Management**: Zustand & TanStack Query (React Query)
* **Forms & Validation**: React Hook Form
* **Icons**: Lucide React

### **Backend**
* **Core Framework**: Django 4.2 LTS + Django REST Framework (DRF)
* **Authentication**: SimpleJWT (JSON Web Tokens) with MFA TOTP support
* **AI Integration**: Google Generative AI (Gemini Pro integration)
* **Database**: SQLite (Development) / PostgreSQL 16 (Production)
* **API Documentation**: OpenAPI 3.0 via `drf-spectacular` & Swagger UI
* **Background Processing**: Celery + Redis (Asynchronous report generation & email alerts)

---

## 🚀 Key Modules & Capabilities

1. **Authentication & Security**
   * Multi-factor authentication (MFA/TOTP)
   * Role-Based Access Control (RBAC): `Admin`, `Manager`, `Analyst`, `Viewer`
   * JWT session management & token blacklisting

2. **Multi-Tenancy & Workspace Isolation**
   * Organization onboarding and team member management
   * Isolated workspaces with custom permissions per user

3. **Interactive Dashboard System**
   * Custom dashboard builder supporting KPI Cards, Line/Area Charts, Bar Charts, Pie Charts, and Data Tables
   * Configurable refresh intervals and widget configurations

4. **AI-Powered Analytics (Gemini AI)**
   * Natural language query interface (`AIQueryBox`) for instant data questioning
   * Automated anomaly detection and revenue forecasting
   * Actionable recommendation engine

5. **Advanced Analytics Explorer**
   * Dedicated views for Revenue Trends, Customer Growth (Acquisition vs. Churn), Traffic Channels, and Regional Distribution
   * Interactive filters and multi-period comparisons (`3m`, `6m`, `1y`)

6. **Dataset Import Engine**
   * Drag-and-drop file uploader supporting CSV, Excel (`.xlsx`), and JSON formats
   * Automated row count, column detection, and data preview

7. **Automated Reports & Exporting**
   * Scheduled report generation (Daily, Weekly, Monthly)
   * Export support for PDF and Excel (`.xlsx`) formats

8. **Enterprise Audit & Compliance**
   * Complete audit trail tracking user logins, dataset imports, report exports, and dashboard modifications
   * IP address and timestamp logging

9. **Billing & Subscriptions**
   * Tiered subscription plans (`Starter`, `Pro`, `Enterprise`)
   * Member limits, dashboard limits, and feature gating

---

## 📂 Project Structure

```
insightstack/
├── frontend/                     # React 18 + TypeScript Application
│   ├── src/
│   │   ├── components/           # UI components & slide-over panels
│   │   ├── pages/                # Application pages & routing views
│   │   │   ├── app/              # Protected dashboard pages
│   │   │   └── auth/             # Login, Register, Forgot Password
│   │   ├── services/             # Axios API client services
│   │   ├── store/                # Zustand global state stores
│   │   └── utils/                # Mock data & utility helpers
│   └── package.json
│
├── backend/                      # Django 4.2 REST API Backend
│   ├── ai_insights/              # Gemini AI integration module
│   ├── analytics/                # KPI formulas & trend analysis
│   ├── audit/                    # Enterprise audit logging
│   ├── authentication/           # Auth views & JWT handlers
│   ├── config/                   # Django settings & Celery config
│   ├── dashboards/               # Dashboards & widget models
│   ├── datasets/                 # File import handlers
│   ├── notifications/            # User notification center
│   ├── organizations/            # Multi-tenant organization logic
│   ├── reports/                  # Report generator & schedules
│   ├── subscriptions/            # Subscription plans & billing
│   ├── users/                    # Custom User & Profile models
│   └── manage.py
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
* **Node.js**: v18.x or higher
* **Python**: v3.10 or higher
* **npm**: v9.x or higher

### 1️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

### 2️⃣ Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env
python manage.py migrate --settings=config.settings.dev
python manage.py runserver --settings=config.settings.dev 8000
```
