import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Salons Assured Kenya CMS",

  projectId: "abx814ao",
  dataset: "production",

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});