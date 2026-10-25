# Sophia Williams Portfolio

A responsive, single-page product design portfolio built with React, Vite, Tailwind CSS v4 and Framer Motion.

## Prerequisites

Before running this project, you need to have **Node.js** installed on your system.

### Installing Node.js on Windows

1. Download Node.js from the official website: https://nodejs.org/
2. Download the **LTS (Long Term Support)** version (recommended for stability)
3. Run the installer and follow the installation wizard
4. After installation, restart your terminal/command prompt
5. Verify installation by running:
   ```bash
   node --version
   npm --version
   ```

## Run locally

Once Node.js is installed:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Other commands

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Troubleshooting

If you encounter issues:

1. **Node.js not found**: Make sure Node.js is installed and the path is added to your system environment variables
2. **Port already in use**: If port 3000 is busy, Vite will automatically use the next available port
3. **Module not found**: Run `npm install` to ensure all dependencies are installed

## Content and visuals

Portfolio copy and the editable section data live in `src/data/portfolio.ts`. The project did not contain an `images/` directory or image assets, so the requested landscape background, profile/hero portraits, service thumbnail and project imagery are represented with CSS gradients and accessible icon-led artwork instead. No remote or generated images are used.

The contact form validates in the browser and displays a local confirmation, but it is not connected to an email or form delivery service.