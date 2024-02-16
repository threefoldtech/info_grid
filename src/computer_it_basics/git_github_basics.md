<h1> Git and GitHub Basics </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Install Git](#install-git)
  - [Install on Linux](#install-on-linux)
  - [Install on MAC](#install-on-mac)
  - [Install on Windows](#install-on-windows)
- [Basic Commands](#basic-commands)
  - [Check Git version](#check-git-version)
  - [Clone a repository](#clone-a-repository)
  - [Clone a single branch](#clone-a-single-branch)
  - [Check all available branches](#check-all-available-branches)
  - [Check the current branch](#check-the-current-branch)
  - [Go to another branch](#go-to-another-branch)
  - [Add your changes to a local branch](#add-your-changes-to-a-local-branch)
  - [Push changes of a local branch to the remote Github branch](#push-changes-of-a-local-branch-to-the-remote-github-branch)
  - [Reverse modifications to a file where changes haven't been staged yet](#reverse-modifications-to-a-file-where-changes-havent-been-staged-yet)
  - [Download binaries from Github](#download-binaries-from-github)
  - [Resolve conflicts between branches](#resolve-conflicts-between-branches)
  - [Download all repositories of an organization](#download-all-repositories-of-an-organization)
  - [Revert a push commited with git](#revert-a-push-commited-with-git)
  - [Make a backup of a branch](#make-a-backup-of-a-branch)
  - [Revert to a backup branch](#revert-to-a-backup-branch)
  - [Start over local branch and pull remote branch](#start-over-local-branch-and-pull-remote-branch)
  - [Overwrite local files and pull remote branch](#overwrite-local-files-and-pull-remote-branch)
  - [Stash command and parameters](#stash-command-and-parameters)
- [Code Editors](#code-editors)
  - [VS-Code](#vs-code)
  - [VS-Codium](#vs-codium)
- [References](#references)

***

## Introduction

In this section, we cover basic commands and aspects of [GitHub](https://github.com/) and [Git](https://git-scm.com/). 

Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. 

GitHub is a platform and cloud-based service for software development and version control using Git, allowing developers to store and manage their code.



## Install Git

You can install git on MAC, Windows and Linux. You can consult Git's documentation learn how to [install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### Install on Linux

* Fedora distribution
  * ```
    dnf install git-all
    ```
* Debian-based distribution
  * ```
    apt install git-all
    ```
* Click [here](https://git-scm.com/download/linux) for other Linux distributions

### Install on MAC

* With Homebrew
  * ```
    brew install git
    ```

### Install on Windows

You can download Git for Windows at [this link](https://git-scm.com/download/win).



## Basic Commands

### Check Git version

```
git --version
```



### Clone a repository

```
git clone <repository_url>
```



### Clone a single branch

```
git clone <repository_url> --branch <branch> --single-branch <folder>
```



### Check all available branches

```
git branch -r
```



### Check the current branch

```
git branch
```



### Go to another branch

```
git checkout <branch_name>
```



### Add your changes to a local branch

* Add all changes
  * ```
    git add .
    ```
* Add changes of a specific file
  * ```
    git add <path_to_file>/<file_name>
    ```



### Push changes of a local branch to the remote Github branch

To push changes to Github, you can use the following commands:

* ```
  git add .
  ```
* ```
  git commit -m "write your changes here in comment"
  ```
* ```
  git push
  ```



### Count the differences between two branches

Replace **branch1** and **branch2** with the appropriate branch names.

```
git rev-list --count branch1..branch2
```

### See the default branch

```
git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'
```



### Force a push

```
git push --force
```



### Merge a branch to a different branch

* Checkout the branch you want to copy content TO
  * ```
    git checkout branch_name
    ```
* Merge the branch you want content FROM
  * ```
    git merge origin/dev_mermaid
    ```
* Push the changes
  * ```
    git push -u origin/head
    ```



### Clone completely one branch to another branch locally then push the changes to Github

For this example, we copy **branchB** into **branchA**.

* See available branches
  * ```
    git branch -r
    ```
* Go to **branchA**
  * ```
    git checkout branchA
    ```
* Copy **branchB** into **branchA**
  * ```
    git git reset --hard branchB
    ```
* Force the push
  * ```
    git push --force
    ```



### The 3 levels of the command reset

* ```
  git reset --soft
  ```
  * Bring the History to the Stage/Index
  * Discard last commit
* ```
  git reset --mixed
  ```
  * Bring the History to the Working Directory
  * Discard last commit and add
* ```
  git reset --hard
  ```
  * Bring the History to the Working Directory
  * Discard last commit, add and any changes you made on the codes

Note 1: If you're using **--hard**, make sure to run git status to verify that your directory is clean, otherwise you will lose your uncommitted changes.

Note 2: The argument **--mixed** is the default option, so **git reset** is equivalent to **git reset --mixed**.



### Reverse modifications to a file where changes haven't been staged yet

You can use the following to reverse the modifications of a file that hasn't been staged:

```
git checkout <filename>
```



### Download binaries from Github

* Template:
  * ```
    wget -O <file_name> https://raw.githubusercontent.com/<user_name>/<repository>/<path_to_file>/<file_name>
    ```



### Resolve conflicts between branches

We show how to resolve conflicts in a development branch (e.g. **branch_dev**) and then merging the development branch into the main branch (e.g. **branch_main**).

* Clone the repo
  * ```
    git clone <repo_url>
    ```
* Pull changes and potential conflicts
  * ```
    git pull origin branch_main
    ```
* Checkout the development branch
  * ```
    git checkout branch_dev
    ```
* Resolve conflicts in a text editor
* Save changes in the files
* Add the changes
  * ```
    git add .
    ```
* Commit the changes
  * ```
    git commit -m "your message here"
    ```
* Push the changes
  * ```
    git push
    ```



### Download all repositories of an organization

* Log in to gh
  * ```
    gh auth login
    ```
* Clone all repositories. Replace <organization> with the organization in question.
  * ```
    gh repo list <organization> --limit 1000 | while read -r repo _; do
      gh repo clone "$repo" "$repo"
    done
    ```



### Revert a push commited with git

* Find the commit ID
  * ```
    git log -p
    ```
* Revert the commit
  * ```
    git revert <commit_ID>
    ```
* Push the changes
  * ```
    git push
    ```



### Make a backup of a branch

```
git clone -b <branch_name> --single-branch /<path_to_repo>/<repo_name>.git
```



### Revert to a backup branch

* Checkout the branch you want to update (**branch**)
  * ```
    git checkout <branch>
    ```
* Do a reset of your current branch based on the backup branch
  * ```
    git reset --hard <backup_branch>
    ```



### Start over local branch and pull remote branch 

To start over your local branch and pull the remote branch to your working environment, thus ignoring local changes in the branch, you can do the following:

```
git fetch
git reset --hard
git pull
```

Note that this will not work for untracked and new files. See below for untracked and new files.



### Overwrite local files and pull remote branch

This method can be used to overwrite local files. This will work even if you have untracked and new files.

* Save local changes on a stash
  * ```
    git stash --include-untracked
    ```
* Discard local changes
  * ```
    git reset --hard
    ```
* Discard untracked and new files
  * ```
    git clean -fd
    ```
* Pull the remote branch
  * ```
    git pull
    ```

Then, to delete the stash, you can use **git stash drop**.



### Stash command and parameters

The stash command is used to record the current state of the working directory.

* Stash a branch (equivalent to **git stash push**)
  * ```
    git stash
    ```
* List the changes in the stash
  * ```
    git stash list
    ```
* Inspect the changes in the stash
  * ```
    git stash show
    ```
* Remove a single stashed state from the stash list and apply it on top of the current working tree state
  * ```
    git stash pop
    ```
* Apply the stash on top of the current working tree state without removing the state from the stash list
  * ```
    git stash apply
    ```
* Drop a stash
  * ```
    git stash drop
    ```



## Code Editors

There are many code editors that can work well when working with git.

### VS-Code

[VS-Code](https://code.visualstudio.com/)is a source-code editor made by Microsoft with the Electron Framework, for Windows, Linux and macOS.

To download VS-Code, visit their website and follow the given instructions.

### VS-Codium

[VS-Codium ](https://vscodium.com/) is a community-driven, freely-licensed binary distribution of Microsoft’s editor VS Code.

There are many ways to install VS-Codium. Visit the [official website](https://vscodium.com/#install) for more information.

* Install on MAC
  * ```
    brew install --cask vscodium
    ```
* Install on Linux
  * ```
    snap install codium --classic
    ```
* Install on Windows
  * ```
    choco install vscodium
    ```



## References

Git Documentation - https://git-scm.com/docs/user-manual