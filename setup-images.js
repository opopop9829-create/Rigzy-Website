const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'all video frames');
const destDirs = [
  path.join(__dirname, 'public', 'images', 'commercial'),
  path.join(__dirname, 'public', 'images', 'brand-film'),
  path.join(__dirname, 'public', 'images', 'reels')
];

console.log('Checking source directory:', srcDir);

if (!fs.existsSync(srcDir)) {
  console.error(`Error: Source directory "all video frames" not found at ${srcDir}`);
  process.exit(1);
}

// Ensure destination directories exist
destDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Copy and rename files
let copiedCount = 0;
for (let i = 1; i <= 120; i++) {
  const srcFileName = `ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
  const srcFilePath = path.join(srcDir, srcFileName);
  
  if (fs.existsSync(srcFilePath)) {
    destDirs.forEach(destDir => {
      const destFilePath = path.join(destDir, `${i}.webp`);
      fs.copyFileSync(srcFilePath, destFilePath);
    });
    copiedCount++;
  }
}

console.log(`Image sequence setup complete. Copied ${copiedCount} frames into 3 directories.`);
