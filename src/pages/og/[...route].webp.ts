import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs/promises";
import sharp from "sharp";

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text: string, maxChars = 20, maxLines = 2): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if ((line + " " + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("docs");
  console.log(entries)
  return entries.map((entry) => ({
    params: { route: entry.id },
    props: { title: entry.data.title },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const template = await fs.readFile("./src/assets/og.svg", "utf-8");

  const tspans = wrap(props.title.replace("Fluxcord: ", ''))
    .map(
      (l, i) =>
        `<tspan x="1811" dy="${i === 0 ? 24 : 77}">${escapeXml(l)}</tspan>`,
    )
    .join("");

  const png = new Resvg(template.replace("{{title}}", tspans), {
    fitTo: { mode: "width", value: 1200 },
    font: {
      fontFiles: ["./public/fonts/Gabarito-Regular.ttf"],
      loadSystemFonts: false,
      defaultFontFamily: "Gabarito",
    },
  })
    .render()
    .asPng();

  const webp = await sharp(png).webp({ quality: 80 }).toBuffer();

  return new Response(webp, { headers: { "Content-Type": "image/webp" } });
};
