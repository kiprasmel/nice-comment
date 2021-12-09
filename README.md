# nice-comment

[![test](https://github.com/kiprasmel/nice-comment/actions/workflows/test.yml/badge.svg)](https://github.com/kiprasmel/nice-comment/actions/workflows/test.yml)

create a nice comment.

whenever you feel like using interpolation in template literals (<code>`foo ${bar + 1} baz`</code>),
<br>
you could use [./nice-comment.ts](./nice-comment.ts) instead.

## utils

- `joinWithDeep`, combines the following:
  - `joinWith`
  - `ifDeepArrayThenFlattenWith`

- `quote`
- `tick`
- `quoteTick`
- `tickQuote`
- `bracket`
- `parens`
- `array`
- `bullets`

a few pre-combined utils that now you'd create with `joinWithDeep` (kept for backwards compatibility):
- `toSentence` (equiv. to `joinWithDeep("")`)
- `toParagraph` (equiv. to `joinWithDeep(" ", "")`)
- `toComment` (equiv. to `joinWithDeep("\n\n", " ", "")`)

## License

[MIT](./LICENSE)
