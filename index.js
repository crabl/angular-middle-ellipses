/*
 * The MIT License
 *
 * Copyright (c) 2016 Juan Cruz Viotti. https://github.com/jviotti
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * @module angular-middle-ellipses
 */

var angular = require('angular');
var MODULE_NAME = 'angular-middle-ellipses';
var AngularMiddleEllipses = angular.module(MODULE_NAME, []);

// Exposed for testability purposes
AngularMiddleEllipses.constant('MIDDLE_ELLIPSES_CHARACTER', '…');

AngularMiddleEllipses.filter('middleEllipses', ['MIDDLE_ELLIPSES_CHARACTER', function(MIDDLE_ELLIPSES_CHARACTER) {

  /**
   * @summary Middle ellipses filter
   * @public
   * @function
   *
   * @param {String} input - input string
   * @param {Number} limit - output limit
   * @returns {String} truncated string
   *
   * @throws Will throw if `limit` < 3
   *
   * @example
   * {{ 'MyVeryLongString' | middleEllipses:5 }}
   */
  return function(input, limit) {

    // We can't provide a 100% expected result if the limit is less than 3. For example:
    //
    // If the limit == 2:
    //   Should we display the first at last character without an ellipses in the middle?
    //   Should we display just one character and an ellipses before or after?
    //   Should we display nothing at all?
    //
    // If the limit == 1:
    //   Should we display just one character?
    //   Should we display just an ellipses?
    //   Should we display nothing at all?
    //
    // Etc.
    if (limit < 3) {
      throw new Error('middleEllipses: Limit should be at least 3');
    }

    // Do nothing, the string doesn't need truncation.
    if (input.length <= limit) {
      return input;
    }

    var lengthOfTheSidesAfterTruncation = Math.floor((limit - 1) / 2);
    var finalLeftPart = input.slice(0, lengthOfTheSidesAfterTruncation);
    var finalRightPart = input.slice(input.length - lengthOfTheSidesAfterTruncation);

    return finalLeftPart + MIDDLE_ELLIPSES_CHARACTER + finalRightPart;
  };

}]);

module.exports = MODULE_NAME;
