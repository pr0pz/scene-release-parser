/**
 * This file is just used for on the fly testing and debugging and is not needed elsewhere.
 */

import ReleaseParser from '../ReleaseParser.js'

console.log( '  [Parsed] ' + ReleaseParser( 'RSP.OGG.Vorbis.Player.OCX.v2.5.0-Lz0', '0DAY' ).toString() )
console.log( '[Expected] Title: RSP OGG Vorbis Player OCX / Group: Lz0 / Format: OGG / Version: 2.5.0 / Type: App' )