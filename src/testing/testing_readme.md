<h1>Testing the ThreeFold Grid: Ensuring Reliability and User Feedback</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Automation Testing](#automation-testing)
- [Manual Testing](#manual-testing)
- [Covered Tests](#covered-tests)

***

## Introduction

With each release of a newer version of the ThreeFold Grid, the ThreeFold Community plays a vital role in testing the product components and providing constructive feedback to the engineering team. This article explores the testing strategy employed by ThreeFold, which includes both automation and manual testing, and highlights the covered functionality tested by the procedures.

## Automation Testing
The internal QA team conducts automation testing, where they automate various test scenarios and run them in nightly builds. This approach helps identify the status of the code and allows for the early detection of functionality and regression issues.

## Manual Testing
The QA team, along with the grid testing community, performs manual testing. [TestLodge](./testlodge.html) is the chosen platform for managing test plans, test cases, and test runs. By joining TestLodge as a user, individuals can actively participate in running test use cases and reporting any issues encountered during product deployment. Issues can be reported by creating an issue on [ThreeFold's Test Feedback repository](https://github.com/threefoldtech/test_feedback/issues) on Github.

## Covered Tests
The ThreeFold Grid 3 encompasses a wide range of functionalities that are thoroughly tested to ensure their reliability and performance. Some of the covered functionalities include:

- Compute
   - Virtual machine
   - Caprover
   - Kubernetes

- Network
   - WebGateway
   - Planetary Network
   
- Storage
   - Quantum Safe Storage System (Quantum Safe Filesystem)
   -  0-DB
   - S3 minio

- TFChain
   - Portal 
   -  IPFS

- Farming
   - Create Farm
   - Farm Management

- TwinServer v2
- TerraForm Deployments

Testing is a crucial aspect of the ThreeFold Grid's development process. By actively involving the ThreeFold Community in testing the product components and leveraging automation and manual testing approaches, the engineering team ensures the reliability and quality of the Grid3. 

With TestLodge as the testing platform, users can contribute to the testing efforts by running test use cases and reporting any issues encountered. Through collaborative testing, the ThreeFold Grid continues to evolve and deliver a robust and efficient infrastructure for users worldwide.