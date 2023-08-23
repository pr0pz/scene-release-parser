/**
 * ReleasePatterns - All needed patterns for properly parsing releases.
 * 
 * @author Wellington Estevo
 * @version 1.2.2
 */

// Reusable vars
const regexYear = '(19\\d[\\dx]|20\\d[\\dx])'
const regexDate = '(\\d{2}|\\d{4})[._-](\\d{2})[._-](\\d{2}|\\d{4})'
const regexTitle = '([\\w.()-]+?)' // last ? = JS fix for ungreedy
const regexEpisodeTv = '(?<!^)(?:(?:[ST]\\d+)?[._-]?(?:ep?|o[av]+[._-]?|d|eps[._-]?|episode[._-]?)[\\d-]+|\\d+x\\d+|[STD]\\d+)'
const regexVersionText = '(?:v(?:ersione?)?|Updated?[._-]?v?|Build)'
const regexVersion = regexVersionText + '[._-]?([\\d.]+[a-z\\d]{0,3}(?![._-]gage))'

const patterns = {

	// Declaration of some needed regex patterns.
	// https://regex101.com/ is your best friend for testing those patterns.
	// %varname% will be replaced with the parsed valued for better macthing.

	// Find language (old: (?!sub))
	REGEX_LANGUAGE : '/[._(-]%language_pattern%[._)-][._(-]?(?:%source%|%format%|%audio%|%flags%|%year%|%os%|%device%|%resolution%|(?:us|gbr|eng|nl|fi|fr|no|dk|de|se|ice)|multi|ml[._)-]|dl[._)-]|dual[._-]|%group%)/i',
	// Find date
	REGEX_DATE : regexDate,
	// Special date with month name: 24th January 2002 / Sep. 2000 day 5 / January 2000 1
	REGEX_DATE_MONTHNAME : '(\\d{1,2})?(?:th|rd|st|nd)?[._-]?(%monthname%)[._-]?(\\d{1,2})?(?:th|rd|st|nd)?[._-]?(\\d{4})[._-]?(?:day[._-]?)?(\\d{1,2})?',
	// Description with date inside brackets is nearly always music or musicvideo
	REGEX_DATE_MUSIC : '/\\([a-z._]+[._-]' + regexDate + '\\)/i',
	// Get right year
	REGEX_YEAR_SIMPLE: regexYear,
	REGEX_YEAR : '/(?=[(._-]' + regexYear + '[)._-])/gi',
	// Extract group
	REGEX_GROUP : '/-(\\w+)$/i',
	// Extract OS
	//REGEX_OS : ''
	// Episode pattern matches: S01E01 / 1x01 / E(PS)1 / OVA1 / F123 / Folge_123 / Episode 1 / Issue 1 etc.
	// Good for tv and audiobook rls
	REGEX_EPISODE : '(?:(?:s\\d+[._-]?)?(?:s?ep?|o[av]+[._-]?|f(?:olge[._-])?|band[._-]?|issue[._-]?|ausgabe[._-]?|n[or]?[._-]?|eps[._-]?|episode[._-]?|(?:silber[._-])?edition[._-]?|sets?[._-]?)([\\d_-]+)|(?:\\d+x)(\\d+))',
	REGEX_EPISODE_TV : regexEpisodeTv,
	// For Disc numbers
	REGEX_DISC : '(?:s\\d+)?d(\\d+)',
	// Season pattern matches: S01E01 / 1x01
	REGEX_SEASON : '/[._-](?:[ST](\\d+)[._-]?(?:[EDP]+\\d+)?|(\\d+)(?:x\\d+))[._-]/i',
	// Basic title pattern
	REGEX_TITLE : regexTitle,
	// Good for Ebooks
	REGEX_TITLE_EBOOK : '/^' + regexTitle + '[._(-]+(?:%year%|%language%|%flags%|%format%|%regex_date%|%regex_date_monthname%)[._)-]/i', // ungreedy
	// Good for Fonts
	REGEX_TITLE_FONT : '/^' + regexTitle + '-/i',
	// Good for Movies
	REGEX_TITLE_MOVIE : '/^' + regexTitle + '[._(-]+(?:%year%|%language%|%source%|%flags%|%format%|%resolution%|%audio%)[._)-]/i', // ungreedy
	REGEX_TITLE_MOVIE_EXTRA : '/%year%[._-]' + regexTitle + '[._(-]\\.+/i', // ungreedy
	// Music pattern matches: Author_2.0_(Name)-Track_album_title_2.0_-_track_bla_(Extended_edition)-...
	// Good for music releases and Audiobooks
	REGEX_TITLE_MUSIC : '/^' + regexTitle + '(?:\\([\\w-]+\\))?[._-]+(?:\\(?%source%\\)?|%year%|%group%|%audio%|%flags%|%format%|%regex_date%|%regex_date_monthname%|%language%[._)-])/i', // ungreedy
	REGEX_TITLE_ABOOK : '/^' + regexTitle + '[._(-]+(?:%source%[._)-]?|%year%|%group%|%audio%|%flags%|%format%|%language%[._)-])/i', // ungreedy
	REGEX_TITLE_MVID : '/^' + regexTitle + '[._(-]+(?:%source%|%year%|%group%|%audio%|%flags%|%format%|%regex_date%|%regex_date_monthname%|%language%[._)-])/i', // ungreedy
	// Good for general Software releases (also Games)
	//REGEX_TITLE_APP : '/^' + regexTitle + '[._(-]+(?:' + regexVersionText + '[._)-]?\\d|%language%|%flags%|%device%|%format%|%os%|%group%|%source%)/i', // ungreedy
	REGEX_TITLE_APP : '/^' + regexTitle + '[._(-]+(' + regexVersion + '|%device%|%os%)[._)-]/i', // ungreedy
	// Good for all kind of series (also Anime)
	REGEX_TITLE_TV : '/^' + regexTitle + '[._-]' + regexEpisodeTv + '/i', // ungreedy
	REGEX_TITLE_TV_EPISODE : '/' + regexEpisodeTv + '[._-](?:' + regexTitle + '[._(-]+)?\\.+/i', // ungreedy
	REGEX_TITLE_TV_DATE : '/^' + regexTitle + '[._(-]+(?:%regex_date%|%year%)[._)-]' + regexTitle + '??[._(-]?(?:%language%[._)-]|%resolution%|%source%|%flags%|%format%)/i', // ungreedy
	// Good for XXX paysite releases
	REGEX_TITLE_XXX : '/^' + regexTitle + '[._(-]+(?:%year%|%language%[._)-]|%flags%)/i', // ungreedy
	//REGEX_TITLE_XXX_DATE : '/^' + REGEX_TITLE + '[._-](?:\\d+\\.){3}' + REGEX_TITLE + '[._-](?:xxx|%language%)/iU',
	REGEX_TITLE_XXX_DATE : '/^' + regexTitle + '[._(-]+(?:%regex_date%|%regex_date_monthname%)[._)-]+' + regexTitle + '[._(-]+(?:%flags%|%language%[._)-])/i', // ungreedy
	// Extract software version
	REGEX_VERSION_TEXT : regexVersionText,
	REGEX_VERSION : regexVersionText + '[._-]?([\\d.]+[a-z\\d]{0,3}(?![._-]gage))',


	// Type patterns.
	// Default type will be set to 'Movie' if no other matches.
	TYPE : {
		// Audiobook
		'ABook': 'a.*book',
		// Anime
		'Anime': 'anime',
		// Software Sections
		'App': [ 'app', '0day', 'pda' ],
		// Cover
		'Cover': 'covers',
		// Ebook
		'eBook': 'book',
		// Documentation
		'Docu': 'do[ck]u?',
		// Font
		'Font': 'font',
		// Game/Console Sections
		'Game': [ 'GAME', 'D[SC]', 'G[BC]', 'NSW', 'PS', 'XBOX', 'WII' ],
		// Music Sections
		'Music': [ 'mp3', 'flac', 'music' ],
		// Music Video Sections
		'MusicVideo': 'm(vid|dvd|bluray)',
		// TV Sections
		'TV': 'tv',
		// Sports
		'Sports': 'sport',
		// Subs
		'Subs': 'subs?(?:pack)?',
		// XXX Sections
		'XXX': [ 'xxx', 'imgset' ],
		// Movie Sections
		'Movie': [ 'movie', '(?!tv).*26[45]', 'bluray', 'dvdr', 'xvid', 'divx' ],
	},

	// Video/Audio source patterns
	SOURCE : {
		'ABC': 'ABC', // American Broadcasting Company (P2P)
		'Amazon': [ 'AZ', 'AMZN', 'AmazonHD' ], // (P2P)
		'Amazon Freevee': 'Freevee', // (P2P)
		'ATVP': 'ATVP', // Apple TV+
		'AUD': 'AUD', // Audience Microphone
		'BBC': 'BBC', // British Broadcasting Company (P2P)
		'BBC iPlayer': 'iP', // (P2P)
		'BDRip': 'b[dr]+[._-]?rip',
		'Bluray Screener': [ 'bluray[._-]?scr', 'bd[._-]?scr' ],
		'BookMyShow': 'BMS', // (P2P)
		'Bootleg': '(?:LIVE|\\d*cd)?[._-]?BOOTLEG',
		'CABLE': 'cable',
		'CAM': '(?:new)?cam([._-]?rip)?',
		'CBS': 'CBS', // CBS Corporation (P2P)
		'CD Album': '\\d*cda', // CD Album
		'CD EP': 'cdep',
		'CD Single': [ 'cds', '(?:cd[._-]?)single' ], // CD Single
		'Comedy Central': 'CC', // (P2P)
		'Console DVD': [ 'xboxdvdr?', 'ps2[._-]?dvd' ],
		'Crave': 'CRAV', // (P2P)
		'Crunchyroll': 'CR', // (P2P)
		'DAT Tape': '\\d*DAT', // Digital Audio Tape
		'DAB': 'dab', // Digital Audio Broadcast
		'DC Universe': 'DCU', // (P2P)
		'DD': 'dd(?![._-]?\d)', // Digital Download
		'DDC': 'ddc', // Downloadable/Direct Digital Content
		'Disney Plus': [ 'DP', 'DSNP' ], // (P2P)
		'Disney Networks': 'DSNY', // (P2P)
		'Discovery Plus': 'DSCP', // (P2P)
		'DSR': [ 'dsr', 'dth', 'dsr?[._-]?rip', 'sat[._-]?rip', 'dth[._-]?rip' ], // Digital satellite rip (DSR, also called SATRip or DTH)
		'DVB': [ 'dvb[sct]?(?:[._-]?rip)?', 'dtv', 'digi?[._-]?rip' ],
		'DVDA': '\\d*dvd[_-]?a', // Audio DVD
		'DVDS': 'dvd[_-]?s', // DVD Single
		'DVDRip': '(?:r\\d[._-])?dvd[._-]?rip(?:xxx)?',
		'DVD Screener': [ 'dvd[._-]?scr', '(?:dvd[._-]?)?screener', 'scr' ],
		'EDTV': 'EDTV(?:[._-]rip)?', // Enhanced-definition television
		'EP': [ 'EP', '7.?inch' ],
		'FM': '\\d*FM', // Analog Radio
		'Google Play': 'GPLAY', // (P2P)
		'HBO Max': [ 'HM', 'HMAX', 'HBOM', 'HBO[._-]Max' ], // (P2P)
		'HDCAM': 'HDCAM',
		'HDDVD': '\\d*hd[\\d._-]?dvd(r|rip)?',
		'HDRip': [ 'hd[._-]?rip', 'hdlight', 'mhd', '(?<!dts[._-])hd' ],
		'HDTC': 'HDTC(?:[._-]?rip)?', // High Definition Telecine
		'HDTV': 'a?hd[._-]?tv(?:[._-]?rip)?',
		'HLS': 'HLS', // HTTP Live Streaming
		'Hotstar': 'HTSR', // (P2P)
		'Hulu': 'Hulu(?:UHD)?', // (P2P)
		'iTunes': [ 'iT', 'iTunes(?:HD)?' ], // (P2P)
		'Lionsgate Play': 'LGP', // Lionsgate Play (P2P)
		'Line': 'line(?![._-]dubbed)',
		'LP': '\\d*lp', // Vinyl Album
		'Maxi CD': [ 'cdm', 'mcd', 'maxi[._-]?single', '(?:cd[._-]?)?maxi' ], // CD Maxi
		'Maxi Single': [ 'maxi[._-]?single|single[._-]?maxi', '(?<!cd[._-])maxi', '12.?inch' ], // Maxi Single (Vinyl) / 12 inch
		'MBluray': 'MBLURAY',
		'MDVDR': 'MDVDR?',
		'Movies Anywhere': '(?<!(?:DTS|HD)[._-])MA', // (P2P)
		'MP3 CD': '\\d*mp3cd',
		'MTV Networks': 'MTV', // (P2P)
		'Mubi': 'MUBI', // (P2P)
		'NBC': 'NBC', // National Broadcasting Company (P2P)
		'Netflix': [ 'NF', 'NFLX', 'Netflix(?:HD)?' ], // (P2P)
		'Nintendo eShop': 'eshop', // Nintendo eShop
		'Paramount Plus': 'PMTP', // (P2P)
		'Peacock': 'PCOK', // (P2P)
		'PDTV': 'PDTV',
		'PPV': 'PPV(?:[._-]?RIP)?', // Pay-per-view
		'PSN': 'PSN', // Playstation Network
		'SAT': 'sat', // Analog Satellite
		'Scan': 'scan',
		'Showtime': 'SHO', // (P2P)
		'SDTV': '(?:sd)?tv(?:[._-]?rip)?',
		'SBD': 'SBD', // Soundboard
		'Stan': 'Stan(?:HD)?', // (P2P)
		'Stream': 'stream',
		'Starz': 'STA?R?Z', // (P2P)
		'Tape': 'tape', // Music tape
		'TBS': 'TBS', // Turner Broadcasting System
		'Telecine': [ 'tc', 'telecine' ],
		'Telesync': [ '(?:hd[._-])?ts', 'telesync', 'pdvd' ], // ‘CAM’ video release with ‘Line’ audio synced to it.
		'UHDBD': 'UHD[\\d._-]?BD',
		'UHDTV': 'UHD[._-]?TV',
		'VHS': 'VHS(?:[._-]?rip)?',
		'VLS': 'vls', // Vinyl Single
		'Vinyl': [ '(Complete[._-])?Vinyl', '12inch' ],
		'VODRip': [ 'VOD.?RIP', 'VODR' ],
		'Web Single': '(?:web.single|single.web)', // Web single
		// If we have more than 1 source with WEB: the general WEB source needs to be the last one to be parsed
		'WEB': 'WEB[._-]?(?!single)(?:tv|dl|u?hd|rip|cap|flac|mux)?',
		'WOW tv': 'WOWTV', // (P2P)
		'XBLA': 'XBLA', // Xbox Live Arcade
		'YouTube Red': 'YTred', // (P2P)
		'MiniDisc': [ 'md', 'minidisc' ], // Needs to be at the end, since some music releases has MD as source, but normally is MicDubbed for movies, so would wrongfully parse
		// Misc Fallback
		'CD': [ '\\d*cdr?\\d*', 'cd[._-]?rom' ], // Other CD
		'DVD': '(Complete[._-])?\\d*dvd[_-]?[r\\d]?', // Just normal DVD
		'Bluray': [ 'blu[._-]?ray', '\\d*bdr' ],
		'RiP': 'rip', // If no other rip matches
	},

	// Video Encoding patterns
	// https://en.wikipedia.org/wiki/List_of_codecs#Video_compression_formats
	FORMAT : {
		// Video formats
		'AVC': 'AVC',
		'XViD': 'XV?iD',
		'DiVX': 'DiVX\\d*',
		'x264': 'x\\.?264',
		'x265': 'x\\.?265',
		'h264': 'h\\.?264',
		'h265': 'h\\.?265',
		'HEVC': '(?:HDR10)?HEVC',
		'VP8': 'VP8',
		'VP9': 'VP9',
		'MP4': 'MP4',
		'MPEG': 'MPEG',
		'MPEG2': 'MPEG2',
		'VCD': 'VCD',
		'CVD': 'CVD',
		'CVCD': 'CVCD', // Compressed Video CD
		'SVCD': 'X?SVCD',
		'VC1': '(?:Bluray[._-])?VC[._-]?1',
		'WMV': 'WMV',
		'MDVDR': 'MDVDR?',
		'DVDR': 'DVD[R\\d]',
		'MBluray': '(Complete[._-])?MBLURAY',
		'Bluray': '(complete[._-]?)?bluray',
		'MViD': 'MViD',
		// Ebook formats
		'AZW': 'AZW',
		'Comic Book Archive': 'CB[artz7]',
		'CHM': 'CHM',
		'ePUB': 'EPUB',
		'Hybrid': 'HYBRID',
		'LIT': 'LIT',
		'MOBI': 'MOBI',
		'PDB': 'PDB',
		'PDF': 'PDF',
		// Music formats
		'DAISY': 'DAISY', // Audiobook
		'FLAC': '(?:WEB[._-]?)?FLAC',
		'KONTAKT': 'KONTAKT',
		'MP3': 'MP3',
		'WAV': 'WAV',
		// Software format
		'ISO': '(?:Bootable[._-])?ISO',
		// Font format
		'CrossPlatform': 'Cross(?:Format|Platform)',
		'OpenType': 'Open[._-]?Type',
		'TrueType': 'True[._-]?Type',
		// Software/Game format
		'Java Platform, Micro Edition': 'j2me(?:v\\d*)?',
		'Java': 'JAVA',
		// Misc
		'Multiformat': 'MULTIFORMAT'
	},

	// Video resolution patterns
	RESOLUTION : {
		'SD': 'SD',
		'NTSC': 'NTSC', // = 480p
		'PAL': 'PAL', // = 576p
		'480p': '480p',
		'576p': '576p',
		'720p': '720p',
		'1080i': '1080i',
		'1080p': '1080p',
		'1920p': '1920p',
		'2160p': '2160p',
		'2700p': '2700p',
		'2880p': '2880p',
		'3072p': '3072p',
		'3160p': '3160p',
		'3600p': '3600p',
		'4320p': '4320p'
	},

	// Audio quality patterns
	AUDIO : {
		'10BIT': '10B(?:IT)?',
		'16BIT': '16B(?:IT)?',
		'24BIT': '24B(?:IT)?',
		'44K': '44kHz',
		'48K': '48kHz',
		'96K': '96KHZ',
		'160K': '16\\dk(?:bps)?',
		'176K': '176khz',
		'192K': '19\\dk(?:bps)?',
		'AAC': 'AAC(?:\\d)*',
		'AC3': 'AC3(?:dub|dubbed|MD)?',
		'AC3D': 'AC3D',
		'EAC3': 'EAC3',
		'EAC3D': 'EAC3D',
		'Dolby Atmos': 'ATMOS',
		'Dolby Digital': [ 'DOLBY.?DIGITAL', 'dd[^p]?\\d+' ],
		'Dolby Digital Plus': [ 'DOLBY.?DIGITAL', 'ddp.?\\d' ],
		'Dolby Digital Plus, Dolby Atmos': 'ddpa.?\\d',
		'Dolby trueHD': '(?:Dolby)?[._-]?trueHD',
		'DTS': 'DTSD?(?!.?ES|.?HD|.?MA)[._-]?\\d*',
		'DTS-ES': 'DTS.?ES(?:.?Discrete)?',
		'DTS-HD': 'DTS.?(?!MA)HD(?!.?MA)',
		'DTS-HD MA': [ 'DTS.?HD.?MA', 'DTS.?MAD?' ],
		'DTS:X': 'DTS[._-]?X',
		'OGG': 'OGG',
		// Channels
		'2.0': [ 'd+2[._-]?0', '\\w*(?<!v[._-]?)2[._-]0', '2ch' ],
		'2.1': [ 'd+2[._-]?1', '\\w*(?<!v[._-]?)2[._-]1' ],
		'3.1': [ 'd+3[._-]?1', '\\w*(?<!v[._-]?)3[._-]1' ],
		'5.1': [ 'd+5[._-]?1', '\\w*(?<!v[._-]?)5[._-]1(?:ch)?' ],
		'7.1': [ 'd+7[._-]?1', '\\w*(?<!v[._-]?)7[._-]1' ],
		'7.2': [ 'd+7[._-]?2', '\\w*(?<!v[._-]?)7[._-]2' ],
		'9.1': [ 'd+9[._-]?1', '\\w*(?<!v[._-]?)9[._-]1' ],
		// Misc
		'Dual Audio': '(Dual[._-]|2)Audio',
		'Tripple Audio': '(Tri|3)Audio'
	},

	// Game Console patterns
	DEVICE : {
		'3DO': '3DO',
		'Bandai WonderSwan': 'WS',
		'Bandai WonderSwan Color': 'WSC',
		'Commodore Amiga': 'AMIGA',
		'Commodore Amiga CD32': 'CD32',
		'Commodore C64': 'C64',
		'Commodore C264': 'C264',
		'Nintendo DS': 'NDS',
		'Nintendo 3DS': '3DS',
		'Nintendo Entertainment System': 'NES',
		'Super Nintendo Entertainment System': 'SNES',
		'Nintendo GameBoy': [ 'GB', 'GAMEBOY' ],
		'Nintendo GameBoy Color': 'GBC',
		'Nintendo GameBoy Advanced': 'GBA',
		'Nintendo Gamecube': [ 'NGC', 'GAMECUBE' ],
		'Nintendo iQue Player': 'iQP',
		'Nintendo Switch': 'NSW',
		'Nintendo WII': 'WII',
		'Nintendo WII-U': 'WII[._-]?U',
		'NEC PC Engine': 'PCECD',
		'Nokia N-Gage': '(?:nokia[._-])?n[._-]?gage(?:[._-]qd)?',
		'Playstation': 'PS[X1]?',
		'Playstation 2': 'PS2',
		'Playstation 3': 'PS3',
		'Playstation 4': 'PS4',
		'Playstation 5': 'PS5',
		'Playstation Portable': 'PSP',
		'Playstation Vita': 'PSV',
		'Pocket PC': 'PPC\\d*',
		'Sega Dreamcast': [ 'DC', 'DREAMCAST' ],
		'Sega Mega CD': 'MCD',
		'Sega Mega Drive': 'SMD',
		'Sega Saturn': 'SATURN',
		'Tiger Telematics Gizmondo': 'GIZMONDO',
		'VTech V.Flash': 'VVD',
		'Microsoft Xbox': 'XBOX',
		'Microsoft Xbox One': 'XBOXONE',
		'Microsoft Xbox360': [ 'XBOX360', 'X360' ],
	},

	// Operating System patterns for Software/Game releases
	OS : {
		'IBM AIX': 'AIX', // Advanced Interactive eXecutive
		'Android': 'Android',
		'BlackBerry': 'Blackberry',
		'BSD': '(?:Free|Net|Open)?BSD',
		'HP-UX': 'HPUX', // Hewlett Packard Unix
		'iOS': [ 'iOS', 'iPhone' ],
		'Linux': 'Linux(?:es)?',
		'macOS': 'mac([._-]?osx?)?',
		'PalmOS': 'Palm[._-]?OS\\d*',
		'Solaris': [ '(Open)?Solaris', 'SOL' ],
		'SunOS': 'Sun(OS)?',
		'Symbian': 'Symbian(?:OS\\d*[._-]?\\d*)?',
		'Ubuntu': 'Ubuntu',
		'Unix': 'Unix(All)?',
		'WebOS': 'WebOS',
		// Found these hillarious (but rule conform) windows tags for software releases:
		// win9xnt2000 / WinNT2kXPvista / Win2kXP2k3Vista / winxp98nt2kse / win2kxpvista / Win2KXP2003Vista / WinXP2k3Vista2k8
		'Windows': 'win(?:(?:[\\d]+[\\dxk]?|nt|all|dows|xp|vista|[msp]e)?[._-]?){0,6}',
		'Windows CE': 'wince',
		'Windows Mobile': 'wm\\d+([._-]?se)?',
	},

	// Release language + language code patterns
	// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
	LANGUAGES : {
		'am': 'Amharic',
		'ar': 'Arabic',
		'ch': [ 'Swiss', 'CH' ],
		'cs': [ 'Czech', 'CZ' ],
		'cy': 'Welsh',
		'de': [ 'German', 'GER', 'DE' ],
		'dk': [ 'Danish', 'DK' ],
		'el': [ 'Greek', 'GR' ],
		'en': [ 'English', 'VOA', 'USA?', 'AUS', 'UK', 'GBR', 'ENG' ],
		'es': [ 'Spanish', 'Espanol', 'ES', 'SPA', 'Latin.Spanish' ],
		'et': [ 'Estonian', 'EE' ],
		'fa': [ 'Persian', 'Iranian', 'IR' ],
		'fi': [ 'Finnish', 'FIN?' ],
		'fil': 'Filipino',
		'fr': [ 'French', 'Fran[cç]ais', 'TRUEFRENCH', 'VFF', '(ST|VOS)?FR[EA]?' ],
		'ga': 'Irish',
		'he': 'Hebrew',
		'hi': 'Hindi',
		'ht': 'Creole',
		'hu': 'Hungarian',
		'id': 'Indonesian',
		'is': [ 'Icelandic', 'ICE' ],
		'it': [ 'Italian', 'ITA?' ],
		'jp': [ 'Japanese', 'JA?PN?' ],
		'ko': [ 'Korean', 'KOR' ],
		'km': 'Cambodian',
		'lo': 'Laotian',
		'lt': [ 'Lithuanian', 'LIT' ],
		'lv': 'Latvian',
		'mi': 'Maori',
		'ms': [ 'Malay', 'Malaysian' ],
		'nl': [ 'Dutch', 'HOL', 'NL', 'Flemish', 'FL' ],
		'no': [ 'Norwegian', 'NOR?(?![._-]?\\d+)' ],
		'ps': 'Pashto',
		'pl': [ 'Polish', 'PO?L' ],
		'pt': [ '(?<!brazilian.)Portuguese', 'PT' ],
		'pt-BR': [ 'Brazilian(?:.portuguese)?', 'BR' ],
		'ro': 'Romanian',
		'ru': [ 'Russian', 'RU' ],
		'sk': [ 'Slovak', 'SK', 'SLO', 'Slovenian' ],
		'sv': [ 'Swedish', 'SW?E' ],
		'sw': 'Swahili',
		'tg': 'Tajik',
		'th': 'Thai',
		'tl': 'Tagalog',
		'tr': [ 'Turkish', 'Turk', 'TR' ],
		'uk': 'Ukrainian',
		'vi': 'Vietnamese',
		'zh': [ 'Chinese', 'CH[ST]' ],
		// Misc
		'multi': [ 'Multilingual', 'Multi.?(?:languages?|lang|\\d*)?', 'EURO?P?A?E?', '(?<!WEB.?)[MD]L', 'DUAL(?!.Audio)' ],
		'nordic': [ 'Nordic', 'SCANDiNAViAN' ]
	},

	// Release flags patterns
	FLAGS : {
		'3D': '3D',
		'ABook': 'A(?:UDiO)?BOOK',
		'Abridged': [ 'ABRIDGED', 'gekuerzte?(?:.(?:fassung|lesung))' ], // Audiobook
		'Addon': 'ADDON', // software
		'Anime': 'ANiME',
		'ARM': 'ARM', // software
		'Audiopack': 'Audio.?pack', // Only audio releases for movies
		'Beta': 'BETA', // software
		'Bookware': 'BOOKWARE', // software
		'Boxset': 'BOXSET',
		'Chapterfix': 'CHAPTER[._-]?FIX', // Disc
		'Cheats': 'Cheats', // games
		'Chrono': 'CHRONO',
		'Colorized': 'COLORIZED',
		'Comic': 'COMIC',
		'Complete': 'Complete',
		'Convert': 'CONVERT',
		'Cover': '(?:(?:CUST?OM|%language%|%format%|%source%|%resolution%|scans?|disc|ps[\\dp]*|xbox\\d*|gamecube|gc|unrated|\\d*DVD\\w+|hig?h?.?res|int|front|retail|\\d+dpi|r\\d+|original)[._-]?)?COVERS?',
		'CPOP': 'CPOP', // Chinese-pop
		'Incl. Crack': [ 'CRACK.ONLY', '(?:incl|working)[._-](?:[a-zA-Z]+[._-])?crack' ], // software
		'Cracked': 'CRACKED', // software
		'Crackfix': 'CRACK.?FIX', // software
		'Criterion': 'CRITERION', // special movie rls
		'Digipack': 'DIGIPAC?K?', // music
		'Directors Cut': 'Directors?.?cut',
		'DIRFiX': 'DIR.?FIX',
		'DIZFiX': 'DIZ.?FIX',
		'DLC': '(?:incl.)?DLCS?(?!.?(?:Unlocker|Pack))?', // games
		'DOX': 'D[O0]X',
		'Docu': 'DO[CK]U?',
		'Dolby Vision': [ 'DV', 'DoVi' ],
		'Dubbed': [ '(?<!(?:line|mic|micro|tv).)Dubbed', 'E.?Dubbed', '(?!over|thunder)[a-z]+dub' ],
		'eBook': 'EBOOK',
		'Extended': 'EXTENDED(?:.CUT|.Edition)?(?!.MIX)',
		'Final': 'FINAL[._-]?(%language%|%flags%)?',
		'FiX': '(?<!hot.|sample.|nfo.|rar.|dir.|crack.|sound.|track.|diz.|menu.)FiX(?:.?only)?',
		'Font': '(Commercial.)?FONTS?',
		'Fontset': '(Commercial.)?FONT.?SET',
		'Fullscreen': 'FS', // Fullscreen
		'FSK': 'FSK', // German rating system
		'Hardcoded Subtitles': 'HC', // (P2P)
		'HDLIGHT': 'HDLIGHT',
		'HDR': 'HDR',
		'HDR10': 'HDR10(?:hevc)?',
		'HDR10+': 'HDR10(Plus|\\+)',
		'HLG': 'HLG', // Hybrid log-gamma (like HDR)
		'HOTFiX': 'HOT[._-]?FIX',
		'HOU': 'HOU',
		'HSBS': 'HS(?:BS)?', // Half side-by-side (3D format)
		'Hybrid': 'HYBRID',
		'Imageset': '(?:Full[._-]?)?(?:IMA?GE?|photo|foto).?SETS?',
		'IMAX': 'IMAX',
		'Internal': 'iNT(ERNAL)?',
		'IVTC': 'IVTC', // Inverce telecine
		'JAV': 'JAV', // Japanese Adult Video
		'KEY': 'GENERIC.?KEY',
		'KEYGEN': [ '(?:Incl.)?KEY(?:GEN(?:ERATOR)?|MAKER)(?:.only)?', 'KEYFILE.?MAKER' ],
		'Intel': 'INTEL',
		'Line dubbed': [ 'ld', 'line.?dubbed' ],
		'Limited': 'LIMITED',
		'Magazine': 'MAG(AZINE)?',
		'Menufix': 'MENU.?FIX',
		'Micro dubbed': [ '(?:ac3)?md', 'mic(ro)?.?dubbed' ],
		'MIPS': 'MIPS', // software (MIPS CPU)
		'New': 'New[._-](%format%|%language%|%source%|%resolution%)',
		'NFOFiX': 'NFO.?FiX',
		'OAR': 'OAR', // Original Aspect Ratio
		'OVA': 'O[AV]+', // Original Video Anime/Original Anime Video
		'OAD': 'OAD', // Original Anime DVD
		'ONA': 'OMA', // Original Net Animation
		'OEM': 'OEM', // Original equipment manufacturer
		'OST': 'OST', // Music - Original Soundtrack
		//'PACK': 'PACK',
		'Incl. Patch': [ '(?:incl.)?(?:[a-z]+[._-])?patch(?:ed)?(?:[._-]only)', 'no[a-zA-Z]+[._-]patch(?:ed)?(?:[._-]only)' ], // software
		'Paysite': 'PAYSITE', // xxx
		'Portable': 'Portable', // Software
		'Preair': 'PREAIR',
		'Proper': '(?:REAL)?PROPER',
		'Promo': 'PROMO',
		'Prooffix': 'PROOF.?FIX',
		'Rated': 'RATED',
		'RARFix': 'RARFIX',
		'READNFO': 'READ.?NFO',
		'Refill': 'Refill',
		'Reissue': 'REISSUE',	// music
		'Regged': 'REGGED',	// software
		'Regraded': 'regraded', // Movie (p2p)
		'Remastered': 'REMASTERED',
		'Remux': 'REMUX',
		'Repack': '(working.)?REPACK',
		'RERiP': 're.?rip',
		'Restored': 'RESTORED',
		'Retail': 'RETAIL',
		'Samplefix': 'SAMPLE.?FIX',
		'SDR': 'SDR',
		'Serial': 'SERIAL(?!.Killer)?', // Software
		'SFVFix': 'SFV.?FIX',
		'SH3': 'SH3', // Software (SH3 CPU)
		'Soundfix': 'SOUNDFIX',
		'Special Edition': 'SE(?!.\d*)',
		'STV': 'STV',
		'Subbed': [ '[a-zA-Z]*SUB(?:BED|S)?', 'SUB[._-]?\\w+' ],
		'Subfix': 'SUB.?FIX',
		'Superbit': 'Superbit',	// https://de.wikipedia.org/wiki/Superbit
		'Syncfix': 'SYNC.?FIX', // Video AUdio
		'Theatrical': 'THEATRICAL',
		'Trackfix': 'TRACK.?FiX', // Music
		'Trailer': 'TRAILER',
		'TRAiNER': 'Trainer(?!.XXX)(?:.(?:%flags%))?', // Games
		'Tutorial': 'TUTORIAL',
		'TV Dubbed': 'tv.?dubbed',
		'UHD': 'UHD',
		'Upscaled UHD': 'UpsUHD',
		'Unabridged': [ 'UNABRIDGED', 'Ungekuerzt' ], // Audiobook
		'Uncensored': 'UNCENSORED',
		'Uncut': 'UNCUT',
		'Unlicensed': 'UNLiCENSED',
		'Unrated': 'UNRATED',
		'Untouched': 'UNTOUCHED',
		'USK': 'USK', // German rating system
		'Update': '(WITH[._-])?UPDATE',
		'V1': 'V1[._-](%format%|%language%|%source%|%resolution%)',
		'V2': 'V2[._-](%format%|%language%|%source%|%resolution%)',
		'V3': 'V3[._-](%format%|%language%|%source%|%resolution%)',
		'VKI': 'VKI', // Variable Keyframe Intervals
		'VR': 'VR', // Virtual reality
		'VR180': 'VR180', // Virtual reality video format with a 180° panorama
		'Workprint': [ 'WORKPRINT', 'WP' ],
		'Widescreen': [ 'widescreen', 'WS' ], // Widescreen
		'x64': 'x64', // software
		'x86': 'x86', // software
		'XSCale': 'Xscale', // software
		'XXX': 'XXX'
	},

	// Format: DE + EN + NL / FR / IT / ES
	MONTHS : {
		1: 'Januar[iy]?|Janvier|Gennaio|Enero|Jan',
		2: 'Februar[iy]?|Fevrier|Febbraio|Febrero|Feb',
		3: 'Maerz|March|Moart|Mars|Marzo|Mar',
		4: 'A[bpv]rile?|Apr',
		5: 'M[ae][iy]|Maggio|Mayo',
		6: 'Jun[ie]o?|Juin|Giugno|Jun',
		7: 'Jul[iy]o?|Juillet|Luglio|Jul',
		8: 'August|Aout|Agosto|Augustus|Aug',
		9: 'Septemb[er][er]|Settembre|Septiembre|Sep',
		10: 'O[ck]tob[er][er]|Ottobre|Octubre|O[ck]t',
		11: 'Novi?emb[er][er]|Nov',
		12: 'D[ei][cz]i?emb[er][er]|De[cz]'
	},

	// All different Sports
	SPORTS : [
		// Football
		'a-league',			// Australia
		'Premier.?League',	// England
		'La.?Liga',			// Spain
		'Bundesliga',		// Germany
		'Eredivisie',		// Netherlands
		'Ligue.?1',			// France
		'Seria.?A',			// Italy
		'FA.Cup',			// England
		'EPL',				// England
		'EFL.(?:\\d{1,4}|cup|championship)', // England
		'MLS',				// USA
		'CSL',				// China
		'fifa.(?:world.cup|women|fotbolls|wm|U\\d+)', // International
		'(?:international.)?football.(?:australia|womens|sydney|friendly|ligue1|serie.a|uefa|conference|league)', // International
		'(?:womens.)?UEFA',	// European
		'UEL',				// UEFA Europa league
		'concacaf',			// North and Middle America
		'conmebol',			// South America
		'caf',				// African
		'afc.asian',		// Asian
		// Racing
		'Formul[ae].?[1234E]',
		'F[123]',
		'Superleague.Formula',	
		'Nascar.(?:cup|truck|xfinity)',
		'Indycar',
		'Porsche.(Carrera|sprint)',
		'DTM.(\\d{2,4}|spa|lauszitzring|gp\\d+|\\d+.lauf)',
		'wrc.(?:fia|\\d{4})', // Rallye
		'Supercars.championship',
		'W.series.\\d{4}',
		'Moto.?(GP|[123])',
		// Cycling
		'Cycling.(?:volta|giro|tour|strade|paris|criterium|liege|fleche|amstel|la.vuelta)', // International
		'giro.d.italia', // Italy
		'la.vuelta.(?:a.espana.)?\\d{4}', // Spain
		'tour.de.france.(?:femmes.)?\\d{4}.stage.?\\d+', // France
		'UCI',	// International
		// Rugby
		'(?:Super|international).rugby',
		'IPL',	// India
		'NRL',	// Australasian
		// Basketball
		'NBA.(?:East|West|Finals)',
		'WNBA.\\d{4}',
		'Eurocup',
		// Cricket
		'T20',
		'BBL',	// Australia
		// American Football
		'NFL',
		// Wrestle
		'wwe.(?:nxt|friday|this|main|monday|wrestlemania)',
		'aew.(?:collision|dynamite|dark)',
		// Hockey
		'NHL',
		// Baseball
		'MLB',
		// Boxing
		'boxing.\\d{4}.\\d{2}.\\d{2}',
		// Sumo
		'Grand.Sumo',
		// Tennis
		'wimbledon.(?:tennis.)?\\d{4}',
		// eSports
		'LPL.PRO',
		// World cup of whatever
		'World.cup'
	],


	// Flags for identifying release type ( guessTypeByParsedAttributes )
	flagsMovie : [ 'Dubbed', 'AC3 Dubbed', 'HDR', 'HDR10', 'HDR10+', 'IMAX', 'Line dubbed', 'Micro dubbed', 'THEATRICAL', 'UNCUT', 'Remux', 'Subbed', 'Directors Cut' ],
	flagsEbook : [ 'EBOOK', 'MAGAZINE', 'COMIC', 'EPUB' ],
	flagsMusic : [ 'OST' ],
	flagsApps : [ 'CRACKED', 'REGGED', 'KEYGEN', 'Incl. Patch', 'CRACKFIX', 'ISO', 'ARM', 'INTEL', 'x86', 'x64', 'Portable' ],
	flagsGames : [ 'DLC', 'Trainer' ],
	flagsAnime : [ 'ANIME', 'OVA', 'ONA', 'OAD' ],
	flagsXxx : [ 'XXX', 'JAV', 'Imageset' ],
	// Formats
	formatsVideo : [ 'AVC', 'VCD', 'SVCD', 'CVCD', 'XViD', 'DiVX', 'x264', 'x265', 'h264', 'h265', 'HEVC', 'MP4', 'MPEG', 'MPEG2', 'VC1', 'WMV' ],
	formatsMusic : [ 'FLAC', 'KONTAKT', 'MP3', 'OGG', 'WAV' ],
	formatsMvid : [ 'MBluray', 'MDVDR', 'MViD' ],
	// Sources
	sourcesTv : [ 'ATVP', 'DSR', 'EDTV', 'HDTV', 'PDTV', 'SDTV', 'UHDTV', 'Amazon' ],
	sourcesGames : [ 'Console DVD', 'Nintendo eShop', 'XBLA' ]

}

export default patterns