import { DateRange } from "react-date-range";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import "./header.css";
import { FaSearch, FaRegCalendarAlt, FaUserFriends } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

function Header() {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/houses", { state: { destination:destination.trim(), date, options } });
  };
  

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerSearchBar">
          {/* Location */}
          <div className="searchItem">
            <IoLocationSharp className="searchIcon" />
            <div className="searchInput">
              <span className="searchTitle">Location</span>
              <input
                type="text"
                placeholder="Where are you going?"
                className="headerSearchInput"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="searchSeparator"></div>

          {/* Check-in */}
          <div className="searchItem" onClick={() => setOpenDate(!openDate)}>
            <FaRegCalendarAlt className="searchIcon" />
            <div className="searchInput">
              <span className="searchTitle">Check in - Check out</span>
              <span className="dateText">
                {`${format(date[0].startDate, "MM/dd/yyyy")} - ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
            </div>
          </div>

          <div className="searchSeparator"></div>

          {/* Guests */}
          <div className="searchItem" onClick={() => setOpenOptions(!openOptions)}>
            <FaUserFriends className="searchIcon" />
            <div className="searchInput">
              <span className="searchTitle">Guests</span>
              <span className="guestText">
                {`${options.adult + options.children} guests · ${options.room} rooms`}
              </span>
            </div>
          </div>

          {/* Search Button */}
          <button className="headerSearchButton" onClick={handleSearch}>
            <FaSearch />
            <span>Search</span>
          </button>
        </div>

        {/* Date Range Picker Popup */}
        {openDate && (
          <div className="dateRangeWrapper">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
              className="dateRange"
            />
          </div>
        )}

        {/* Options Popup */}
        {openOptions && (
          <div className="optionsWrapper">
            <div className="optionItem">
              <span className="optionText">Adults</span>
              <div className="optionCounter">
                <button
                  disabled={options.adult <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "i")}
                >
                  +
                </button>
              </div>
            </div>

            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  disabled={options.children <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.children}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "i")}
                >
                  +
                </button>
              </div>
            </div>

            <div className="optionItem">
              <span className="optionText">Rooms</span>
              <div className="optionCounter">
                <button
                  disabled={options.room <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.room}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;