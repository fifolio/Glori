import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

// SERVICES
import { getUserMetaData } from '@/backend/services/user/getUser';
import { getStore } from '@/backend/services/store/getStore';
import { logout } from '@/backend/services/auth/logout';
import { getCartItems } from '@/backend/services/cart/getCartItems';
import { emptyCart } from '@/backend/services/cart/emptyCart';
import { getUserExtraMetaData } from '@/backend/services/user/getUserExtraMetaData';

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
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Loading from '../ui/loading';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';

// ICONS
import { CiSearch } from "react-icons/ci";
import { LuPackagePlus } from "react-icons/lu";
import { SlSettings } from "react-icons/sl";
import { CgLogOut } from "react-icons/cg";
import { RiShoppingCartLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaStoreAlt } from "react-icons/fa";
import { RiGalleryView2 } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FcCallback } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";

// STATES
import useUserState from '@/lib/states/userStates';
import useVerificationAlertState from '@/lib/states/verificationAlert';
import useUserId from '@/lib/states/userId';
import useCheckStoreState from '@/lib/states/userStoreState';
import useIsLiked from '@/lib/states/useIsLiked';
import useUpdateCart from '@/lib/states/useUpdateCart';



export default function Navbar() {

    // Set Public state for the user ID
    const { loggedinUserId, setLoggedinUserId } = useUserId(),
        [userID, setUserID] = useState<string>('');

    // Set isStoreValid State
    const { isStoreValid, setIsStoreValid } = useCheckStoreState();

    useEffect(() => {
        setUserID(loggedinUserId)
    }, [loggedinUserId])

    // Turn on/off the Loading Spinner while Logging-out
    const [logoutSpinner, setLogoutSpinner] = useState<boolean>(false),
        // Store the logged-in user meta data
        [userMetaData, setUserMetaData] = useState<Models.Preferences>({}),
        [userExtraMetaDetails, setUserExtraMetaDetails] = useState<Models.Preferences>({}),
        [isVerified, setIsVerified] = useState<boolean>(true),
        { isOpen, setIsOpen } = useVerificationAlertState();
    // Display the loading spinner while checking on User Store validation
    const [loadingStoreValidation, setLoadingStoreValidation] = useState<boolean>(true);

    // Check if user logged-in
    const { isLoggedin, setIsLoggedin } = useUserState();

    // Pass the Store ID to the Navlink (View Store / Update Board)
    const [storeID, setStoreID] = useState<string>('');

    const
        // Check on Cart State when ever user Add a new product to the cart
        { cartState, setCartState } = useUpdateCart(),
        [numOfCartItems, setNumOfCartItems] = useState<number | null>(null),
        [loadingEmptyCart, setLoadingEmptyCart] = useState<boolean>(false),
        [cartItems, setCartItems] = useState<any[] | null>([]),
        [cartItemsSum, setCartItemsSum] = useState<number>();

    // handle get cart items function
    async function handleGetCartItems() {
        try {
            const res = await getCartItems(loggedinUserId);

            setNumOfCartItems(res.total == 0 ? null : res.total);
            setCartItems(res.documents.length == 0 ? null : res.documents);

            // Initialize the total sum
            let collectTheSums = 0;

            // Loop through each cart item to calculate the sum
            for (let i = 0; i < res.documents.length; i++) {
                const item = res.documents[i];
                const sum = item.defaultPrice * item.quantity + (item.size === 50 ? 0 : item.size === 100 ? 50 : item.size === 200 ? 100 : 0);
                collectTheSums += sum;
            }

            // Set the total sum
            setCartItemsSum(collectTheSums);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    // handle empty cart items
    async function handleEmptyCart() {
        setLoadingEmptyCart(true)
        await emptyCart(loggedinUserId)
            .then((res) => {
                if (res === true) {
                    setCartItems(null)
                    setNumOfCartItems(null)
                    setCartState(!cartState)
                    toast.success('Deleted all Items in your cart successfully')
                    setLoadingEmptyCart(false)
                } else {
                    setLoadingEmptyCart(false)
                }
            })
    }

    useEffect(() => {
        handleGetCartItems();
    }, [cartState])


    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    // Get the current use Feedbacks to update them when user logged-out
    const { setIsLiked } = useIsLiked();

    // handle Logout func.
    async function handleLogout() {
        setLogoutSpinner(true)
        const res = await logout();
        if (res) {
            window.location.reload()
            setIsLoggedin(false)
            // setLogoutSpinner(false)
            setIsLiked(false)
        } else {
            console.log('Can not logout! something went wrong while logging out!');
        }
    }

    // Get the logged in user data
    async function getLoggedinUser() {
        const userMetaData = await getUserMetaData();
        if (userMetaData) {
            setUserMetaData(userMetaData);
            setLoggedinUserId(userMetaData.$id)
            if (userMetaData.emailVerification === false) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        } else {
            console.log('meta data not ready');
        }
    }

    // Get the Logged-in user data everytime component mount
    useEffect(() => {
        getLoggedinUser()
    }, [isLoggedin])


    // Check if user own a Store
    useEffect(() => {
        if (userID) {
            if (userID.length >= 5) {
                async function getUserPicture() {
                    await getUserExtraMetaData(userID)
                    .then((res) => {
                        setUserExtraMetaDetails(res)
                    })
                }

                async function checkStoreState() {
                    const res = await getStore(userID);
                    if (res.code === 404) {
                        setIsStoreValid(false)
                        setLoadingStoreValidation(false)
                    } else {
                        setStoreID(res.$id as string)
                        setIsStoreValid(true)
                        setLoadingStoreValidation(false)
                    }
                }
                checkStoreState();
                handleGetCartItems();
                getUserPicture();
            }
        }
    }, [isStoreValid, userID]);


    return (
        <div className="md:container container-fluid fixed min-w-full backdrop-blur-sm bg-white/90 z-50 ">

            {/* Verify Alert */}
            {isLoggedin === true && userMetaData.emailVerification === false ? (
                <AlertDialog open={isVerified && isOpen ? true : false}>
                    <AlertDialogContent>
                        <AlertDialogHeader className='w-full'>
                            <AlertDialogTitle className='mx-auto'>Verify Your Account</AlertDialogTitle>
                            <AlertDialogDescription className='text-center'>
                                <div>
                                    <img src="/images/verify.png" alt="verification.png" className="w-[300px] mx-auto my-4" />
                                </div>
                                <p>
                                    Your account is not verified yet. Please verify your account in the <span className='text-black'>settings</span> to access all features.
                                </p>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className='flex flex-row items-end space-x-3'>
                            <AlertDialogCancel onClick={() => setIsVerified(false)}>Remember me later</AlertDialogCancel>
                            <Link to="/verify" className="w-full">
                                <AlertDialogAction className="min-w-full" onClick={() => setIsVerified(false)}>Verify Now</AlertDialogAction>
                            </Link>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
                null
            )
            }

            <nav className="">
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
                                    {/* <NavigationMenuItem>
                                        <NavigationMenuTrigger className='bg-transparent'>Menu</NavigationMenuTrigger>
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
                                    </NavigationMenuItem> */}

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
                                                    {/* <p className="text-sm font-semibold">Discover</p>
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
                                                    
                                                    <DropdownMenuSeparator /> */}

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
                                                <CiSearch size="20px" />
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
                                <Button disabled={!isLoggedin} variant="outline">
                                    <RiShoppingCartLine />
                                    {numOfCartItems == 0 || numOfCartItems === null ?
                                        ''
                                        :
                                        (<span className="flex item-center bg-red-400 px-1 ml-2 text-xs text-white rounded-full">{numOfCartItems}</span>)}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 p-2">

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-md font-semibold">Cart</h3>
                                        <Button disabled={loadingEmptyCart} onClick={() => handleEmptyCart()} variant="ghost" size="sm"
                                            className={`${!cartItems ? 'hidden' : ''} text-red-500 hover:bg-red-100`}>
                                            {loadingEmptyCart ? (
                                                <Loading w={20} />
                                            ) : 'Empty Cart'}
                                        </Button>
                                    </div>
                                    {cartItems !== null ? (
                                        <div className="flex flex-col gap-4">
                                            <ScrollArea className="h-[150px] w-auto pr-4">
                                                {cartItems.map((item: any, i: number) => (
                                                    <Link key={i} to={`${window.location.origin}/perfumes/${item.productId[0].$id}`}>
                                                        <div key={i} className="flex items-center py-1 px-1 justify-between hover:bg-slate-100 rounded-md mb-1">
                                                            <div className="flex items-center gap-2">
                                                                <img src={item.productId[0].photos[0]} className="w-10 h-10 rounded-md" alt={item.productId.title} />
                                                                <div>
                                                                    <p className="font-medium text-sm">{item.productId[0].title}</p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {item.quantity} x ${item.defaultPrice} (Size: {item.size}ml)
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <p className="font-medium text-sm">${(item.defaultPrice * item.quantity + (item.size === 50 ? 0 : item.size === 100 ? 50 : item.size === 200 ? 100 : 0)).toFixed(2)}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </ScrollArea>
                                            <div className="flex items-center justify-between border-t pt-4 px-2">
                                                <p className="font-medium">Total</p>
                                                <p className="font-medium">${cartItemsSum}</p>
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

                        {/* Join Now -or- User Panel*/}
                        {isLoggedin ? (
                            <div>
                                <DropdownMenu>

                                    {/* My Account */}
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className='p-0 sm:mt-0 mt-1 items-center sm:shadow-sm shadow-none'>
                                            <div className="hidden sm:block">
                                                <span className={`${logoutSpinner ? 'hidden' : ''} capitalize px-3`}>
                                                    {userMetaData.name && userMetaData.name}
                                                </span>

                                                {/* Get the Loading spinner when logout */}
                                                <span className={`${logoutSpinner ? '' : 'hidden'} mx-5`}>
                                                    <Loading w={24} />
                                                </span>
                                            </div>

                                            <div className="block sm:hidden">
                                                <img src={userExtraMetaDetails.avatar} className='h-[35px] w-[35px] rounded-md shadow-sm' />
                                            </div>
                                        </Button>

                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-50">

                                        <div className="userLoggedin">

                                            <DropdownMenuLabel>Activities</DropdownMenuLabel>
                                            <DropdownMenuSeparator />

                                            <span className={loadingStoreValidation ? 'hidden' : ''}>
                                                <Link to="/sell" onClick={scrollTopFunc} className={isStoreValid ? '' : 'hidden'}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <LuPackagePlus className="mr-2" /> Sell Product
                                                    </DropdownMenuItem>
                                                </Link>

                                                <Link to="/cart" >
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <RiShoppingCartLine className="mr-2" /> Go to Cart
                                                    </DropdownMenuItem>
                                                </Link>
                                            </span>

                                            {/* Show Loading Span While Loading Store Validation */}
                                            <span className={loadingStoreValidation ? 'flex justify-center py-1' : 'hidden'}>
                                                <Loading w={20} />
                                            </span>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel>My Store</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <span className={loadingStoreValidation ? 'hidden' : ''}>

                                                    <div className={isStoreValid ? 'hidden' : ''}>
                                                        <Link to="/store/create" onClick={scrollTopFunc}>
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <FaStoreAlt className="mr-2" /> Create Store
                                                            </DropdownMenuItem>
                                                        </Link>
                                                    </div>

                                                    <div className={isStoreValid ? '' : 'hidden'}>
                                                        <Link to={`/store/${storeID}`} onClick={scrollTopFunc}>
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <RiGalleryView2 className="mr-2" /> View Store
                                                            </DropdownMenuItem>
                                                        </Link>

                                                        <Link to="/update" onClick={scrollTopFunc}>
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <FiEdit className="mr-2" /> Update board
                                                            </DropdownMenuItem>
                                                        </Link>
                                                    </div>
                                                </span>
                                                {/* Show Loading Span While Loading Store Validation */}
                                                <span className={loadingStoreValidation ? 'flex justify-center py-1' : 'hidden'}>
                                                    <Loading w={20} />
                                                </span>
                                            </DropdownMenuGroup>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <Link to="/settings" onClick={scrollTopFunc}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <SlSettings className="mr-2" /> Settings
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className='text-red-500 cursor-pointer' onClick={handleLogout}>
                                                <CgLogOut className="mr-2" /> Log out
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel>Need Help?</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>

                                                <Link to="/contact" onClick={scrollTopFunc}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <FcCallback className="mr-2" /> Contact Us
                                                    </DropdownMenuItem>
                                                </Link>

                                                <Link to="/about" onClick={scrollTopFunc}>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <FcAbout className="mr-2" /> About
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuGroup>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="font-semibold">Join Now</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[400px]">
                                        <Auth />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}


                    </div>
                </div>
            </nav >
        </div >
    )
}
