const process = require("process");

/**
 *
 * @param fallback
 * @returns
 */
export function getFirstArgument(fallback: string = ""): string {
    const pargs = parseCliArgs();

    let message = fallback;
    if (pargs.args.length > 0) {
        message = pargs.args[0];
    }
    return message;
}

/**
 *
 * @returns
 */
export function parseCliArgs(): { flags: Array<string>; args: Array<string> } {
    const args = { flags: [], args: [] };
    if (process.argv.length > 2) {
        return process.argv.slice(2).reduce((pargs, current) => {
            if (current.indexOf("--") === 0) {
                pargs.flags.push(current);
            } else {
                pargs.args.push(current);
            }
            return pargs;
        }, args);
    }
    return args;
}
