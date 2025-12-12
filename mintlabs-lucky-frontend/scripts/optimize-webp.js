// WebP Optimization Script (Phase 4.5)
// Re-compresses WebP files that exceed target size

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const THEMES_DIR = 'public/cards/themes';
const TARGET_SIZE_KB = 100;

async function optimizeIfNeeded(filePath) {
  const stats = await stat(filePath);
  const sizeKB = stats.size / 1024;
  
  if (sizeKB <= TARGET_SIZE_KB) {
    console.log(`✓ ${filePath} (${sizeKB.toFixed(1)}KB) - OK`);
    return;
  }
  
  console.log(`⚠️  ${filePath} (${sizeKB.toFixed(1)}KB) - Optimizing...`);
  
  // Progressive quality reduction until we hit target
  let quality = 75;
  let attempts = 0;
  const maxAttempts = 5;
  
  while (quality > 40 && attempts < maxAttempts) {
    const tempPath = filePath + '.tmp';
    
    const info = await sharp(filePath)
      .webp({ quality })
      .toFile(tempPath);
    
    const newSizeKB = info.size / 1024;
    
    if (newSizeKB <= TARGET_SIZE_KB) {
      // Success! Replace original
      await sharp(tempPath).toFile(filePath);
      console.log(`  ✅ Reduced to ${newSizeKB.toFixed(1)}KB at quality ${quality}%`);
      
      // Clean up temp
      try {
        await import('fs/promises').then(fs => fs.unlink(tempPath));
      } catch {}
      
      return;
    }
    
    quality -= 10;
    attempts++;
    
    // Clean up temp
    try {
      await import('fs/promises').then(fs => fs.unlink(tempPath));
    } catch {}
  }
  
  console.log(`  ⚠️  Could not reduce below ${TARGET_SIZE_KB}KB (stopped at quality ${quality + 10}%)`);
}

async function main() {
  console.log('WebP Optimization (Phase 4.5)\n');
  console.log(`Target size: <${TARGET_SIZE_KB}KB\n`);
  
  const themes = await readdir(THEMES_DIR);
  
  for (const theme of themes) {
    if (theme.startsWith('.')) continue;
    
    console.log(`\n=== ${theme} ===`);
    const themePath = join(THEMES_DIR, theme);
    
    for (const file of ['front.webp', 'back.webp']) {
      const filePath = join(themePath, file);
      try {
        await optimizeIfNeeded(filePath);
      } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
      }
    }
  }
  
  console.log('\n✅ Optimization complete');
}

main().catch(console.error);
