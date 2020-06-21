export const state = () => ({
    isLoggedIn: sessionStorage.getItem("token") !== null,
});

export const mutations = {
    logIn: (s: Record<string, any>) => s.isLoggedIn = true,
    logOut: (s: Record<string, any>) => s.isLoggedIn = false,
    setValue: (s: Record<string, any>, [name, value]: [string, any]) => s[name] = value,
};