import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import prefixwrap from "postcss-prefixwrap";

export default ({ env }) => ({
  plugins: [
    tailwindcss,
    autoprefixer,
    env === "production" ? prefixwrap(".msbk-") : false,
  ].filter(Boolean),
});
