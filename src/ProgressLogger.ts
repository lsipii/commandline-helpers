import { formatDuration, formatTimeEstimation, getDateNow, getDuration } from "transformation-helpers/Dates";
import { getRandomNumber, roundNicely } from "transformation-helpers/Numbers";
import { ifString } from "transformation-helpers/Strings";

import { clearCurrentLine, logRaw } from "./LogOutput";

export default class ProgressLogger {
    #progressBar = { max: 0, current: 0, duration: null, startTime: null, lastTime: null, isTouched: false };
    #progressListenerTimeout = null;

    /**
     * Log progress
     *
     * @param maxOrAdvance
     * @param initialMessage
     */
    logProgress(maxOrAdvance?: number, initialMessage?: string): void {
        this.#progressBar.isTouched = false;
        this.#progressBar.lastTime = getDateNow();

        if (this.#progressBar.max > 0) {
            if (typeof maxOrAdvance === "number") {
                // Advancement given as param
                this.#progressBar.current += maxOrAdvance;
            } else {
                this.#progressBar.current += 1;
            }

            this.#progressBar.duration = getDuration(this.#progressBar.startTime, this.#progressBar.lastTime);
            const averageDuration = Math.abs(this.#progressBar.duration / this.#progressBar.current);
            const estDuration = averageDuration * (this.#progressBar.max - this.#progressBar.current);

            // Clear current line
            clearCurrentLine();

            if (this.#progressBar.current < this.#progressBar.max) {
                //
                // Continue progress
                //
                logRaw(
                    `::: [ ${roundNicely((this.#progressBar.current / this.#progressBar.max) * 100, 0)} % → ${this.#progressBar.current} / ${
                        this.#progressBar.max
                    } ] ::: [ Time: ${formatDuration(this.#progressBar.duration)} ] ::: [ ETA: ${formatTimeEstimation(
                        estDuration,
                        this.#progressBar.lastTime
                    )} ] ::: [ Remaining: ${formatDuration(estDuration)} ]`
                );
            } else {
                //
                // End progress
                //
                this.#stopProgressListener();

                logRaw(`::: [ ${this.#progressBar.max} units ] ::: [ Completed in: ${formatDuration(this.#progressBar.duration)} ]\n`);
                this.#progressBar.max = 0;
                this.#progressBar.current = 0;
                this.#progressBar.duration = 0;
                this.#progressBar.startTime = null;
                this.#progressBar.lastTime = null;
            }
        } else if (typeof maxOrAdvance === "number") {
            //
            // Start progess
            //
            this.#progressBar.max = maxOrAdvance;
            this.#progressBar.current = 0;
            this.#progressBar.duration = 0;
            this.#progressBar.startTime = getDateNow();
            this.#startProgressListener();

            if (ifString(initialMessage)) {
                logRaw(`\n::: ${initialMessage}\n`);
            } else {
                logRaw(`\n`);
            }
            logRaw(`::: [ ${this.#progressBar.current} / ${this.#progressBar.max} ] :::`);
        } else {
            throw new Error("No initial max value provided and no on-going progress");
        }
    }

    /**
     *
     */
    #startProgressListener() {
        this.#progressListenerTimeout = setTimeout(() => {
            this.#logProgressTouch();
            this.#startProgressListener();
        }, 5000);
    }

    /**
     *
     */
    #stopProgressListener() {
        if (this.#progressListenerTimeout !== null) {
            clearTimeout(this.#progressListenerTimeout);
            this.#progressListenerTimeout = null;
        }
    }

    /**
     * Touch a log progress, indicate of slowness
     */
    #logProgressTouch(): void {
        if (!this.#progressBar.isTouched && this.#progressBar.lastTime !== null) {
            const seconds = 6;
            const dateNow = getDateNow();

            if (getDuration(this.#progressBar.lastTime, dateNow) > seconds * 1000) {
                const snackOrGo = getRandomNumber(0, 100) >= 60 ? "🍕" : ".";
                logRaw(` ${".".repeat(getRandomNumber(0, 4, 1))}${snackOrGo}🐢→ `);
                this.#progressBar.lastTime = dateNow;
                this.#progressBar.isTouched = true;
            }
        }
    }
}
