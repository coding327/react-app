export interface spanTypes {
  left: string;
  top: string;
  transform: string;
  animationDelay: string;
  background: string;
}

export type nameTypes = string | number | boolean;
export type numTypes = string | number | undefined;

export interface userState {
  username?: string;
  password?: string;
  phone?: string;
  dbpass?: string;
  avatar?: string;
  role?: string;
  nickname?: string;
  age?: string;
  captcha?: string;
}
