import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import SortDropdown from "../../components/SortDropdown";
import avi from "../../images/User-avatar.svg.png";
import SearchBar from "../../components/SearchBar";
import Message from "../../components/Message";

const FindTechniciansScreen = () => {
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy technicians array
  const technicians = [
    {
      id: 1,
      name: "John Smith",
      location: "New York",
      category: "Electrician",
      rating: "4.5",
      experience: "4 Years",
      avatar: avi,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 2,
      name: "Dummy Technician 1",
      location: "Dummy Location 1",
      category: "Category 1",
      rating: "4.2",
      experience: "2 Years",
      avatar: avi,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 3,
      name: "Dummy Technician 2",
      location: "Dummy Location 2",
      category: "Category 2",
      rating: "4.8",
      experience: "5 Years",
      avatar: avi,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 4,
      name: "John Smith",
      location: "New York",
      category: "Electrician",
      rating: "4.5",
      experience: "4 Years",
      avatar: avi,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 5,
      name: "Dummy Technician 1",
      location: "Dummy Location 1",
      category: "Category 1",
      rating: "4.2",
      experience: "2 Years",
      avatar: avi,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 6,
      name: "Dummy Technician 2",
      location: "Dummy Location 2",
      category: "Category 2",
      rating: "4.8",
      experience: "5 Years",
      avatar: avi,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ];

  const sortOptions = {
    displayName: "Sort By",
    menuItems: [
      {
        label: "Most Experienced",
        value: "most-experienced",
        icon: "fas fa-clock",
        link: "#",
      },
      {
        label: "A to Z",
        value: "a-to-z",
        icon: "fas fa-arrow-up-a-z",
        link: "#",
      },
      {
        label: "Z to A",
        value: "z-to-a",
        icon: "fas fa-arrow-down-a-z",
        link: "#",
      },
      {
        label: "Best Rating",
        value: "best-rating",
        icon: "fas fa-star",
        link: "#",
      },
    ],
  };

  const handleSort = (value) => {
    setLoading(true);
    setSortOption(value);
    switch (value) {
      case "most-experienced":
        setFilteredTechnicians(
          [...filteredTechnicians].sort(
            (a, b) => +b.experience.split(" ")[0] - +a.experience.split(" ")[0]
          )
        );
        break;
      case "a-to-z":
        setFilteredTechnicians(
          [...filteredTechnicians].sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
        );
        break;
      case "z-to-a":
        setFilteredTechnicians(
          [...filteredTechnicians].sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
          )
        );
        break;
      case "best-rating":
        setFilteredTechnicians(
          [...filteredTechnicians].sort(
            (a, b) => +b.rating.split(" ")[0] - +a.rating.split(" ")[0]
          )
        );
        break;
      default:
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    setFilteredTechnicians(technicians);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (searchText) => {
    setLoading(true);
    const filtered = technicians.filter((technician) => {
      const nameMatches = technician.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const categoryMatches =
        selectedCategory === "" ||
        technician.category.toLowerCase() === selectedCategory.toLowerCase();
      return nameMatches && categoryMatches;
    });
    setFilteredTechnicians(filtered);
    setLoading(false);
  };

  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        <h1 className="text-4xl text-center font-bold mb-4">
          Find The Best Technicians!
        </h1>
        <SearchBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />

        <SortDropdown
          sortOptions={sortOptions}
          sortOption={sortOption}
          onClickFunc={handleSort}
        />
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap sm:flex-row justify-center">
            {filteredTechnicians.length === 0 ? (
              <Message type="error">No technicians found.</Message>
            ) : (
              filteredTechnicians.map((technician) => (
                <Link
                  to={`/technicians/${technician.id}`}
                  key={technician.id}
                  className="sm:w-1/4 w-full bg-gray-900 flex flex-col justify-center items-center text-justify rounded-lg shadow-lg mb-4 sm:m-2  px-6 py-2 border-2 border-transparent hover:shadow-xl hover:border-gray-700 transition-colors duration-300"
                >
                  <img
                    className="w-32 h-32 rounded-full m-2"
                    src={technician.avatar}
                    alt="User Avatar"
                  />
                  <h2 className="text-white text-lg font-bold mb-2">
                    {technician.name}
                  </h2>
                  <h2 className="text-gray-300 text-sm font-light mb-2">
                    Location: {technician.location}
                  </h2>
                  <h2 className="text-gray-300 text-sm font-light mb-2">
                    Category: {technician.category}
                  </h2>
                  <h2 className="text-yellow-400 text-lg font-bold mb-2">
                    Rating: {technician.rating}
                  </h2>
                  <h2 className="text-gray-300 text-sm font-light mb-2">
                    Experience: {technician.experience}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {technician.description}
                  </p>

                  <Link to={`/technicians/${technician.id}`}>
                    <Button variant="outline" className="rounded-md">
                      View Profile
                    </Button>
                  </Link>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FindTechniciansScreen;
