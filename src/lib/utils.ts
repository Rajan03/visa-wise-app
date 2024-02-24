import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setLocalStorage(key: string, value: string) {
  if (isBrowser()) {
    localStorage.setItem(key, value);
  }
}

export function getLocalStorage(key: string) {
  if (isBrowser()) {
    return localStorage.getItem(key);
  }
  return null;
}

export function removeLocalStorage(key: string) {
  if (isBrowser()) {
    localStorage.removeItem(key);
  }
}

export function setSessionStorage(key: string, value: string) {
  if (isBrowser()) {
    sessionStorage.setItem(key, value);
  }
}

export function getSessionStorage(key: string) {
  if (isBrowser()) {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function removeSessionStorage(key: string) {
  if (isBrowser()) {
    sessionStorage.removeItem(key);
  }
}

export function setCookie(name: string, value: string) {
  if (isBrowser()) {
    document.cookie = `${name}=${value};path=/`;
  }
}

export function isBrowser() {
  return typeof window !== "undefined";
}
