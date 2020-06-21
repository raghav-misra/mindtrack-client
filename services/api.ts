const ENDPOINT = "http://localhost:8080/api";

import * as Types from "@/app";

export async function API_login({ username, password }: Record<string, string>): Promise<Types.IAuthResponse> {
    const rawResponse = await fetch(`${ENDPOINT}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" }
    });

    const response = await rawResponse.json();
    return response;
}

export async function API_signup({ username, password, name }: Record<string, any>): Promise<Types.IAuthResponse> {
    const rawResponse = await fetch(`${ENDPOINT}/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name })
    });

    const response = await rawResponse.json();
    return response;
}

export async function API_getUserData(token: string): Promise<Types.IUserDataResponse> {
    const rawResponse = await fetch(`${ENDPOINT}/getUser`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST"
    });

    const response = await rawResponse.json();
    return response;
}

export async function API_getTrackInfo(trackID: string, token: string): Promise<Types.ITrackInfoResponse> {
    const rawResponse = await fetch(`${ENDPOINT}/getTrackInfo`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({ trackID })
    });
    const response = await rawResponse.json();
    return response;
}

export async function API_getFullTrackData(trackID: string, token: string): Promise<Types.IFullTrackDataResponse> {
    const rawResponse = await fetch(`${ENDPOINT}/getAllTrackInfo`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({ trackID })
    });
    const response = await rawResponse.json();
    return response;
}