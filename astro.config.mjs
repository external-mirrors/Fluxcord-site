// @ts-check
import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Fluxcord Documentation",
      sidebar: [
        {
          label: "Getting started",
          link: "/getting-started",
        },
      ],
      logo: {
        light: "./src/assets/docs-light.svg",
        dark: "./src/assets/docs-dark.svg",
        replacesTitle: true,
      },
      social: [
        {
          icon: "fluxer",
          label: "Fluxer",
          href: "https://fluxer.gg/waf",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.waf.moe",
        },
        {
          icon: "seti:git",
          label: "Repository",
          href: "https://git.gay/Fluxcord/core",
        },
      ],
      editLink: {
        baseUrl: "https://git.gay/Fluxcord/site/_edit/main"
      }
    }),
  ],
});
