export interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (state: boolean) => void;
}

export type NextSearchParams = { [key: string]: string | string[] | undefined }; 
export interface WithParams {
  params: { domain: string };
}

export enum AppRoles {
  Admin = "admin",
  User = "user",
}