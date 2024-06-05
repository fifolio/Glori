// UI
import { Link } from 'react-router-dom'

// ICON
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Footer() {

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    return (
        <footer className="container py-6 bg-black text-white xl:rounded-t-xl">

            <div className="mx-auto flex flex-col lg:flex-row items-center justify-between px-4 md:px-6 mt-5 mb-10">

                <div className="flex items-center">
                    <div className="info lg:text-start w-full text-sm">
                        <ul>
                            <li className="mb-5 max-w-fit">
                                <Link onClick={scrollTopFunc} to="/">
                                    <img src="/images/logo.png" className="h-10 w-10 bg-white rounded-full p-1" />
                                </Link>
                            </li>
                            <li className="text-gray-400">
                                Address
                            </li>
                            <li>
                                123 Perfume Lane, Fragrance City, SC 12345
                            </li>

                            <br />

                            <li className="text-gray-400">
                                Contact
                            </li>
                            <li>
                                <Link onClick={scrollTopFunc} to="mail:firasdabbabi@gmail.com">
                                    contact@glori.com
                                </Link>
                            </li>
                            <li>
                                +2830 133 4367
                            </li>

                            <br />

                            <li className="text-gray-400 lg:text-start text-center">
                                <div className="flex space-x-4 text-sm my-3 lg:my-auto">
                                    <Link onClick={scrollTopFunc} className="text-gray-400 hover:text-white" target="_blank" to="https://www.linkedin.com/in/fifolio/">
                                        <FaLinkedin className="h-7 w-7" />
                                    </Link>
                                    <Link onClick={scrollTopFunc} className="text-gray-400 hover:text-white" target="_blank" to="https://github.com/fifolio/Glori">
                                        <FaGithub className="h-7 w-7" />
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex text-sm lg:justify-end justify-evenly lg:mt-[-50px] mt-5 w-full nav-links">

                    <ul className="mr-5">
                        <li className="text-gray-200 mb-1">Pay via</li>

                        <li className="text-gray-400 hover:text-white mb-1">
                            <img className="h-9 w-auto" src="https://www.iconarchive.com/download/i76280/designbolts/credit-card-payment/Visa.ico" />
                        </li>
                        <li className="text-gray-400 hover:text-white mb-3">
                            <img className="h-6 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" />
                        </li>
                        <li className="text-gray-400 hover:text-white mb-2">
                            <img className="h-4 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/1200px-PayPal_logo.svg.png" />
                        </li>
                    </ul>
                    {/* <ul className="mr-3">
                        <li className="text-gray-200">Discover</li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/discover">Perfumes</Link></li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/explore">Brands</Link></li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/collections">Collections</Link></li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/deal">Find Deals</Link></li>
                    </ul> */}
                    <ul className="mr-3">
                        <li className="text-gray-200">Collections</li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/collections/luxury">Luxury Classics</Link></li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/collections/warm">Warm & Spicy</Link></li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/collections/florals">Sensual Florals</Link></li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/collections/fresh">Fresh & Clean</Link></li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/collections/unisex">Unisex Delights</Link></li>
                        <li className="text-gray-400 hover:text-white"><Link onClick={scrollTopFunc} to="/collections/limited">Limited Editions</Link></li>
                    </ul>


                </div>

            </div>


            <div className="mx-auto flex flex-col lg:flex-row items-center justify-between px-4 md:px-6 mt-5">
                <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">Glorious</span>
                    <span className="text-sm">© {new Date().getFullYear()} All rights reserved</span>
                </div>


                <div className="flex items-center text-center justify-center space-x-4 text-xs my-3 lg:my-auto">
                    <Link onClick={scrollTopFunc} className="text-gray-400 hover:text-white" to="/policies#Privacy">
                        Privacy Policy
                    </Link>
                    <Link onClick={scrollTopFunc} className="text-gray-400 hover:text-white" to="/policies#Privacy">
                        Terms of Service
                    </Link>
                    <Link onClick={scrollTopFunc} className="text-gray-400 hover:text-white" to="/policies#Privacy">
                        Cookies Settings
                    </Link>
                </div>
            </div>

        </footer>
    )
}