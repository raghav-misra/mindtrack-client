export const isEmpty = (s: string): boolean => s.trim() === "";

export const randomInArrat = (arr: Array<any>) => arr[Math.floor(Math.random() * arr.length)];