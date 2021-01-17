<h1 align="center">hyper63 Search Port</h1>
<p align="center">
This port creates the interface that any hyper63 search adapter needs to implement.
</p>
<p align="center">
The adapter implementation must implement or noop all of the methods of the port object.
</p>

---

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

A hyper63 port is an interface that enables adapters to implement, by leveraging interfaces we can 
use different implementation details for the same port. In this case the search port can use different
adapters, like minisearch, elastic search, etc. 

``` js
import { SearchPort } from 'https://x.nest.land/hyper63-port-search@1.0.0/mod.js'

const myadapter = x =>
  x.cata({
    CreateIndex: noop,
    DestroyIndex: noop
    ...
  })

const service = SearchPort(myadapter)

```

## Installation

In your deps.js

``` js
export { SearchPort } from 'https://x.nest.land/hyper63-port-search@1.0.0/mod.js'

```


## Features

* CreateIndex(name=String, mappings=Object)
* DestroyIndex(name=String)
* IndexDoc(index=String, doc=Object)
* GetDoc(index=String, id=String)
* UpdateDoc(index=String, id=String, doc=Object)
* DeleteDoc(index=String, id=String)
* Query(index=String, query=String)

## Contributing

Pull Requests for bug fixes are welcome.

## License

MIT


