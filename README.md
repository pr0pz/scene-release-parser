# scene-release-parser 
> A tool for parsing scene release names.

The applied rules are based on
- Collection of scene rulesets: https://scenerules.org/
- Very brief Wikipedia description of scene naming schemes: http://en.wikipedia.org/wiki/Standard_(warez)#Naming
- But mostly studying release examples from a predb, since a lot of releases are not named right (specially older ones):
  - [PreDB.de](https://predb.de/)

## Install

```sh
$ npm install --save scene-release-parser
```


## Usage

```js
var sceneRelease = require('scene-release-parser');

new sceneRelease('24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed')
// => {
// 	"title": "24",
// 	"titleExtra": "9 00 Uhr bis 10 00 Uhr",
// 	"group": "c0nFuSed",
// 	"year": null,
// 	"date": null,
// 	"season": 2,
// 	"episode": 2,
// 	"flags": [ "READNFO", "TV Dubbed" ],
// 	"source": "DVDRip",
// 	"format": "SVCD",
// 	...
// }
```


## CLI

```sh
$ npm install --global scene-release-parser
```

```sh
$ scene-release-parser -h

  A tool for parsing scene release names.

  Example:
    scene-release 24.S02E02.9.00.Uhr.bis.10.00.Uhr.German.DL.TV.Dubbed.DVDRip.SVCD.READ.NFO-c0nFuSed

    => {
        "title": "24",
        "titleExtra": "9 00 Uhr bis 10 00 Uhr",
        "group": "c0nFuSed",
        "year": null,
        "date": null,
        "season": 2,
        "episode": 2,
        "flags": [ "READNFO", "TV Dubbed" ],
        "source": "DVDRip",
        "format": "SVCD",
        ...
    }
```

## Similar projects and inspirations
- [matiassingers/scene-release](https://github.com/matiassingers/scene-release) (JavaScript)
- [thcolin/scene-release-parser-php](https://github.com/thcolin/scene-release-parser-php) (PHP)
- [majestixx/scene-release-parser-php-lib](https://github.com/majestixx/scene-release-parser-php-lib) (PHP)


## License

scene-release-parser is licensed under the MIT License (MIT).