# Vehicle Auctions Platform

A modern web application for browsing and bidding on vehicle auctions, built with next.js 15.3.0 and React 19.

![Main Page](https://github.com/user-attachments/assets/a9ef25a1-690f-45ab-b16c-98d5b66bd40b)

## 📋 Table of Contents

- [Overview](#overview)

- [Features](#features)

- [Tech Stack](#tech-stack)

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)

  - [Installation](#installation)

  - [Running the Development Server](#running-the-development-server)

  - [Building for Production](#building-for-production)

- [Project Structure](#project-structure)

- [Key Components](#key-components)

- [Testing](#testing)

## 🚀 Overview

The Vehicle Auctions Platform provides a user-friendly interface for browsing and filtering on vehicle auctions. Users can view detailed information about each vehicle, mark favorites, and sorts listings on various criteria.

## ✨ Features

- **Vehicle Listings**: Browse through available vehicles with detailed information

- **Advanced Filtering**: Filter vehicles by make, model, price range, and more

- **Favorites**: Mark vehicles as favorites for easy access

- **Sorting Options**: Sort vehicles by make, starting bid, mileage, or auction date

- **Responsive Design**: Optimized for both desktop and mobile devices

- **Pagination**: Navigate through multiple pages of vehicle listings

## 💻 Tech Stack

- **Framework**: [Next.js 15.3.0](https://nextjs.org/)

- **UI Library**: [React 19.0.0](https://react.dev/)

- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)

- **UI Components**:

  - [Radix UI](https://www.radix-ui.com/) for accessible components

  - [Shadcn UI](https://ui.shadcn.com/) shadcn/ui is a set of beautifully-designed, accessible components and a code distribution platform.

- **Icons**: [Lucide React](https://lucide.dev/)

- **Testing**: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)

- **Linting**: [ESLint](https://eslint.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later

- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash

   git clone https://github.com/joao-gulin/vehicle-results.git

   cd vehicle-results
   ```

### Installation

2. Install dependencies:

   ```bash

   npm install

   # or

   yarn install

   # or

   pnpm install

   # or

   bun install
   ```

### Running the Development Server

Run the development server with:

```bash
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
```

### Building for Production

To create a production build:

````bash
```bash
npm run build

# or

yarn build

# or

pnpm build

# or

bun build
````

```

```

## Project Structure

vehicle-results/

├── app/ # Next.js app directory

│ ├── vehicles/ # Route for the vehicle details page it uses the id of the vehicle for the params

│ ├── types/ # TypeScript type definitions

│ ├── components/ # Shared components

│ ├── lib/ # Utility functions and hooks

│ ├── page.tsx # Home page

│ └── layout.tsx # Root layout

├── public/ # Static assets

├── tests/ # Test files

├── next.config.js # Next.js configuration

└── tailwind.config.js # Tailwind CSS configuration

## Key Components

- VehicleCard: Displays individual vehicle information with image, details, and action buttons

- FilterPanel: Provides options to filter vehicles by various criteria

- Pagination: Allows navigation through multiple pages of results

- FavoriteButton: Toggles favorite status for vehicles

- SortDropdown: Enables sorting of vehicle listings by different attributes

- VehicleDetail: Shows comprehensive information about a selected vehicle

- BidForm: Interface for placing bids on vehicles

- AuctionTimer: Countdown timer showing time remaining in an auction

## Testing

Run tests with:

```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun test
```

For test coverage:

```bash
npm test -- --coverage
# or
yarn test --coverage
# or
pnpm test -- --coverage
# or
bun test --coverage
```
