import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// UI
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoadingScreen } from '../ui/loading';
import { toast } from 'sonner';

// ICONS
import { MdOutlineRemoveCircleOutline, MdOutlineViewCarousel } from 'react-icons/md';
import { IoShareSocial } from 'react-icons/io5';
import { FaRegCopy, FaRegEdit } from "react-icons/fa";
import { getProducts } from '@/backend/services/store/getAllProduct';

// SERVICES
import { deleteProduct } from '@/backend/services/products/deleteProduct';

// STATES
import useEditProduct from '@/lib/states/useEditProductId';
import useUpdateCart from '@/lib/states/useUpdateCart';



type Collections = {
    quantity?: number;
    title?: string;
    subTitle?: string;
    AllowFiltering?: boolean;
    NavigateToCollectionsPageBtn?: boolean;
}

export default function Collections({ AllowFiltering, NavigateToCollectionsPageBtn }: Collections) {

    // Check if user logged-in
    const [isSessionValid] = useState<boolean>(true),
        { id: storeId } = useParams<string>(),
        { cartState, setCartState } = useUpdateCart(),
        [loadingScreen, setLoadingScreen] = useState<boolean>(true),
        [update, setUpdate] = useState<boolean>(true),
        [allProduct, setAllProduct] = useState<[]>([]);

    const { setEditProductId } = useEditProduct();


    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    async function handleDeleteProduct(itemId: string, itemTitle: string) {
        await deleteProduct(itemId, itemTitle)
            .then((res) => {
                if (res == true) {
                    setCartState(!cartState);
                    setUpdate(!update);
                    toast.success(`Deleted ${itemTitle} successfully`);
                } else {
                    toast.error('Error occur while deleting, please reload the page and try again');
                }
            })
    }


    useEffect(() => {
        async function fetchProducts() {
            await getProducts(storeId as string)
                .then((res: any) => {
                    setAllProduct(res.documents)
                    setLoadingScreen(false)
                })
        }

        fetchProducts()
    }, [update])

    console.log(allProduct)

    if (loadingScreen) {
        return <LoadingScreen />

    } else {
        return (
            <>

                {/* Header section */}
                <div className="sm:text-left sm:flex text-center justify-between header mt-10 mb-6">

                    <div className="w-full">
                        <h2 className="text-2xl font-bold capitalize">Our Perfumes</h2>
                    </div>

                    {/* Filters */}
                    <div className={`${AllowFiltering ? 'sm:flex' : ''} sm:mt-auto my-8 justify-end w-full space-x-3 filters hidden`}>

                        {/* Filter by sort */}
                        <Select>
                            <SelectTrigger className="w-[170px] shadow-sm">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort by</SelectLabel>
                                    <Separator />
                                </SelectGroup>
                                <SelectItem value="Newest">Newest</SelectItem>
                                <SelectItem value="PriceLowToHigh">Price: Low to High</SelectItem>
                                <SelectItem value="PriceHighToLow">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>

                {/* Perfumes section */}
                <div className="flex flex-wrap md:justify-between justify-evenly my-6">

                    {allProduct.map((item: any) => (
                        <div key={item.$id} className="sm:w-[265px] sm:h-[265px] w-[85%] sm:mb-32 mb-10 capitalize product-card">
                            <Link to={`/store/${item.store.$id}`}>
                                <Badge className="absolute z-20 bg-stone-900 hover:bg-stone-900 text-white rounded-none">
                                    {item.store.name}
                                </Badge>
                            </Link>

                            {/* Preview Images */}

                            {/* <Link to={`/perfumes/${index}`} className="relative z-10"> */}
                            <Carousel className="hover:cursor-w-resize">
                                <CarouselContent>
                                    <CarouselItem><img src={`${item.photos[0]}`} className='max-h-[300px]' /></CarouselItem>
                                    <CarouselItem><img src={`${item.photos[1]}`} className='max-h-[300px]' /></CarouselItem>
                                    <CarouselItem><img src={`${item.photos[2]}`} className='max-h-[300px]' /></CarouselItem>
                                </CarouselContent>

                            </Carousel>
                            {/* </Link> */}

                            {/* Card Details */}
                            <div className="details my-1">

                                {/* Title + Description */}
                                <Link to={`/perfumes/${item.$id}`}>
                                    <h6 className="font-semibold">{item.title}</h6>
                                    <p className="text-sm">
                                        Available sizes: {item.size.sort((a: string, b: string) => parseInt(a) - parseInt(b)).join(', ')}
                                    </p>
                                </Link>

                                {/* Price + Buy/Modify Button */}
                                <div className="flex items-center py-1 w-full">
                                    <div className="font-bold mr-2 text-lg">
                                        <span>${item.price}</span>
                                    </div>
                                    <div className="w-full">

                                        {isSessionValid ? (
                                            <div className='flex items-center justify-end'>
                                                {/* Share Product */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm"><IoShareSocial size="15" /></Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>Share this Perfume</DialogTitle>
                                                            <DialogDescription>
                                                                Share this perfume with friends now!
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="grid flex-1 gap-2">
                                                                <Label htmlFor="link" className="sr-only">
                                                                    Link
                                                                </Label>
                                                                <Input
                                                                    id="link"
                                                                    defaultValue={`${window.location.origin}/perfumes/${item.$id}`}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <Button type="submit" size="sm" className="px-3">
                                                                <span className="sr-only">Copy</span>
                                                                <FaRegCopy className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <DialogFooter className="sm:justify-start">
                                                            <DialogClose asChild>
                                                                <Button type="button" variant="secondary">
                                                                    Close
                                                                </Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Modify Product List */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" className="w-fit flex justify-between ml-3">
                                                            Modify Product
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-52">

                                                        <Link to={`/perfumes/${item.$id}`}>
                                                            <DropdownMenuItem className='cursor-pointer' onClick={scrollTopFunc}>
                                                                View Product
                                                                <DropdownMenuShortcut>
                                                                    <MdOutlineViewCarousel size="15" />
                                                                </DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                        </Link>

                                                        <Link to={`/edit`} onClick={() => setEditProductId(item.$id)}>
                                                            <DropdownMenuItem className='cursor-pointer'>
                                                                Edit Details
                                                                <DropdownMenuShortcut>
                                                                    <FaRegEdit size="15" />
                                                                </DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                        </Link>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem onClick={() => handleDeleteProduct(item.$id, item.title)} className="text-red-500 cursor-pointer">
                                                            Delete this product
                                                            <DropdownMenuShortcut>
                                                                <MdOutlineRemoveCircleOutline size="15" />
                                                            </DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                        ) : (
                                            <div>
                                                <Button variant="outline" className="w-full font-light shadow-none">Add to Cart</Button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

                {/* Load more button */}
                <div className="flex justify-center mt-20 mb-6">
                    <Button className={`${NavigateToCollectionsPageBtn ? 'hidden' : ''} w-52 bg-blue-600 hover:bg-blue-800 text-white font-light shadow-md hover:shadow-lg transition-shadow`}>
                        Show more Perfumes
                    </Button>
                    <Button className={`${NavigateToCollectionsPageBtn ? '' : 'hidden'} w-52 bg-blue-600 hover:bg-blue-800 text-white font-light shadow-md hover:shadow-lg transition-shadow`}>
                        Explore more Perfumes
                    </Button>
                </div>

                {/* Filters Button (For Mobiles) */}
                <div className={`container ${AllowFiltering ? 'sm:hidden' : 'hidden'} filters-bottom bg-white w-full fixed py-4 left-0 bottom-0 z-30`}>

                    {/* Filter by sort */}
                    <Select>
                        <SelectTrigger className="w- shadow-sm">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort by</SelectLabel>
                                <Separator />
                            </SelectGroup>
                            <SelectItem value="Newest">Newest</SelectItem>
                            <SelectItem value="PriceLowToHigh">Price: Low to High</SelectItem>
                            <SelectItem value="PriceHighToLow">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </>
        )
    }
}