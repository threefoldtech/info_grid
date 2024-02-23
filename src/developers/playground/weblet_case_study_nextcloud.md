<h1>Weblet Case Study: Nextcloud AIO</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Process Overview and Preparation Steps](#process-overview-and-preparation-steps)
- [Building a Weblet](#building-a-weblet)
  - [Add an Icon](#add-an-icon)
  - [Add a Description](#add-a-description)
  - [Update deployment\_list.ts](#update-deployment_listts)
  - [Update /types/index.ts](#update-typesindexts)
  - [Update /router/index.ts](#update-routerindexts)
  - [Update vm\_deployment\_table.vue](#update-vm_deployment_tablevue)
  - [Update App.vue](#update-appvue)
  - [Update delete\_deployment.ts](#update-delete_deploymentts)
  - [Update tf\_deployment\_list.vue](#update-tf_deployment_listvue)
  - [Create nextcloud\_view.vue](#create-nextcloud_viewvue)
  - [Create tf\_nextcloud.vue](#create-tf_nextcloudvue)
    - [Template Section](#template-section)
    - [First Script Section (Setup)](#first-script-section-setup)
    - [Second Script Section](#second-script-section)
- [Testing a Weblet](#testing-a-weblet)
- [Contributing to the Playground](#contributing-to-the-playground)
- [Conclusion](#conclusion)

***

# Introduction

In this ThreeFold guide, we explore how to create a weblet on the Playground. To do so, we will use the Nextcloud weblet as a case study. This weblet is ideal to study since it uses many of the ThreeFold Grid functionalities, such as gateways and gateway domains.

By reading this guide, you should have a proper understanding of the general process of building a new weblet on the ThreeFold Grid. This might give you inspiration to build your own weblet and contribute to the ThreeFold Playground.

# Process Overview and Preparation Steps

The bulk of the files needed for the Nextcloud weblet can be found in the [ThreeFold tfgrid-sdk-ts repository](https://github.com/threefoldtech/tfgrid-sdk-ts) on GitHub. More specifically, we are interested in the subdirectory called [playground](https://github.com/threefoldtech/tfgrid-sdk-ts/tree/development/packages/playground).

While there are many ways to proceed in the development of a ThreeFold weblet for the Playground, we present here a general method that works efficiently and is well organized.

The information provided here are specific to the Nextcloud workload, but it can be applied to other types of workload.

Before building the Nextcloud weblet, we first deployed a [Nextcloud instance](../../terraform/advanced/terraform_nextcloud_aio.md) on the ThreeFold Grid with a full virtual machine. Once this deployment was working well, we built an [Nextcloud flist](../../flist/flist_case_studies/flist_nextcloud_case_study.md). You can consult the Nextcloud flist code in the ThreeFold Tech [tf-images repository](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud). We note that the flist uses a micro VM. There are some differences between a full VM and a micro VM. We propose users to first start deploying with a full VM and then adjust their work when they want to publish an flist with a micro VM, since full VM are easier to work with. You can of course start directly with a micro VM if you want.

In sum, once we were confortable launching Nextcloud on a full VM and also using an flist, we were ready to tackle the building of a weblet. These steps should be taken into account when building your own weblet. We proceed this way to ensure that the workload is properly configured. Once we know the flist is working properly, we can focus on the weblet aspect of the deployment, knowing the deployment itself is working properly.

# Building a Weblet

In the subsections that follow, we cover all the different files that either need to be updated or created when building a weblet on the Playground. 

For the most part, the work consist of updating existing files to add the Nextcloud information. As you will see, the bulk of the work is happening with the file named **tf_nextcloud.vue**, where we set the main weblet page seen on the Playground.

## Add an Icon

We added a Nextcloud icon to be featured on the Playground by adding a **png** file at the following directory **packages/playground/public/images/icons/nextcloud.png**.

## Add a Description

We added a description to the Nextcloud weblet by adding a markdown file at the following directory **packages/playground/public/info/nextcloud.md**. This file contains a short description of Nextcloud for users to quickly understand what the weblet does.

## Update deployment_list.ts

In the file **deployment_list.ts**, we set parameters to be shared to the Nextcloud weblet during deployment. The file is available at the following directory **packages/playground/src/constants/deployment_list.ts**. 

In our case, the Nextcloud content is the following:

```
  nextcloud: {
    SSH_KEY: _ssh,
    NEXTCLOUD_AIO_LINK: "Nextcloud Setup",
    NEXTCLOUD_DOMAIN: "Nextcloud Domain",
  },
```

We can see here that the weblet will receive the SSH public key, the Nextcloud setup and domain links. The SSH public key will allow users to connect to the VM via SSH. The Nextcloud setup link is linked to the  The Nextcloud domain is used to set the domain name to the Nextcloud instance. The Nextcloud setup and domain links will be linked to the **Actions** buttons once the workload is deployed. 

## Update \/types\/index.ts

In the file **index.ts**, located at the directory **packages/playground/src/types/**, we set the **ProjectName**, **SolutionCode** and **solutionType** for the Nextcloud weblet.

We added the line **Nextcloud = "Nextcloud",** in the array **export enum ProjectName**. This will provide a name for the Nextcloud weblet, which will be used in the Deployment table shown on the Playground.

We added the line **nextcloud = "nc"** in the array **export enum SolutionCode**. This will be used notably as a prefix for the randomly generated deployment name. For example, when the user deploys a Nextcloud weblet, the name of the VM could be **ncxwbt2**.

We also added the line **nextcloud: "Nextcloud",** in the array **export const solutionType: { [key: string]: string } =**. This will be used when setting a contract with the TFGrid.

## Update \/router\/index.ts

In the file **index.ts**, located at the directory **packages/playground/src/router/**, we add the following lines in the array **const router = createRouter**:

```
    {
      path: "/nextcloud",
      component: () => import("../views/nextcloud_view.vue"),
      meta: { title: "Nextcloud", info: { page: "info/nextcloud.md" } },
    },
```

We can see that this section makes use of the Nextcloud description seen in the section [Add a Description](#add-a-description). It also sets the path to the **nextcloud_view.vue** file.

## Update vm_deployment_table.vue

In the file **vm_deployment_table.vue**, located at the directory **packages/playground/src/components/**, we added the line **ProjectName.Nextcloud** in the constant section named **IPV4Solutions**. 

The Nextcloud IPv4 address will thus be shown in the deployment table after the user has deployed the Nextcloud weblet.

If, for example, we wanted to display the WireGuard address in the deployment table, we would add **ProjectName.Nextcloud** in the array named **WireguardSolutions**.

## Update App.vue

In the file **App.vue**, located at the directory **packages/playground/src/**, we added the line **{ title: "Nextcloud", icon: "nextcloud.png", route: "/nextcloud" },** in the section named **const routes: AppRoute[]**.

## Update delete_deployment.ts

In the file **delete_deployment.ts**, located at the directory **packages/playground/src/utils/delete_deployment.ts**, we added the line **ProjectName.Nextcloud,** in the section named **const solutions**.

## Update tf_deployment_list.vue

In the file **tf_deployment_list.vue**, located at the directory **packages/playground/src/weblets/tf_deployment_list.vue**, we added the following code to set Actions buttons that are clickable once the workload is deployed:

```
        <template #Nextcloud-actions="{ item }">
          <IconActionBtn
            tooltip="Show Details"
            icon="mdi-eye-outline"
            @click="openDialog(tabs[activeTab].value, item)"
          />
          <IconActionBtn
            tooltip="Open Nextcloud"
            color="anchor"
            icon="mdi-web"
            :href="'https://' + item.value[0].env.NEXTCLOUD_DOMAIN"
          />
          <IconActionBtn
            tooltip="Nextcloud Setup"
            color="anchor"
            icon="mdi-view-dashboard"
            :href="'https://' + item.value[0].env.NEXTCLOUD_AIO_LINK"
          />
        </template>
```

We note that this section makes use of the **NEXTCLOUD_DOMAIN** and **NEXTCLOUD_AIO_LINK** environment variables shown in the section [Update deployment_list.ts](#update-deployment_listts).

At the end of the file, at the section **const tabs: Tab[]**, we also added the line **{ title: "Nextcloud", value: "Nextcloud", imgPath: "images/icons/nextcloud.png" },**. We note that this line makes use of the Nextcloud icon we set in the **icons** directory.

## Create nextcloud_view.vue

We created a file named **nextcloud_view.vue**. Instead of starting from scratch, we took a file template from an already existing file, in our case it was **owncloud_view.vue**. We only needed to change a few lines to make it work with the Nextcloud weblet.

```
<template>
  <view-layout>
    <TfNextcloud />

    <template #list>
      <TfDeploymentList title="Nextcloud Instances" :project-name="name" />
    </template>
  </view-layout>
</template>

<script lang="ts">
import { ProjectName } from "../types";
import TfDeploymentList from "../weblets/tf_deployment_list.vue";
import TfNextcloud from "../weblets/tf_nextcloud.vue";

export default {
  name: "NextcloudView",
  components: {
    TfNextcloud,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Nextcloud };
  },
};
</script>
```

The line containing **TfDeploymentList title** sets the strings used to present the different Nextcloud instances in the deployment table, populated once we deploy a Nextcloud workload on the Playground.

We also note that this file imports the variables **TfDeploymentList** and **TfNextcloud** from the files **tf_deployment_list.vue** and **tf_nextcloud.vue** respectively. These variables are then exported in the section **export default**. We recall that in **tf_deployment_list.vue**, we set the Actions button, as well as set the weblet name and icon. The file **tf_nextcloud.vue** is covered in the next section.

## Create tf_nextcloud.vue

We created a file named **tf_nextcloud.vue**. Instead of starting from scratch, it can be recommended to start from a template of a weblet that is close to the current weblet you are building. In our case, we started with the file **owncloud.vue**. That being said, since the Nextcloud weblet uses the gateway as well as gateway domains, some major updates were necessary. This file constitutes the bulk of the work when building a weblet for the Playground. For this reason, we dedicate more attention to this file and explore it section by section.

This file is mainly composed of three sections. The first section, **template** will be used to configure and set the proper deployment configurations. The second section, the first **script** section will import the necessary modules and variables, set the constants and set the asynchronous function that will query the TFGrid to deploy the weblet instance. The third section, the second **script** section, imports modules and variables and export them.

### Template Section

We first start to explore the **template** main section.

The section **weblet-layout** defines the basic layout of the weblet. This section sets the variable names for the different deployment configurations, such as the CPU, the memory and the disk. These variables will then be set to specific quantities when the users set the weblet on the Playground.

The section **template #title** sets the main title displayed on the Playground weblet page.

The section **form-validator** contains many subsections that will serve to configure the weblet deployment.

The first subsection of **form-validator** is **input-validator**. This subsection is used to give a name to the weblet instance. This subsection provides strict requirements for the **Name** of the weblet instance. While the name is automatically generated randomly by the Playground, users can also set their own name, to the extent that they follow the name requirements.

The following subsection is called **SelectSolutionFlavor**. In this subsection, we provide templates for the users to choose the deployment parameters. The parameters are CPU, memory and disk. As stated before, the names of those parameters have been set in the section **weblet-layout**.

The subsection **Networks** is where we set the TFGrid parameter options. In our case, the user can decide to enable **ipve4**.

The subsections called **input-tooltip** are used to generated information for the users. The developer can decide to either simply display a message as string, and also to set a clickable hyperlink. 

The first **input-tooltip** of the Nextcloud instance, at lines 41 to 47, provides a hyperlink leading to the TF Manual dedicated nodes documentation. This tooltip also contains a **v-switch**. This gives a toggle button that can be enabled or disabled. In this case, the user can either enable the option **Dedicated** or not. The name given to this option is **dedicated**. We can see further in the document, at line 122, that this option is set as a constant and is false by default (**ref(false)**).

The second **input-tooltip** is about certified node. As with the previous tool-tip, it is accompanied by a **v-switch** named **certified**. Also further in the document, we can see at line 123 that this option is set as a constant and set to false by default (**set(false)**).

The next main subsection is called **SelectFarmManager**. This subsection contains **FarmGatewayManager**, which at its turn contains **SelectFarm**, **SelectNode** and **DomainName**. Most of the actions here is done automatically based on the deployment configurations set previously. 

By the end of this subsection, we arrive at the end of the **form-validator** subsection. This means that the user should now have entered every necessary information to deploy the weblet. This leads us to the next subsection containing the **Deploy** button.

The subsection **tempalte #footer-actions** configures the **Deploy** button. As we can see at the line 89, the button is set to be invalid by default (**!valid**). This is to ensure that the user selects a proper node and deloyment configurations before being able to query the TFGrid to deploy the weblet instance.

By the end of this subsection, we arrive at the end of the **weblet-layout** subsectiont and of the **template** section.

### First Script Section (Setup)

The first part of this section consists of importing modules from the **src** directory as well as **GridClient** from **@threefold/grid_client** and **computed**, **type Ref** and **ref** from **vue**. Then we set constants based on the ****template** section. One constant to notice is **flist**. This constant is given the URL to the Nextcloud flist that we created for the weblet deployment. For more information on how to create this flist, read the [Nextcloud flist case study](../../flist/flist_case_studies/flist_nextcloud_case_study.md) available on the ThreeFold Manual.
 
A big part of the first script section is the asynchronous function **deploy**. This function takes as parameters **gatewayName** and **customDomain**. This function is called when the user clicks on the **Deploy** button. 

For our Nextcloud instance, the user can decide to use a gateway or not as well as a custom or gateway domain. The line 148 consists of setting the proper **domain** whether the user chose a custom or a gateway domain:

> const domain = customDomain ? gatewayName.domain : subdomain + "." + gatewayName.domain;

We can see here, written in typescript, that if **customDomain** is set to true, the domain is set to **gatewayName.domain**. If the **customDomain** is set to false, **domain** is set to **subdomain + "." gatewayName.domain**.

At the line 149, we can see that the constant **has_gateway** is set to true only if both **customDomain** and **ipv4.value** are set to false:

> const has_gateway = !(customDomain && ipv4.value);

The variable **domain** is then given as an environment variable **NEXTCLOUD_DOMAIN** as seen at line 186.

We then set the constant **aio_link** based on the domain set as shown above. We add the suffix **\/aio** to the string **domain**. This link will given as an environment variable **NEXTCLOUD_AIO_LINL** as seen at line 187.

Once the susmentioned constants are set, the asynchronous function **deploy** will deploy the weblet instance on the TFGrid. This can be seen in the section **try** starting at line 155. This section references to all the necessary parameters to deploy the weblet instance as defined by the user on the TFGrid. For example, the subsection **envs** contains all the necessary environment variables for the deployment, such as the SSH public key (**SSH_KEY**), as well as the domain and Nextcloudt setup URLs (**NEXTCLOUD_DOMAIN**, **NEXTCLOUD_AIO_LINK**). We also pass a boolean telling the deployer if there is a gateway within the deeployment (**GATEWAY**) as well as the IPv4 address (**IPV4**).

If this **try** function fails, we display the error **Failed to deploy a Nextcloud instance.** as shown at line 199. 

From line 201 to line 205, we set an **if** statement that will be triggered if the deployment consist of a custom domain and an IPv4 connection. In this case, we call the function **finalize** to deploy the weblet instance.

If this is not the case, we trigger the second **try** function where we set the gateway. From line 209 to line 217 we prepare and set the gateway. Once this is done, we finally trigger the function **finalize** to deploy the weblet instance with the gateway set.

### Second Script Section

The second script section imports different modules necessary to run the weblet and then exports many of them as a package for the weblet, in our case **TFNextcloud**.

The import section of this script section should be common for all weblets using a gateway.

The export section (**export default**) is set with **TFNextcloud** as its **name** at line 242.

# Testing a Weblet

You can test this weblet or the weblet you are creating by deploying the Playground locally. For more information on this, feel free to read the documentation [Deploy the Playground](./deploy_playground.md) of the ThreeFold Manual.

This is very useful, if not necessary, when testing and building your own weblet.

# Contributing to the Playground

If you've created a new weblet and you wish to share it to the ThreeFold community, feel free to fork the ThreeFold [tfgrid-sdk-ts repository](https://github.com/threefoldtech/tfgrid-sdk-ts) to your own GitHub account, add the new weblet to the Playground and then create a pull request. The ThreeFold development team will be happy to review your code and propose changes if needed.

# Conclusion

We now went through the Nextcloud weblet code and explored how to create a new weblet for the ThreeFold Playground. This case study should have given you the necessary tools and knowledge to understand the general steps when it comes to creating a new weblet. Of course, each weblet will be different and you will most certainly need to adjust the files presented here when you build your own weblet.

Should you have any questions or feedback, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) chat on Telegram.