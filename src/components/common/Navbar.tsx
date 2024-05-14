import { Link } from 'react-router-dom'

// UI
import { Input } from '@/components/ui/input';
import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    NavigationMenu,
    NavigationMenuContent,
    // NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


// ICONS
import { CiSearch } from "react-icons/ci";


export default function Navbar() {
    return (
        <div className="container-fluid bg-white">
            <nav>
                <div className="max-w-screen-xl flex flex-row justify-between mx-auto px-4 py-2">
                    {/* Logo section */}
                    <div className="flex items-center space-x-3">
                        <Link to="/">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="w-18" alt="Glori" />
                        </Link>
                    </div>

                    {/* Main sections */}
                    <div className='flex items-center space-x-3'>
                        <NavigationMenu>
                            <NavigationMenuList>
                                {/* Discover section */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className='bg-transparent'>Discover</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3 ">
                                                    <img src="/src/assets/images/dicover-img.jpg" className='w-full h-full mb-0 pb-0 rounded-md'/>
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex select-none mt-[-180px] flex-col justify-end p-6 no-underline outline-none focus:shadow-md"
                                                        href="/"
                                                    >
                                                        <div className="mb-2 mt-4 text-lg font-bold text-white">
                                                            Discover Perfumes
                                                        </div>
                                                        <p className="text-sm leading-tight text-white">
                                                            Explore our extensive range of luxurious perfumes
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Explore Brands</span>
                                                    <p className="text-sm text-muted-foreground">Dive into the world of renowned perfume brands we showcase</p>
                                                </li>
                                            </Link>
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Browse Collections</span>
                                                    <p className="text-sm text-muted-foreground">Explore curated collections tailored to your preferences</p>
                                                </li>
                                            </Link>
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Find Deals</span>
                                                    <p className="text-sm text-muted-foreground">Unlock special offers and exclusive discounts on premium perfumes</p>
                                                </li>
                                            </Link>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* Explore section */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className='bg-transparent'>Explore Collections</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Luxury Classics</span>
                                                    <p className="text-sm text-muted-foreground min-w-full">Sophisticated fragrances that never go out of style</p>
                                                </li>
                                            </Link>
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Fresh & Clean</span>
                                                    <p className="text-sm text-muted-foreground">Revitalizing scents for a refreshing aura</p>
                                                </li>
                                            </Link>
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Warm & Spicy</span>
                                                    <p className="text-sm text-muted-foreground">Captivating fragrances with a hint of spice</p>
                                                </li>
                                            </Link>
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Unisex Delights</span>
                                                    <p className="text-sm text-muted-foreground">Versatile and alluring fragrances suitable for everyone</p>
                                                </li>
                                            </Link>
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Sensual Florals</span>
                                                    <p className="text-sm text-muted-foreground">Enchanting and romantic scents that captivate the senses</p>
                                                </li>
                                            </Link>
                                            <Link to="#">
                                                <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                    <span className="text-sm font-semibold">Limited Editions</span>
                                                    <p className="text-sm text-muted-foreground">Exclusive and unique scents for discerning connoisseurs</p>
                                                </li>
                                            </Link>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* Search section */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="text-slate-500 border-0 shadow-none pr-5 bg-transparent">
                                            <CiSearch size="20px" className="mr-2" />
                                            Find Perfumes
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-3">
                                                <img src='/src/assets/images/search-img.png' className='w-full rounded-md' />
                                                <h4 className="font-medium leading-none">Find Your Perfect Scent</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Enter the name of a perfume or a keyword related to your search. For instance, "Chanel No. 5"
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    <Input placeholder='Search for products...' className='mb-1 focus-visible:ring-0' />
                                                    <i className="text-xs float-right">Hit "Enter / Return" to see results</i>
                                                </p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* User section */}
                    <div className="flex items-center space-x-3">
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                        </button>

                        {/* <!-- Dropdown menu --> */}
                        {/* <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button> */}
                    </div>

                </div>
            </nav>

        </div>
    )
}
