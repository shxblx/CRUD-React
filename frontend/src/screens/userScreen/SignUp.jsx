import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../slices/userSlice/usersApiSlice';
import Loader from '../../components/userComponent/Loader';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/userSlice/authSlice';
import Header from '../../components/userComponent/Header';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (userInfo) {
            navigate('/home')
        }
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }))
                navigate('/home')
                toast.success('Signed In')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }

        }

    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen">
                <div className="w-full p-4 lg:w-1/4">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">SIGN UP</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">Username</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-3 block w-full appearance-none" type="text" />
                        </div>
                        <div className="mt-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">Email Address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-3 block w-full appearance-none" type="email" />
                        </div>
                        <div className="mt-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-3 px-3 block w-full appearance-none" type="password" />
                        </div>
                        <div className="mt-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">Confirm Password</label>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-3 block w-full appearance-none" type="password" />
                        </div>
                        <div className="mt-4">
                            <button type='submit' className="bg-orange-900 text-white font-bold py-2 px-4 w-full rounded hover:bg-orange-800">SignUp</button>
                        </div>
                    </form>
                    <div className="mt-2 flex items-center justify-between">
                        <Link to='/'>
                            <span className="border-b w-1/5 md:w-1/4">Already registered? </span>
                            <span className="text-xs underline text-red-500 uppercase">Login</span>
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </Link>
                    </div>
                    {isLoading && <Loader />}
                </div>
            </div>
        </>
    );
};

export default SignUp;
