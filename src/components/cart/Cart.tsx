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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

// ICONS
import { IoIosMore } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { PiPlusMinusBold } from "react-icons/pi";
import { MdOutlineViewCarousel } from "react-icons/md";

export default function Cart() {

    // Fake Items
    const data = [
        {
            id: "INV001",
            name: "Chanel No. 5",
            thumbnail: "http://placeholder.co/200",
            quantity: "1",
            size: "1",
            price: '74',
            total: '74',
        },
        {
            id: "INV001",
            name: "Chanel No. 5",
            thumbnail: "http://placeholder.co/200",
            quantity: "1",
            size: "50",
            price: '74',
            total: '74',
        },
        {
            id: "INV001",
            name: "Chanel No. 5",
            thumbnail: "http://placeholder.co/200",
            quantity: "1",
            size: "100",
            price: '74',
            total: '74',
        },
        {
            id: "INV001",
            name: "Chanel No. 5",
            thumbnail: "http://placeholder.co/200",
            quantity: "1",
            size: "100",
            price: '74',
            total: '74',
        },
        {
            id: "INV001",
            name: "Chanel No. 5",
            thumbnail: "http://placeholder.co/200",
            quantity: "1",
            size: "200",
            price: '74',
            total: '74',
        },
    ]

    // Update the page title
    document.title = `Glori | My Cart`;

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }


    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-gray-500 dark:text-gray-400">
                            totle items 3
                        </span>
                    </div>
                    <div className="text-2xl font-bold">$123</div>
                </div>
            </div>

            {/* Products in Your Cart */}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Products in Your Cart</h3>

                {/* Items details */}
                <Table className="mb-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="mr-0">Actions</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>
                                <span className='hidden md:block'>Product Name</span>
                                <span className='block md:hidden'>Name</span>
                                </TableHead>
                            <TableHead>Bottle Size</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                {/* Actions */}
                                <TableCell className="font-medium">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline"><IoIosMore /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-52">
                                            <DropdownMenuItem>
                                                View Details
                                                <DropdownMenuShortcut>
                                                    <MdOutlineViewCarousel size="15" />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Adjust Size
                                                <DropdownMenuShortcut>
                                                    <PiPlusMinusBold size="15" />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Adjust Quantity
                                                <DropdownMenuShortcut>
                                                    <PiPlusMinusBold size="15" />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Share
                                                <DropdownMenuShortcut>
                                                    <IoShareSocial size="15" />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-500">
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
                                    <Avatar>
                                        <AvatarImage src={item.thumbnail} />
                                        <AvatarFallback>N/A</AvatarFallback>
                                    </Avatar>
                                </TableCell>

                                {/* Product Name */}
                                <TableCell>{item.name}</TableCell>

                                {/* Product details */}
                                <TableCell>{item.size}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell className="text-right">{item.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>Total</TableCell>
                            <TableCell className="text-right font-bold">$323</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                {/* Order Summary */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                            <span>$21</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                            <span>$11</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 dark:text-gray-400">Tax</span>
                            <span>$43</span>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-lg font-bold">$32</span>
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
                    <Button size="lg" className='bg-blue-600 hover:bg-blue-800 transition border-0 rounded-md'>
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


            </div>
        </div>
    )
}