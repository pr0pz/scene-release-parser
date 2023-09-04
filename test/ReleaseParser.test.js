import ReleaseParser from '../ReleaseParser.js'
import assert from 'assert'

/**
 * This is the main test file.
 * This are hand selected, at some point 'more complex' releases that need to pass the test.
 * 
 * @author Wellington Estevo
 * @version 1.3.1
 */

describe( 'ReleaseParser', function()
{
	// All releases that needed to be tested.
	// Game
	it( 'Game #1', () =>
	{
		assert.equal(
			ReleaseParser( 'Diablo_II_Resurrected_Update_v1.0.0.3_incl_Offline_Crack_NSW-VENOM', 'games' ).toString(),
			'Title: Diablo II Resurrected / Group: VENOM / Flags: Incl. Crack, Update / Device: Nintendo Switch / Version: 1.0.0.3 / Type: Game'
		)
	})

	it( 'Game #2 - Simple with device', () =>
	{
		assert.equal(
			ReleaseParser( 'Madshot_NSW-VENOM', 'games' ).toString(),
			'Title: Madshot / Group: VENOM / Device: Nintendo Switch / Type: Game'
		)
	})

	// Apps
	it( 'Apps #1', () =>
	{
		assert.equal(
			ReleaseParser( 'RSP.OGG.Vorbis.Player.OCX.v2.5.0-Lz0', 'Apps' ).toString(),
			'Title: RSP OGG Vorbis Player OCX / Group: Lz0 / Version: 2.5.0 / Type: App'
		)
	})

	it( 'Apps #2', () =>
	{
		assert.equal(
			ReleaseParser( 'ActiveState.Visual.Python.for.VS.2003.v1.8.1.2082.WinNT2K.Incl.Keygenerator-TMG', 'Games' ).toString(),
			'Title: ActiveState Visual Python for VS 2003 / Group: TMG / Year: 2003 / Flags: KEYGEN / Os: Windows / Version: 1.8.1.2082 / Type: App'
		)
	})

	it( 'Apps #3', () =>
	{
		assert.equal(
			ReleaseParser( 'Aviano.Update.v1.03-ANOMALY', '0day' ).toString(),
			'Title: Aviano / Group: ANOMALY / Flags: Update / Version: 1.03 / Type: App'
		)
	})

	it( 'Apps #4', () =>
	{
		assert.equal(
			ReleaseParser( 'QUIZWARE.PRACTICE.TESTS.FOR.COMPUTER.ASSOCIATES.CERTIFICATIONS.V4.84-JGT', 'ebook' ).toString(),
			'Title: Quizware Practice Tests For Computer Associates Certifications / Group: JGT / Version: 4.84 / Type: App'
		)
	})

	it( 'Apps #5 - Movie Source and Audio in rls name', () =>
	{
		assert.equal(
			ReleaseParser( 'SurCode.DVD.Professional.DTS.Encoder.v1.0.21.Retail-iNTENSiON', 'Apps' ).toString(),
			'Title: SurCode DVD Professional DTS Encoder / Group: iNTENSiON / Flags: Retail / Version: 1.0.21 / Type: App'
		)
	})

	it( 'Apps #6 - OS in rls name', () =>
	{
		assert.equal(
			ReleaseParser( 'Schweighofer.Win1A.Lohn.v23.10.4.0.German.WinALL.Incl.Keygen-BLiZZARD', 'Apps' ).toString(),
			'Title: Schweighofer Win1A Lohn / Group: BLiZZARD / Flags: KEYGEN / Os: Windows / Version: 23.10.4.0 / Language: German / Type: App'
		)
	})

	it( 'Apps #7 - Remove OS from rls name', () =>
	{
		assert.equal(
			ReleaseParser( 'Broforce.Forever.MacOS-I_KnoW', 'Pre' ).toString(),
			'Title: Broforce Forever / Group: I_KnoW / Os: macOS / Type: App'
		)
	})

	it( 'Apps #8 - Symbian App - dont falsely parse episode and season', () =>
	{
		assert.equal(
			ReleaseParser( 'PocketTorch.AquaCalendar.V1.v1.2.N3650.NGAGE.SX1.S60.SymbianOS.READ.NFO.Cracked-aSxPDA', 'NGAGE' ).toString(),
			'Title: PocketTorch AquaCalendar / Group: aSxPDA / Flags: Cracked, READNFO / Device: Nokia N-Gage / Os: Symbian / Version: 1.v1 / Type: App'
		)
	})

	// Bookware
	it( 'Bookware #1', () =>
	{
		assert.equal(
			ReleaseParser( 'PluralSight.Microsoft.Azure.Network.Engineer-secure.And.Monitor.Networks.Bookware-KNiSO', '0day' ).toString(),
			'Title: Microsoft Azure Network Engineer-secure And Monitor Networks / Group: KNiSO / Source: PluralSight / Type: Bookware'
		)
	})

	it( 'Bookware #2 - With language', () =>
	{
		assert.equal(
			ReleaseParser( 'UDEMY.Desarrollando.el.Sistema.SysCarteleria.v2.Visual.FoxPro.SPANISH.BOOKWARE-iLEARN', 'PRE' ).toString(),
			'Title: Desarrollando el Sistema SysCarteleria v2 Visual FoxPro / Group: iLEARN / Source: Udemy / Language: Spanish / Type: Bookware'
		)
	})

	it( 'Bookware #3 - With version (update)', () =>
	{
		assert.equal(
			ReleaseParser( 'PluralSight.Angular.Getting.Started.UPDATED.20220706.Bookware-KNiSO', 'PRE' ).toString(),
			'Title: Angular Getting Started / Group: KNiSO / Source: PluralSight / Version: 20220706 / Type: Bookware'
		)
	})

	// Movies (usually a lot of flags for testing)
	it( 'Movies #1', () =>
	{
		assert.equal(
			ReleaseParser( 'Harry.Potter.und.die.Kammer.des.Schreckens.TS.Line.Dubbed.German.INTERNAL.VCD.CD2.REPACK-TGSC', 'Apps' ).toString(),
			'Title: Harry Potter und die Kammer des Schreckens / Group: TGSC / Flags: Internal, Line dubbed, Repack / Source: Telesync / Format: VCD / Language: German / Type: Movie'
		)
	})

	it( 'Movies #2', () =>
	{
		assert.equal(
			ReleaseParser( 'Sweet.Home.Alabama.SCREENER.Line.Dubbed.German.VCD-TGSC', 'Screener' ).toString(),
			'Title: Sweet Home Alabama / Group: TGSC / Flags: Line dubbed / Source: Screener / Format: VCD / Language: German / Type: Movie'
		)
	})

	it( 'Movies #3', () =>
	{
		assert.equal(
			ReleaseParser( 'Die.Bourne.Verschwoerung.German.2004.INTERNAL.No.Bock.uff.Proper.READ.NFO.AC3.Dubbed.DL.DVDR-Cinemaniacs', 'DVDR' ).toString(),
			'Title: Die Bourne Verschwoerung / Group: Cinemaniacs / Year: 2004 / Flags: Dubbed, Internal, Proper, READNFO / Source: DVD / Format: DVDR / Audio: AC3 / Language: German, Multilingual / Type: Movie'
		)
	})

	it( 'Movies #4', () =>
	{
		assert.equal(
			ReleaseParser( 'Gegen.den.Strom.2018.German.AC3D.DL.1080p.BluRay.x264-SAVASTANOS', 'X264' ).toString(),
			'Title: Gegen den Strom / Group: SAVASTANOS / Year: 2018 / Source: Bluray / Format: x264 / Resolution: 1080p / Audio: AC3D / Language: German, Multilingual / Type: Movie'
		)
	})

	it( 'Movies #5 - Version in name: falsely parsing a version', () =>
	{
		assert.equal(
			ReleaseParser( 'Burial.Ground.The.Nights.Of.Terror.1981.DUBBED.GRINDHOUSE.VERSION.1080P.BLURAY.X264-WATCHABLE', 'X264' ).toString(),
			'Title: Burial Ground The Nights Of Terror / Group: WATCHABLE / Year: 1981 / Flags: Dubbed / Source: Bluray / Format: x264 / Resolution: 1080p / Type: Movie'
		)
	})

	it( 'Movies #6', () =>
	{
		assert.equal(
			ReleaseParser( 'Batman.v.Superman.Dawn.of.Justice.2016.IMAX.German.DL.TrueHD.Atmos.DUBBED.2160p.UHD.BluRay.x265-GSG9', 'PRE' ).toString(),
			'Title: Batman v Superman Dawn of Justice / Group: GSG9 / Year: 2016 / Flags: Dubbed, IMAX, UHD / Source: Bluray / Format: x265 / Resolution: 2160p / Audio: Dolby Atmos, Dolby trueHD / Language: German, Multilingual / Type: Movie'
		)
	})

	it( 'Movies #7 - Lots of flags', () =>
	{
		assert.equal(
			ReleaseParser( 'Wonder.Woman.1984.2020.IMAX.German.UHDBD.2160p.DV.HDR10.HEVC.TrueHD.DL.Remux-pmHD', '0DAY' ).toString(),
			'Title: Wonder Woman 1984 / Group: pmHD / Year: 2020 / Flags: Dolby Vision, HDR10, IMAX, Remux / Source: UHDBD / Format: HEVC / Resolution: 2160p / Audio: Dolby trueHD / Language: German, Multilingual / Type: Movie'
		)
	})

	it( 'Movies #8 - Multiple Audio', () =>
	{
		assert.equal(
			ReleaseParser( 'Cloudy.With.A.Chance.Of.Meatballs.2009.NORDIC.DTS-HD.DTS.AC3.NORDICSUBS.1080p.BluRay.x264-TUSAHD', 'X264' ).toString(),
			'Title: Cloudy With A Chance Of Meatballs / Group: TUSAHD / Year: 2009 / Flags: Subbed / Source: Bluray / Format: x264 / Resolution: 1080p / Audio: AC3, DTS, DTS-HD / Language: Nordic / Type: Movie'
		)
	})

	it( 'Movies #9 - P2P, lots of stuff', () =>
	{
		assert.equal(
			ReleaseParser( 'Angel.Heart.1987.German.DTSMAD.5.1.DL.2160p.UHD.BluRay.HDR.DV.HEVC.Remux-HDSource', 'BluRay' ).toString(),
			'Title: Angel Heart / Group: HDSource / Year: 1987 / Flags: Dolby Vision, HDR, Remux, UHD / Source: Bluray / Format: HEVC / Resolution: 2160p / Audio: DTS-HD MA, 5.1 / Language: German, Multilingual / Type: Movie'
		)
	})

	it( 'Movies #10 - Multiple lang codes', () =>
	{
		assert.equal(
			ReleaseParser( 'Animals.United.2010.Audiopack.Dk.No.Fi.DVDRip.XviD-DiGiCo', 'XVID' ).toString(),
			'Title: Animals United / Group: DiGiCo / Year: 2010 / Flags: Audiopack / Source: DVDRip / Format: XViD / Language: Danish, Finnish, Norwegian / Type: Movie'
		)
	})

	it( 'Movies #11 - No group at the end', () =>
	{
		assert.equal(
			ReleaseParser( 'Intruders.Die.Aliens.Sind.Unter.Uns.1992.Uncut.German.AC3.DVDRiP.XviD', 'x265' ).toString(),
			'Title: Intruders Die Aliens Sind Unter Uns / Group: NOGRP / Year: 1992 / Flags: Uncut / Source: DVDRip / Format: XViD / Audio: AC3 / Language: German / Type: Movie'
		)
	})

	it( 'Movies #12 - Flags in title, dont parse episode', () =>
	{
		assert.equal(
			ReleaseParser( 'Der.Herr.Der.Ringe.Die.Gefaehrten.SPECIAL.EXTENDED.EDITION.2001.German.DL.1080p.BluRay.AVC.READ.NFO.PROPER-AVCBD', 'BLURAY-AVC' ).toString(),
			'Title: Der Herr Der Ringe Die Gefaehrten / Group: AVCBD / Year: 2001 / Flags: Extended, Proper, READNFO, Special Edition / Source: Bluray / Format: AVC / Resolution: 1080p / Language: German, Multilingual / Type: Movie'
		)
	})


	// TV
	it( 'TV #1 - Multiple episodes: 01-02', () =>
	{
		assert.equal(
			ReleaseParser( 'Full.Metal.Panic.Eps.01-02.INTERNAL.SVCD.DVDrip.DUBBED.DIRFIX-USAnime', 'SVCD' ).toString(),
			'Title: Full Metal Panic / Group: USAnime / Episode: 01-02 / Flags: DIRFiX, Dubbed, Internal / Source: DVDRip / Format: SVCD / Type: TV'
		)
	})

	it( 'TV #2 - Special season + episode pattern: S2.E07', () =>
	{
		assert.equal(
			ReleaseParser( '24.Twenty.Four.S2.E07.German.DVDRiP.Line.Dubbed.SVCD-SOF', 'SVCD' ).toString(),
			'Title: 24 Twenty Four / Group: SOF / Season: 2 / Episode: 7 / Flags: Line dubbed / Source: DVDRip / Format: SVCD / Language: German / Type: TV'
		)
	})

	it( 'TV #3 - Lots of numbers in title', () =>
	{
		assert.equal(
			ReleaseParser( '24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed', 'TV' ).toString(),
			'Show: 24 / Title: 9 00 Uhr bis 10 00 Uhr / Group: c0nFuSed / Season: 2 / Episode: 2 / Flags: READNFO, TV Dubbed / Source: DVDRip / Format: SVCD / Language: German, Multilingual / Type: TV'
		)
	})

	it( 'TV #4', () =>
	{
		assert.equal(
			ReleaseParser( 'Direct.Talk.S09E09.Mizutani.Yoshihiro.Relief.Beds.Made.of.Cardboard.1080p.HDTV.H264-DARKFLiX', 'tv' ).toString(),
			'Show: Direct Talk / Title: Mizutani Yoshihiro Relief Beds Made of Cardboard / Group: DARKFLiX / Season: 9 / Episode: 9 / Source: HDTV / Format: h264 / Resolution: 1080p / Type: TV'
		)
	})

	it( 'TV #5 - No episode title given', () =>
	{
		assert.equal(
			ReleaseParser( 'Dark.Net.S01E06.DOC.SUBFRENCH.720p.WEBRip.x264-TiMELiNE', 'tv' ).toString(),
			'Title: Dark Net / Group: TiMELiNE / Season: 1 / Episode: 6 / Flags: Docu, Subbed / Source: WEB / Format: x264 / Resolution: 720p / Type: TV'
		)
	})

	it( 'TV #6 - Old season + episode pattern: 2x14', () =>
	{
		assert.equal(
			ReleaseParser( 'The.X-Files.2x14.Die.Hand.Die.Verletzt.DVDRip.XviD.MultiDub-VeLVeT', 'tv' ).toString(),
			'Show: The X-Files / Title: Die Hand Die Verletzt / Group: VeLVeT / Season: 2 / Episode: 14 / Flags: Dubbed / Source: DVDRip / Format: XViD / Type: TV'
		)
	})

	it( 'TV #7 - Whole season without episode', () =>
	{
		assert.equal(
			ReleaseParser( 'Riverdale.US.S05.PROPER.FRENCH.WEB.x264-STRINGERBELL', 'tv' ).toString(),
			'Title: Riverdale US / Group: STRINGERBELL / Season: 5 / Flags: Proper / Source: WEB / Format: x264 / Language: French / Type: TV'
		)
	})

	it( 'TV #8 - Episode is 0 (needs dirfix but works)', () =>
	{
		assert.equal(
			ReleaseParser( '72.Cutest.Animals.S01E0.German.DL.Doku.1080p.WEB.x264-BiGiNT', 'tv' ).toString(),
			'Title: 72 Cutest Animals / Group: BiGiNT / Season: 1 / Episode: 0 / Flags: Docu / Source: WEB / Format: x264 / Resolution: 1080p / Language: German, Multilingual / Type: TV'
		)
	})

	it( 'TV #9 - P2P with multi Audio and no extra title', () =>
	{
		assert.equal(
			ReleaseParser( 'Gilmore.Girls.S05E01.720p.WEB-DL.AAC2.0.H.264-tK', 'tv' ).toString(),
			'Title: Gilmore Girls / Group: tK / Season: 5 / Episode: 1 / Source: WEB / Format: h264 / Resolution: 720p / Audio: AAC, 2.0 / Type: TV'
		)
	})

	it( 'TV #10 - Year before Season + Episode', () =>
	{
		assert.equal(
			ReleaseParser( 'Halo.2022.S01E06.POLISH.720p.WEB.H264-A4O', 'tv' ).toString(),
			'Title: Halo / Group: A4O / Year: 2022 / Season: 1 / Episode: 6 / Source: WEB / Format: h264 / Resolution: 720p / Language: Polish / Type: TV'
		)
	})

	it( 'TV #11 - Multiple lang in wrong format', () =>
	{
		assert.equal(
			ReleaseParser( 'New.Amsterdam.2018.2x12.14.Anni.2.Mesi.8.Giorni.ITA-ENG.1080p.WEBMux.x264-NovaRi', 'tv' ).toString(),
			'Show: New Amsterdam / Title: 14 Anni 2 Mesi 8 Giorni / Group: NovaRi / Year: 2018 / Season: 2 / Episode: 12 / Source: WEB / Format: x264 / Resolution: 1080p / Language: English, Italian / Type: TV'
		)
	})

	it( 'TV #11 - Multiple lang in wrong format', () =>
	{
		assert.equal(
			ReleaseParser( 'New.Amsterdam.2018.S02E13.In.the.Graveyard.1080p.AMZN.Webrip.x265.10bit.EAC3.5.1.JBENTTAoE', 'tv' ).toString(),
			'Show: New Amsterdam / Title: In the Graveyard / Group: NOGRP / Year: 2018 / Season: 2 / Episode: 13 / Source: Amazon / Format: x265 / Resolution: 1080p / Audio: 10BIT, EAC3, 5.1 / Type: TV'
		)
	})

	it( 'TV #12 - rls with comma', () =>
	{
		assert.equal(
			ReleaseParser( 'New.Amsterdam.2018.S02E12.14.Years,.2.Months,.8.Days.1080p.AMZN.Webrip.x265.10bit.EAC3.5.1.JBENTTAoE', 'tv' ).toString(),
			'Show: New Amsterdam / Title: 14 Years 2 Months 8 Days / Group: NOGRP / Year: 2018 / Season: 2 / Episode: 12 / Source: Amazon / Format: x265 / Resolution: 1080p / Audio: 10BIT, EAC3, 5.1 / Type: TV'
		)
	})

	it( 'TV #13 - Complete Disc instead of episode', () =>
	{
		assert.equal(
			ReleaseParser( 'Tulsa.King.S01D03.German.ML.COMPLETE.PAL.DVD9-NAiB', 'DVDR' ).toString(),
			'Title: Tulsa King / Group: NAiB / Season: 1 / Disc: 3 / Flags: Complete / Source: DVD / Format: DVDR / Resolution: PAL / Language: German, Multilingual / Type: TV'
		)
	})

	it( 'TV #14 - Episode pattern at beginning of release name', () =>
	{
		assert.equal(
			ReleaseParser( '4x4.Ule.ja.Umber.Autoga.Colombias.S01E09.EE.1080p.WEB.h264-EMX', 'PRE' ).toString(),
			'Title: 4x4 Ule ja Umber Autoga Colombias / Group: EMX / Season: 1 / Episode: 9 / Source: WEB / Format: h264 / Resolution: 1080p / Language: Estonian / Type: TV'
		)
	})

	it( 'TV #15 - Docu with episode', () =>
	{
		assert.equal(
			ReleaseParser( 'Speer.Et.Hitler.L.Architecte.Du.Diable.E03.FINAL.DOC.FRENCH.PDTV.XViD-BAWLS', 'tv-xvid' ).toString(),
			'Title: Speer Et Hitler L Architecte Du Diable / Group: BAWLS / Episode: 3 / Flags: Docu, Final / Source: PDTV / Format: XViD / Language: French / Type: TV'
		)
	})

	// TV SPorts
	it( 'TV Sports #1', () =>
	{
		assert.equal(
			ReleaseParser( 'NFL.2021.09.26.49ers.Vs.Packers.1080p.WEB.h264-SPORTSNET', 'tv' ).toString(),
			'Name: NFL / Title: 49ers Vs. Packers / Group: SPORTSNET / Year: 2021 / Date: 26.09.2021 / Source: WEB / Format: h264 / Resolution: 1080p / Type: Sports'
		)
	})

	it( 'TV Sports #2', () =>
	{
		assert.equal(
			ReleaseParser( 'Formula1.2021.Russian.Grand.Prix.Highlights.1080p.HDTV.H264-DARKSPORT', 'tv' ).toString(),
			'Name: Formula1 / Title: Russian Grand Prix Highlights / Group: DARKSPORT / Year: 2021 / Source: HDTV / Format: h264 / Resolution: 1080p / Type: Sports'
		)
	})

	it( 'TV Sports #3', () =>
	{
		assert.equal(
			ReleaseParser( 'WWE.Friday.Night.Smackdown.2021-09-10.German.HDTVRiP.x264-SPORTY', 'tv' ).toString(),
			'Name: WWE Friday Night Smackdown / Group: SPORTY / Year: 2021 / Date: 10.09.2021 / Source: HDTV / Format: x264 / Language: German / Type: Sports'
		)
	})

	it( 'TV Sports #4 - Only year and no TV source', () =>
	{
		assert.equal(
			ReleaseParser( 'Formula1.2023.Hungarian.Grand.Prix.Practice.Two.1080p.WEB.h264-VERUM', 'X264' ).toString(),
			'Name: Formula1 / Title: Hungarian Grand Prix Practice Two / Group: VERUM / Year: 2023 / Source: WEB / Format: h264 / Resolution: 1080p / Type: Sports'
		)
	})

	it( 'TV Sports #5 - False NEW flag', () =>
	{
		assert.equal(
			ReleaseParser( 'MLB.2023.08.09.New.York.Yankees.vs.Chicago.White.Sox.720p.WEB.h264-SPORTSNET', 'TV-X264' ).toString(),
			'Name: MLB / Title: New York Yankees vs. Chicago White Sox / Group: SPORTSNET / Year: 2023 / Date: 09.08.2023 / Source: WEB / Format: h264 / Resolution: 720p / Type: Sports'
		)
	})

	it( 'TV Sports #6 - DTM', () =>
	{
		assert.equal(
			ReleaseParser( 'DTM.2019.05.19.Zolder.2.Rennen.GERMAN.HDTVRiP.x264-SKYHD', 'TV-X264' ).toString(),
			'Name: DTM / Title: Zolder 2 Rennen / Group: SKYHD / Year: 2019 / Date: 19.05.2019 / Source: HDTV / Format: x264 / Language: German / Type: Sports'
		)
	})

	

	// Anime
	it( 'Anime #1', () =>
	{
		assert.equal(
			ReleaseParser( 'Bastard.Episode4.Dubbed.OAV.DVDRip.XviD-DVDiSO', 'XVID' ).toString(),
			'Title: Bastard / Group: DVDiSO / Episode: 4 / Flags: Dubbed, OVA / Source: DVDRip / Format: XViD / Type: Anime'
		)
	})

	it( 'Anime #2', () =>
	{
		assert.equal(
			ReleaseParser( 'Kurokos.Basketball.2nd.Season.NG-shuu.Specials.E06.German.Subbed.2014.ANiME.BDRiP.x264-STARS', 'anime' ).toString(),
			'Title: Kurokos Basketball 2nd Season NG-shuu Specials / Group: STARS / Year: 2014 / Episode: 6 / Flags: Anime, Subbed / Source: BDRip / Format: x264 / Language: German / Type: Anime'
		)
	})

	it( 'Anime #3', () =>
	{
		assert.equal(
			ReleaseParser( 'Pokemon.23.Der.Film.Geheimnisse.des.Dschungels.German.2020.ANiME.DL.EAC3D.1080p.BluRay.x264-STARS', 'anime' ).toString(),
			'Title: Pokemon 23 Der Film Geheimnisse des Dschungels / Group: STARS / Year: 2020 / Flags: Anime / Source: Bluray / Format: x264 / Resolution: 1080p / Audio: EAC3D / Language: German, Multilingual / Type: Anime'
		)
	})

	it( 'Anime #4 - Some rare flags and sources', () =>
	{
		assert.equal(
			ReleaseParser( 'Romance.Is.In.The.Flash.Of.The.Sword.II.EP01.FANSUBFRENCH.HENTAi.RAWRiP.XViD-Lolicon', 'subs' ).toString(),
			'Title: Romance Is In The Flash Of The Sword II / Group: Lolicon / Episode: 1 / Flags: Hentai, Subbed / Source: RAWRiP / Format: XViD / Type: Anime'
		)
	})

	it( 'Anime #5 - Extra title example', () =>
	{
		assert.equal(
			ReleaseParser( 'Spy.x.Family.E04.Elterngespraech.an.der.Eliteschule.German.2022.ANiME.DL.BDRiP.x264-STARS', 'anime' ).toString(),
			'Show: Spy x Family / Title: Elterngespraech an der Eliteschule / Group: STARS / Year: 2022 / Episode: 4 / Flags: Anime / Source: BDRip / Format: x264 / Language: German, Multilingual / Type: Anime'
		)
	})

	

	// Music
	it( 'Music #1', () =>
	{
		assert.equal(
			ReleaseParser( 'The.Dells.vs.The.Dramatics.LP-(1974)-diss', 'MP3' ).toString(),
			'Title: The Dells vs. The Dramatics LP / Group: diss / Year: 1974 / Type: Music'
		)
	})

	it( 'Music #2', () =>
	{
		assert.equal(
			ReleaseParser( 'Zenhiser.Prophet.5.FX.WAV-SONiTUS', '0day' ).toString(),
			'Title: Zenhiser Prophet 5 FX / Group: SONiTUS / Format: WAV / Type: Music'
		)
	})

	it( 'Music #3', () =>
	{
		assert.equal(
			ReleaseParser( 'Victoria_feat._Sledge-Wanna_Be_(More_Than_Your_Lover)-(DRR-20-1_CD-M)-CDM-FLAC-1998-WRE', 'mp3' ).toString(),
			'Artist: Victoria feat. Sledge / Title: Wanna Be (More Than Your Lover) / Group: WRE / Year: 1998 / Source: Maxi CD / Format: FLAC / Type: Music'
		)
	})

	it( 'Music #4 - Web single', () =>
	{
		assert.equal(
			ReleaseParser( 'Meschino_-_Romeo-SINGLE-WEB-IT-2023-UOVA', 'mp3' ).toString(),
			'Artist: Meschino / Song: Romeo / Group: UOVA / Year: 2023 / Source: Web Single / Language: Italian / Type: Music'
		)
	})

	it( 'Music #5 - Title with brackets and all lowercase', () =>
	{
		assert.equal(
			ReleaseParser( '(eiffel_65)-blue_cd_beryl-bpm', 'mp3' ).toString(),
			'Artist: (eiffel 65) / Title: blue / Group: bpm / Source: CD / Type: Music'
		)
	})

	it( 'Music #6 - More complex title', () =>
	{
		assert.equal(
			ReleaseParser( 'Velarde_x_Luque_x_Vitti_feat_Giovanna_-_Serious_Emotions_2k21_(2nd_Remixes_Pack)-(GR670)-WEB-2021-ZzZz', 'mp3' ).toString(),
			'Artist: Velarde x Luque x Vitti feat. Giovanna / Title: Serious Emotions 2k21 (2nd Remixes Pack) / Group: ZzZz / Year: 2021 / Source: WEB / Type: Music'
		)
	})

	it( 'Music #7 - More complex title', () =>
	{
		assert.equal(
			ReleaseParser( 'Metallica-the_memory_remains_2-1997-ccmp3d', 'mp3').toString(),
			'Artist: Metallica / Title: the memory remains 2 / Group: ccmp3d / Year: 1997 / Type: Music'
		)
	})

	it( 'Music #8 - Special date parsing', () =>
	{
		assert.equal(
			ReleaseParser( 'Statik-Drum_and_Bass_Classic_Mix-9th_January_2001-sour', 'mp3' ).toString(),
			'Artist: Statik / Title: Drum and Bass Classic Mix / Group: sour / Year: 2001 / Date: 09.01.2001 / Type: Music'
		)
	})

	it( 'Music #9 - Music with venue and date', () =>
	{
		assert.equal(
			ReleaseParser( 'Kraftwerk_-_Live_in_Melbourne_(Australia_29.01.2003)-2CD-Bootleg-2003-BFHMP3', 'mp3' ).toString(),
			'Artist: Kraftwerk / Title: Live in Melbourne (Australia 29 01 2003) / Group: BFHMP3 / Year: 2003 / Date: 29.01.2003 / Source: Bootleg / Type: Music'
		)
	})

	it( 'Music #10 - Dont parse source from extra title', () =>
	{
		assert.equal(
			ReleaseParser( 'Gilles_Peterson--BBC_Radio_6_Music-DVBS-08-05-2023-OMA', 'mp3' ).toString(),
			'Artist: Gilles Peterson / Title: BBC Radio 6 Music / Group: OMA / Year: 2023 / Date: 08.05.2023 / Source: DVB / Type: Music'
		)
	})

	it( 'Music #11 - Dont parse flag from extra title', () =>
	{
		assert.equal(
			ReleaseParser( 'Vicetone_-_The_World_Has_A_Heartbeat_(Incl._Extended_Mix)-(30022913)-WEB-2023-JUSTiFY_iNT', 'mp3' ).toString(),
			'Artist: Vicetone / Title: The World Has A Heartbeat (Incl. Extended Mix) / Group: JUSTiFY_iNT / Year: 2023 / Source: WEB / Type: Music'
		)
	})

	it( 'Music #12 - Dont parse source from extra title', () =>
	{
		assert.equal(
			ReleaseParser( 'Victoria_feat._Sledge-Wanna_Be_(More_Than_Your_Lover)-(DRR-20-1_CD-M)-CDM-FLAC-1998-WRE', 'mp3' ).toString(),
			'Artist: Victoria feat. Sledge / Title: Wanna Be (More Than Your Lover) / Group: WRE / Year: 1998 / Source: Maxi CD / Format: FLAC / Type: Music'
		)
	})

	it( 'Music #13 - Try to exclude catalogue stuff', () =>
	{
		assert.equal(
			ReleaseParser( 'VA-The_Collapse_Of_Future_Vol_10_Part_1-TCOF10P1-WEB-2023-WAV', 'mp3' ).toString(),
			'Artist: Various / Title: The Collapse Of Future Vol. 10 Part 1 / Group: WAV / Year: 2023 / Source: WEB / Type: Music'
		)
	})

	// EBook
	it( 'Ebook #1 - Basic with title and title extra', () =>
	{
		assert.equal(
			ReleaseParser( 'IDW.-.Witch.And.Wizard.Battle.For.Shadowland.2012.Hybrid.Comic.eBook-BitBook', 'ebook' ).toString(),
			'Author: IDW / Title: Witch And Wizard Battle For Shadowland / Group: BitBook / Year: 2012 / Flags: Comic, eBook / Format: Hybrid / Type: eBook'
		)
	})

	it( 'Ebook #2 - Newspaper with date (09.28.2021) = 28.09.2021 (reformatted)', () =>
	{
		assert.equal(
			ReleaseParser( 'La.Gazzetta.Dello.Sport.09.28.2021.iTALiAN.RETAiL.eBook-DiVER', 'ebook' ).toString(),
			'Title: La Gazzetta Dello Sport / Group: DiVER / Year: 2021 / Date: 28.09.2021 / Flags: eBook, Retail / Language: Italian / Type: eBook'
		)
	})

	it( 'Ebook #3 - Magazine with monthname and year (September 20201)', () =>
	{
		assert.equal(
			ReleaseParser( 'Scootering.September.2021.HYBRiD.MAGAZiNE.eBook-PAPERCLiPS', 'ebook' ).toString(),
			'Title: Scootering / Group: PAPERCLiPS / Year: 2021 / Date: 01.09.2021 / Flags: eBook, Magazine / Format: Hybrid / Type: eBook'
		)
	})

	it( 'Ebook #4 - Comic with title, title_extra and issue number (No.04)', () =>
	{
		assert.equal(
			ReleaseParser( 'Viper.Comics.-.Ichabod.Jones.Monster.Hunter.No.04.2012.Hybrid.Comic.eBook-BitBook', 'ebook' ).toString(),
			'Author: Viper Comics / Title: Ichabod Jones Monster Hunter / Group: BitBook / Year: 2012 / Issue: 4 / Flags: Comic, eBook / Format: Hybrid / Type: eBook'
		)
	})

	it( 'Ebook #5 - Basic magazine with issue number (No.314)', () =>
	{
		assert.equal(
			ReleaseParser( 'EDGE.No.314.2018.HYBRiD.MAGAZiNE.eBook-PAPERCLiPS', 'ebook' ).toString(),
			'Title: EDGE / Group: PAPERCLiPS / Year: 2018 / Issue: 314 / Flags: eBook, Magazine / Format: Hybrid / Type: eBook'
		)
	})

	it( 'Ebook #6 - Other version of issue number (N119)', () =>
	{
		assert.equal(
			ReleaseParser( 'Prog.N119.2021.RETAiL.MAGAZiNE.eBook-PRiNTER', 'ebook' ).toString(),
			'Title: Prog / Group: PRiNTER / Year: 2021 / Issue: 119 / Flags: eBook, Magazine, Retail / Type: eBook'
		)
	})

	it( 'Ebook #7 - Other version of issue number (German: Band)', () =>
	{
		assert.equal(
			ReleaseParser( 'Die.Enwor.Saga.Band.05.-.Das.Schwarze.Schiff.German.Ebook-Elements', 'ebook' ).toString(),
			'Author: Die Enwor Saga / Title: Das Schwarze Schiff / Group: Elements / Issue: 5 / Flags: eBook / Language: German / Type: eBook'
		)
	})

	it( 'Ebook #8 - Other version of issue number (Issue)', () =>
	{
		assert.equal(
			ReleaseParser( 'The.Amazing.Spiderman.Issue.501.January.2004.Comic.eBook-Dementia', 'ebook' ).toString(),
			'Title: The Amazing Spiderman / Group: Dementia / Year: 2004 / Date: 01.01.2004 / Issue: 501 / Flags: Comic, eBook / Type: eBook'
		)
	})

	it( 'Ebook #9 - Other version of issue number', () =>
	{
		assert.equal(
			ReleaseParser( 'Simpsons.Comics.Ausgabe.15.Januar.1998.German.Comic.eBook-HS', 'ebook' ).toString(),
			'Title: Simpsons Comics / Group: HS / Year: 1998 / Date: 01.01.1998 / Issue: 15 / Flags: Comic, eBook / Language: German / Type: eBook'
		)
	})

	it( 'Ebook #10 - title + title_extra + special date formatting (15 Januar 2004)', () =>
	{
		assert.equal(
			ReleaseParser( 'Concorde.-.Die.Traumer.15.Januar.2004.Presseheft.German.Ebook-Elements', 'ebook' ).toString(),
			'Author: Concorde / Title: Die Traumer / Group: Elements / Year: 2004 / Date: 15.01.2004 / Flags: eBook / Language: German / Type: eBook'
		)
	})

	it( 'Ebook #11 - Basic book with author and book title', () =>
	{
		assert.equal(
			ReleaseParser( 'Gerd.Postel.-.Gestaendnisse.Eines.Falschen.Doktors.German.Ebook-Elements', 'ebook' ).toString(),
			'Author: Gerd Postel / Title: Gestaendnisse Eines Falschen Doktors / Group: Elements / Flags: eBook / Language: German / Type: eBook'
		)
	})

	it( 'Ebook #12 - Issue is 0', () =>
	{
		assert.equal(
			ReleaseParser( 'IDW.-.Machete.No.0.2010.Hybrid.Comic.eBook-BitBook', 'ebook' ).toString(),
			'Author: IDW / Title: Machete / Group: BitBook / Year: 2010 / Issue: 0 / Flags: Comic, eBook / Format: Hybrid / Type: eBook'
		)
	})

	// Abook
	it( 'Abook #1 - Title + title_extra + episode number (F04)', () =>
	{
		assert.equal(
			ReleaseParser( 'Otfried_Preussler_-_Der_Hotzenplotz_Geht_Um-F04-(Audiobook)-DE-2001-S8', 'Abook' ).toString(),
			'Author: Otfried Preussler / Title: Der Hotzenplotz Geht Um / Group: S8 / Year: 2001 / Episode: 4 / Flags: ABook / Language: German / Type: ABook'
		)
	})

	it( 'Abook #2 - Simple named abook', () =>
	{
		assert.equal(
			ReleaseParser( 'York-2CD-ABOOK-DE-2001-sUppLeX', 'abook' ).toString(),
			'Title: York / Group: sUppLeX / Year: 2001 / Flags: ABook / Source: CD / Language: German / Type: ABook'
		)
	})

	it( 'Abook #3 - Other version of episode number (German: Folge 212)', () =>
	{
		assert.equal(
			ReleaseParser( 'Die_Drei_Fragezeichen--Folge_212_und_der_weisse_Leopard-AUDIOBOOK-WEB-DE-2021-OMA', 'abook' ).toString(),
			'Author: Die Drei Fragezeichen / Title: und der weisse Leopard / Group: OMA / Year: 2021 / Episode: 212 / Flags: ABook / Source: WEB / Language: German / Type: ABook'
		)
	})

	it( 'Abook #4', () =>
	{
		assert.equal(
			ReleaseParser( 'Perry_Rhodan-SE_117_Duell_Der_Erbfeinde-ABOOK-DE-MP3CD-2021-FLUiD', 'abook' ).toString(),
			'Author: Perry Rhodan / Title: Duell Der Erbfeinde / Group: FLUiD / Year: 2021 / Episode: 117 / Flags: ABook / Source: MP3 CD / Language: German / Type: ABook'
		)
	})

	it( 'Abook #5', () =>
	{
		assert.equal(
			ReleaseParser( 'Jan_Tenner_Der_Neue_Superheld-F20_Rueckkehr_Ins_Reich_Der_Azzarus-Audiobook-DE-2021-VOiCE', 'abook' ).toString(),
			'Author: Jan Tenner Der Neue Superheld / Title: Rueckkehr Ins Reich Der Azzarus / Group: VOiCE / Year: 2021 / Episode: 20 / Flags: ABook / Language: German / Type: ABook'
		)
	})

	// XXX
	it( 'XXX #1 - Website/Publisher + Date + Title', () =>
	{
		assert.equal(
			ReleaseParser( 'NaughtyAmerica.com_17.10.12.Sloan.Harper.Sean.Lawless.Dirty.Wives.Club.XXX.IMAGESET-FuGLi', 'imgset' ).toString(),
			'Publisher: NaughtyAmerica.com / Title: Sloan Harper Sean Lawless Dirty Wives Club / Group: FuGLi / Year: 2017 / Date: 12.10.2017 / Flags: Imageset, XXX / Type: XXX'
		)
	})

	it( 'XXX #2 - XXX with episode and special flags', () =>
	{
		assert.equal(
			ReleaseParser( 'Lustery.E727.Leo.And.Madly.A.Happy.Ending.For.Him.XXX.VERTICAL.HRp.MP4-WRB', 'XXX' ).toString(),
			'Publisher: Lustery / Title: Leo And Madly A Happy Ending For Him / Group: WRB / Episode: 727 / Flags: HR, Vertical, XXX / Format: MP4 / Type: XXX'
		)
	})


	// MusicVideo
	it( 'MusicVideo #1 - Recorded on a live show with special date (like normal music live recording)', () =>
	{
		assert.equal(
			ReleaseParser( 'John_Mayer-Wild_Blue_(The_Late_Show_2021-09-23)-DDC-1080p-x264-2021-SRPx', 'mvid' ).toString(),
			'Artist: John Mayer / Title: Wild Blue (The Late Show 2021-09-23) / Group: SRPx / Year: 2021 / Date: 23.09.2021 / Source: DDC / Format: x264 / Resolution: 1080p / Type: MusicVideo'
		)
	})

	it( 'MusicVideo #2 - Same as above, other date formatting', () =>
	{
		assert.equal(
			ReleaseParser( 'David_Guetta_ft_Nicki_Minaj_and_FloRida-Where_Them_Girls_At_(Americas_Got_Talent_08-31-11)-HDTV-720p-X264-2011-2LC', 'mvid' ).toString(),
			'Artist: David Guetta ft. Nicki Minaj and FloRida / Title: Where Them Girls At (Americas Got Talent 08-31-11) / Group: 2LC / Year: 2011 / Date: 31.08.2011 / Source: HDTV / Format: x264 / Resolution: 720p / Type: MusicVideo'
		)
	})

	it( 'MusicVideo #3 - Dont parse DAT as source', () =>
	{
		assert.equal(
			ReleaseParser( 'T-Pain_ft_Kehlani-I_Like_Dat_(Jimmy_Kimmel_Live_2021-06-09)-DDC-720p-x264-2021-SRPx', 'TV-HD-X264' ).toString(),
			'Artist: T / Title: Pain ft. Kehlani-I Like Dat (Jimmy Kimmel Live 2021-06-09) / Group: SRPx / Year: 2021 / Date: 09.06.2021 / Source: DDC / Format: x264 / Resolution: 720p / Type: MusicVideo'
		)
	})
})