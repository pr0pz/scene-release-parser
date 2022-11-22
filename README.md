# Scene Release Parser
## A tool for parsing scene release names.

The applied rules are mostly based on studying the [existing collection of Scene rules](https://scenerules.org/) and other release examples from a [PreDB](https://predb.de/), since a lot of releases are not named correctly (specially older ones).

The approach was to implement an algorithm that can really parse a variety of scene releases from all decades. The main test file covers some more complex names.


## Install

```sh
$ npm install release-parser
```


## Usage

```js
import ReleaseParser from 'release-parser'

const release = ReleaseParser( '24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed', 'tv' )

=> {
    release: '24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed',
    title: '24',
    titleExtra: '9 00 Uhr bis 10 00 Uhr',
    group: 'c0nFuSed',
    year: null,
    date: null,
    season: 2,
    episode: 2,
    flags: [ 'READNFO', 'TV Dubbed' ],
    source: 'DVDRip',
    format: 'SVCD',
    resolution: null,
    audio: null,
    device: null,
    os: null,
    version: null,
    language: { de: 'German', multi: 'Multilingual' },
    type: 'TV'
}
```


## CLI

```sh
$ npm install -g release-parser
```

```sh
$ release-parser -h

  A tool for parsing scene release names.

  Example:
    release-parser 24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed

    => {
        release: '24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed',
        title: '24',
        titleExtra: '9 00 Uhr bis 10 00 Uhr',
        group: 'c0nFuSed',
        year: null,
        date: null,
        season: 2,
        episode: 2,
        flags: [ 'READNFO', 'TV Dubbed' ],
        source: 'DVDRip',
        format: 'SVCD',
        resolution: null,
        audio: null,
        device: null,
        os: null,
        version: null,
        language: { de: 'German', multi: 'Multilingual' },
        type: 'TV'
    }
```

## Similar projects and inspirations
- [matiassingers/scene-release](https://github.com/matiassingers/scene-release) (JavaScript)
- [thcolin/scene-release-parser-php](https://github.com/thcolin/scene-release-parser-php) (PHP)
- [majestixx/scene-release-parser-php-lib](https://github.com/majestixx/scene-release-parser-php-lib) (PHP)


## License

release-parser is licensed under the MIT License (MIT).