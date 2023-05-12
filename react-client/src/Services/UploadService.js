const host = `${import.meta.env.VITE_HOST_URL}/api`;

export async function uploadPic(item) {
  try {
    const response = await fetch(host + '/upload/profile', {
      method: 'post',
      body: item,
    });
    const data = await response.json();

    if (!data.url) {
      throw new Error('No URL received from upload');
    }

    const fullAvatarUrl = `${import.meta.env.VITE_HOST_URL}/${data.url}`;

    return {
      ...data,
      fullUrl: fullAvatarUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
