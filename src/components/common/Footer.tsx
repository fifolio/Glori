// UI
import { Link } from 'react-router-dom'

// ICON
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="bg-black">

            <footer className="container py-6 text-white">

                <div className="mx-auto flex flex-col lg:flex-row items-center justify-between px-4 md:px-6 mt-5 mb-10">

                    <div className="flex items-center">
                        <div className="info lg:text-start w-full text-sm">
                            <ul>
                                <li className="mb-5 max-w-fit">
                                    <Link to="/">
                                        <img src="images/logo.png" className="h-10 w-10 bg-white rounded-full p-1" />
                                    </Link>
                                </li>
                                <li className="text-gray-400">
                                    Address
                                </li>
                                <li>
                                    Level 32, 5 Sample St, Sydney NSW 6080
                                </li>

                                <br />

                                <li className="text-gray-400">
                                    Contact
                                </li>
                                <li>
                                    <Link to="mail:firasdabbabi@gmail.com">
                                        contact@glori.com
                                    </Link>
                                </li>
                                <li>
                                    +2830 133 4367
                                </li>

                                <br />

                                <li className="text-gray-400 lg:text-start text-center">
                                    <div className="flex space-x-4 text-sm my-3 lg:my-auto">
                                        <Link className="text-gray-400 hover:text-white" target="_blank" to="https://www.linkedin.com/in/fifolio/">
                                            <FaLinkedin className="h-7 w-7" />
                                        </Link>
                                        <Link className="text-gray-400 hover:text-white" target="_blank" to="https://github.com/fifolio/Glori">
                                            <FaGithub className="h-7 w-7" />
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex text-sm lg:justify-end justify-center lg:mt-[-50px] mt-5 w-full nav-links">

                        <ul className="mr-5">
                            <li className="text-gray-200 mb-1">Pay via</li>

                            <li className="text-gray-400 hover:text-white mb-2">
                                <img className="h-6 w-auto" src="https://static-00.iconduck.com/assets.00/visa-icon-2048x1313-o6hi8q5l.png" />
                            </li>
                            <li className="text-gray-400 hover:text-white mb-2">
                                <img className="h-6 w-auto" src="https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1225-3kb6axel.png" />
                            </li>
                            <li className="text-gray-400 hover:text-white mb-2">
                                <img className="h-6 w-auto" src="https://static-00.iconduck.com/assets.00/paypal-icon-2048x1286-ha8kzb8k.png" />
                            </li>
                        </ul>
                        <ul className="mr-3">
                            <li className="text-gray-200">Discover</li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Discover Perfumes</Link></li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Explore Brands</Link></li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Browse Collections</Link></li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Find Deals</Link></li>
                        </ul>
                        <ul className="mr-3">
                            <li className="text-gray-200">Collections</li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Luxury Classics</Link></li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Warm & Spicy</Link></li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Sensual Florals</Link></li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Fresh & Clean</Link></li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Unisex Delights</Link></li>
                            <li className="text-gray-400 hover:text-white"><Link to="/">Limited Editions</Link></li>
                        </ul>


                    </div>

                </div>


                <div className="mx-auto flex flex-col lg:flex-row items-center justify-between px-4 md:px-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold">Glori Perfumes</span>
                        <span className="text-sm">© {new Date().getFullYear()} Glori. All rights reserved.</span>
                    </div>


                    <div className="flex space-x-4 text-sm my-3 lg:my-auto">
                        <Link className="text-gray-400 hover:text-white" to="#">
                            Privacy Policy
                        </Link>
                        <Link className="text-gray-400 hover:text-white" to="#">
                            Terms of Service
                        </Link>
                        <Link className="text-gray-400 hover:text-white" to="#">
                            Cookies Settings
                        </Link>
                    </div>
                </div>
                
            </footer>
        </div>
    )
}