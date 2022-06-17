import { ProgressLogger, Logger } from "../src/index";
import { CommandlineUtils } from "../src/index";
import { Runtime } from "../src/index";

async function testLog() {
    const logger = new Logger();
    logger.log("just some text");
    logger.log({ content: "just some data" });

    logger.log("Subject 1", "log input");
    logger.log("Subject 1", { content: "data" });
    logger.log("Subject 2", "more log input");
    logger.log("Subject 2::subtext", "even more log input");
    logger.log("Subject 1", "back to subject 1");

    logger.log(new Error("Test exception"));
}

async function testMoreLog() {
    const logger = new Logger();
    const message = CommandlineUtils.getFirstArgument("Example log output");
    logger.log(logger.colourFormatPrettyObsArrowText("Logging test"));

    logger.log("Logger subject", `${message} 1.1`);
    logger.log("Logger subject", `${message} 1.2`);
    logger.log("Logger subject", `${message} 1.3`);
    logger.log("Different subject", `${message} 2.1`);
    logger.log("Different subject", `${message} 2.2`);
    logger.log("Logger subject", `${message} 1.4`);
    logger.log("Logger subject::sub-subject:", `${message} 1.4.1`);
    logger.log("Different subject", `${message} 2.3`);
    logger.log("Logger subject::sub-subject:", `${message} 1.4.2`);
    logger.log("Logger subject", `${message} 1.5`);
}

async function testExceptionLog() {
    const logger = new Logger();
    try {
        logger.log(logger.colourFormatPrettyObsArrowText("Test exception"));
        throw new Error("tests an exception in logging");
    } catch (error) {
        logger.log(error);
    }
}

async function testDebugLog() {
    const logger = new Logger();
    const message = CommandlineUtils.getFirstArgument("Example log debug heading");
    logger.log(logger.colourFormatPrettyObsArrowText("Debug timing test"));

    logger.debugStart("Start data", message);
    await Runtime.delay(2500);
    logger.debugStop("Stop data", `stop: ${message}`);
}

async function testProgressBar() {
    const logger = new ProgressLogger();
    const initialMessage = CommandlineUtils.getFirstArgument("Logging progress..");

    logger.log(logger.colourFormatPrettyObsArrowText("Running an example progress bar"));

    let total = 10;
    logger.start(total, initialMessage);
    const action = () => {
        --total;
        logger.update();
        if (total > 0) {
            setTimeout(
                () => {
                    action();
                },
                total === 7 ? 12000 : 1000
            );
        }
    };

    action();
}

// Test runner
async function main() {
    await testLog();
    await testMoreLog();
    await testExceptionLog();
    await testDebugLog();
    await testProgressBar();
}

main();
