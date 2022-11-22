#!/usr/bin/env node

var sceneRelease = require('./ReleaseParser.js')

// Get some Infos from package.json
var package = require('./package.json')
// Skip first two args
// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
var argv = process.argv.slice(2)

// No release name given?
if ( !argv[0] ) {
	return console.error( 'Please enter a release name.' )
}

// Show help message
if ( argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1 ) {
	console.log([
		'',
		'  ' + package.description,
		'',
		'  Example:',
		'    scene-release-parser 24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed',
		'',
		'    => {',
		'        "title": "24",',
		'        "titleExtra": "9 00 Uhr bis 10 00 Uhr",',
		'        "group": "c0nFuSed",',
		'        "year": null,',
		'        "date": null,',
		'        "season": 2,',
		'        "episode": 2,',
		'        "flags": [ "READNFO", "TV Dubbed" ],',
		'        "source": "DVDRip",',
		'        "format": "SVCD",',
		'        ... }'
	].join('\n'))
	return

// Show version
} else if ( argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1 ) {
	console.log( 'v' + package.version )
	return
}

console.log( new sceneRelease( argv[0] ) )