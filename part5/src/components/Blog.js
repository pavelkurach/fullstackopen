import { useState } from 'react';

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const deleteButton = () => (
    <div>
      <button onClick={handleDelete}>delete</button>
    </div>
  );

  const blogDetails = () => (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div id='likes'>
        likes {blog.likes}{' '}
        <button onClick={handleLike} id='like-button'>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {blog.user.username === username && deleteButton()}
    </div>
  );

  return (
    <div style={{ border: '1px solid black', margin: '2px' }} className='blog'>
      {blog.title} {blog.author}{' '}
      <button
        onClick={() => setDetailsVisible(!detailsVisible)}
        id='view-button'
      >
        {detailsVisible ? 'hide' : 'view'}
      </button>
      {detailsVisible && blogDetails()}
    </div>
  );
};

export default Blog;
