# Convexo - Navbar and Footer Implementation Guide

This guide explains how to implement consistent navigation across all pages on the Convexo website.

## Table of Contents
1. [Introduction](#introduction)
2. [Implementation Steps](#implementation-steps)
3. [Creating New Pages](#creating-new-pages)
4. [Updating Existing Pages](#updating-existing-pages)
5. [Troubleshooting](#troubleshooting)

## Introduction

Maintaining consistent navigation and footer elements across all pages is crucial for a professional website experience. In our implementation, we use JavaScript loaders to inject the same navbar and footer across all pages.

### Key Benefits
- Consistent user experience across the site
- Centralized management of navigation elements
- Easier updates (change in one place, applied everywhere)
- Reduced maintenance burden

## Implementation Steps

Our implementation uses two key JavaScript files:
- `navbar-loader.js`: Loads the navbar from a central HTML file
- `footer-loader.js`: Loads the footer from a central HTML file

Both use absolute paths to ensure consistency across all directory levels.

## Creating New Pages

When creating a new page, follow these steps:

1. Use the template file `page-template.html` as a starting point
2. Include the navbar and footer loaders with **absolute paths**:

```html
<!-- In the head section -->
<script src="/navbar-loader.js"></script>

<!-- At the end of the body section -->
<script src="/footer-loader.js"></script>
```

3. Ensure you have empty `<header>` and `<footer>` tags where the content will be injected:

```html
<!-- Header placeholder -->
<header></header>

<!-- Rest of your content -->

<!-- Footer placeholder -->
<footer></footer>
```

4. Use absolute paths for all assets and links:
   - CSS files: `<link rel="stylesheet" href="/path/to/your/stylesheet.css">`
   - Images: `<img src="/path/to/your/image.jpg">`
   - Internal links: `<a href="/page-path">`

## Updating Existing Pages

To update existing pages to use the consistent navbar and footer:

1. Replace any custom navbar with an empty `<header></header>` tag
2. Replace any custom footer with an empty `<footer></footer>` tag
3. Add the navbar-loader.js in the head section: `<script src="/navbar-loader.js"></script>`
4. Add the footer-loader.js before the closing body tag: `<script src="/footer-loader.js"></script>`
5. Convert all relative paths to absolute paths by adding a leading slash (/)

## Troubleshooting

### Navbar or Footer Not Loading
- Check if the path to the loader scripts is correct (should start with `/`)
- Verify that `navbar.html` and `footer.html` exist in the root directory
- Check browser console for any JavaScript errors

### Styling Issues
- Ensure global CSS files are loaded before page-specific CSS
- Check for any CSS conflicts between global and page-specific styles
- Use browser dev tools to inspect element styles

### Link Issues
- Make sure all internal links use absolute paths (start with `/`)
- Check for any broken links by testing navigation

## Modifying the Navbar or Footer

To make changes to the navigation or footer:

1. Edit only the central `navbar.html` or `footer.html` files in the root directory
2. Changes will automatically propagate to all pages using the loaders
3. Test navigation across multiple pages/sections to ensure consistency 