const totalLikes = blogs =>
  blogs.map(blog => blog.likes).reduce((acc, curr) => acc + curr, 0);

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return {};
  }
  return (({ title, author, likes }) => ({ title, author, likes }))(
    blogs.reduce((fav, curr) => (curr.likes > fav.likes ? curr : fav)),
  );
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
