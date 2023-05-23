// to run the code use node csrf_1.js

attacker_value = "//test.com"
const url = new URL(attacker_value, "https://test.com") // never allow user input, which is not sanitized here // to be in here
console.log(url)

// OUTPUT

// URL {
//     href: 'https://test.com/',
//     origin: 'https://test.com',
//     protocol: 'https:',
//     username: '',
//     password: '',
//     host: 'test.com',
//     hostname: 'test.com',
//     port: '',
//     pathname: '/',
//     search: '',
//     searchParams: URLSearchParams {},
//     hash: ''
//   }

