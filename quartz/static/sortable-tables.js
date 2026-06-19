(function () {
  function parseValue(text) {
    // ISO dates (YYYY-MM-DD or YYYY-MM) sort correctly as strings — skip numeric parse
    if (/^\d{4}-\d{2}(-\d{2})?$/.test(text)) return text
    const num = parseFloat(text.replace(/[,%]/g, ""))
    return isNaN(num) ? text.toLowerCase() : num
  }

  function sortTable(table, colIdx, ascending) {
    const tbody = table.querySelector("tbody")
    if (!tbody) return
    const rows = Array.from(tbody.querySelectorAll("tr"))
    rows.sort((a, b) => {
      const aText = (a.cells[colIdx] ?? a.cells[0]).textContent.trim()
      const bText = (b.cells[colIdx] ?? b.cells[0]).textContent.trim()
      const aVal = parseValue(aText)
      const bVal = parseValue(bText)
      if (typeof aVal === "number" && typeof bVal === "number") {
        return ascending ? aVal - bVal : bVal - aVal
      }
      return ascending ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal))
    })
    rows.forEach((row) => tbody.appendChild(row))
  }

  function initSortableTables() {
    document.querySelectorAll("table").forEach((table) => {
      const headers = Array.from(table.querySelectorAll("thead th"))
      if (!headers.length) return
      headers.forEach((th, colIdx) => {
        if (th.dataset.sortable) return
        th.dataset.sortable = "true"
        th.dataset.sortDir = ""
        th.addEventListener("click", () => {
          const ascending = th.dataset.sortDir !== "asc"
          headers.forEach((h) => {
            h.dataset.sortDir = ""
            h.removeAttribute("aria-sort")
          })
          th.dataset.sortDir = ascending ? "asc" : "desc"
          th.setAttribute("aria-sort", ascending ? "ascending" : "descending")
          sortTable(table, colIdx, ascending)
        })
      })
    })
  }

  document.addEventListener("DOMContentLoaded", initSortableTables)
  document.addEventListener("nav", initSortableTables)
})()
