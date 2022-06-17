const process = require("process");

import { getRandomNumber } from "transformation-helpers/Numbers";

/**
 * Ensures a true value
 *
 * @param environtVariableName
 * @returns
 */
export function getEnvironmentBoolean(environtVariableName: string): boolean {
    return typeof process.env[environtVariableName] != "undefined" && process.env[environtVariableName] === "true";
}

/**
 * Env getter
 *
 * @param environtVariableName
 * @param defaultValue
 * @returns
 */
export function getEnvironmentValue(environtVariableName: string, defaultValue: any = ""): any {
    if (typeof process.env[environtVariableName] !== "undefined") {
        return process.env[environtVariableName];
    }
    return defaultValue;
}

/**
 * Delay helper
 *
 * @param ms
 * @returns
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Executes callback, retries for specific try times
 *
 * @param checkFunc
 * @param maxRetries = 3
 * @param baseDelay = 1000 ms
 * @param currentRetryCount = 0
 */
export async function retryDelayTry(
    checkFunc: () => Promise<boolean>,
    maxRetries: number = 3,
    baseDelay: number = 1000,
    currentRetryCount: number = 0
): Promise<boolean> {
    const isAGo = await checkFunc();
    if (isAGo) {
        return true;
    } else {
        currentRetryCount++;
        if (currentRetryCount <= maxRetries) {
            const addition = getRandomNumber(1, 5, 0) * 1000;
            const delayMs = baseDelay + currentRetryCount * addition; // Increase delay with 1-5 secs times the retry count
            await delay(delayMs);
            return retryDelayTry(checkFunc, currentRetryCount, maxRetries, baseDelay);
        } else {
            return false;
        }
    }
}
