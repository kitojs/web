import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    publicDir: "public",
  },
  integrations: [
    starlight({
      title: "Kito",
      description:
        "🐺 The high-performance, type-safe and modern TypeScript web framework written in Rust.",
      favicon: "/favicon.svg",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/kitojs/kito",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", link: "/docs" },
            { label: "Installation", link: "/docs/guides/installation" },
            { label: "Quick Start", link: "/docs/guides/quick-start" },
          ],
        },
        {
          label: "Core Concepts",
          items: [
            { label: "Routing", link: "/docs/core-concepts/routing" },
            { label: "Validation", link: "/docs/core-concepts/validation" },
            { label: "Middleware", link: "/docs/core-concepts/middleware" },
            {
              label: "Context Extensions",
              link: "/docs/core-concepts/context",
            },
          ],
        },
      ],
    }),
  ],
});
