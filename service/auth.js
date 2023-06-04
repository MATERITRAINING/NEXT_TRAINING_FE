import client from "./axios";


export async function login(payload){
    return client.post("/login", payload)
}

export async function googleLogin(payload){
    return client.post("/google-login", payload)
}