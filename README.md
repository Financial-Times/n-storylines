# n-storylines

```
npm install @financial-times/n-storylines
```

Containing the client- and server-side JS, SASS, and handlebars templates needed to display the storylines component.

## Run locally

1) demos - currently unavailable (see issues)

`make build run` and visit localhost:8080/demos

2) `npm link` to the stream app


## Add to an app

Node

``` javascript
const nStorylines = require('@financial-times/n-storylines');
const apiPayload = await fetch('next-storylines-api-<REGION>.herokuapp.com/concepts/<Concept ID>').then(fetchres.json);
const data = nStorylines.decorate(apiPayload); // decorates the API data with extra presentational goodies
```

Handlebars

``` handlebars
{{> n-storylines/templates/main data}} // where data is the decorated payload above
```

SASS

``` sass
@import 'n-storylines/main'
```

Clientside JS

``` javascript
const nStorylines = require('@financial-times/n-storylines');
nStorylines.init();
```
