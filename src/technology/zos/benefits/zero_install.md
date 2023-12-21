## Zero-OS Installation

The Zero-OS is delivered to the 3Nodes over the internet network (network boot) and does not need to be installed.

### 3Node Install

1. Acquire a computer (server).
2. Configure a farm on the TFGrid explorer.
3. Download the bootloader and put on a USB stick or configure a network boot device.
4. Power on the computer and connect to the internet.
5. Boot! The computer will automatically download the components of the operating system (Zero-OS).

The actual bootloader is very small. It brings up the network interface of your computer and queries TFGeid for the remainder of the boot files needed.

The operating system is not installed on any local storage medium (hard disk, ssd). Zero-OS is stateless.

The mechanism to allow this to work in a safe and efficient manner is a ThreeFold innovation called our container virtual filesystem. 

For more information on setting a 3Node, please refer to the [Farmers documentation](../../../farmers/farmers.md).