import fs from 'node:fs';
import path from 'node:path';

// Start every run with no screenshots so compose.mjs never pairs images from an earlier run.
export default function globalSetup() {
  fs.rmSync(path.join(__dirname, 'report', 'screens'), { recursive: true, force: true });
}
