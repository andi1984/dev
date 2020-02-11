# Twig + Markdown HTML Generator

![Node CI](https://github.com/andi1984/back2roots/workflows/Node%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/andi1984/back2roots/badge.svg?branch=develop)](https://coveralls.io/github/andi1984/back2roots?branch=develop)

Run `npm run start` to generate the HTML files based on the Markdown files saved inside the `md` folder.

The HTML content of the markdown files is going to be passed as `content` variable to the twig template specified in the respective `template` frontmatter of the markdown file. If none is specified, the `templates/main.twig` file is used as a fallback.

The output files are saved to the `dist` directory.

## Twig Template Variables

| Variable |                     Description                      |                                                      Example |
| -------- | :--------------------------------------------------: | -----------------------------------------------------------: |
| title    |                  Title of the page                   |                                "Foo" (default: The filename) |
| sites    |               Array of all build sites               |                          cf. [Site interface](./utils/md.ts) |
| content  |             Content of the page as HTML              |                                 cf. `"<h1>Hello World</h1>"` |
| base_url |               The base url of the page               |                                    cf. URL in env vars below |
| meta     | All metadata provided via frontmatter for given site | cf. {title: 'foo', template: 'bar', author: 'Max Mustermann' |

## Environment Variables

| Variable    |                                                 Description                                                  |                                       Example |
| ----------- | :----------------------------------------------------------------------------------------------------------: | --------------------------------------------: |
| URL         |                                               URL of your page                                               |                  `URL: https://www.google.de` |
| PRETTY_URLS | Flag to indicate whether hosting can handle pretty urls (e.g. `/hello/world` instead of `/hello/world.html`) | `PRETTY_URLS: 1` (default: not set --> false) |

## Configuration

You can configure certain parts of the system. All config files are contained within the config folder.

### Hooks

| method       |                                Description                                 |                                  Example |
| ------------ | :------------------------------------------------------------------------: | ---------------------------------------: |
| sitesSorting | Sorts the sites before any further action (e.g. generating the HTML files) | Sort by date metadata/frontmatter field. |
