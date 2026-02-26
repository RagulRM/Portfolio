# Resume Setup Instructions

## How to Add Your Resume

To enable the Resume button functionality in your portfolio:

1. **Prepare your resume**
   - Save your resume as a PDF file
   - Name it: `Ragul_Ravi_Resume.pdf`

2. **Place the file**
   - Copy the PDF file to the root directory of your portfolio
   - It should be in the same folder as `index.html`, `styles.css`, and `script.js`

3. **File structure should look like:**
   ```
   Portfolio/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── Ragul_Ravi_Resume.pdf  ← Your resume file here
   └── RESUME_SETUP.md
   ```

## Resume Button Features

- **Left Click**: Opens resume in a new tab (preview)
- **Right Click**: Downloads the resume directly to the user's device
- **Mobile**: Tap to preview, long-press for download option

## Customization

If you want to use a different filename:
- Update line 36 in `index.html`: Change `href="./Ragul_Ravi_Resume.pdf"`
- Update line 579 in `script.js`: Change `link.download = 'Ragul_Ravi_Resume.pdf'`

---

**Note**: The resume button will appear in the navigation bar next to the theme toggle button.
