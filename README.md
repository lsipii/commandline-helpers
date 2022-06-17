# commandline-helpers

A simple command line utilities library for nodejs apps

## Install

```
npm install commandline-helpers
```

## Examples

Logging:

```
import { Logger } from "commandline-helpers";
import { CommandlineUtils } from "commandline-helpers";

function log() {
    const logger = new Logger();
    try {
        const pargs = CommandlineUtils.parseCliArgs();

        let message = "Example log output";
        if (pargs.args.length > 0) {
            message = pargs.args[0];
        }

        logger.log("Logger", `${message} 1`);
        logger.log("Logger", `${message} 2`);
        logger.log("Logger", `${message} 3`);
        process.exit();
    } catch (error) {
        logger.log(error);
    }
}
```

Progress logging:

```
import { ProgressLogger } from "commandline-helpers";

function logprogress() {
    const logger = new ProgressLogger();
    try {
        let total = 20;
        logger.logProgress(total, "Logging progress");
        const action = () => {
            --total;
            logger.logProgress();
            if (total > 0) {
                setTimeout(
                    () => {
                        action();
                    },
                    total === 7 ? 20000 : 1000
                );
            } else {
                process.exit();
            }
        };

        action();
    } catch (error) {
        logger.log(error);
    }
}
```
