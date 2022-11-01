import { User } from "../types/global";

declare global {
  interface Window {
    href: any;
  }
}

export const pages = {
  welcome: "/",
  login: "/login",
  loginSuccess: "/",
  register: "/register",
  registerSuccess: "/",
  docList: "/doclist",
  logout: "/logout",
};

export const regex = {
  email:
    // eslint-disable-next-line
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};

export const server = {
  api: "http://localhost:3001",
  app: "http://localhost:3000",
};

/**
 * Get value by cookie name
 */
export function getCookie(name: string): string {
  const value: string = `; ${document.cookie}`;
  const parts: string[] = value?.split(`; ${name}=`);

  if (parts.length === 2) return parts?.pop()?.split(";").shift() || "";
  return "";
}

/**
 * Logout - removes session user id
 */
export function logout(): void {
  document.cookie = `token=;`;
  window.href = pages.logout;
}

/**
 * Get user object from localStorage by user ID
 */
export function getUserObjectbyId(id: number, usersArray: object[]): object {
  const userObject: User =
    usersArray.find((user: User) => user.id === id) || {};

  return userObject;
}
