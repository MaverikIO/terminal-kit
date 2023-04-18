
import { CursorPosition } from "./interfaces/cursor-position"

/**
 * Get the cursor position in the terminal
 * @returns Promise
 */
export async function getCursorPosition(): Promise<CursorPosition> {
    const termCodeGetCursorPosition =  '\u001b[6n'

    const promise = new Promise<{row: number, col: number}>( (resolve) => {
        process.stdin.setEncoding('utf8')
        process.stdin.setRawMode(true)
            const findCursor = function() {
                const buffer = process.stdin.read();
                const string = JSON.stringify(buffer); // "\u001b[9;1R"
                const regex = /\[(.*)/g;
                const match = regex.exec(string)
                const xy = match ? match[0].replace(/\[|R"/g, '').split(';') : undefined;
                const position:CursorPosition = xy ? { row: Number(xy[0]) - 1, col: Number(xy[1]) - 1 } : undefined;
                resolve(position)
            }

            process.stdin.once('readable', findCursor);
            process.stdout.write(termCodeGetCursorPosition);
    })

    return promise
}

/**
 * Set the cursor position in absolute row, col coordinates
 * @param position 
 */
export async function setCursorPosition (position: CursorPosition) {
    const row = position.row + 1
    const col = position.col + 1
    process.stdout.write(`\u001b[${row};${col}H`)
}

/**
 * Hide the cursor from view
 */
export async function hideCursor() {
    process.stdout.write(`\u001b[?25l`)
}

/**
 * Show the cursor
 */
export async function showCursor() {
    process.stdout.write(`\u001b[?25h`)
}
