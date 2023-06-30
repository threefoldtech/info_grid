<h1> 3Lang Parser </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Code of the 3Lang Parser](#code-of-the-3lang-parser)
- [3Lang Parser: Explanation](#3lang-parser-explanation)

***

## Introduction

The 3lang Parser is a utility software that reads and executes Threelang formatted actions.

We present here the code written in V and we explain briefly what it does.

***

## Code of the 3Lang Parser

We present the 3Lang Parser code (`threelang.v`):

```
module main

import os
import threefoldtech.threebot.threelang { RunnerArgs }
import flag

const (
	default_server_address = 'ws://127.0.0.1:8080'
)
 
fn main() {
	mut fp := flag.new_flag_parser(os.args)
	fp.application('Welcome to The Threelang Parser cli. The Threelang parser is a utility software that reads and executes Threelang formatted actions.')
	fp.limit_free_args(0, 0)!
	fp.description('')
	fp.skip_executable()

	config_file_path := fp.string('file', `f`, '', 'The path to the markdown file containing threelang.')
	address := fp.string('address', `a`, '${default_server_address}', 'The address of the web3_proxy server to connect to.')
	debug_log := fp.bool('debug', 0, false, 'By setting this flag the client will print debug logs too.')

	_ := fp.finalize() or {
		eprintln(err)
		println(fp.usage())
		exit(1)
	}

	_ := threelang.new(RunnerArgs{ path: config_file_path, address: address }, debug_log) or {
		eprintln(err)
		exit(1)
	}
}
```

***

## 3Lang Parser: Explanation

Thanks to the 3Lang parser, you can easily work with the web3proxy. By providing markdown files to the 3Lang Parser, you can use web3proxy functionalities.

It would suffice to take the code above (with proper modules imported) and to run the following line of code to access web3proxy functionalities.

```v
v run threelang.v -f <file_path>
```
