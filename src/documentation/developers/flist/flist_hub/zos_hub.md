<h1> Zero-OS Hub </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Upload Your Files](#upload-your-files)
- [Merge Multiple Flists](#merge-multiple-flists)
- [Convert Docker Images and Tar Files](#convert-docker-images-and-tar-files)
- [Upload Customize Flists](#upload-customize-flists)
- [Upload Homemade Flists](#upload-homemade-flists)
- [Upload your Existing Flist to Reduce Bandwidth](#upload-your-existing-flist-to-reduce-bandwidth)
- [Authenticate via 3Bot](#authenticate-via-3bot)
- [Get and Update Information Through the API](#get-and-update-information-through-the-api)
  - [Public API Endpoints (No Authentication Required)](#public-api-endpoints-no-authentication-required)
  - [Restricted API Endpoints (Authentication Required)](#restricted-api-endpoints-authentication-required)
  - [API Request Templates and Examples](#api-request-templates-and-examples)

***

## Introduction

The [ThreeFold Zero-OS Hub](https://hub.grid.tf/) allows you to do multiple things and acts as a public centralization of flists.

The ZOS Hub is mainly there to gives an easy way to distribute flist files, which are databases of metadata that you can use in any Zero-OS container or virtual machine.

## Upload Your Files
In order to publish easily your files, you can upload a `.tar.gz` and the hub will convert it automatically to a flist
and store the contents in the hub backend. After that you can use your flist directly on a container.

## Merge Multiple Flists
In order to reduce the maintenance of your images, products, etc. flist allows you to keep your
different products and files separately and then merge them with another flist to make it usable without
keeping the system up-to-date.

Example: there is an official `ubuntu 16.04` flist image, you can make a flist which contains your application files
and then merge your flist with ubuntu, so the resulting flist is your product on the last version of ubunbu.
You don't need to take care about the base system yourself, just merge it with the one provided.

## Convert Docker Images and Tar Files

The ZOS Hub allows you to convert Docker Hub images and Tar files into flists thanks to the Docker Hub Converter. 

You can convert a docker image (eg: `busybox`, `ubuntu`, `fedora`, `couchdb`, ...) to an flist directly from the backend, this allows you to use your existing docker image in our infrastructure out-of-the-box. Go to the [Docker Hub Converter](https://hub.grid.tf/docker-convert) to use this feature. For more information on the process, read the section [Convert Docker Image to flist](./convert_docker_image.md) of the TF Manual.

You can also easily convert a Tar file into an flist via the [Upload section](https://hub.grid.tf/upload) of the ZOS Hub.

## Upload Customize Flists

The ZOS Hub also allows you to customize an flist via the [Customization section](https://hub.grid.tf/merge) of the ZOS Hub. Note that this is currently in beta.

## Upload Homemade Flists

The ZOS Hub allows you to upload flist that you've made yourself via the section [Upload a homemade flist](https://hub.grid.tf/upload-flist).

## Upload your Existing Flist to Reduce Bandwidth
In addition with the hub-client (a side product) you can upload efficiently contents of file
to make the backend up-to-date and upload a self-made flist. This allows you to do all the jobs yourself
and gives you the full control of the chain. The only restriction is that the contents of the files you host
on the flist needs to exists on the backend, otherwise your flist will be rejected.

## Authenticate via 3Bot
All the operations on the ZOS Hub needs to be done via a `3Bot` (default) authentication. Only downloading a flist can be done anonymously. To authenticate request via the API, you need to generate an API Token as shown in the section [ZOS Hub API Token](./api_token.md).

## Get and Update Information Through the API
The hub host a basic REST API which can gives you some informations about flists, renaming them, remove them, etc.

To use authenticated endpoints, you need to provide a itsyou.online valid `jwt` via `Authorization: bearer <jwt>` header.
This `jwt` can contains special `memberof` to allows you cross-repository actions.

If your `jwt` contains memberof, you can choose which user you want to use by specifying cookie `active-user`.
See example below.


### Public API Endpoints (No Authentication Required)
- `/api/flist` (**GET**)
  - Returns a json array with all repository/flists found
- `/api/repositories` (**GET**)
  - Returns a json array with all repositories found
- `/api/fileslist` (**GET**)
  - Returns a json array with all repositories and files found
- `/api/flist/<repository>` (**GET**)
  - Returns a json array of each flist found inside specified repository.
  - Each entry contains `filename`, `size`, `updated` date and `type` (regular or symlink), optionally `target` if it's a symbolic link.
- `/api/flist/<repository>/<flist>` (**GET**)
  - Returns json object with flist dumps (full file list)

### Restricted API Endpoints (Authentication Required)
- `/api/flist/me` (**GET**)
  - Returns json object with some basic information about yourself (authenticated user)
- `/api/flist/me/<flist>` (**GET**, **DELETE**)
  - **GET**: same as `/api/flist/<your-repository>/<flist>`
  - **DELETE**: remove that specific flist
- `/api/flist/me/<source>/link/<linkname>` (**GET**)
  - Create a symbolic link `linkname` pointing to `source`
- `/api/flist/me/<linkname>/crosslink/<repository>/<sourcename>` (**GET**)
  - Create a cross-repository symbolic link `linkname` pointing to `repository/sourcename`
- `/api/flist/me/<source>/rename/<destination>` (**GET**)
  - Rename `source` to `destination`
- `/api/flist/me/promote/<sourcerepo>/<sourcefile>/<localname>` (**GET**)
  - Copy cross-repository `sourcerepo/sourcefile` to your `[local-repository]/localname` file
  - This is useful when you want to copy flist from one repository to another one, if your jwt allows it
- `/api/flist/me/upload` (**POST**)
  - **POST**: uploads a `.tar.gz` archive and convert it to an flist
  - Your file needs to be passed via `file` form attribute
- `/api/flist/me/upload-flist` (**POST**)
  - **POST**: uploads a `.flist` file and store it
  - Note: the flist is checked and full contents is verified to be found on the backend, if some chunks are missing, the file will be discarded.
  - Your file needs to be passed via `file` form attribute
- `/api/flist/me/merge/<target>` (**POST**)
  - **POST**: merge multiple flist together
  - You need to passes a json array of flists (in form `repository/file`) as POST body
- `/api/flist/me/docker` (**POST**)
  - **POST**: converts a docker image to an flist
  - You need to passes `image` form argument with docker-image name
  - The resulting conversion will stay on your repository

### API Request Templates and Examples

The main template to request information from the API is the following:

```bash
curl -H "Authorization: bearer <API_token>" https://hub.grid.tf/api/flist/me/<flist_name> -X <COMMAND>
```

For example, if we take the command `DELETE` of the previous section and we want to delete the flist `example-latest.flist` with the API Token `abc12`, we would write the following line:

```bash
curl -H "Authorization: bearer abc12" https://hub.grid.tf/api/flist/me/example-latest.flist -X DELETE
```

As another template example, if we wanted to rename the flist `current-name-latest.flist` to `new-name-latest.flist`, we would use the following template:

```bash
curl -H "Authorization: bearer <API_token>" https://hub.grid.tf/api/flist/me/<current_flist_name>/rename/<new_flist_name> -X GET
```

To upload an flist to the ZOS Hub, you would use the following template:

```bash
curl -H "Authorization: bearer <API_Token>" -X POST -F file=@my-local-archive.tar.gz \
    https://hub.grid.tf/api/flist/me/upload
```