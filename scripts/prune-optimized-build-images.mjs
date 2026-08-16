import { access, readdir, rm } from "node:fs/promises";
import path from "node:path";

const originalsRoot = path.resolve("dist/client/projects");
const webpRoot = path.resolve("dist/client/projects-webp");
let removed = 0;
let removedVideos = 0;

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(source);
      continue;
    }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;

    const relative = path.relative(originalsRoot, source);
    const optimized = path.join(webpRoot, relative.replace(/\.(png|jpe?g)$/i, ".webp"));
    if (await exists(optimized)) {
      await rm(source);
      removed += 1;
    }

    continue;
  }

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) continue;
    if (!/\.mp4$/i.test(entry.name) || /-web\.mp4$/i.test(entry.name)) continue;
    const webVersion = source.replace(/\.mp4$/i, "-web.mp4");
    if (await exists(webVersion)) {
      await rm(source);
      removedVideos += 1;
    }
  }
}

if (await exists(originalsRoot) && await exists(webpRoot)) await visit(originalsRoot);
console.log(`Pruned ${removed} original images duplicated by WebP files from the deploy build.`);
console.log(`Pruned ${removedVideos} original videos duplicated by web-optimized MP4 files from the deploy build.`);
