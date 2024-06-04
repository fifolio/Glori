import { useState } from 'react'
import { Link } from 'react-router-dom'

// Components
import Auth from '@/components/auth/Auth'

// UI
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

// ICONS
import { CiSearch } from "react-icons/ci";
import { LuPackagePlus } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";
import { CgLogOut } from "react-icons/cg";
import { RiShoppingCartLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi2";



export default function Navbar() {


    // Check if user logged-in
    const [isUserLoggedIn] = useState<boolean>(true)

    // Fake Products items for cart
    const cartItems = [{
        id: 1,
        name: "Cozy Blanket",
        price: 29.99,
        quantity: 1,
    },
    {
        id: 2,
        name: "Autumn Mug",
        price: 12.99,
        quantity: 2,
    },
    {
        id: 3,
        name: "Fall Fragrance Candle",
        price: 16.99,
        quantity: 1,
    },
    {
        id: 2,
        name: "Autumn Mug",
        price: 12.99,
        quantity: 2,
    },
    {
        id: 3,
        name: "Fall Fragrance Candle",
        price: 16.99,
        quantity: 1,
    }];


    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    return (
        <div className="md:container container-fluid fixed min-w-full bg-white z-50">
            <nav>
                <div className="max-w-screen-xl flex flex-row justify-between mx-auto px-4 py-3">

                    {/* Logo + Main section */}
                    <div className="flex items-center">
                        {/* Logo */}
                        <Link onClick={scrollTopFunc} to="/" className="mr-3 w-8">
                            <img src="/images/logo.png" className="w-full" alt="Glori" />
                        </Link>

                        {/* Main sections */}
                        <div className='hidden lg:block'>
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {/* Discover section */}
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className='bg-transparent'>Discover</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                <li className="row-span-3 ">
                                                    <img src="/images/dicover-img.jpg" className='w-full h-full mb-0 pb-0 rounded-md' />
                                                    <NavigationMenuLink asChild>
                                                        <Link onClick={scrollTopFunc}
                                                            className="flex select-none mt-[-180px] flex-col justify-end p-6 no-underline outline-none focus:shadow-md"
                                                            to="/discover"
                                                        >
                                                            <div className="mb-2 mt-4 text-lg font-bold text-white">
                                                                Discover Perfumes
                                                            </div>
                                                            <p className="text-sm leading-tight text-white">
                                                                Explore our extensive range of luxurious perfumes
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <Link onClick={scrollTopFunc} to="/explore">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Explore Brands</span>
                                                        <p className="text-sm text-muted-foreground">Dive into the world of renowned perfume brands we showcase</p>
                                                    </li>
                                                </Link>
                                                <Link onClick={scrollTopFunc} to="/collections">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Browse Collections</span>
                                                        <p className="text-sm text-muted-foreground">Explore curated collections tailored to your preferences</p>
                                                    </li>
                                                </Link>
                                                <Link onClick={scrollTopFunc} to="/deals">
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
                                                <Link onClick={scrollTopFunc} to="/collections/luxury">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Luxury Classics</span>
                                                        <p className="text-sm text-muted-foreground min-w-full">Sophisticated fragrances that never go out of style</p>
                                                    </li>
                                                </Link>
                                                <Link onClick={scrollTopFunc} to="/collections/fresh">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Fresh & Clean</span>
                                                        <p className="text-sm text-muted-foreground">Revitalizing scents for a refreshing aura</p>
                                                    </li>
                                                </Link>
                                                <Link onClick={scrollTopFunc} to="/collections/warm">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Warm & Spicy</span>
                                                        <p className="text-sm text-muted-foreground">Captivating fragrances with a hint of spice</p>
                                                    </li>
                                                </Link>
                                                <Link onClick={scrollTopFunc} to="/collections/unisex">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Unisex Delights</span>
                                                        <p className="text-sm text-muted-foreground">Versatile and alluring fragrances suitable for everyone</p>
                                                    </li>
                                                </Link>
                                                <Link onClick={scrollTopFunc} to="/collections/florals">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Sensual Florals</span>
                                                        <p className="text-sm text-muted-foreground">Enchanting and romantic scents that captivate the senses</p>
                                                    </li>
                                                </Link>
                                                <Link onClick={scrollTopFunc} to="/collections/limited">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Limited Editions</span>
                                                        <p className="text-sm text-muted-foreground">Exclusive and unique scents for discerning connoisseurs</p>
                                                    </li>
                                                </Link>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    {/* About section */}
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className='bg-transparent'>About</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                <Link onClick={scrollTopFunc} to="https://github.com/fifolio/Glori" target="_blank">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">Github Repository</span>
                                                        <p className="text-sm text-muted-foreground min-w-full">Sophisticated fragrances that never go out of style</p>
                                                    </li>
                                                </Link>
                                                <Link onClick={scrollTopFunc} to="/about">
                                                    <li className='hover:bg-gray-100 p-3 rounded-md'>
                                                        <span className="text-sm font-semibold">About</span>
                                                        <p className="text-sm text-muted-foreground min-w-full">Sophisticated fragrances that never go out of style</p>
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
                                                    {/* <img src='images/search-img.png' className='w-full rounded-md' /> */}
                                                    <h4 className="font-medium leading-none">Find Your Perfect Scent</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Enter the name of a perfume or a keyword related to your search. For instance, "Chanel No. 5"
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        <Input placeholder='Search for products' className='mb-1 focus-visible:ring-0' />
                                                        <i className="text-xs float-right">Hit "Enter / Return" to see results</i>
                                                    </p>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        {/* Mobile Main sections */}
                        <div className='lg:hidden xs:hidden'>
                            <NavigationMenu>
                                <NavigationMenuList>

                                    {/* Hamburger Menu section */}
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className='bg-transparent'>Menu</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ScrollArea className="h-[350px] w-[200px] p-2">
                                                <ul className="grid gap-1 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                    <p className="text-sm font-semibold">Discover</p>
                                                    <Link onClick={scrollTopFunc} to="/discover">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Discover Perfumes</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/explore">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Explore Brands</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/collections">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Browse Collections</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/deals">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Find Deals</span>
                                                        </li>
                                                    </Link>

                                                    <DropdownMenuSeparator />
                                                    <p className="text-sm font-semibold">Collections</p>
                                                    <Link onClick={scrollTopFunc} to="/collections/luxury">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Luxury Classics</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/collections/fresh">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Fresh & Clean</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/collections/warm">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Warm & Spicy</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/collections/unisex">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Unisex Delights</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/collections/florals">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Sensual Florals</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/collections/limited">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Limited Editions</span>
                                                        </li>
                                                    </Link>

                                                    <DropdownMenuSeparator />
                                                    <p className="text-sm font-semibold">More</p>
                                                    <Link onClick={scrollTopFunc} to="https://github.com/fifolio/Glori" target="_blank">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">Github Repository</span>
                                                        </li>
                                                    </Link>
                                                    <Link onClick={scrollTopFunc} to="/about">
                                                        <li className='hover:bg-gray-100 hover:font-semibold py-2 px-3 rounded-md'>
                                                            <span className="text-sm">About</span>
                                                        </li>
                                                    </Link>
                                                </ul>
                                            </ScrollArea>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    {/* Search section */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="text-slate-500 border-0 shadow-none pr-5 bg-transparent">
                                                <CiSearch size="20px" className="mr-2" />
                                                Find
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="grid gap-4">
                                                <div className="space-y-3">
                                                    {/* <img src='images/search-img.png' className='w-full rounded-md' /> */}
                                                    <h4 className="font-medium leading-none">Find Your Perfect Scent</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Enter the name of a perfume or a keyword related to your search. For instance, "Chanel No. 5"
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        <Input placeholder='Search for products' className='mb-1 focus-visible:ring-0' />
                                                        <i className="text-xs float-right">Hit "Enter / Return" to see results</i>
                                                    </p>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>


                    {/* User section */}
                    <div className="flex items-center space-x-3">

                        {/* Cart */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <RiShoppingCartLine />
                                    {/* <span className="flex item-center bg-red-400 px-1 mx-1 text-xs text-white rounded-full">1 </span> */}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 p-3">

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-md font-semibold">Cart</h3>
                                        <Button variant="ghost" size="sm" // onClick={} // handleEmptyCart
                                            className={`${!cartItems ? 'hidden' : ''} text-red-500 hover:bg-red-100`}>Empty Cart</Button>
                                    </div>
                                    {cartItems ? (
                                        <div className="flex flex-col gap-4">
                                            <ScrollArea className="h-[150px] w-auto pr-4">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="flex items-center py-1 justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-800" />
                                                            <div>
                                                                <p className="font-medium text-sm">{item.name}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {item.quantity} x ${item.price}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                ))}
                                            </ScrollArea>
                                            <div className="flex items-center justify-between border-t pt-4">
                                                <p className="font-medium">Total</p>
                                                <p className="font-medium">$23</p>
                                            </div>
                                            <div className="flex w-full">
                                                <Link to="/cart" onClick={scrollTopFunc} className='w-full text-center bg-gray-950 hover:bg-gray-900 shadow-md rounded-md text-white py-2 text-sm'>View Cart</Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pb-5 gap-2">
                                            <HiOutlineShoppingCart className="w-12 h-12 text-gray-400" />
                                            <p className="text-gray-500 text-sm">Your cart is empty</p>
                                        </div>
                                    )}
                                </div>
                            </DropdownMenuContent>

                        </DropdownMenu>

                        {/* Join Now */}
                        <div className={isUserLoggedIn ? 'hidden' : ''}>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="font-semibold">Join Now</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[400px]">
                                    <Auth />
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* User Panel */}
                        <div className={isUserLoggedIn ? '' : 'hidden'}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">User Name</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-50">
                                    <div className="userLoggedin">
                                        <DropdownMenuLabel>Activities</DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        <Link to="/sell" onClick={scrollTopFunc}>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <LuPackagePlus className="mr-2" /> Sell Product
                                            </DropdownMenuItem>
                                        </Link>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>

                                            <Link to="/store/id" onClick={scrollTopFunc}>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <CgProfile className="mr-2" /> My Store
                                                </DropdownMenuItem>
                                            </Link>

                                            <Link to="/settings" onClick={scrollTopFunc}>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <SlSettings className="mr-2" /> Settings
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <CgLogOut className="mr-2" /> Log out
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>


                    </div>
                </div>
            </nav>
        </div>
    )
}
