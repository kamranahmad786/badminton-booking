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

https://badminton-bookings.vercel.app


---

## 🔁 CORS Configuration

Backend allows:

```env
CLIENT_URL=https://badminton-bookings.vercel.app

🧪 Test Deployment

Open the browser:

Price Preview:

POST https://badminton-backend.onrender.com/api/meta/price-preview

Create Booking:

POST https://badminton-backend.onrender.com/api/bookings

Frontend:

https://badminton-bookings.vercel.app

🛠️ Production Tips

✔ Enable Auto Deploy on both platforms
✔ Don't expose .env publicly
✔ Use MongoDB Atlas cluster
✔ Monitor logs on Render for errors


📁 Folder Structure
 
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


⚠️ IMPORTANT CHECKLIST BEFORE DEPLOY

In backend .env:

🚫 Do NOT use localhost

❌ MONGO_URI=mongodb://localhost:27017/badminton-booking

✔ Use Atlas:

MONGO_URI=mongodb+srv://<user>:<pwd>@cluster.mongodb.net/badminton

🎯 Live Workflow
Backend:

✔ Render deploys → restart after env change
✔ Logs available in dashboard

Frontend:

✔ Vercel deploys automatically per push

🙌 Final Result

You will have 2 live URLs:

Backend API:

https://badminton-backend.onrender.com/api

Frontend UI:

https://badminton-bookings.vercel.app

##DB Design + Pricing Engine

Data Modelling

I modelled the problem around explicit resources: Court, Equipment, Coach, and Booking. Courts store type (indoor/outdoor) and active status so the admin can disable individual courts. Equipment is a simple inventory model with a totalQuantity field that is checked against existing bookings for overlapping time ranges to prevent over-allocation. Coaches have an embedded availability array describing recurring weekly time windows; this keeps the schema simple while still allowing the frontend to highlight coach options for a given day.

Bookings act as the central join between all resources: they reference one court, an optional coach, and an array of equipment items with quantities. Time is stored as date (day) plus startTime and endTime strings, which keeps queries and indexes compact and avoids timezone noise for a single-facility system. A compound unique index on (court, date, startTime, endTime, status) prevents double bookings at the database level and, combined with transactions, ensures atomicity. A separate WaitlistEntry collection models the bonus requirement for waitlisting; entries mirror the booking’s time window and allow FIFO processing on cancellation.

Pricing Engine

Pricing is intentionally configuration-driven via the PricingRule collection. Each rule has a type, conditions, and an amountType (FLAT or PERCENT). The engine does not hardcode business constants; instead, it loads enabled rules from the database and evaluates them against a context object containing the court, coach, equipment selection, date, and time. The context derives flags like isWeekend and isPeakHour, and the rules’ condition fields (e.g. indoorOnly, isWeekend) determine which rules apply.

The calculation runs in three phases: determine the base court hourly rate (BASE_RATE rules), compute time-based surcharges (peak hours, weekends, indoor premium), then add resource-based fees (equipment and coach). Rules stack naturally because each contributes its own numeric delta to a breakdown object that is returned alongside the final totalPrice. This breakdown is used on the frontend to show a live, transparent price explanation as users toggle options. Since rules are data-driven, the admin can change peak hour percentages or weekend surcharges without touching code, and new rule types can be introduced by extending the rule enum and handler logic in one place.

📄 License

MIT — free to use & modify

