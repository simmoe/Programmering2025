async function fetchRedditComments(subreddit, postId) {
    const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
    const response = await fetch(url);
    const data = await response.json();
  
    const comments = data[1].data.children; // Kommentarer er i det andet element i JSON arrayet
    displayComments(comments, 0);
  }
  
  function displayComments(comments, level) {
    comments.forEach(comment => {
      const indent = '—'.repeat(level);
      createDiv(`${indent} ${comment.data.author}: ${comment.data.body}`).addClass('comment ' + "level" + level);
  
      if (comment.data.replies) {
        displayComments(comment.data.replies.data.children, level + 1);
      }
    });
  }
  
  function setup() {
    noCanvas();
    fetchRedditComments('Denmark', '1eleg6q');  // Subreddit og post-id fra eksemplet
  }
  