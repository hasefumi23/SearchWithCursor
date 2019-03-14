# :arrow_upper_left: Search with cursor

[![Build Status](https://dev.azure.com/hasefumi23/search-in-browser/_apis/build/status/hasefumi23.SearchInBrowser?branchName=master)](https://dev.azure.com/hasefumi23/search-in-browser/_build/latest?definitionId=1&branchName=master)

This extension can easily search with cursor.

## :wrench: Feature

This extension is very simple. The behavior is depends on the line on which cursor.
There are three behaviors.

- Search with selected text.
- Search with text of the line on which cursor.
- In the case the empty line, just open the browser([Google](<https://www.google.com/>)).

If text starts valid URL(starts with "http(s)://"), open website directly, otherwise `https://www.google.com/search?q=${text}`.

### Available command

Available Command is only **search with cursor**.

#### Shortcut

| Windows | Mac |
|---|---|
| Shift + alt + s | Shift + option + s (Mac) |

![feature](images/feature.gif)

## :memo: Release Notes

### 0.1.0

Initial release.

## License

[MIT](https://github.com/davidhouchin/whitespace-plus/blob/master/LICENSE)
