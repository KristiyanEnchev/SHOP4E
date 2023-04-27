import * as api from './apiService.js';

const host = (api.settings.host = 'http://localhost:5000/api');

export async function getProducts() {
  return await api.get(host + '/products');
}

export async function getBanners() {
  return await api.get(host + '/products/banners');
}

export async function getProductBySlug(slug) {
  return await api.get(host + `/products/` + slug);
}

export async function getProductById(productId) {
  return await api.get(host + `/products/get/` + productId);
}

export async function create(item) {
  return await api.post(host + '/products', item);
}

export async function edit(id, item) {
  return await api.put(host + '/products/' + id, item);
}

export async function deleteRequest(id) {
  return await api.del(host + '/products/' + id);
}
