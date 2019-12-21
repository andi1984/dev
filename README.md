# Twig + Markdown HTML Generator

Run `npm run start` to generate the HTML files based on the Markdown files saved inside the `md` folder.

The HTML content of the markdown files is going to be passed as `content` variable to the twig template specified in the respective `template` frontmatter of the markdown file. If none is specified, the `templates/main.twig` file is used as a fallback.

The output files are saved to the `dist` directory.
