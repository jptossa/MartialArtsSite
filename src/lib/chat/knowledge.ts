import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "martial-arts");

let cached: Promise<string> | undefined;

// All martial art write-ups as <document> blocks. The file name (minus .txt)
// is the art's slug, which the chatbot uses for /martial-arts/<slug> links.
export function getKnowledge(): Promise<string> {
  cached ??= loadKnowledge().catch((error) => {
    cached = undefined; // don't cache a failed read
    throw error;
  });
  return cached;
}

async function loadKnowledge(): Promise<string> {
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".txt"));
  files.sort();
  const docs = await Promise.all(
    files.map(async (file) => {
      const text = await readFile(path.join(CONTENT_DIR, file), "utf8");
      const slug = file.replace(/\.txt$/, "");
      return `<document slug="${slug}">\n${text.trim()}\n</document>`;
    }),
  );
  return docs.join("\n\n");
}
