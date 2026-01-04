## Super Mall Web Application
## Developed by: H Nilsankar Singha


## Project Overview
The Super Mall Web Application is a high-performance mall management system designed to digitize rural and developing markets. It provides a robust dual-interface for Administrators to control infrastructure and for Users to engage in a modern, data-driven shopping experience.

## 🚀 Tech Stack
- Next.js (App Router)
- Firebase (Auth, Firestore)
- Tailwind CSS
- DaisyUI

## ✨ Features
- User authentication
- Product browsing
- Admin dashboard
- Product CRUD operations
- Secure Firestore rules
- Responsive UI

## System Architecture & Modules
# 1. Authentication & Role Management
RBAC (Role-Based Access Control): Custom ProtectedRoute component that intercepts unauthorized access and redirects based on user claims.

Persistent Auth: Seamless integration of Firebase Auth state with Next.js middleware patterns.

# 2. The "Versus" Comparison Engine (Advanced Feature)
Smart Selection: Interactive comparison slots allowing users to select products from different shops across the mall.

Best Price Algorithm: Implemented useMemo logic to automatically identify and highlight the "Best Deal" (lowest price) among compared items.

Global State Synchronization: Utilized a custom event-dispatching system to update the Navbar comparison badge in real-time without page refreshes.

# 3. Admin Inventory Control
Consolidated Management: A unified product dashboard that filters inventory by Shop ID, allowing for instant CRUD operations (Add/Delete/View) in a single-page view.

Mall Analytics: Real-time "Bird-Eye" dashboard displaying live counts of Shops, Categories, Products, and Active Offers.

# 4. Technical Hurdles Solved
Hydration Synchronization: Fixed the "Cascading Render" error (setState within effects) using requestAnimationFrame and isMounted patterns to bridge the gap between Server-Side Rendering and Browser LocalStorage.

### Evaluation Metrics Implemented
# React 19 Compliant: Zero console warnings for synchronous state updates in effects.

# SSR Safe: Robust checks for window and localStorage to prevent hydration mismatches.

# Data Integrity: Strict relational mapping where Products and Offers are tied to specific Shop and Category IDs.

# User Engagement: Real-time visual feedback (badges, highlights, and animations) for a "Premium App" feel.
