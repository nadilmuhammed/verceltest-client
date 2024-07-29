import React, { useState } from "react";

const Homepage = () => {
  const [imgLoading, setImgLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 3;

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
  ];

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Handle pagination button clicks
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(images.length / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="">
      <div className="text-black mt-10 text-justify">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus dolor
        iure pariatur vitae? Harum, ad. Harum sint qui porro blanditiis id
        perferendis rerum. Ab asperiores modi facilis perferendis? Amet maiores
        voluptatem vero eius quasi quam modi ipsa velit ullam, autem, veritatis
        beatae enim ad nobis, blanditiis temporibus nulla aliquam laborum veniam
        iure. Dolore iste laboriosam deleniti qui quam harum vel, eligendi
        inventore temporibus culpa non necessitatibus facilis soluta dolorum
        molestiae voluptatibus doloribus perferendis labore saepe accusamus
        dicta fugiat cumque! Alias illo incidunt dolores fuga assumenda, sed, in
        optio doloribus exercitationem consequatur corporis! Itaque sit, eos
        harum asperiores ipsa soluta fugiat?
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center my-4 gap-5">
        {currentImages.map((items) => {
          return (
            <img
              key={items.id}
              src={items.img}
              alt="image"
              className={`rounded-lg shadow-lg shadow-black ${
                imgLoading ? "blur-0" : "blur-sm"
              }`}
              onLoad={handleImageLoading}
            />
          );
        })}
      </div>
      <div className="flex justify-center items-center">
        <div className="join">
        {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`join-item btn ${currentPage === number ? "btn-active" : ""}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
