# commandline-helpers

A simple command line utilities library for nodejs apps

## Install

```
npm install commandline-helpers
```

## Usage

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
```

## Examples

For basic examples see [./scripts/test-logging.ts](./scripts/test-logging.ts)
