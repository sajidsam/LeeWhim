const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\Sajidul Islam\\.gemini\\antigravity-ide\\brain\\d902677b-e5fc-4a8f-89c8-cee65c79b1fc\\.system_generated\\steps\\922\\content.md', 'utf8');

// Find all matches of product cards or JSON
const productUrlRegex = /href="(\/collections\/women\/products\/[^"]+|\/products\/[^"]+)"/g;
const urls = new Set();
let match;
while ((match = productUrlRegex.exec(content)) !== null) {
  urls.add(match[1]);
}

console.log('Total product URLs found:', urls.size);
for (const u of urls) {
  console.log('-', u);
}
