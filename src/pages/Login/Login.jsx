import { useState, useEffect } from 'react';
import InputField from '../../components/common/InputField'
import { useAuth } from '../../context/AuthContext';
import UniversalButton from '../../components/common/UniversalButton';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import Lottie from 'lottie-react'
import loginAnimation from "../../../public/animation/loginAnimation.json"
import boxAnimation from "../../../public/animation/boxanimate.json"


import toast from 'react-hot-toast';

const Login = () => {
    const { login } = useAuth();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [showPassword, setShowPassword] = useState(false)
    const [countdown, setCountdown] = useState(0);
    const [email, setEmail] = useState("");



    const validUsers = [
        { username: "admin", password: "admin123" },
        { username: "manager", password: "manager123" },
        { username: "user", password: "user123" }
    ];

    const validateCredentials = (username, password) => {
        return validUsers.some(
            (user) => user.username === username && user.password === password
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            return toast.error("Please enter both username and password");
        }
        if (!validateCredentials(username, password)) {
            return toast.error("Invalid username or password");
        }
        setLoading(true);
        login({ username, password });
        toast.success("Login Successful");
        setLoading(false);
    };

    // useEffect(() => {
    //     let timer;
    //     if (countdown > 0) {
    //         timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    //     } else {
    //         setIsBtnVisible(true);
    //         clearInterval(timer);
    //     }
    //     return () => clearInterval(timer);
    // }, [countdown]);

    // const validateEmail = (email) => {
    //     return /^[^\s@]+@gmail\.com$/.test(email);
    // };

    // const validatePassword = (pwd) => {
    //     return /^(?=.*[!@#$%^&*(),.?":{}|<>]).{1,8}$/.test(pwd);
    // };

    // const handleLogin = () => {
    //     if (!email || !password) {
    //         return toast.error("Enter email and password");
    //     }
    //     if (!validateEmail(email))
    //         return toast.error("Only verified Gmail addresses are allowed");
    //     if (!validatePassword(password))
    //         return toast.error(
    //             "Password must include special character and max 8 characters"
    //         );

    // };



    // return (
    //     <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
    //         <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden p-8 ">
    //             <form
    //                 onSubmit={handleSubmit}
    //                 className="space-y-5"
    //             >
    //                 <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Login</h2>
    //                 <InputField
    //                     label='Enter Username'
    //                     type="text"
    //                     placeholder="Username"
    //                     required
    //                     value={username}
    //                     onChange={(e) => setUsername(e.target.value)}
    //                     className="w-full p-2 border rounded text-md"

    //                 />
    //                 <div className="relative mb-4">
    //                     <InputField
    //                         id="password"
    //                         name="password"
    //                         label="Enter Password"
    //                         type={showPassword ? "text" : "password"}
    //                         required
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                         placeholder="Enter your password"
    //                         className="w-full p-2 border rounded text-md"
    //                     />
    //                     <span
    //                         className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
    //                         style={{ top: "32px" }}
    //                         onClick={() => setShowPassword(!showPassword)}
    //                     >
    //                         {showPassword ? (
    //                             <VisibilityOutlinedIcon />
    //                         ) : (
    //                             <VisibilityOffOutlinedIcon />
    //                         )}
    //                     </span>
    //                 </div>

    //                 <div className="flex items-center justify-center" >
    //                     <UniversalButton
    //                         label={loading ? "Logging in..." : "Login"}
    //                         variant="primary"
    //                         type="submit"
    //                         disabled={loading}
    //                     />
    //                 </div>
    //             </form>

    //         </div>

    //     </div>
    // );

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#7f9ac8] relative ">
            <div className="w-100 absolute left-30  bottom-10 ">
                <Lottie
                    autoplay
                    loop
                    animationData={boxAnimation}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
            <div className="flex items-center justify-center z-50 w-fit  rounded-2xl  ">
                <div className="flex justify-center items-center">
                    <div className="max-w-8xl h-[60vh] rounded-4xl shadow-xl grid grid-cols-2 overflow-hidden bg-gradient-to-br from-[#3a4faf] to-[#4283cf]  ">
                        <div className="flex justify-center items-center">
                            <div className="p-8 w-150 popf">
                                <>
                                    <form className="flex flex-col space-y-3  justify-center popf mt-2">
                                        <label className="text-md font-normal text-gray-50  ">
                                            Enter username
                                        </label>
                                        <div className="mb-4">
                                            <InputField
                                                type="text"
                                                placeholder="Enter Username"
                                                className="w-full p-2  rounded-md  text-gray-900 placeholder-gray-700 bg-gray-100 transition-all shadow-inner text-md"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <label className="text-md font-normal mb-4 text-gray-50 ">
                                            Enter Password
                                        </label>
                                        <div className="relative mb-4">
                                            <InputField
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter Password"
                                                className="w-full p-2  rounded-md  text-gray-900 placeholder-gray-700 bg-gray-100 transition-all shadow-inner text-md"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <span
                                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOutlinedIcon />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon />
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm  mb-6 text-gray-50 popf">
                                            <label className="flex items-center gap-1">
                                                <input type="checkbox" className="accent-blue-500" />
                                                Remember
                                            </label>
                                            {/* <button
                                                onClick={() => setStep(2)}
                                                className="hover:underline"
                                            >
                                                Forgotten?
                                            </button> */}
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                className="w-fit px-6 py-2 rounded-md bg-[#3a51b1] text-gray-50    font-semibold  text-xl transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                                                onClick={handleSubmit}
                                                disabled={loading}
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </>


                            </div>
                        </div>
                        <div className="w-full bg-gray-50 relative flex items-center justify-center">
                            <div className="absolute">

                                <Lottie
                                    animationData={loginAnimation}
                                    autoplay
                                    loop
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 absolute right-30 top-10">
                <Lottie
                    autoplay
                    loop
                    animationData={boxAnimation}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </div>
    );

};

export default Login;

