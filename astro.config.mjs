import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: "Kito",
      description:
        "🐺 The high-performance, type-safe and modern TypeScript web framework written in Rust.",
      favicon: "/favicon.png",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/kitojs/kito",
        },
      ],
    }),
  ],
});
