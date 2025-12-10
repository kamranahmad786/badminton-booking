# 🏸 Badminton Court Booking System

A full-stack platform for booking badminton courts, equipment rentals, and coaches — with dynamic pricing, live availability, and booking history.

---

## 🚀 Deployment Overview

| Part | Platform |
|---|---|
| Backend API | 🚀 Render |
| Frontend UI | ⚡ Vercel |

---

# ⚙️ Deploy Backend on Render

## 1️⃣ Create Render Account
👉 https://render.com

## 2️⃣ Create New Web Service

- Click **New → Web Service**
- Select your backend repo / folder
- Environment:
  - Runtime: **Node**
  - Build Command:
    ```
    npm install
    ```
  - Start Command:
    ```
    npm run start
    ```
  - Branch: `main`

💡 Make sure backend has:

"start": "node src/server.js"

in `package.json`

---

## 3️⃣ Add Environment Variables (Render → Settings → Environment)

PORT=10000
MONGO_URI=your-cloud-mongodb-uri
CLIENT_URL=https://your-frontend-url.vercel.app


⚠️ **IMPORTANT**
- Use **MongoDB Atlas** for cloud MongoDB
  👉 https://www.mongodb.com/cloud/atlas

---

## 4️⃣ Deploy

Render will assign a URL like:

https://badminton-backend.onrender.com


Your API base becomes:

https://badminton-backend.onrender.com/api


---

# ⚡ Deploy Frontend on Vercel

## 1️⃣ Create Vercel Account
👉 https://vercel.com

## 2️⃣ Connect Git Repo

- Click **New Project**
- Import your **frontend** folder

---

## 3️⃣ Environment Variables

In Vercel → Project → Settings → Environment Variables:

VITE_API_URL=https://badminton-backend.onrender.com/api


---

## 4️⃣ Deploy

Vercel gives a live domain:

https://badminton-booking.vercel.app


---

## 🔁 CORS Configuration

Backend allows:

```env
CLIENT_URL=https://badminton-booking.vercel.app

🧪 Test Deployment

Open the browser:

Price Preview:

POST https://badminton-backend.onrender.com/api/meta/price-preview

Create Booking:

POST https://badminton-backend.onrender.com/api/bookings

Frontend:

https://badminton-booking.vercel.app

🛠️ Production Tips

✔ Enable Auto Deploy on both platforms
✔ Don't expose .env publicly
✔ Use MongoDB Atlas cluster
✔ Monitor logs on Render for errors



 
badminton-booking/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── bookingController.js
│   │   │   └── metaController.js
│   │   ├── models/
│   │   │   ├── Court.js
│   │   │   ├── Coach.js
│   │   │   ├── Equipment.js
│   │   │   ├── PricingRule.js
│   │   │   ├── Booking.js
│   │   │   └── WaitlistEntry.js
│   │   ├── routes/
│   │   │   ├── bookingRoutes.js
│   │   │   └── metaRoutes.js
│   │   ├── services/
│   │   │   ├── availabilityService.js
│   │   │   ├── pricingService.js
│   │   │   └── bookingService.js
│   │   └── seed.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── meta.js
│   │   │   └── bookings.js
│   │   └── components/
│   │       ├── BookingPage.jsx
│   │       ├── DateTimeSelector.jsx
│   │       ├── CourtSelector.jsx
│   │       ├── EquipmentSelector.jsx
│   │       ├── CoachSelector.jsx
│   │       ├── PriceSummary.jsx
│   │       └── BookingHistory.jsx
│   ├── package.json
│   └── .env
│
└── README.md
