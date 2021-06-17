const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  sum = 0;
  blogList.map((blog) => {
    sum = sum + blog.likes;
  });
  return sum;
};

const favoriteBlog = (bloglist) => {
  let highestLikes = 0;
  if (bloglist.length === 0) {
    return 0;
  }

  bloglist.map((blog) => {
    if (blog.likes > highestLikes) {
      highestLikes = blog.likes;
    }
  });

  let blogWithHighestLikes = bloglist.find(
    (blog) => blog.likes === highestLikes
  );

  return {
    title: `${blogWithHighestLikes.title}`,
    author: `${blogWithHighestLikes.author}`,
    likes: blogWithHighestLikes.likes,
  };
};

const mostBlogs = (blogList) => {
  const { flow, countBy, toPairs, maxBy, tail, head } = _;

  const bestAuthor = flow(
    (arr) => countBy(arr, "author"),
    toPairs,
    (arr) => maxBy(arr, tail),
    head
  );

  const numberOfBlogs = flow(
    (arr) => countBy(arr, "author"),
    toPairs,
    (arr) => maxBy(arr, tail),
    tail
  );

  const blogsNumber = numberOfBlogs(blogList);

  return {
    author: `${bestAuthor(blogList)}`,
    blogs: blogsNumber[0],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
