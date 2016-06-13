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

var m = require('mochainon');
var angular = require('angular');
var jsv = require('jsverify');
require('angular-mocks');

var JSVERIFY_DEFAULT_OPTIONS = {
  tests: 1000000
};

describe('AngularMiddleEllipses', function() {

  this.timeout(false);

  beforeEach(angular.mock.module(
    require('./index')
  ));

  var middleEllipsesFilter;
  var MIDDLE_ELLIPSES_CHARACTER;

  beforeEach(angular.mock.inject(function(_middleEllipsesFilter_, _MIDDLE_ELLIPSES_CHARACTER_) {
    middleEllipsesFilter = _middleEllipsesFilter_;
    MIDDLE_ELLIPSES_CHARACTER = _MIDDLE_ELLIPSES_CHARACTER_;
  }));

  it('should throw if limit < 3', function() {
    m.chai.expect(function() {
      middleEllipsesFilter('xxxxx', 0);
    }).to.throw('middleEllipses: Limit should be at least 3');
  });

  describe('given the input length is greater than the limit', function() {

    it('should truncate: (input: odd, limit: odd)', function() {
      m.chai.expect(middleEllipsesFilter('xxxxx', 3)).to.equal('x' + MIDDLE_ELLIPSES_CHARACTER + 'x');
    });

    it('should truncate: (input: odd, limit: even)', function() {
      m.chai.expect(middleEllipsesFilter('xxxxxxxx', 6)).to.equal('xx' + MIDDLE_ELLIPSES_CHARACTER + 'xx');
    });

    it('should truncate: (input: even, limit: odd)', function() {
      m.chai.expect(middleEllipsesFilter('xxxxxx', 5)).to.equal('xx' + MIDDLE_ELLIPSES_CHARACTER + 'xx');
    });

    it('should truncate: (input: even, limit: even)', function() {
      m.chai.expect(middleEllipsesFilter('xxxxxx', 4)).to.equal('x' + MIDDLE_ELLIPSES_CHARACTER + 'x');
    });

  });

  it('should never return an output length that exceeds the limit', function() {
    jsv.assert(jsv.forall(jsv.record({
      input: jsv.string,
      limit: jsv.integer(3, 100)
    }), function(data) {
      return middleEllipsesFilter(data.input, data.limit).length <= data.limit;
    }), JSVERIFY_DEFAULT_OPTIONS);
  });

  it('should return the same input string if the limit is equal or greater than the input length', function() {
    jsv.assert(jsv.forall(jsv.record({
      input: jsv.string,
      limit: jsv.integer(3, 100)
    }), function(data) {
      if (data.input.length > data.limit) {
        return true;
      }

      return middleEllipsesFilter(data.input, data.limit) === data.input;
    }), JSVERIFY_DEFAULT_OPTIONS);
  });

  it('should put the ellipses exactly in the middle of the string', function() {
    jsv.assert(jsv.forall(jsv.record({
      input: jsv.string,
      limit: jsv.integer(3, 100)
    }), function(data) {
      if (data.input.length <= data.limit) {
        return true;
      }

      var parts = middleEllipsesFilter(data.input, data.limit).split(MIDDLE_ELLIPSES_CHARACTER);
      return parts[0].length === parts[1].length;
    }), JSVERIFY_DEFAULT_OPTIONS);
  });

});
