import { useStateContext } from '../contexts/ContextProvider'
import { Navigate, Outlet } from 'react-router-dom'

const GuestLayout = () => {
  const {token} = useStateContext()
  if(token){
    return <Navigate to='/users' />
  }
  
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default GuestLayout