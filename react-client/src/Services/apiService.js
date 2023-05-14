export const settings = {
  host: `${import.meta.env.VITE_HOST_URL}/api`,
};

export async function request(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok === false) {
      if (response.status === 401) {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('avatar');
        sessionStorage.removeItem('_id');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('isAdmin');
      }
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

function getOptions(method = 'get', body) {
  const options = {
    method,
    headers: {},
  };

  const token = sessionStorage.getItem('token');
  if (token != null) {
    options.headers.authorization = 'Bearer ' + token;
  }

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return options;
}

export async function get(url) {
  return await request(url, getOptions());
}

export async function post(url, data) {
  return await request(url, getOptions('post', data));
}

export async function put(url, data) {
  return await request(url, getOptions('put', data));
}

export async function del(url) {
  return await request(url, getOptions('delete'));
}

export async function login(email, password) {
  const result = await post(settings.host + '/auth/login', {
    email,
    password,
  });

  sessionStorage.setItem('_id', result._id);
  sessionStorage.setItem('token', result.token);
  sessionStorage.setItem('avatar', result.avatar);
  sessionStorage.setItem('email', result.email);
  sessionStorage.setItem('name', result.name);
  sessionStorage.setItem('isAdmin', result.isAdmin);

  return result;
}

export async function register(email, name, password) {
  const result = await post(settings.host + '/auth/register', {
    email,
    password,
    name,
  });

  sessionStorage.setItem('token', result.token);
  sessionStorage.setItem('_id', result._id);
  sessionStorage.setItem('email', result.email);
  sessionStorage.setItem('name', result.name);

  return result;
}

export async function logout() {
  const result = await get(settings.host + '/auth/logout');

  sessionStorage.removeItem('token');
  sessionStorage.removeItem('avatar');
  sessionStorage.removeItem('_id');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('name');
  sessionStorage.removeItem('isAdmin');

  return result;
}
