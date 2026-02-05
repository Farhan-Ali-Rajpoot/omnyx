import fs from "fs";

const svg = fs.readFileSync("world-map.tsx", "utf8");

function cssToJs(style) {
  return style
    .split(";")
    .filter(Boolean)
    .map(rule => {
      let [key, value] = rule.split(":").map(s => s.trim());
      key = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

      if (!isNaN(value)) {
        return `${key}: ${value}`;
      }

      return `${key}: "${value}"`;
    })
    .join(", ");
}

const result = svg.replace(
  /style="([^"]+)"/g,
  (_, style) => `style={{ ${cssToJs(style)} }}`
);

fs.writeFileSync("world-map.tsx", result);
