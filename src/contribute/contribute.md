<h1> How to Contribute to the Threefold Manual </h1>

<h2>Table of Contents</h2>

- [Main Steps to Add Content](#main-steps-to-add-content)
- [How to View the mdbook Locally](#how-to-view-the-mdbook-locally)
- [How to Install git and mdbook](#how-to-install-git-and-mdbook)
- [Questions and Feedback](#questions-and-feedback)

***

## Main Steps to Add Content

We present here the main steps to add content to the Threefold Manual by forking the repository [`threefoldtech/info_grid`](https://github.com/threefoldtech/info_grid) to your own Github account.

* Go to the Threefold Manual repository: https://github.com/threefoldtech/info_grid
* Fork the Development branch
  * On the top right corner, click `Fork -> Create a new fork`
* Make changes in the forked repository
   * To add a new section
      * Add a new Markdown file to the [src](https://github.com/threefoldtech/info_grid/blob/development/src) directory
      * Add the path of the Markdown file to [SUMMARY](https://github.com/threefoldtech/info_grid/blob/development/src/SUMMARY.md).
   * To modify an existing section:
     * Make the changes directly in the Markdown file
* Ask for a pull request
  * In the forked repository, click `Contribute -> Open pull request`
* Once the pull request is accepted, the changes of the Development branch will be available here: https://www2.manual.grid.tf
* The Threefold team will regularly update the [Development branch](https://github.com/threefoldtech/info_grid) to the [Master branch](https://github.com/threefoldtech/info_grid/tree/master)
   * The new content will thus be available here: https://www.manual.grid.tf

Note: You can update your forked repository by clicking `Sync fork -> Update branch`.

***

## How to View the mdbook Locally

Once you've forked the TF Manual repository to your Github account, you might want to see the changes you've made before asking for a pull request. This will ensure that the final output is exactly what you have in mind.

To do so, you simply need to clone the forked repository on your local computer and serve the mdbook on a given port.

The steps are the following:

* In the terminal, write the following line to clone the forked `info_grid` repository
  * ```
    git clone https://github.com/YOUR_GIT_ACCOUNT/info_grid
    ```
    * make sure to write your own Github account in the URL
* To deploy the mdbook locally, write the following lines
  * ```
    cd info_grid
    ```
  * ```
    mdbook serve --port 3031
    ```
    * You can use a different port if you want
* To view the TF Manual, go to the following URL: http://localhost:3031/
  * You should now be able to see your changes

***

## How to Install git and mdbook

To install git, follow the steps provided [here](https://github.com/git-guides/install-git).

To install mdbook, you can download the executable binaries available on the [GitHub Releases Page](https://github.com/rust-lang/mdBook/releases). Simply download the binary for your platform (Windows, macOS, or Linux) and extract the archive. The archive contains an mdbook executable which you can run to build your books. To make it easier to run, you can put the path to the binary into your PATH.

For more information, read the [mdbook Documentation](https://rust-lang.github.io/mdBook/guide/installation.html).

***

## Questions and Feedback

If you have any questions or you would like to share some feedback, let us know in this [Threefold forum post](https://forum.threefold.io/t/new-grid-manual/3783).