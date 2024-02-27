<h1> Zola Website Deployer</h1>

<h2> Table of Contents </h2>

- [Overview](#overview)
  - [What is Zola Framework?](#what-is-zola-framework)
- [Prerequisites](#prerequisites)
  - [Important Links](#important-links)
- [Installing Zola Onto Your Machine](#installing-zola-onto-your-machine)
  - [Important Links](#important-links-1)
- [Get Started](#get-started)
  - [Fork ThreeFold's Website Template to Your Github Account](#fork-threefolds-website-template-to-your-github-account)
  - [Clone the Forked Repository Locally](#clone-the-forked-repository-locally)
  - [Open and Edit Your Cloned Zola Template with a Code Editor](#open-and-edit-your-cloned-zola-template-with-a-code-editor)
  - [Template Guide](#template-guide)
  - [Navigating the Template](#navigating-the-template)
  - [Top Navbar Made Easy](#top-navbar-made-easy)
  - [Replace Logo with your Own logo](#replace-logo-with-your-own-logo)
  - [Important Links](#important-links-2)
- [Customization](#customization)
  - [Some Tutorials on Markdown](#some-tutorials-on-markdown)
  - [Creating A Single-Column Page Section](#creating-a-single-column-page-section)
  - [Adding Image](#adding-image)
  - [Creating Page Section with Multiple Columns](#creating-page-section-with-multiple-columns)
  - [Important Links](#important-links-3)
  - [Build and Preview Your Website Locally](#build-and-preview-your-website-locally)
  - [Check the Website Links](#check-the-website-links)
  - [Important Links](#important-links-4)
- [Publish Your Website (Via Github Pages)](#publish-your-website-via-github-pages)
  - [Publish your Github page](#publish-your-github-page)
- [Important Links](#important-links-5)
- [Questions and Feedback](#questions-and-feedback)

***

## Overview

**ThreeFold Website Tool** is a customized open-source Zola-based web deployment framework and static website template repository that is available for anyone to use.

At ThreeFold, we utilized Website Tool to deploy all of our web presences. For example, [**www.threefold.io**](https://threefold.io).

### What is Zola Framework?
[**Zola**](https://www.getzola.org/) is a static site generator (SSG), similar to Hugo, Pelican, and Jekyll (for a comprehensive list of SSGs, please see Jamstack). It is written in Rust and uses the Tera template engine, which is similar to Jinja2, Django templates, Liquid, and Twig. Content is written in CommonMark, a strongly defined, highly compatible specification of Markdown.

While you can also publish a static website using Zola alone, we at ThreeFold have customized the framework and created a static website template that makes it even easier for anyone to build a website by simply cloning template and fill it with their own website content.



## Prerequisites

- Github Account
- Zola Framework
- VS Code, or any code editor of choice
- Markdown language knowledge
- Basic Command Line (Terminal) Knowledge

In order to deploy and publish a website using ThreeFold Website Tool, you would need to have an account on github (to store your website data in a github repository), as well as to have Zola framework installed on your machine.

### Important Links

> - [How to Sign Up for a Github Account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account)
> - [Download VS Code](https://code.visualstudio.com/download)
> - [Learn Markdown Language](https://www.markdownguide.org/)
> - [Command Line Cheat Sheet](https://cs.colby.edu/maxwell/courses/tutorials/terminal/)



## Installing Zola Onto Your Machine

To install Zola on your machine, simply go to your terminal and run the following command:

**MacOS (brew)**:

```
$ brew install zola
```
Please make sure you have [Brew](https://brew.sh/) installed on your MacOS machine before installing Zola. 

<b>Windows (scoop)</b>:

```
$ scoop install zola
```
Please make sure you have [Scoop](https://scoop.sh/) installed on your Windows machine before installing Zola.

You should see a similar screen as below when successful:

![](./img/scoopsuccess.png)

For more details on Zola Installation, and installation guidelines for other operating systems, please read: [**Zola Installation Manual**](https://www.getzola.org/documentation/getting-started/installation/).


### Important Links
> - [How to Install Brew (MacOS)](https://brew.sh/)
> - [How to Install Scoop (Windows)](https://github.com/ScoopInstaller/Scoop#readme)
> - [Zola Installation for other OS](https://www.getzola.org/documentation/getting-started/installation/)
> - [Command Line Cheat Sheet](https://cs.colby.edu/maxwell/courses/tutorials/terminal/)

> Next Step: [Template Guide: How to use the TF Web Template](#template-guide)



## Get Started

Now that you have successfully installed Zola on your machine. You are ready to create and build your own website using ThreeFold Website Tool. 

In order to do that you would need to clone [**ThreeFold's Website Template**](https://github.com/threefoldfoundation/www_examplezola) to your own github account, and open it locally on your computer by using VS Code or your code editing program of choice.

### Fork ThreeFold's Website Template to Your Github Account

Our Team has especially created an html/css/markdown based template repository on github, free for anyone to use. To start working on your project, simply fork [this repository](https://github.com/threefoldfoundation/www_examplezola) to your own github account by clicking the 'fork' account on the repository, and rename it with your website's name.

![](./img/fork.png)

### Clone the Forked Repository Locally
After you forked the template, now you can [clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your local computer so we can start working on it. Please remember the directory / folder of where you cloned the repository in your computer to make it easier for you to locate and edit it.


![](./img/clone.png)

### Open and Edit Your Cloned Zola Template with a Code Editor

Once the template is forked and cloned, open your code editor and start working on your website. I will explain a little more about the content editing process and procedure on the next pages...

![](./img/vscode.png)

### Template Guide

On this page you will find an introduction on [TF Web Template](https://github.com/threefoldfoundation/www_examplezola) and how to navigate the different template component that enable you to edit the template with your own content.

### Navigating the Template

All editable content of your website would be found under **‘content’** folder. 
Each page of your website is a **markdown (.md) file.**

Each page and all the images on the page will be put into its own folder under content/ folder. 
![](./img/folderdetail.png)
<br>
For example, here, my homepage (index.md) is put into **content/home** folder.
![](./img/indexmd.png)

If I want to edit the homepage of my website, I would go to the following:
bb
```
content/home/index.md
```
 and start editing.

 ![](./img/vscode.png)

 ### Top Navbar Made Easy

![](./img/navbar.png)

Every time you make a new page folder, we have designed it in a way that the website would automatically generate a new navbar item using the name of each folder you created.

 based on the navbar picture above, it means that I have created 3 separate content subfolders, each with an index.md file on it called Home, ThreeFoldFeed and GetServer.

### Replace Logo with your Own logo
![](./img/logo.png)

To replace the logo, **add your own logo image to ‘home’ folder.**

And then go to **_index.md** file and replace the **logo_path**: images/yourlogoimagename.jpg

![](./img/placeholder.png)

### Important Links

> - [TF Web Template](https://github.com/threefoldfoundation/www_examplezola)



## Customization

We have designed the template in certain ways that it would accommodate different indentation web page style, such as placeholders, footer, header, left-indentation, right-indentation.

All you need to do is just replace the texts and images using markdown language, and use the indentation style you would like to use for your page. Don’t know how to markdown? Here’s a [**complete markdown syntax guide**](https://www.markdownguide.org/basic-syntax/) for you to begin with.

 Happy experimenting!

### Some Tutorials on Markdown

### Creating A Single-Column Page Section

Since we only have one column, Every one column section begins only with row indentation syntax (style, margin, padding).


```
<!-- section 1 (header) -->

{% row(style="" margin="" padding="t") %}
```

for example:

```
<!-- section 1 (header) -->

{% row(style="center" margin="narrow" padding="top") %}
```

and ends with 

```
{% end %}
```

### Adding Image

To add image to your page please use 

```
![alt_text](yourimagename.png)
```

The Result:

![](./img/mastodon.png)


### Creating Page Section with Multiple Columns

For more than one column section, we need to configure the row and column syntax.
For example:
Sometimes you would like to have a page where you place your texts and buttons on left column and an image on the right column, like:

What you need to do is add:

```
|||
```
in between your text and images for every column you want to create.

For example, this page consist of two columns (left and right):

![](./img/twocolumns.png)

The Result:

![](./img/twocolumnsdone.png)

You can add more than two column like this one, a page section consist of 3 columns.

The code:

![](./img/threecolumns.png)

The Result:

![](./img/threecolumnsdone.png)


### Important Links
> - [Learn Markdown Language](https://www.markdownguide.org/)

###  Build and Preview Your Website Locally

After customizing your website, you might want to review and build your website locally before publishing it online. On this page you will find tutorials on how to preview and deploy your website.

To preview your website locally, simply open the terminal via your code editor and type in:

```
./build.sh
```

So that the framework starts building your website.

Then

```
./start.sh
```

So that the framework starts serving your website preview locally. Please make sure you are on located on the right website folder, for example: *$ user/doc/mywebsitename* before typing the command above. 
 
 The preview won't successfuly be built if you run the command in the wrong folder.

When successful, it will give you a link to a local preview of your website. Go ahead and copy paste the url onto your web browser to preview your website locally.

![](./img/success.png)

And, Congratulations! You just built your website locally!

![](./img/preview.png)

### Check the Website Links

When you are in the main directory of your Zola website, you can check the following command to check the links of the complete website locally:

```
zola check
```

Once your website is online, you can also use the [Website Link Checker](./website_link_checker.md).

### Important Links

> - [Command Line Cheat Sheet](https://cs.colby.edu/maxwell/courses/tutorials/terminal/)



## Publish Your Website (Via Github Pages)

Since we're using github repository to save our website content, the easiest way to publish our website is also through github pages and by using our own domain.

Once all commits have been pushed back to your github repository online, you can start publishing your website.

The first thing you need to do is to go back to your code editor, and find **config.toml** file on your website repo. 
Edit the **base_url** on the **config.toml** file on your repo to your own domain.

![](./img/config.png)

Save all your changes and push all your commits to its origin again.

### Publish your Github page

Later on, go to your github repo **settings**, go to **Pages** on the left navigation sidebar. Add your own custom domain to start publishing your website.

![](./img/gitpages.png)


And you are done! Your website will be published, and it will take only a minute or so to complete the process. Refresh page, and you will see a link to your newly published website.

![](./img/done.png)



## Important Links
> - [Pushing Changes to Github](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch/pushing-changes-to-github)
> - [Github Pages How-to](https://docs.github.com/en/pages)
> - [Adding Custom Domain to my Github Page](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)



## Questions and Feedback

If you have any question or feedback, you can write a post on the [ThreeFold Forum](http://forum.threefold.io/).