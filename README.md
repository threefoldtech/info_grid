# Threefold Grid Manual

## Requirements

- Make
- [mdbook](https://rust-lang.github.io/mdBook/guide/installation.html)

## build

`make build`

## Serve

`make serve`
will open the browser  

## Browse docs

can be browsed on [Manual.grid.tf](https://manual.grid.tf/)

## Contribute

If you want to contribute to [Manual.grid.tf](https://manual.grid.tf/), you should follow this steps:

1. Add the md file to [src](./src) directory.
2. Add the path of the md file to [SUMMARY](./src/SUMMARY.md).
3. Then use `make build` and `make serve` to see your changes on the browser.
