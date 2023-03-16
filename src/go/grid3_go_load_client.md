## TFPluginClient Configuration

- mnemonics
- keyType: can be `ed25519` or `sr25519`
- network: can be `dev`, `qa`, `test` or `main`

## Creating Client

Import `deployer` package to your project:

```go
import "github.com/threefoldtech/grid3-go/deployer"
```

Create new Client:

```go
func main() {
    client, err := deployer.NewTFPluginClient(mnemonics, keyType, network, "", "", true, true)
}
```
