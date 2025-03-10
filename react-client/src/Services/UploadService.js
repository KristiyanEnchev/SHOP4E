const host = `${import.meta.env.VITE_HOST_URL}` || 'http://localhost:5000';

export async function uploadPic(item) {
  try {
    const response = await fetch(host + '/api' + '/upload/profile', {
      method: 'post',
      body: item,
    });
    const data = await response.json();

    if (!data.url) {
      throw new Error('No URL received from upload');
    }

    const fullAvatarUrl = `${host}${data.url}`;

    return {
      ...data,
      fullUrl: fullAvatarUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
