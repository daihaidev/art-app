/* eslint-disable prettier/prettier */
import axios from 'axios';

const accessKey = 'accessToken';
const profile = 'userProfile';
const userRole = 'role';
const userProfileImage = 'profileImage';
const userTitleImage = 'titleImage';
const uId = 'userId';


const environments = [
  {
    name: 'development',
    env: '',
    apiHost: process.env.API_HOST,
  },
  {
    name: 'qa',
    env: '',
    apiHost: '',
  },
  {
    name: 'prod',
    env: '',
    apiHost: process.env.API_HOST,
  },
];

const getApiHost = () => {
  const currentEnvironment = environments.find(
    environment => window.location.origin === environment.env,
  );
  return currentEnvironment
    ? currentEnvironment.apiHost
    : environments[0].apiHost;
};

export const apiHost = getApiHost();
export const configPrivateGet = () => ({
  headers: {
    'Authorization': `${localStorage.getItem(accessKey)}`,
  },
});
export const configPrivatePost = () => ({
  config : {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      const percent = Math.floor((loaded * 100) / total);
      console.log("p: ---",percent);
    }
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `${localStorage.getItem(accessKey)}`,
  },
});
export const configPublicPost = () => ({
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
});

const axiosInterceptor = () => {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 403) {
        localStorage.clear();
        window.location.pathname = '/login';
      } else {
        throw error;
      }
    },
  );
};
const request = {
  setToken: token => {
    localStorage.setItem(accessKey, token);
  },
  setId: id => {
    localStorage.setItem(uId, id);
  },
  setRole: role => {
    localStorage.setItem(userRole, role);
  },
  setProfileImage: profileImage => {
    localStorage.setItem(userProfileImage, profileImage);
  },
  setTitleImage: titleImage => {
    localStorage.setItem(userTitleImage, titleImage);
  },
  setProfile: value => {
    localStorage.setItem(profile, JSON.stringify(value));
  },
  getToken: () => localStorage.getItem(accessKey),
  getProfileImage: () => localStorage.getItem(userProfileImage),
  getRole: () => localStorage.getItem(userRole),
  getProfile: () => JSON.parse(localStorage.getItem(profile)),
  getPublic: url => {
    axiosInterceptor();
    return axios.get(`${apiHost}${url}`);
  },
  getPrivate: url => {
    axiosInterceptor();
    return axios.get(`${apiHost}${url}`, configPrivateGet());
  },
  postPublic: (url, body) => {
    axiosInterceptor();
    return axios.post(`${apiHost}${url}`, body, configPublicPost());
  },
  postPrivate: (url, body) => {
    axiosInterceptor();
    return axios.post(`${apiHost}${url}`, body, configPrivatePost());
  },
  put: (url, body) => {
    axiosInterceptor();
    return axios.put(`${apiHost}${url}`, body, configPrivatePost());
  },
};

export default request;
