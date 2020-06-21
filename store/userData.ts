import { API_getUserData } from "@/services/api";
import { logOut, serverError } from "@/services/utils";

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
    sync: async ({ commit }: Record<string, any>, vm: Vue) => {
        if (!vm.$store.state.userData._dataLoaded && sessionStorage.getItem("token")) {
            const response = await API_getUserData(sessionStorage.getItem("token") as string);
            if (!response.success) {
                serverError({
                    server: response.error as string
                }, vm);
                if ((response.error as string).includes("Login expired")) {
                    logOut(vm);
                }
            }
            else {
                Object.keys(response.data as object).forEach(k => {
                    commit("setValue", [k, (response.data as Record<string, any>)[k]]);
                });
                commit("setValue", ["_dataLoaded", true]);
            }
        }
    }
}