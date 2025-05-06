#!/usr/bin/env node

/**
 * Script to update all HTML files to use the simplified language toggle
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Find all HTML files
const findAllHtmlFiles = () => {
  try {
    const result = execSync('find . -name "*.html" | grep -v "node_modules"').toString();
    return result.trim().split('\n').filter(file => file);
  } catch (error) {
    console.error('Error finding HTML files:', error);
    return [];
  }
};

// Update an HTML file
const updateFile = (filePath) => {
  try {
    console.log(`Updating ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Remove all old language scripts
    const oldScripts = [
      /<script src=".*language-fix\.js"><\/script>/g,
      /<script src=".*language-debug\.js"><\/script>/g,
      /<!-- Scripts for language switching -->\s*/g
    ];
    
    oldScripts.forEach(pattern => {
      if (pattern.test(content)) {
        content = content.replace(pattern, '');
        updated = true;
      }
    });
    
    // Add our simplified language toggle script after translations.js if it exists
    if (content.includes('/js/translations.js') && !content.includes('/js/language-toggle.js')) {
      content = content.replace(
        /<script src=".*\/js\/translations\.js"><\/script>/,
        '<script src="/js/translations.js"></script>\n    <script src="/js/language-toggle.js"></script>'
      );
      updated = true;
    }
    // Otherwise add it before </body> if it's not already there
    else if (!content.includes('/js/language-toggle.js') && content.includes('</body>')) {
      content = content.replace(
        /<\/body>/,
        '    <script src="/js/language-toggle.js"></script>\n</body>'
      );
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Successfully updated ${filePath}`);
      return true;
    } else {
      console.log(`⏩ No updates needed for ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
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
  
  console.log(`Found ${htmlFiles.length} HTML files.`);
  console.log('\nUpdating files with simplified language toggle...');
  
  let successCount = 0;
  
  for (const file of htmlFiles) {
    if (updateFile(file)) {
      successCount++;
    }
  }
  
  console.log(`\nDone! Updated ${successCount} out of ${htmlFiles.length} files.`);
  console.log('\nRemember to delete the old language scripts if they are no longer needed:');
  console.log('- js/language-fix.js');
  console.log('- js/language-debug.js');
};

// Run the script
main(); 