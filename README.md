# Threefold Grid Manual

## Requirements

- Make
- [mdbook](https://rust-lang.github.io/mdBook/guide/installation.html)
- [mdbook-mermaid](https://github.com/badboy/mdbook-mermaid)
- [jq](https://jqlang.github.io/jq/)
- [bc](https://www.gnu.org/software/bc/)

## build

`make build`

## Serve

`make serve`
will open the browser  

## Browse docs

can be browsed on [Manual.grid.tf](https://manual.grid.tf/)
> Staging version from development branch is available on [www2.Manual.grid.tf](https://www2.manual.grid.tf).

## Contribute

If you want to contribute to [Manual.grid.tf](https://manual.grid.tf/), you should follow this steps:

1. Add the md file to [src](./src) directory.
2. Add the path of the md file to [SUMMARY](./src/SUMMARY.md).
3. Then use `make build` and `make serve` to see your changes on the browser.
