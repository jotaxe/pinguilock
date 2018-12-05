import { AsyncStorage } from "react-native";

const url = "https://www.pinguilock.tk";


export function authenticate(googleToken){
    return Promise.resolve(
        fetch(`${url}/authentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                strategy: 'google-token',
                accessToken: googleToken
            })
        })
    );
}

export function fetchUserOTP(userGoogleId){
    return client.service("otp").find({
        query: {
            googleId: userGoogleId
        }
    });
}

export function fetchUserKeys(userGoogleId){
    return client.service("keys").find({
        query: {
            googleId: userGoogleId
        }
    });
}

