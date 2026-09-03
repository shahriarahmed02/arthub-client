# ArtHub – Online Art Marketplace

ArtHub is a modern, full-stack digital platform connecting art lovers, collectors, and buyers with talented artists worldwide. The platform enables users to discover and purchase original artworks, empowers artists to manage their portfolios and track sales, and provides administrators with comprehensive system oversight.

---

## Live URL & Credentials

- **Live Demo:** [https://arthub-eta.vercel.app](https://arthub-eta.vercel.app)
- **GitHub Repositories:**
  - **Client (Frontend):** [https://github.com/shahriarahmed02/arthub-client](https://github.com/shahriarahmed02/arthub-client)
  - **Server (Backend):** [https://github.com/shahriarahmed02/arthub-server](https://github.com/shahriarahmed02/arthub-server)

### Default Admin Credentials
- **Email:** `admin@arthub.com`
- **Password:** `Admin@123`

---

## Key Features

- **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for Buyers, Artists, and Admins.
- **Secure Authentication:** JWT-based authentication supporting email/password login and secure registration.
- **Stripe Payment Integration:** Secure checkout flows for purchasing artworks and upgrading user subscription tiers (Pro & Premium).
- **Interactive Artist Studio:** Artists can add, edit, delete, and view sales history for their artworks with image hosting via imgBB.
- **Collector Reviews & Comments:** Verified buyers can leave reviews and comments on artwork detail pages.
- **Advanced Search & Filtering:** Filter artworks by category, search by title/artist name, and sort by price or upload date.
- **Comprehensive Admin Panel:** User management, global artwork controls, transaction tracking, and platform analytics.
- **Responsive Modern UI:** Built with Tailwind CSS and DaisyUI, supporting seamless mobile and desktop experiences.

---

## Tech Stack

### Frontend (Client)
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, DaisyUI
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend (Server)
- **Runtime:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Payments:** Stripe API

---

## Environment Variables

### Client (`.env.local`)
```env
NEXT_PUBLIC_API_URL=https://arthub-backend-d1gf.onrender.com/