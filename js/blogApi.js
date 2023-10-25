document.addEventListener("DOMContentLoaded", function () {
  function fetchBlogData() {
    const baseUrl = "https://devdiary.up.railway.app";

    fetch(`${baseUrl}/api/BlogPosts/3`)
      .then((response) => response.json())
      .then(function (data) {
        displayBlogData(data, baseUrl);
      });
  }

  function displayBlogData(blogPosts, baseUrl) {
    let template = document.getElementById("blog-template");
    let blogSection = document.getElementById("blogs");

    blogPosts.forEach((blogPost) => {
      // Clone the template node to create a new blog post element
      const blogPostCard = document.importNode(template.content, true);

      // Update the blog post content using data from the API
      // Set the title
      const blogTitle = blogPostCard.querySelector('[data-blog="title"]');
      blogTitle.textContent = blogPost.title;

      // Set the image
      const blogImage = blogPostCard.querySelector(".blog-image");
      blogImage.src = `${baseUrl}/content/${blogPost.imageFile}`; // Update with the correct field
      // blogImage.alt = blogPost.title;

      // Set the content (abstract in this case)
      const blogContent = blogPostCard.querySelector('[data-blog="abstract"]'); // Update to match the field name
      blogContent.textContent = blogPost.abstract; // Update to match the field name

      // Set the category
      // const blogCategory = blogPostCard.querySelector('[data-blog="category"]');
      // blogCategory.textContent = blogPost.category; // Update to match the field name

      // Set the content
      // const blogFullContent = blogPostCard.querySelector(
      //   '[data-blog="content"]'
      // );
      // blogFullContent.textContent = blogPost.content;

      // Set the tags
      // const blogTags = blogPostCard.querySelector('[data-blog="tags"]');
      // blogTags.textContent = blogPost.tags; // Update to match the field name

      // Set the published date
      const blogPubDate = blogPostCard.querySelector(
        '[data-blog="publishedDate"]'
      );
      const createdDate = new Date(blogPost.created);
      const currentDate = new Date();
      const timeDifference = currentDate - createdDate;
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      blogPubDate.textContent =
        daysAgo === 1
          ? `Published ${daysAgo} day ago`
          : `Published ${daysAgo} days ago`;

      // Set the read more link
      // const blogLink = blogPostCard.querySelector('[data-blog="readMoreLink"]');
      // blogLink.href = `${baseUrl}/content/${blogPost.slug}`;

      // Append the blog post element to the blog section
      blogSection.appendChild(blogPostCard);
    });
  }

  // Llamar a la función para cargar los datos
  fetchBlogData();
});
