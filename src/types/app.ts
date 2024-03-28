export interface LabelValue<T = string> {
  label: string;
  value: T;
}

export interface INavLink extends LabelValue<React.ReactNode> {
  href: string;
}

export enum CallState {
  Loading = "loading",
  Error = "error",
  Success = "success",
  Idle = "idle",
}

export interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (state: boolean) => void;
}

export type NextSearchParams = { [key: string]: string | string[] | undefined }; 

export type PageProps = React.PropsWithChildren & WithParams;

export interface WithParams {
  params: {
    domain: string;
  };
}

export enum AppRoles {
  Admin = "admin",
  User = "user",
}