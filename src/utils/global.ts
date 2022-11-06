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

export function alertApprove({
  key,
  callback,
}: {
  key: string;
  callback?: any;
}): any {
  Swal.fire({
    title: `Approve ${key}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Approve",
  }).then((result) => {
    if (result.isConfirmed) {
      // callback();
      Swal.fire(`${key} isApproved`);
      return true;
    }
    return false;
  });
}
