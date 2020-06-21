const ENDPOINT = "http://localhost:8080/api";

export interface IAPIResponse {
    success: boolean,
    error?: string,
}

export interface IAuthResponse extends IAPIResponse {
    token?: string
}

export interface IUserDataResponse extends IAPIResponse {
    data?: {
        username: string,
        fullName: string,
        userTracks: string[],
        collabTracks: string[]
    }
}

export interface ITrackInfoResponse extends IAPIResponse {
    data?: {
        title: string,
        author: string,
        subGoals: {
            completed: number,
            total: number
        }
    }
}

export async function API_login({ username, password }: Record<string, string>): Promise<IAuthResponse> {
    const rawResponse = await fetch(`${ENDPOINT}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" }
    });

    const response = await rawResponse.json();
    return response;
}

export async function API_signup({ username, password, name }: Record<string, any>): Promise<IAuthResponse> {
    const rawResponse = await fetch(`${ENDPOINT}/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name })
    });

    const response = await rawResponse.json();
    return response;
}

export async function API_getUserData(token: string): Promise<IUserDataResponse> {
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

export async function API_getTrackInfo(trackID: string, token: string): Promise<ITrackInfoResponse> {
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