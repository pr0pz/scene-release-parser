#!/usr/bin/env node

// Import Parser
import ReleaseParser from './ReleaseParser.js'
// Get some Infos from package.json
import pckg from './package.json' assert { type: 'json' }

// Skip first two args
// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
var args = process.argv.slice(2)

// No release name given?
if ( !args[0] ) {
	
	console.error( 'Please enter a release name.' )

} else {

	// Check for commands or parse release
	switch ( args[0] ) {

		// Version
		case '-v':
		case '--version':
			console.log( 'v' + pckg.version )
			break

		// Help
		case '-h':
		case '--help':
			console.log([
				"",
				"  " + pckg.description,
				"",
				"  Example:",
				"   release-parser 24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed",
				"",
				"    => {",
				"        release: '24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed',",
				"        title: '24',",
				"        titleExtra: '9 00 Uhr bis 10 00 Uhr',",
				"        group: 'c0nFuSed',",
				"        year: null,",
				"        date: null,",
				"        season: 2,",
				"        episode: 2,",
				"        flags: [ 'READNFO', 'TV Dubbed' ],",
				"        source: 'DVDRip',",
				"        format: 'SVCD',",
				"        resolution: null,",
				"        audio: null,",
				"        device: null,",
				"        version: null,",
				"        language: { de: 'German', multi: 'Multilingual' },",
				"        type: 'TV'",
				"    }"
			].join('\n'))
			break
		
		// Default parse
		default:
			console.log( ReleaseParser( args[0] ).data )
	}
}

