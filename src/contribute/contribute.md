<h1> How to Contribute to the Threefold Manual </h1>

<h2>Table of Contents</h2>

- [Main Steps to Contribute](#main-steps-to-contribute)
- [How to Build the mdbook Locally](#how-to-build-the-mdbook-locally)
- [How to Install git and mdbook](#how-to-install-git-and-mdbook)
- [Questions and Feedback](#questions-and-feedback)

***

# Main Steps to Contribute

We present here the main steps to add content to the Threefold Manual, https://www.manual.grid.tf.

* Go to https://github.com/threefoldtech/info_grid
* Fork the Development branch
  * On the top right corner, click Fork -> Create a new fork
* Make changes in the forked repository
   * To add a new markdown file:
      * Add the new md file to the [src](https://github.com/threefoldtech/info_grid/blob/development/src) directory.
      * Add the path of the md file to [SUMMARY](https://github.com/threefoldtech/info_grid/blob/development/src/SUMMARY.md).
   * To modify an existing markdown file:
     * Make the changes in the markdown file directly
* Ask for a pull request
  * In the forked repository, click Contribute -> Open pull request
* Once the pull request is accepted, the changes of the Development branch are available here: https://www2.manual.grid.tf
* The Threefold team will then update the Master branch from the Development branch
   * The new content will be available here: https://www.manual.grid.tf

Note: You can update your forked repository by clicking Sync fork -> Update branch.

***

# How to Build the mdbook Locally

If you want to see the changes you made on the Threefold Manual, you can build locally the manual.

Follow those simple steps:

* In your terminal, create a new directory
  * cd PATH_TO_DIRECTORY
  * mkdir info_grid_local && cd $_
  * git clone https://github.com/YOUR_GIT_ACCOUNT/info_grid && cd $_
    * make sure to write your own github account in the URL
  * cd info_grid
  * mdbook serve --port 3031
    * You can use a different port too
  * In your browser, enter the following URL
    * http://localhost:3031/
  * You should be able to see your changes

***

# How to Install git and mdbook

To install git, follow the steps provided [here](https://github.com/git-guides/install-git).

To install mdbook, you can download the executable binaries available on the [GitHub Releases Page](https://github.com/rust-lang/mdBook/releases). Simply download the binary for your platform (Windows, macOS, or Linux) and extract the archive. The archive contains an mdbook executable which you can run to build your books. To make it easier to run, you can put the path to the binary into your PATH.

For more information, read the [mdbook Documentation](https://rust-lang.github.io/mdBook/guide/installation.html).

***

# Questions and Feedback

If you have any questions or you would like to share some feedback, let us know in this [Threefold forum post](https://forum.threefold.io/t/new-grid-manual/3783).