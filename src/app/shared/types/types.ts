import {
  MetaInterface,
  UserInterface,
  GithubInterface,
  TaskInterface,
  NavigationItemInterface,
} from '../interfaces/interfaces';


export type UsersAndMeta = {
  data: UserInterface[];
  meta: MetaInterface;
};

export type UserAndMeta = {
  data: UserInterface;
  meta: MetaInterface;
};

export type GithubAndMeta = {
  data: GithubInterface;
  meta: MetaInterface;
};

export type TasksAndMeta = {
  data: TaskInterface[];
  meta: MetaInterface;
};

export type TaskAndMeta = {
  data: TaskInterface;
  meta: MetaInterface;
};

export type NavigationAndMeta = {
  data: NavigationItemInterface[];
  meta: MetaInterface;
};

export type IdAndMeta = {
  data: number;
  meta: MetaInterface;
};
