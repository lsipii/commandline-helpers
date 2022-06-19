# commandline-helpers

A simple command line utilities library for nodejs apps

## Install

```
npm install @lsipii/commandline-helpers
```

## Usage

Example:

```TypeScript
import { Logger, CommandlineUtils, Runtime } from "@lsipii/commandline-helpers";
const logger = new Logger()
const message = CommandlineUtils.getFirstArgument("Example output");
logger.log(message);

Runtime.delay(2000).then(() => {
    logger.log(`${message}: after delay`);
})

```

## Examples

For basic examples see [./scripts/test-arguments.ts](./scripts/test-arguments.ts)
