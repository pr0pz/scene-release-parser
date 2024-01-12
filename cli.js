#!/usr/bin/env node
import ReleaseParser from './ReleaseParser.js'
import pckg from './package.json' assert { type: 'json' }

/**
 * CLI interface for ReleaseParser
 * 
 * @author Wellington Estevo
 * @version 1.4.4
 */

// Skip first two args
// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
var releaseName = process.argv[2] !== '' ? process.argv[2] : ''
var section = process.argv[3] !== '' ? process.argv[3] : ''

// No release name given?
if ( typeof releaseName !== 'string' || releaseName === '' )
{
	console.error( 'Please enter a proper release name.' )
}
else
{
	// Check for commands or parse release
	switch ( releaseName )
	{
		// Version
		case '-v':
		case '-version':
		case '--version':
			console.log( 'v' + pckg.version )
			break

		// Help
		case '-h':
		case '-help':
		case '--help':
			console.log([
				"",
				"  " + pckg.description,
				"",
				"  Example:",
				"   release-parser 24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed tv",
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
				"    }",
				"",
				"  If you get errors, try enclosing the release name in parenthesis: \"Artist--Title-(Bla)-2000-Group\"",
				"  Some shells have issues with some characters (like brackets)."
			].join('\n'))
			break
		
		// Default parse
		default:
			console.log( ReleaseParser( releaseName, section ).data )
	}
}

