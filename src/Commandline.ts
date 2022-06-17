const process = require("process");

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
