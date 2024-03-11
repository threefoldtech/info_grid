<h1> Website Link Checker </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [How the Program Exits](#how-the-program-exits)
- [Program Arguments](#program-arguments)
- [How to Use the Program](#how-to-use-the-program)
  - [With Python](#with-python)
  - [With Docker](#with-docker)
  - [With Github Action](#with-github-action)

***

## Introduction

This is a Python program that calls muffet on a whole website and then filters and displays the HTTP errors.

> Note: It can take a couple of minutes to run if the website has a lot of URLs.

## How the Program Exits

Exits with error code 1 if at least one error is found, as specified with --errors
flag. Otherwise exits with code 0. Note that errors set as --warnings will always exit with code 0.

## Program Arguments

* url
  * The URL to scan. Please include https:// or http://. (e.g. https://google.com)
* -h, --help            
  * show this help message and exit
* -e ERRORS [ERRORS ...], --errors ERRORS [ERRORS ...]
  * Specify one, many or all error codes to be filtered (e.g. -e 404, -e 403 404, -e all). Use -e all to show all errors.
* -w WARNINGS [WARNINGS ...], --warnings WARNINGS [WARNINGS ...]
  * Specify one, many or all error codes to be filtered as warnings (e.g. -w 404, -w 403 404, -w all). Use -w all to show all warnings.

## How to Use the Program

### With Python

* Clone the repository
  * ```
    git clone https://github.com/threefoldfoundation/website-link-checker
    ```
* Change directory
  * ```
    cd website-link-checker
    ```
* Run the program
  * ```
    python website-link-checker.py https://example.com -e 404 -w all
    ```

### With Docker

You can use the following command to run the website link checker with Docker:

```
docker run ghcr.io/threefoldfoundation/website-link-checker https://example.com -e 404 -w all
```

### With Github Action

The website link checker can be run as an action (e.g. `action.yml`) set in `.github/workflows` of a Github repository.

The following action example runs everytime there is a push on the development branch and also every Monday at 6:00AM as set by the cron job.

```
name: link-checker-example
on:
  push:
    branches: [ development ]
  schedule:
    - cron: '0 6 * * 1' # e.g. 6:00 AM each Monday

jobs:
  job_one:
    name: Check for Broken Links
    runs-on: ubuntu-latest
    steps:
      - name: Check for Broken Links
        id: link-report
        uses: docker://ghcr.io/threefoldfoundation/website-link-checker:latest
        with:
          args: 'https://example.com -e 404 -w all'
```

