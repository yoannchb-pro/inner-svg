const ts = require("rollup-plugin-ts");
const terser = require("@rollup/plugin-terser");
const pkg = require("./package.json");

module.exports = {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      name: "innerSVG",
      format: "umd",
      sourcemap: true,
    },
  ],
  plugins: [ts(), terser()],
};
