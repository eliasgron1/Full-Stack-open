import { useEffect, useState } from "react";
import countriesService from "./services/countries";

const App = () => {

  //STATES
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  //EVENT HANDLERS
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  //HOOKS
  useEffect(() => {
    countriesService.getAll()
      .then(response => {
        setCountries(response)
        console.log(response)
      })
  }, [])

  //FUNCTIONS
  const searchCountry = (event) => {
    event.preventDefault()
    console.log("search submitted: ", search)
    setCountriesToShow(
      countries.filter(country =>
        country.name.common.toUpperCase().includes(search.toUpperCase())
      )
    )

    // countriesService.
    //   getByName(search)
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //       console.log("error fetching country")
    //     })
  }

  countriesToShow.length
  return (
    <div>
      <h1>
        Search Countries
      </h1>
      <Search
        handleSearchChange={handleSearchChange}
        search={search}
        searchCountry={searchCountry}
      />
      <div>
        <Countries
          setCountriesToShow={setCountriesToShow}
          countriesToShow={countriesToShow}
        />
      </div>
    </div>
  )
}


// COMPONENTS
const Search = ({ searchCountry, search, handleSearchChange }) => {
  return (
    <form
      onSubmit={searchCountry}
    >
      <p>
        search:
      </p>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
      />
      <button
        type="submit"
      >
        search
      </button>

    </form>
  )
}

const Countries = ({ countriesToShow, setCountriesToShow }) => {
  console.log("countriesToShow arr length: ", countriesToShow.length)

  if (countriesToShow.length === 1) {
    return (
      <CountryPage
        country={countriesToShow[0]}
      />
    )
  }
  else if (countriesToShow.length <= 10) {
    return (
      <div>
        {countriesToShow.map(country =>
          <CountryLine
            setCountriesToShow={setCountriesToShow}
            country={country}
            key={country.name.common}
          />
        )}
      </div>
    )
  }
  else {
    return (
      <div>
        Too many countries to show :C
      </div>
    )
  }
}

const CountryLine = ({ country, setCountriesToShow }) => {
  console.log("country is: ", country)
  return (
    <li>
      {country.name.common}
      <button
        onClick={() => { setCountriesToShow([country]), console.log("showing ", country) }}
      >
        show
      </button>
    </li>
  )
}

const CountryPage = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (country && country.latlng && country.latlng.length === 2) {
      countriesService.
        getCapitalWeather(country.latlng[0], country.latlng[1])
        .then(response => {
          console.log(response)
          setWeather(response)
        })
        .catch(error => {
          console.log("error fetching weather for ", country.latlng[0], country.latlng[1])
        })
    }
  }, [country])

  return (
    <div>
      <div>
        <h2>{country.name.common}</h2>
        <p>region: {country.subregion}</p>

        <p>currencies: </p>
        {Object.values(country.currencies).map((currency) => (
          <li key={currency.name}>{currency.name} ({currency.symbol})</li>
        ))}
      </div>

      <div>
        <h3>languages</h3>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </div>

      <div>
        <img src={country.flags.png} alt="flag" />
        <Weather
          weather={weather}
        />
      </div>
    </div>
  )
}

const Weather = ({ weather }) => {
  console.log(weather)
  if (!weather || !weather.main) {
    return <p>Loading weather data...</p>
  }
  return (
    <div>
      <h3>Weather</h3>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Feels like: {weather.main.feels_like}°C</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather image" />
    </div>
  )
}

export default App