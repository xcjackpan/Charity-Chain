const { link } = require('@blockmason/link-sdk');

const wallet = link({
    clientId: 'btDP8g92RzLvGvwK95jYeVvasGVze0XHAB4XDfCo0Nc',
    clientSecret: 'L+o7i4GOXvwOlND+E5n3oz4Jrq4GSYHBOBCne6P7An/BA2JYEhSJWiI4j7dtKL9'
}, {
    fetch
});

export { wallet };


