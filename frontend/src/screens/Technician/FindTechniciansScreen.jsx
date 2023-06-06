import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { listTechnicians } from "../../redux/actions/technicianActions";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import SearchBar from "../../components/SearchBar";
import SortDropdown from "../../components/SortDropdown";
import avi from "../../images/User-avatar.svg.png";

const FindTechniciansScreen = () => {
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [noTechniciansFound, setNoTechniciansFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingSort, setLoadingSort] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  useEffect(() => {
    if (techUserInfo) {
      navigate("/login");
    }
  }, [navigate, techUserInfo]);

  const technicianUserList = useSelector((state) => state.technicianUserList);
  const { loading, error, technicians } = technicianUserList;

  useEffect(() => {
    dispatch(listTechnicians());
  }, [dispatch]);

  useEffect(() => {
    const sucscribedTechnicians = technicians.filter((technician) =>
      technician.subscription === true ? technician : null
    );
    setFilteredTechnicians(sucscribedTechnicians);
    setNoTechniciansFound(technicians.length === 0);
    if (technicians.length === 0) {
      setErrorMsg({ status: 404, message: "No technicians found." });
    }
  }, [technicians]);

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
      // {
      //   label: "Best Rating",
      //   value: "best-rating",
      //   icon: "fas fa-star",
      //   link: "#",
      // },
    ],
  };

  const handleSort = (value) => {
    setLoadingSort(true);
    setSortOption(value);

    let sortedTechnicians = [...filteredTechnicians];

    switch (value) {
      case "most-experienced":
        sortedTechnicians.sort(
          (a, b) => +b.experience.split(" ")[0] - +a.experience.split(" ")[0]
        );
        break;
      case "a-to-z":
        sortedTechnicians.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        break;
      case "z-to-a":
        sortedTechnicians.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        );
        break;
      // case "best-rating":
      //   sortedTechnicians.sort(
      //     (a, b) => +b.rating.split(" ")[0] - +a.rating.split(" ")[0]
      //   );
      //   break;
      default:
        break;
    }

    setFilteredTechnicians(sortedTechnicians);
    setLoadingSort(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (searchText) => {
    setLoadingSearch(true);

    const sucscribedTechnicians = technicians.filter((technician) =>
      technician.subscription === true ? technician : null
    );

    let filtered = sucscribedTechnicians;

    if (searchText) {
      filtered = filtered.filter(
        (technician) =>
          technician.name.toLowerCase().includes(searchText.toLowerCase()) ||
          technician.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (technician) =>
          selectedCategory === "" ||
          technician.category.title === selectedCategory
      );
    }

    setFilteredTechnicians(filtered);
    setNoTechniciansFound(filtered.length === 0);
    if (filtered.length === 0) {
      setErrorMsg({ status: 404, message: "No technicians found." });
    }

    setLoadingSearch(false);
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
        />

        <SortDropdown
          sortOptions={sortOptions}
          sortOption={sortOption}
          handleSort={handleSort}
        />

        {loading || loadingSort || loadingSearch ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap sm:flex-row justify-center">
            {error ? (
              <Message>{error}</Message>
            ) : noTechniciansFound ? (
              <Message>{errorMsg}</Message>
            ) : (
              filteredTechnicians.map((technician) => (
                <div
                  key={technician._id}
                  className="sm:w-1/4 min-w-max w-full bg-gray-900 flex flex-col justify-center items-center text-justify rounded-lg shadow-lg mb-4 sm:m-2  px-6 py-2 border-2 border-transparent hover:shadow-xl hover:border-gray-700 transition-colors duration-300"
                >
                  <img
                    className="w-32 h-32 rounded-full m-2"
                    src={avi}
                    alt="User Avatar"
                  />
                  <h2 className="text-white text-lg font-bold mb-2">
                    {technician.name}
                  </h2>
                  <h2 className="text-gray-300 text-sm font-light mb-2">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    Location: {technician.location}
                  </h2>
                  <h2 className="text-gray-300 text-sm font-light mb-2">
                    <i className="fas fa-layer-group mr-2"></i>
                    Category: {technician.category.title}
                  </h2>

                  {technician.rating && (
                    <h2 className="text-yellow-400 text-lg font-bold mb-2">
                      <i className="fas fa-star mr-2"></i>
                      Rating: {technician.rating}
                    </h2>
                  )}
                  <h2 className="text-gray-300 text-sm font-light mb-2">
                    <i className="fas fa-clock mr-2"></i>
                    Experience: {technician.experience}
                  </h2>

                  <Link to={`/technician/${technician._id}`}>
                    <Button variant="outline" className="rounded-md">
                      View Profile
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FindTechniciansScreen;
