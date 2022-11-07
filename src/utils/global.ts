import Cookies from "js-cookie";
import Swal from "sweetalert2";

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
  const token = Cookies.get(name) ?? "";
  return token;
}

/**
 * Logout - removes session user id
 */
export function logout(): void {
  document.cookie = `token=;`;
  window.href = pages.logout;
}

export function alertSuccess(message: string): void {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    customClass: "swal-wide",
    timer: 1500,
  });
}

export function alertError(message: string): void {
  Swal.fire({
    icon: "error",
    title: message,
    showConfirmButton: false,
    customClass: "swal-wide",
    timer: 1500,
  });
}

export function alertWarning(message: string): void {
  Swal.fire({
    icon: "warning",
    title: message,
    showConfirmButton: false,
    customClass: "swal-wide",
    timer: 1500,
  });
}
