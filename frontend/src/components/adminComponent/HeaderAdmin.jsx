import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAdminLogoutMutation } from '../../slices/adminSlice/adminApiSlice'
import { adminLogout } from '../../slices/adminSlice/adminAuthSlice'

const HeaderAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logout] = useAdminLogoutMutation()
    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(adminLogout());
            navigate('/admin');

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <header className="bg-teal-600 p-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-white text-xl font-bold">ADMIN</span>
                </div>

                {/* Profile and Logout buttons */}
                <div className="hidden lg:flex items-center">
                    <Link to ='/admin/dashboard'>
                    <button className="mr-4 flex items-center bg-white text-teal-600 px-3 py-1 rounded-md focus:outline-none">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16M4 12h16m-7 8h7"></path>
                        </svg>
                        <span>Dashboard</span>
                    </button>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center bg-white text-teal-600 px-3 py-1 rounded-md focus:outline-none">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </header>
        </>
    )
}

export default HeaderAdmin