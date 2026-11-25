// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes the monologue to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR)
// and prints it to stdout. Self-checking gate: exits non-zero unless
// the entry is exactly 100 words and within the 1-600 char gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Hero, sit. Not the throne, the stool. The throne pinches. Listen. " +
  "Three hundred years I have kept the Ember Crown burning, and what thanks? " +
  "The northern barons send goats. Goats. My ravens unionised. " +
  "Even the dungeon mould has opinions now. You came to end me, sword shining, " +
  "speech rehearsed. I heard it through the door. Twice. You fluffed the third line. " +
  "So, here is my offer. Take the crown. Take the ledger, the tariffs, " +
  "the dripping tap in the east wing. Rule it all. I shall be in the garden, " +
  "talking to the roses. They never ask for an audience.";

const words = ENTRY.trim().split(/\s+/);
if (words.length !== 100) {
  console.error(`gate: word count ${words.length}, expected 100`);
  process.exit(1);
}
if (ENTRY.length < 1 || ENTRY.length > 600) {
  console.error(`gate: char count ${ENTRY.length}, expected 1-600`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Read-back check: the file on disk must be exactly what we intended.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== ENTRY) {
  console.error("gate: entry.txt on disk differs from ENTRY");
  process.exit(1);
}
if (onDisk.trim().split(/\s+/).length !== 100 || onDisk.trim().length === 0) {
  console.error("gate: entry.txt on disk failed word-count check");
  process.exit(1);
}
console.log(ENTRY);
console.log(`\n[gate ok] words=${words.length} chars=${ENTRY.length}`);
