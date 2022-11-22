import { environment } from '../environments/environment';

export const constant = {
  API_URL: 'http://localhost:8080',
  API_GITHUB: 'https://api.github.com',
  NAVIGATION: '/navigation',
  TODAY: '/today',
  LAST: '/last',
  FIRST: '/first',
  ALL: '/all',
  REPOS: '/repos',
  BRANCHES: '/branches',
  LOGIN: '/login',
  USER: '/user',
  TASK: '/task',
  GITHUB: '/github',
  FILE: '/file/upload',
};

if (environment.production) {
  constant.API_URL = 'https://api-taskiteam.herokuapp.com';
}
