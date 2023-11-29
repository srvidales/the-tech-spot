const newPostHandler = async (event) => {
  document.location.replace('/dashboard/new');
};

document.querySelector('#new-post').addEventListener('click', newPostHandler);
