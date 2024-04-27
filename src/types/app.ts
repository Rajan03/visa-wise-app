export interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (state: boolean) => void;
}

export interface MenuState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (state: boolean) => void;
}

export interface MenuStateWithId {
  isOpen: string[];
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string, state: boolean) => void;
}


export type NextSearchParams = { [key: string]: string | string[] | undefined }; 
export interface WithParams {
  params: { domain: string };
}

export enum AppRoles {
  Admin = "admin",
  User = "user",
}