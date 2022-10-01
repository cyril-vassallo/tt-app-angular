export interface NavigationItemInterface {
  id: number;
  label: string;
  title: string;
  path: string;
  isActive: boolean;
  componentId: string;
}

export interface SignUpFormInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginFormInterface {
  email: string;
  password: string;
}
