export interface ISubGoal {
    title: string,
    assigned: string,
    details: string,
    staticIndex: number,
    completed: boolean
}

export interface IGoal {
    title: string,
    author: string,
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

export interface IFullTrackData {
    title: string,
    author: string,
    subGoals: {
        title: string,
        assigned: string,
        details: string,
        completed: boolean
    }[]
        
}

export interface IFullTrackDataResponse extends IAPIResponse {
    data?: IFullTrackData
}