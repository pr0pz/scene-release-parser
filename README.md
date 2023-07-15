# __Scene Release Parser__

![Made with JavaScript](https://img.shields.io/static/v1?label&message=JavaScript&color=f0db4f&logo=javascript&logoColor=323330)
![npm package version: v1.0.3](https://img.shields.io/npm/v/release-parser?color=CC3534&logo=npm)
![Minified npm package size: 9.09 kB](https://img.shields.io/bundlephobia/minzip/release-parser?color=CC3534&logo=npm)

## __A library for parsing scene release names into simpler, reusable data.__

_Like it? I'd appreciate the support :)_

[![Follow on Twitter](https://img.shields.io/static/v1?label=Follow%20on&message=Twitter&color=1DA1F2&logo=twitter&logoColor=fff)](https://twitter.com/pr0pz)
[![Watch on Twitch](https://img.shields.io/static/v1?label=Watch%20on&message=Twitch&color=bf94ff&logo=twitch&logoColor=fff)](https://www.twitch.tv/the_propz)
[![Join on Discord](https://img.shields.io/static/v1?label=Join%20on&message=Discord&color=7289da&logo=discord&logoColor=fff)](https://discord.gg/FtuYUFC5)
[![Donate on Ko-Fi](https://img.shields.io/static/v1?label=Donate%20on&message=Ko-Fi&color=ff5f5f&logo=kofi&logoColor=fff)](https://ko-fi.com/propz)

### __Description__

This library parses scene release names and splits the data into smaller, simpler, human readable and therefore more reusable data.

The applied rules are mostly based on studying the [existing collection of Scene rules](https://scenerules.org/) and other release examples from a PreDB, since a lot of releases are not named correctly (specially older ones).

The approach was to implement an algorithm that can really parse a variety of scene releases from all decades. The main test file covers some more complex names.


### __Instructions__

I suppose you already know some JavaScript and [Node](https://nodejs.org/en/) is already installed on your computer. The next steps are:

› Install the library via npm ___OR___ download the [latest release](https://github.com/pr0pz/scene-release-parser/releases/latest);

```sh
$ npm install release-parser
```

› Import the library into your project;\
› Use the function ReleaseParser and pass the release name and (optionally) the release section (for better type parsing);\
› The function will return an object with all the successfully parsed informations.

__Example:__

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
    language: { de: 'German' },
    type: 'TV'
}
```


### __CLI__

You're also able to use the script via the command line.

› For that, you'll nee to install the script globally;
```sh
$ npm install -g release-parser
```

› Just pass the release name as first argument after calling the script with 'release-parser'.

__Example:__
```sh
$ release-parser 24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed

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
        language: { de: 'German' },
        type: 'TV'
    }
```

That's it!

### __Found any Bugs?__

If you find any bugs/errors, feel free to [post an issue](https://github.com/pr0pz/scene-release-parser/issues).

### __Similar projects and inspirations__
- [pr0pz/scene-release-parser-php](https://github.com/pr0pz/scene-release-parser-php) - Identical to this project but in PHP
- [matiassingers/scene-release](https://github.com/matiassingers/scene-release) (JavaScript)
- [thcolin/scene-release-parser-php](https://github.com/thcolin/scene-release-parser-php) (PHP)
- [majestixx/scene-release-parser-php-lib](https://github.com/majestixx/scene-release-parser-php-lib) (PHP)


### __License__

![License: MIT](https://img.shields.io/npm/l/release-parser)

_That's it!_

___Be excellent to each other. And, Party on, dudes!___