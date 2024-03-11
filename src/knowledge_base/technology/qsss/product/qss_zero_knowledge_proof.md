
# Zero Knowledge Proof Storage system.

The quantum save storage system is zero knowledge proof compliant. The storage system is made up / split into 2 components:  The actual storage devices use to store the data (ZDB's) and the Quantum Safe Storage engine. 


![](img/qss_system.jpg)

The zero proof knowledge compliancy comes from the fact the all the physical storage nodes (3nodes) can proof that they store a valid part of what data the quantum safe storage engine (QSSE) has stored on multiple independent devices.  The QSSE can validate that all the QSSE storage devices have a valid part of the original information.  The storage devices however have no idea what the original stored data is as they only have a part (description) of the origina data and have no access to the original data part or the complete origal data objects.

!!!def