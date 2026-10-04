# Kiplangat Ezra Portfolio

A responsive personal portfolio built with plain HTML, CSS, and vanilla JavaScript. No build step or package installation is required.

## Replace the placeholders

1. Save your profile photo as `assets/images/profile.jpg`. The same photo is used in the hero and About section.
2. Add your resume PDF at `files/resume.pdf`.
3. Edit the `CONFIG` object at the top of `script.js` to update your email, roles, skills, timezone, location, and project details. Social profile links and the resume/certification links are in `index.html`.

The profile image falls back to initials if the image is missing. Update the resume link when you add your PDF.

## Add project screenshots

1. Create an `assets/images/projects/` folder.
2. Save each project screenshot there with a short, lowercase filename, for example `vex.png` or `parking-dashboard.jpg`. Use PNG or JPG, and crop screenshots to a consistent landscape shape (about 16:9).
3. Add a `screenshot` property to that project's entry in the `CONFIG.projects` array in `script.js`, using a path relative to the portfolio root:

	```js
	screenshot: "assets/images/projects/vex.png",
	```

	Put a comma after the property if another project field follows it. Projects without a `screenshot` property keep their colored placeholder artwork.
4. Open `index.html` in a browser and check the project card and its detail dialog. Make sure the filename capitalization and extension match exactly; GitHub Pages paths are case-sensitive.

## Deploy with GitHub Pages

1. Push `index.html`, `styles.css`, `script.js`, and your assets to the root of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your publishing branch (usually `main`) and the `/ (root)` folder, then save.
5. Wait for the Pages deployment to finish and open the published URL shown in the Pages settings.

You can also preview locally by opening `index.html` in a browser.