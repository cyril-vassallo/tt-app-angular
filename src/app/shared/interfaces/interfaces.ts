import { ChartType, ChartOptions } from 'chart.js';

export interface UserInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  job?: string;
  photo?: string;
  description?: string;
}

export interface MetaInterface {
  urn: string;
  uri: string;
}

export interface GithubInterface {
  id?: string;
  user?: string;
  owner: string;
  repository: string;
  branch: string;
  enabled: boolean;
  token: string;
}

export interface ErrorInterface {
  status: number;
  message?: string;
}

export interface TaskInterface {
  id?: string;
  user: string;
  date: string;
  list?: string[];
  commits?: CommitInterface[];
}

export interface CommitInterface {
  url: string | null | undefined;
  hash: string | null | undefined;
}

export interface ChartInterface {
  id: string;
  title: string;
  type: ChartType;
  labels: string[];
  datasets: any;
  options: ChartOptions;
}

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
