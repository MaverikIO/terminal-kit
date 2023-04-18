
import readline from 'readline';
readline.emitKeypressEvents(process.stdin);

import { KeypressEvent } from './interfaces/keypress-event';



// let listeningToKeypresses = false;
// TODO: getting a warning about the number is listeneres on stdin and stdout
// which is unexpected because I am using both `removeListener` and `stdin.once`
// both of which should remove the listenere after it is set (only one of these
// should be necessary...) but the warning persists. Can rewrite this to only
// listen once and then allow subscriptions to that listener (toggle it on and 
// off between keypresses)
process.stdin.setMaxListeners(0)
process.stdout.setMaxListeners(0)


/**
 * Wait for a keypress
 * @returns Promise
 */
export async function keypress( key?:string ) {
    
    process.stdin.setRawMode(true); 

    const promise = new Promise<KeypressEvent>( (resolve, reject) => {

        const listener = (str, keypressEvent: KeypressEvent) => {

            if ( keypressEvent.ctrl === true && keypressEvent.name === 'c' ) {
                process.stdin.removeListener('keypress', listener)
                process.stdin.setRawMode(false); 
                process.exit()
            }
            if ( key === undefined || key === keypressEvent.name ) {
                process.stdin.removeListener('keypress', listener)
                process.stdin.setRawMode(false); 
                resolve(keypressEvent)
            }
        }
        process.stdin.on('keypress', listener )
    } )
    return promise
}
