# Threefold Grid Manual

## Requirements

- Make
- [mdbook](https://rust-lang.github.io/mdBook/guide/installation.html)
- [mdbook-mermaid](https://github.com/badboy/mdbook-mermaid)
- [mdbook-last-changed](https://github.com/badboy/mdbook-last-changed)
- [jq](https://jqlang.github.io/jq/)
- [bc](https://www.gnu.org/software/bc/)

## Make

To properly build and serve the manual, use the `make build` and `make serve` commands. This is important since the manual fetches data online through scripts.

### Build

Use the following command to build the book:

`make build`

### Serve

Use the following command to serve the book (this will open the browser)

`make serve`

## Browse docs

- The official ThreeFold manual from master branch is available at [www.manual.grid.tf](https://manual.grid.tf/)
- Staging version from development branch is available at [www.manual.dev.grid.tf](https://www.manual.dev.grid.tf)
- Staging version from development-split branch is available at [wwww3.manual.grid.tf](https://www3.manual.grid.tf)

## Contribute

If you want to contribute to [Manual.grid.tf](https://manual.grid.tf/), you should follow this steps:

1. Add the md file to [src](./src) directory.
2. Add the path of the md file to [SUMMARY](./src/SUMMARY.md).
3. Then use `make build` and `make serve` to see your changes on the browser.

Read the section [How to Contribute](https://manual.grid.tf/knowledge_base/collaboration/contribute.html) for more information.
