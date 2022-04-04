import configureApp from 'configureApp.json';
import { CANCEL } from '@redux-saga/core';
import qs from 'qs';
import ConfigureAxios from './ConfigureAxios';

// type tùy theo backend trả về
interface RefreshTokenResponseData {
  data: {
    accessToken: string;
  };
}

// type tùy theo backend trả về
interface AxiosData {
  refreshToken: string;
  accessToken: string;
}

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    timeout: configureApp.timeout,
    paramsSerializer: qs.stringify,
  },
  setAccessToken() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const { store } = require('store/configureStore');
    // const {
    //   global: { auth },
    // } = store.getState() as Reducers;
    // return `Bearer ${auth.data.accessToken}`;
    return 'Bearer';
  },
  setRefreshToken() {
    return '';
  },
});

const fetchAPI = axiosConfig.create(CANCEL, () => {
  return {
    baseURL: `${configureApp.baseUrl}`,
  };
});

axiosConfig.accessToken({
  setCondition(config) {
    const isAppURL = config?.url?.search(/^http/g) === -1;
    return isAppURL;
  },
});
axiosConfig.refreshToken<RefreshTokenResponseData, AxiosData>({
  url: 'ebase/renew-token',
  setRefreshCondition(error) {
    return error.response?.status === 401 && !error.config.url?.includes('ebase/renew-token');
  },
  axiosData(refreshToken, accessToken) {
    return {
      refreshToken,
      accessToken,
    };
  },
  success() {},
  failure(error) {
    console.log(error.response);
  },
});

export default fetchAPI;
