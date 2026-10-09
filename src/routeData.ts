import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware((context) => {
  const { entry, head } = context.locals.starlightRoute;
  const url = new URL(`/og/${entry.id ? entry.id : "index"}.webp`, context.site)
    .href;

  head.push(
    {
      tag: "meta",
      attrs: { name: "twitter:card", content: "summary_large_image" },
    },
    { tag: "meta", attrs: { property: "og:image", content: url } },
  );
});
