const totalLikes = blogs =>
  blogs.map(blog => blog.likes).reduce((acc, curr) => acc + curr, 0);

module.exports = {
  totalLikes,
};
