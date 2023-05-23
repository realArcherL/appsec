# AppSec Knowledge Base

## Index

1. [CSRF](##csrf)
2. 

## CSRF

### 1. new URL (a, b)

URL parsing with Qwik uses the new `URL(a, b)` constructor. A little-known fact about this constructor is that if an attacker controls `a` they have complete control of the finally resolved URL.

For example:

```javascript!
const url = new URL(attacker_value, "http://localhost")
```

By entering `//test.com`, we can change the origin to resolve to `http://test.com`. Check `csrf_1.js`

Source: [CSRF bypass in builderio/qwik](https://huntr.dev/bounties/204ea12e-9e5c-4166-bf0e-fd49c8836917/)

### 
