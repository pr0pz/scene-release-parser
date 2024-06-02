/**
 * Typescript definitions for ReleaseParser
 * Thanks to OFfriend for the initial pull request.
 * 
 * @author Wellington Estevo
 * @version 1.5.0
 */

// Flags
type releaseFlag = '3D' | 'Abridged' | 'Addon' | 'Anime' | 'ARM' | 'Audiopack' | 'Beta' | 'Boxset' | 'Chapterfix' | 'Cheats' | 'Chrono' | 'Colorized' | 'Comic' | 'Complete' | 'Convert' | 'Cover' | 'CPOP' | 'Incl. Crack' | 'Cracked' | 'Crackfix' | 'Criterion' | 'Cuefix' | 'Digipack' | 'Directors Cut' | 'DIRFiX' | 'DIZFiX' | 'DLC' | 'DOX' | 'Docu' | 'Dolby Vision' | 'Dubbed' | 'Extended' | 'Final' | 'FiX' | 'Font' | 'Fontset' | 'Fullscreen' | 'FSK' | 'Hardcoded Subtitles' | 'HDLIGHT' | 'HDR' | 'HDR10' | 'HDR10+' | 'Hentai' | 'HLG' | 'HOTFiX' | 'HOU' | 'HR' | 'HSBS' | 'Hybrid' | 'Imageset' | 'IMAX' | 'Internal' | 'IVTC' | 'JAV' | 'KEY' | 'KEYGEN' | 'Intel' | 'Line dubbed' | 'Limited' | 'M2TS' | 'Magazine' | 'Menufix' | 'Micro dubbed' | 'MIPS' | 'New' | 'NFOFiX' | 'OAR' | 'OVA' | 'OAD' | 'ONA' | 'OEM' | 'OST' | 'PACK' | 'Incl. Patch' | 'Patchfix' | 'Paysite' | 'Portable' | 'Preair' | 'Proper' | 'Promo' | 'Prooffix' | 'Rated' | 'RARFix' | 'READNFO' | 'Redump' | 'Refill' | 'Reissue' | 'Regged' | 'Regraded' | 'Remastered' | 'Remux' | 'Repack' | 'RERiP' | 'Restored' | 'Retail' | 'Ringtone' | 'Samplefix' | 'Scrubbed' | 'Serial' | 'SFVFix' | 'SH3' | 'Sizefix' | 'Soundfix' | 'Special Edition' | 'STV' | 'Subbed' | 'Subfix' | 'Subpack' | 'Superbit' | 'Syncfix' | 'Theatrical' | 'Trackfix' | 'Trailer' | 'TRAiNER' | 'Tutorial' | 'TV Dubbed' | 'Unabridged' | 'Uncensored' | 'Uncut' | 'Unlicensed' | 'Unrated' | 'Untouched' | 'USK' | 'Update' | 'V1' | 'V2' | 'V3' | 'Vertical' | 'VR' | 'VR180' | 'Workprint' | 'Widescreen' | 'x64' | 'x86' | 'XSCale' | 'XXX';

// Source
type releaseSource = 'MBluray' | 'MDVDR' | 'ABC' | 'Amazon' | 'Amazon Freevee' | 'ATVP' | 'AUD' | 'BBC iPlayer' | 'BDRip' | 'BookMyShow' | 'Bootleg' | 'CABLE' | 'CAM' | 'CBS' | 'CD Album' | 'CD EP' | 'CD Single' | 'Comedy Central' | 'Console Disc' | 'Crave' | 'Crunchyroll' | 'DAB' | 'DC Universe' | 'DD' | 'DDC' | 'DAT Tape' | 'Disney Plus' | 'Disney Networks' | 'Discovery Plus' | 'DSR' | 'DVB' | 'DVDA' | 'DVDS' | 'DVDRip' | 'EDTV' | 'FM' | 'Google Play' | 'HBO Max' | 'HDCAM' | 'HDDVD' | 'HDRip' | 'HDTC' | 'HDTV' | 'HLS' | 'Hotstar' | 'Hulu' | 'iTunes' | 'Lionsgate Play' | 'LP' | 'Maxi CD' | 'Maxi Single' | 'Movies Anywhere' | 'MP3 CD' | 'MTV Networks' | 'Mubi' | 'NBC' | 'Netflix' | 'Nintendo eShop' | 'Paramount Plus' | 'Peacock' | 'PDTV' | 'PPV' | 'PSN' | 'RAWRiP' | 'SAT' | 'Scan' | 'Screener' | 'Showtime' | 'SBD' | 'Stan' | 'Stream' | 'Starz' | 'Tape' | 'TBS' | 'Telecine' | 'Telesync' | 'UHDBD' | 'UHDTV' | 'VHS' | 'VLS' | 'Vinyl' | 'VODRip' | 'Web Single' | 'WEB' | 'WOW tv' | 'XBLA' | 'YouTube Red' | 'MiniDisc' | 'Line' | 'CD' | 'DVD' | 'Bluray' | 'SDTV' | 'RiP' | 'BBC' | 'EP';

