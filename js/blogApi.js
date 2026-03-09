// Fetch and display blog posts only when the blog section is near the viewport.

document.addEventListener("DOMContentLoaded", function () {
  const blogSection = document.getElementById("blogs");
  const template = document.getElementById("blog-template");
  const blogList = document.getElementById("blog-list");
  const blogLoading = document.getElementById("blog-loading");

  if (!blogSection || !template || !blogList || !blogLoading) {
    return;
  }

  let hasLoadedPosts = false;

  function displayBlogData(blogPosts) {
    blogPosts.forEach((blogPost) => {
      const blogPostCard = document.importNode(template.content, true);
      const blogArticle = blogPostCard.querySelector(".blog-article");
      const blogTitle = blogPostCard.querySelector('[data-blog="title"]');
      const blogImage = blogPostCard.querySelector(".blog-image");
      const blogImageLink = blogPostCard.querySelector(".blog-image-link");
      const blogReadMoreLink = blogPostCard.querySelector(".btn.btn-primary");
      const blogContent = blogPostCard.querySelector('[data-blog="abstract"]');
      const blogPubDate = blogPostCard.querySelector(
        '[data-blog="publishedDate"]'
      );
      const blogDayDiv = blogPostCard.querySelector(".blog-day");
      const blogMonthDiv = blogPostCard.querySelector(".blog-month");

      blogTitle.textContent = blogPost.title;
      blogImage.src = blogPost.imageFileString;
      blogImage.loading = "lazy";
      blogImage.decoding = "async";
      blogImageLink.href = "https://devdiary-production.up.railway.app/";
      blogReadMoreLink.href = "https://devdiary-production.up.railway.app/";

      const createdDate = new Date(blogPost.created);
      const currentDate = new Date();
      const daysAgo = Math.floor(
        (currentDate - createdDate) / (1000 * 60 * 60 * 24)
      );

      blogDayDiv.textContent = createdDate.getDate();
      blogMonthDiv.textContent = createdDate.toLocaleString("default", {
        month: "long",
      });
      blogContent.textContent = blogPost.abstract;
      blogPubDate.textContent =
        daysAgo === 1
          ? `Published ${daysAgo} day ago`
          : `Published ${daysAgo} days ago`;

      blogList.appendChild(blogPostCard);
      requestAnimationFrame(() => {
        blogArticle.classList.add("blog-article-visible");
      });
    });
  }

  async function fetchBlogData() {
    if (hasLoadedPosts) {
      return;
    }

    hasLoadedPosts = true;

    try {
      const response = await fetch(
        "https://devdiary-production.up.railway.app/api/BlogPosts/3"
      );
      const data = await response.json();
      const latestBlogPosts = data
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .slice(0, 3);

      blogLoading.hidden = true;
      displayBlogData(latestBlogPosts);
    } catch (error) {
      hasLoadedPosts = false;
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            fetchBlogData();
          }
        });
      },
      { rootMargin: "900px 0px" }
    );

    observer.observe(blogSection);
    return;
  }

  fetchBlogData();
});
