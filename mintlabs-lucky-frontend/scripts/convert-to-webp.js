// WebP Conversion Script for Card Themes (Phase 4.5)
// Converts JPEG card theme images to WebP with quality optimization

import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const THEMES_DIR = 'public/cards/themes';
const QUALITY = 85; // Target quality (0-100)
const TARGET_SIZE_KB = 100; // Target max size in KB

async function convertToWebP(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const sizeKB = (info.size / 1024).toFixed(1);
    console.log(`✓ ${outputPath} (${sizeKB}KB)`);
    
    if (info.size / 1024 > TARGET_SIZE_KB) {
      console.warn(`  ⚠️  Exceeds ${TARGET_SIZE_KB}KB target`);
    }
    
    return info;
  } catch (error) {
    console.error(`✗ Failed: ${inputPath}`, error.message);
    throw error;
  }
}

async function processTheme(themeName) {
  console.log(`\n=== ${themeName} ===`);
  const themePath = join(THEMES_DIR, themeName);
  
  const files = ['front.jpeg', 'back.jpeg'];
  
  for (const file of files) {
    const inputPath = join(themePath, file);
    const outputPath = inputPath.replace('.jpeg', '.webp');
    
    try {
      await convertToWebP(inputPath, outputPath);
    } catch (error) {
      // Continue with other files even if one fails
    }
  }
}

async function main() {
  console.log('WebP Conversion (Phase 4.5)\n');
  console.log(`Quality: ${QUALITY}%, Target size: <${TARGET_SIZE_KB}KB`);
  
  const themes = await readdir(THEMES_DIR);
  
  for (const theme of themes) {
    // Skip if not a directory or starts with .
    if (theme.startsWith('.')) continue;
    
    await processTheme(theme);
  }
  
  console.log('\n✅ Conversion complete');
}

main().catch(console.error);
