import patterns from './ReleasePatterns.js'

/**
 * ReleaseParser - A library for parsing scene release names.
 * 
 * @author Wellington Estevo
 * @version 1.4.0
 * 
 * @module ReleaseParser
 * @param {string} releaseName - Original release name.
 * @param {string} section - Optional: Original release section for even better parsing.
 */

const ReleaseParser = /** @lends module:ReleaseParser */ ( releaseName, section = '' ) =>
{
	/**
	 * All parsed informations.
	 * 
	 * @public
	*/
	let data = {
		'release'		: releaseName, // Original rls name
		'title'			: null, // First part of title
		'titleExtra'	: null, // Second part of title (optional) like Name of track/episode/book/xxx etc.
		'group'			: null,
		'year'			: null,
		'date'			: null,
		'season'		: null, // For TV rls
		'episode'		: null, // For TV/Audiobook/Ebook (issue) rls
		'disc'			: null, // For complete disc releases
		'flags'			: null, // Misc rls name flags
		'source'		: null,
		'format'		: null, // Rls format/encoding
		'resolution'	: null, // For Video rls
		'audio'			: null, // For Video rls
		'device'		: null, // For Software/Game rls
		'os'			: null, // For Software/Game rls
		'version'		: null, // For Software/Game rls
		'language'		: null, // Object with language code as key and name as value (in english)
		'type'			: null
	}


	/**
	 * Object toString() override: allows the object to decide how it will react when it is treated like a string.
	 * 
	 * @public
	 * @return {string} Stringified attribute values.
	 */
	const toString = () =>
	{
		let classString = ''
		let type = get( 'type' ).toLowerCase()
		let informations = get( 'all' )

		// Loop all values and put together the stringified class
		for ( let information in informations )
		{
			let informationValue = informations[ information ]

			// Skip original release name and debug
			if ( information === 'release' || information === 'debug' ) continue

			// Rename var title based on attributes
			if ( get( 'titleExtra' ) )
			{
				if ( information === 'title' )
				{
					if ( type === 'ebook' || type === 'abook' )
					{
						information = 'Author'
					}
					else if ( type === 'music' || type === 'musicvideo' )
					{
						information = 'Artist'
					}
					else if ( type === 'tv' || type === 'anime' )
					{
						information = 'Show'
					}
					else if ( type === 'xxx' )
					{
						information = 'Publisher'
					}
					else
					{
						information = 'Name'
					}
				}
				// Rename title_extra based on attributes
				else if ( information === 'titleExtra' )
				{
					if ( hasAttribute( [ 'CD Single', 'Web Single', 'VLS' ], 'source' ) )
					{
						information = 'Song'
					}
					else if ( hasAttribute( [ 'CD Album', 'Vynil', 'LP' ], 'source' ) )
					{
						information = 'Album'
					}
					else if ( hasAttribute( [ 'EP', 'CD EP' ], 'source' ) )
					{
						information = 'EP'
					}
					else
					{
						information = 'Title'
					}
				}
			}
			else
			{
				// Sports without extra title
				if ( get( 'type' ) === 'Sports' && information === 'title' )
					information = 'Name'
			}

			// Set ebook episode to edition
			if ( get( 'type' ) === 'eBook' && information === 'episode' )
				information = 'Issue'

			// Value set?
			if ( informationValue )
			{
				// Some attributes can have more then one value.
				// So put them together in this var.
				let values = ''

				// We have to handle Date a little bit different.
				if ( Object.prototype.toString.call( informationValue ) === '[object Date]' )
				{
					// https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
					values = informationValue.toLocaleString('de-DE', { // you can use undefined as first argument
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
					})
					/* old
					values =
						('0' + informationValue.getDate()).slice(-2) + '.' +
						('0' + informationValue.getMonth()).slice(-2) + '.' +
						informationValue.getFullYear()*/
				}
				// Join all found languages
				else if ( information === 'language' )
				{
					values = Object.values( informationValue ).join( ', ' )

				}
				else
				{
					values = Array.isArray( informationValue ) ? values + informationValue.join( ', ' ) : informationValue
				}

				// Separate every information type with a slash
				if ( classString )
					classString += ' / '

				classString += information.capitalizeWord() + ': ' + values
			}
		}

		return classString
	}

		
	/**
	 * Parse release language/s.
	 * 
	 * @private
	 */
	const parseLanguage = () =>
	{
		let languageCodes = []

		// Search and replace pattern in regex pattern for better matching
		let regexPattern = cleanupPattern( releaseName, patterns.REGEX_LANGUAGE, [ 'audio', 'device', 'flags', 'format', 'group', 'os', 'resolution', 'source', 'year' ] )

		// Loop all languages
		for ( const languageCodeKey in patterns.LANGUAGES )
		{
			let languageName = patterns.LANGUAGES[ languageCodeKey ]

			// Turn every var into an array so we can loop it
			if ( !Array.isArray( languageName ) )
				languageName = [ languageName ]

			// Loop all sub language names
			languageName.forEach ( (name) =>
			{
				// Insert current lang pattern
				let newRegexPattern = regexPattern.replace( '%language_pattern%', name ).toRegExp()

				// Check for language tag (exclude "grand" for formula1 rls)
				let matches = releaseName.match( newRegexPattern )

				if ( matches )
					languageCodes.push( languageCodeKey )
			} )
		}

		if ( languageCodes )
		{
			let languages = {}

			languageCodes.forEach( (languageCode) =>
			{
				// Get language name by language key
				let language = patterns.LANGUAGES[ languageCode ]
				// If it's an array, get the first value as language name
				if ( Array.isArray( language ) )
				{
					language = patterns.LANGUAGES[ languageCode ][0]
				}
				languages[ languageCode ] = language
			} )

			// Check if lang object not empty
			// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object 
			if ( Object.keys(languages).length > 0 ) set( 'language', languages )
		}
	}


	/**
	 * Parse release date.
	 * 
	 * @private
	 */
	const parseDate = () =>
	{
		// Check for normal date
		let regex = ( '/[._(-]' + patterns.REGEX_DATE + '[._)-]/i' ).toRegExp()
		let matches = releaseName.match( regex )

		let [ day, month, year, temp, date ] = ''

		if ( matches )
		{
			// Date formats: 21.09.16 (default) / 16.09.2021 / 2021.09.16 / 09.16.2021
			year = parseInt( matches[1] )
			month = parseInt( matches[2] )
			day = parseInt( matches[3] )

			// On older Mvid releases the format is year last.
			if ( releaseName.match( patterns.REGEX_DATE_MUSIC.toRegExp() ) )
			{
				temp = year
				year = day
				day = temp
			}

			// 4 digits day (= year) would change the vars.
			if ( day.toString().length === 4 )
			{
				temp = year
				year = day
				day = temp
			}

			// Month > 12 means we swap day and month (16.09.2021)
			// What if day and month are <= 12?
			// Then it's not possible to get the right order, so date could be wrong.
			if ( month > 12 )
			{
				temp = day
				day = month
				month = temp
			}

			// 2 digits year has to be converted to 4 digits year
			// https://www.php.net/manual/en/datetime.createfromformat.php (y)
			if ( year.toString().length === 2 )
			{
				// If year <= this year, it's in the 2000's
				year = year <= ( new Date().getFullYear().toString() ).slice( -2 ) ? '20' + year : '19' + year
			}

			// Build date string
			date = year + '-' + month + '-' + day

			// Try to create datetime object
			// No error handling if it doesn't work.
			try
			{
				set( 'date', new Date( date ) )
			}
			catch ( err )
			{
				console.log( 'Datetime Error (Date): ' + date + ' / rls: ' + releaseName )
			}
		}
		else
		{
			// Cleanup release name for better matching
			let releaseNameCleaned = cleanup( releaseName, 'episode' )

			// Put all months together
			let allMonths = ''
			for ( const [key, value] of Object.entries( patterns.MONTHS ) )
			{
				allMonths = allMonths ? allMonths + '|' + value : value
			}
			// Set regex pattern
			let regexPattern = patterns.REGEX_DATE_MONTHNAME.replace( '%monthname%', allMonths )
			// Match day, month and year
			matches = releaseNameCleaned.match( ( '/[._-]' + regexPattern + '[._-]/i' ).toRegExp() )

			// If match: get last matched value (should be the right one)
			// Day is optional, year is a must have.
			if ( matches && matches[0] )
			{
				// Day, default to 1 if no day found
				day = 1
				if ( matches[1] )
				{
					day = matches[1]
				}
				else if ( matches[3] )
				{
					day = matches[3]
				}
				else if ( matches[5] )
				{
					day = matches[5]
				}

				// Month
				month = matches[2]

				// Year
				year = matches[4]

				// Check for month name to get right month number
				for ( const monthNumber in patterns.MONTHS )
				{
					let monthPattern = patterns.MONTHS[ monthNumber ]

					matches = month.match( ( '/' + monthPattern + '/i' ).toRegExp() )

					if ( matches )
					{
						month = monthNumber
						break
					}
				}

				// Build date string
				date = year + '-' + month + '-' + day

				// Try to create datetime object
				// No error handling if it doesn't work.
				try
				{
					set( 'date', new Date( date ) )
				}
				catch ( err )
				{
					console.log( 'Datetime Error (Date): ' + date + ' / rls: ' + releaseName )
				}
			}
		}
	}


	/**
	 * Parse release year.
	 * 
	 * @private
	 */
	const parseYear = () =>
	{
		// Remove any version so regex works better (remove unneeded digits)
		let releaseNameCleaned = cleanup( releaseName, 'version' )

		// Match year
		let matches = Array.from( releaseNameCleaned.matchAll( patterns.REGEX_YEAR.toRegExp() ) )

		if ( matches.length >= 1 )
		{
			// If we have any matches, take the last possible value (normally the real year).
			// Release name could have more than one 4 digit number
			// The first number would belong to the title.
			let year = matches.length >= 2 ? matches[ matches.length - 1 ][1] : matches[0][1]

			// Sanitize year if it's not only numeric ("199X"/"200X")
			year = year.isNumeric() ? parseInt( year ) : sanitize( year )
			set( 'year', year )
		}
		// No Matches? Get year from parsed Date instead.
		else if ( get( 'date' ) )
		{
			set( 'year', get( 'date' ).getFullYear() )
		}
	}


	/**
	 * Parse release device.
	 * 
	 * @private
	 */
	const parseDevice = () =>
	{
		if ( !isBookware() )
		{
			let device = parseAttribute( patterns.DEVICE )
			if ( device )
			{
				// Only one device allowed, get last parsed occurence, may be the right one
				device = Array.isArray( device ) ? device[ device.length - 1 ] : device
				set( 'device', device )
			}
		}
	}


	/**
	 * Parse release flags.
	 * 
	 * @private
	 */
	const parseFlags = () =>
	{
		let flags = parseAttribute( patterns.FLAGS, 'flags' )

		if ( flags )
		{
			// Always save flags as array
			flags = !Array.isArray( flags ) ? [ flags ] : flags

			// Remove DC flag if DC device was parsed
			if (
				flags.indexOf( 'Directors Cut' ) >= 0 &&
				get( 'device' ) === 'Sega Dreamcast'
			)
			{
				flags.splice( flags.indexOf( 'Directors Cut' ), 1 )
			}

			set( 'flags', flags )
		}
	}


	/**
	 * Parse the release group.
	 * 
	 * @private
	 */
	const parseGroup = () =>
	{
		let matches = releaseName.match( patterns.REGEX_GROUP.toRegExp() )

		if ( matches && matches[1] )
		{
			set( 'group', matches[1] )
		}
		else
		{
			set( 'group', 'NOGRP' )
		}
	}

	/**
	 * Parse release version (software, games, etc.).
	 * 
	 * @private
	 */
	const parseVersion = () =>
	{
		let matches = null
		if ( isBookware() )
		{
			// Cleanup release name for better matching
			let regexPattern = '/[._-]' + patterns.REGEX_VERSION_BOOKWARE + '[._-]/i'
			matches = get( 'release' ).match( ( regexPattern ).toRegExp() )
		}
		else
		{
			// Cleanup release name for better matching
			let releaseNameCleaned = cleanup( releaseName, [ 'flags', 'device' ] )
			let regexPattern = '/[._-]' + patterns.REGEX_VERSION + '[._-]/i'
			matches = releaseNameCleaned.match( ( regexPattern ).toRegExp() )
		}
		if ( matches !== null ) set( 'version', matches[1].trim( '.' ) )
	}


	/**
	 * Parse release source.
	 * 
	 * @private
	 */
	const parseSource = () =>
	{
		let source = null
		if ( isBookware() )
		{
			patterns.BOOKWARE.every( value =>
			{
				let matches = get( 'release' ).match( ( '/^' + value + '[._-]/i' ).toRegExp() )

				if ( matches )
				{
					source = matches[0].trim( '.' );

					// If source is all uppercase = capitalize
					if ( source === source.toUpperCase() )
					{
						source = source.capitalizeWords()
					}
					return false
				}
				return true
			})
		}
		else
		{
			source = parseAttribute( patterns.SOURCE, 'source' )
		}

		if ( source !== null )
		{
			// Only one source allowed, so get first parsed occurence (should be the right one)
			source = Array.isArray( source ) ? source[0] : source
			set( 'source', source )
		}
	}


	/**
	 * Parse release format/encoding.
	 * 
	 * @private
	 */
	const parseFormat = () =>
	{
		if ( !isBookware() )
		{
			let format = parseAttribute( patterns.FORMAT, 'format' )

			if ( format )
			{
				// Only one source allowed, so get first parsed occurence (should be the right one)
				format = Array.isArray( format ) ? format[0] : format
				set( 'format', format )
			}
		}
	}


	/**
	 * Parse release resolution.
	 * 
	 * @private
	 */
	const parseResolution = () =>
	{
		if ( !isBookware() )
		{
			let resolution = parseAttribute( patterns.RESOLUTION )

			if ( resolution )
			{
				// Only one resolution allowed, so get first parsed occurence (should be the right one)
				resolution = Array.isArray( resolution ) ? resolution[0] : resolution
				set( 'resolution', resolution )
			}
		}
	}


	/**
	 * Parse release audio.
	 * 
	 * @private
	 */
	const parseAudio = () =>
	{
		if ( !isBookware() )
		{
			let audio = parseAttribute( patterns.AUDIO )
			if ( audio ) set( 'audio', audio )

		}
	}


	/**
	 * Parse release operating system.
	 * 
	 * @private
	 */
	const parseOs = () =>
	{
		if ( !isBookware() )
		{
			let os = parseAttribute( patterns.OS )
			if ( os ) set( 'os', os )
		}
	}


	/**
	 * Parse release season.
	 * 
	 * @private
	 */
	const parseSeason = () =>
	{
		if ( !isBookware() )
		{
			let matches = releaseName.match( patterns.REGEX_SEASON.toRegExp() )

			if ( matches )
			{
				// key 1 = 1st pattern, key 2 = 2nd pattern
				let season = matches[1] ? matches[1] : null
				season = !season && matches[2] ? matches[2] : season

				if ( season )
				{
					set( 'season', parseInt( season ) )
		
					// We need to exclude some nokia devices, would be falsely parsed as season (S40 or S60)
					if (
						( season == '40' || season == '60' ) &&
						(
							get( 'os' ) === 'Symbian' ||
							releaseName.match( ( '/[._-]N(7650|66\\d0|36\\d0)[._-]/i' ).toRegExp() )
						)
					)
					{
						set( 'season', null )
					}
				}
			}
		}
	}


	/**
	 * Parse release episode.
	 * 
	 * @private
	 */
	const parseEpisode = () =>
	{
		// We need to exclude some nokia devices, would be falsely parsed as episode (beginning with N)
		if (
			get( 'os' ) !== 'Symbian' &&
			get( 'device' ) !== 'Playstation' &&
			!releaseName.match( ( '/[._-]N(7650|66\\d0|36\\d0)[._-]/i' ).toRegExp() ) &&
			!hasAttribute( [ 'Special Edition', 'Extended' ], 'flags' ) &&
			!isBookware()
		)
		{
			let regexPattern = ( '/[._-]' + patterns.REGEX_EPISODE + '[._-]/i' ).toRegExp()
			let matches = releaseName.match( regexPattern )

			if ( matches )
			{
				// key 1 = 1st pattern, key 2 = 2nd pattern
				// 0 can be a valid value
				let episode = matches[1] ? matches[1] : null
				episode = !episode && matches[2] ? matches[2] : episode

				if ( episode )
				{
					// Sanitize episode if it's not only numeric (eg. more then one episode found "1 - 2")
					// If it's episode 0, keep it as a string. If not, IF statements won't work, won't recognize value as set.
					if ( episode.isNumeric() && episode !== '0' )
					{
						episode = parseInt( episode )
					}
					else
					{
						episode = sanitize( episode.replace( /[aA_\.]+/, '-' ) )
					}
					set( 'episode', episode )
				}
			}
			else
			{
				regexPattern = ( '/[._-]' + patterns.REGEX_DISC + '[._-]/i' ).toRegExp()
				matches = releaseName.match( regexPattern )

				if ( matches )
				{
					set( 'disc', parseInt( matches[1] ) )
				}
			}
		}
	}


	/**
	 * Parse Sports type.
	 *
	 * @private
	 * @return {bool}
	 */
	const isSports = () =>
	{
		let isSports = false
		patterns.SPORTS.forEach( value =>
		{
			let pattern = ( '/^' + value + '[._-]/i' ).toRegExp()
			if ( get( 'release' ).match( pattern ) )
				isSports = true
		})
		return isSports
	}


	/**
	 * Parse Bookware type.
	 *
	 * @private
	 * @return {bool}
	 */
	const isBookware = () =>
	{
		if ( hasAttribute( 'Tutorial', 'flags' ) )
			return true

		if ( get( 'release' ).match( ( '/[._(-]bookware[._)-]/i' ).toRegExp() ) )
			return true

		let isBookware = false
		patterns.BOOKWARE.forEach( value =>
		{
			let pattern = ( '/^' + value + '[._-]/i' ).toRegExp()
			if ( get( 'release' ).match( pattern ) )
				isBookware = true
		})

		return isBookware
	}


	/**
	 * Parse music type.
	 * Artist_Name-Release_Title-Stuff...
	 * If release has no dots and is separated by hyphens, probably music related release.
	 *
	 * @private
	 * @return {bool}
	 */
	const isMusic = () =>
	{
		let pattern = ( '/^[\\w()]+-[\\w()]+-[\\w()-]+$/i' ).toRegExp()
		if ( get( 'release' ).match( pattern ) )
			return true

		return false;
	}
	

	/**
	 * Parse the release type by section.
	 *
	 * @private
	 * @param {string} section - Original release section.
	 */
	const parseType = ( section ) =>
	{
		// 1st: guesss type by rls name
		let type = guessTypeByParsedAttributes()
		// 2nd: no type found? guess by section
		type = !type ? guessTypeBySection( section ) : type
		// 3rd: set parsed type or default to Movie
		type = !type ? 'Movie' : type

		set( 'type', type )
	}


	/**
	 * Guess the release type by already parsed attributes.
	 *
	 * @private
	 * @return {string} Guessed type.
	 */
	const guessTypeByParsedAttributes = () =>
	{
		let type = ''
		
		// Match bookware
		if ( isBookware() )
		{
			type = 'Bookware'
		}
		// Match sports events
		else if ( isSports() )
		{
			type = 'Sports'

			// Games = if device was found or game related flags
			if (
				get( 'device' ) ||
				hasAttribute( patterns.flagsGames, 'flags' ) ||
				hasAttribute( patterns.sourcesGames, 'source' ) ||
				patterns.GROUPS_GAMES.includes( get('group') ) ||
				patterns.GROUPS_APPS.includes( get('group') )
			)
			{
				type = 'Game'
			}
		}
		// Font = Font related flag
		else if ( hasAttribute( [ 'FONT', 'FONTSET' ], 'flags' ) )
		{
			type = 'Font'
		}
		// Abook flag
		else if ( hasAttribute( 'ABOOK', 'flags' ) )
		{
			type = 'ABook'
		}
		// Music related sources
		else if (
			isMusic() ||
			hasAttribute( patterns.sourcesMusic, 'source' ) ||
			hasAttribute( patterns.flagsMusic, 'flags' )
		)
		{
			type = 'Music'

			// Games = if device was found or game related flags
			if (
				get( 'device' ) ||
				hasAttribute( patterns.flagsGames, 'flags' ) ||
				hasAttribute( patterns.sourcesGames, 'source' ) ||
				patterns.GROUPS_GAMES.includes( get('group') )
			)
			{
				type = 'Game'
			}
			else if ( patterns.GROUPS_APPS.includes( get('group') ) )
			{
				type = 'App'
			}
			else if (
				get( 'resolution' ) ||
				hasAttribute( patterns.formatsMvid, 'format' ) ||
				hasAttribute( patterns.formatsVideo, 'format' ) ||
				hasAttribute( patterns.sourcesMvid, 'source' )
			)
			{
				type = 'MusicVideo'
			}
			else if (
				get( 'os' ) ||
				( get( 'version' ) && !get( 'source' ) ) ||
				hasAttribute( patterns.flagsApps, 'flags' )
			)
			{
				type = 'App'
			}
		}
		// Ebook related flags
		else if ( hasAttribute( patterns.flagsEbook, 'flags' ) )
		{
			type = 'eBook'
		}
		// Anime related flags
		else if (
			hasAttribute( patterns.flagsAnime, 'flags' ) ||
			hasAttribute( 'RAWRip', 'source' )
		)
		{
			type = 'Anime'
		}
		// Docu related flags
		/*else if ( hasAttribute( 'Docu', 'flags' ) )
		{
			type = 'Docu'
		}*/
		// XXX related flags
		else if ( hasAttribute( patterns.flagsXxx, 'flags' ) )
		{
			type = 'XXX'
		}
		// Check for MVid formats
		else if (
			hasAttribute( patterns.formatsMvid, 'format' ) ||
			hasAttribute( patterns.sourcesMvid, 'source' ) )
		{
			type = 'MusicVideo'
		}
		// Games = if device was found or game related flags
		else if (
			hasAttribute( patterns.flagsGames, 'flags' ) ||
			hasAttribute( patterns.sourcesGames, 'source' ) ||
			patterns.GROUPS_GAMES.includes( get('group') )
		)
		{
			type = 'Game'
		}
		else if ( get( 'device' ) )
		{
			type = 'Game'

			if ( get( 'os' ) )
				type = 'App'
		}
		// Do We have an episode?
		else if (
			get( 'episode' ) ||
			get( 'season' ) ||
			hasAttribute( patterns.sourcesTv, 'source' )
		) 
		{
			// Default to TV
			type = 'TV'

			// Description with date inside brackets is nearly always music or musicvideo
			if ( releaseName.match( patterns.REGEX_DATE_MUSIC.toRegExp() ) )
			{
				type = 'MusicVideo'
			}
		}
		// Description with date inside brackets is nearly always music or musicvideo
		else if ( releaseName.match( patterns.REGEX_DATE_MUSIC.toRegExp() ) )
		{
			type = get( 'resolution' ) ? 'MusicVideo' : 'Music'
		}
		// Has date and a resolution? probably TV
		else if ( get( 'date' ) && get( 'resolution' ) )
		{
			// Default to TV
			type = 'TV'
		}
		// Not TV, so first check for movie related flags
		else if ( hasAttribute( patterns.flagsMovie, 'flags' ) )
		{
			type = 'Movie'
		}
		// Music if music format and no version
		else if ( hasAttribute( patterns.formatsMusic, 'format' ) )
		{
			type = 'Music'

			if ( get( 'version' ) && !get( 'source' ) )
				type = 'App'
		}
		// App = if os is set or software (also game) related flags
		else if (
			(
				get( 'os' ) ||
				get( 'version' ) ||
				hasAttribute( patterns.flagsApps, 'flags' )
			) && !hasAttribute( patterns.formatsVideo, 'format' ) )
		{
			type = 'App'
		}
		// Last time to check for some movie stuff
		else if (
			hasAttribute( patterns.sourcesMovies, 'source' ) ||
			hasAttribute( patterns.formatsVideo, 'format' ) ||
			( get( 'resolution' ) &&
				(
					get( 'year' ) ||
					get( 'format' ) ||
					get( 'source' ) === 'Bluray' ||
					get( 'source' ) === 'DVD'
				)
			)
		)
		{
			type = 'Movie';
		}

		return type
	}


	/**
	 * Guess the release type by section.
	 *
	 * @private
	 * @param {string} section - Original release section.
	 * @return {string} Guessed/Parsed release type.
	 */
	const guessTypeBySection = ( section ) =>
	{
		let type = ''

		// No Section, no chocolate!
		if ( section )
		{
			// Loop all types
			for ( const typeParentKey in patterns.TYPE )
			{
				let typeValue = patterns.TYPE[ typeParentKey ]

				// Transform every var to array, so we can loop
				if ( !Array.isArray( typeValue ) )
					typeValue = [ typeValue ]

				// Loop all type patterns
				for ( const value of typeValue )
				{
					// Match type
					let matches = section.match( ( '/' + value + '/i' ).toRegExp() )

					// Match found, set type parent key as type
					if ( matches )
					{
						type = typeParentKey
						break
					}
				}

				if ( type !== '' ) break;
			}
		}

		return type
	}


	/**
	 * Parse release title.
	 * 
	 * @private
	 */
	const parseTitle = () =>
	{
		let type = get( 'type' ).toLowerCase()
		let releaseNameCleaned = releaseName.replace( /,/g, '' )

		// Main title vars
		let [ title, titleExtra ] = ''
		// Some vars for better debugging which regex pattern was used
		let [ regexPattern, regexUsed, matches ] = ''

		// Music artist + release title (album/single/track name, etc.)
		if ( type === 'music' || type === 'abook' || type === 'musicvideo' )
		{
			// Setup regex pattern
			regexPattern = patterns.REGEX_TITLE_MUSIC
			regexUsed = 'REGEX_TITLE_MUSIC'

			if ( type === 'abook' )
			{
				regexPattern = patterns.REGEX_TITLE_ABOOK
				regexUsed = 'REGEX_TITLE_ABOOK'
			}
			else if ( type === 'musicvideo' )
			{
				regexPattern = patterns.REGEX_TITLE_MVID
				regexUsed = 'REGEX_TITLE_MVID'
			}

			// Search and replace pattern in regex pattern for better matching
			regexPattern = cleanupPattern( releaseName, regexPattern, [ 'audio', 'flags', 'format', 'group', 'language', 'source' ] )

			// Special check for date:
			// If date is inside brackets with more words, it's part of the title.
			// If not, then we should consider and replace the regex date patterns inside the main regex pattern.
			if ( ! releaseNameCleaned.match( patterns.REGEX_DATE_MUSIC.toRegExp() ) )
				regexPattern = cleanupPattern( releaseName, regexPattern, [ 'regex_date', 'regex_date_monthname', 'year' ] )

			// Match title
			matches = releaseNameCleaned.match( regexPattern.toRegExp() )

			if ( matches )
			{
				// Full match
				title = matches[1]

				// Split the title in the respective parts
				let titleArray = title.split( '-' )

				if ( titleArray )
				{
					// First value is the artist = title
					// We need the . for proper matching cleanup episode.
					title = cleanup( '.' + titleArray[0], 'episode' )

					// Unset first item before the loop
					titleArray.splice( 0, 1 )
					
					// Separator
					let separator = type === 'abook' ? ' - ' : '-'

					// Loop remaining parts and set title extra
					titleArray.forEach( ( titlePart, index ) =>
					{
						
						// We need the . for proper matching cleanup episode.
						titlePart = cleanup( '.' + titlePart + '.', 'episode' )
						titlePart = titlePart.replace( /^\.|\.$/gm,'' )
						
						if ( titlePart )
						{
							// First index is ok
							if (
								index === 0 ||
								(
									// Other indexes...
									index > 0 && 
									(
										// ...only with certain chars
										titlePart.includes( '_' ) ||
										titlePart.includes( ')' ) ||
										titlePart.isNumeric()
									)
								)
							)
							{
								titleExtra = titleExtra ? titleExtra + separator + titlePart : titlePart
							}
						}
					} )
				}
			}

			// Jump to default if no title found
			if ( !title ) type = 'default'
		}

		// Software (Game + Apps)
		if ( type === 'game' || type === 'app' )
		{
			// Setup regex pattern
			regexPattern = patterns.REGEX_TITLE_APP
			regexUsed = 'REGEX_TITLE_APP'

			// Search and replace pattern in regex pattern for better matching
			//regexPattern = cleanupPattern( releaseName, regexPattern, [ 'device', 'flags', 'format', 'group', 'language', 'os', 'version' ] )
			regexPattern = cleanupPattern( releaseName, regexPattern, [ 'device', 'resolution', 'os' ] )

			if ( type === 'game' )
				regexPattern = cleanupPattern( releaseName, regexPattern, [ 'disc', 'language', 'source' ] )

			// Match title
			matches = releaseNameCleaned.match( regexPattern.toRegExp() )

			if ( matches ) title = matches[1]

			// Jump to default if no title found
			if ( !title ) type = 'default'
		}

		// TV series or Sports
		if ( type === 'tv' || type === 'sports' || type === 'docu' )
		{
			// Setup regex pattern
			regexPattern = patterns.REGEX_TITLE_TV.toRegExp()
			regexUsed = 'REGEX_TITLE_TV'

			// Only needed here for releases that have episodes
			// Maybe year is before episode and have to be removed
			let releaseNameNoYear = cleanup( releaseNameCleaned, [ 'disc', 'format', 'year' ] )

			// Match title
			matches = releaseNameNoYear.match( regexPattern )

			// Check for matches with regex title tv
			if ( matches )
			{
				title = matches[1]

				// Build pattern and try to get episode title
				// So search and replace needed data to match properly.
				regexPattern = patterns.REGEX_TITLE_TV_EPISODE
				regexUsed += ' + REGEX_TITLE_TV_EPISODE'

				// Search and replace pattern in regex pattern for better matching
				//regexPattern = cleanupPattern( releaseName, regexPattern, [ 'audio', 'flags', 'format', 'language', 'resolution', 'source' ] )
				releaseNameCleaned = cleanup( releaseNameCleaned, [ 'audio', 'flags', 'format', 'language', 'resolution', 'source' ] )

				// Match episode title
				matches = releaseNameCleaned.match( regexPattern.toRegExp() )

				titleExtra = matches && matches[1] !== '.' ? matches[1] : ''
			}
			// Try to match Sports match
			else
			{
				// Setup regex pattern
				regexPattern = patterns.REGEX_TITLE_TV_DATE
				regexUsed = 'REGEX_TITLE_TV_DATE'

				// Search and replace pattern in regex pattern for better matching
				regexPattern = cleanupPattern( releaseName, regexPattern, [ 'flags', 'format', 'language', 'resolution', 'source', 'regex_date', 'year' ] )

				// Match Dated/Sports match title
				matches = releaseNameCleaned.match( regexPattern.toRegExp() )

				if ( matches )
				{
					// 1st match = event (nfl, mlb, etc.)
					title = matches[1]
					// 2nd match = specific event name (eg. team1 vs team2)
					titleExtra = matches && matches[2] ? matches[2] : ''
				}
			}

			// Jump to default if no title found
			if ( !title ) type = 'default'
		}

		// ANime
		if ( type === 'anime' )
		{
			// Setup regex pattern
			regexPattern = patterns.REGEX_TITLE_TV
			regexUsed = 'REGEX_TITLE_TV'

			// Match title
			matches = releaseNameCleaned.match( regexPattern.toRegExp() )

			// Check for matches with regex title tv
			if ( matches )
			{
				title = matches[1]

				// Build pattern and try to get episode title
				// So search and replace needed data to match properly.
				regexPattern = patterns.REGEX_TITLE_TV_EPISODE
				regexUsed += ' + REGEX_TITLE_TV_EPISODE'

				// Search and replace pattern in regex pattern for better matching
				releaseNameCleaned = cleanup( releaseNameCleaned, [ 'flags', 'format', 'language', 'resolution', 'source', 'year' ] )

				// Match episode title
				matches = releaseNameCleaned.match( regexPattern.toRegExp() )

				titleExtra = matches && matches[1] ? matches[1] : ''
			}

			// Jump to default if no title found
			if ( !title ) type = 'default'
		}

		// XXX
		if ( type === 'xxx' )
		{
			if ( get( 'episode' ) )
			{
				// Setup regex pattern
				regexPattern = patterns.REGEX_TITLE_TV.toRegExp()
				regexUsed = 'REGEX_TITLE_TV'

				// Match title
				matches = releaseNameCleaned.match( regexPattern )

				// Check for matches with regex title tv
				if ( matches )
				{
					title = matches[1]

					// Build pattern and try to get episode title
					// So search and replace needed data to match properly.
					regexPattern = patterns.REGEX_TITLE_TV_EPISODE
					regexUsed += ' + REGEX_TITLE_TV_EPISODE'

					// Search and replace pattern in regex pattern for better matching
					//regexPattern = cleanupPattern( releaseName, regexPattern, [ 'audio', 'flags', 'format', 'language', 'resolution', 'source' ] )
					releaseNameCleaned = cleanup( releaseNameCleaned, [ 'audio', 'flags', 'format', 'language', 'resolution', 'source' ] )

					// Match episode title
					matches = releaseNameCleaned.match( regexPattern.toRegExp() )

					titleExtra = matches && matches[1] !== '.' ? matches[1] : ''
				}
			}

			// Default pattern
			if ( !title )
			{
				// Setup regex pattern
				regexPattern = get( 'date' ) ? patterns.REGEX_TITLE_XXX_DATE : patterns.REGEX_TITLE_XXX
				regexUsed = get( 'date' ) ? 'REGEX_TITLE_XXX_DATE' : 'REGEX_TITLE_XXX'

				// Search and replace pattern in regex pattern for better matching
				regexPattern = cleanupPattern( releaseName, regexPattern, [ 'flags', 'year', 'language', 'source', 'regex_date', 'regex_date_monthname' ] )

				// Match title
				matches = releaseNameCleaned.match( regexPattern.toRegExp() )

				if ( matches )
				{
					// 1st Match = Publisher, Website, etc.
					title = matches[1]
					// 2nd Match = Specific release name (movie/episode/model name, etc.)
					titleExtra = matches[6] ? matches[6] : ''
				}
			}

			// Jump to default if no title found
			if ( !title ) type = 'default'
		}

		// Ebook
		if ( type === 'ebook' )
		{
			// Setup regex pattern
			regexPattern = patterns.REGEX_TITLE_EBOOK
			regexUsed = 'REGEX_TITLE_EBOOK'

			// Cleanup release name for better matching
			releaseNameCleaned = cleanup( releaseNameCleaned, 'episode' )

			// Search and replace pattern in regex pattern for better matching
			regexPattern = cleanupPattern( releaseName, regexPattern, [ 'flags', 'format', 'language', 'regex_date', 'regex_date_monthname', 'year' ] )

			// Match title
			matches = releaseNameCleaned.match( regexPattern.toRegExp() )
			
			if ( matches )
			{
				// Full match
				title = matches[1]

				// Split the title in the respective parts
				let titleArray = title.split( '-' )

				if ( titleArray )
				{
					// First value is the artist = title
					title = titleArray[0]
					// Unset this before the loop
					titleArray.splice( 0, 1 )
					// Loop remaining parts and set title extra
					titleArray.forEach( ( titlePart ) =>
					{
						if ( titlePart )
							titleExtra = titleExtra ? titleExtra + ' - ' + titlePart : titlePart
					} )
				}
			}

			// Jump to default if no title found
			if ( !title ) type = 'default'
		}

		// Font
		if ( type === 'font' )
		{
			// Setup regex pattern
			regexPattern = patterns.REGEX_TITLE_FONT
			regexUsed = 'REGEX_TITLE_FONT'

			// Cleanup release name for better matching
			releaseNameCleaned = cleanup( releaseNameCleaned, [ 'version', 'os', 'format' ] )

			// Match title
			matches = releaseNameCleaned.match( regexPattern.toRegExp() )

			if ( matches ) title = matches[1]

			// Jump to default if no title found
			if ( !title ) type = 'default'
		}

		// Bookware
		if ( type === 'bookware' )
		{
			// Setup regex pattern
			regexPattern = patterns.REGEX_TITLE_BOOKWARE
			regexUsed = 'REGEX_TITLE_BOOKWARE'

			// Cleanup release name for better matching
			releaseNameCleaned = cleanup( releaseNameCleaned, [ 'language', 'version' ] )

			// Match title
			matches = releaseNameCleaned.match( regexPattern.toRegExp() )

			if ( matches ) title = matches[1]

			// Jump to default if no title found
			if ( !title ) type = 'default'
		}

		// Movie
		if ( type === 'default' || !title )
		{
			// Setup regex pattern
			regexPattern = patterns.REGEX_TITLE_TV_DATE
			regexUsed = 'REGEX_TITLE_TV_DATE'

			// Search and replace pattern in regex pattern for better matching
			regexPattern = cleanupPattern( releaseName, regexPattern, [ 'flags', 'format', 'language', 'resolution', 'source' ] )

			// Cleanup release name for better matching
			if ( type === 'xxx' )
				releaseNameCleaned = cleanup( releaseNameCleaned, [ 'episode', 'monthname', 'daymonth' ] )

			// Try first date format
			// NFL.2021.01.01.Team1.vs.Team2.1080p...
			regexPattern = regexPattern.replace( '%dateformat%', '(?:\\d+[._-]){3}' )

			// Match Dated/Sports match title
			matches = releaseNameCleaned.match( regexPattern.toRegExp() )

			if ( matches && matches[2] )
			{
				// 1st match = event (nfl, mlb, etc.)
				title = matches[1]
				// 2nd match = specific event name (eg. team1 vs team2)
				titleExtra = matches[2]
			}
			else
			{
				// Setup regex pattern
				regexPattern = patterns.REGEX_TITLE_MOVIE
				regexUsed = 'REGEX_TITLE_MOVIE'

				// Search and replace pattern in regex pattern for better matching
				regexPattern = cleanupPattern( releaseName, regexPattern, [ 'audio', 'disc', 'flags', 'format', 'language', 'resolution', 'source', 'year' ] )

				// Match title
				matches = releaseNameCleaned.match( regexPattern.toRegExp() )

				if ( matches )
				{
					title = matches[1]

					// Try to get extra title after year (some cases)
					//regexPattern = cleanupPattern( releaseNameCleaned, patterns.REGEX_TITLE_MOVIE_EXTRA, [ 'audio', 'flags', 'format', 'language', 'resolution', 'source', 'year' ] )
					/*regexPattern = cleanupPattern( releaseNameCleaned, patterns.REGEX_TITLE_MOVIE_EXTRA, [ 'year' ] )
					regexUsed += ' + REGEX_TITLE_MOVIE_EXTRA'

					// Remove the unneeded stuff from release name
					releaseNameCleaned = cleanup( releaseNameCleaned, [ 'audio', 'flags', 'format', 'language', 'resolution', 'source' ] )

					console.log( regexPattern )
					console.log( releaseNameCleaned )

					// Match episode title
					matches = releaseNameCleaned.match( regexPattern.toRegExp() )

					titleExtra = matches && matches[1] !== '.' ? matches[1] : ''*/
				}
				// No matches? Try simplest regex pattern.
				else
				{
					// Some very old (or very wrong named) releases dont have a group at the end.
					// But I still wanna match them, so we check for the '-'.
					regexPattern = patterns.REGEX_TITLE
					regexUsed = 'REGEX_TITLE'

					// This should be default, because we found the '-'.
					if ( releaseNameCleaned.includes( '-' ) )
						regexPattern += '-'

					// Match title
					matches = releaseNameCleaned.match( ( '/^' + regexPattern + '/i' ).toRegExp() )

					// If nothing matches here, this release must be da real shit!
					title = matches ? matches[1] : ''
				}
			}
		}

		// Sanitize title
		title = sanitize( title )
		title = title === 'VA' ? 'Various' : title

		// Sanitize and set title
		set( 'title', title )
		// Sanitize and set title extra
		if ( titleExtra ) set( 'titleExtra', sanitize( titleExtra ) )
	}


	/**
	 * Parse simple attribute.
	 *
	 * @private
	 * @param {array} attribute - Attribute to parse.
	 * @return {mixed} Found attribute value (string or array) or null if couldn't parse attribute.
	 */
	const parseAttribute = ( attribute, type = '' ) =>
	{
		let attributeKeys = []

		let releaseNameCleaned = releaseName;

		// Loop all attributes
		for ( const attrKey in attribute )
		{
			let attrPattern = attribute[ attrKey ]

			// We need to catch the web source for better web source matching
			// NOT WORKING good if other stuff comes after web source, so removing it (29.07.2023)
			/*if ( attrKey === 'WEB' )
			{
				attrPattern += '[._)-](%format%|%group%|%language%|%year%|%audio%|%flags%)'
				attrPattern = cleanupPattern( releaseName, attrPattern, [ 'format', 'group', 'language', 'year', 'audio', 'flags' ] )
			}*/

			// Transform all attribute values to array (simpler, so we just loop everything)
			if ( !Array.isArray( attrPattern ) )
				attrPattern = [ attrPattern ]

			// Loop attribute values
			attrPattern.forEach( ( pattern ) =>
			{
				// Regex flag = case Insensitive
				let flags = 'i'
				// The 'iT' source for iTunes needs to be case sensitive,
				// so italian language + it as word doesn't get parsed as source = itunes
				if ( type === 'source' && pattern === 'iT' )
					flags = ''

				// Some special flags
				if ( type === 'flags' )
				{
					// Special flags that should only match if followed by specific information
					if (
						attrKey === 'Final' ||
						attrKey === 'New' ||
						attrKey === 'V2' ||
						attrKey === 'V3' ||
						attrKey === 'Cover' ||
						attrKey === 'Docu' ||
						attrKey === 'HR' ||
						attrKey === 'Vertical' ||
						attrKey === 'Trainer'
					)
					{
						pattern = cleanupPattern( get( 'release' ), pattern, [ 'flags', 'format', 'source', 'language', 'resolution' ] )
					}
				}

				// All separators
				let separators = '[._\\-]'
				// Default regex
				let regex_pattern = new RegExp( `(${separators})${pattern}\\1`, flags )

				// Special case for DC, so dont wrongfully parse DC device, should be DC flag most of the times
				if ( type === 'device' && pattern === 'DC')
				{
					regex_pattern = new RegExp( `(${separators})${pattern}-([\\w.-]+){1,2}$`, flags )
				}

				// Check if pattern is inside release name
				let matches = releaseNameCleaned.match( regex_pattern )

				// Check if is last keyword before group
				if ( !matches )
				{
					regex_pattern = new RegExp( `${separators}${pattern}-([\\w.-]+){1,2}$`, flags )
					matches = releaseNameCleaned.match( regex_pattern )
				}

				// Check with parenthesis
				if ( !matches )
				{
					regex_pattern = new RegExp( `\\(${pattern}\\)`, flags )
					matches = releaseNameCleaned.match( regex_pattern )
				}

				// No? Recheck with string at end of release name
				// - only format
				// - separator only ._
				// - if group is missing
				if ( !matches && type === 'format' )
				{
					regex_pattern = new RegExp( `[._]${pattern}$`, flags )
					matches = releaseNameCleaned.match( regex_pattern )
				}

				// Yes? Return attribute array key as value
				if ( matches && !attributeKeys.includes( attrKey ) )
					attributeKeys.push( attrKey )
			})

			// Stop after first source found
			//if ( type === 'source' && attributeKeys.length > 0 )
			//	break;
		}

		// Only return if array not empty
		if ( attributeKeys.length > 0 )
		{
			// Transform array to string if we have just one value
			if ( attributeKeys.length === 1 )
				attributeKeys = attributeKeys.join()
			
			return attributeKeys
		}
		return null
	}


	/**
	 * Check if release has specified attribute value.
	 *
	 * @public
	 * @param {mixed} values - Attribute values to check for (array or string).
	 * @param {string} attributeName - Attribute name to check for.
	 * @return {boolean} If attribute values were found.
	 */
	const hasAttribute = ( values, attributeName ) =>
	{
		// Get attribute value
		let attribute = get( attributeName )
		let hasIt = false

		// Check if attribute is set
		if ( attribute )
		{
			// Transform var into array for loop
			if ( !Array.isArray( values ) )
				values = [ values ]

			// Loop all values to check for
			values.forEach( ( value ) =>
			{
				// If values were saved as array, check if in array
				if ( Array.isArray( attribute ) )
				{
					attribute.forEach( ( attrValue ) =>
					{
						if ( value.toLowerCase() === attrValue.toLowerCase() )
							hasIt = true
					})
				}
				// If not, just check if the value is equal
				else if ( value.toLowerCase() === attribute.toLowerCase() )
				{
					hasIt = true
				}
			} )
		}

		return hasIt
	}


	/**
	 * Cleanup release name from given attribute.
	 * 
	 * Mostly needed for better title matching in some cases.
	 *
	 * @private
	 * @param {string} releaseName - Original release name.
	 * @param {mixed} informations - Informations to clean up (string or array).
	 * @return {string} Cleaned up release name.
	 */
	const cleanup = ( releaseName, informations ) =>
	{
		// Just return if no information name was passed.
		if ( !informations || !releaseName ) return releaseName

		// Transform var into array for loop
		if ( !Array.isArray( informations ) )
			informations = [ informations ]

		// Loop all attribute values to be cleaned up
		informations.forEach( ( information ) =>
		{
			// Get information value
			let informationValue = get( information )

			// Get date as value if looking for "daymonth" or "month" (ebooks)
			if ( information.includes( 'month' ) || information.includes( 'date' ) )
				informationValue = get( 'date' )

			// Only do something if it's not empty
			if ( informationValue )
			{
				let attributes = []

				// Get proper attr value
				switch ( information )
				{
					case 'audio':
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( value ) => {
								attributes.push( patterns.AUDIO[ value ] )
							} )
						}
						else
						{
							attributes.push( patterns.AUDIO[ informationValue ] )
						}
						break

					case 'daymonth':
						// Clean up day and month number from rls
						attributes = [
							informationValue.getDate() + '(th|rd|nd|st)?', // need with leading zeros
							informationValue.getDate() + '(th|rd|nd|st)?',
							informationValue.getMonth() // need with leading zeros
						]
						break

					case 'device':
						attributes.push( patterns.DEVICE[ informationValue ] )
						break

					case 'disc':
						if ( get( 'disc' ) )
							attributes.push( patterns.REGEX_DISC )

						break;

					case 'format':
						// Check if we need to loop array
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( format ) =>
							{
								attributes.push( patterns.FORMAT[ format ] )
							} )
						}
						else
						{
							attributes.push( patterns.FORMAT[ informationValue ] )
						}
						break

					case 'episode':
						attributes.push( patterns.REGEX_EPISODE )
						break

					case 'flags':
						// Flags are always saved as array, so loop them.
						informationValue.forEach( ( flag ) =>
						{
							// Skip some flags, needed for proper software/game title regex.
							if ( flag !== 'UPDATE' && flag !== '3D' )
								attributes.push( patterns.FLAGS[ flag ] )
						} )
						break

					case 'language':
						// Get first parsed language code
						for ( let languageCode in informationValue )
						{
							attributes.push( patterns.LANGUAGES[ languageCode ] )
						}
						break

					case 'monthname':
						// Replace all ( with (?: for non capturing
						let monthname = patterns.REGEX_DATE_MONTHNAME.replace( '/\\((?!\\?)/i', '(?:' )
						// Get monthname pattern
						monthname = monthname.replace( '%monthname%', patterns.MONTHS[ informationValue.getMonth() ] )
						attributes.push( monthname )
						break

					case 'os':
						// Some old releases have "for x" before the OS
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( value ) => {
								attributes.push( patterns.OS[ value ] )
							} )
						}
						else
						{
							attributes.push( patterns.OS[ informationValue ] )
						}
						break
					
					case 'resolution':
						attributes.push( patterns.RESOLUTION[ informationValue ] )
						break
					
					case 'source':
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( value ) => {
								if ( patterns.SOURCE[ value ] !== undefined )
									attributes.push( patterns.SOURCE[ value ] )
							} )
						}
						else if ( patterns.SOURCE[ informationValue ] !== undefined )
						{
							attributes.push( patterns.SOURCE[ informationValue ] )
						}
						break

					case 'version':
						if ( isBookware() )
						{
							attributes.push( patterns.REGEX_VERSION_BOOKWARE )
						}
						else
						{
							attributes.push( patterns.REGEX_VERSION )
						}
						break
					
					case 'year':
						// We need the simpler year regex for cleanup
						attributes.push( patterns.REGEX_YEAR_SIMPLE )
						break
				}

				// Loop attributes if not empty and preg replace to cleanup
				if ( attributes )
				{
					attributes.forEach( ( attribute ) =>
					{
						// Transform all values to array
						attribute = !Array.isArray( attribute ) ? [ attribute ] : attribute
						attribute.forEach( ( value ) =>
						{
							// Exception for OS
							if ( information === 'os' )
								value = '(?:for[._-])?' + value

							// We need to replace all findings with double dots for proper matching later on.
							releaseName = releaseName.replace( ( '/[._(-]' + value + '[._)-]/i' ).toRegExp(), '..' )

							// Replace format at the end if no group name
							if ( information === 'format' )
								releaseName = releaseName.replace( ( '/[._]' + value + '$/i' ).toRegExp(), '..' )
						} )
					} )
				}
			}
		} )

		return releaseName
	}


	/**
	 * Replace %attribute% in regex pattern with attribute pattern.
	 *
	 * @private
	 * @param {string} releaseName - Original release name.
	 * @param {string} regexPattern - The pattern to check.
	 * @param {mixed} informations - The information value to check for (string or array)
	 * @return {string} Cleaned regex pattern.
	 */
	const cleanupPattern = ( releaseName, regexPattern, informations ) =>
	{
		// Just return if no information name was passed.
		if ( !informations || !releaseName || !regexPattern ) return regexPattern

		// Transform to array
		if ( !Array.isArray( informations ) )
			informations = [ informations ]

		// Loop all information that need a replacement
		informations.forEach( ( information ) =>
		{
			// Get information value
			let informationValue = get( information )
			
			// Get date as value if looking for "daymonth" or "month" (ebooks, imgset, sports)
			if ( information.includes( 'month' ) || information.includes( 'date' ) )
				informationValue = get( 'date' )

			// Only do something if it's not empty
			if ( informationValue && informationValue !== null )
			{
				let attributes = []

				switch( information )
				{
					case 'audio':
						// Check if we need to loop array
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( audio ) =>
							{
								attributes.push( patterns.AUDIO[ audio ] )
							} )
						}
						else
						{
							attributes.push( patterns.AUDIO[ informationValue ] )
						}
						break

					case 'device':
						// Check if we need to loop array
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( device ) =>
							{
								attributes.push( patterns.DEVICE[ device ] )
							} )
						}
						else
						{
							attributes.push( patterns.DEVICE[ informationValue ] )
						}
						break

					case 'disc':
						attributes.push( patterns.REGEX_DISC )
						break

					case 'flags':
						// Flags are always saved as array, so loop them.
						informationValue.forEach( ( flag ) =>
						{
							// Skip some flags, needed for proper software/game title regex.
							if ( flag !== '3D' )
								attributes.push( patterns.FLAGS[ flag ] )
						} )
						break

					case 'format':
						// Check if we need to loop array
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( format ) =>
							{
								attributes.push( patterns.FORMAT[ format ] )
							} )
						}
						else
						{
							attributes.push( patterns.FORMAT[ informationValue ] )
						}
						break

					case 'group':
						attributes.push( informationValue )
						break

					case 'language':
						// Get first parsed language code
						for ( let languageCode in informationValue )
						{
							attributes.push( patterns.LANGUAGES[ languageCode ] )
						}
						break

					case 'os':
						// Some old releases have "for x" before the OS
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( value ) =>
							{
								attributes.push( patterns.OS[ value ] )
							} )
						}
						else
						{
							attributes.push( patterns.OS[ informationValue ] )
						}
						break

					case 'resolution':
						attributes.push( patterns.RESOLUTION[ informationValue ] )
						break

					case 'regex_date':
						// Replace all ( with (?: for non capturing
						attributes.push( patterns.REGEX_DATE.replaceAll( '(\\', '(?:\\' ) )
						break

					case 'regex_date_monthname':
						// Replace all ( with (?: for non capturing
						let regexDateMonthname = patterns.REGEX_DATE_MONTHNAME.replace( /\((?!\?)/i, '(?:' )
						// Get monthname pattern
						regexDateMonthname = regexDateMonthname.replace( '%monthname%', patterns.MONTHS[ informationValue.getMonth() + 1 ] )
						attributes.push( regexDateMonthname )

						break

					case 'source':
						if ( Array.isArray( informationValue ) )
						{
							informationValue.forEach( ( value ) => {
								if ( patterns.SOURCE[ value ] !== undefined )
									attributes.push( patterns.SOURCE[ value ] )
							} )
						}
						else if ( patterns.SOURCE[ informationValue ] !== undefined )
						{
							attributes.push( patterns.SOURCE[ informationValue ] )
						}
						break

					case 'year':
						attributes.push( informationValue )
						break
				}

				// Loop attributes if not empty and preg replace to cleanup
				if ( attributes )
				{
					let values = ''

					attributes.forEach( ( attribute ) =>
					{
						attribute = !Array.isArray( attribute ) ? [ attribute ] : attribute
						if ( Array.isArray( attribute ) )
						{
							attribute.forEach( ( value ) =>
							{
								value = information === 'os' ? '(?:for[._-])?' + value : value

								// And check what exactly pattern matches the given release name.
								//let matches = releaseName.match( ( '/[._(\\-]' + value + '[._)\\-]/i' ).toRegExp() )

								// We have a match? ...
								//if ( matches )
									// Put to values and separate by | if needed.
									values = values ? values + '|' + value : value
							} )
						}
						else
						{
							attribute = information === 'os' ? '(?:for[._-])?' + attribute : attribute

							// Put to values and separate by | if needed.
							values = values ? values + '|' + attribute : attribute
						}
					} )

					// Replace found values in regex pattern
					regexPattern = regexPattern.replace( '%' + information + '%', values )
				}
			}
		} )

		return regexPattern
	}


	/**
	 * Remove unneeded attributes that were falsely parsed.
	 *
	 * @private
	 */
	const cleanupAttributes = () =>
	{
		let type = get( 'type' ).toLowerCase()
		let flags = get( 'flags' )

		if ( type === 'movie' || type === 'tv' )
		{
			if (
				get( 'source' ) &&
				get( 'format' ) &&
				get( 'resolution' ) &&
				get( 'source' ) == get( 'format' )
			)
			{
				set( 'format', null );
			}
		}
	
		if ( type === 'movie' )
		{			
			// Remove version if it's a movie (falsely parsed from release name)
			if ( get( 'version' ) !== null )
			{
				set( 'version', null )
			}
		}
		else if ( type === 'app' )
		{
			// Remove audio if it's an App (falsely parsed from release name)
			if ( get( 'audio' ) !== null )
			{
				set( 'audio', null )
			}

			// Remove source if it's inside title
			if ( get( 'source' ) !== null && get( 'title' ).includes( get( 'source' ) ) )
			{
				set( 'source', null )
			}
		}
		else if ( type === 'game' )
		{
			// Remove Anime flag, not need for games
			if ( flags && flags.indexOf( 'Anime' ) >= 0 )
			{
				flags.splice( flags.indexOf( 'Anime' ), 1 )
				set( 'flags', flags )
			}
		}
		else if ( type === 'ebook' )
		{
			if ( get( 'format' ) === 'Hybrid' )
			{
				// Remove Hybrid flag is format already Hybrid
				if ( flags.length && flags.indexOf( 'Hybrid' ) >= 0 )
				{
					flags.splice( flags.indexOf( 'Hybrid' ), 1 )
					set( 'flags', flags )
				}
			}
		}
		// Remove episode and season from music release, falsely parsed
		else if ( type === 'music' )
		{
			if ( get( 'episode' ) ) set( 'episode', null )
			if ( get( 'season' ) ) set( 'season', null )
		}
		// Bookware
		else if ( type === 'bookware' )
		{
			set( 'flags', null )
		}

		if ( type === 'movie' || type === 'xxx' || type === 'tv' )
		{
			// CHange source DVD to format DVDR if no res and format given
			if (
				get( 'source' ) === 'DVD' &&
				!get( 'resolution' ) &&
				!get( 'format' )
			)
			{
				set( 'format', 'DVDR' )
				set( 'source', null )
			}
		}

		if ( type !== 'app' && type !== 'game' && hasAttribute( 'Trainer', 'flags' ) )
		{
			// Remove Trainer if not app or game
			if ( flags.length && flags.indexOf( 'Trainer' ) >= 0 )
			{
				flags.splice( flags.indexOf( 'Trainer' ), 1 )
				set( 'flags', flags )
			}
		}


		// Remove NEW flag if part of title
		/*if ( hasAttribute( 'New', 'flags' ) )
		{
			if ( 
				get( 'title' ).toLowerCase().includes( 'new') ||
				(
					get( 'title_extra' ) !== null &&
					get( 'title_extra' ).toLowerCase().includes( 'new' )
				)
			)
			{
				let flags = get( 'flags' ).filter( item => item !== 'New' )
				flags = flags.length === 0 ? null : flags
				set( 'flags', flags )
			}
		}*/
	}


	/**
	 * Sanitize given text.
	 *
	 * @private
	 * @param {string} text - Text to sanitize.
	 * @return {string} Sanitized text.
	 */
	const sanitize = ( text ) =>
	{
		if ( text )
		{
			// Trim '-' at the end of the string
			text = text.trim( '-' )
			// Replace every separator char with whitespaces
			text = text.replace( /[_.]+/gi, ' ' )
			// Put extra whitespace between '-', looks better
			//text = text.replace( '-', ' - ' )
			// Trim and simplify multiple whitespaces
			text = text.trim()
			text = text.replace( /\s{2,}/gi, ' ' )

			// Check if all letters are uppercase:
			// First, check if we have more then 1 word in title (keep single worded titles uppercase).
			if ( text.split(' ').length > 1 )
			{
				if ( text === text.toUpperCase() )
				{
					// Transforms into lowercase, for ucwords to work properly.
					// Ucwords don't do anything if all chars are uppercase.
					text = text.capitalizeWords()
				}
			}

			let type = get('type') ? get('type').toLowerCase() : ''
			// Words which should end with a point
			let specialWordsAfter = [ 'feat', 'ft', 'incl', '(incl', 'inkl', 'nr', 'st', 'pt', 'vol' ]
			if ( type !== 'app' )
				specialWordsAfter.push( 'vs' )

			// Words which should have a point before (usualy xxx domains)
			let specialWordsBefore = ''
			if ( type === 'xxx' )
				specialWordsBefore = [ 'com', 'net', 'pl' ]

			// Split title so we can loop
			let textSplitted = text.split( ' ' )

			// Loop, search and replace special words
			if ( Array.isArray( textSplitted ) )
			{
				textSplitted.forEach( ( textWord ) =>
				{
					// Point after word
					if ( specialWordsAfter.includes( textWord.toLowerCase() ) )
					{
						text = text.replace( textWord, textWord + '.' )
					}
					// Point before word
					else if ( specialWordsBefore.includes( textWord.toLowerCase() ) )
					{
						text = text.replace( ' ' + textWord, '.' + textWord )
					}
				} )
			}
		}

		return text
	}


	/**
	 * Get attribute value.
	 *
	 * @public
	 * @param {string} name - Attribute name.
	 * @return {mixed} Attribute value (array, string, int, date, boolean) or null if not found.
	 */
	const get = ( name ) =>
	{
		// Check if var exists
		if ( data[ name ] != null )
		{
			return data[ name ]
		}
		// Return all values
		else if ( name === 'all' )
		{
			return data
		}

		return null
	}


	/**
	 * Set attribute value.
	 *
	 * @private
	 * @param {string} name - Attribute name to set.
	 * @param {mixed} value - Attribute value to set (array, string, int, date).
	 * @return {boolean} If atrribute was succesfully set.
	 */
	const set = ( name, value ) =>
	{
		if ( name in data )
		{
			value = Array.isArray( value ) && value.length === 0 ? null : value
			data[ name ] = value
			return true
		}
		return false
	}


	// Parse everything.
	// The parsing order DO MATTER!
	parseGroup()
	parseFlags()			// Misc rls name flags
	parseOs()				// For Software/Game rls: Operating System
	parseDevice()			// For Software/Game rls: Device (like console)
	parseVersion()			// For Software/Game rls: Version
	parseEpisode()			// For TV/Audiobook/Ebook (issue) rls: Episode
	parseSeason()			// For TV rls: Season
	parseDate()
	parseYear()
	parseFormat()			// Rls format/encoding
	parseSource()
	parseResolution()		// For Video rls: Resolution (720, 1080p...)
	parseAudio()			// For Video rls: Audio format
	parseLanguage()			// Object with language code as key and name as value (in english)

	parseSource()			// Source (2nd time, for right web source)
	parseFlags()			// Flags (2nd time)
	parseLanguage()			// Language (2nd time)

	parseType( section )
	parseTitle()			// Title and extra title
	cleanupAttributes()

	return {
		data,
		hasAttribute,
		toString
	}
}


