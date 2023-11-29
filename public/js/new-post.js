console.log('new-post.js');

const newPostButtonHandler = async (event) => {
  document.location.replace('/dashboard/new');
};

document
  .querySelector('#new-post')
  .addEventListener('click', newPostButtonHandler);
