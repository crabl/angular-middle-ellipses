angular-middle-ellipses
=======================

> Truncate a string by showing an ellipses in the middle

[![npm version](https://badge.fury.io/js/angular-middle-ellipses.svg)](http://badge.fury.io/js/angular-middle-ellipses)
[![dependencies](https://david-dm.org/jviotti/angular-middle-ellipses.svg)](https://david-dm.org/jviotti/angular-middle-ellipses.svg)
[![Build Status](https://travis-ci.org/jviotti/angular-middle-ellipses.svg?branch=master)](https://travis-ci.org/jviotti/angular-middle-ellipses)

Installation
------------

Install `angular-middle-ellipses` by running:

```sh
$ npm install --save angular-middle-ellipses
```

Documentation
-------------

Make use of the `middleEllipses` filter in a template by passing the desired maximum amount of characters as an argument:

```js
{{ 'MyVeryLongString' | middleEllipses:9 }}
```
***
```
MyVe…ring
```

Support
-------

If you're having any problem, please [raise an issue](https://github.com/jviotti/angular-middle-ellipses/issues/new) on GitHub and I'll be happy to help.

Tests
-----

Run the test suite by doing:

```sh
$ npm test
```

Contribute
----------

- Issue Tracker: [github.com/jviotti/angular-middle-ellipses/issues](https://github.com/jviotti/angular-middle-ellipses/issues)
- Source Code: [github.com/jviotti/angular-middle-ellipses](https://github.com/jviotti/angular-middle-ellipses)

Before submitting a PR, please make sure that you include tests, and that [jshint](http://jshint.com) runs without any warning:

```sh
$ npm run lint
```

License
-------

The project is licensed under the MIT license.
