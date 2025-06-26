# vTrades – Authentication Flow

A professionally built frontend authentication app using **Next.js**, **TypeScript**, and **Tailwind CSS**. This project goes beyond the basic requirements to implement a polished authentication flow with mock APIs, validation, secure routing, and OAuth support.

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/saumyakushwah/saumyakushwah-vTrades-FrontendDeveloperTask
cd saumyakushwah-vTrades-FrontendDeveloperTask
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a **.env.local** file in the root directory and add the following:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start the Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser to see the app.

## ✨ Features

### 🔐 Authentication
- Email and password-based login with proper field validations
  - Uses a custom `/api/login` route with JWT cookie session  
  - Includes fallback support for sessions outside NextAuth  
  - Uses reusable `isValidEmail()` utility function
  - Error handling using `react-toastify`
- Toggle for show/hide password with icon-based interaction
- Google OAuth login via NextAuth
- Remember Me checkbox (non-functional placeholder for UI parity)
- Session managed securely using `next-auth`

### 🔁 Password Recovery Flow
- Mocked forgot password functionality with:
  - API simulation for sending OTP (`/api/forgot-password`)
  - Client-side OTP entry screen with:
    - 6 input boxes (auto-focus and numeric input only)
    - Countdown timer (30 seconds) for resend logic
    - UI modal confirmation on resend
- OTP verification screen:
  - Validates the OTP using a mocked backend (`/api/verify-otp`)
  - On success, redirects to reset password screen
- Reset password:
  - New password submission form with validation
  - API mock simulates password update (`/api/reset-password`)

### 🧪 Mock API Layer
- All API routes simulate real behavior:
  - `/api/login` – Validates email & password and returns status
  - `/api/forgot-password` – Sends OTP simulation
  - `/api/verify-otp` – Verifies OTP input
  - `/api/reset-password` – Handles password reset flow
- Includes:
  - Input validation
  - Simulated delay-free responses
  - Proper error handling and response codes

### 🧩 Utilities
- Centralized reusable utility function:  
  - `isValidEmail()` handles consistent client and server-side validation
- Clean folder structure for future scalability

### 👤 Dashboard (Protected Route)
- Route protection using `getServerSideProps` with support for both:
  - Google OAuth (`next-auth`)
  - Custom JWT login sessions (via `/api/login`)
- Redirects to login page if the user is not authenticated
- Displays logged-in user’s name from session or localStorage fallback
- Sign-out functionality that clears both session and fallback data

### 🧑‍🎨 UI/UX Enhancements
- Responsive layout built with Tailwind CSS
- Styled placeholder text for form fields
- Minimal hover effects for Sign In, and OAuth Buttons
- Consistent design system with dark-themed layout
- Uses Source Sans Pro font


### 🌐 Environment Management
- Secure and structured use of `.env.local`:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`

## 🔗 Live Preview

- **Hosted App**: [https://saumyakushwah-v-trades-frontend-dev.vercel.app](https://saumyakushwah-v-trades-frontend-dev.vercel.app)
- **GitHub Repository**: [https://github.com/saumyakushwah/saumyakushwah-vTrades-FrontendDeveloperTask](https://github.com/saumyakushwah/saumyakushwah-vTrades-FrontendDeveloperTask)