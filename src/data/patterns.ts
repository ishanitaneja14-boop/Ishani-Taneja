import { CrochetPattern } from '../types';

export const CROCHET_PATTERNS: CrochetPattern[] = [
  {
    id: 'pattern-amanita-keychain',
    title: 'Mini Amanita Toadstool Keychain',
    subtitle: 'A quick 40-minute project with metal split-ring anchoring steps',
    difficulty: 'Beginner',
    estimatedTime: '40 mins',
    hookRecommended: '2.5mm (US B/1 or C/2)',
    yarnRecommended: 'Fingering / Sport weight cotton in Scarlet Red & Cream Linen',
    hardwareNeeded: '25mm split keyring + optional 8mm wooden bead',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    description:
      'A whimsical miniature mushroom keychain featuring a domed red cap with french-knot spots and a securely embedded key loop that withstands everyday bag tugging.',
    glossary: [
      { term: 'MR', explanation: 'Magic Ring / Adjustable Loop' },
      { term: 'sc', explanation: 'Single crochet (US terminology)' },
      { term: 'inc', explanation: 'Increase (2 single crochets in the same stitch)' },
      { term: 'dec', explanation: 'Invisible decrease (sc2tog through front loops only)' },
      { term: 'BLO', explanation: 'Back loop only' },
      { term: 'sl st', explanation: 'Slip stitch to finish' }
    ],
    steps: [
      { round: 1, instruction: 'In Red yarn: 6 sc into Magic Ring (do not join, work in continuous spiral rounds)', stitchCount: 6, tip: 'Use contrasting scrap thread as a running marker' },
      { round: 2, instruction: 'inc in each of the 6 stitches around', stitchCount: 12, tip: 'Keep tension tight so no fiber filling peeks through' },
      { round: 3, instruction: '[1 sc, 1 inc] repeat 6 times', stitchCount: 18 },
      { round: 4, instruction: '1 sc in each st around (shapes the downward cap curve)', stitchCount: 18 },
      { round: 5, instruction: '[2 sc, 1 inc] repeat 6 times', stitchCount: 24 },
      { round: 6, instruction: 'In BLO: [2 sc, 1 dec] repeat 6 times. Fasten off Red, leave a 6" tail.', stitchCount: 18, tip: 'The unworked front loops create the natural cap rim!' },
      { round: 7, instruction: 'Switch to Cream yarn for stem: In BLO: [1 sc, 1 dec] repeat 6 times', stitchCount: 12 },
      { round: 8, instruction: 'Stuff cap gently. 1 sc in each st around for 3 rounds (Rounds 8-10)', stitchCount: 12 },
      { round: 9, instruction: '[1 sc, 1 dec] repeat 4 times, stuff stem firmly with cotton', stitchCount: 8 },
      { round: 10, instruction: 'Hardware mount: Thread key loop wire or double-strand cotton through top cap, knot inside before final 4 dec to close hole tightly!', stitchCount: 4, tip: 'Pull tightly and embroider 6-8 French knots on cap!' }
    ]
  },
  {
    id: 'pattern-leafy-sprout-keychain',
    title: 'Woodland Sprout Leaf Keyring',
    subtitle: 'A 20-minute scrap-buster keychain with twin heart-shaped leaves',
    difficulty: 'Beginner',
    estimatedTime: '20 mins',
    hookRecommended: '3.0mm (US D/3)',
    yarnRecommended: 'Sport or DK cotton in Forest Moss Green',
    hardwareNeeded: 'Antique brass swivel snap hook or 20mm keyring',
    image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80',
    description:
      'Two cheerful heart-shaped leaves connected by a resilient crochet vine cord. Loop onto keyrings, airpod cases, or zipper pulls.',
    glossary: [
      { term: 'ch', explanation: 'Chain stitch' },
      { term: 'hdc', explanation: 'Half double crochet' },
      { term: 'dc', explanation: 'Double crochet' },
      { term: 'tr', explanation: 'Treble crochet' }
    ],
    steps: [
      { round: 1, instruction: 'First Leaf: In Magic Ring work [ch 2, 2 dc, 1 tr, ch 1, 1 tr (leaf tip), 2 dc, ch 2, sl st in ring]', stitchCount: 10, tip: 'Pull ring tight to form plump leaf' },
      { round: 2, instruction: 'Without cutting yarn, slide hook through your metal key clasp and chain 35 stitches firmly', stitchCount: 35, tip: 'Anchor directly onto the hardware loop' },
      { round: 3, instruction: 'Second Leaf: In 4th ch from hook, work [2 dc, 1 tr, ch 1, 1 tr, 2 dc, ch 2, sl st into same ch]', stitchCount: 10 },
      { round: 4, instruction: 'Fasten off securely. Knot ends into leaf centers and clip flush.', stitchCount: 0 }
    ]
  }
];
