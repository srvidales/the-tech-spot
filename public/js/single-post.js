console.log('single-post.js newFormHandler');

const newFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();

  if (content) {
    if (event.target.hasAttribute('data-id')) {
      const postId = event.target.getAttribute('data-id');

      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id: postId, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to create post');
      }
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);
