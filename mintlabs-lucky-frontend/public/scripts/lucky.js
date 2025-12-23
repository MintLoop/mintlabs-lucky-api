var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/scripts/tracking.ts
var tracking_exports = {};
__export(tracking_exports, {
  track: () => track
});
function track(event, props = {}) {
  try {
    try {
      window.__LUCKY_EVENTS = window.__LUCKY_EVENTS || [];
      window.__LUCKY_EVENTS.push({ event, props, ts: Date.now() });
    } catch (err) {
      console.debug(err);
    }
    if (typeof window.plausible === "function") {
      window.plausible(event, { props });
    }
    const umami = window.umami;
    if (umami) {
      if (typeof umami.track === "function") umami.track(event, props);
      else if (typeof umami === "function") umami(event, props);
    }
    if (!window.plausible && !window.umami) {
      console.debug("[track]", event, props);
    }
  } catch (e) {
    console.warn("[track:error]", e);
  }
}
var init_tracking = __esm({
  "src/scripts/tracking.ts"() {
    "use strict";
  }
});

// src/data/modeConfig.ts
var MODE_CONFIG = {
  zodiac: {
    label: "Zodiac",
    items: [
      { key: "aries", label: "Aries", emoji: "\u2648", seed: "zodiac:aries" },
      { key: "taurus", label: "Taurus", emoji: "\u2649", seed: "zodiac:taurus" },
      { key: "gemini", label: "Gemini", emoji: "\u264A", seed: "zodiac:gemini" },
      { key: "cancer", label: "Cancer", emoji: "\u264B", seed: "zodiac:cancer" },
      { key: "leo", label: "Leo", emoji: "\u264C", seed: "zodiac:leo" },
      { key: "virgo", label: "Virgo", emoji: "\u264D", seed: "zodiac:virgo" },
      { key: "libra", label: "Libra", emoji: "\u264E", seed: "zodiac:libra" },
      { key: "scorpio", label: "Scorpio", emoji: "\u264F", seed: "zodiac:scorpio" },
      { key: "sagittarius", label: "Sagittarius", emoji: "\u2650", seed: "zodiac:sagittarius" },
      { key: "capricorn", label: "Capricorn", emoji: "\u2651", seed: "zodiac:capricorn" },
      { key: "aquarius", label: "Aquarius", emoji: "\u2652", seed: "zodiac:aquarius" },
      { key: "pisces", label: "Pisces", emoji: "\u2653", seed: "zodiac:pisces" }
    ]
  },
  chinese_zodiac: {
    label: "Chinese Zodiac",
    items: [
      { key: "rat", label: "Rat", emoji: "\u{1F400}", seed: "chinese:rat" },
      { key: "ox", label: "Ox", emoji: "\u{1F402}", seed: "chinese:ox" },
      { key: "tiger", label: "Tiger", emoji: "\u{1F405}", seed: "chinese:tiger" },
      { key: "rabbit", label: "Rabbit", emoji: "\u{1F407}", seed: "chinese:rabbit" },
      { key: "dragon", label: "Dragon", emoji: "\u{1F409}", seed: "chinese:dragon" },
      { key: "snake", label: "Snake", emoji: "\u{1F40D}", seed: "chinese:snake" },
      { key: "horse", label: "Horse", emoji: "\u{1F40E}", seed: "chinese:horse" },
      { key: "goat", label: "Goat", emoji: "\u{1F410}", seed: "chinese:goat" },
      { key: "monkey", label: "Monkey", emoji: "\u{1F412}", seed: "chinese:monkey" },
      { key: "rooster", label: "Rooster", emoji: "\u{1F413}", seed: "chinese:rooster" },
      { key: "dog", label: "Dog", emoji: "\u{1F415}", seed: "chinese:dog" },
      { key: "pig", label: "Pig", emoji: "\u{1F416}", seed: "chinese:pig" }
    ]
  },
  favorite_color: {
    label: "Color",
    items: [
      // Primary Colors
      { key: "red", label: "Red", emoji: "\u{1F534}", seed: "color:red", color: "red" },
      { key: "yellow", label: "Yellow", emoji: "\u{1F7E1}", seed: "color:yellow", color: "yellow" },
      { key: "blue", label: "Blue", emoji: "\u{1F535}", seed: "color:blue", color: "blue" },
      // Secondary Colors
      { key: "orange", label: "Orange", emoji: "\u{1F7E0}", seed: "color:orange", color: "orange" },
      { key: "green", label: "Green", emoji: "\u{1F7E2}", seed: "color:green", color: "green" },
      { key: "purple", label: "Purple", emoji: "\u{1F7E3}", seed: "color:purple", color: "purple" },
      // Tertiary Colors
      { key: "vermilion", label: "Vermilion (Red-Orange)", emoji: "\u{1F536}", seed: "color:vermilion", color: "orange" },
      { key: "amber", label: "Amber (Yellow-Orange)", emoji: "\u{1F7E8}", seed: "color:amber", color: "amber" },
      { key: "chartreuse", label: "Chartreuse (Yellow-Green)", emoji: "\u{1F49A}", seed: "color:chartreuse", color: "lime" },
      { key: "teal", label: "Teal (Blue-Green)", emoji: "\u{1FA75}", seed: "color:teal", color: "teal" },
      { key: "violet", label: "Violet (Blue-Purple)", emoji: "\u{1F49C}", seed: "color:violet", color: "violet" },
      { key: "magenta", label: "Magenta (Red-Purple)", emoji: "\u{1FA77}", seed: "color:magenta", color: "fuchsia" },
      // Neutrals
      { key: "white", label: "White", emoji: "\u26AA", seed: "color:white", color: "gray-100" },
      { key: "black", label: "Black", emoji: "\u26AB", seed: "color:black", color: "gray-800" },
      { key: "gray", label: "Gray", emoji: "\u26AB", seed: "color:gray", color: "gray" }
    ]
  },
  gemstone: {
    label: "Gemstone",
    items: [
      // Traditional Birthstones
      { key: "garnet", label: "Garnet (January)", emoji: "\u{1F48E}", seed: "gem:garnet" },
      { key: "amethyst", label: "Amethyst (February)", emoji: "\u{1F7EA}", seed: "gem:amethyst" },
      { key: "aquamarine", label: "Aquamarine (March)", emoji: "\u{1F4A0}", seed: "gem:aquamarine" },
      { key: "diamond", label: "Diamond (April)", emoji: "\u{1F48E}", seed: "gem:diamond" },
      { key: "emerald", label: "Emerald (May)", emoji: "\u{1F49A}", seed: "gem:emerald" },
      { key: "pearl", label: "Pearl (June)", emoji: "\u{1F90D}", seed: "gem:pearl" },
      { key: "ruby", label: "Ruby (July)", emoji: "\u2764\uFE0F", seed: "gem:ruby" },
      { key: "peridot", label: "Peridot (August)", emoji: "\u{1F49A}", seed: "gem:peridot" },
      { key: "sapphire", label: "Sapphire (September)", emoji: "\u{1F537}", seed: "gem:sapphire" },
      { key: "opal", label: "Opal (October)", emoji: "\u{1F308}", seed: "gem:opal" },
      { key: "topaz", label: "Topaz (November)", emoji: "\u{1F7E6}", seed: "gem:topaz" },
      { key: "turquoise", label: "Turquoise (December)", emoji: "\u{1FA75}", seed: "gem:turquoise" },
      // Popular Variations & Precious Stones
      { key: "alexandrite", label: "Alexandrite (June alt.)", emoji: "\u{1F52E}", seed: "gem:alexandrite" },
      { key: "moonstone", label: "Moonstone (June alt.)", emoji: "\u{1F319}", seed: "gem:moonstone" },
      { key: "citrine", label: "Citrine (November alt.)", emoji: "\u{1F7E1}", seed: "gem:citrine" },
      { key: "tanzanite", label: "Tanzanite (December alt.)", emoji: "\u{1F49C}", seed: "gem:tanzanite" },
      { key: "jade", label: "Jade", emoji: "\u{1F49A}", seed: "gem:jade" },
      { key: "onyx", label: "Onyx", emoji: "\u26AB", seed: "gem:onyx" }
    ]
  },
  jyotish: {
    label: "Nakshatra (Jyotish)",
    items: [
      { key: "ashwini", label: "Ashwini", emoji: "\u{1F31F}", seed: "jyotish:ashwini" },
      { key: "bharani", label: "Bharani", emoji: "\u{1F319}", seed: "jyotish:bharani" },
      { key: "krittika", label: "Krittika", emoji: "\u{1F525}", seed: "jyotish:krittika" },
      { key: "rohini", label: "Rohini", emoji: "\u{1F33E}", seed: "jyotish:rohini" },
      { key: "mrigashira", label: "Mrigashira", emoji: "\u{1F98C}", seed: "jyotish:mrigashira" },
      { key: "ardra", label: "Ardra", emoji: "\u{1F4A7}", seed: "jyotish:ardra" },
      { key: "punarvasu", label: "Punarvasu", emoji: "\u{1F3F9}", seed: "jyotish:punarvasu" },
      { key: "pushya", label: "Pushya", emoji: "\u{1F506}", seed: "jyotish:pushya" },
      { key: "ashlesha", label: "Ashlesha", emoji: "\u{1F40D}", seed: "jyotish:ashlesha" },
      { key: "magha", label: "Magha", emoji: "\u{1F451}", seed: "jyotish:magha" },
      { key: "purva_phalguni", label: "Purva Phalguni", emoji: "\u{1F6CF}\uFE0F", seed: "jyotish:purva_phalguni" },
      { key: "uttara_phalguni", label: "Uttara Phalguni", emoji: "\u{1F91D}", seed: "jyotish:uttara_phalguni" },
      { key: "hasta", label: "Hasta", emoji: "\u270B", seed: "jyotish:hasta" },
      { key: "chitra", label: "Chitra", emoji: "\u2728", seed: "jyotish:chitra" },
      { key: "swati", label: "Swati", emoji: "\u{1F32C}\uFE0F", seed: "jyotish:swati" },
      { key: "vishakha", label: "Vishakha", emoji: "\u2696\uFE0F", seed: "jyotish:vishakha" },
      { key: "anuradha", label: "Anuradha", emoji: "\u{1F33A}", seed: "jyotish:anuradha" },
      { key: "jyeshtha", label: "Jyeshtha", emoji: "\u2602\uFE0F", seed: "jyotish:jyeshtha" },
      { key: "mula", label: "Mula", emoji: "\u{1F331}", seed: "jyotish:mula" },
      { key: "purva_ashadha", label: "Purva Ashadha", emoji: "\u{1F30A}", seed: "jyotish:purva_ashadha" },
      { key: "uttara_ashadha", label: "Uttara Ashadha", emoji: "\u{1F3D4}\uFE0F", seed: "jyotish:uttara_ashadha" },
      { key: "shravana", label: "Shravana", emoji: "\u{1F442}", seed: "jyotish:shravana" },
      { key: "dhanishta", label: "Dhanishta", emoji: "\u{1F941}", seed: "jyotish:dhanishta" },
      { key: "shatabhisha", label: "Shatabhisha", emoji: "\u{1F4AB}", seed: "jyotish:shatabhisha" },
      { key: "purva_bhadrapada", label: "Purva Bhadrapada", emoji: "\u26A1", seed: "jyotish:purva_bhadrapada" },
      { key: "uttara_bhadrapada", label: "Uttara Bhadrapada", emoji: "\u{1F409}", seed: "jyotish:uttara_bhadrapada" },
      { key: "revati", label: "Revati", emoji: "\u{1F420}", seed: "jyotish:revati" }
    ]
  },
  birthstone: {
    label: "Birth Month",
    items: [
      { key: "january", label: "January (Garnet)", emoji: "\u{1F48E}", seed: "birthstone:january" },
      { key: "february", label: "February (Amethyst)", emoji: "\u{1F49C}", seed: "birthstone:february" },
      { key: "march", label: "March (Aquamarine)", emoji: "\u{1F4A0}", seed: "birthstone:march" },
      { key: "april", label: "April (Diamond)", emoji: "\u{1F48E}", seed: "birthstone:april" },
      { key: "may", label: "May (Emerald)", emoji: "\u{1F49A}", seed: "birthstone:may" },
      { key: "june", label: "June (Pearl)", emoji: "\u{1F90D}", seed: "birthstone:june" },
      { key: "july", label: "July (Ruby)", emoji: "\u2764\uFE0F", seed: "birthstone:july" },
      { key: "august", label: "August (Peridot)", emoji: "\u{1F49A}", seed: "birthstone:august" },
      { key: "september", label: "September (Sapphire)", emoji: "\u{1F499}", seed: "birthstone:september" },
      { key: "october", label: "October (Opal)", emoji: "\u{1F308}", seed: "birthstone:october" },
      { key: "november", label: "November (Topaz)", emoji: "\u{1F7E1}", seed: "birthstone:november" },
      { key: "december", label: "December (Turquoise)", emoji: "\u{1FA75}", seed: "birthstone:december" }
    ]
  },
  native_american: {
    label: "Native American Zodiac",
    items: [
      { key: "otter", label: "Otter (Jan 20-Feb 18)", emoji: "\u{1F9A6}", seed: "native:otter" },
      { key: "wolf", label: "Wolf (Feb 19-Mar 20)", emoji: "\u{1F43A}", seed: "native:wolf" },
      { key: "falcon", label: "Falcon (Mar 21-Apr 19)", emoji: "\u{1F985}", seed: "native:falcon" },
      { key: "beaver", label: "Beaver (Apr 20-May 20)", emoji: "\u{1F9AB}", seed: "native:beaver" },
      { key: "deer", label: "Deer (May 21-Jun 20)", emoji: "\u{1F98C}", seed: "native:deer" },
      { key: "woodpecker", label: "Woodpecker (Jun 21-Jul 21)", emoji: "\u{1F426}", seed: "native:woodpecker" },
      { key: "salmon", label: "Salmon (Jul 22-Aug 21)", emoji: "\u{1F41F}", seed: "native:salmon" },
      { key: "bear", label: "Bear (Aug 22-Sep 21)", emoji: "\u{1F43B}", seed: "native:bear" },
      { key: "raven", label: "Raven (Sep 22-Oct 22)", emoji: "\u{1F426}\u200D\u2B1B", seed: "native:raven" },
      { key: "snake", label: "Snake (Oct 23-Nov 22)", emoji: "\u{1F40D}", seed: "native:snake" },
      { key: "owl", label: "Owl (Nov 23-Dec 21)", emoji: "\u{1F989}", seed: "native:owl" },
      { key: "goose", label: "Goose (Dec 22-Jan 19)", emoji: "\u{1F986}", seed: "native:goose" }
    ]
  },
  rashi: {
    label: "Indian Zodiac (Rashi)",
    items: [
      { key: "mesha", label: "Mesha (Aries)", emoji: "\u2648", seed: "rashi:mesha" },
      { key: "vrishabha", label: "Vrishabha (Taurus)", emoji: "\u2649", seed: "rashi:vrishabha" },
      { key: "mithuna", label: "Mithuna (Gemini)", emoji: "\u264A", seed: "rashi:mithuna" },
      { key: "karka", label: "Karka (Cancer)", emoji: "\u264B", seed: "rashi:karka" },
      { key: "simha", label: "Simha (Leo)", emoji: "\u264C", seed: "rashi:simha" },
      { key: "kanya", label: "Kanya (Virgo)", emoji: "\u264D", seed: "rashi:kanya" },
      { key: "tula", label: "Tula (Libra)", emoji: "\u264E", seed: "rashi:tula" },
      { key: "vrishchika", label: "Vrishchika (Scorpio)", emoji: "\u264F", seed: "rashi:vrishchika" },
      { key: "dhanu", label: "Dhanu (Sagittarius)", emoji: "\u2650", seed: "rashi:dhanu" },
      { key: "makara", label: "Makara (Capricorn)", emoji: "\u2651", seed: "rashi:makara" },
      { key: "kumbha", label: "Kumbha (Aquarius)", emoji: "\u2652", seed: "rashi:kumbha" },
      { key: "meena", label: "Meena (Pisces)", emoji: "\u2653", seed: "rashi:meena" }
    ]
  },
  // star_sign uses lunar/planetary themes instead of direct zodiac duplicate
  star_sign: {
    label: "Celestial Bodies",
    items: [
      { key: "sun", label: "Sun (Leo)", emoji: "\u2600\uFE0F", seed: "celestial:sun" },
      { key: "moon", label: "Moon (Cancer)", emoji: "\u{1F319}", seed: "celestial:moon" },
      { key: "mercury", label: "Mercury (Gemini/Virgo)", emoji: "\u263F\uFE0F", seed: "celestial:mercury" },
      { key: "venus", label: "Venus (Taurus/Libra)", emoji: "\u2640\uFE0F", seed: "celestial:venus" },
      { key: "mars", label: "Mars (Aries/Scorpio)", emoji: "\u2642\uFE0F", seed: "celestial:mars" },
      { key: "jupiter", label: "Jupiter (Sagittarius/Pisces)", emoji: "\u2643", seed: "celestial:jupiter" },
      { key: "saturn", label: "Saturn (Capricorn/Aquarius)", emoji: "\u2644", seed: "celestial:saturn" },
      { key: "uranus", label: "Uranus (Aquarius)", emoji: "\u2645", seed: "celestial:uranus" },
      { key: "neptune", label: "Neptune (Pisces)", emoji: "\u2646", seed: "celestial:neptune" },
      { key: "pluto", label: "Pluto (Scorpio)", emoji: "\u2647", seed: "celestial:pluto" },
      { key: "north_node", label: "North Node (Rahu)", emoji: "\u260A", seed: "celestial:north_node" },
      { key: "south_node", label: "South Node (Ketu)", emoji: "\u260B", seed: "celestial:south_node" }
    ]
  }
};
var modeConfig_default = MODE_CONFIG;

