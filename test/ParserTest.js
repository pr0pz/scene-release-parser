/**
 * This file is just used for on the fly testing and debugging and is not needed elsewhere.
 */

import ReleaseParser from '../ReleaseParser.js'

console.log( '  [Parsed] ' + ReleaseParser( 'SurCode.DVD.Professional.DTS.Encoder.v1.0.21.Retail-iNTENSiON', 'Apps' ).toString() )
console.log( '[Expected] Title: SurCode DVD Professional DTS Encoder / Group: iNTENSiON / Flags: Retail / Version: 1.0.21 / Type: App' +'\n' )