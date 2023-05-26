# inner-svg

Inject svg into your html with only one attribute or with javascript

## Update

[See the Changelog](./CHANGELOG.md)

## Installation

### Node

```
$ npm i inner-svg-ts
```

And then

```js
const innerSVG = require("inner-svg-ts");
import innerSVG from "inner-svg-ts";

//or if you want only to work with attributes for react, angular, vuejs ...
import "inner-svg-ts";
```

### CDN

```html
<script src="https://unpkg.com/inner-svg-ts@1.0.0/dist/inner-svg.js"></script>
```

## Demo

[Live demo on the github page](https://yoannchb-pro.github.io/inner-svg/index.html)

## How to use ?

### With attribute

> NOTE: You can modify as you want the attribute, the svg will automatically update. innerSVG also detect when a new element is write into the page or removed from the page.

The path can be relative or absolut for example `./assets/discord.svg` and `/static/discord.svg` will both work

```html
<i
  id="originalElement"
  class="fill-red-500"
  data-i-svg="./assets/discord.svg"
></i>
```

Will inject the svg into the current page with all the attributes derived from the original element (The id is not transfered to the svg)

```html
<svg class="fill-red-500">...</svg>
```

### In javascript

#### Init

```js
const injection = innerSVG(
  document.querySelector("#element"),
  "./assets/discord.svg"
);
```

#### Getters

- injection.element
- injection.svg
- injection.path

#### Methods

Update the path of the svg

```js
injection.updatePath("./assets/hearth.svg");
```

Remove the svg

```js
injection.desctruct();
```
