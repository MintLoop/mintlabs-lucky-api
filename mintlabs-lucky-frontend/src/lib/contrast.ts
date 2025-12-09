/**
 * Calculate contrast color (black or white) for a given background color
 * Uses relative luminance formula from WCAG 2.0
 * 
 * @param hex - Color in hex format (with or without #)
 * @returns 'black' or 'white' based on which provides better contrast
 */
export function getContrastColor(hex: string): 'black' | 'white' {
  // Remove # if present
  const color = hex.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  // Calculate relative luminance using WCAG formula
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Threshold of 0.6 works well for most colors
  // Higher threshold = more likely to return black
  return luminance > 0.6 ? 'black' : 'white';
}

/**
 * Get text color as CSS color value with opacity
 * Useful for dynamic styling with consistent alpha values
 */
export function getContrastColorWithOpacity(hex: string, opacity: number = 1): string {
  const baseColor = getContrastColor(hex);
  if (opacity === 1) return baseColor;
  
  const rgb = baseColor === 'black' ? '0,0,0' : '255,255,255';
  return `rgba(${rgb},${opacity})`;
}

/**
 * Check if a color is "too dark" for light theme compatibility
 * Returns true if the color would be unreadable on white backgrounds
 */
export function isDarkColor(hex: string): boolean {
  const color = hex.replace('#', '');
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/**
 * Get WCAG contrast ratio between two colors
 * Useful for accessibility validation
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string): number => {
    const color = hex.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;
    
    const toLinear = (val: number) => 
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };
  
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}
