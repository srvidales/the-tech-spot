console.log('post.js loaded!');

const newFormHandler = async (event) => {
  event.preventDefault();

  //   const name = document.querySelector('#project-name').value.trim();
  //   const needed_funding = document
  //     .querySelector('#project-funding')
  //     .value.trim();
  //   const description = document.querySelector('#project-desc').value.trim();

  const content = document.querySelector('#content').value.trim();
  const post_id = document.querySelector('.btn-primary').dataset.postId;

  //   if (name && needed_funding && description) {
  //     const response = await fetch(`/api/projects`, {
  //       method: 'POST',
  //       body: JSON.stringify({ name, needed_funding, description }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //     if (response.ok) {
    //       document.location.replace('/post');
    //     } else {
    //       alert('Failed to create post');
    //     }
    //   }

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);
