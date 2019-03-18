export let environment;

if (process.env.NODE_ENV === 'development') {
    environment = {
        baseUrl: 'http://localhost:3000',
        clientUrl: 'http://localhost:3334',
    };
} else {
    environment = {
        baseUrl: '',
        clientUrl: '',
    };
}
