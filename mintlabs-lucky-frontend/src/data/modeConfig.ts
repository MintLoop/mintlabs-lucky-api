export const MODE_CONFIG = {
  zodiac: {
    label: 'Zodiac',
    items: [
      { key: 'aries', label: 'Aries', emoji: '♈', seed: 'zodiac:aries' },
      { key: 'taurus', label: 'Taurus', emoji: '♉', seed: 'zodiac:taurus' },
      { key: 'gemini', label: 'Gemini', emoji: '♊', seed: 'zodiac:gemini' },
      { key: 'cancer', label: 'Cancer', emoji: '♋', seed: 'zodiac:cancer' },
      { key: 'leo', label: 'Leo', emoji: '♌', seed: 'zodiac:leo' },
      { key: 'virgo', label: 'Virgo', emoji: '♍', seed: 'zodiac:virgo' },
      { key: 'libra', label: 'Libra', emoji: '♎', seed: 'zodiac:libra' },
      { key: 'scorpio', label: 'Scorpio', emoji: '♏', seed: 'zodiac:scorpio' },
      { key: 'sagittarius', label: 'Sagittarius', emoji: '♐', seed: 'zodiac:sagittarius' },
      { key: 'capricorn', label: 'Capricorn', emoji: '♑', seed: 'zodiac:capricorn' },
      { key: 'aquarius', label: 'Aquarius', emoji: '♒', seed: 'zodiac:aquarius' },
      { key: 'pisces', label: 'Pisces', emoji: '♓', seed: 'zodiac:pisces' },
    ],
  },
  chinese_zodiac: {
    label: 'Chinese Zodiac',
    items: [
      { key: 'rat', label: 'Rat', emoji: '🐀', seed: 'chinese:rat' },
      { key: 'ox', label: 'Ox', emoji: '🐂', seed: 'chinese:ox' },
      { key: 'tiger', label: 'Tiger', emoji: '🐅', seed: 'chinese:tiger' },
      { key: 'rabbit', label: 'Rabbit', emoji: '🐇', seed: 'chinese:rabbit' },
      { key: 'dragon', label: 'Dragon', emoji: '🐉', seed: 'chinese:dragon' },
      { key: 'snake', label: 'Snake', emoji: '🐍', seed: 'chinese:snake' },
      { key: 'horse', label: 'Horse', emoji: '🐎', seed: 'chinese:horse' },
      { key: 'goat', label: 'Goat', emoji: '🐐', seed: 'chinese:goat' },
      { key: 'monkey', label: 'Monkey', emoji: '🐒', seed: 'chinese:monkey' },
      { key: 'rooster', label: 'Rooster', emoji: '🐓', seed: 'chinese:rooster' },
      { key: 'dog', label: 'Dog', emoji: '🐕', seed: 'chinese:dog' },
      { key: 'pig', label: 'Pig', emoji: '🐖', seed: 'chinese:pig' },
    ],
  },
  favorite_color: {
    label: 'Color',
    items: [
      { key: 'blue', label: 'Blue', emoji: '🔵', seed: 'color:blue', color: 'blue' },
      { key: 'green', label: 'Green', emoji: '🟢', seed: 'color:green', color: 'green' },
      { key: 'red', label: 'Red', emoji: '🔴', seed: 'color:red', color: 'red' },
      { key: 'purple', label: 'Purple', emoji: '🟣', seed: 'color:purple', color: 'purple' },
      { key: 'black', label: 'Black', emoji: '⚫', seed: 'color:black', color: 'gray-800' },
      { key: 'yellow', label: 'Yellow', emoji: '🟡', seed: 'color:yellow', color: 'yellow' },
    ],
  },
  gemstone: {
    label: 'Gemstone',
    items: [
      { key: 'ruby', label: 'Ruby', emoji: '💎', seed: 'gem:ruby' },
      { key: 'sapphire', label: 'Sapphire', emoji: '🔷', seed: 'gem:sapphire' },
      { key: 'emerald', label: 'Emerald', emoji: '💚', seed: 'gem:emerald' },
      { key: 'opal', label: 'Opal', emoji: '🌈', seed: 'gem:opal' },
      { key: 'topaz', label: 'Topaz', emoji: '🟦', seed: 'gem:topaz' },
      { key: 'amethyst', label: 'Amethyst', emoji: '🟪', seed: 'gem:amethyst' },
    ],
  },
  jyotish: {
    label: 'Jyotish',
    items: [
      { key: 'ashwini', label: 'Ashwini', emoji: '🌟', seed: 'jyotish:ashwini' },
      { key: 'bharani', label: 'Bharani', emoji: '🌙', seed: 'jyotish:bharani' },
      { key: 'krittika', label: 'Krittika', emoji: '🔥', seed: 'jyotish:krittika' },
      { key: 'rohini', label: 'Rohini', emoji: '🌾', seed: 'jyotish:rohini' },
      { key: 'mrigashira', label: 'Mrigashira', emoji: '🌿', seed: 'jyotish:mrigashira' },
      { key: 'pushya', label: 'Pushya', emoji: '🔆', seed: 'jyotish:pushya' },
    ],
  },
  birthstone: {
    label: 'Birth Month',
    items: [
      { key: 'january', label: 'January (Garnet)', emoji: '💎', seed: 'birthstone:january' },
      { key: 'february', label: 'February (Amethyst)', emoji: '💜', seed: 'birthstone:february' },
      { key: 'march', label: 'March (Aquamarine)', emoji: '💠', seed: 'birthstone:march' },
      { key: 'april', label: 'April (Diamond)', emoji: '💎', seed: 'birthstone:april' },
      { key: 'may', label: 'May (Emerald)', emoji: '💚', seed: 'birthstone:may' },
      { key: 'june', label: 'June (Pearl)', emoji: '🤍', seed: 'birthstone:june' },
      { key: 'july', label: 'July (Ruby)', emoji: '❤️', seed: 'birthstone:july' },
      { key: 'august', label: 'August (Peridot)', emoji: '💚', seed: 'birthstone:august' },
      { key: 'september', label: 'September (Sapphire)', emoji: '💙', seed: 'birthstone:september' },
      { key: 'october', label: 'October (Opal)', emoji: '🌈', seed: 'birthstone:october' },
      { key: 'november', label: 'November (Topaz)', emoji: '🟡', seed: 'birthstone:november' },
      { key: 'december', label: 'December (Turquoise)', emoji: '🩵', seed: 'birthstone:december' },
    ],
  },
  rashi: {
    label: 'Indian Zodiac (Rashi)',
    items: [
      { key: 'mesha', label: 'Mesha (Aries)', emoji: '♈', seed: 'rashi:mesha' },
      { key: 'vrishabha', label: 'Vrishabha (Taurus)', emoji: '♉', seed: 'rashi:vrishabha' },
      { key: 'mithuna', label: 'Mithuna (Gemini)', emoji: '♊', seed: 'rashi:mithuna' },
      { key: 'karka', label: 'Karka (Cancer)', emoji: '♋', seed: 'rashi:karka' },
      { key: 'simha', label: 'Simha (Leo)', emoji: '♌', seed: 'rashi:simha' },
      { key: 'kanya', label: 'Kanya (Virgo)', emoji: '♍', seed: 'rashi:kanya' },
      { key: 'tula', label: 'Tula (Libra)', emoji: '♎', seed: 'rashi:tula' },
      { key: 'vrishchika', label: 'Vrishchika (Scorpio)', emoji: '♏', seed: 'rashi:vrishchika' },
      { key: 'dhanu', label: 'Dhanu (Sagittarius)', emoji: '♐', seed: 'rashi:dhanu' },
      { key: 'makara', label: 'Makara (Capricorn)', emoji: '♑', seed: 'rashi:makara' },
      { key: 'kumbha', label: 'Kumbha (Aquarius)', emoji: '♒', seed: 'rashi:kumbha' },
      { key: 'meena', label: 'Meena (Pisces)', emoji: '♓', seed: 'rashi:meena' },
    ],
  },
  // star_sign is an alias of zodiac for now — kept for compatibility
  star_sign: {
    label: 'Star Sign',
    items: [],
  },
};

// alias star_sign to zebra (copy zodiac items) to keep both references valid
MODE_CONFIG.star_sign.items = MODE_CONFIG.zodiac.items.slice();

export default MODE_CONFIG;
