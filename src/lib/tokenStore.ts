const KOYOFES_NAVI_TOKEN = 'koyofes_navi_token';

export const setToken = (token: string) => {
  localStorage.setItem(KOYOFES_NAVI_TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(KOYOFES_NAVI_TOKEN);
};

export const clearToken = () => {
  localStorage.removeItem(KOYOFES_NAVI_TOKEN);
};
