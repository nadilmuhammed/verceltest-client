import React, { useState } from "react";

const Homepage = () => {
  const [imgLoading, setImgLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6; // Set the number of images per page

  const handleImageLoading = () => {
    setImgLoading(true);
  };

  const images = [
    {
      id: 1,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 2,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 3,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 4,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 5,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 6,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 7,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 8,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 9,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 10,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 11,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 12,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
    {
      id: 13,
      img: "https://wallpapers.com/images/high/4k-pirate-captain-and-member-yvbssfuhezgcfd6o.webp",
    },
  ];

  // Calculate the index of the first and last images for the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Handle pagination button clicks
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination buttons
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const pageNumbers = [];

  if (totalPages <= 5) {
    // If total pages are 5 or less, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show first, last, and neighboring pages with "..." in between
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage > totalPages - 3) {
      pageNumbers.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  return (
    <div className="">
          <div className="text-black text-justify mt-10 mb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
            dolor iure pariatur vitae? Harum, ad. Harum sint qui porro
            blanditiis id perferendis rerum. Ab asperiores modi facilis
            perferendis? Amet maiores voluptatem vero eius quasi quam modi ipsa
            velit ullam, autem, veritatis beatae enim ad nobis, blanditiis
            temporibus nulla aliquam laborum veniam iure. Dolore iste laboriosam
            deleniti qui quam harum vel, eligendi inventore temporibus culpa non
            necessitatibus facilis soluta dolorum molestiae voluptatibus
            doloribus perferendis labore saepe accusamus dicta fugiat cumque!
            Alias illo incidunt dolores fuga assumenda, sed, in optio doloribus
            exercitationem consequatur corporis! Itaque sit, eos harum
            asperiores ipsa soluta fugiat?
          </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center mt-10 gap-5">
        {currentImages.map((item) => (
          <img
            key={item.id}
            src={item.img}
            alt="image"
            className={`rounded-lg shadow-lg shadow-black ${
              imgLoading ? "blur-0" : "blur-sm"
            }`}
            onLoad={handleImageLoading}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="join">
          {pageNumbers.map((number, index) => (
            <button
              key={index}
              onClick={() => number !== "..." && handlePageChange(number)}
              className={`join-item btn btn-sm hover:bg-black hover:text-white ${
                currentPage === number ? "btn-active bg-black text-white" : ""
              } ${number === "..." ? "btn-disabled" : ""}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 w-full h-[80vh] bg-fixed bg-parallax bg-cover flex justify-center items-center rounded-[2rem]">
        <h3 className="text-5xl text-white">This is a "PARALLAX IMAGE"</h3>
      </div>
    </div>
  );
};

export default Homepage;
