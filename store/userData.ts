import { API_getUserData } from "@/services/api";

export const state = () => ({
        _dataLoaded: false,
        username: "",
        fullName: "",
        userTracks: [],
        collabTracks: []
});

export const mutations = {
    setValue: (s: Record<string, any>, [name, value]: [string, any]) => s[name] = value,
    clear: (s: Record<string, any>) => {
        s.username = "";
        s.fullName = "";
        s.userTracks = [];
        s.collabTracks = [];
    }
};

export const actions = {
    sync: async ({ commit }: Record<string, Function>, token: string) => {
        const response = await API_getUserData(token);
        if (!response.success) alert(`An error occurred: ${response.error || "Unknown, please try again."}`);
        Object.keys(response.data as object).forEach(k => {
            commit("setValue", [k, (response.data as Record<string, any>)[k]]);
        });
        commit("setValue", ["_dataLoaded", true]);
    }
}