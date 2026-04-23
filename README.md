# AF Risk Score Calculators

Calculate CHA₂DS₂-VASc and HAS-BLED scores for atrial fibrillation patients.

## Features

- **CHA₂DS₂-VASc Calculator**: Assess stroke risk in atrial fibrillation
- **HAS-BLED Calculator**: Evaluate bleeding risk when considering anticoagulation
- Clean, modern interface with real-time calculations
- Evidence-based recommendations based on current guidelines

## Development

This project uses Vite for development and building, with Vercel Web Analytics integrated.

### Prerequisites

- Node.js (v14 or higher)
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens a development server at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Builds the application to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Analytics

This project includes Vercel Web Analytics to track usage and improve the user experience. Analytics data is collected in a privacy-friendly manner and helps us understand how the calculator is being used.

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project to Vercel
3. Vercel will automatically detect Vite and configure the build settings
4. Enable Web Analytics in your Vercel project dashboard

## Disclaimer

This calculator is for educational and informational purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## License

ISC
