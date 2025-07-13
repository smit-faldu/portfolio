# Modern Portfolio Website

A clean, animated, black-themed portfolio built with Next.js using resume data.

## Features

- **Modern Design**: Minimalistic black theme with clean typography
- **Animations**: Smooth transitions and effects using Framer Motion
- **Responsive**: Fully responsive design for all devices
- **Data-Driven**: Content sourced from resume.txt file
- **Dark/Light Mode**: Theme toggle with dark mode as default

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Typography**: Google Fonts (Inter)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── layout/     # Layout components (Header, Footer)
│   │   └── sections/   # Page sections (Hero, About, etc.)
│   └── utils/          # Utility functions
├── resume.txt          # Resume data source
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── next.config.js      # Next.js configuration
```

## Customization

- **Content**: Update the `resume.txt` file with your information
- **Colors**: Modify the color palette in `tailwind.config.js`
- **Fonts**: Change fonts in `src/app/layout.tsx`

## Deployment

This project is ready to deploy on Vercel:

```bash
npm run build
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

MIT