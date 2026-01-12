import fs from "fs";
import path from "path";

const svgFile = path.resolve("maps.svg");
let content = fs.readFileSync(svgFile, "utf8");

// Convert style="key: value; key2: value2;" → style={{ key: "value", key2: "value2" }}
content = content.replace(/style="([^"]+)"/g, (_, styles) => {
  const styleObj = styles
    .split(";")
    .filter(Boolean)
    .map((rule) => {
      const [key, value] = rule.split(":").map((s) => s.trim());
      if (!key || !value) return null;
      // convert kebab-case to camelCase
      const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${camelKey}: "${value}"`;
    })
    .filter(Boolean)
    .join(", ");
  return `style={{ ${styleObj} }}`;
});

fs.writeFileSync("maps.react.tsx", content);
