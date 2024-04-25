import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/userSlice/usersApiSlice';
import { logout } from '../../slices/userSlice/authSlice';
import { toast } from 'react-toastify';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
      toast.success('Logout successful!')
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <header className="bg-orange-900 p-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">USER</span>
        </div>

        {/* Hamburger menu icon */}
        <button className="lg:hidden text-white focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Dropdown menu for Profile and Login */}
        {menuOpen && (
          <div className="lg:hidden absolute right-0 top-full bg-white border rounded-md shadow-md mt-2 w-32">

            {userInfo ? (
              <>
                <Link to='/profile'>
                  <button className="block w-full text-left px-4 py-2 text-orange-900 hover:bg-blue-100 focus:outline-none">{userInfo.name}</button>
                </Link>
                <Link to='/login' >
                  <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-orange-900 hover:bg-blue-100 focus:outline-none">logout</button>
                </Link>
              </>
            )
              :
              (
                <>
                  <Link to='/profile'>
                    <button className="block w-full text-left px-4 py-2 text-orange-900 hover:bg-blue-100 focus:outline-none">Profile</button>
                  </Link>
                  <Link to='/login' >
                    <button className="block w-full text-left px-4 py-2 text-orange-900 hover:bg-blue-100 focus:outline-none">Login</button>
                  </Link>
                </>
              )
            }
          </div>
        )}

        {/* Profile and Login buttons for larger screens */}
        <div className="hidden lg:flex items-center">
          {
            userInfo ?
              (
                <>
                  <Link to='/profile'>
                    <button className="mr-4 flex items-center bg-white text-orange-900 px-3 py-1 rounded-md focus:outline-none">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16M4 12h16m-7 8h7"></path>
                      </svg>
                      <span>{userInfo.name}</span>
                    </button>
                  </Link>
                  <Link to='/logout' >
                    <button onClick={logoutHandler} className="flex items-center bg-white text-orange-900 px-3 py-1 rounded-md focus:outline-none">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <span>logout</span>
                    </button>
                  </Link>
                </>

              )
              :
              (
                <>
                  <Link to='/profile'>
                    <button className="mr-4 flex items-center bg-white text-orange-900 px-3 py-1 rounded-md focus:outline-none">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16M4 12h16m-7 8h7"></path>
                      </svg>
                      <span>Profile</span>
                    </button>
                  </Link>
                  <Link to='/login' >
                    <button className="flex items-center bg-white text-orange-900 px-3 py-1 rounded-md focus:outline-none">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <span>Login</span>
                    </button>
                  </Link>
                </>

              )}
        </div>
      </header>
    </>
  );
}

export default Header;
