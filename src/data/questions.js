/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 💝 QUESTIONS CONFIGURATION FILE 💝
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * EDIT YOUR QUESTIONS HERE!
 * 
 * Each question object has:
 * - id: unique identifier (number)
 * - question: the question text displayed to your girlfriend
 * - type: "radio" (multiple choice), "text" (type answer) or "valentine" (special)
 * - options: array of choices (only for type: "radio")
 * - answer: the correct answer (CASE-INSENSITIVE for text inputs)
 * - hint: optional hint shown below the question
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const QUESTIONS = [
  {
    id: 1,
    question: "Începem ușor, în ce dată am devenit oficial un cuplu? 💕",
    type: "text",
    answer: "09/06/2024", // ← CHANGE THIS to your anniversary date
    hint: "Format: ZZ/LL/AAAA"
  },
  {
    id: 2,
    question: "Unde am ieșit la primul date? 🍕",
    type: "radio",
    options: [
      "McDonald's",
      "Pizza Hut",
      "KFC",
      "La o cafenea"
    ],
    answer: "Pizza Hut", // ← CHANGE THIS to the correct answer
    hint: "Mmmm, ce bună a fost mâncarea..."
  },
  {
    id: 3,
    question: "În ce oraș am fost prima dată de ziua ta? 🎂",
    type: "text",
    answer: "brasov", // ← CHANGE THIS to the correct answer (case-insensitive)
    hint: "Un oraș de munte..."
  },
  {
    id: 4,
    question: "Chiar mă iubești? 🥺",
    type: "radio",
    options: [
      "Da",
      "Da",
      "Da",
      "Da"
    ],
    answer: "Da", // ← CHANGE THIS to the correct answer
    hint: "Asta e ușoară... sau nu? 😏"
  },
  {
    id: 5,
    question: "Care este lucrul pe care îl fac și te enervează cel mai tare? 😅",
    type: "radio",
    options: [
      "Las becul aprins",
      "Nu răspund la mesaje",
      "Uit de aniversări",
      "Sforăi"
    ],
    answer: "Las becul aprins", // ← CHANGE THIS to the correct answer
    hint: "Ceva legat de... lumină? 💡"
  },
  {
    id: 6,
    question: "Vrei să fii Valentine-ul meu? 💝",
    type: "valentine", // Special type for the Valentine question
    hint: null
  }
];

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎁 GIFT REVEAL CONFIGURATION 🎁
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Configure the final gift reveal here!
 * 
 * TARGET_DATE: When the gift can be revealed (Year, Month (0-indexed!), Day, Hour, Minute)
 *              Note: January = 0, February = 1, etc.
 * 
 * GIFT_CONFIG: The actual gift content
 * ═══════════════════════════════════════════════════════════════════════════
 */

// 🗓️ CHANGE THIS DATE! (February 14th, 2026 at 6:00 PM)
// Remember: Month is 0-indexed (January = 0, February = 1)
export const TARGET_DATE = new Date(2026, 1, 14, 0, 0, 0); // Feb 14, 2026, 00:00 AM

export const GIFT_CONFIG = {
  // 💌 The romantic message shown with the gift
  message: "Iubirea mea, ai dovedit că mă cunoști cu adevărat... Acum e timpul pentru surpriza ta!",
  
  // 🎁 The gift details
  giftTitle: "Surpriza Ta de Valentine's Day",
  giftDescription: "Cadoul tău te așteaptă ascuns undeva în casă...",
  
  // 📍 Location or additional info
  location: "Caută în dormitor, sub pernă! 🛏️", // ← CHANGE THIS to the location in your house
  
  // 🖼️ Gift image URL (can be a local image in /public folder or external URL)
  giftImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=400&fit=crop",
  
  // 🔗 Optional link (not needed for home location, but you can keep it)
  giftLink: null, // Set to null since the gift is at home
  giftLinkText: null
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⏱️ LOCKOUT CONFIGURATION ⏱️
 * ═══════════════════════════════════════════════════════════════════════════
 */

// How long to lock out after a wrong answer (in minutes)
export const LOCKOUT_DURATION_MINUTES = 10;

// Mesaje amuzante afișate în timpul blocării (selectate aleatoriu)
export const LOCKOUT_MESSAGES = [
  "Ups! Gândește-te mai bine, iubirea mea! 🤔",
  "Nu chiar... Poate ai nevoie de mai multă cafea? ☕",
  "Hmm, nu a fost asta! Chiar mă cunoști? 😏",
  "Răspuns greșit! E timpul să te gândești la amintirile noastre... 💭",
  "Frumoasă încercare! Dar va trebui să aștepți puțin acum... 😘"
];
