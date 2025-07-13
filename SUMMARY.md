# Portfolio Project Summary

## Overview
This project is a modern, minimalistic personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion. It features a dark theme by default, smooth animations, and responsive design.

## Features
- **Modern Design**: Clean, minimalistic black theme with elegant typography
- **Animated UI**: Smooth transitions and effects using Framer Motion
- **Dynamic Content**: Data sourced from resume.txt file
- **Responsive**: Fully responsive design for all devices
- **Dark/Light Mode**: Theme toggle with dark mode as default

## Project Structure
```
portfolio/
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js app router pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── loading.tsx    # Loading state
│   │   └── not-found.tsx  # 404 page
│   ├── components/        # React components
│   │   ├── layout/        # Layout components
│   │   │   ├── Header.tsx # Navigation header
│   │   │   ├── Footer.tsx # Page footer
│   │   │   └── ThemeToggle.tsx # Theme switcher
│   │   └── sections/      # Page sections
│   │       ├── Hero.tsx   # Hero section with typing animation
│   │       ├── About.tsx  # About section
│   │       ├── Experience.tsx # Work experience section
│   │       ├── Skills.tsx # Skills section
│   │       ├── Projects.tsx # Projects section
│   │       └── Contact.tsx # Contact form section
│   └── utils/             # Utility functions
│       └── resumeParser.ts # Resume data parser
├── resume.txt             # Resume data source
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── vercel.json            # Vercel deployment configuration
```

## Color Palette
- Background: `#000000`
- Primary text: `#F2F2F2`
- Accent elements: `#EAE4D5`
- Secondary text/labels: `#B6B09F`

## Technical Implementation
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for smooth transitions and effects
- **Typography**: Google Fonts (Inter)
- **Data Source**: resume.txt parsed with custom utility
- **Deployment**: Ready for Vercel deployment

## Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment
The project is ready to deploy on Vercel with the included vercel.json configuration.