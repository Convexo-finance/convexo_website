#!/usr/bin/env node

/**
 * Script to add the translations.js script to all HTML files that are missing it
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all HTML files
const findAllHtmlFiles = () => {
  try {
    const result = execSync('find . -name "*.html" | grep -v "node_modules"').toString();
    return result.trim().split('\n');
  } catch (error) {
    console.error('Error finding HTML files:', error.message);
    return [];
  }
};

// Find HTML files that include translations.js
const findHtmlFilesWithTranslations = () => {
  try {
    const result = execSync('grep -l "/js/translations.js" $(find . -name "*.html" | grep -v "node_modules")').toString();
    return result.trim().split('\n');
  } catch (error) {
    console.error('Error finding HTML files with translations:', error.message);
    return [];
  }
};

// Find HTML files that don't include translations.js
const findHtmlFilesWithoutTranslations = () => {
  const allHtmlFiles = findAllHtmlFiles();
  const htmlFilesWithTranslations = findHtmlFilesWithTranslations();
  
  return allHtmlFiles.filter(file => !htmlFilesWithTranslations.includes(file));
};

// Add translations.js script to an HTML file
const addTranslationsToFile = (filePath) => {
  try {
    console.log(`Adding translations.js to ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file has a footer-loader.js or script.js script
    const hasFooterLoader = content.includes('footer-loader.js');
    const hasScript = content.includes('script.js');
    
    if (hasFooterLoader) {
      // Insert translations.js before footer-loader.js
      content = content.replace(
        /<script src=".*footer-loader\.js"><\/script>/,
        '<script src="/js/translations.js"></script>\n    <script src="/footer-loader.js"></script>'
      );
    } else if (hasScript) {
      // Insert translations.js before script.js
      content = content.replace(
        /<script src=".*script\.js"><\/script>/,
        '<script src="/js/translations.js"></script>\n    <script src="/script.js"></script>'
      );
    } else {
      // Insert translations.js before </body>
      content = content.replace(
        /<\/body>/,
        '    <script src="/js/translations.js"></script>\n</body>'
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added translations.js to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error adding translations.js to ${filePath}:`, error.message);
    return false;
  }
};

// Main function
const main = () => {
  console.log('Finding HTML files without translations.js...');
  const htmlFilesWithoutTranslations = findHtmlFilesWithoutTranslations();
  
  if (htmlFilesWithoutTranslations.length === 0) {
    console.log('All HTML files already include translations.js!');
    return;
  }
  
  console.log(`Found ${htmlFilesWithoutTranslations.length} HTML files without translations.js:`);
  htmlFilesWithoutTranslations.forEach(file => console.log(`- ${file}`));
  
  console.log('\nAdding translations.js to files...');
  let successCount = 0;
  
  for (const file of htmlFilesWithoutTranslations) {
    if (addTranslationsToFile(file)) {
      successCount++;
    }
  }
  
  console.log(`\nDone! Added translations.js to ${successCount} out of ${htmlFilesWithoutTranslations.length} files.`);
};

// Run the script
main(); 