import React, { useState, useEffect } from "react";
import "./Search.css";
import List from "./List";
import axios from "axios";
import Details from "./Details";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface StateOption {
  abbreviation: string;
  name: string;
}

interface Favorite {
  _id: string;
  city: string;
  state: string;
}

interface Interval {
  startTime: string;
  values: any; // Replace `any` with the specific shape if known
}

interface TransformedInterval {
  id: number;
  date: string;
  weatherCode: string;
  temperatureMax: number;
  temperatureMin: number;
  windSpeed: number;
}

interface Data {
  lat?: number; // Optional if not immediately set
  lng?: number; // Optional if not immediately set
  street: string;
  city: string;
  state: string;
  location: string; // Add this line for the location property
  defaultLocation: boolean; // Add this line for the defaultLocation property
}
interface DetailsProps {
  formatedAddress: string;
  formd: any;
  data?: {
    date: string;
    temperatureMax: number;
    temperatureMin: number;
    temperatureApparent: number;
    sunriseTime: number;
    sunsetTime: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    cloudCover: number;
    weatherCode: string;
  };
  handleToggleClick: () => void;
  formsubmitted: (submitted: boolean) => void;
  tableclick: (clicked: boolean) => void;
  reserved: boolean;
  setReserved: (reserved: boolean) => void;
  lat?: number;
  lng?: number;
}

