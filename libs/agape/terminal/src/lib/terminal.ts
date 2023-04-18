


/**
 * Get the terminal size in rows and columns
 * @returns Terminal size
 */
export function getTerminalSize(): { rows:number, columns:number}  {
    return {
        rows: process.stdout.rows,
        columns: process.stdout.columns
    }
}