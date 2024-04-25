import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/userSlice/usersApiSlice';
import { setCredentials } from '../../slices/userSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/userComponent/Loader';
import Header from '../../components/userComponent/Header';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/home');
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/home');
            toast.success('Logged In');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen">
                <div className="w-full p-8 lg:w-1/4">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">LOGIN</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            </div>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
                        </div>

                        <div className="mt-8">
                            <button type='submit' className="bg-orange-900 text-white font-bold py-2 px-4 w-full rounded hover:bg-orange-800">Login</button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <Link to='/signup'>
                                <span className="border-b w-1/5 md:w-1/4">Not registered? </span>
                                <span className="text-xs underline text-red-500 uppercase">Sign up</span>
                            </Link>
                        </div>
                        {isLoading && <Loader />}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
