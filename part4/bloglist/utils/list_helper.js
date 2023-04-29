const totalLikes = blogs =>
  blogs.map(blog => blog.likes).reduce((acc, curr) => acc + curr, 0);

const favoriteBlog = blogs =>
  (({ title, author, likes }) => ({ title, author, likes }))(
    blogs.reduce((fav, curr) => (curr ? curr.likes > fav.likes : fav)),
  );

module.exports = {
  totalLikes,
  favoriteBlog,
};
