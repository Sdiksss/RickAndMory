import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import axios from 'axios'
import LocationCards from './components/LocationCards'
import ResidentCard from './components/ResidentCard'

function App() {
const locationId = getRandomNumber(126)
const [inputValue, setInputValue] = useState(locationId)
const url = `https://rickandmortyapi.com/api/location/${inputValue}`
console.log('URL:', url)
const [location, getLocation, hasError] = useFetch(url)


useEffect( () => {
  getLocation()
}, [inputValue])

 const inputLocation = useRef()

 const handleSubmit = e => {
  e.preventDefault()
  setInputValue(inputLocation.current.value)

 }


  return (
    <div>
      <h1 className='h1_title'>RICK AND MORTY</h1>
      <img className='img_header' src='RICK_MORTY_BILLBOARD_72.jpg'></img>
      <form className='buscador' onSubmit={handleSubmit}>
        <input className="search" ref={inputLocation} type='text'/>
        <button className='search_button'> Search</button>
      </form>
      {
        hasError
          ? <h2>Hey! you must provide and id from 1 to 126</h2>
          : (<>
            <LocationCards
      location = {location}
      />


      <div className="resident__container">
        {
          location?.residents.map( url  =>  (
            <ResidentCard
            key={url}
            url={url}
            
            />
            )  )
        }
      </div>
          </>)
      }
      
    </div>
  )
}

export default App
