# AppSec Knowledge Base

## Index

1. [CSRF](##CSRF)
2. [Authentication & Authorization issues](##Auth)
3. [SSTI](##SSTI)


[CheckList](##CheckList)

## CSRF

### 1. new URL (a, b) (JavaScript)

URL parsing with Qwik uses the new `URL(a, b)` constructor. A little-known fact about this constructor is that if an attacker controls `a` they have complete control of the finally resolved URL.

For example:

```javascript!
const url = new URL(attacker_value, "http://localhost")
```

By entering `//test.com`, we can change the origin to resolve to `http://test.com`. Check `csrf_1.js`

Source: [CSRF bypass in builderio/qwik](https://huntr.dev/bounties/204ea12e-9e5c-4166-bf0e-fd49c8836917/)

[GitHub Search Regex](https://github.com/search?q=%2Fnew%5Cs%2BURL%5Cs*%5C%28%5Cs*%5Cb%5Ba-zA-Z_%24%5D%5B0-9a-zA-Z_%24%5D*%5Cb%5Cs*%2C%5Cs*%5Cb%5Ba-zA-Z_%24%5D%5B0-9a-zA-Z_%24%5D*%5Cb%5Cs*%5C%29%2F&type=code)


## Auth

### 1. Missing verification on JWT token

```java!
async cognito({ query }) {
    // get the id_token
    const idToken = query.id_token;
    // decode the jwt token
    const tokenPayload = jwt.decode(idToken);
    if (!tokenPayload) {
      throw new Error('unable to decode jwt token');
    } else {
      return {
        username: tokenPayload['cognito:username'],
        email: tokenPayload.email,
      };
    }
  },
```

The developers tried to fix the issue but introducing `iss` check, which can be bypassed.

> The developer tried to fix the vulnerability by using the iss claim within the JWT to get the URL location to download the public key. However, the iss claim was never verified before being used to download the JWKS file. Therefore, an attacker can modify this claim so the server sends a request to an attacker-controlled server instead. This type of vulnerability is known as a Server-Side Request Forgery (SSRF), and in this use case can be exploited trick the Strapi server verify a forged JWT token using a JWKS from the attacker's website. 

The code missed out on the `jwt.verify`

Source: [Strapi Open Source issues](https://www.ghostccamm.com/blog/multi_strapi_vulns/)

## SSTI

### 1. Check for templates if they are using templates
This is usually easy to find with emails, or custom text being rendered with user input (like MarkDown). Make sure they are safe and are not using incorrect regexes, look for regex bypasses. Best to use **Logic-less Template Engines**

Source: [Strapi Open Source issues](https://www.ghostccamm.com/blog/multi_strapi_vulns/)

---

## CheckList

- [ ] Check for Authentication and Authorization codes first
- [ ] Do they have a mailing or any templates based features, hit for SSTI or injections
    - Logic-less Template Engines can be used instead of using the ones like Lodash, or the ones which can execute code. Source: [Strapi Open Source issues](https://www.ghostccamm.com/blog/multi_strapi_vulns/)
- [ ] IDOR exists with unpredictable ID and if its part of the `POST` where it won't be leaked (very difficult) with (wayback, urlscan, indexing from Google etc) accepting the report with low severity is a good idea. [Source](https://rez0.blog/hacking/cybersecurity/2022/08/18/unpredictable-idors.html). Not true with session tokens or UUID's (unless UUID v1) ex: AWS links, which are unpredictable. [Reference headers can also be used to leak them, they are a bug, but severity can be calculated based on that].


### Lodash
1. `lodash` template engine can evaluate JS code on the server. [source](https://www.ghostccamm.com/blog/multi_strapi_vulns/)