// src/data/modeEducation.ts
var MODE_EDUCATION = {
  zodiac: {
    aries: "\u2648 Aries (Mar 21-Apr 19): Fire sign ruled by Mars. Traditionally associated with courage, initiative, and boldness in Western astrology. This theme is for fun only and does NOT predict winning numbers.",
    taurus: "\u2649 Taurus (Apr 20-May 20): Earth sign ruled by Venus. Traditionally associated with stability, patience, and determination. Theme selection does NOT affect lottery outcomes.",
    gemini: "\u264A Gemini (May 21-Jun 20): Air sign ruled by Mercury. Traditionally associated with communication, adaptability, and curiosity. This is purely cosmetic and provides NO advantage.",
    cancer: "\u264B Cancer (Jun 21-Jul 22): Water sign ruled by the Moon. Traditionally associated with emotion, intuition, and nurturing. Theme is for entertainment only, NOT prediction.",
    leo: "\u264C Leo (Jul 23-Aug 22): Fire sign ruled by the Sun. Traditionally associated with confidence, creativity, and leadership. This does NOT influence random number generation.",
    virgo: "\u264D Virgo (Aug 23-Sep 22): Earth sign ruled by Mercury. Traditionally associated with analysis, precision, and service. Theme selection has NO predictive value.",
    libra: "\u264E Libra (Sep 23-Oct 22): Air sign ruled by Venus. Traditionally associated with balance, harmony, and diplomacy. This is cultural context only, NOT fortune-telling.",
    scorpio: "\u264F Scorpio (Oct 23-Nov 21): Water sign ruled by Pluto. Traditionally associated with intensity, transformation, and mystery. Theme does NOT affect probability.",
    sagittarius: "\u2650 Sagittarius (Nov 22-Dec 21): Fire sign ruled by Jupiter. Traditionally associated with adventure, philosophy, and optimism. This provides NO guarantee of results.",
    capricorn: "\u2651 Capricorn (Dec 22-Jan 19): Earth sign ruled by Saturn. Traditionally associated with discipline, ambition, and structure. Theme is decorative only, NOT predictive.",
    aquarius: "\u2652 Aquarius (Jan 20-Feb 18): Air sign ruled by Uranus. Traditionally associated with innovation, independence, and humanitarianism. This does NOT improve odds.",
    pisces: "\u2653 Pisces (Feb 19-Mar 20): Water sign ruled by Neptune. Traditionally associated with compassion, imagination, and spirituality. Theme is for fun, NOT fortune."
  },
  star_sign: {
    sun: "\u2600\uFE0F Sun (Leo): Central star of our solar system. Astrologically rules Leo and represents ego, vitality, and self-expression. Nuclear fusion powers all life on Earth. This theme does NOT predict lottery outcomes.",
    moon: "\u{1F319} Moon (Cancer): Earth's natural satellite governing tides. Astrologically rules Cancer and represents emotions, cycles, and intuition. Phases affect ocean tides. Theme does NOT affect probability.",
    mercury: "\u263F\uFE0F Mercury (Gemini/Virgo): Closest planet to Sun, fastest orbit (88 days). Astrologically rules Gemini and Virgo, represents communication and intellect. Retrograde 3-4 times yearly. This provides NO luck.",
    venus: "\u2640\uFE0F Venus (Taurus/Libra): Second planet, Earth's 'twin' in size. Astrologically rules Taurus and Libra, represents love and beauty. Brightest object after Sun/Moon. Theme is decorative only.",
    mars: "\u2642\uFE0F Mars (Aries/Scorpio): Red planet, fourth from Sun. Astrologically rules Aries and Scorpio, represents action and energy. Iron oxide gives red color. NOT fortune-telling.",
    jupiter: "\u2643 Jupiter (Sagittarius/Pisces): Largest planet, gas giant. Astrologically rules Sagittarius and Pisces, represents expansion and wisdom. Has 95+ moons. Theme does NOT predict outcomes.",
    saturn: "\u2644 Saturn (Capricorn/Aquarius): Ringed gas giant with spectacular ice rings. Astrologically rules Capricorn and Aquarius, represents structure and discipline. Second-largest planet. NO winning advantage.",
    uranus: "\u2645 Uranus (Aquarius): Ice giant tilted on its side. Astrologically rules Aquarius, represents innovation and rebellion. Rotates nearly perpendicular to orbit. NOT prediction.",
    neptune: "\u2646 Neptune (Pisces): Farthest ice giant, deep blue color. Astrologically rules Pisces, represents dreams and spirituality. Discovered via mathematics 1846. Decorative only.",
    pluto: "\u2647 Pluto (Scorpio): Dwarf planet in Kuiper Belt. Astrologically rules Scorpio, represents transformation and rebirth. Reclassified from planet 2006. Theme does NOT improve odds.",
    north_node: "\u260A North Node (Rahu): Lunar node where Moon crosses ecliptic northward. Not a physical body but a mathematical point. Represents karmic future in astrology. NO predictive value.",
    south_node: "\u260B South Node (Ketu): Lunar node where Moon crosses ecliptic southward. Mathematical point opposite North Node. Represents karmic past in Vedic astrology. Entertainment only."
  },
  chinese_zodiac: {
    rat: "\u{1F400} Rat (\u9F20): First of the zodiac cycle in Chinese astrology. Traditionally associated with intelligence, adaptability, and resourcefulness. This theme does NOT predict lottery outcomes.",
    ox: "\u{1F402} Ox (\u725B): Second sign in Chinese zodiac. Traditionally associated with diligence, dependability, and strength. Theme selection provides NO advantage in winning.",
    tiger: "\u{1F405} Tiger (\u864E): Third sign. Traditionally associated with bravery, competitiveness, and confidence. This is for cultural interest only, NOT fortune-telling.",
    rabbit: "\u{1F407} Rabbit (\u5154): Fourth sign. Traditionally associated with gentleness, elegance, and kindness. Theme does NOT affect random number generation.",
    dragon: "\u{1F409} Dragon (\u9F8D): Fifth sign. Traditionally associated with power, wisdom, and good fortune in folklore. This provides NO actual luck or winning advantage.",
    snake: "\u{1F40D} Snake (\u86C7): Sixth sign. Traditionally associated with wisdom, mystery, and intuition. Theme is decorative only and does NOT improve odds.",
    horse: "\u{1F40E} Horse (\u99AC): Seventh sign. Traditionally associated with energy, independence, and enthusiasm. This does NOT guarantee any results.",
    goat: "\u{1F410} Goat (\u7F8A): Eighth sign. Traditionally associated with creativity, peace, and perseverance. Theme selection has NO predictive value.",
    monkey: "\u{1F412} Monkey (\u7334): Ninth sign. Traditionally associated with cleverness, curiosity, and playfulness. This is entertainment only, NOT prediction.",
    rooster: "\u{1F413} Rooster (\u96DE): Tenth sign. Traditionally associated with confidence, punctuality, and honesty. Theme does NOT influence lottery probability.",
    dog: "\u{1F415} Dog (\u72D7): Eleventh sign. Traditionally associated with loyalty, honesty, and justice. This provides NO guarantee of winning.",
    pig: "\u{1F416} Pig (\u8C6C): Twelfth sign. Traditionally associated with generosity, compassion, and diligence. Theme is for fun only, NOT fortune."
  },
  favorite_color: {
    // Primary Colors
    red: "\u{1F534} Red: Primary color culturally associated with passion, energy, power, and vitality. Psychologically linked to excitement and boldness. This theme does NOT predict winning numbers or improve odds.",
    yellow: "\u{1F7E1} Yellow: Primary color culturally associated with optimism, joy, intellect, and energy. Psychologically linked to happiness and clarity. Theme selection provides NO advantage in lottery outcomes.",
    blue: "\u{1F535} Blue: Primary color culturally associated with calmness, trust, stability, and depth. Psychologically linked to serenity and wisdom. This is decorative only and does NOT affect probability.",
    // Secondary Colors
    orange: "\u{1F7E0} Orange: Secondary color (red + yellow) associated with enthusiasm, creativity, and warmth. Psychologically linked to adventure and confidence. Theme does NOT guarantee any results.",
    green: "\u{1F7E2} Green: Secondary color (blue + yellow) associated with nature, growth, harmony, and renewal. Psychologically linked to balance and healing. This provides NO predictive value whatsoever.",
    purple: "\u{1F7E3} Purple: Secondary color (red + blue) associated with royalty, mystery, spirituality, and luxury. Psychologically linked to creativity and wisdom. Theme is for entertainment only, NOT fortune-telling.",
    // Tertiary Colors
    vermilion: "\u{1F536} Vermilion (Red-Orange): Tertiary color associated with energy, determination, and dynamism in color theory. Vibrant pigment historically used in art. This does NOT predict lottery outcomes or provide any luck.",
    amber: "\u{1F7E8} Amber (Yellow-Orange): Tertiary color associated with warmth, caution, and autumn in color psychology. Named after fossilized tree resin. Theme selection does NOT affect probability or guarantee winning.",
    chartreuse: "\u{1F49A} Chartreuse (Yellow-Green): Tertiary color associated with vitality, freshness, and spring growth. Named after French liqueur. This provides NO advantage in lottery outcomes whatsoever.",
    teal: "\u{1FAF5} Teal (Blue-Green): Tertiary color associated with sophistication, tranquility, and ocean depths. Combines calmness with renewal. Theme is for cultural interest only, NOT fortune-telling.",
    violet: "\u{1F49C} Violet (Blue-Purple): Tertiary color associated with imagination, mysticism, and transformation. Highest visible wavelength in spectrum. This does NOT improve odds or predict winning numbers.",
    magenta: "\u{1FA77} Magenta (Red-Purple): Tertiary color associated with passion, innovation, and unconventionality. Not in rainbow spectrum (brain combination). Theme does NOT affect random number generation or outcomes.",
    // Neutrals
    white: "\u26AA White: Achromatic color symbolizing purity, simplicity, and new beginnings across cultures. Reflects all wavelengths of visible light. This provides NO predictive value or winning advantage.",
    black: "\u26AB Black: Achromatic color associated with sophistication, power, elegance, and mystery. Absorbs all wavelengths. Theme is decorative only and does NOT guarantee results.",
    gray: "\u26AB Gray: Neutral color (white + black) associated with balance, neutrality, and professionalism. Timeless and versatile. Theme is for entertainment only, NOT prediction."
  },
  gemstone: {
    // Traditional Birthstones (12 months)
    garnet: "\u{1F48E} Garnet (January): Deep red gemstone traditionally associated with passion, energy, and regeneration. Named from Latin 'granatum' (pomegranate). This theme does NOT predict lottery outcomes or provide any luck.",
    amethyst: "\u{1F7EA} Amethyst (February): Purple quartz traditionally associated with peace, clarity, and sobriety in folklore. Name from Greek 'amethystos' (not intoxicated). Theme selection does NOT affect probability or guarantee winning.",
    aquamarine: "\u{1F4A0} Aquamarine (March): Blue-green beryl associated with courage, calm, and seafarers' protection. Latin 'aqua marina' (sea water). This provides NO advantage in lottery outcomes whatsoever.",
    diamond: "\u{1F48E} Diamond (April): Clear carbon crystal, hardest natural substance. Traditionally associated with strength, purity, and eternal love. Theme is decorative only and does NOT guarantee results.",
    emerald: "\u{1F49A} Emerald (May): Green beryl traditionally associated with fertility, rebirth, and Venus in folklore. Prized by Cleopatra. This does NOT improve probability or predict outcomes.",
    pearl: "\u{1F9AA} Pearl (June): Organic gem formed in mollusks, associated with purity, innocence, and lunar energy. Only gem created by living creatures. Theme is for entertainment only, NOT fortune-telling.",
    ruby: "\u2764\uFE0F Ruby (July): Red corundum traditionally associated with passion, vitality, and the sun. Called 'ratnaraj' (king of gems) in Sanskrit. This provides NO actual luck or winning advantage.",
    peridot: "\u{1F49A} Peridot (August): Olive-green olivine associated with strength, healing, and volcanic origins. Forms deep in Earth's mantle. Theme does NOT affect random number generation.",
    sapphire: "\u{1F537} Sapphire (September): Blue corundum (ruby's cousin) associated with wisdom, royalty, and divine favor. Worn by monarchs historically. This does NOT predict or guarantee lottery results.",
    opal: "\u{1F308} Opal (October): Hydrated silica displaying unique 'play-of-color' phenomenon. Associated with creativity and imagination. Theme is for cultural interest only, NOT prediction.",
    topaz: "\u{1F7E6} Topaz (November): Golden-to-blue aluminum silicate associated with strength and wisdom. Name possibly from Sanskrit 'tapas' (fire). This provides NO predictive value whatsoever.",
    turquoise: "\u{1FA75} Turquoise (December): Blue-green copper mineral sacred to many indigenous cultures. Associated with protection and healing in folklore. Theme is cosmetic only, NOT fortune-telling.",
    // Popular Variations & Alternative Stones
    alexandrite: "\u{1F52E} Alexandrite (June alt.): Rare color-changing chrysoberyl (green in daylight, red in incandescent light). Discovered in Russia 1830s. This does NOT predict winning numbers or provide luck.",
    moonstone: "\u{1F319} Moonstone (June alt.): Feldspar with adularescence (milky glow). Associated with lunar cycles and intuition in folklore. Theme selection does NOT affect outcomes or improve odds.",
    citrine: "\u{1F7E1} Citrine (November alt.): Yellow-to-orange quartz associated with abundance and sunshine. Name from French 'citron' (lemon). This provides NO advantage in winning the lottery.",
    tanzanite: "\u{1F49C} Tanzanite (December alt.): Blue-violet zoisite found only in Tanzania. Discovered 1967, popularized by Tiffany & Co. Theme does NOT guarantee any results or predict probability.",
    jade: "\u{1F49A} Jade: Green jadeite or nephrite revered in Asian cultures for millennia. Associated with harmony, balance, and protection. This is decorative only and does NOT improve odds.",
    onyx: "\u26AB Onyx: Black chalcedony with white bands, associated with strength and grounding. Used in cameos and intaglios historically. Theme is for entertainment only, NOT fortune-telling."
  },
  jyotish: {
    ashwini: "\u{1F31F} Ashwini (\u0905\u0936\u094D\u0935\u093F\u0928\u0940): 1st nakshatra (0\xB0-13\xB020' Aries). Ruled by Ketu. Associated with healing, speed, and new beginnings. Deity: Ashwini Kumaras (divine physicians). This does NOT predict lottery outcomes.",
    bharani: "\u{1F319} Bharani (\u092D\u0930\u0923\u0940): 2nd nakshatra (13\xB020'-26\xB040' Aries). Ruled by Venus (Shukra). Associated with transformation and creativity. Deity: Yama (god of death). Theme does NOT affect probability.",
    krittika: "\u{1F525} Krittika (\u0915\u0943\u0924\u094D\u0924\u093F\u0915\u093E): 3rd nakshatra (26\xB040' Aries-10\xB0 Taurus). Ruled by Sun (Surya). Associated with purification and determination. Deity: Agni (fire god). This provides NO luck.",
    rohini: "\u{1F33E} Rohini (\u0930\u094B\u0939\u093F\u0923\u0940): 4th nakshatra (10\xB0-23\xB020' Taurus). Ruled by Moon (Chandra). Associated with growth and beauty. Deity: Brahma (creator). Theme is decorative only.",
    mrigashira: "\u{1F98C} Mrigashira (\u092E\u0943\u0917\u0936\u0940\u0930\u094D\u0937): 5th nakshatra (23\xB020' Taurus-6\xB040' Gemini). Ruled by Mars (Mangal). Associated with seeking and curiosity. Deity: Soma (moon god). NOT fortune-telling.",
    ardra: "\u{1F4A7} Ardra (\u0906\u0930\u094D\u0926\u094D\u0930\u093E): 6th nakshatra (6\xB040'-20\xB0 Gemini). Ruled by Rahu. Associated with storms, transformation, and tears. Deity: Rudra (storm god). Theme does NOT predict outcomes.",
    punarvasu: "\u{1F3F9} Punarvasu (\u092A\u0941\u0928\u0930\u094D\u0935\u0938\u0941): 7th nakshatra (20\xB0 Gemini-3\xB020' Cancer). Ruled by Jupiter (Guru). Associated with renewal and return. Deity: Aditi (mother of gods). NO winning advantage.",
    pushya: "\u{1F506} Pushya (\u092A\u0941\u0937\u094D\u092F): 8th nakshatra (3\xB020'-16\xB040' Cancer). Ruled by Saturn (Shani). Most auspicious nakshatra. Associated with nourishment. Deity: Brihaspati (Jupiter). NOT prediction.",
    ashlesha: "\u{1F40D} Ashlesha (\u0906\u0936\u094D\u0932\u0947\u0937\u093E): 9th nakshatra (16\xB040'-30\xB0 Cancer). Ruled by Mercury (Budha). Associated with serpent energy and mysticism. Deity: Nagas (serpent deities). Decorative only.",
    magha: "\u{1F451} Magha (\u092E\u0918\u093E): 10th nakshatra (0\xB0-13\xB020' Leo). Ruled by Ketu. Associated with ancestors, throne, and authority. Deity: Pitris (ancestors). Theme does NOT improve odds.",
    purva_phalguni: "\u{1F6CF}\uFE0F Purva Phalguni (\u092A\u0942\u0930\u094D\u0935 \u092B\u093E\u0932\u094D\u0917\u0941\u0928\u0940): 11th nakshatra (13\xB020'-26\xB040' Leo). Ruled by Venus (Shukra). Associated with relaxation and pleasure. Deity: Bhaga (prosperity). NO predictive value.",
    uttara_phalguni: "\u{1F91D} Uttara Phalguni (\u0909\u0924\u094D\u0924\u0930 \u092B\u093E\u0932\u094D\u0917\u0941\u0928\u0940): 12th nakshatra (26\xB040' Leo-10\xB0 Virgo). Ruled by Sun (Surya). Associated with friendship and contracts. Deity: Aryaman (partnership). Entertainment only.",
    hasta: "\u270B Hasta (\u0939\u0938\u094D\u0924): 13th nakshatra (10\xB0-23\xB020' Virgo). Ruled by Moon (Chandra). Associated with hands, skill, and manifestation. Deity: Savitar (sun deity). NOT fortune-telling.",
    chitra: "\u2728 Chitra (\u091A\u093F\u0924\u094D\u0930\u093E): 14th nakshatra (23\xB020' Virgo-6\xB040' Libra). Ruled by Mars (Mangal). Associated with beauty, artistry, and jewels. Deity: Tvashtar (celestial architect). NO luck.",
    swati: "\u{1F32C}\uFE0F Swati (\u0938\u094D\u0935\u093E\u0924\u093F): 15th nakshatra (6\xB040'-20\xB0 Libra). Ruled by Rahu. Associated with independence, movement, and wind. Deity: Vayu (wind god). Does NOT affect outcomes.",
    vishakha: "\u2696\uFE0F Vishakha (\u0935\u093F\u0936\u093E\u0916\u093E): 16th nakshatra (20\xB0 Libra-3\xB020' Scorpio). Ruled by Jupiter (Guru). Associated with determination and dual goals. Deity: Indra-Agni. Theme is decorative.",
    anuradha: "\u{1F33A} Anuradha (\u0905\u0928\u0941\u0930\u093E\u0927\u093E): 17th nakshatra (3\xB020'-16\xB040' Scorpio). Ruled by Saturn (Shani). Associated with friendship, devotion, and success. Deity: Mitra (friendship). NO guarantee.",
    jyeshtha: "\u2602\uFE0F Jyeshtha (\u091C\u094D\u092F\u0947\u0937\u094D\u0920\u093E): 18th nakshatra (16\xB040'-30\xB0 Scorpio). Ruled by Mercury (Budha). Associated with seniority, protection, and courage. Deity: Indra (king of gods). NOT prediction.",
    mula: "\u{1F331} Mula (\u092E\u0942\u0932): 19th nakshatra (0\xB0-13\xB020' Sagittarius). Ruled by Ketu. Associated with roots, foundation, and destruction. Deity: Nirriti (goddess of dissolution). Entertainment only.",
    purva_ashadha: "\u{1F30A} Purva Ashadha (\u092A\u0942\u0930\u094D\u0935\u093E\u0937\u093E\u0922\u093C\u093E): 20th nakshatra (13\xB020'-26\xB040' Sagittarius). Ruled by Venus (Shukra). Associated with invincibility and water. Deity: Apas (water). NO winning advantage.",
    uttara_ashadha: "\u{1F3D4}\uFE0F Uttara Ashadha (\u0909\u0924\u094D\u0924\u0930\u093E\u0937\u093E\u0922\u093C\u093E): 21st nakshatra (26\xB040' Sagittarius-10\xB0 Capricorn). Ruled by Sun (Surya). Associated with victory and righteousness. Deity: Vishvadevas. Decorative only.",
    shravana: "\u{1F442} Shravana (\u0936\u094D\u0930\u0935\u0923): 22nd nakshatra (10\xB0-23\xB020' Capricorn). Ruled by Moon (Chandra). Associated with listening, learning, and knowledge. Deity: Vishnu (preserver). NOT fortune-telling.",
    dhanishta: "\u{1F941} Dhanishta (\u0927\u0928\u093F\u0937\u094D\u0920\u093E): 23rd nakshatra (23\xB020' Capricorn-6\xB040' Aquarius). Ruled by Mars (Mangal). Associated with wealth, music, and rhythm. Deity: Eight Vasus. NO luck.",
    shatabhisha: "\u{1F4AB} Shatabhisha (\u0936\u0924\u092D\u093F\u0937\u093E): 24th nakshatra (6\xB040'-20\xB0 Aquarius). Ruled by Rahu. Associated with healing, secrets, and hundred physicians. Deity: Varuna (cosmic waters). Does NOT predict.",
    purva_bhadrapada: "\u26A1 Purva Bhadrapada (\u092A\u0942\u0930\u094D\u0935\u092D\u093E\u0926\u094D\u0930\u092A\u0926\u093E): 25th nakshatra (20\xB0 Aquarius-3\xB020' Pisces). Ruled by Jupiter (Guru). Associated with fire, transformation, and intensity. Deity: Aja Ekapada. NO guarantee.",
    uttara_bhadrapada: "\u{1F409} Uttara Bhadrapada (\u0909\u0924\u094D\u0924\u0930\u092D\u093E\u0926\u094D\u0930\u092A\u0926\u093E): 26th nakshatra (3\xB020'-16\xB040' Pisces). Ruled by Saturn (Shani). Associated with depth, wisdom, and serpent. Deity: Ahir Budhnya. Entertainment only.",
    revati: "\u{1F41F} Revati (\u0930\u0947\u0935\u0924\u0940): 27th nakshatra (16\xB040'-30\xB0 Pisces). Ruled by Mercury (Budha). Associated with journey's end, nourishment, and completion. Deity: Pushan (nourisher). NOT prediction."
  },
  birthstone: {
    january: "\u{1F48E} Garnet (January): Deep red birthstone traditionally associated with passion, energy, and regeneration in gemology. Symbolizes friendship and trust culturally. This theme does NOT predict winning numbers or provide any luck.",
    february: "\u{1F49C} Amethyst (February): Purple birthstone traditionally associated with peace, clarity, and protection. Historically worn for sobriety in folklore. Theme selection does NOT affect lottery outcomes or improve odds.",
    march: "\u{1F4A0} Aquamarine (March): Blue-green birthstone associated with courage, calm, and clarity. Named for sea water ('aqua marina') in Latin. This provides NO advantage in winning or predictive value.",
    april: "\u{1F48E} Diamond (April): Clear birthstone traditionally associated with strength, purity, and eternal love. Hardest natural substance on Earth scientifically. Theme is decorative only and does NOT guarantee results.",
    may: "\u{1F49A} Emerald (May): Green birthstone associated with fertility, rebirth, and wisdom in tradition. Prized by Cleopatra and ancient civilizations historically. This does NOT improve probability or predict outcomes.",
    june: "\u{1F90D} Pearl (June): Organic gem traditionally associated with purity, innocence, and wisdom. Formed naturally in oysters and mussels biologically. Theme is for entertainment only, NOT fortune-telling.",
    july: "\u2764\uFE0F Ruby (July): Red birthstone traditionally associated with passion, vitality, and protection. Called 'ratnaraj' (king of gems) in Sanskrit. This provides NO actual luck or winning advantage.",
    august: "\u{1F49A} Peridot (August): Lime-green birthstone associated with strength, healing, and prosperity in folklore. Formed deep in Earth's mantle geologically. Theme does NOT affect random number generation.",
    september: "\u{1F499} Sapphire (September): Blue birthstone traditionally associated with wisdom, loyalty, and nobility. Worn by royalty throughout history. This does NOT predict or guarantee any lottery results.",
    october: "\u{1F308} Opal (October): Multi-colored birthstone associated with creativity, imagination, and spontaneity. Displays unique color play phenomenon. Theme is for cultural interest only, NOT prediction.",
    november: "\u{1F7E1} Topaz (November): Golden birthstone associated with strength, wisdom, and abundance in tradition. Name may derive from Sanskrit 'tapas' (fire). This provides NO predictive value whatsoever.",
    december: "\u{1FA75} Turquoise (December): Blue-green birthstone associated with protection, healing, and good fortune in folklore. Sacred to many Native American tribes historically. Theme is cosmetic only, NOT fortune-telling."
  },
  native_american: {
    otter: "\u{1F9A6} Otter (Jan 20-Feb 18): Water animal totem in some Native American traditions. Associated with playfulness, curiosity, and unconventional thinking. This theme does NOT predict lottery outcomes or provide any luck.",
    wolf: "\u{1F43A} Wolf (Feb 19-Mar 20): Pack animal totem associated with loyalty, intuition, and spiritual guidance in various indigenous teachings. Theme selection does NOT affect probability or guarantee winning.",
    falcon: "\u{1F985} Falcon (Mar 21-Apr 19): Sky hunter totem associated with vision, focus, and leadership. Swift and decisive in folklore. This provides NO advantage in lottery outcomes whatsoever.",
    beaver: "\u{1F9AB} Beaver (Apr 20-May 20): Builder animal totem associated with hard work, determination, and resourcefulness. Dam-builder in nature. Theme is decorative only and does NOT guarantee results.",
    deer: "\u{1F98C} Deer (May 21-Jun 20): Gentle forest totem associated with sensitivity, grace, and adaptability. Quick and alert in teachings. This does NOT improve probability or predict outcomes.",
    woodpecker: "\u{1F426} Woodpecker (Jun 21-Jul 21): Drummer bird totem associated with rhythm, opportunity, and protection of home. Persistent in folklore. Theme is for entertainment only, NOT fortune-telling.",
    salmon: "\u{1F41F} Salmon (Jul 22-Aug 21): Swimming upstream totem associated with determination, wisdom, and instinct. Returns home in nature. This provides NO actual luck or winning advantage.",
    bear: "\u{1F43B} Bear (Aug 22-Sep 21): Powerful animal totem associated with strength, introspection, and healing. Hibernates and awakens in cycles. Theme does NOT affect random number generation.",
    raven: "\u{1F426}\u200D\u2B1B Raven (Sep 22-Oct 22): Clever bird totem associated with magic, transformation, and intelligence in many indigenous cultures. This does NOT predict or guarantee lottery results.",
    snake: "\u{1F40D} Snake (Oct 23-Nov 22): Transformative reptile totem associated with rebirth, healing, and mystery. Sheds skin in cycles. Theme is for cultural interest only, NOT prediction.",
    owl: "\u{1F989} Owl (Nov 23-Dec 21): Night hunter totem associated with wisdom, intuition, and seeing hidden truths. Silent flyer in nature. This provides NO predictive value whatsoever.",
    goose: "\u{1F9A2} Goose (Dec 22-Jan 19): Migratory bird totem associated with perseverance, community, and ambition. Flies in V-formation. Theme is cosmetic only, NOT fortune-telling."
  },
  rashi: {
    mesha: "\u2648 Mesha (\u092E\u0947\u0937 - Aries): First rashi in Vedic astrology. Traditionally ruled by Mars (Mangal). Associated with courage, leadership, and initiative in Jyotish tradition. This theme does NOT predict lottery outcomes or provide any actual luck.",
    vrishabha: "\u2649 Vrishabha (\u0935\u0943\u0937\u092D - Taurus): Second rashi. Traditionally ruled by Venus (Shukra) in Vedic system. Associated with stability, beauty, and prosperity culturally. Theme selection does NOT affect probability or guarantee winning.",
    mithuna: "\u264A Mithuna (\u092E\u093F\u0925\u0941\u0928 - Gemini): Third rashi. Traditionally ruled by Mercury (Budha) in Jyotish. Associated with communication, intellect, and duality. This provides NO advantage in lottery outcomes whatsoever.",
    karka: "\u264B Karka (\u0915\u0930\u094D\u0915 - Cancer): Fourth rashi. Traditionally ruled by Moon (Chandra) in Vedic astrology. Associated with emotion, nurturing, and intuition. Theme is for cultural education only, NOT fortune-telling.",
    simha: "\u264C Simha (\u0938\u093F\u0902\u0939 - Leo): Fifth rashi. Traditionally ruled by Sun (Surya) in Jyotish tradition. Associated with power, dignity, and authority. This does NOT improve odds or predict winning numbers.",
    kanya: "\u264D Kanya (\u0915\u0928\u094D\u092F\u093E - Virgo): Sixth rashi. Traditionally ruled by Mercury (Budha) in Vedic system. Associated with purity, service, and discrimination. Theme does NOT affect random number generation or outcomes.",
    tula: "\u264E Tula (\u0924\u0941\u0932\u093E - Libra): Seventh rashi. Traditionally ruled by Venus (Shukra) in Jyotish. Associated with balance, justice, and partnership culturally. This provides NO predictive value or winning advantage.",
    vrishchika: "\u264F Vrishchika (\u0935\u0943\u0936\u094D\u091A\u093F\u0915 - Scorpio): Eighth rashi. Traditionally ruled by Mars (Mangal) in Vedic astrology. Associated with transformation, intensity, and mystery. Theme is decorative only and does NOT guarantee results.",
    dhanu: "\u2650 Dhanu (\u0927\u0928\u0941 - Sagittarius): Ninth rashi. Traditionally ruled by Jupiter (Guru) in Jyotish. Associated with wisdom, philosophy, and expansion. This does NOT predict or improve lottery probability.",
    makara: "\u2651 Makara (\u092E\u0915\u0930 - Capricorn): Tenth rashi. Traditionally ruled by Saturn (Shani) in Vedic tradition. Associated with discipline, ambition, and karma. Theme is for entertainment only, NOT prediction.",
    kumbha: "\u2652 Kumbha (\u0915\u0941\u092E\u094D\u092D - Aquarius): Eleventh rashi. Traditionally ruled by Saturn (Shani) in Jyotish. Associated with service, innovation, and humanitarianism. This provides NO actual luck or winning advantage.",
    meena: "\u2653 Meena (\u092E\u0940\u0928 - Pisces): Twelfth rashi. Traditionally ruled by Jupiter (Guru) in Vedic astrology. Associated with spirituality, compassion, and transcendence culturally. Theme does NOT affect outcomes or guarantee any results."
  }
};
var modeEducation_default = MODE_EDUCATION;

