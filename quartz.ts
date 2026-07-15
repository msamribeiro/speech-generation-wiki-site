import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Explorer sidebar configuration.
// - tags/: default Quartz exclusion preserved
// - _evidence/: internal evidence-digest folder under concepts/, not for direct navigation
// - comparisons/: currently empty
// - papers/, concepts/: shown as a single clickable link to their index.md; children
//   cleared so hundreds of individual paper/concept entries don't expand beneath them
ExternalPlugin.Explorer({
  filterFn: (node) =>
    node.slugSegment !== "tags" &&
    node.slugSegment !== "_evidence" &&
    node.slugSegment !== "comparisons" &&
    node.slugSegment !== "readme",
  mapFn: (node) => {
    if (node.slugSegment === "papers" || node.slugSegment === "concepts") {
      node.children = []
      node.isFolder = false
    }
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
