<h1> How to Contribute to the Threefold Manual </h1>

<h2>Table of Contents</h2>

- [Quick Method: Create an Issue](#quick-method-create-an-issue)
- [Advanced Method: Create a Pull Request](#advanced-method-create-a-pull-request)
  - [Main Steps to Add Content](#main-steps-to-add-content)
  - [How to View the mdbook Locally](#how-to-view-the-mdbook-locally)
  - [How to Install git and mdbook](#how-to-install-git-and-mdbook)
  - [Markdown File Template (Optional)](#markdown-file-template-optional)
- [Questions and Feedback](#questions-and-feedback)

***

## Quick Method: Create an Issue

If you've found some issues or typos in the ThreeFold Manual, feel free to [create an issue on the ThreeFold Manual repository](https://github.com/threefoldtech/info_grid/issues) to let us know. We will then be able to fix it as soon as possible.

The steps are simple:

* Go to the [issues section of ThreeFold Manual](https://github.com/threefoldtech/info_grid/issues) repository on GitHub
* Click on `New Issue`
* Choose an appropriate title
* Explain briefly the issue you found
* Click `Submit New Issue`



## Advanced Method: Create a Pull Request

If you found an issue in the manual and you wish to fix the issue yourself, you can always fork the repository and propose the changes in a pull request. We present the main steps in this section as well as further details on how to proceed efficiently.



### Main Steps to Add Content



We present here the main steps to add content to the Threefold Manual by forking the repository [`threefoldtech/info_grid`](https://github.com/threefoldtech/info_grid) to your own Github account.

* Go to the Threefold Manual repository: [https://github.com/threefoldtech/info_grid](https://github.com/threefoldtech/info_grid)
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
* Once the pull request is accepted, the changes of the Development branch will be available here: [https://www2.manual.grid.tf](https://www2.manual.grid.tf)
* The Threefold team will regularly update the [Development branch](https://github.com/threefoldtech/info_grid) to the [Master branch](https://github.com/threefoldtech/info_grid/tree/master)
   * The new content will thus be available here: [https://www.manual.grid.tf](https://www.manual.grid.tf)

Note: You can update your forked repository by clicking `Sync fork -> Update branch`.



### How to View the mdbook Locally



Once you've forked the TF Manual repository to your Github account, you might want to see the changes you've made before asking for a pull request. This will ensure that the final output is exactly what you have in mind.

To do so, you simply need to clone the forked repository on your local computer and serve the mdbook on a given port.

The steps are the following:

* In the terminal, write the following line to clone the forked `info_grid` repository:
  * ```
    git clone https://github.com/YOUR_GIT_ACCOUNT/info_grid
    ```
    * make sure to write your own Github account in the URL
* To deploy the mdbook locally, first go to the **info_grid** directory:
  * ```
    cd info_grid
    ```
* Then write the following line. It will open the manual automatically.
  * ```
    mdbook serve -o
    ```
  * Note that, by default, the URL is the following, using port `3000`, `http://localhost:3000/`
* You should now be able to see your changes.



### How to Install git and mdbook



To install git, follow the steps provided [here](https://github.com/git-guides/install-git).

To install mdbook, you can download the executable binaries available on the [GitHub Releases Page](https://github.com/rust-lang/mdBook/releases). Simply download the binary for your platform (Windows, macOS, or Linux) and extract the archive. The archive contains an mdbook executable which you can run to build your books. To make it easier to run, you can put the path to the binary into your PATH.

For more information, read the [mdbook Documentation](https://rust-lang.github.io/mdBook/guide/installation.html).



### Markdown File Template (Optional)



Here are some suggestions on how to organize a Markdown file (`.md`) when you submit contents to the ThreeFold Manual. This is not necessary, but it will ease the whole process.

* Title: Heading 1 (`#` in Markdown syntax)
* Main sections: Heading 2 (`##` in Markdown syntax)
* For Markdown files that contain a *Table of Contents*: 
   * Use `<h1>` instead of `#` for the _Title_ , and `<h2>` instead of `##` for the _Table of Contents_.
      * This quickens editing when creating and updating the ToC ([read this for more details](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one#table-of-contents)).
   * Other heading labels should use standard Markdown headings (`##`, etc.).
* If your text reaches heading level 4, you might want to separate your file into two or more files.
   *  A long article can be spread in many subsections.



## Questions and Feedback

If you have any questions or if you would like to share some feedback, let us know in this [Threefold forum post](https://forum.threefold.io/t/new-grid-manual/3783).