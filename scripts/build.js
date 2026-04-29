const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const distDir = path.join(rootDir, "dist");

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
  if (!entry.isFile()) {
    continue;
  }

  fs.copyFileSync(
    path.join(srcDir, entry.name),
    path.join(distDir, entry.name),
  );
}

const buildInfo = [
  `Build completed at ${new Date().toISOString()}`,
  `Branch: ${process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || "local"}`,
  `Commit: ${process.env.GITHUB_SHA || "local"}`,
  `Run ID: ${process.env.GITHUB_RUN_ID || "local"}`,
].join("\n");

fs.writeFileSync(path.join(distDir, "BUILD_INFO.txt"), `${buildInfo}\n`);
