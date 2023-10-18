function fetchBlogData() {
  const baseUrl = "https://thewritinglife-production.up.railway.app/";

  // Fetch a specific blog post by ID (in this case, ID 3)
  fetch(`${baseUrl}/api/BlogPosts/3`)
    .then((response) => response.json())
    .then(function (data) {
      displayBlogData(data, baseUrl);
    })
    .catch((error) => console.error(error));
}

function displayBlogData(blogPosts, baseUrl) {
  let template = document.getElementById("blog-template");
  let blogSection = document.getElementById("blogs");

  // Clear the existing content in the blog section
  blogSection.innerHTML = "";

  blogPosts.forEach((blogPost) => {
    // Clone the template node to create a new blog post element
    const blogPostCard = document.importNode(template.content, true);

    // Update the blog post content using data from the API
    // Set the title
    const blogTitle = blogPostCard.querySelector('[data-blog="title"]');
    blogTitle.textContent = blogPost.title;

    // Set the image
    const blogImage = blogPostCard.querySelector('[data-blog="image"]');
    blogImage.src = `${baseUrl}/content/${blogPost.slug}`;
    blogImage.alt = blogPost.title;

    // Set the content
    const blogContent = blogPostCard.querySelector('[data-blog="content"]');
    blogContent.innerHTML = blogPost.abstract;

    // Set the read more link
    const blogLink = blogPostCard.querySelector('[data-blog="readMoreLink"]');
    blogLink.href = `${baseUrl}/content/${blogPost.slug}`;

    // Set the published date
    const blogPubDate = blogPostCard.querySelector(
      '[data-blog="publishedDate"]'
    );
    const createdDate = new Date(blogPost.created);
    const currentDate = new Date();

    // Calculate the time difference
    const timeDifference = currentDate - createdDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    blogPubDate.textContent =
      daysAgo === 1
        ? `Published ${daysAgo} day ago`
        : `Published ${daysAgo} days ago`;

    // Append the blog post element to the blog section
    blogSection.appendChild(blogPostCard);
  });
}
