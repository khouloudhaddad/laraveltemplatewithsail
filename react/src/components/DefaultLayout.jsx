import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axiosClient'
import { useEffect } from 'react'

const DefaultLayout = () => {

  const {user, token, setUser, setToken} = useStateContext()

  if(!token){
    return <Navigate to="/login" />
  }

  const onLogout = event =>{
    event.preventDefault()
    const payload = {
      user: user
    }
    axiosClient.post("/logout", payload)
    .then(()=>{
      setUser({})
      setToken(null)
    })
  }

  useEffect(()=>{
    axiosClient.get('/user')
    .then(({data})=>{
      setUser(data)
    })
  },[])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>

      <div className="content">
        <header>
          <div>Header</div>
          {user && user.name && 
            <div>
            {user.name}
            <a 
             href="#" 
             className='btn-logout'
             onClick={onLogout}
            >
             Logout
            </a>
            </div>
          }
          
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout