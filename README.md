fibers-crash
============

A tiny stub for the fibers module, to help root out lingering fibers uses.

```sh
# yarn
$ yarn add git+ssh://git@github.com/mixmaxhq/fibers-crash.git#v1.0.15
# npm
$ npm install --save git+ssh://git@github.com/mixmaxhq/fibers-crash.git#v1.0.15
```

```js
const Fiber = require('fibers');

// Whether to crash by throwing an error asynchronously or synchronously.
// The asynchronous option may expose more tracing data, and may help you
// escape Promise error handlers where applicable.
Fiber._configureCrash({throwAsync: true});

// These will crash
new Fiber();
Fiber.yield();
Fiber.current;

// As will these, with synchronize.js
sync.fiber(() => {});
sync.await();
sync.defer();
```

License
-------

The MIT License.
