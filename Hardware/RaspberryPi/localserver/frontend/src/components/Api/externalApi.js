
const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const app = feathers();
const restClient = rest('http://mbp.local:3030')
const auth = require('@feathersjs/authentication-client');


app.configure(restClient.fetch(window.fetch));
app.configure(auth({storage: window.localStorage}));

export function authenticate(googleToken){
    return app.authenticate({
        strategy: "google-token",
        access_token: googleToken
    });
}


//export default app;