document.addEventListener("DOMContentLoaded", function () {
  function fetchBlogData() {
    const baseUrl = "https://devdiary-production.up.railway.app";

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
      blogImage.src = blogPost.imageFileString; // Update with the correct field
      let blogDate = new Date(blogPost.created); // 2009-11-10
      let month = blogDate.toLocaleString("default", {month: "long"});
      let day = blogDate.getDate();

      //add day
      let blogDayDiv = blogPostCard.querySelector(".blog-day");
      blogDayDiv.innerHTML = day;

      //add month
      let blogMonthDiv = blogPostCard.querySelector(".blog-month");

      blogMonthDiv.innerHTML = month;

      // Set the content (abstract in this case)
      const blogContent = blogPostCard.querySelector('[data-blog="abstract"]'); // Update to match the field name
      blogContent.textContent = blogPost.abstract; // Update to match the field name

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

      // Append the blog post element to the blog section
      blogSection.appendChild(blogPostCard);
    });
  }

  // Llamar a la función para cargar los datos
  fetchBlogData();
});