// src/scripts/lucky.ts
var metaEnv = import.meta?.env ?? {};
var globalApi = typeof window !== "undefined" ? window.__LUCKY_API_BASE : void 0;
var API_ENV = metaEnv.PUBLIC_API_BASE ?? globalApi ?? "";
var API = API_ENV && String(API_ENV).trim() !== "" ? String(API_ENV).replace(/\/$/, "") : typeof location !== "undefined" && location.hostname === "localhost" ? `${location.protocol}//localhost:8000` : "";
var GAMES_ENDPOINT = API ? `${API}/games` : "/games";
var GENERATE_ENDPOINT = API ? `${API}/generate` : "/generate";
var mounted = false;
var form = null;
var out = null;
var gameSel = null;
var factsEl = null;
var games = [];
var submitBtn = null;
var isRateLimited = false;
function showToast(message, type = "warning", durationMs = 3e3) {
  let toast = document.getElementById("lucky-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "lucky-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast toast-${type} show`;
  setTimeout(() => {
    toast.classList.remove("show");
  }, durationMs);
}
function handleRateLimitCooldown(retryAfterSec) {
  if (isRateLimited || !submitBtn) return;
  isRateLimited = true;
  const originalText = submitBtn.textContent || "Generate Numbers";
  submitBtn.disabled = true;
  submitBtn.textContent = `Wait ${retryAfterSec}s...`;
  let remaining = retryAfterSec;
  const interval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      submitBtn.textContent = `Wait ${remaining}s...`;
    } else {
      clearInterval(interval);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      isRateLimited = false;
    }
  }, 1e3);
}
function readInitialGames() {
  const el = document.getElementById("initial-games");
  if (!el || !(el instanceof HTMLScriptElement)) return [];
  try {
    const parsed = JSON.parse(el.textContent || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function renderGameOptions(selectEl, list) {
  selectEl.innerHTML = list.map((g) => `<option value="${g.code}">${g.name}</option>`).join("");
}
async function fetchGames() {
  try {
    const r = await fetch(GAMES_ENDPOINT, { method: "GET", cache: "no-cache" });
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
function initLucky() {
  if (mounted) return;
  mounted = true;
  form = document.getElementById("genForm");
  out = document.getElementById("results");
  gameSel = document.querySelector('select[name="game"]');
  factsEl = document.getElementById("facts");
  submitBtn = document.getElementById("generateBtn") || document.querySelector('button[type="submit"]');
  if (!form || !out || !gameSel) return;
  try {
    let updateConditionalFields2 = function() {
      try {
        Object.values(map).forEach((id) => {
          document.querySelectorAll("#" + id).forEach((el) => {
            el.classList.add("hidden");
            try {
              el.style.display = "none";
            } catch (e) {
              console.debug(e);
            }
          });
        });
        const key = modeSelect instanceof HTMLSelectElement ? modeSelect.value : void 0;
        if (key && map[key]) {
          document.querySelectorAll("#" + map[key]).forEach((el) => {
            el.classList.remove("hidden");
            try {
              el.style.display = "block";
            } catch (e) {
              console.debug(e);
            }
          });
          if (map[key] === "modeKeyContainer") {
            try {
              const select = document.getElementById("modeKeySelect");
              if (select) {
                select.innerHTML = "";
                const cfg = cfgAny[String(key)];
                const items = cfg && cfg.items || [];
                const placeholder = document.createElement("option");
                placeholder.value = "";
                placeholder.textContent = "Choose an option...";
                placeholder.disabled = true;
                placeholder.selected = true;
                select.appendChild(placeholder);
                items.forEach((it) => {
                  const opt = document.createElement("option");
                  opt.value = String(it.key);
                  opt.textContent = `${it.emoji ? it.emoji + " " : ""}${it.label}`;
                  select.appendChild(opt);
                });
                try {
                  select.removeAttribute("disabled");
                } catch (e) {
                  console.debug(e);
                }
                try {
                  select.setAttribute("required", "required");
                } catch (e) {
                  console.debug(e);
                }
                try {
                  select.setAttribute("data-populated", "1");
                } catch (e) {
                  console.debug(e);
                }
                select.addEventListener("change", () => {
                  const educationContainer = document.getElementById("themeEducation");
                  const educationText = document.getElementById("themeEducationText");
                  if (educationContainer && educationText && select.value) {
                    const modeType = String(key);
                    const optionKey = select.value;
                    const educationData = modeEducation_default[modeType];
                    if (educationData && educationData[optionKey]) {
                      educationText.textContent = educationData[optionKey];
                      educationContainer.classList.remove("hidden");
                    } else {
                      educationContainer.classList.add("hidden");
                    }
                  }
                });
              }
            } catch (e) {
              console.debug(e);
            }
          }
        }
        return true;
      } catch (err) {
        console.debug(err);
        return false;
      }
    };
    var updateConditionalFields = updateConditionalFields2;
    const modeSelect = document.getElementById("modeSelect");
    const cfgAny = modeConfig_default;
    const map = {
      sum_target: "sumTargetField",
      birthday: "birthdayField",
      lucky: "luckyField",
      wheel: "wheelField",
      zodiac: "modeKeyContainer",
      gemstone: "modeKeyContainer",
      star_sign: "modeKeyContainer",
      jyotish: "modeKeyContainer",
      chinese_zodiac: "modeKeyContainer",
      favorite_color: "modeKeyContainer"
    };
    try {
      if (modeSelect) modeSelect.addEventListener("change", updateConditionalFields2);
    } catch (e) {
      console.debug(e);
    }
    try {
      window._genFormUpdate = updateConditionalFields2;
    } catch (e) {
      console.debug(e);
    }
    try {
      window.__GENFORM_READY = true;
    } catch (e) {
      console.debug(e);
    }
    try {
      updateConditionalFields2();
    } catch (e) {
      console.debug(e);
    }
  } catch (err) {
    try {
      window.__GENFORM_ERROR = String(err);
    } catch (e) {
      console.debug(e);
    }
  }
  const _form = form;
  const _out = out;
  const _gameSel = gameSel;
  const initialGames = readInitialGames();
  if (initialGames.length > 0) {
    games = initialGames;
    renderGameOptions(_gameSel, games);
    void loadFacts(_gameSel.value);
    setTimeout(async () => {
      const refreshed = await fetchGames();
      if (refreshed.length) {
        games = refreshed;
        renderGameOptions(_gameSel, games);
        void loadFacts(_gameSel.value);
      }
    }, 0);
  }
  const ensureGames = async () => {
    if (games.length) return games;
    games = await fetchGames();
    if (games.length) {
      renderGameOptions(_gameSel, games);
      if (_gameSel.value) await loadFacts(_gameSel.value);
    }
    return games;
  };
  (async () => {
    await ensureGames();
    _gameSel.addEventListener("change", () => loadFacts(_gameSel.value));
    if (_gameSel.value) await loadFacts(_gameSel.value);
    _form.addEventListener("submit", async (e) => {
      e.preventDefault();
      _out.innerHTML = "";
      const fd = new FormData(_form);
      const game = String(fd.get("game") || "");
      const mode = String(fd.get("mode") || "uniform");
      const sets = Math.min(10, Math.max(1, parseInt(String(fd.get("sets") || "1"), 10)));
      const modeMap = {
        uniform: "random",
        spaced: "spaced",
        random: "random",
        balanced: "balanced",
        odd_even_mix: "odd_even_mix",
        sum_target: "sum_target",
        pattern_avoid: "pattern_avoid",
        hot: "hot",
        cold: "cold",
        birthday: "birthday",
        lucky: "lucky",
        wheel: "wheel"
      };
      const mappedMode = modeMap[mode] || "random";
      const payload = { game_code: game, mode: mappedMode, sets };
      if (mode === "sum_target") {
        const targetSum = fd.get("target_sum");
        if (targetSum) payload.target_sum = parseInt(String(targetSum), 10);
      } else if (mode === "birthday") {
        const birthDate = fd.get("birth_date");
        if (birthDate) payload.birth_date = String(birthDate);
      } else if (mode === "lucky") {
        const luckyNumbers = fd.get("lucky_numbers");
        if (luckyNumbers) {
          const numbers = String(luckyNumbers).split(",").map((n) => parseInt(n.trim(), 10)).filter((n) => Number.isFinite(n));
          if (numbers.length > 0) payload.lucky_numbers = numbers;
        }
      } else if (mode === "wheel") {
        const wheelType = fd.get("wheel_type");
        if (wheelType) payload.wheel_type = String(wheelType);
      } else if (["zodiac", "gemstone", "star_sign", "jyotish", "chinese_zodiac", "favorite_color"].includes(mode)) {
        const mk = fd.get("mode_key");
        if (mk) payload.mode_key = String(mk);
      }
      const requests = Array.from(
        { length: sets },
        () => fetch(GENERATE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).then(async (res) => {
          const text = await res.text();
          if (!res.ok) {
            let msg = text || res.statusText || "Unknown error";
            let retryAfter = 2;
            try {
              const json = JSON.parse(text || "{}");
              msg = json?.detail || json?.message || msg;
              if (json?.retry_after) retryAfter = parseInt(json.retry_after, 10) || 2;
            } catch {
            }
            const headerRetry = res.headers.get("Retry-After");
            if (headerRetry) retryAfter = parseInt(headerRetry, 10) || retryAfter;
            if (typeof msg !== "string") msg = JSON.stringify(msg);
            return { ok: false, message: msg, status: res.status, retryAfter };
          }
          try {
            return { ok: true, data: JSON.parse(text || "{}") };
          } catch {
            return { ok: true, data: { message: text } };
          }
        }).catch((err) => ({ ok: false, message: String(err), status: 0 }))
      );
      const results = await Promise.all(requests);
      results.forEach((result, idx) => {
        if (!result.ok) {
          if (result.status === 429) {
            const retryAfter = result.retryAfter || 2;
            showToast(`Slow down! Try again in ${retryAfter}s`, "warning", 2500);
            handleRateLimitCooldown(retryAfter);
            return;
          }
          _out.innerHTML += `<div class="text-red-400">Error ${result.status}: ${result.message}</div>`;
          return;
        }
        const d = result.data;
        const modeDisplay = String(mode).replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
        let modeBadgeHtml = "";
        try {
          const actualMode = d && d.mode || mode;
          const key = d && d.mode_key || (fd.get("mode_key") ? String(fd.get("mode_key")) : null);
          if (key && actualMode) {
            const cfg = modeConfig_default[actualMode];
            if (cfg && cfg.items) {
              const found = cfg.items.find((it) => String(it.key) === String(key));
              if (found) modeBadgeHtml = `<div class="text-xs mt-1">Mode: <span class="font-semibold">${found.emoji ? found.emoji + " " : ""}${found.label}</span></div>`;
            }
          }
        } catch (e2) {
          console.debug(e2);
        }
        const numbersHtml = Array.isArray(d.numbers) ? d.numbers.map((n) => `<span class="result-chip text-emerald-400 font-semibold">${n}</span>`).join(", ") : d.numbers || "\u2014";
        const bonusHtml = d.bonus ? `<span class="result-chip text-emerald-400 font-semibold">${d.bonus}</span>` : "";
        let lastInfoHtml = "";
        if (d.last_number_info) {
          let infoText = "";
          try {
            if (typeof d.last_number_info === "string") infoText = d.last_number_info;
            else if (Array.isArray(d.last_number_info)) infoText = d.last_number_info.join(", ");
            else if (d.last_number_info.message) infoText = String(d.last_number_info.message);
            else if (d.last_number_info.latency_ms) infoText = `Latency: ${d.last_number_info.latency_ms}ms`;
            else infoText = JSON.stringify(d.last_number_info);
          } catch {
            infoText = String(d.last_number_info);
          }
          if (infoText && infoText !== "{}" && infoText !== "null") {
            lastInfoHtml = `<div class="text-xs text-slate-400 mt-1">${infoText}</div>`;
          }
        }
        const singleOddsDisplay = d.odds || (d.combined_odds ? `1 in ${Number(d.combined_odds).toLocaleString()}` : d.main_odds ? `1 in ${Number(d.main_odds).toLocaleString()}` : "\u2014");
        const singlePct = Number(d.probability_percent || 0).toFixed(6);
        const gameCode = game || d.game || "";
        const oddsLinkHref = `/lottery-odds${gameCode ? `?game=${encodeURIComponent(gameCode)}` : ""}`;
        let combinedSetsHtml = "";
        if (d.combined_sets_odds) {
          const combinedOddsNum = Number(d.combined_sets_odds);
          const combinedOddsDisplay = Number.isFinite(combinedOddsNum) ? `1 in ${Math.round(combinedOddsNum).toLocaleString()}` : String(d.combined_sets_odds);
          const combinedPct = Number(d.combined_sets_probability_percent || 0).toFixed(8);
          combinedSetsHtml = `<div class="text-xs mt-1" style="color: var(--text-muted)">${sets} sets combined: <span class="font-semibold odds-number">${combinedOddsDisplay}</span> (${combinedPct}% chance)</div>`;
        }
        _out.innerHTML += `
            <div class="result-card">
              <div class="text-sm" style="color: var(--text-secondary)">Set ${idx + 1} \u2022 ${modeDisplay}</div>
            ${modeBadgeHtml}
              <div class="text-xl mt-1" style="color: var(--text-primary)">Numbers: <b>${numbersHtml}</b>${d.bonus ? ` | Bonus: <b>${bonusHtml}</b>` : ""}</div>
              <div class="text-xs mt-2" style="color: var(--text-muted)">
                Odds: <span class="font-semibold odds-number">${singleOddsDisplay}</span> (${singlePct}% chance)
              </div>
              <a href="${oddsLinkHref}" class="odds-link">View full odds &amp; math \u2192</a>
              ${combinedSetsHtml}
              ${lastInfoHtml}
            </div>`;
      });
      if (typeof window !== "undefined" && window.adsbygoogle && sets > 0) {
        try {
          window.adsbygoogle.push({});
        } catch (e2) {
          console.warn("Ad refresh failed:", e2);
        }
      }
    });
    try {
      _form.__handledByLucky = true;
    } catch (e) {
      console.debug(e);
    }
  })();
}
async function loadFacts(code) {
  const g = games.find((x) => x.code === code);
  if (!g) {
    if (factsEl) factsEl.innerHTML = "";
    return;
  }
  const white = `${g.white_min}\u2013${g.white_max} \xD7 ${g.white_count}`;
  const bonus = g.bonus_min && g.bonus_max && g.bonus_count > 0 ? `${g.bonus_min}\u2013${g.bonus_max} \xD7 ${g.bonus_count}` : null;
  const oddsLinks = {
    powerball: "https://www.powerball.com/powerball-prize-chart",
    megamillions: "https://www.megamillions.com/How-to-Play.aspx",
    ca_superlotto: "https://www.calottery.com/en/draw-games/superlotto-plus#section-content-4-3",
    ca_fantasy5: "https://www.calottery.com/en/draw-games/fantasy-5#section-content-4-3",
    ca_daily3: "https://www.calottery.com/en/draw-games/daily-3#section-content-4-3",
    ca_daily4: "https://www.calottery.com/en/draw-games/daily-4#section-content-4-3",
    ny_take5: "https://nylottery.ny.gov/draw-game?game=take5#odds_prizes",
    tx_lotto: "https://www.texaslottery.com/export/sites/lottery/Games/Lotto_Texas/index.html#HowToPlay"
  };
  if (factsEl) {
    factsEl.innerHTML = `
      <div class="rounded-xl bg-slate-900/60 p-4 text-sm">
        <div><b>${g.name}</b></div>
        <div>Whites: ${white}</div>
        ${bonus ? `<div>Bonus: ${bonus}</div>` : ""}
        <a class="underline text-emerald-300" href="${oddsLinks[g.code] || "#"}" target="_blank" rel="noopener">Odds & rules</a>
      </div>`;
  }
}
var fixMonochromeButton = () => {
  const btn = document.getElementById("generateBtn") || document.querySelector('button[type="submit"]');
  if (btn && document.documentElement.dataset.theme === "monochrome-light") {
    btn.style.color = "#000";
    btn.style.backgroundColor = "#fff";
  }
};
fixMonochromeButton();
var mo = new MutationObserver(fixMonochromeButton);
mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
try {
  Promise.resolve().then(() => (init_tracking(), tracking_exports)).then(({ track: track2 }) => {
    if (typeof window !== "undefined") {
      try {
        window.__LUCKY_EVENTS = window.__LUCKY_EVENTS || [];
        window.track = window.track || track2;
        document.addEventListener("click", (ev) => {
          try {
            let tgt = ev.target;
            if (!(tgt instanceof Element)) tgt = tgt && tgt.parentElement || null;
            if (!tgt) return;
            const el = tgt.closest && tgt.closest("[data-track-event]");
            if (!el) return;
            const eventName = el.dataset.trackEvent || "link_click";
            let props = {};
            if (el.dataset.trackProps) {
              try {
                props = JSON.parse(el.dataset.trackProps);
              } catch (e) {
                console.debug(e);
                props = {};
              }
            }
            if (typeof window.track === "function") {
              try {
                window.track(eventName, { href: el.getAttribute && el.getAttribute("href"), ...props });
              } catch (e) {
                console.debug(e);
              }
            }
          } catch {
          }
        }, false);
      } catch {
      }
    }
  }).catch(() => {
  });
} catch {
}
export {
  initLucky
};
