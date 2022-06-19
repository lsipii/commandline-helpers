import { Logger } from "../src/index";
import { CommandlineUtils } from "../src/index";

async function testCliArguments() {
    const logger = new Logger();
    const message = CommandlineUtils.getFirstArgument("Example output");
    logger.log(logger.colourFormatPrettyObsArrowText("First argument test"));
    if (message === "test case") {
        logger.log(logger.log(logger.colourFormatCliText("OK", "green")));
    } else {
        logger.log(logger.log(logger.colourFormatCliText("FAIL", "red")));
        throw new Error("FAILED");
    }
}

// Tesrunner
async function main() {
    await testCliArguments();
}

main();