/**
 * Convert string to RegExp object.
 * https://stackoverflow.com/a/55258958/4371770
 *
 * @param {string} str - String to convert to RegExp.
 * @return {RegExp} Converted RegExp from string.
 */
String.prototype.toRegExp = function( str )
{
	// if the string is not provided, and if it's called directly on the string, we can access the text via 'this'
	if ( ! str ) str = this
	// Main regex
	let main = str.match( /\/(.+)\/.*/ )[1]
	// Regex options
	let options = str.match( /\/.+\/(.*)/ )[1]
	// Compiled regex
	return new RegExp( main, options )
}


/**
 * Trim Characters from a String.
 * https://masteringjs.io/tutorials/fundamentals/trim
 *
 * @param {string} char - Character to trim, defaults to whitespace.
 * @param {string} str - String to trim.
 * @return {string} Trimmed string.
 */
String.prototype.trim = function( char = ' ', str )
{
	if ( ! str ) str = this
	return str.replace( ('/^[' + char + ']+/i').toRegExp(), '' ).replace( ('/[' + char +']+$/i').toRegExp(), '' )
}


/**
 * Check if string has only numbers.
 * No check for dots or commas, so only works with positive int.
 *
 * @param {string} str - String to check.
 * @return {boolean} Check result.
 */
String.prototype.isNumeric = function( str )
{
	if ( ! str ) str = this
	return /^\d+$/.test( str )
}


/**
 * Makes the first character of every word uppercase.
 * https://gist.github.com/rickycheers/4541395?permalink_comment_id=2565472#gistcomment-2565472
 *
 * @param {string} str - String to format.
 * @return {string} Formatted String.
 */
String.prototype.capitalizeWords = function( str )
{
	if ( ! str ) str = this
	str = str.toLowerCase().replace( /\b[a-z]/g, char => char.toUpperCase() )
	return str
}


/**
 * Makes the first character of a string/word uppercase.
 *
 * @param {string} str - String to format.
 * @return {string} Formatted String.
 */
String.prototype.capitalizeWord = function( str )
{
	if ( ! str ) str = this
	return str.charAt(0).toUpperCase() + str.slice(1);
}


export default ReleaseParser