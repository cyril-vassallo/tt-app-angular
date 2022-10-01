import { NavigationItemInterface } from '../interfaces/history.interface';
import { MetaInterface } from '../../../shared/interfaces/interfaces';

export type NavigationAndMeta = {
  data: NavigationItemInterface[];
  meta: MetaInterface;
};

export type IdAndMeta = {
  data: number;
  meta: MetaInterface;
};
