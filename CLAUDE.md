# CLAUDE.md — Speech Generation Wiki Site

This is a [Quartz v5](https://quartz.jzhao.xyz/) static site that publishes the Speech Generation Research Wiki as a GitHub Pages site. The wiki content lives in a git submodule.

---

## Quick commands

```bash
# Pull latest content and rebuild
git submodule update --remote content
npx quartz build

# Local dev server (http://localhost:8080)
npx quartz build --serve

# If the server is stale after a rebuild, kill it first
lsof -i :8080 -t | xargs kill
npx quartz build --serve
```

---

## Repository structure

```
quartz.config.yaml          # Main config: title, base URL, theme colors, plugins, layout
quartz/styles/custom.scss   # ALL custom CSS overrides live here (see rules below)
quartz/styles/variables.scss  # Layout variables: sidebar width, breakpoints, spacing
content/                    # Git submodule → msamribeiro/speech-generation-wiki
.github/workflows/deploy.yml  # GitHub Pages deployment (triggers on push to main)
```

---

## Content submodule

The `content/` directory is a submodule pointing to `msamribeiro/speech-generation-wiki`.

```bash
# Pull new content commits
git submodule update --remote content

# Then rebuild and validate locally before committing
npx quartz build
```

Commit both `content` and any site changes together so the submodule pointer stays in sync.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which:
1. Checks out the repo **with submodules** (`submodules: true`)
2. Runs `npx quartz plugin install` (installs plugins into `.quartz/`, which is gitignored)
3. Runs `npx quartz build`
4. Deploys `public/` to GitHub Pages

Live URL: `https://msamribeiro.github.io/speech-generation-wiki-site`

---

## Design system

The site has two modes: light and standard dark (toggled by the darkmode button). No other themes.

**Color tokens** are defined in `quartz.config.yaml` under `theme.colors` and map to Quartz CSS variables:

| Config key   | CSS variable      | Role                    |
|-------------|-------------------|-------------------------|
| `light`     | `--light`         | Page background         |
| `lightgray` | `--lightgray`     | Borders, dividers       |
| `gray`      | `--gray`          | Muted text              |
| `darkgray`  | `--darkgray`      | Body text               |
| `dark`      | `--dark`          | Headings                |
| `secondary` | `--secondary`     | Links                   |
| `tertiary`  | `--tertiary`      | Link hover, callouts    |
| `highlight` | `--highlight`     | Subtle fill backgrounds |
| `textHighlight` | `--textHighlight` | Wiki-link highlights |

**Typography:**
- Header font: `Schibsted Grotesk` (via `var(--headerFont)`)
- Body font: `Source Sans 3` (via `var(--bodyFont)`)
- Code font: `IBM Plex Mono` (via `var(--codeFont)`)

Dark mode uses the same tokens; Quartz swaps them automatically via the darkmode toggle.

---

## CSS customization — critical rules

**`quartz/styles/custom.scss` is the only file to edit for visual overrides.**

The `.quartz/` directory (where plugins are installed) is listed in `.gitignore`. Any edits to plugin SCSS files inside `.quartz/` will be lost when plugins are reinstalled (locally or in CI). All style overrides must live in `custom.scss`, using the plugin's class names as selectors.

`custom.scss` is loaded after all plugin CSS, so specificity is not an issue for most overrides.

`quartz/styles/variables.scss` is the right place for layout-level changes (sidebar width, breakpoints, spacing).

---

## Known limitations

These visual improvements are not currently possible without editing plugin templates inside the gitignored `.quartz/` directory:

| Item | Reason |
|------|--------|
| TOC heading text "Table of Contents" → "On this page" | Hardcoded in plugin template; no config option |
| TOC collapse toggle / chevron | Removing it requires a template edit in `.quartz/` |
| Backlink excerpts (muted text below each link) | Plugin does not render excerpt content |

---

## Commit style

- Short imperative subject line
- No `Co-authored-by` trailer lines
