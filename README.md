# Speech Generation Research Wiki — Site

The Quartz v5 static site that publishes the [Speech Generation Research Wiki](https://msamribeiro.github.io/speech-generation-wiki-site) to GitHub Pages.

Wiki content lives in a separate repo ([msamribeiro/speech-generation-wiki](https://github.com/msamribeiro/speech-generation-wiki)) and is pulled in here as a git submodule under `content/`.

---

## Live site

**https://msamribeiro.github.io/speech-generation-wiki-site**

---

## Local development

```bash
# Clone with submodule
git clone --recurse-submodules https://github.com/msamribeiro/speech-generation-wiki-site

# Pull latest wiki content
git submodule update --remote content

# Build
npx quartz build

# Dev server (http://localhost:8080)
npx quartz build --serve
```

---

## Repository structure

```
quartz.config.yaml           # Site config: title, base URL, theme, plugins
quartz.ts                    # Explorer sidebar configuration
quartz/styles/custom.scss    # All CSS overrides (edit this, not .quartz/)
quartz/styles/callouts.scss  # Callout type colors
quartz/styles/variables.scss # Layout variables: sidebar width, breakpoints
content/                     # Git submodule → msamribeiro/speech-generation-wiki
.github/workflows/deploy.yml # GitHub Pages deployment on push to main
```

---

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which builds the site and deploys `public/` to GitHub Pages.

---

## Content

See [msamribeiro/speech-generation-wiki](https://github.com/msamribeiro/speech-generation-wiki) for the wiki content — paper pages, concept pages, coverage, and pipeline details.
