# Twig + Markdown HTML Generator

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/andi1984/back2roots)

Run `npm run start` to generate the HTML files based on the Markdown files saved inside the `md` folder.

The HTML content of the markdown files is going to be passed as `content` variable to the twig template specified in the respective `template` frontmatter of the markdown file. If none is specified, the `templates/main.twig` file is used as a fallback.

The output files are saved to the `dist` directory.

## Twig Template Variables

| Variable |         Description         |                             Example |
| -------- | :-------------------------: | ----------------------------------: |
| title    |      Title of the page      |       "Foo" (default: The filename) |
| sites    |  Array of all build sites   | cf. [Site interface](./utils/md.ts) |
| content  | Content of the page as HTML |        cf. `"<h1>Hello World</h1>"` |
| base_url |  The base url of the page   |           cf. URL in env vars below |

## Environment Variables

| Variable    |                                                 Description                                                  |                                       Example |
| ----------- | :----------------------------------------------------------------------------------------------------------: | --------------------------------------------: |
| URL         |                                               URL of your page                                               |                  `URL: https://www.google.de` |
| PRETTY_URLS | Flag to indicate whether hosting can handle pretty urls (e.g. `/hello/world` instead of `/hello/world.html`) | `PRETTY_URLS: 1` (default: not set --> false) |
