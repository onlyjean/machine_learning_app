import React from 'react'
import { Brand, Nav } from './components'
import { Footer } from './containers'


const App = () => {
  return (
    <div className='App'>
      <div className='gradient_bg'>
        < Nav />
      </div>
      < Brand />
      < Footer />
    </div>
  )
}

export default App

 