// Format
type releaseFormat = 'AVC' | 'XViD' | 'DiVX' | 'x264' | 'x265' | 'h264' | 'h265' | 'HEVC' | 'VP8' | 'VP9' | 'MP4' | 'MPEG' | 'MPEG2' | 'VCD' | 'CVD' | 'CVCD' | 'SVCD' | 'VC1' | 'WMV' | 'MDVDR' | 'DVDR' | 'MBluray' | 'Bluray' | 'MViD' | '3GP' | 'AZW' | 'Comic Book Archive' | 'CHM' | 'ePUB' | 'Hybrid' | 'LIT' | 'MOBI' | 'PDB' | 'PDF' | 'DAISY' | 'FLAC' | 'KONTAKT' | 'MP3' | 'WAV' | 'ISO' | 'CrossPlatform' | 'OpenType' | 'TrueType' | 'Java Platform, Micro Edition' | 'Java' | 'Multiformat';

// Resolution
type releaseResolution = '480p' | '576p' | '720p' | '1080i' | '1080p' | '1920p' | '2160p' | '2700p' | '2880p' | '3072p' | '3160p' | '3600p' | '4320p' | 'UHD' | 'UpsUHD' | 'NTSC' | 'PAL' | 'SD';

// Audio
type releaseAudio = '10BIT' | '16BIT' | '24BIT' | '44K' | '48K' | '96K' | '160K' | '176K' | '192K' | 'AAC' | 'AC3' | 'AC3D' | 'EAC3' | 'EAC3D' | 'Dolby Atmos' | 'Dolby Digital' | 'Dolby Digital Plus' | 'Dolby Digital Plus, Dolby Atmos' | 'Dolby trueHD' | 'DTS' | 'DTS-ES' | 'DTS-HD' | 'DTS-HD MA' | 'DTS|X' | 'OGG' | '2.0' | '2.1' | '3.1' | '5.1' | '7.1' | '7.2' | '9.1' | 'Dual Audio' | 'Tripple Audio';

// Device
type releaseDevice = '3DO' | 'Analogue Pocket' | 'Atari Jaguar' | 'Bandai WonderSwan' | 'Bandai WonderSwan Color' | 'Commodore Amiga' | 'Commodore Amiga CD32' | 'Commodore C64' | 'Commodore C264' | 'Nintendo Entertainment System' | 'Super Nintendo Entertainment System' | 'Nintendo GameBoy' | 'Nintendo GameBoy Color' | 'Nintendo GameBoy Advanced' | 'Nintendo Gamecube' | 'Nintendo iQue Player' | 'Nintendo Switch' | 'NEC PC Engine' | 'Nokia N-Gage' | 'Playstation' | 'Playstation 2' | 'Playstation 3' | 'Playstation 4' | 'Playstation 5' | 'Playstation Portable' | 'Playstation Vita' | 'Pocket PC' | 'Sega Dreamcast' | 'Sega Mega CD' | 'Sega Mega Drive' | 'Sega Saturn' | 'Tiger Telematics Gizmondo' | 'VTech V.Flash' | 'Microsoft Xbox' | 'Microsoft Xbox One' | 'Microsoft Xbox360' | 'Nintendo DS' | 'Nintendo 3DS' | 'Nintendo WII' | 'Nintendo WII-U';

// OS
type releaseOS = 'IBM AIX' | 'Android' | 'BlackBerry' | 'BSD' | 'HP-UX' | 'iOS' | 'Linux' | 'macOS' | 'PalmOS' | 'Solaris' | 'SunOS' | 'Symbian' | 'Ubuntu' | 'Unix' | 'WebOS' | 'Windows' | 'Windows CE' | 'Windows Mobile';

// Type
type releaseType = 'ABook' | 'Anime' | 'App' | 'Bookware' | 'eBook' | 'Font' | 'Game' | 'Music' | 'MusicVideo' | 'TV' | 'Sports' | 'XXX' | 'Movie';

// Language
type releaseLanguage = {
	am?: string;
	ar?: string;
	az?: string;
	bg?: string;
	bs?: string;
	ch?: string;
	cs?: string;
	cy?: string;
	de?: string;
	dk?: string;
	el?: string;
	en?: string;
	es?: string;
	et?: string;
	fa?: string;
	fi?: string;
	fil?: string;
	fr?: string;
	ga?: string;
	he?: string;
	hi?: string;
	hr?: string;
	ht?: string;
	hu?: string;
	id?: string;
	is?: string;
	it?: string;
	jp?: string;
	ko?: string;
	km?: string;
	lo?: string;
	lt?: string;
	lv?: string;
	mi?: string;
	mk?: string;
	ms?: string;
	nl?: string;
	no?: string;
	ps?: string;
	pl?: string;
	pt?: string;
	'pt-BR'?: string;
	ro?: string;
	ru?: string;
	sk?: string;
	sv?: string;
	sw?: string;
	tg?: string;
	th?: string;
	tl?: string;
	tr?: string;
	uk?: string;
	vi?: string;
	zh?: string;
	multi?: string;
	nordic?: string;
};

// All parsed data
type ReleaseData = {
	release: string;
	title: string | null;
	titleExtra: string | null;
	group: string | null;
	// Year can also be string (e.g. year not complete clear): 199X
	year: number | string | null;
	date: Date | null;
	season: number | null;
	// Episode could also be string (e.g. multiple episodes): 1-2
	episode: number | string | null;
	disc: number | null;
	flags: releaseFlag[] | null;
	source: releaseSource | null;
	format: releaseFormat | null;
	resolution: releaseResolution | null;
	audio: releaseAudio | null;
	device: releaseDevice | null;
	os: releaseOS | null;
	version: string | null;
	language: releaseLanguage | null;
	country: string | null;
	type: releaseType | null;
};

// Final Release object
type Release = {
	data: ReleaseData;
};

export default function ReleaseParser( source: string, section?: string ): Release;