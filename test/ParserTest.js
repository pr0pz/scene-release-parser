/**
 * This file is just used for on the fly testing and debugging and is not needed elsewhere.
 */

import ReleaseParser from '../ReleaseParser.js'

console.log( '  [Parsed] ' + ReleaseParser( 'Ultimate.Expedition.S01E01.Weve.All.Got.A.Screw.Loose.2160p.iNTERNAL.WEB.HDR.VP9-13', 'TV-HD' ).toString() )
console.log( '[Expected] Show: Ultimate Expedition / Title: Weve All Got A Screw Loose / Group: 13 / Season: 1 / Episode: 1 / Flags: HDR, Internal / Format: VP9 / Resolution: 2160p / Type: TV' )