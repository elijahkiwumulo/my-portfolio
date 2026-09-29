# Elijah Kiwumulo Lule - Personal Portfolio

This is a modern, responsive, and blazing-fast personal portfolio built specifically for Elijah Kiwumulo Lule. It uses vanilla HTML, custom CSS with Tailwind CDN (for zero-build easy editing), and JavaScript Modules.

## How to Edit Your Information

All your personal data, skills, projects, and social links are centralized in a single configuration file.

1. Open `data/profile.js`.
2. Edit your information (update links, text, and add your actual **GitHub username** so the API fetches your repositories automatically).
3. Save the file. The changes will reflect immediately.

## How to Update Your CV and Profile Picture

1. Place your PDF resume in the `assets/` folder and name it `Elijah_Kiwumulo_CV.pdf` (or update the filename in `data/profile.js`).
2. Place your professional photo in the `assets/` folder.
3. Open `index.html`, search for `profile-img`, remove the `hidden` class, and update the `src` attribute to point to your image (e.g., `./assets/profile.jpg`).

## How to Publish to GitHub and Deploy Online (Free)

Follow these steps to put your portfolio online via **GitHub Pages**:

### Step 1: Push to GitHub
1. Create a new repository on your GitHub account (name it `portfolio` or `ElijahKiwumulo.github.io`).
2. Open your terminal, navigate to this project folder, and run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Deploy to GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (the gear icon).
3. In the left sidebar, scroll down and click on **Pages**.
4. Under the **Build and deployment** section, look for **Source**.
5. Select **Deploy from a branch**.
6. Under **Branch**, select `main` (or `master`) and keep the folder as `/ (root)`.
7. Click **Save**.

Your website will automatically build and deploy! Within a few minutes, you will see a link at the top of the Pages settings indicating where your site is live (usually `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`).

**Note:** Since this site uses standard HTML/CSS/JS without any build steps (like Node.js or Vite build), GitHub Pages will host it natively and instantly. Every time you push a change to the `main` branch, it will update automatically!
