import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Exclude noisy or empty folders from the sidebar explorer.
// - papers/: 800+ entries; discovery via concepts, venues, search, and papers/index.md
// - tags/: default Quartz exclusion preserved
// - _evidence/: internal evidence-digest folder under concepts/, not for direct navigation
// - comparisons/: currently empty
ExternalPlugin.Explorer({
  filterFn: (node) =>
    node.slugSegment !== "tags" &&
    node.slugSegment !== "papers" &&
    node.slugSegment !== "_evidence" &&
    node.slugSegment !== "comparisons",
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
