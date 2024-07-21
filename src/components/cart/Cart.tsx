import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

// UI
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select, SelectGroup } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Loading, { LoadingScreen } from '../ui/loading';
import { toast } from 'sonner';
import { Label } from '../ui/label';

// ICONS
import { IoIosMore } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { PiPlusMinusBold } from "react-icons/pi";
import { MdOutlineViewCarousel } from "react-icons/md";

// STATES
import useUserId from '@/lib/states/userId';
import useUpdateCart from '@/lib/states/useUpdateCart';

// SERVICES
import { getCartItems } from '@/backend/services/cart/getCartItems';
import { deleteCartItem } from '@/backend/services/cart/deleteCartItem';
import { adjustCartItem } from '@/backend/services/cart/adjustCartItem';
import { getShoppingDetails } from '@/backend/services/user/shoppingDetails';
import { handleDeleteAllCartItems } from '@/backend/services/cart/deleteAllCartItems';

interface ItemData {
    itemId: string;
    itemTitle: string;
    itemSize: string;
    itemQuantity: string;
}

interface ShoppingDetails {
    nameOnCard: string,
    cardNumber: string,
    expYear: string,
    expMonth: string,
    cvc: string
}

export default function Cart() {

    const
        { loggedinUserId } = useUserId(),
        { cartState, setCartState } = useUpdateCart(),
        [loadingScreen, setLoadingScreen] = useState<boolean>(true),
        [loadingAdjusting, setLoadingAdjusting] = useState<boolean>(false),
        [loadingPaynow, setLoadingPaynow] = useState<boolean>(false),
        [successfulPaid, setSuccessfulPaid] = useState<boolean>(false),
        [cartItems, setCartItems] = useState<any[] | null>([]),
        [shoppingDetails, setShoppingDetails] = useState<ShoppingDetails>({
            nameOnCard: '',
            cardNumber: '',
            expYear: '',
            expMonth: '',
            cvc: ''
        }),
        [numOfCartItems, setNumOfCartItems] = useState<number | null>(null),
        [cartItemsSum, setCartItemsSum] = useState<number>(),
        [isAdjustSizeDialogOpen, setIsAdjustSizeDialogOpen] = useState<boolean>(false),
        [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState<boolean>(false);

    // Collect item data to be adjusted
    const [itemDataToAdjust, setItemDataToAdjust] = useState<ItemData | null>({
        itemId: '',
        itemTitle: '',
        itemSize: '',
        itemQuantity: ''
    });

    const shipping: number = 24.55;
    const taxs: number = 14.09;


    // Update the page title
    document.title = `Glori | My Cart`;

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    // Handle Copy product Link
    function handleCopyPerfumeLink(perfumeId: string) {
        // const linkElement = document.getElementById("perfumeLink") as HTMLInputElement;
        const value = `${window.location.origin}/perfumes/${perfumeId}`;
        navigator.clipboard.writeText(value)
        toast.success("Perfume Link Copied")
    }

    // Collect the data for dialog customization
    function adjustItem(itemId: string, itemTitle: string, itemSize: string, itemQuantity: string) {
        setItemDataToAdjust({
            itemId: '',
            itemTitle: '',
            itemSize: '',
            itemQuantity: '',
        });
        setIsAdjustSizeDialogOpen(true)
        setItemDataToAdjust({
            itemId: itemId,
            itemTitle: itemTitle,
            itemSize: itemSize,
            itemQuantity: itemQuantity
        });
    }

    // Handle adjust item from the cart
    async function handleAdjustItem() {
        setLoadingAdjusting(true)
        await adjustCartItem(`${itemDataToAdjust?.itemId}`, `${itemDataToAdjust?.itemSize}`, `${itemDataToAdjust?.itemQuantity}`)
            .then((res) => {
                if (res === true) {
                    setCartState(!cartState)
                    toast.success(`Adjusted ${itemDataToAdjust?.itemTitle} successfully`)
                    setIsAdjustSizeDialogOpen(false)
                    setLoadingAdjusting(false)
                } else {
                    console.log(res)
                    toast.error(`Oops! something went wrong, please reload the page and try again.`)
                    setLoadingAdjusting(false)
                }
            })
    }

    // Handle delete item from the cart
    async function handleDeleteItem(itemId: string, itemTitle: string) {
        await deleteCartItem(itemId)
            .then((res) => {
                if (res === true) {
                    setCartState(!cartState)
                    toast.success(`Deleted ${itemTitle} successfully`)
                } else {
                    console.log(res)
                    toast.error(`Oops! something went wrong, please reload the page and try again.`)
                }
            })
    }

    // Fetch user Shopping Details
    async function getUserShoppingDetails() {
        await getShoppingDetails(loggedinUserId)
            .then((res: any) => {
                if(res.productDetails === undefined) {
                    setShoppingDetails({
                        nameOnCard: '',
                        cardNumber: '',
                        expMonth: '',
                        expYear: '',
                        cvc: ''
                    })
                } else{
                    setShoppingDetails({
                        nameOnCard: res.username ? res.username : '',
                        cardNumber: res.cardNumber ? res.cardNumber : '',
                        expMonth: res.expiryMonth ? res.expiryMonth : '',
                        expYear: res.expiryYear ? res.expiryYear : '',
                        cvc: res.cvc ? res.cvc : ''
                    })
                }
            })
    }

    // handle Delete all cart Items
    async function deleteAllCartItems() {
        await handleDeleteAllCartItems(loggedinUserId)
            .then(() => {
                window.location.href = window.location.origin
            }).catch((res) => {
                console.error(res)
            })
    }

    useEffect(() => {
        getUserShoppingDetails()
    }, [cartState])

    // handle Paynow func.
    function payNow() {
        setLoadingPaynow(true)
        setTimeout(() => {
            setSuccessfulPaid(true)
            setLoadingPaynow(false)
        }, 5000)
    }

    useEffect(() => {
        // handle get cart items function
        async function handleGetCartItems() {
            try {
                await getCartItems(loggedinUserId)
                    .then((res) => {
                        setCartItems(res.documents.length == 0 ? null : res.documents);
                        setNumOfCartItems(res.total == 0 ? null : res.total);
                        let collectTheSums = 0;

                        // Loop through each cart item to calculate the sum
                        for (let i = 0; i < res.documents.length; i++) {
                            const item = res.documents[i];
                            const sum = item.defaultPrice * item.quantity + (item.size === 50 ? 0 : item.size === 100 ? 50 : item.size === 200 ? 100 : 0);
                            collectTheSums += sum;
                        }

                        // Set the total sum
                        setCartItemsSum(collectTheSums);

                    }).finally(() => {
                        setCartState(!cartState)
                        setTimeout(() => {
                            setLoadingScreen(false)
                        }, 2000)
                    })

                // Initialize the total sum
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
        handleGetCartItems()
    }, [cartState])

    if (loadingScreen) {
        return <LoadingScreen />
    } else {
        return (
            <div className="container mx-auto py-12 px-4 md:px-6">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">My Cart</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            {numOfCartItems === null ? (
                                <span className="text-gray-500 dark:text-gray-400">
                                    Cart is empty, no items available
                                </span>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">
                                    Your total items ({numOfCartItems})
                                </span>
                            )}
                        </div>
                        <div className="text-2xl font-bold">${cartItemsSum}</div>
                    </div>
                </div>

                {/* Products in Your Cart */}
                {cartItemsSum === 0 ? (
                    <Link to="/" className='
                    bg-blue-800 p-3 rounded-lg text-white text-sm font-semibold hover:bg-blue-900 shadow-md'>
                        Back to shopping
                    </Link>
                ) : (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Products in Your Cart</h3>

                        {/* Items details */}
                        <Table className="mb-10">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="mr-0">Actions</TableHead>
                                    <TableHead>Thumbnails</TableHead>
                                    <TableHead>
                                        <span className='hidden md:block'>Product Title</span>
                                        <span className='block md:hidden'>Title</span>
                                    </TableHead>
                                    <TableHead>
                                        <span className='hidden sm:block'>Bottle Size</span>
                                        <span className='block sm:hidden'>Size</span>
                                    </TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {cartItems?.map((item) => (
                                    <TableRow key={item.$id} id={item.$id}>
                                        {/* Actions */}
                                        <TableCell className="font-medium">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline"><IoIosMore /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-52">
                                                    <Link to={`/perfumes/${item.productDetails[0].$id}`}>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            View Perfume Details
                                                            <DropdownMenuShortcut>
                                                                <MdOutlineViewCarousel size="15" />
                                                            </DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem onClick={() => adjustItem(item.$id, item.productDetails[0].title, item.size, item.quantity)} className="cursor-pointer">
                                                        Adjust Size or Quantity
                                                        <DropdownMenuShortcut>
                                                            <PiPlusMinusBold size="15" />
                                                        </DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleCopyPerfumeLink(item.productDetails[0].$id)} className='cursor-pointer'>
                                                        Copy perfume link
                                                        <DropdownMenuShortcut>
                                                            <IoShareSocial size="15" />
                                                        </DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleDeleteItem(item.$id, item.productDetails[0].title)} className="text-red-500 cursor-pointer">
                                                        Remove from cart
                                                        <DropdownMenuShortcut>
                                                            <MdOutlineRemoveCircleOutline size="15" />
                                                        </DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>

                                        {/* Thumbnail */}
                                        <TableCell>
                                            <div className='flex flex-row'>
                                                <img className='min-w-10 min-h-10 max-w-10 max-h-10 rounded-full border-[2px] border-white object-cover' src={item.productDetails[0].photos[2]} />
                                                <img className='min-w-10 min-h-10 max-w-10 max-h-10 rounded-full border-[2px] border-white ml-[-15px] object-cover' src={item.productDetails[0].photos[1]} />
                                                <img className='min-w-10 min-h-10 max-w-10 max-h-10 rounded-full border-[2px] border-white ml-[-15px] object-cover' src={item.productDetails[0].photos[0]} />
                                            </div>
                                        </TableCell>

                                        {/* Product Name */}
                                        <TableCell>{item.productDetails[0].title}</TableCell>

                                        {/* Product details */}
                                        <TableCell>{item.size === 100 ? '100 (+$50)' : item.size === 200 ? '200 (+$100)' : item.size}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.defaultPrice}</TableCell>
                                        <TableCell className="text-right font-semibold text-blue-950">${(item.defaultPrice * item.quantity + (item.size === 50 ? 0 : item.size === 100 ? 50 : item.size === 200 ? 100 : 0)).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={6} className="text-lg">Total Price <span className='text-sm text-gray- font-normal'>(Pre Taxs)</span></TableCell>
                                    <TableCell className="text-right font-bold text-lg">${cartItemsSum}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>

                        {/* Order Summary */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                                    <span>${cartItemsSum}.00</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                                    <span>${shipping}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Taxs</span>
                                    <span>${taxs}</span>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">Total Price <span className="text-sm text-gray-700 font-semibold">(Includes all taxs)</span></span>
                                    <span className="text-lg font-bold">${(cartItemsSum as number + shipping + taxs).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Continue Shopping + Proceed to Checkout */}
                        <div className="mb-24 flex sm:justify-end justify-center space-x-4">
                            <Link to="/" onClick={scrollTopFunc}>
                                <Button variant="outline" size="lg">
                                    Continue Shopping
                                </Button>
                            </Link>
                            <Button onClick={() => setIsCheckoutDialogOpen(true)} size="lg" className='bg-blue-600 hover:bg-blue-800 transition border-0 rounded-md'>
                                Checkout Now
                            </Button>
                        </div>

                        {/* Frequently Asked Questions */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="question1">
                                    <AccordionTrigger className="text-md font-semibold">
                                        How do I update the quantity of an item?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            To update the quantity of an item in your cart, simply click at
                                            <Button className='px-3 mx-1' variant="outline"><IoIosMore size="15" className='text-black' /></Button>
                                            from the "Action" column, then choose "Adjust Quantity". A popup will appear where you can click on the "+" or "-" buttons to add or reduce items. The total price will be updated automatically.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="question2">
                                    <AccordionTrigger className="text-md font-semibold">What is Glori's return policy?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            We offer a 30-day return policy on all of our products. If you're not satisfied with your purchase, you
                                            can return the item for a full refund. Please contact our customer support team for more information.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="question3">
                                    <AccordionTrigger className="text-md font-semibold">How do I proceed to the checkout?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            To proceed to the checkout, click the "Checkout Now" button above.
                                            A popup will appear for the checkout where you can enter your payment and shipping information.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        {/* Adjust Size/Quantity dialogs */}
                        <Dialog open={isAdjustSizeDialogOpen}>
                            <DialogTrigger asChild>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className='mb-5'>Adjust {itemDataToAdjust?.itemTitle} Details</DialogTitle>
                                    <DialogDescription className='text-left'>
                                        <p>Easily modify the size/quantity of your perfume using our selection lists below. Just select the new adjustments, and we'll handle the rest!</p>
                                    </DialogDescription>
                                </DialogHeader>

                                <div className='flex sm:flex-row flex-col sm:space-x-3'>
                                    <Label>
                                        Size
                                        <Select onValueChange={e => setItemDataToAdjust({
                                            itemSize: e,
                                            itemId: `${itemDataToAdjust?.itemId}`,
                                            itemTitle: `${itemDataToAdjust?.itemTitle}`,
                                            itemQuantity: `${itemDataToAdjust?.itemQuantity}`
                                        })}>
                                            <SelectTrigger className="sm:w-[200px] mt-3 text-center">
                                                <SelectValue placeholder={`${itemDataToAdjust?.itemSize}ml`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="50">50ml</SelectItem>
                                                    <SelectItem value="100">100ml (+$50)</SelectItem>
                                                    <SelectItem value="200">200ml (+$100)</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Label>

                                    <Label className='mt-3 sm:mt-0'>
                                        Quantity
                                        <Select onValueChange={e => setItemDataToAdjust({
                                            itemQuantity: e,
                                            itemId: `${itemDataToAdjust?.itemId}`,
                                            itemTitle: `${itemDataToAdjust?.itemTitle}`,
                                            itemSize: `${itemDataToAdjust?.itemSize}`
                                        })}>
                                            <SelectTrigger className="sm:w-[200px] mt-3 text-center">
                                                <SelectValue placeholder={`${itemDataToAdjust?.itemQuantity}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                    <SelectItem value="5">5</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Label>
                                </div>

                                <DialogFooter>
                                    <Button disabled={loadingAdjusting} onClick={() => setIsAdjustSizeDialogOpen(false)} type="button" className="text-white bg-red-600 hover:bg-red-800">
                                        Cancel
                                    </Button>
                                    <Button disabled={loadingAdjusting} onClick={() => handleAdjustItem()} type="button" className="mb-4 sm:mb-0 w-full text-white bg-blue-600 hover:bg-blue-800">
                                        <span className={loadingAdjusting ? 'hidden' : 'flex items-center'}>
                                            Update New Adjusts
                                        </span>
                                        <span className={loadingAdjusting ? '' : 'hidden'}>
                                            <Loading w={24} />
                                        </span>
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Payment Gateway dialogs */}
                        <Dialog open={isCheckoutDialogOpen}>
                            <DialogContent className={successfulPaid ? 'w-[400px] h-[450px]' : 'min-w-fit min-h-[500px]'}>

                                {successfulPaid ? (
                                    <>
                                        <div className="text-center">
                                            <img src="/images/success.gif" alt="Successfully Verified" className="w-[250px] mx-auto" />
                                            <h1 className="text-2xl font-bold mt-6">Payment Successful!</h1>
                                            <p className="text-gray-500 mt-2">
                                                Thank you for your purchase! Your payment has been processed successfully, and your order is now complete.
                                            </p>
                                        </div>
                                        <div className="flex space-x-2 justify-center">
                                            <Button onClick={() => deleteAllCartItems()}>
                                                Explore More Products
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
                                        </div>

                                        <div className="flex justify-center w-full text-center">
                                            <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8" alt="Card 1" />
                                        </div>

                                        {/* Name on card */}
                                        <div className='mt-[-5px]'>
                                            <label className="font-bold text-md">Name on card</label>
                                            <div>
                                                <input
                                                    onChange={e => setShoppingDetails({
                                                        nameOnCard: e.target.value,
                                                        cardNumber: shoppingDetails.cardNumber,
                                                        expYear: shoppingDetails.expYear,
                                                        expMonth: shoppingDetails.expMonth,
                                                        cvc: shoppingDetails.cvc
                                                    })}
                                                    value={shoppingDetails.nameOnCard} className="w-full mt-1 px-3 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" />
                                            </div>
                                        </div>

                                        {/* Card number */}
                                        <div className='mt-[-5px]'>
                                            <label className="font-bold text-md">Card number</label>
                                            <div>
                                                <input
                                                    maxLength={16}
                                                    onChange={e => setShoppingDetails({
                                                        nameOnCard: `${shoppingDetails.nameOnCard}`,
                                                        cardNumber: e.target.value,
                                                        expYear: shoppingDetails.expYear,
                                                        expMonth: shoppingDetails.expMonth,
                                                        cvc: shoppingDetails.cvc
                                                    })}
                                                    value={shoppingDetails.cardNumber} className="w-full mt-1 px-3 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                                            </div>
                                        </div>

                                        {/* Expiration date */}
                                        <div className="flex sm:flex-row flex-col items-end sm:space-x-3 mt-[-5px]">
                                            <div className="w-full">
                                                <label className="font-bold text-md mb-1">Expiration date</label>
                                                <div>
                                                    <Select onValueChange={e => setShoppingDetails({
                                                        nameOnCard: `${shoppingDetails.nameOnCard}`,
                                                        cardNumber: shoppingDetails.cardNumber,
                                                        expYear: shoppingDetails.expYear,
                                                        expMonth: e,
                                                        cvc: shoppingDetails.cvc
                                                    })}>
                                                        <SelectTrigger className="mt-3 py-5 text-center">
                                                            <SelectValue placeholder={shoppingDetails?.expMonth} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="1">1</SelectItem>
                                                                <SelectItem value="2">2</SelectItem>
                                                                <SelectItem value="3">3</SelectItem>
                                                                <SelectItem value="4">4</SelectItem>
                                                                <SelectItem value="5">5</SelectItem>
                                                                <SelectItem value="6">6</SelectItem>
                                                                <SelectItem value="7">7</SelectItem>
                                                                <SelectItem value="8">8</SelectItem>
                                                                <SelectItem value="9">9</SelectItem>
                                                                <SelectItem value="10">10</SelectItem>
                                                                <SelectItem value="11">11</SelectItem>
                                                                <SelectItem value="12">12</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <Select onValueChange={e => setShoppingDetails({
                                                    nameOnCard: `${shoppingDetails.nameOnCard}`,
                                                    cardNumber: shoppingDetails.cardNumber,
                                                    expYear: e,
                                                    expMonth: shoppingDetails.expMonth,
                                                    cvc: shoppingDetails.cvc
                                                })}>
                                                    <SelectTrigger className=" mt-3 py-5 text-center">
                                                        <SelectValue placeholder={shoppingDetails?.expYear} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="2024">2024</SelectItem>
                                                            <SelectItem value="2025">2025</SelectItem>
                                                            <SelectItem value="2026">2026</SelectItem>
                                                            <SelectItem value="2027">2027</SelectItem>
                                                            <SelectItem value="2028">2028</SelectItem>
                                                            <SelectItem value="2029">2029</SelectItem>
                                                            <SelectItem value="2030">2030</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Security code */}
                                        <div className="flex flex-col sm:flex-row items-end space-x-4 mt-[-10px]">
                                            <div className="flex flex-col w-full">
                                                <label className="font-bold text-md mb-2 ml-1">Security code</label>
                                                <input
                                                    className="w-full px-3 py-2 mb-1 border-[1px] border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                                    placeholder="000"
                                                    type="text"
                                                    maxLength={3}
                                                    value={shoppingDetails.cvc}
                                                    onChange={e => setShoppingDetails({
                                                        nameOnCard: `${shoppingDetails.nameOnCard}`,
                                                        cardNumber: shoppingDetails.cardNumber,
                                                        expYear: shoppingDetails.expYear,
                                                        expMonth: shoppingDetails.expMonth,
                                                        cvc: e.target.value
                                                    })}
                                                />
                                            </div>

                                            <div className="w-full flex flex-row space-x-3 mb-[5.5px] sm:mt-0 mt-2 ">
                                                <Button disabled={loadingPaynow} onClick={() => setIsCheckoutDialogOpen(false)} variant="destructive" className="py-5 text-md">Cancel</Button>
                                                <Button disabled={loadingPaynow} onClick={() => payNow()} className="w-full py-5 bg-blue-600 hover:bg-blue-700">
                                                    {loadingPaynow ? (<Loading w={24} />) : 'PAY NOW'}
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </DialogContent>

                        </Dialog>
                    </div>
                )}

            </div >
        )
    }
}