function Search() {
  const allstatesforselect: StateOption[] = [
    { abbreviation: "Alabama", name: "Alabama" }, //state
    { abbreviation: "Alaska", name: "Alaska" }, //state
    { abbreviation: "Arizona", name: "Arizona" }, //state
    { abbreviation: "Arkansas", name: "Arkansas" }, //state
    { abbreviation: "California", name: "California" }, //state
    { abbreviation: "Colorado", name: "Colorado" }, //state
    { abbreviation: "Connecticut", name: "Connecticut" }, //state
    { abbreviation: "Delaware", name: "Delaware" }, //state
    { abbreviation: "Florida", name: "Florida" }, //state
    { abbreviation: "Georgia", name: "Georgia" }, //state
    { abbreviation: "Hawaii", name: "Hawaii" }, //state
    { abbreviation: "Idaho", name: "Idaho" }, //state
    { abbreviation: "Illinois", name: "Illinois" }, //state
    { abbreviation: "Indiana", name: "Indiana" }, //state
    { abbreviation: "Iowa", name: "Iowa" }, //state
    { abbreviation: "Kansas", name: "Kansas" }, //state
    { abbreviation: "Kentucky", name: "Kentucky" }, //state
    { abbreviation: "Louisiana", name: "Louisiana" }, //state
    { abbreviation: "Maine", name: "Maine" }, //state
    { abbreviation: "Maryland", name: "Maryland" }, //state
    { abbreviation: "Massachusetts", name: "Massachusetts" }, //state
    { abbreviation: "Michigan", name: "Michigan" }, //state
    { abbreviation: "Minnesota", name: "Minnesota" }, //state
    { abbreviation: "Mississippi", name: "Mississippi" }, //state
    { abbreviation: "Missouri", name: "Missouri" }, //state
    { abbreviation: "Montana", name: "Montana" }, //state
    { abbreviation: "Nebraska", name: "Nebraska" }, //state
    { abbreviation: "Nevada", name: "Nevada" }, //state
    { abbreviation: "New Hampshire", name: "New Hampshire" }, //state
    { abbreviation: "New Jersey", name: "New Jersey" }, //state
    { abbreviation: "New Mexico", name: "New Mexico" }, //state
    { abbreviation: "New York", name: "New York" }, //state
    { abbreviation: "North Carolina", name: "North Carolina" }, //state
    { abbreviation: "North Dakota", name: "North Dakota" }, //state
    { abbreviation: "Ohio", name: "Ohio" }, //state
    { abbreviation: "Oklahoma", name: "Oklahoma" }, //state
    { abbreviation: "Oregon", name: "Oregon" }, //state
    { abbreviation: "Pennsylvania", name: "Pennsylvania" }, //state
    { abbreviation: "Rhode Island", name: "Rhode Island" }, //state
    { abbreviation: "South Carolina", name: "South Carolina" }, //state
    { abbreviation: "South Dakota", name: "South Dakota" }, //state
    { abbreviation: "Tennessee", name: "Tennessee" }, //state
    { abbreviation: "Texas", name: "Texas" }, //state
    { abbreviation: "Utah", name: "Utah" }, //state
    { abbreviation: "Vermont", name: "Vermont" }, //state
    { abbreviation: "Virginia", name: "Virginia" }, //state
    { abbreviation: "Washington", name: "Washington" }, //state
    { abbreviation: "West Virginia", name: "West Virginia" }, //state
    { abbreviation: "Wisconsin", name: "Wisconsin" }, //state
    { abbreviation: "Wyoming", name: "Wyoming" }, //state
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [inter, setInter] = useState<Interval[]>([]);
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [streetError, setStreetError] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [stateError, setStateError] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [forNull, setForNuLL] = useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formdata, setFormData] = useState<any[]>([]); // Replace `any` with a defined type if known
  const [idlist, setIdList] = useState<number[]>([]);
  const [tableclick, setTableClick] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [noLocation, setNoLocation] = useState<boolean>(false);
  const [formSubmittedW, setFormSubmittedW] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);
  const [details, setDetails] = useState<Interval | undefined>();
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [activeTab, setActiveTab] = useState<"results" | "favorites">("results");
  const [formatedAddress, setFormatedAddress] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isStarClicked, setIsStarClicked] = useState<boolean>(false);
  const [showStateSuggestions, setShowStateSuggestions] = useState<boolean>(false);
  const [meteoData, setMeteoData] = useState<any[]>([]); // Replace `any` with a defined type if known
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [shouldSubmit, setShouldSubmit] = useState<boolean>(false);

  const onDateClick = (interval: Interval) => {
    setDetails(interval);
    setShowDetails(!showDetails);
    if (!showDetails) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  const handleToggleClick = () => {
    setDetails(inter[0]);
    setShowDetails(!showDetails);
    if (!showDetails) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  const validateStreet = (value: string) => {
    setStreetError(value.trim() === "" ? "Please enter valid street" : "");
  };

  const validateCity = (value: string) => {
    setCityError(value.trim() === "" ? "Please enter valid city" : "");
  };

  const validateState = (value: string) => {
    setShowStateSuggestions(false);
    setStateError(value.trim() === "" ? "State is required" : "");
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStreet(value);
    validateStreet(value);
  };

  const handleCityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = event.target.value;
    setCity(temp);
    if (temp === "") {
      setForNuLL(false);
    } else {
      setForNuLL(true);
      setCityError("");
      const autocomplete = await axios
        .get(`/autoComplete`, { params: { keyword: temp } })
        .then((response) => response.data);
      const pair = autocomplete.predictions.map((p: any) => p.terms[0].value); // Adjust types if `autocomplete` structure is known
      setShowSuggestions(pair.length > 0);
      setSuggestions(pair);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const onSuggestHandler = (text: string) => {
    setCity(text);
    setSuggestions([]);
    setShowSuggestions(false);
    validateCity(text);
  };

  const onStateHandler = (state: string) => {
    setState(state);
    setShowStateSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
    validateCity(city);
  };

  const handleStateBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setShowStateSuggestions(false);
    }, 200);
    validateState(state);
  };

  const handleTabClick = (tab: "results" | "favorites") => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const response = await axios.get("/favorites");
    setFavorites(response.data);
  };

  const saveFavorite = async () => {
    if (city && state) {
      const response = await axios.post("/favorites", { city, state });
      setFavorites([...favorites, response.data]);
    }
  };

  const deleteFavorite = async (id: string) => {
    await axios.delete(`/favorites/${id}`);
    setFavorites(favorites.filter((favorite) => favorite._id !== id));
    if (city === city && state === state) {
      setIsStarClicked(false);
    }
  };

  const handleFavoriteClick = (favorite: Favorite) => {
    setCity(favorite.city);
    setState(favorite.state);
    setStreet("Street");
    setIsStarClicked(isFavorite(favorite.city, favorite.state));
    setShouldSubmit(true);
  };

  useEffect(() => {
    if (shouldSubmit) {
      submitFormData();
      setIsStarClicked(isFavorite(city, state));
      setShouldSubmit(false);
    }
  }, [shouldSubmit, city, state, favorites]);

  const handleStarClick = async () => {
    const [city, state] = formatedAddress.split(",").map((part) => part.trim());

    if (city && state) {
      const existingFavorite = isFavorite(city, state);

      if (existingFavorite) {
        const favToDelete = favorites.find((fav) => fav.city === city && fav.state === state);
        if (favToDelete) {
          await axios.delete(`/favorites/${favToDelete._id}`);
        }
        if (favToDelete) {
          setFavorites(favorites.filter((fav) => fav._id !== favToDelete._id));
        }
        setIsStarClicked(false);
      } else {
        const response = await axios.post("/favorites", { city, state });
        setFavorites([...favorites, response.data]);
        setIsStarClicked(true);
      }
    }
  };

  const isFavorite = (city: string, state: string): boolean => {
    return favorites.some((fav: Favorite) => fav.city === city && fav.state === state);
  };

  interface Data {
    street: string;
    city: string;
    state: string;
    location: string;
    defaultLocation: boolean;
  }

  interface TransformedInterval {
    id: number;
    date: string;
    weatherCode: string;
    temperatureMax: number;
    temperatureMin: number;
    windSpeed: number;
  }

  const submitFormData = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    setActiveTab("results");
    setShowDetails(false);
    setIsStarClicked(false);

    const form = document.getElementById("Form") as HTMLFormElement;
    const street = (form.elements.namedItem("Street") as HTMLInputElement)?.value || "";
    const city = (form.elements.namedItem("City") as HTMLInputElement)?.value || "";
    const state = (form.elements.namedItem("State") as HTMLInputElement)?.value || "";
    const defaultLocation = (form.elements.namedItem("DefaultLocation") as HTMLInputElement)?.checked;

    const fullAddress = `${street}, ${city}, ${state}`;
    console.log(street);
    console.log(city);
    console.log(state);
    console.log(defaultLocation);
    // Validate input
    if ((street === "" || city === "" || state === "") && defaultLocation === false) {
      console.log("In");
      form.reportValidity();
      return;
    }

    const data: Data = { street, city, state, location: fullAddress, defaultLocation };
    let lat: number;
    let lng: number;
    let formattedAddress = `${city}, ${state}`;
    console.log("Submitted", data);
    try {
      if (data.defaultLocation) {
        const response = await axios.get("https://ipinfo.io/", {
          params: { token: "04d4e4a91d860f" },
        });

        const loc = response.data.loc.split(",");
        lat = parseFloat(loc[0]);
        lng = parseFloat(loc[1]);
        formattedAddress = `${response.data.city}, ${response.data.region}`;
      } else {
        const response = await axios.get("/geoLocation", {
          params: { location: data.location },
        });

        if (response.data.results.length === 0) {
          setNoLocation(true);
          setFormSubmittedW(true);
          return;
        } else {
          setNoLocation(false);
        }

        lat = response.data.results[0].geometry.location.lat;
        lng = response.data.results[0].geometry.location.lng;
      }

      // Fetch weather data
      const weatherResponse = await axios.get("/weather", {
        params: { lat, lng },
      });

      const tableData = weatherResponse.data;
      setMeteoData(tableData);

      const intervals = tableData.data.timelines[0].intervals;
      setInter(intervals);

      const list: TransformedInterval[] = [];
      const idList: number[] = [];

      intervals.forEach((interval: any, index: number) => {
        const date = new Date(interval.startTime);
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        const startDate = date.toLocaleDateString("en-US", options);
        console.log(startDate);
        const temp: TransformedInterval = {
          id: index + 1,
          date: startDate,
          weatherCode: interval.values.weatherCode.toString(),
          temperatureMax: interval.values.temperatureMax,
          temperatureMin: interval.values.temperatureMin,
          windSpeed: interval.values.windSpeed,
        };
        list.push(temp);
        idList.push(index);
      });

      // Final updates to state
      setLatitude(lat);
      setLongitude(lng);
      setFormSubmitted(true);
      setFormData(list);
      setIdList(idList);
      setFormatedAddress(formattedAddress);
      console.log("submit done");
    } catch (error) {
      console.error("Error in submitting form data:", error);
    }
  };

  const handleClear = () => {
    setStreet("");
    setCity("");
    setState("");
    setStreetError("");
    setCityError("");
    setStateError("");
    setIsChecked(false);
    setFormSubmitted(false);
    setFormSubmittedW(false);
    setTableClick(false);
    setNoLocation(false);
    setIsStarClicked(false);
  };

  return (
    <>
      <div className='container my-3'>
        <div className='bg-light px-2 pt-2 rounded shadow-sm'>
          <h2 className='text-center mb-4 fs-2'>Weather Search⛅</h2>
          <form id='Form'>
            <div className='form-group d-flex flex-column'>
              <div className='row mb-sm-1 ms-sm-5'>
                <label htmlFor='Street' className='col-sm-2 col-form-label'>
                  Street<span className='text-danger'>*</span>
                </label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    className={`form-control ${streetError ? "is-invalid" : ""}`}
                    id='Street'
                    value={street}
                    onChange={handleStreetChange}
                    onBlur={() => validateStreet(street)}
                    disabled={isChecked}
                    required
                  />
                  {streetError && <div className='invalid-feedback'>{streetError}</div>}
                </div>
              </div>

              <div className='row mb-sm-1 ms-sm-5'>
                <label htmlFor='City' className='col-sm-2 col-form-label'>
                  City<span className='text-danger'>*</span>
                </label>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    className={`form-control ${cityError ? "is-invalid" : ""}`}
                    id='City'
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      handleCityChange(e);
                    }}
                    onBlur={handleBlur}
                    disabled={isChecked}
                    required
                  />
                  {cityError && <div className='invalid-feedback'>{cityError}</div>}
                  <div className='outerdata' style={{ position: "relative" }}>
                    {showSuggestions && forNull && (
                      <div
                        className='form-control data'
                        style={{
                          position: "absolute",
                          zIndex: 10,
                          boxShadow: "0 0 8px rgba(1, 1, 1, 0.9)",
                        }}
                      >
                        {suggestions.map((suggestion, i) => (
                          <div
                            className='suggestionItems py-3'
                            onClick={() => onSuggestHandler(suggestion)}
                            key={i}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='row mb-sm-1 ms-sm-5'>
                <label htmlFor='State' className='col-sm-2 col-form-label'>
                  State<span className='text-danger'>*</span>
                </label>
                <div className='col-sm-4'>
                  {/* <input
                    placeholder="Select your state"
                    type="text"
                    className={`form-control ${stateError ? "is-invalid" : ""}`}
                    id="State"
                    value={state}
                    onClick={() => setShowStateSuggestions(true)}
                    onChange={handleStateChange}
                    onBlur={() => validateState(state)}
                    disabled={isChecked}
                    list="stateOptions" // This connects the input to the datalist
                    required
                  /> */}
                  <input
                    placeholder='Select your state'
                    type='text'
                    className={`form-control ${stateError ? "is-invalid" : ""}`}
                    id='State'
                    value={state}
                    onClick={() => setShowStateSuggestions(true)}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    onBlur={handleStateBlur}
                    disabled={isChecked}
                    list='stateOptions'
                    required
                  />
                  <div className='outerdata' style={{ position: "relative" }}>
                    {showStateSuggestions && (
                      <div
                        className='form-control data'
                        style={{
                          position: "absolute",
                          zIndex: 10,
                          maxHeight: "17.5rem", // Adjust height as needed
                          overflowY: "scroll",
                          boxShadow: "0 0 8px rgba(1, 1, 1, 0.9)",
                        }}
                      >
                        {allstatesforselect.map((stateObj, i) => (
                          <div
                            className='suggestionItems py-3'
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              onStateHandler(stateObj.name);
                            }}
                            key={stateObj.abbreviation}
                            style={{ padding: "8px", cursor: "pointer" }}
                          >
                            {stateObj.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {stateError && <div className='invalid-feedback'></div>}
                </div>
              </div>

              <hr />

              <div className='form-group mb-1 d-flex align-items-center justify-content-center'>
                <label htmlFor='DefaultLocation' className=' pt-1 pe-2'>
                  Autodetect Location<span className='text-danger'>*</span>
                </label>
                <div className='form-check ps-4'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='DefaultLocation'
                    checked={isChecked}
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                      validateCity("city");
                      validateState("state");
                      validateStreet("street");
                    }}
                  />
                  <label className='form-check-label' htmlFor='DefaultLocation'>
                    Current location
                  </label>
                </div>
              </div>

              <div className='text-center'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={submitFormData}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-search'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
                  </svg>{" "}
                  Search
                </button>
                <button
                  type='button'
                  className='btn btn-outline-secondary mx-2'
                  onClick={handleClear}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-list-nested'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5'
                    />
                  </svg>{" "}
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className='outputtabs'>
          <ul className='nav nav-pills justify-content-center my-3 mb-sm-5'>
            <li className='nav-item'>
              <a
                className={`nav-link ${activeTab === "results" ? "active" : ""}`}
                onClick={() => handleTabClick("results")}
                style={{ cursor: "pointer" }}
              >
                Results
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={`nav-link ${activeTab === "favorites" ? "active" : ""}`}
                onClick={() => handleTabClick("favorites")}
                style={{ cursor: "pointer" }}
              >
                Favorites
              </a>
            </li>
          </ul>

          {activeTab === "results" && (
            <>
              {formSubmitted ? (
                <div>
                  {!showDetails && <h4 className='text-center fs-4 '>Forecast at {formatedAddress}</h4>}
                  {!showDetails && (
                    <div className='detailstab d-flex justify-content-end align-items-center'>
                      {/* Star button */}
                      <button
                        onClick={handleStarClick}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "grey")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                        style={{
                          width: "2.5rem",
                          height: "2rem",
                          backgroundColor: "white",
                          border: "1px solid black",
                          borderRadius: "8px",
                          cursor: "pointer",
                          marginBottom: "0.9rem",
                          transition: "background-color 0.3s", // Smooth transition for hover
                        }}
                        aria-label='Star button'
                      >
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{
                            color: isStarClicked ? "yellow" : "white",
                            fontSize: "18px",
                            stroke: "black", // black border for the star
                            strokeWidth: 30,
                          }}
                        />
                      </button>
                      <p
                        onClick={handleToggleClick}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          textDecorationColor: "lightblue",
                        }}
                      >
                        {showDetails ? "List" : "Details"}
                      </p>
                      <FontAwesomeIcon
                        onClick={handleToggleClick}
                        icon={faChevronRight}
                        style={{
                          color: "black", // Set color to black to match the image
                          fontSize: "13px",
                          marginBottom: "0.9rem",
                          marginLeft: "0.3rem",
                          cursor: "pointer", // Adjust the size to match your design
                        }}
                      />
                    </div>
                  )}

                  {/* Slide Transition for List and Details */}
                  <div className='position-relative tab-container'>
                    {/* List Container */}
                    <div className={`list-container ${showDetails ? "slide-out d-none" : "slide-in"}`}>
                      <List
                        meto={inter}
                        data={formdata}
                        intervals={inter}
                        setDetails={onDateClick}
                        meteoData={meteoData}
                        lat={latitude ?? 0}
                        lng={longitude ?? 0}
                      />
                    </div>

                    {loading && (
                      <div className='progress my-3'>
                        <div
                          className='progress-bar progress-bar-striped progress-bar-animated'
                          role='progressbar'
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    )}

                    {/* Details Pane */}
                    {!loading && showDetails && (
                      <div className={`details-container ${showDetails ? "slide-out" : "slide-in"}`}>
                        <Details
                          formatedAddress={formatedAddress}
                          formd={JSON.stringify(formdata)}
                          data={details}
                          handleToggleClick={handleToggleClick}
                          lat={latitude ?? 0} // Provide default value 0 if latitude is undefined
                          lng={longitude ?? 0}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                noLocation && (
                  <div className='alert alert-danger text-center d-flex justify-content-start'>
                    An error occured. Please try again later{" "}
                  </div>
                )
              )}
            </>
          )}

          {activeTab === "favorites" && (
            <div>
              {favorites.length === 0 ? (
                <div className='alert alert-warning text-start' role='alert'>
                  Sorry. No records found.
                </div>
              ) : (
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>City</th>
                      <th scope='col'>State</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((favorite, index) => (
                      <tr key={favorite._id}>
                        <td>{index + 1}</td>
                        <td>
                          <span
                            onClick={() => handleFavoriteClick(favorite)}
                            style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
                          >
                            {favorite.city}
                          </span>
                        </td>
                        <td>{favorite.state}</td>
                        <td>
                          <button
                            onClick={() => deleteFavorite(favorite._id)}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              border: "none",
                              background: "none",
                            }}
                            aria-label='Delete'
                          >
                            <FontAwesomeIcon
                              onClick={handleToggleClick}
                              icon={faTrash}
                              style={{
                                color: "black", // Set color to black to match the image
                                fontSize: "1.2rem",
                                marginBottom: "0.9rem",
                                marginLeft: "0.3rem",
                                cursor: "pointer", // Adjust the size to match your design
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
