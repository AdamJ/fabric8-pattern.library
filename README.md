[![Build Status](https://travis-ci.org/mindreeper2420/fabric8-pattern.library.svg?branch=master)](https://travis-ci.org/mindreeper2420/fabric8-pattern.library)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![GitHub version](https://badge.fury.io/gh/mindreeper2420%2Ffabric8-pattern.library.svg)](https://badge.fury.io/gh/mindreeper2420%2Ffabric8-pattern.library)

# fabric8-pattern.library
A pattern library for the fabric8 project.

## Installation
- `npm install`
- `gulp`
  - this runs `gulp copy` to copy the dependencies into the styles directory and `gulp less` to compile to `.less` files into `styles/css/fabric8.min.css`

## Projects included with this module
* [PatternFly v3](https://github.com/patternfly/patternfly)
* [Bootstrap v3](https://github.com/twbs/bootstrap/tree/master)
* [Font Awesome v4](https://github.com/FortAwesome/Font-Awesome)

## Module Structure
```
styles/
  css/
    fabric8.css
  dependencies/
    patternfly/
      bootstrap/
        less/
          bootstrap.less
      font-awesome/
        less/
          font-awesome.less
      patternfly.less
  less/
    partials/
      _animations.less
      _backgrounds.less
      _cards.less
      _experimental.less
      _forms.less
      _formulas.less
      _icons.less
      _layout.less
      _mixins.less
      _overrides.less
      _typography.less
      _utilities.less
      _variables.less
    fabric8.less
```

