import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Explorer sidebar configuration.
// - tags/: default Quartz exclusion preserved
// - _evidence/: internal evidence-digest folder under concepts/, not for direct navigation
// - evidence/: dossiers, now linked directly from the concepts nav table instead
// - comparisons/: currently empty
// - reports/: currently empty
// - papers/, concepts/: shown as a single clickable link to their index.md; children
//   cleared so hundreds of individual paper/concept entries don't expand beneath them
ExternalPlugin.Explorer({
  filterFn: (node) =>
    node.slugSegment !== "tags" &&
    node.slugSegment !== "_evidence" &&
    node.slugSegment !== "evidence" &&
    node.slugSegment !== "comparisons" &&
    node.slugSegment !== "reports" &&
    node.slugSegment !== "readme",
  mapFn: (node) => {
    if (node.slugSegment === "papers" || node.slugSegment === "concepts") {
      node.children = []
      node.isFolder = false
    }
  },
  // NOTE: sortFn is serialized via .toString() and rebuilt with `new Function` in the
  // browser, so it cannot close over module-level constants — the order list must be
  // inlined here.
  sortFn: (a, b) => {
    const sidebarOrder = ["start", "overview", "concepts", "papers", "log"]
    const aRank = sidebarOrder.indexOf(a.slugSegment ?? "")
    const bRank = sidebarOrder.indexOf(b.slugSegment ?? "")
    if (aRank !== -1 || bRank !== -1) {
      if (aRank === -1) return 1
      if (bRank === -1) return -1
      return aRank - bRank
    }
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return (a.displayName || "").localeCompare(b.displayName || "", undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }
    return !a.isFolder && b.isFolder ? 1 : -1
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
