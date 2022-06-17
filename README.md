# commandline-helpers

A simple command line utilities library for nodejs apps

## Install

```
npm install commandline-helpers
```

## Usage

Example:

```
import { Logger } from "commandline-helpers";
const logger = new Logger()

logger.log("just some text")
logger.log({content: "just some data"})

logger.log("Subject 1", "log input")
logger.log("Subject 1", {content: "data"})
logger.log("Subject 2", "more log input")
logger.log("Subject 2::subtext", "even more log input")
logger.log("Subject 1", "back to subject 1")

logger.log(new Error('Test exception'))
```

Example output:

```
just some text
{
    "content": "just some data"
}
Subject 1: log input
> Subject 1: {
    "content": "data"
}
Subject 2: more log input
> Subject 2::subtext → even more log input
> Subject 1: back to subject 1
{
    "name": "Error",
    "message": "Test exception",
    "stack": "Error: Test exception\n    at /home/lsipii/Projects/commandline-helpers/scripts/test-logging.ts:17:20\n    at Generator.next (<anonymous>)\n    at /home/lsipii/Projects/commandline-helpers/scripts/test-logging.ts:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/home/lsipii/Projects/commandline-helpers/scripts/test-logging.ts:4:12)\n    at testLog (/home/lsipii/Projects/commandline-helpers/scripts/test-logging.ts:16:12)\n    at /home/lsipii/Projects/commandline-helpers/scripts/test-logging.ts:86:11\n    at Generator.next (<anonymous>)\n    at /home/lsipii/Projects/commandline-helpers/scripts/test-logging.ts:8:71\n    at new Promise (<anonymous>)"
}

```

## Examples

For basic examples see [./scripts/test-logging.ts](./scripts/test-logging.ts)
