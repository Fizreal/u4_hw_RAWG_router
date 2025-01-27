import { useState, useEffect } from 'react'
import { API_KEY } from '../global'
import axios from 'axios'
import Search from '../components/Search'
import GameCard from '../components/GameCard'
import GenreCard from '../components/GenreCard'

const Home = () => {
  const [genres, setGenres] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searched, toggleSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getGenres = async () => {
    let response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    )
    setGenres(response.data.results)
  }
  useEffect(() => {
    getGenres()
  }, [])

  const getSearchResults = async (e) => {
    e.preventDefault()
    toggleSearched(true)
    let response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}`
    )
    setSearchResults(response.data.results)
    setSearchQuery('')
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <div className="search">
        <Search
          searchQuery={searchQuery}
          handleChange={handleChange}
          getSearchResults={getSearchResults}
        />
        {searched && searchResults.length ? (
          <div>
            <h2 className="title">Search Results</h2>
            <section className="search-results container-grid">
              {searchResults.map((result) => (
                <GameCard key={result.id} game={result} />
              ))}
            </section>
          </div>
        ) : null}
      </div>
      <div className="genres">
        <h2 className="title">Genres</h2>
        <section className="container-grid">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Home
