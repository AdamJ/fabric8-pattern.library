[![Build Status](https://travis-ci.org/mindreeper2420/fabric8-pattern.library.svg?branch=master)](https://travis-ci.org/mindreeper2420/fabric8-pattern.library)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![GitHub version](https://badge.fury.io/gh/mindreeper2420%2Ffabric8-pattern.library.svg)](https://badge.fury.io/gh/mindreeper2420%2Ffabric8-pattern.library)

# fabric8-pattern.library
A pattern library for the [fabric8 UI](https://github.com/fabric8-ui/fabric8-ui) project.

## Installation
- `npm install`
- `gulp build`
  - this runs `gulp copy` to copy the `less` dependencies into the styles directory, `gulp less` to compile to `.less` files into `styles/css/fabric8.min.css` and `gulp dependencies` to move the other dependent files into their respective locations.

## Projects included with this module
* [PatternFly v3](https://github.com/patternfly/patternfly)
* [Bootstrap v3](https://github.com/twbs/bootstrap/tree/master)
* [Font Awesome v4](https://github.com/FortAwesome/Font-Awesome)

Each of these modules is imported into the `fabric8.less` file and included in the compiled `fabric8.min.css` file.

## Building into your project
To include fabric8-pattern.library in your project, include the following in your project:

### Using the `@import` from [{{Less}}](http://lesscss.org/features/#import-directives-feature):
  - `@import (reference) '/node_modules/fabric8-pattern.library/styles/less/fabric8.less';`
    - make sure the you are backing out to your root level so that you can reach the `fabric8.less` file in the `node_modules` directory

### Using Webpack

This is somewhat specific to the [fabric8-ui](https://github.com/fabric8-ui/fabric8-ui) project, but can be modified to fit other projects.

  - import the CSS in **vendor.browser.ts**
  ``` typescript
    import '/node_modules/fabric8-pattern.library/styles/css/patternfly.min.css';
    import '/node_modules/fabric8-pattern.library/styles/css/patternfly-additions.min.css';
    import '/node_modules/fabric8-pattern.library/styles/css/fabric8.min.css';
  ```
  - add the following to your `webpack.common.js` file:
  ``` typescript
    {
      loader: 'less-loader',
      options: {
        paths: [
          path.resolve(__dirname, "../node_modules/fabric8-pattern.library/styles/dependencies"),
          path.resolve(__dirname, "../node_modules/fabric8-pattern.library/styles/dependencies/patternfly/"),
          path.resolve(__dirname, "../node_modules/fabric8-pattern.library/styles/dependencies/patternfly/bootstrap/less"),
          path.resolve(__dirname, "../node_modules/fabric8-pattern.library/styles/dependencies/patternfly/font-awesome/less"),
        ],
        sourceMap: true
      }
    }
  ```
  - This sets the paths so that the `.less` imports will resolve properly.

### Directly in HTML

Include the following files to build the pre-compiled fabric8-pattern.library CSS
``` html
  <head>
    <link href="node_modules/fabric8-pattern.library/styles/css/patternfly.min.css" rel="stylesheet">
    <link href="node_modules/fabric8-pattern.library/styles/css/patternfly-additions.min.css" rel="stylesheet">
    <link href="node_modules/fabric8-pattern.library/styles/css/fabric8.min.css" rel="stylesheet">
  </head>
```

### Using Gulp (WIP)

If you want to compile everything from the `.less` files, add the following compilation task to your `gulpfile.js`
``` less
gulp.task('less', function () {
  gulp.src('styles/less/fabric8.less')
    .pipe(plumber())
    .pipe(less({
        paths: [ path.join('node_modules'),
                 path.join('styles/dependencies/patternfly/'),
                 path.join('styles/dependencies/patternfly/bootstrap/less'),
                 path.join('styles/dependencies/patternfly/font-awesome/less')],
    }))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('styles/css'))
});
```
  - You will need the following dependencies installed:
    - [gulp-less](https://www.npmjs.com/package/gulp-less)
    - [gulp-csso](https://www.npmjs.com/package/gulp-csso)
    - [gulp-rename](https://www.npmjs.com/package/gulp-rename)
    - [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)

## Question?
If you have any questions or issues with this module, please file and issue on our [GitHub page](https://github.com/mindreeper2420/fabric8-pattern.library/issues).
