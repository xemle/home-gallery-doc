# Documentation of HomeGallery

This repository contains the home page of web gallery [home-gallery.org](https://home-gallery.org)
and its [documentation](https://home-gallery.org/docs/index.html).

The documentation is generated through [rspress](https://rspress.rs).

See [main repository](https://github.com/xemle/home-gallery) for the source code of the gallery.

## Setup

Install the dependencies:

```bash
npm install
```

## Get started

Start the dev server:

```bash
npm run dev
```

Build the website for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Build PlantUML diagrams

```bash
docker compose run plantuml-converter java -jar plantuml.jar -tsvg '**/*.puml'
```