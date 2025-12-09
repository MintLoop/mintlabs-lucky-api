/**
 * Educational flavor text for themed RNG modes.
 * Displayed when user selects a themed mode to provide cultural context.
 * 
 * IMPORTANT: All themes are cosmetic only and do not affect probability.
 */

export const MODE_EDUCATION: Record<string, Record<string, string>> = {
  zodiac: {
    aries: "Aries (Mar 21-Apr 19): Fire sign ruled by Mars. Associated with courage, initiative, and boldness.",
    taurus: "Taurus (Apr 20-May 20): Earth sign ruled by Venus. Associated with stability, patience, and determination.",
    gemini: "Gemini (May 21-Jun 20): Air sign ruled by Mercury. Associated with communication, adaptability, and curiosity.",
    cancer: "Cancer (Jun 21-Jul 22): Water sign ruled by the Moon. Associated with emotion, intuition, and nurturing.",
    leo: "Leo (Jul 23-Aug 22): Fire sign ruled by the Sun. Associated with confidence, creativity, and leadership.",
    virgo: "Virgo (Aug 23-Sep 22): Earth sign ruled by Mercury. Associated with analysis, precision, and service.",
    libra: "Libra (Sep 23-Oct 22): Air sign ruled by Venus. Associated with balance, harmony, and diplomacy.",
    scorpio: "Scorpio (Oct 23-Nov 21): Water sign ruled by Pluto. Associated with intensity, transformation, and mystery.",
    sagittarius: "Sagittarius (Nov 22-Dec 21): Fire sign ruled by Jupiter. Associated with adventure, philosophy, and optimism.",
    capricorn: "Capricorn (Dec 22-Jan 19): Earth sign ruled by Saturn. Associated with discipline, ambition, and structure.",
    aquarius: "Aquarius (Jan 20-Feb 18): Air sign ruled by Uranus. Associated with innovation, independence, and humanitarianism.",
    pisces: "Pisces (Feb 19-Mar 20): Water sign ruled by Neptune. Associated with compassion, imagination, and spirituality."
  },
  
  chinese_zodiac: {
    rat: "Rat (鼠): First of the zodiac cycle. Associated with intelligence, adaptability, and resourcefulness.",
    ox: "Ox (牛): Second sign. Associated with diligence, dependability, and strength.",
    tiger: "Tiger (虎): Third sign. Associated with bravery, competitiveness, and confidence.",
    rabbit: "Rabbit (兔): Fourth sign. Associated with gentleness, elegance, and kindness.",
    dragon: "Dragon (龍): Fifth sign. Associated with power, wisdom, and good fortune.",
    snake: "Snake (蛇): Sixth sign. Associated with wisdom, mystery, and intuition.",
    horse: "Horse (馬): Seventh sign. Associated with energy, independence, and enthusiasm.",
    goat: "Goat (羊): Eighth sign. Associated with creativity, peace, and perseverance.",
    monkey: "Monkey (猴): Ninth sign. Associated with cleverness, curiosity, and playfulness.",
    rooster: "Rooster (雞): Tenth sign. Associated with confidence, punctuality, and honesty.",
    dog: "Dog (狗): Eleventh sign. Associated with loyalty, honesty, and justice.",
    pig: "Pig (豬): Twelfth sign. Associated with generosity, compassion, and diligence."
  },
  
  favorite_color: {
    blue: "Blue: Associated with calmness, trust, stability, and depth. Psychologically linked to serenity and wisdom.",
    green: "Green: Associated with nature, growth, harmony, and renewal. Psychologically linked to balance and healing.",
    red: "Red: Associated with passion, energy, power, and vitality. Psychologically linked to excitement and boldness.",
    purple: "Purple: Associated with royalty, mystery, spirituality, and luxury. Psychologically linked to creativity and wisdom.",
    black: "Black: Associated with sophistication, power, elegance, and mystery. Psychologically linked to strength and formality.",
    yellow: "Yellow: Associated with optimism, joy, intellect, and energy. Psychologically linked to happiness and clarity."
  },
  
  gemstone: {
    ruby: "Ruby: July birthstone. Associated with passion, vitality, and the sun. Traditionally believed to bring courage and energy.",
    sapphire: "Sapphire: September birthstone. Associated with wisdom, royalty, and divine favor. Symbolizes truth and sincerity.",
    emerald: "Emerald: May birthstone. Associated with fertility, rebirth, and love. Known as the stone of successful relationships.",
    opal: "Opal: October birthstone. Associated with creativity, inspiration, and imagination. Displays unique play-of-color.",
    topaz: "Topaz: November birthstone. Associated with strength, wisdom, and courage. Believed to bring calmness and healing.",
    amethyst: "Amethyst: February birthstone. Associated with peace, stability, and inner strength. Traditionally used for protection."
  },
  
  jyotish: {
    ashwini: "Ashwini (अश्विनी): First nakshatra. Ruled by Ketu. Associated with healing, speed, and new beginnings.",
    bharani: "Bharani (भरणी): Second nakshatra. Ruled by Venus. Associated with transformation, restraint, and creativity.",
    krittika: "Krittika (कृत्तिका): Third nakshatra. Ruled by Sun. Associated with purification, determination, and sharpness.",
    rohini: "Rohini (रोहिणी): Fourth nakshatra. Ruled by Moon. Associated with growth, beauty, and material abundance.",
    mrigashira: "Mrigashira (मृगशीर्ष): Fifth nakshatra. Ruled by Mars. Associated with curiosity, seeking, and exploration.",
    pushya: "Pushya (पुष्य): Eighth nakshatra. Ruled by Saturn. Associated with nourishment, spirituality, and prosperity."
  },
  
  birthstone: {
    january: "Garnet (January): Deep red stone associated with passion, energy, and regeneration. Symbolizes friendship and trust.",
    february: "Amethyst (February): Purple stone associated with peace, clarity, and protection. Traditionally worn for sobriety.",
    march: "Aquamarine (March): Blue-green stone associated with courage, calm, and clarity. Named for sea water ('aqua marina').",
    april: "Diamond (April): Clear stone associated with strength, purity, and eternal love. Hardest natural substance on Earth.",
    may: "Emerald (May): Green stone associated with fertility, rebirth, and wisdom. Prized by Cleopatra and ancient civilizations.",
    june: "Pearl (June): Organic gem associated with purity, innocence, and wisdom. Formed naturally in oysters and mussels.",
    july: "Ruby (July): Red stone associated with passion, vitality, and protection. Called 'ratnaraj' (king of gems) in Sanskrit.",
    august: "Peridot (August): Lime-green stone associated with strength, healing, and prosperity. Formed deep in Earth's mantle.",
    september: "Sapphire (September): Blue stone associated with wisdom, loyalty, and nobility. Worn by royalty throughout history.",
    october: "Opal (October): Multi-colored stone associated with creativity, imagination, and spontaneity. Displays unique color play.",
    november: "Topaz (November): Golden stone associated with strength, wisdom, and abundance. Name may derive from Sanskrit 'tapas' (fire).",
    december: "Turquoise (December): Blue-green stone associated with protection, healing, and good fortune. Sacred to many Native American tribes."
  },
  
  rashi: {
    mesha: "Mesha (मेष - Aries): First rashi. Ruled by Mars (Mangal). Associated with courage, leadership, and initiative.",
    vrishabha: "Vrishabha (वृषभ - Taurus): Second rashi. Ruled by Venus (Shukra). Associated with stability, beauty, and prosperity.",
    mithuna: "Mithuna (मिथुन - Gemini): Third rashi. Ruled by Mercury (Budha). Associated with communication, intellect, and duality.",
    karka: "Karka (कर्क - Cancer): Fourth rashi. Ruled by Moon (Chandra). Associated with emotion, nurturing, and intuition.",
    simha: "Simha (सिंह - Leo): Fifth rashi. Ruled by Sun (Surya). Associated with power, dignity, and authority.",
    kanya: "Kanya (कन्या - Virgo): Sixth rashi. Ruled by Mercury (Budha). Associated with purity, service, and discrimination.",
    tula: "Tula (तुला - Libra): Seventh rashi. Ruled by Venus (Shukra). Associated with balance, justice, and partnership.",
    vrishchika: "Vrishchika (वृश्चिक - Scorpio): Eighth rashi. Ruled by Mars (Mangal). Associated with transformation, intensity, and mystery.",
    dhanu: "Dhanu (धनु - Sagittarius): Ninth rashi. Ruled by Jupiter (Guru). Associated with wisdom, philosophy, and expansion.",
    makara: "Makara (मकर - Capricorn): Tenth rashi. Ruled by Saturn (Shani). Associated with discipline, ambition, and karma.",
    kumbha: "Kumbha (कुम्भ - Aquarius): Eleventh rashi. Ruled by Saturn (Shani). Associated with service, innovation, and humanitarianism.",
    meena: "Meena (मीन - Pisces): Twelfth rashi. Ruled by Jupiter (Guru). Associated with spirituality, compassion, and transcendence."
  }
};

export default MODE_EDUCATION;
