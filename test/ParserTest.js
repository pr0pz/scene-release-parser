/**
 * This file is just used for on the fly testing and debugging and is not needed elsewhere.
 */

import ReleaseParser from '../ReleaseParser.js'

console.log( '  [Parsed] ' + ReleaseParser( '24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed', 'tv' ).toString() )
console.log( '[Expected] Show: 24 / Title: 9 00 Uhr bis 10 00 Uhr / Group: c0nFuSed / Season: 2 / Episode: 2 / Flags: READNFO, TV Dubbed / Source: DVDRip / Format: SVCD / Language: German, Multilingual / Type: TV' )