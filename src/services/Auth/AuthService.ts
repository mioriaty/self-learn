import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/fetchAPI';

class AuthService {
  async login({ password, username }: { username: string; password: string }) {
    const response: AxiosResponse<any> = await fetchAPI.request({
      url: 'login',
      method: 'POST',
      data: {
        password,
        username,
      },
    });

    return response.data;
  }

  async logout() {}

  async register({ password, email, username }: { username: string; email: string; password: string }) {
    const response: AxiosResponse<any> = await fetchAPI.request({
      url: 'register',
      method: 'POST',
      data: {
        password,
        username,
        email,
      },
    });

    return response.data;
  }
}

export default new AuthService();
