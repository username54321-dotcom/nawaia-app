# 📚 Nawaia - Educational Platform

<div align="center">

![Nawaia Logo](./assets/images/logo-1.png)

**A modern, cross-platform educational application built with React Native and Expo**

[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## 🌟 Overview

**Nawaia** (نوايا) is a comprehensive educational platform that provides access to courses, books, and consultation services. Built with modern technologies and best practices, the app delivers a seamless learning experience across iOS, Android, and Web platforms with full Arabic and English language support.

### ✨ Key Features

- 📖 **Course Management** - Browse, enroll, and track progress in educational courses
- 📚 **Digital Library** - Access a curated collection of books and reading materials
- 🎓 **Video Lessons** - Watch high-quality video content with note-taking capabilities
- 📅 **Consultation Booking** - Schedule appointments with educational consultants
- 👤 **User Accounts** - Secure authentication with approval-based access control
- 🌐 **Bilingual Support** - Full Arabic (RTL) and English language support
- 📱 **Cross-Platform** - Native iOS, Android, and responsive Web experience
- 🎨 **Modern UI** - Beautiful, accessible interface with smooth animations
- 🔐 **Admin Panel** - Content management system for administrators
- 📊 **Progress Tracking** - Monitor learning history and achievements

---

## 🛠️ Tech Stack

### Core Framework

- **[React Native](https://reactnative.dev/)** (0.81.4) - Cross-platform mobile framework
- **[Expo](https://expo.dev/)** (~54.0) - Development platform and tooling
- **[TypeScript](https://www.typescriptlang.org/)** (~5.9.2) - Type-safe JavaScript

### Navigation & Routing

- **[Expo Router](https://docs.expo.dev/router/introduction/)** (~6.0) - File-based routing system
- **[React Navigation](https://reactnavigation.org/)** (^7.0) - Navigation library
  - Bottom Tabs Navigator
  - Drawer Navigator

### State Management & Data Fetching

- **[Zustand](https://zustand-demo.pmnd.rs/)** (^4.5.7) - Lightweight state management
- **[TanStack Query](https://tanstack.com/query)** (^5.90.2) - Powerful data synchronization
- **[React Hook Form](https://react-hook-form.com/)** (^7.65.0) - Form validation
- **[Zod](https://zod.dev/)** (^3.25.76) - Schema validation

### Backend & Database

- **[Supabase](https://supabase.com/)** (^2.78.0) - Backend-as-a-Service
  - Authentication
  - PostgreSQL Database
  - Real-time subscriptions
  - Storage

### UI & Styling

- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[Tailwind CSS](https://tailwindcss.com/)** (^3.4.0) - Utility-first CSS framework
- **[Moti](https://moti.fyi/)** (^0.30.0) - Animation library
- **[Lucide Icons](https://lucide.dev/)** (^0.544.0) - Beautiful icon set
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** (~4.1.1) - Advanced animations

### Internationalization

- **[i18next](https://www.i18next.com/)** (^25.7.4) - Internationalization framework
- **[react-i18next](https://react.i18next.com/)** (^16.5.3) - React bindings for i18n
- **[expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/)** - Device locale detection

### Performance & Optimization

- **[@shopify/flash-list](https://shopify.github.io/flash-list/)** (2.0.2) - High-performance lists
- **[React Native MMKV](https://github.com/mrousavy/react-native-mmkv)** - Fast key-value storage (via AsyncStorage)

### Media & Content

- **[Expo Video](https://docs.expo.dev/versions/latest/sdk/video/)** (~3.0.14) - Video playback with PiP support
- **[Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)** (^3.0.9) - Optimized image component
- **[Lexical](https://lexical.dev/)** (^0.38.2) - Rich text editor framework
- **[React Native Render HTML](https://meliorence.github.io/react-native-render-html/)** (^6.3.4) - HTML rendering

### Development Tools

- **[ESLint](https://eslint.org/)** (^9.25.1) - Code linting
- **[Prettier](https://prettier.io/)** (^3.2.5) - Code formatting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript linting rules

---

## 📁 Project Structure

```
nawaia/
├── app/                          # Application screens (Expo Router)
│   ├── (Pages)/                  # Main application pages
│   │   ├── (Admin)/             # Admin content management
│   │   ├── (ResetPassword)/     # Password reset flow
│   │   ├── about-us/            # About page
│   │   ├── account/             # User account & auth
│   │   ├── book/                # Individual book view
│   │   ├── booking/             # Consultation booking
│   │   ├── books/               # Books library
│   │   ├── course/              # Individual course view
│   │   ├── courses/             # Courses catalog
│   │   └── test/                # Testing page
│   ├── _layout.tsx              # Root layout
│   ├── +html.tsx                # HTML document wrapper
│   └── index.tsx                # Home page
├── components/                   # Reusable UI components
│   ├── Animations/              # Animation components
│   ├── Banner/                  # Banner components
│   ├── Books/                   # Book-related components
│   ├── Courses/                 # Course-related components
│   ├── MyDrawer/                # Custom drawer navigation
│   ├── MyModal/                 # Modal components
│   ├── Pages/                   # Page-specific components
│   ├── Reusebales/              # Generic reusable components
│   └── ui/                      # UI primitives
├── lib/                         # Core libraries & utilities
│   ├── locales/                 # Translation files
│   │   ├── ar.json             # Arabic translations
│   │   └── en.json             # English translations
│   └── i18n.ts                  # i18n configuration
├── store/                       # Zustand state stores
├── utils/                       # Utility functions
│   ├── supabase.ts             # Supabase client setup
│   └── database.types.ts       # Database type definitions
├── types/                       # TypeScript type definitions
├── assets/                      # Static assets (images, fonts)
├── supabase/                    # Supabase configuration
│   ├── functions/              # Edge functions
│   └── config.toml             # Supabase config
├── HelperFunctions/            # Helper utilities
├── data/                        # Static data files
├── public/                      # Public web assets
├── tailwind.config.js          # Tailwind CSS configuration
├── metro.config.js             # Metro bundler configuration
├── babel.config.js             # Babel configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (installed globally or via npx)
- **iOS Simulator** (macOS only) or **Android Studio** (for Android development)
- **Supabase Account** (for backend services)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nawaia
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

### Running the App

- **iOS**: Press `i` in the terminal or run `npm run ios`
- **Android**: Press `a` in the terminal or run `npm run android`
- **Web**: Press `w` in the terminal or run `npm run web`

---

## 📜 Available Scripts

| Script                     | Description                                   |
| -------------------------- | --------------------------------------------- |
| `npm start`                | Start Expo development server with dev client |
| `npm run ios`              | Run on iOS simulator/device                   |
| `npm run android`          | Run on Android emulator/device                |
| `npm run web`              | Run web version in browser                    |
| `npm run prebuild`         | Generate native projects                      |
| `npm run lint`             | Run ESLint and Prettier checks                |
| `npm run format`           | Format code with ESLint and Prettier          |
| `npm run build:dev`        | Build development version with EAS            |
| `npm run build:preview`    | Build preview version with EAS                |
| `npm run build:prod`       | Build production version with EAS             |
| `npm run generate-sitemap` | Generate sitemap for web                      |
| `npm run build`            | Build web version with sitemap                |

---

## 🌐 Internationalization (i18n)

The app supports **Arabic** (primary) and **English** with full RTL (Right-to-Left) support for Arabic.

### Language Files

- `lib/locales/ar.json` - Arabic translations
- `lib/locales/en.json` - English translations

### Default Language

Arabic is set as the default language. Users can switch languages via the language switcher component.

---

## 🔐 Authentication & Authorization

### User Flow

1. **Sign Up** - Users create an account with email, username, and phone
2. **Approval** - Admin approval required (up to 24 hours)
3. **Sign In** - Approved users can access content
4. **Password Reset** - Forgot password flow via email

### Access Control

- Public pages: Home, About Us, Sign In/Up
- Protected pages: Courses, Books, Account, Booking
- Admin pages: Content management (admin-only access)

---

## 🎨 UI/UX Features

- **Responsive Design** - Adapts to all screen sizes
- **Dark/Light Mode** - System-based theme support
- **Smooth Animations** - Moti & Reanimated for fluid transitions
- **Accessible** - WCAG compliant with proper ARIA labels
- **Performance Optimized** - FlashList for efficient scrolling
- **SEO Optimized** - Meta tags, sitemap, and structured data for web

---

## 📱 Platform-Specific Features

### iOS

- Minimum deployment target: iOS 15.4
- Tablet support enabled
- Picture-in-Picture video support

### Android

- Adaptive icon with custom foreground
- Package: `com.marwank11.nawaia`

### Web

- Single-page application (SPA) mode
- Metro bundler for web
- Sitemap generation for SEO
- Responsive design with mobile-first approach

---

## 🧪 Testing & Quality

- **TypeScript** - Full type safety across the codebase
- **ESLint** - Code quality and consistency checks
- **Prettier** - Automated code formatting
- **TanStack Query** - Optimistic updates and error handling

---

## 🚢 Deployment

### Mobile Apps (EAS Build)

```bash
# Development build
npm run build:dev

# Preview build
npm run build:preview

# Production build
npm run build:prod
```

### Web Deployment

```bash
# Build for production
npm run build

# Output will be in dist/ directory
```

---

<div align="center">

</div>
