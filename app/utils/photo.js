import axios from 'axios';
export const uploadImage = imageData => {
  return axios({
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: {
      Authorization: 'Client-ID 6b87d72f0811d55',
    },
    data: {
      image: imageData,
      type: 'base64',
    },
  })
  .then(response => new Promise((resolve) => resolve(response.data.data.link)));
};
