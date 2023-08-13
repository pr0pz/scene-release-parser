import ReleaseParser from '../ReleaseParser.js'

/**
 * This file is just used for on the fly testing and debugging and is not needed elsewhere.
 * 
 * @author Wellington Estevo
 * @version 1.2.1
 */

// console.log( '  [Parsed] ' + ReleaseParser( 'D-Ron-The_World_Is_Yours-WEB-2017-RAGEMP3', 'MP3' ).toString() )
// console.log( '[Expected] Artist: D-Ron / Title: The World Is Yours / Group: RAGEMP3 / Year: 2017 / Source: WEB / Type: Music' +'\n' )

// console.log( ReleaseParser('', '').toString() )

console.log( ReleaseParser( 'Pokemon.23.Der.Film.Geheimnisse.des.Dschungels.German.2020.ANiME.DL.EAC3D.1080p.BluRay.x264-STARS', 'anime' ).toString() )