export interface ISubGoal {
    title: string,
    assigned: string,
    details: string,
    status: string,
    completed: boolean
}

export interface IGoal {
    title: string,
    author: string, 
    collaborators: string[],
    subGoals: ISubGoal[]
}

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

export interface ITrackInfo {
    title: string,
    author: string,
    subGoals: {
        completed: number,
        total: number
    }
}

export interface ITrackInfoResponse extends IAPIResponse {
    data?: ITrackInfo
}