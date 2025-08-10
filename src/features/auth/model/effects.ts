import { createEffect } from 'effector';
import api from '../../../shared/api/api';
import { setTokens, clearTokens, getRefreshToken } from '../../../shared/lib/token';

export const loginFx = createEffect(async (credentials: { email: string; password: string }) => {
  const { data } = await api.post('/auth/login', credentials);
  // backend returns { user, tokens }
  setTokens(data.tokens);
  return data;
});

export const registerFx = createEffect(async (payload: { email: string; password: string; name?: string }) => {
  const { data } = await api.post('/auth/register', payload);
  setTokens(data.tokens);
  return data;
});

export const meFx = createEffect(async () => {
  const { data } = await api.get('/auth/me');
  return data; // user
});

export const refreshTokenFx = createEffect(async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');
  const { data } = await api.post('/auth/refresh', { refreshToken });
  // data: { accessToken, refreshToken }
  setTokens(data);
  return data;
});

export const logoutFx = createEffect(async () => {
  try {
    await api.post('/auth/logout');
  } catch (e) {
    // ignore network errors
  }
  clearTokens();
});