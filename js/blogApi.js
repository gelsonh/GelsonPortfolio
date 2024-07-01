// Fetch and Display Latest Blog Posts

document.addEventListener("DOMContentLoaded", function () {
  
  // Function to fetch blog data from the API
  function fetchBlogData() {
    const baseUrl = "https://devdiary-production.up.railway.app";

    // Fetching the latest 3 blog posts from the API
    fetch(`${baseUrl}/api/BlogPosts/3`)
      .then((response) => response.json())
      // Convert the response body to a javascript object using JSON
      .then(function (data) {
        // Sort the blog posts by creation date in descending order
        const sortedBlogPosts = data.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );

        // Get the first three blog posts from the sorted list
        const latestBlogPosts = sortedBlogPosts.slice(0, 3);

        // Display the blog posts on the page
        displayBlogData(latestBlogPosts, baseUrl);
      });
  }

  // Function to display the fetched blog data on the page
  function displayBlogData(blogPosts, baseUrl) {
    let template = document.getElementById("blog-template"); // Get the blog post template
    let blogSection = document.getElementById("blogs"); // Get the blog section where post will be displayed

    blogPosts.forEach((blogPost) => {
      // Clone the template node to create a new blog post element
      const blogPostCard = document.importNode(template.content, true);

      // Update the blog post content using data from the API

      // Set the title
      const blogTitle = blogPostCard.querySelector('[data-blog="title"]');
      blogTitle.textContent = blogPost.title;

      // Set the image
      const blogImage = blogPostCard.querySelector(".blog-image");
      blogImage.src = blogPost.imageFileString;

      // Format and set the blog post creation date
      let blogDate = new Date(blogPost.created);
      let month = blogDate.toLocaleString("default", {month: "long"});
      let day = blogDate.getDate();

      // Set the day
      let blogDayDiv = blogPostCard.querySelector(".blog-day");
      blogDayDiv.innerHTML = day;

      // Set the month
      let blogMonthDiv = blogPostCard.querySelector(".blog-month");
      blogMonthDiv.innerHTML = month;

      // Set the content (abstract in this case)
      const blogContent = blogPostCard.querySelector('[data-blog="abstract"]');
      blogContent.textContent = blogPost.abstract;

      // Set the published date in a relative format
      const blogPubDate = blogPostCard.querySelector(
        '[data-blog="publishedDate"]'
      );

      const createdDate = new Date(blogPost.created);
      const currentDate = new Date();
      const timeDifference = currentDate - createdDate; // Calculate the time difference
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert time difference to days
      blogPubDate.textContent =
        daysAgo === 1
          ? `Published ${daysAgo} day ago`
          : `Published ${daysAgo} days ago`;

      // Append the blog post element to the blog section
      blogSection.appendChild(blogPostCard);
    });
  }

  // Call the function to load the blog data when the page content is loaded
  fetchBlogData();
});
