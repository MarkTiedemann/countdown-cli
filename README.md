# countdown-cli

**Simple countdown CLI app.**

## Installation

```
npm i -g countdown-cli
```

## Quickstart

**Output formatting options:**

```sh
# Default:
λ countdown 30s
# => 00:00:30
# ...
# => 00:00:00

# Percent:
λ countdown 30s %
# => 100%
# ...
# => 0%

# Percent with more digits:
λ countdown 30s 2%
# => 100.00%
# ...
# => 0.00%
```

**Possible input formats:**

```sh
λ countdown 1h 20m 30s
# => 01:20:30

λ countdown 01:20:30
# => 01:20:30

λ countdown 20:30
# => 00:20:30

λ countdown 30
# => 00:00:30

λ countdown 1h 01:20:30
# => 02:20:30

λ countdown 30 20m
# => 00:20:30

λ countdown 62m
# => 01:02:00
```

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).