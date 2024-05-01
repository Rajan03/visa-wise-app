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
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
}

export interface SidebarStateWithId {
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
}

export type NextSearchParams = { [key: string]: string | string[] | undefined }; 
export interface WithParams {
  params: { domain: string };
}

export enum AppRoles {
  Admin = "admin",
  User = "user",
}