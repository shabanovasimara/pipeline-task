const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const htmlPath = path.join(srcDir, "index.html");
const cssPath = path.join(srcDir, "style.css");
const jsPath = path.join(srcDir, "script.js");

for (const requiredPath of [htmlPath, cssPath, jsPath]) {
  assert.ok(fs.existsSync(requiredPath), `Missing required file: ${requiredPath}`);
}

const html = fs.readFileSync(htmlPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const js = fs.readFileSync(jsPath, "utf8");

assert.equal((html.match(/<!DOCTYPE html>/g) || []).length, 1, "index.html must contain a single DOCTYPE");
assert.match(html, /<script src="script\.js"><\/script>/, "index.html must load script.js");
assert.match(html, /<link rel="stylesheet" href="style\.css">/, "index.html must load style.css");
assert.match(css, /\.hero\s*\{/, "style.css must define hero styles");
assert.match(js, /function enterWorld\(\)/, "script.js must define enterWorld()");

console.log("Validation checks passed.");
