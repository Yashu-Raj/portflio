# Yashu Raj Singh — Portfolio

## Local development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deploy to GitHub Pages

Pushing to `master` builds the static site and deploys it to GitHub Pages using the workflow in `.github/workflows/deploy.yml`. The generated `.next` build files are not committed.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The site will be available at:

https://yashu-raj.github.io/portflio/
