import { useState } from 'react';

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const showWhenVisible = { display: detailsVisible ? '' : 'none' };
  return (
    <div style={{ border: '1px solid black', margin: '2px' }}>
      {blog.title}{' '}
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.author}</div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes{' '}{blog.likes}{' '}
          <button>like</button>
        </div>
        <div>{blog.user.username}</div>
      </div>
    </div>
  );
};

export default Blog;
