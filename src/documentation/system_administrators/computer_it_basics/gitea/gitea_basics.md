<h1>Gitea Basics</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Register](#register)
- [Sign In](#sign-in)
- [Set an SSH Key Pair](#set-an-ssh-key-pair)
- [Start the SSH Agent](#start-the-ssh-agent)
- [Clone a Repository](#clone-a-repository)
- [Create and Push a New Branch](#create-and-push-a-new-branch)
  - [On the Browser and Git](#on-the-browser-and-git)
  - [Only With Git](#only-with-git)
- [Create a Pull Request](#create-a-pull-request)
  - [Create a Draft Pull Request](#create-a-draft-pull-request)
- [Useful Commands](#useful-commands)
- [Gitea References](#gitea-references)

---

## Introduction

We present a basic guide for Gitea, a forge software package for hosting software development version control using Git as well as other collaborative features like bug tracking, code review, continuous integration, kanban boards, tickets, and wikis.

ThreeFold hosts its own git server on [Gitea OurWorld](https://git.ourworld.tf). We will be using OurWorld's Gitea instance for this guide.

## Prerequisites

You should have git installed on your computer to work easily with Gitea. It is not necessary to use Gitea but recommended to work with files.

- Install [git](../git_github_basics.md#install-git)
  - Optional, to update repositories from your local computer
- Install [VSCodium](../git_github_basics.md#vs-codium)
  - Optional, to edit your files
- Install [OpenSSH](../../getstarted/ssh_guide/ssh_openssh.md)
  - Optional, to use SSH

## Register

- Go to the main gitea URL, e.g. [https://git.ourworld.tf](https://git.ourworld.tf)
- On the top right click on `Register`
- Set your credentials
  - Enter a `Username`
  - Enter your `Email Address`
  - Enter and confirm a `Password`
- Click on `Register Account`

![](./img/gitea_register.png)

## Sign In

- Go to the main Gitea URL, e.g. [https://git.ourworld.tf](https://git.ourworld.tf)
- On the top right click on `Sign In`
- Set your credentials
  - Enter your `Username` or your `Email Address`
  - Enter your `Password`
- Click on `Sign In`

![](./img/gitea_sign_in.png)

## Set an SSH Key Pair

- Generate an SSH key pair. You can leave default option `~/.ssh/id_rsa.pub`
```
ssh-keygen
```
- Note the public key
```
cat ~/.ssh/id_rsa.pub
```
- [Add the SSH public key on git.ourworld.tf](https://git.ourworld.tf/user/settings/keys)
  - Click on `Add Key` on the top right
  - Paste the public key in `Content`
  - The `Key Name` will be added automatically
  - Click on `Add key` under `Content`

![](./img/gitea_ssh_key.png)

- Optional: on git.ourworld.tf, verify the key. Make sure to put the proper token.
```
echo -n 'token' | ssh-keygen -Y sign -n gitea -f ~/.ssh/id_rsa
```

## Start the SSH Agent

- Start the ssh agent
```
eval $(ssh-agent)
```
- Add private key to the agent
```
ssh-add ~/.ssh/id_rsa.pub
```

## Clone a Repository

- Clone a repository and change directory
```
git clone <repository_url>
cd <repository_url>
```

## Create and Push a New Branch

### On the Browser and Git

- On the repo of the Gitea instance, click on the ̀`Branch` icon (e.g. `development`)
- Write a branch name with the `development_branch_name` convention
- Click `Create branch`

![](./img/gitea_new_branch.png)

```
git checkout development
git fetch
git pull
```
- Make changes in the files
- When changes are done, make a new branch, add the new files, commit and push to the remote server
```
git add .
git commit -m "Commit message for new branch"
git push
```

### Only With Git

- Start by working on the latest development release
```
git checkout development
git fetch
git pull
```
- Make changes in the files
- When changes are done, make a new branch, add the new files, commit and push to the remote server
```
git checkout -b development_new_branch
git add .
git commit -m "Commit message for new branch"
git push --set-upstream origin development_new_branch
```

## Create a Pull Request

- Go to the repo of the Gitea instance
- Click on `Pull Request` then `New Pull Request`

![](./img/gitea_new_pr.png)

- Choose the branch you want to merge into development for `pull from` then click `New Pull Request`
  - At ThreeFold, we protect the master/main and development branches and always make Pull Request from `development_branch_name` to `development`

![](./img/gitea_pr_create.png)

- On the next page, choose a `Title` and a `Description`, then click `Create Pull Request`
  - Usually, we write at least any related issue and a brief description of the work done

![](./img/gitea_pr_title_description.png)

- At any time you can close your own Pull Request

![](./img/gitea_close_pr.png)

### Create a Draft Pull Request

To create a draft pull request, you simply need to add `WIP:` before the title of your pull request. This will set the pull request in Draft mode.

- Example of a draft pull request:
```
WIP: New Pull Request in Draft Mode
```

## Useful Commands

- See current branch
```
git branch
```
- See all branches locally
```
git branch -r
```
- See the git status
```
git status
```

## Gitea References

There are great Gitea references available online.

- [Gitea Docs](https://docs.gitea.com/)
- [Gitea Cheat Sheet](https://docs.gitea.com/administration/config-cheat-sheet)