## Login

Before interacting with Threefold Grid with `tf-grid-cli` you should login with your mnemonics and specify the grid network:

```console
$ tf-grid-cli login
Please enter your mnemonics: <mnemonics>
Please enter grid network (main,test): <grid-network>
```

This validates your mnemonics and store your mnemonics and network to your default configuration dir.
Check [UserConfigDir()](https://pkg.go.dev/os#UserConfigDir) for your default configuration directory.
