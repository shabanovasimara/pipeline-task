const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const releaseDir = path.join(rootDir, "release");

if (!fs.existsSync(distDir)) {
  throw new Error("dist directory is missing. Run the build step before deployment.");
}

fs.rmSync(releaseDir, { recursive: true, force: true });
fs.mkdirSync(releaseDir, { recursive: true });

const deployedFiles = fs
  .readdirSync(distDir, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);

const report = [
  "Deployment simulation completed successfully.",
  `Environment: ${process.env.DEPLOY_ENV || "production-simulated"}`,
  `Branch: ${process.env.GITHUB_REF_NAME || "local"}`,
  `Commit: ${process.env.GITHUB_SHA || "local"}`,
  `Run ID: ${process.env.GITHUB_RUN_ID || "local"}`,
  `Artifacts prepared: ${deployedFiles.join(", ")}`,
].join("\n");

fs.writeFileSync(path.join(releaseDir, "DEPLOY_REPORT.txt"), `${report}\n`);
