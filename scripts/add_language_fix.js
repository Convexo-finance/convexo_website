#!/usr/bin/env node

/**
 * Script to add the language-fix.js script to all HTML files
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

// Add language-fix.js script to an HTML file
const addLanguageFixToFile = (filePath) => {
  try {
    console.log(`Adding language-fix.js to ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file already includes the script
    if (content.includes('/js/language-fix.js')) {
      console.log(`✅ ${filePath} already includes language-fix.js`);
      return true;
    }
    
    // Check if it includes translations.js
    if (content.includes('/js/translations.js')) {
      // Add language-fix.js after translations.js
      content = content.replace(
        /<script src=".*\/js\/translations\.js"><\/script>/,
        '<script src="/js/translations.js"></script>\n    <script src="/js/language-fix.js"></script>'
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added language-fix.js to ${filePath} after translations.js`);
      return true;
    } else {
      // Add to the end of the head if no translations.js
      if (content.includes('</head>')) {
        content = content.replace(
          /<\/head>/,
          '    <script src="/js/language-fix.js"></script>\n</head>'
        );
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Added language-fix.js to ${filePath} in the head section`);
        return true;
      } else {
        console.error(`❌ Could not find </head> in ${filePath}`);
        return false;
      }
    }
  } catch (error) {
    console.error(`❌ Error adding language-fix.js to ${filePath}:`, error.message);
    return false;
  }
};

// Main function
const main = () => {
  console.log('Finding all HTML files...');
  const htmlFiles = findAllHtmlFiles();
  
  if (htmlFiles.length === 0) {
    console.log('No HTML files found!');
    return;
  }
  
  console.log(`Found ${htmlFiles.length} HTML files`);
  
  console.log('\nAdding language-fix.js to files...');
  let successCount = 0;
  
  for (const file of htmlFiles) {
    if (addLanguageFixToFile(file)) {
      successCount++;
    }
  }
  
  console.log(`\nDone! Added language-fix.js to ${successCount} out of ${htmlFiles.length} files.`);
};

// Run the script
main(); 