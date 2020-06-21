export const isEmpty = (s: string): boolean => s.trim() === "";

export const randomInArray = (arr: Array<any>) => arr[Math.floor(Math.random() * arr.length)];

export const logOut = (vm: Vue) => {
    vm.$store.commit("logOut");
    vm.$store.commit("userData/clear");
    sessionStorage.clear();
    location.href = "/auth/login";
}

export const serverError = (messages: Record<string, string>, vm: Vue) => {
    alert(`${messages.client || "An error has occurred"}: ${messages.server || "Unknown, please retry."}`);
    if (messages.server && messages.server.includes("Login expired")) logOut(vm);
}