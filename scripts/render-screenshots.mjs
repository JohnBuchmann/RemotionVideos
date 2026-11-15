import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const copy = JSON.parse(readFileSync(join(root, "src/screenshots/screenshots.json"), "utf8"));

for (const [locale, screenshots] of Object.entries(copy)) {
  const outDir = join(root, "out/screenshots", locale);
  mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < screenshots.length; i++) {
    const id = `Screenshot-${locale}-${i + 1}`;
    const out = join(outDir, `${i + 1}.png`);
    execFileSync("npx", ["remotion", "still", id, out], {
      cwd: root,
      stdio: "inherit",
    });
  }
}

