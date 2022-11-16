const express = require('express');
const app = express();
const Release = require('./ReleaseParser.js')

// https://help.dreamhost.com/hc/en-us/articles/360043547431-Node-js-example-scripts
app.listen( 9999, () => {
	console.log( 'Parsed: ' + new Release( 'Full.Metal.Panic.Eps.01-02.INTERNAL.SVCD.DVDrip.DUBBED.DIRFIX-USAnime', 'SVCD' ).toString() )
	console.log( 'Right: Show: Full Metal Panic / Title: 02 / Group: USAnime / Episode: 01-02 / Flags: DIRFiX, Dubbed, Internal / Source: DVDRip / Format: SVCD / Type: TV')
})

function parserTest() {

	// All releases that needed to be tested.
	const tests = [

		// TV
		[ // Multiple episodes: 01-02
			new Release( 'Full.Metal.Panic.Eps.01-02.INTERNAL.SVCD.DVDrip.DUBBED.DIRFIX-USAnime', 'SVCD' ),
			'Show: Full Metal Panic / Title: 02 / Group: USAnime / Episode: 01-02 / Flags: DIRFiX, Dubbed, Internal / Source: DVDRip / Format: SVCD / Type: TV'
		],
		[ // Special season + episode pattern: S2.E07
			new Release( '24.Twenty.Four.S2.E07.German.DVDRiP.Line.Dubbed.SVCD-SOF', 'SVCD' ),
			'Title: 24 Twenty Four / Group: SOF / Season: 2 / Episode: 7 / Flags: Line dubbed / Source: DVDRip / Format: SVCD / Language: German / Type: TV'
		],
		[
			new Release( '24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed', 'TV' ),
			'Show: 24 / Title: 9 00 Uhr bis 10 00 Uhr / Group: c0nFuSed / Season: 2 / Episode: 2 / Flags: READNFO, TV Dubbed / Source: DVDRip / Format: SVCD / Language: German, Multilingual / Type: TV'
		],
		[
			new Release( 'Direct.Talk.S09E09.Mizutani.Yoshihiro.Relief.Beds.Made.of.Cardboard.1080p.HDTV.H264-DARKFLiX', 'tv' ),
			'Show: Direct Talk / Title: Mizutani Yoshihiro Relief Beds Made of Cardboard / Group: DARKFLiX / Season: 9 / Episode: 9 / Source: HDTV / Format: h264 / Resolution: 1080p / Type: TV'
		],
		[
			new Release( 'Dark.Net.S01E06.DOC.SUBFRENCH.720p.WEBRip.x264-TiMELiNE', 'tv' ),
			'Title: Dark Net / Group: TiMELiNE / Season: 1 / Episode: 6 / Flags: DOC, Subbed / Source: WEB / Format: x264 / Resolution: 720p / Type: TV'
		],
		[ // Old season + episode pattern: 2x14
			new Release( 'The.X-Files.2x14.Die.Hand.Die.Verletzt.DVDRip.XviD.MultiDub-VeLVeT', 'tv' ),
			'Show: The X-Files / Title: Die Hand Die Verletzt / Group: VeLVeT / Season: 2 / Episode: 14 / Flags: Dubbed / Source: DVDRip / Format: XViD / Type: TV'
		],
		[ // Whole season without episode
			new Release( 'Riverdale.US.S05.PROPER.FRENCH.WEB.x264-STRINGERBELL', 'tv' ),
			'Title: Riverdale US / Group: STRINGERBELL / Season: 5 / Flags: PROPER / Source: WEB / Format: x264 / Language: French / Type: TV'
		],
		[ // Episode is 0 (needs dirfix but works)
			new Release( '72.Cutest.Animals.S01E0.German.DL.Doku.1080p.WEB.x264-BiGiNT', 'tv' ),
			'Title: 72 Cutest Animals / Group: BiGiNT / Season: 1 / Episode: 0 / Flags: Doku / Source: WEB / Format: x264 / Resolution: 1080p / Language: German, Multilingual / Type: TV'
		],

		// TV SPorts
		[
			new Release( 'NFL.2021.09.26.49ers.Vs.Packers.1080p.WEB.h264-SPORTSNET', 'tv' ),
			'Show: NFL / Title: 49ers Vs. Packers / Group: SPORTSNET / Year: 2021 / Date: 26.09.2021 / Source: WEB / Format: h264 / Resolution: 1080p / Type: TV'
		],
		[
			new Release( 'Formula1.2021.Russian.Grand.Prix.Highlights.1080p.HDTV.H264-DARKSPORT', 'tv' ),
			'Show: Formula1 / Title: Russian Grand Prix Highlights / Group: DARKSPORT / Year: 2021 / Source: HDTV / Format: h264 / Resolution: 1080p / Type: TV'
		],
		[
			new Release( 'WWE.Friday.Night.Smackdown.2021-09-10.German.HDTVRiP.x264-SPORTY', 'tv' ),
			'Title: WWE Friday Night Smackdown / Group: SPORTY / Year: 2021 / Date: 10.09.2021 / Source: HDTV / Format: x264 / Language: German / Type: TV'
		],

		// Anime
		[
			new Release( 'Bastard.Episode4.Dubbed.OAV.DVDRip.XviD-DVDiSO', 'XVID' ),
			'Title: Bastard / Group: DVDiSO / Episode: 4 / Flags: Dubbed, OVA / Source: DVDRip / Format: XViD / Type: Anime'
		],
		[
			new Release( 'Kurokos.Basketball.2nd.Season.NG-shuu.Specials.E06.German.Subbed.2014.ANiME.BDRiP.x264-STARS', 'anime' ),
			'Title: Kurokos Basketball 2nd Season NG-shuu Specials / Group: STARS / Year: 2014 / Episode: 6 / Flags: Anime, Subbed, Subbed / Source: BDRip / Format: x264 / Language: German / Type: Anime'
		],
		[
			new Release( 'Pokemon.23.Der.Film.Geheimnisse.des.Dschungels.German.2020.ANiME.DL.EAC3D.1080p.BluRay.x264-STARS', 'anime' ),
			'Title: Pokemon 23 Der Film Geheimnisse des Dschungels / Group: STARS / Year: 2020 / Flags: Anime / Source: Bluray / Format: x264 / Resolution: 1080p / Audio: EAC3D / Language: German, Multilingual / Type: Anime'
		],

		// Music
		[
			new Release( 'The.Dells.vs.The.Dramatics.LP-(1974)-diss', 'MP3' ),
			'Title: The Dells vs. The Dramatics / Group: diss / Year: 1974 / Source: LP / Type: Music'
		],
		[ // Music format
			new Release( 'Zenhiser.Prophet.5.FX.WAV-SONiTUS', '0day' ),
			'Title: Zenhiser Prophet 5 FX / Group: SONiTUS / Format: WAV / Type: Music'
		],
		[
			new Release( 'Victoria_feat._Sledge-Wanna_Be_(More_Than_Your_Lover)-(DRR-20-1_CD-M)-CDM-FLAC-1998-WRE', 'mp3' ),
			'Artist: Victoria feat. Sledge / Song: Wanna Be (More Than Your Lover) / Group: WRE / Year: 1998 / Source: CD Single / Format: FLAC / Type: Music'
		],
		[
			new Release( '(eiffel_65)-blue_cd_beryl-bpm', 'mp3' ),
			'Artist: (eiffel 65) / Title: blue / Group: bpm / Source: CD / Type: Music'
		],
		[
			new Release( 'Velarde_x_Luque_x_Vitti_feat_Giovanna_-_Serious_Emotions_2k21_(2nd_Remixes_Pack)-(GR670)-WEB-2021-ZzZz', 'mp3' ),
			'Artist: Velarde x Luque x Vitti feat. Giovanna / Title: Serious Emotions 2k21 (2nd Remixes Pack) / Group: ZzZz / Year: 2021 / Source: WEB / Type: Music'
		],
		[
			new Release( 'Metallica-the_memory_remains_2-1997-ccmp3d', 'mp3'),
			'Artist: Metallica / Title: the memory remains 2 / Group: ccmp3d / Year: 1997 / Type: Music'
		],
		[ // Special date parsing
			new Release( 'Statik-Drum_and_Bass_Classic_Mix-9th_January_2001-sour', 'mp3' ),
			'Artist: Statik / Title: Drum and Bass Classic Mix / Group: sour / Year: 2001 / Date: 09.01.2001 / Type: Music'
		],
		[ // Music with venue and date
			new Release( 'Kraftwerk_-_Live_in_Melbourne_(Australia_29.01.2003)-2CD-Bootleg-2003-BFHMP3', 'mp3' ),
			'Artist: Kraftwerk / Title: Live in Melbourne (Australia 29 01 2003) / Group: BFHMP3 / Year: 2003 / Date: 29.01.2003 / Source: Bootleg / Type: Music'
		],

		// EBook
		[ // Basic with title and title extra
			new Release( 'IDW.-.Witch.And.Wizard.Battle.For.Shadowland.2012.Hybrid.Comic.eBook-BitBook', 'ebook' ),
			'Author: IDW / Title: Witch And Wizard Battle For Shadowland / Group: BitBook / Year: 2012 / Flags: Comic, eBook / Format: Hybrid / Type: eBook'
		],
		[ // Newspaper with date (09.28.2021) = 28.09.2021 (reformatted)
			new Release( 'La.Gazzetta.Dello.Sport.09.28.2021.iTALiAN.RETAiL.eBook-DiVER', 'ebook' ),
			'Title: La Gazzetta Dello Sport / Group: DiVER / Year: 2021 / Date: 28.09.2021 / Flags: eBook, Retail / Language: Italian / Type: eBook'
		],
		[ // Magazine with monthname and year (September 20201)
			new Release( 'Scootering.September.2021.HYBRiD.MAGAZiNE.eBook-PAPERCLiPS', 'ebook' ),
			'Title: Scootering / Group: PAPERCLiPS / Year: 2021 / Date: 01.09.2021 / Flags: eBook, Magazine / Format: Hybrid / Type: eBook'
		],
		[ // Comic with title, title_extra and issue number (No.04)
			new Release( 'Viper.Comics.-.Ichabod.Jones.Monster.Hunter.No.04.2012.Hybrid.Comic.eBook-BitBook', 'ebook' ),
			'Author: Viper Comics / Title: Ichabod Jones Monster Hunter / Group: BitBook / Year: 2012 / Episode: 4 / Flags: Comic, eBook / Format: Hybrid / Type: eBook'
		],
		[ // Basic magazine with issue number (No.314)
			new Release( 'EDGE.No.314.2018.HYBRiD.MAGAZiNE.eBook-PAPERCLiPS', 'ebook' ),
			'Title: EDGE / Group: PAPERCLiPS / Year: 2018 / Episode: 314 / Flags: eBook, Magazine / Format: Hybrid / Type: eBook'
		],
		[ // Other version of issue number (N119)
			new Release( 'Prog.N119.2021.RETAiL.MAGAZiNE.eBook-PRiNTER', 'ebook' ),
			'Title: Prog / Group: PRiNTER / Year: 2021 / Episode: 119 / Flags: eBook, Magazine, Retail / Type: eBook'
		],
		[ // Other version of issue number (Band)
			new Release( 'Die.Enwor.Saga.Band.05.-.Das.Schwarze.Schiff.German.Ebook-Elements', 'ebook' ),
			'Author: Die Enwor Saga / Title: Das Schwarze Schiff / Group: Elements / Episode: 5 / Flags: eBook / Language: German / Type: eBook'
		],
		[ // Other version of issue number (Issue)
			new Release( 'The.Amazing.Spiderman.Issue.501.January.2004.Comic.eBook-Dementia', 'ebook' ),
			'Title: The Amazing Spiderman / Group: Dementia / Year: 2004 / Date: 01.01.2004 / Episode: 501 / Flags: Comic, eBook / Type: eBook'
		],
		[ // Other version of issue number
			new Release( 'Simpsons.Comics.Ausgabe.15.Januar.1998.German.Comic.eBook-HS', 'ebook' ),
			'Title: Simpsons Comics / Group: HS / Year: 1998 / Date: 01.01.1998 / Episode: 15 / Flags: Comic, eBook / Language: German / Type: eBook'
		],
		[ // title + title_extra + special date formatting (15 Januar 2004)
			new Release( 'Concorde.-.Die.Traumer.15.Januar.2004.Presseheft.German.Ebook-Elements', 'ebook' ),
			'Author: Concorde / Title: Die Traumer / Group: Elements / Year: 2004 / Date: 15.01.2004 / Flags: eBook / Language: German / Type: eBook'
		],
		[ // Basic book with author and book title
			new Release( 'Gerd.Postel.-.Gestaendnisse.Eines.Falschen.Doktors.German.Ebook-Elements', 'ebook' ),
			'Author: Gerd Postel / Title: Gestaendnisse Eines Falschen Doktors / Group: Elements / Flags: eBook / Language: German / Type: eBook'
		],
		[ // Issue is 0
			new Release( 'IDW.-.Machete.No.0.2010.Hybrid.Comic.eBook-BitBook', 'ebook' ),
			'Author: IDW / Title: Machete / Group: BitBook / Year: 2010 / Episode: 0 / Flags: Comic, eBook / Format: Hybrid / Type: eBook'
		],

		// Abook
		[ // Title + title_extra + episode number (F04)
			new Release( 'Otfried_Preussler_-_Der_Hotzenplotz_Geht_Um-F04-(Audiobook)-DE-2001-S8', 'Abook' ),
			'Author: Otfried Preussler / Title: Der Hotzenplotz Geht Um / Group: S8 / Year: 2001 / Episode: 4 / Flags: ABook / Language: German / Type: ABook'
		],
		[ // Simple named abook
			new Release( 'York-2CD-ABOOK-DE-2001-sUppLeX', 'abook' ),
			'Title: York / Group: sUppLeX / Year: 2001 / Flags: ABook / Source: CD / Language: German / Type: ABook'
		],
		[ // Other version of episode number (Folge 212)
			new Release( 'Die_Drei_Fragezeichen--Folge_212_und_der_weisse_Leopard-AUDIOBOOK-WEB-DE-2021-OMA', 'abook' ),
			'Author: Die Drei Fragezeichen / Title: und der weisse Leopard / Group: OMA / Year: 2021 / Episode: 212 / Flags: ABook / Source: WEB / Language: German / Type: ABook'
		],
		[
			new Release( 'Perry_Rhodan-SE_117_Duell_Der_Erbfeinde-ABOOK-DE-MP3CD-2021-FLUiD', 'abook' ),
			'Author: Perry Rhodan / Title: Duell Der Erbfeinde / Group: FLUiD / Year: 2021 / Episode: 117 / Flags: ABook / Source: MP3 CD / Language: German / Type: ABook'
		],
		[
			new Release( 'Jan_Tenner_Der_Neue_Superheld-F20_Rueckkehr_Ins_Reich_Der_Azzarus-Audiobook-DE-2021-VOiCE', 'abook' ),
			'Author: Jan Tenner Der Neue Superheld / Title: Rueckkehr Ins Reich Der Azzarus / Group: VOiCE / Year: 2021 / Episode: 20 / Flags: ABook / Language: German / Type: ABook'
		],

		// XXX
		[ // Website/Publisher + Date + Title
			new Release( 'NaughtyAmerica.com_17.10.12.Sloan.Harper.Sean.Lawless.Dirty.Wives.Club.XXX.IMAGESET-FuGLi', 'imgset' ),
			'Publisher: NaughtyAmerica.com / Title: Sloan Harper Sean Lawless Dirty Wives Club / Group: FuGLi / Year: 2017 / Date: 12.10.2017 / Flags: Imageset, XXX / Type: XXX'
		],

		// MusicVideo
		[ // Recorded on a live show with special date (like normal music live recording)
			new Release( 'John_Mayer-Wild_Blue_(The_Late_Show_2021-09-23)-DDC-1080p-x264-2021-SRPx', 'mvid' ),
			'Artist: John Mayer / Title: Wild Blue (The Late Show 2021-09-23) / Group: SRPx / Year: 2021 / Date: 23.09.2021 / Source: DDC / Format: x264 / Resolution: 1080p / Type: MusicVideo'
		],
		[ // Same as above, other dte formatting
			new Release( 'David_Guetta_ft_Nicki_Minaj_and_FloRida-Where_Them_Girls_At_(Americas_Got_Talent_08-31-11)-HDTV-720p-X264-2011-2LC', 'mvid' ),
			'Artist: David Guetta ft. Nicki Minaj and FloRida / Title: Where Them Girls At (Americas Got Talent 08-31-11) / Group: 2LC / Year: 2011 / Date: 31.08.2011 / Source: HDTV / Format: x264 / Resolution: 720p / Type: MusicVideo'
		]
	]
}

//parserTest()

