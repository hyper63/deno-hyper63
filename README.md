# hyper63

experimental version of hyper63 written for deno

This version is using free monad for the adapter pattern, which should result in cleaner maintanable code. And clear and safe adapter implementation.

One requirement is that each adapter function returns a promise, this promise will be converted over to a Task during the
loading process.


