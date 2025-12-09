/**
 * Educational flavor text for themed RNG modes.
 * Displayed when user selects a themed mode to provide cultural context.
 * 
 * ⚠️ CRITICAL DISCLAIMER ⚠️
 * All themes are COSMETIC ONLY and provide NO predictive value whatsoever.
 * Themes do NOT change probability, do NOT affect outcomes, and do NOT
 * guarantee any results. All lottery draws are random and independent.
 * This is for entertainment and cultural education purposes only.
 * 
 * We make NO CLAIMS about luck, fortune, or winning chances.
 */

export const MODE_EDUCATION: Record<string, Record<string, string>> = {
  zodiac: {
    aries: "♈ Aries (Mar 21-Apr 19): Fire sign ruled by Mars. Traditionally associated with courage, initiative, and boldness in Western astrology. This theme is for fun only and does NOT predict winning numbers.",
    taurus: "♉ Taurus (Apr 20-May 20): Earth sign ruled by Venus. Traditionally associated with stability, patience, and determination. Theme selection does NOT affect lottery outcomes.",
    gemini: "♊ Gemini (May 21-Jun 20): Air sign ruled by Mercury. Traditionally associated with communication, adaptability, and curiosity. This is purely cosmetic and provides NO advantage.",
    cancer: "♋ Cancer (Jun 21-Jul 22): Water sign ruled by the Moon. Traditionally associated with emotion, intuition, and nurturing. Theme is for entertainment only, NOT prediction.",
    leo: "♌ Leo (Jul 23-Aug 22): Fire sign ruled by the Sun. Traditionally associated with confidence, creativity, and leadership. This does NOT influence random number generation.",
    virgo: "♍ Virgo (Aug 23-Sep 22): Earth sign ruled by Mercury. Traditionally associated with analysis, precision, and service. Theme selection has NO predictive value.",
    libra: "♎ Libra (Sep 23-Oct 22): Air sign ruled by Venus. Traditionally associated with balance, harmony, and diplomacy. This is cultural context only, NOT fortune-telling.",
    scorpio: "♏ Scorpio (Oct 23-Nov 21): Water sign ruled by Pluto. Traditionally associated with intensity, transformation, and mystery. Theme does NOT affect probability.",
    sagittarius: "♐ Sagittarius (Nov 22-Dec 21): Fire sign ruled by Jupiter. Traditionally associated with adventure, philosophy, and optimism. This provides NO guarantee of results.",
    capricorn: "♑ Capricorn (Dec 22-Jan 19): Earth sign ruled by Saturn. Traditionally associated with discipline, ambition, and structure. Theme is decorative only, NOT predictive.",
    aquarius: "♒ Aquarius (Jan 20-Feb 18): Air sign ruled by Uranus. Traditionally associated with innovation, independence, and humanitarianism. This does NOT improve odds.",
    pisces: "♓ Pisces (Feb 19-Mar 20): Water sign ruled by Neptune. Traditionally associated with compassion, imagination, and spirituality. Theme is for fun, NOT fortune."
  },
  
  star_sign: {
    sun: "☀️ Sun (Leo): Central star of our solar system. Astrologically rules Leo and represents ego, vitality, and self-expression. Nuclear fusion powers all life on Earth. This theme does NOT predict lottery outcomes.",
    moon: "🌙 Moon (Cancer): Earth's natural satellite governing tides. Astrologically rules Cancer and represents emotions, cycles, and intuition. Phases affect ocean tides. Theme does NOT affect probability.",
    mercury: "☿️ Mercury (Gemini/Virgo): Closest planet to Sun, fastest orbit (88 days). Astrologically rules Gemini and Virgo, represents communication and intellect. Retrograde 3-4 times yearly. This provides NO luck.",
    venus: "♀️ Venus (Taurus/Libra): Second planet, Earth's 'twin' in size. Astrologically rules Taurus and Libra, represents love and beauty. Brightest object after Sun/Moon. Theme is decorative only.",
    mars: "♂️ Mars (Aries/Scorpio): Red planet, fourth from Sun. Astrologically rules Aries and Scorpio, represents action and energy. Iron oxide gives red color. NOT fortune-telling.",
    jupiter: "♃ Jupiter (Sagittarius/Pisces): Largest planet, gas giant. Astrologically rules Sagittarius and Pisces, represents expansion and wisdom. Has 95+ moons. Theme does NOT predict outcomes.",
    saturn: "♄ Saturn (Capricorn/Aquarius): Ringed gas giant with spectacular ice rings. Astrologically rules Capricorn and Aquarius, represents structure and discipline. Second-largest planet. NO winning advantage.",
    uranus: "♅ Uranus (Aquarius): Ice giant tilted on its side. Astrologically rules Aquarius, represents innovation and rebellion. Rotates nearly perpendicular to orbit. NOT prediction.",
    neptune: "♆ Neptune (Pisces): Farthest ice giant, deep blue color. Astrologically rules Pisces, represents dreams and spirituality. Discovered via mathematics 1846. Decorative only.",
    pluto: "♇ Pluto (Scorpio): Dwarf planet in Kuiper Belt. Astrologically rules Scorpio, represents transformation and rebirth. Reclassified from planet 2006. Theme does NOT improve odds.",
    north_node: "☊ North Node (Rahu): Lunar node where Moon crosses ecliptic northward. Not a physical body but a mathematical point. Represents karmic future in astrology. NO predictive value.",
    south_node: "☋ South Node (Ketu): Lunar node where Moon crosses ecliptic southward. Mathematical point opposite North Node. Represents karmic past in Vedic astrology. Entertainment only."
  },
  
  chinese_zodiac: {
    rat: "🐀 Rat (鼠): First of the zodiac cycle in Chinese astrology. Traditionally associated with intelligence, adaptability, and resourcefulness. This theme does NOT predict lottery outcomes.",
    ox: "🐂 Ox (牛): Second sign in Chinese zodiac. Traditionally associated with diligence, dependability, and strength. Theme selection provides NO advantage in winning.",
    tiger: "🐅 Tiger (虎): Third sign. Traditionally associated with bravery, competitiveness, and confidence. This is for cultural interest only, NOT fortune-telling.",
    rabbit: "🐇 Rabbit (兔): Fourth sign. Traditionally associated with gentleness, elegance, and kindness. Theme does NOT affect random number generation.",
    dragon: "🐉 Dragon (龍): Fifth sign. Traditionally associated with power, wisdom, and good fortune in folklore. This provides NO actual luck or winning advantage.",
    snake: "🐍 Snake (蛇): Sixth sign. Traditionally associated with wisdom, mystery, and intuition. Theme is decorative only and does NOT improve odds.",
    horse: "🐎 Horse (馬): Seventh sign. Traditionally associated with energy, independence, and enthusiasm. This does NOT guarantee any results.",
    goat: "🐐 Goat (羊): Eighth sign. Traditionally associated with creativity, peace, and perseverance. Theme selection has NO predictive value.",
    monkey: "🐒 Monkey (猴): Ninth sign. Traditionally associated with cleverness, curiosity, and playfulness. This is entertainment only, NOT prediction.",
    rooster: "🐓 Rooster (雞): Tenth sign. Traditionally associated with confidence, punctuality, and honesty. Theme does NOT influence lottery probability.",
    dog: "🐕 Dog (狗): Eleventh sign. Traditionally associated with loyalty, honesty, and justice. This provides NO guarantee of winning.",
    pig: "🐖 Pig (豬): Twelfth sign. Traditionally associated with generosity, compassion, and diligence. Theme is for fun only, NOT fortune."
  },
  
  favorite_color: {
    // Primary Colors
    red: "🔴 Red: Primary color culturally associated with passion, energy, power, and vitality. Psychologically linked to excitement and boldness. This theme does NOT predict winning numbers or improve odds.",
    yellow: "🟡 Yellow: Primary color culturally associated with optimism, joy, intellect, and energy. Psychologically linked to happiness and clarity. Theme selection provides NO advantage in lottery outcomes.",
    blue: "🔵 Blue: Primary color culturally associated with calmness, trust, stability, and depth. Psychologically linked to serenity and wisdom. This is decorative only and does NOT affect probability.",
    // Secondary Colors
    orange: "🟠 Orange: Secondary color (red + yellow) associated with enthusiasm, creativity, and warmth. Psychologically linked to adventure and confidence. Theme does NOT guarantee any results.",
    green: "🟢 Green: Secondary color (blue + yellow) associated with nature, growth, harmony, and renewal. Psychologically linked to balance and healing. This provides NO predictive value whatsoever.",
    purple: "🟣 Purple: Secondary color (red + blue) associated with royalty, mystery, spirituality, and luxury. Psychologically linked to creativity and wisdom. Theme is for entertainment only, NOT fortune-telling.",
    // Tertiary Colors
    vermilion: "🔶 Vermilion (Red-Orange): Tertiary color associated with energy, determination, and dynamism in color theory. Vibrant pigment historically used in art. This does NOT predict lottery outcomes or provide any luck.",
    amber: "🟨 Amber (Yellow-Orange): Tertiary color associated with warmth, caution, and autumn in color psychology. Named after fossilized tree resin. Theme selection does NOT affect probability or guarantee winning.",
    chartreuse: "💚 Chartreuse (Yellow-Green): Tertiary color associated with vitality, freshness, and spring growth. Named after French liqueur. This provides NO advantage in lottery outcomes whatsoever.",
    teal: "🫵 Teal (Blue-Green): Tertiary color associated with sophistication, tranquility, and ocean depths. Combines calmness with renewal. Theme is for cultural interest only, NOT fortune-telling.",
    violet: "💜 Violet (Blue-Purple): Tertiary color associated with imagination, mysticism, and transformation. Highest visible wavelength in spectrum. This does NOT improve odds or predict winning numbers.",
    magenta: "🩷 Magenta (Red-Purple): Tertiary color associated with passion, innovation, and unconventionality. Not in rainbow spectrum (brain combination). Theme does NOT affect random number generation or outcomes.",
    // Neutrals
    white: "⚪ White: Achromatic color symbolizing purity, simplicity, and new beginnings across cultures. Reflects all wavelengths of visible light. This provides NO predictive value or winning advantage.",
    black: "⚫ Black: Achromatic color associated with sophistication, power, elegance, and mystery. Absorbs all wavelengths. Theme is decorative only and does NOT guarantee results.",
    gray: "⚫ Gray: Neutral color (white + black) associated with balance, neutrality, and professionalism. Timeless and versatile. Theme is for entertainment only, NOT prediction."
  },
  
  gemstone: {
    // Traditional Birthstones (12 months)
    garnet: "💎 Garnet (January): Deep red gemstone traditionally associated with passion, energy, and regeneration. Named from Latin 'granatum' (pomegranate). This theme does NOT predict lottery outcomes or provide any luck.",
    amethyst: "🟪 Amethyst (February): Purple quartz traditionally associated with peace, clarity, and sobriety in folklore. Name from Greek 'amethystos' (not intoxicated). Theme selection does NOT affect probability or guarantee winning.",
    aquamarine: "💠 Aquamarine (March): Blue-green beryl associated with courage, calm, and seafarers' protection. Latin 'aqua marina' (sea water). This provides NO advantage in lottery outcomes whatsoever.",
    diamond: "💎 Diamond (April): Clear carbon crystal, hardest natural substance. Traditionally associated with strength, purity, and eternal love. Theme is decorative only and does NOT guarantee results.",
    emerald: "💚 Emerald (May): Green beryl traditionally associated with fertility, rebirth, and Venus in folklore. Prized by Cleopatra. This does NOT improve probability or predict outcomes.",
    pearl: "🦪 Pearl (June): Organic gem formed in mollusks, associated with purity, innocence, and lunar energy. Only gem created by living creatures. Theme is for entertainment only, NOT fortune-telling.",
    ruby: "❤️ Ruby (July): Red corundum traditionally associated with passion, vitality, and the sun. Called 'ratnaraj' (king of gems) in Sanskrit. This provides NO actual luck or winning advantage.",
    peridot: "💚 Peridot (August): Olive-green olivine associated with strength, healing, and volcanic origins. Forms deep in Earth's mantle. Theme does NOT affect random number generation.",
    sapphire: "🔷 Sapphire (September): Blue corundum (ruby's cousin) associated with wisdom, royalty, and divine favor. Worn by monarchs historically. This does NOT predict or guarantee lottery results.",
    opal: "🌈 Opal (October): Hydrated silica displaying unique 'play-of-color' phenomenon. Associated with creativity and imagination. Theme is for cultural interest only, NOT prediction.",
    topaz: "🟦 Topaz (November): Golden-to-blue aluminum silicate associated with strength and wisdom. Name possibly from Sanskrit 'tapas' (fire). This provides NO predictive value whatsoever.",
    turquoise: "🩵 Turquoise (December): Blue-green copper mineral sacred to many indigenous cultures. Associated with protection and healing in folklore. Theme is cosmetic only, NOT fortune-telling.",
    // Popular Variations & Alternative Stones
    alexandrite: "🔮 Alexandrite (June alt.): Rare color-changing chrysoberyl (green in daylight, red in incandescent light). Discovered in Russia 1830s. This does NOT predict winning numbers or provide luck.",
    moonstone: "🌙 Moonstone (June alt.): Feldspar with adularescence (milky glow). Associated with lunar cycles and intuition in folklore. Theme selection does NOT affect outcomes or improve odds.",
    citrine: "🟡 Citrine (November alt.): Yellow-to-orange quartz associated with abundance and sunshine. Name from French 'citron' (lemon). This provides NO advantage in winning the lottery.",
    tanzanite: "💜 Tanzanite (December alt.): Blue-violet zoisite found only in Tanzania. Discovered 1967, popularized by Tiffany & Co. Theme does NOT guarantee any results or predict probability.",
    jade: "💚 Jade: Green jadeite or nephrite revered in Asian cultures for millennia. Associated with harmony, balance, and protection. This is decorative only and does NOT improve odds.",
    onyx: "⚫ Onyx: Black chalcedony with white bands, associated with strength and grounding. Used in cameos and intaglios historically. Theme is for entertainment only, NOT fortune-telling."
  },
  
  jyotish: {
    ashwini: "🌟 Ashwini (अश्विनी): 1st nakshatra (0°-13°20' Aries). Ruled by Ketu. Associated with healing, speed, and new beginnings. Deity: Ashwini Kumaras (divine physicians). This does NOT predict lottery outcomes.",
    bharani: "🌙 Bharani (भरणी): 2nd nakshatra (13°20'-26°40' Aries). Ruled by Venus (Shukra). Associated with transformation and creativity. Deity: Yama (god of death). Theme does NOT affect probability.",
    krittika: "🔥 Krittika (कृत्तिका): 3rd nakshatra (26°40' Aries-10° Taurus). Ruled by Sun (Surya). Associated with purification and determination. Deity: Agni (fire god). This provides NO luck.",
    rohini: "🌾 Rohini (रोहिणी): 4th nakshatra (10°-23°20' Taurus). Ruled by Moon (Chandra). Associated with growth and beauty. Deity: Brahma (creator). Theme is decorative only.",
    mrigashira: "🦌 Mrigashira (मृगशीर्ष): 5th nakshatra (23°20' Taurus-6°40' Gemini). Ruled by Mars (Mangal). Associated with seeking and curiosity. Deity: Soma (moon god). NOT fortune-telling.",
    ardra: "💧 Ardra (आर्द्रा): 6th nakshatra (6°40'-20° Gemini). Ruled by Rahu. Associated with storms, transformation, and tears. Deity: Rudra (storm god). Theme does NOT predict outcomes.",
    punarvasu: "🏹 Punarvasu (पुनर्वसु): 7th nakshatra (20° Gemini-3°20' Cancer). Ruled by Jupiter (Guru). Associated with renewal and return. Deity: Aditi (mother of gods). NO winning advantage.",
    pushya: "🔆 Pushya (पुष्य): 8th nakshatra (3°20'-16°40' Cancer). Ruled by Saturn (Shani). Most auspicious nakshatra. Associated with nourishment. Deity: Brihaspati (Jupiter). NOT prediction.",
    ashlesha: "🐍 Ashlesha (आश्लेषा): 9th nakshatra (16°40'-30° Cancer). Ruled by Mercury (Budha). Associated with serpent energy and mysticism. Deity: Nagas (serpent deities). Decorative only.",
    magha: "👑 Magha (मघा): 10th nakshatra (0°-13°20' Leo). Ruled by Ketu. Associated with ancestors, throne, and authority. Deity: Pitris (ancestors). Theme does NOT improve odds.",
    purva_phalguni: "🛏️ Purva Phalguni (पूर्व फाल्गुनी): 11th nakshatra (13°20'-26°40' Leo). Ruled by Venus (Shukra). Associated with relaxation and pleasure. Deity: Bhaga (prosperity). NO predictive value.",
    uttara_phalguni: "🤝 Uttara Phalguni (उत्तर फाल्गुनी): 12th nakshatra (26°40' Leo-10° Virgo). Ruled by Sun (Surya). Associated with friendship and contracts. Deity: Aryaman (partnership). Entertainment only.",
    hasta: "✋ Hasta (हस्त): 13th nakshatra (10°-23°20' Virgo). Ruled by Moon (Chandra). Associated with hands, skill, and manifestation. Deity: Savitar (sun deity). NOT fortune-telling.",
    chitra: "✨ Chitra (चित्रा): 14th nakshatra (23°20' Virgo-6°40' Libra). Ruled by Mars (Mangal). Associated with beauty, artistry, and jewels. Deity: Tvashtar (celestial architect). NO luck.",
    swati: "🌬️ Swati (स्वाति): 15th nakshatra (6°40'-20° Libra). Ruled by Rahu. Associated with independence, movement, and wind. Deity: Vayu (wind god). Does NOT affect outcomes.",
    vishakha: "⚖️ Vishakha (विशाखा): 16th nakshatra (20° Libra-3°20' Scorpio). Ruled by Jupiter (Guru). Associated with determination and dual goals. Deity: Indra-Agni. Theme is decorative.",
    anuradha: "🌺 Anuradha (अनुराधा): 17th nakshatra (3°20'-16°40' Scorpio). Ruled by Saturn (Shani). Associated with friendship, devotion, and success. Deity: Mitra (friendship). NO guarantee.",
    jyeshtha: "☂️ Jyeshtha (ज्येष्ठा): 18th nakshatra (16°40'-30° Scorpio). Ruled by Mercury (Budha). Associated with seniority, protection, and courage. Deity: Indra (king of gods). NOT prediction.",
    mula: "🌱 Mula (मूल): 19th nakshatra (0°-13°20' Sagittarius). Ruled by Ketu. Associated with roots, foundation, and destruction. Deity: Nirriti (goddess of dissolution). Entertainment only.",
    purva_ashadha: "🌊 Purva Ashadha (पूर्वाषाढ़ा): 20th nakshatra (13°20'-26°40' Sagittarius). Ruled by Venus (Shukra). Associated with invincibility and water. Deity: Apas (water). NO winning advantage.",
    uttara_ashadha: "🏔️ Uttara Ashadha (उत्तराषाढ़ा): 21st nakshatra (26°40' Sagittarius-10° Capricorn). Ruled by Sun (Surya). Associated with victory and righteousness. Deity: Vishvadevas. Decorative only.",
    shravana: "👂 Shravana (श्रवण): 22nd nakshatra (10°-23°20' Capricorn). Ruled by Moon (Chandra). Associated with listening, learning, and knowledge. Deity: Vishnu (preserver). NOT fortune-telling.",
    dhanishta: "🥁 Dhanishta (धनिष्ठा): 23rd nakshatra (23°20' Capricorn-6°40' Aquarius). Ruled by Mars (Mangal). Associated with wealth, music, and rhythm. Deity: Eight Vasus. NO luck.",
    shatabhisha: "💫 Shatabhisha (शतभिषा): 24th nakshatra (6°40'-20° Aquarius). Ruled by Rahu. Associated with healing, secrets, and hundred physicians. Deity: Varuna (cosmic waters). Does NOT predict.",
    purva_bhadrapada: "⚡ Purva Bhadrapada (पूर्वभाद्रपदा): 25th nakshatra (20° Aquarius-3°20' Pisces). Ruled by Jupiter (Guru). Associated with fire, transformation, and intensity. Deity: Aja Ekapada. NO guarantee.",
    uttara_bhadrapada: "🐉 Uttara Bhadrapada (उत्तरभाद्रपदा): 26th nakshatra (3°20'-16°40' Pisces). Ruled by Saturn (Shani). Associated with depth, wisdom, and serpent. Deity: Ahir Budhnya. Entertainment only.",
    revati: "🐟 Revati (रेवती): 27th nakshatra (16°40'-30° Pisces). Ruled by Mercury (Budha). Associated with journey's end, nourishment, and completion. Deity: Pushan (nourisher). NOT prediction."
  },
  
  birthstone: {
    january: "💎 Garnet (January): Deep red birthstone traditionally associated with passion, energy, and regeneration in gemology. Symbolizes friendship and trust culturally. This theme does NOT predict winning numbers or provide any luck.",
    february: "💜 Amethyst (February): Purple birthstone traditionally associated with peace, clarity, and protection. Historically worn for sobriety in folklore. Theme selection does NOT affect lottery outcomes or improve odds.",
    march: "💠 Aquamarine (March): Blue-green birthstone associated with courage, calm, and clarity. Named for sea water ('aqua marina') in Latin. This provides NO advantage in winning or predictive value.",
    april: "💎 Diamond (April): Clear birthstone traditionally associated with strength, purity, and eternal love. Hardest natural substance on Earth scientifically. Theme is decorative only and does NOT guarantee results.",
    may: "💚 Emerald (May): Green birthstone associated with fertility, rebirth, and wisdom in tradition. Prized by Cleopatra and ancient civilizations historically. This does NOT improve probability or predict outcomes.",
    june: "🤍 Pearl (June): Organic gem traditionally associated with purity, innocence, and wisdom. Formed naturally in oysters and mussels biologically. Theme is for entertainment only, NOT fortune-telling.",
    july: "❤️ Ruby (July): Red birthstone traditionally associated with passion, vitality, and protection. Called 'ratnaraj' (king of gems) in Sanskrit. This provides NO actual luck or winning advantage.",
    august: "💚 Peridot (August): Lime-green birthstone associated with strength, healing, and prosperity in folklore. Formed deep in Earth's mantle geologically. Theme does NOT affect random number generation.",
    september: "💙 Sapphire (September): Blue birthstone traditionally associated with wisdom, loyalty, and nobility. Worn by royalty throughout history. This does NOT predict or guarantee any lottery results.",
    october: "🌈 Opal (October): Multi-colored birthstone associated with creativity, imagination, and spontaneity. Displays unique color play phenomenon. Theme is for cultural interest only, NOT prediction.",
    november: "🟡 Topaz (November): Golden birthstone associated with strength, wisdom, and abundance in tradition. Name may derive from Sanskrit 'tapas' (fire). This provides NO predictive value whatsoever.",
    december: "🩵 Turquoise (December): Blue-green birthstone associated with protection, healing, and good fortune in folklore. Sacred to many Native American tribes historically. Theme is cosmetic only, NOT fortune-telling."
  },
  
  native_american: {
    otter: "🦦 Otter (Jan 20-Feb 18): Water animal totem in some Native American traditions. Associated with playfulness, curiosity, and unconventional thinking. This theme does NOT predict lottery outcomes or provide any luck.",
    wolf: "🐺 Wolf (Feb 19-Mar 20): Pack animal totem associated with loyalty, intuition, and spiritual guidance in various indigenous teachings. Theme selection does NOT affect probability or guarantee winning.",
    falcon: "🦅 Falcon (Mar 21-Apr 19): Sky hunter totem associated with vision, focus, and leadership. Swift and decisive in folklore. This provides NO advantage in lottery outcomes whatsoever.",
    beaver: "🦫 Beaver (Apr 20-May 20): Builder animal totem associated with hard work, determination, and resourcefulness. Dam-builder in nature. Theme is decorative only and does NOT guarantee results.",
    deer: "🦌 Deer (May 21-Jun 20): Gentle forest totem associated with sensitivity, grace, and adaptability. Quick and alert in teachings. This does NOT improve probability or predict outcomes.",
    woodpecker: "🐦 Woodpecker (Jun 21-Jul 21): Drummer bird totem associated with rhythm, opportunity, and protection of home. Persistent in folklore. Theme is for entertainment only, NOT fortune-telling.",
    salmon: "🐟 Salmon (Jul 22-Aug 21): Swimming upstream totem associated with determination, wisdom, and instinct. Returns home in nature. This provides NO actual luck or winning advantage.",
    bear: "🐻 Bear (Aug 22-Sep 21): Powerful animal totem associated with strength, introspection, and healing. Hibernates and awakens in cycles. Theme does NOT affect random number generation.",
    raven: "🐦‍⬛ Raven (Sep 22-Oct 22): Clever bird totem associated with magic, transformation, and intelligence in many indigenous cultures. This does NOT predict or guarantee lottery results.",
    snake: "🐍 Snake (Oct 23-Nov 22): Transformative reptile totem associated with rebirth, healing, and mystery. Sheds skin in cycles. Theme is for cultural interest only, NOT prediction.",
    owl: "🦉 Owl (Nov 23-Dec 21): Night hunter totem associated with wisdom, intuition, and seeing hidden truths. Silent flyer in nature. This provides NO predictive value whatsoever.",
    goose: "🦢 Goose (Dec 22-Jan 19): Migratory bird totem associated with perseverance, community, and ambition. Flies in V-formation. Theme is cosmetic only, NOT fortune-telling."
  },
  
  rashi: {
    mesha: "♈ Mesha (मेष - Aries): First rashi in Vedic astrology. Traditionally ruled by Mars (Mangal). Associated with courage, leadership, and initiative in Jyotish tradition. This theme does NOT predict lottery outcomes or provide any actual luck.",
    vrishabha: "♉ Vrishabha (वृषभ - Taurus): Second rashi. Traditionally ruled by Venus (Shukra) in Vedic system. Associated with stability, beauty, and prosperity culturally. Theme selection does NOT affect probability or guarantee winning.",
    mithuna: "♊ Mithuna (मिथुन - Gemini): Third rashi. Traditionally ruled by Mercury (Budha) in Jyotish. Associated with communication, intellect, and duality. This provides NO advantage in lottery outcomes whatsoever.",
    karka: "♋ Karka (कर्क - Cancer): Fourth rashi. Traditionally ruled by Moon (Chandra) in Vedic astrology. Associated with emotion, nurturing, and intuition. Theme is for cultural education only, NOT fortune-telling.",
    simha: "♌ Simha (सिंह - Leo): Fifth rashi. Traditionally ruled by Sun (Surya) in Jyotish tradition. Associated with power, dignity, and authority. This does NOT improve odds or predict winning numbers.",
    kanya: "♍ Kanya (कन्या - Virgo): Sixth rashi. Traditionally ruled by Mercury (Budha) in Vedic system. Associated with purity, service, and discrimination. Theme does NOT affect random number generation or outcomes.",
    tula: "♎ Tula (तुला - Libra): Seventh rashi. Traditionally ruled by Venus (Shukra) in Jyotish. Associated with balance, justice, and partnership culturally. This provides NO predictive value or winning advantage.",
    vrishchika: "♏ Vrishchika (वृश्चिक - Scorpio): Eighth rashi. Traditionally ruled by Mars (Mangal) in Vedic astrology. Associated with transformation, intensity, and mystery. Theme is decorative only and does NOT guarantee results.",
    dhanu: "♐ Dhanu (धनु - Sagittarius): Ninth rashi. Traditionally ruled by Jupiter (Guru) in Jyotish. Associated with wisdom, philosophy, and expansion. This does NOT predict or improve lottery probability.",
    makara: "♑ Makara (मकर - Capricorn): Tenth rashi. Traditionally ruled by Saturn (Shani) in Vedic tradition. Associated with discipline, ambition, and karma. Theme is for entertainment only, NOT prediction.",
    kumbha: "♒ Kumbha (कुम्भ - Aquarius): Eleventh rashi. Traditionally ruled by Saturn (Shani) in Jyotish. Associated with service, innovation, and humanitarianism. This provides NO actual luck or winning advantage.",
    meena: "♓ Meena (मीन - Pisces): Twelfth rashi. Traditionally ruled by Jupiter (Guru) in Vedic astrology. Associated with spirituality, compassion, and transcendence culturally. Theme does NOT affect outcomes or guarantee any results."
  }
};

export default MODE_EDUCATION;
