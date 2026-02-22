import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Router'
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <div>
        <RouterProvider router={routes}/>
        <Toaster/>
        
    </div>
  )
}

export default App