# Rahma Hatem Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide React.

## Run it on your computer

You need [Node.js](https://nodejs.org). In this folder, run:

```bash
npm install
npm run dev
```

Open the address it prints, usually http://localhost:5173. To check the final version, run `npm run build`.

## Change your content

You only need these files. Keep the quotes and commas as they are.

| To change | Edit |
|---|---|
| Name, title, intro, about text, email, social links | `src/data/personalInfo.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Experience, education, awards | `src/data/experience.ts` |
| Skills, languages, process steps | `src/data/skills.ts` |

### Change your photo
Replace `public/images/rahma-hero.webp` with a transparent image using the same name.

### Update your CV
Replace `public/Rahma_Hatem_Fouad_CV.pdf` with a PDF using the same name. Check that it doesn't include your phone number.

### Replace a project screenshot
Project images are in `public/projects/<project name>/`. Replace a file and keep its name.

### Add a new project
1. Create a folder such as `public/projects/my-project/` and add your screens as `.webp` files.
2. In `src/data/projects.ts`, copy a project that is similar to yours.
3. Change `slug` (the page address, no spaces), the text, and the image names.
4. Choose how it looks in `stage.layout`:
   - `phones`: three phone mockups
   - `rise`: three phones in a rising sequence
   - `wall`: large desktop screens
   - `queue`: a large number beside three screens
   - `rings`: screens on concentric rings
   - `line`: four screens as stops on a line
   - `arches`: three screens in arches, with a logo
5. Set `kind` to `desktop` for module tabs, or `mobile` for a scrolling walkthrough.

The case study page is created automatically. To place the project on the homepage, add its `slug` to `featuredSlugs` or `additionalSlugs` at the bottom of `src/data/projects.ts`.

## Publish to GitHub

Install [Git](https://git-scm.com), then in this folder run:

```bash
git init -b main
git remote add origin https://github.com/Rahmah177/rahma-hatem-portfolio.git
git fetch origin
git reset origin/main
git add .
git commit -m "Add portfolio website"
git push origin main
```

These commands add the site on top of the repository's existing history, without a force push.

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. Choose **Add New**, then **Project**, and import `rahma-hatem-portfolio`.
3. Keep the detected Vite settings and choose **Deploy**.
4. Vercel gives you a public address ending in `.vercel.app`. You can rename it under **Settings**, then **Domains**.

After that, every push to `main` updates the live site automatically.
