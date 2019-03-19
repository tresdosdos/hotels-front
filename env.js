export let environment;

if (process.env.NODE_ENV === 'development') {
    environment = {
        baseUrl: 'http://localhost:2000',
        clientUrl: 'http://localhost:3000',
    };
} else {
    environment = {
        baseUrl: '',
        clientUrl: '',
    };
}
