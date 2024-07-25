import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
import Loading, { LoadingScreen } from '../ui/loading';
import { toast } from 'sonner';

// ICONS
import { MdOutlineRemoveCircleOutline, MdOutlineViewCarousel } from 'react-icons/md';
import { IoShareSocial } from 'react-icons/io5';
import { FaRegCopy, FaRegEdit } from "react-icons/fa";
import { getProducts } from '@/backend/services/store/getAllProduct';
import { RiArrowUpDownFill } from 'react-icons/ri';

// SERVICES
import { deleteProduct } from '@/backend/services/products/deleteProduct';

// STATES
import useEditProduct from '@/lib/states/useEditProductId';
import useUpdateCart from '@/lib/states/useUpdateCart';
import useUserState from '@/lib/states/userStates';
import useUserId from '@/lib/states/userId';



type Product = {
    $id: string;
};

export default function Perfumes() {

    const
        // Check if user logged-in
        { isLoggedin } = useUserState(),
        { loggedinUserId } = useUserId(),
        { id: storeId } = useParams<string>(),
        { cartState, setCartState } = useUpdateCart(),
        [loadingScreen, setLoadingScreen] = useState<boolean>(true),
        [loadingMore, setLoadingMore] = useState<boolean>(false),

        // Use setUpdate when you need to update the fetching product
        [update, setUpdate] = useState<boolean>(true),
        [allProduct, setAllProduct] = useState<Product[] | []>([]),
        [productsTotal, setProductsTotal] = useState<number | null>(null),
        [cursor, setCursor] = useState<string | null>(null);

    const
        // Filters
        [sortByFilter, setSortByFilter] = useState<string>('');

    const { setEditProductId } = useEditProduct();

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    // Delete product from store/carts
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

    // Update when using Sort-filter
    useEffect(() => {
        async function fetchProducts() {
            setLoadingScreen(true);
            await getProducts(storeId as string, sortByFilter)
                .then((res: any) => {
                    setAllProduct(res.documents);
                    setProductsTotal(res.total);
                    setLoadingScreen(false);
                    setLoadingMore(false);
                });
        }

        fetchProducts();
    }, [sortByFilter]);

    // Update when click on Load-More btn
    useEffect(() => {
        async function fetchMoreProducts() {
            await getProducts(storeId as string, sortByFilter, cursor as string)
                .then((res: any) => {
                    setAllProduct((prevProducts) => [...prevProducts, ...res.documents]);
                    setProductsTotal(res.total);
                    setLoadingScreen(false);
                    setLoadingMore(false);
                });
        }


        fetchMoreProducts();
    }, [cursor]);

    const loadMoreProducts = () => {
        setLoadingMore(true)
        if (allProduct.length > 0) {
            setCursor(allProduct[allProduct.length - 1].$id);
        }
    };

    if (loadingScreen) {
        return <LoadingScreen />

    } else {
        return (
            <>
                <div className="sm:text-left sm:flex text-center justify-between header mt-10 mb-6">
                    <div className="w-full">
                        <h2 className="text-2xl font-bold capitalize">Our Perfumes</h2>
                    </div>

                    <div className="sm:flex sm:mt-auto my-8 justify-end w-full space-x-3 filters hidden">
                        <Select onValueChange={e => {setSortByFilter(e), scrollTopFunc()}}>
                            <SelectTrigger className="sm:w-[240px] w-full text-left">
                                <RiArrowUpDownFill className="w-4 h-4" />
                                <SelectValue placeholder={
                                    sortByFilter === 'newest' ? 'Newest Perfumes' :
                                        sortByFilter === 'oldest' ? 'Oldest Perfumes' :
                                            sortByFilter === 'highest' ? 'Price: Highest to Lowest' :
                                                sortByFilter === 'lowest' ? 'Price: Lowest to Highest' : 'Sort By'
                                } />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort by</SelectLabel>
                                    <SelectItem value="newest">Newest Perfumes</SelectItem>
                                    <SelectItem value="oldest">Oldest Perfumes</SelectItem>
                                    <SelectItem value="highest">Price: Highest to Lowest</SelectItem>
                                    <SelectItem value="lowest">Price: Lowest to Highest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-wrap justify-evenly my-6">
                    {allProduct.map((item: any) => (
                        <div key={item.$id} className="sm:w-[265px] sm:h-[265px] w-[95%] sm:mb-32 mb-10 capitalize product-card">
                            <Link to={`/store/${item.store.$id}`}>
                                <Badge className="absolute z-20 bg-stone-900 hover:bg-stone-900 text-white rounded-none">
                                    {item.store.name}
                                </Badge>
                            </Link>

                            <Carousel className="hover:cursor-w-resize">
                                <CarouselContent>
                                    <CarouselItem><img src={`${item.photos[0]}`} className='sm:max-h-[300px] sm:w-auto w-full' /></CarouselItem>
                                    <CarouselItem><img src={`${item.photos[1]}`} className='sm:max-h-[300px] sm:w-auto w-full' /></CarouselItem>
                                    <CarouselItem><img src={`${item.photos[2]}`} className='sm:max-h-[300px] sm:w-auto w-full' /></CarouselItem>
                                </CarouselContent>
                            </Carousel>

                            <div className="details my-1">
                                <Link to={`/perfumes/${item.$id}`}>
                                    <h6 className="font-semibold">{item.title.length > 25 ? item.title.substring(0, 25) : item.title}</h6>
                                    <p className="text-sm">
                                        Available sizes: {item.size.sort((a: string, b: string) => parseInt(a) - parseInt(b)).join(', ')}
                                    </p>
                                </Link>

                                <div className="flex items-center py-1 w-full">
                                    <div className="font-bold mr-2 text-lg">
                                        <span>${item.price}</span>
                                    </div>
                                    <div className="w-full">
                                        {isLoggedin && loggedinUserId === item.userId ? (
                                            <div className='flex items-center justify-end'>
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

                                                        <Link to={`/edit`} onClick={() => { setEditProductId(item.$id), scrollTopFunc() }}>
                                                            <DropdownMenuItem className='cursor-pointer'>
                                                                Edit Details
                                                                <DropdownMenuShortcut>
                                                                    <FaRegEdit size="15" />
                                                                </DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                        </Link>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem onClick={() => handleDeleteProduct(item.$id, item.title)} className="text-red-500 cursor-pointer">
                                                            Delete Product
                                                            <DropdownMenuShortcut>
                                                                <MdOutlineRemoveCircleOutline size="15" />
                                                            </DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        ) : (
                                            <Link to={`/perfumes/${item.$id}`}>
                                                <Button className="float-right" onClick={scrollTopFunc}>
                                                    View Product
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile filters */}
                            <div className={`container sm:hidden block filters-bottom bg-white w-full fixed py-4 left-0 bottom-0 z-30`}>

                                {/* Filter by sort */}
                                <Select onValueChange={e => {setSortByFilter(e), scrollTopFunc()}}>
                                    <SelectTrigger className="sm:w-[240px] w-full text-left">
                                        <RiArrowUpDownFill className="w-4 h-4" />
                                        <SelectValue placeholder={
                                            sortByFilter === 'newest' ? 'Newest Perfumes' :
                                                sortByFilter === 'oldest' ? 'Oldest Perfumes' :
                                                    sortByFilter === 'highest' ? 'Price: Highest to Lowest' :
                                                        sortByFilter === 'lowest' ? 'Price: Lowest to Highest' : 'Sort By'
                                        } />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sort by</SelectLabel>
                                            <SelectItem value="newest">Newest Perfumes</SelectItem>
                                            <SelectItem value="oldest">Oldest Perfumes</SelectItem>
                                            <SelectItem value="highest">Price: Highest to Lowest</SelectItem>
                                            <SelectItem value="lowest">Price: Lowest to Highest</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    ))}
                </div>

                {allProduct.length < (productsTotal || 0) && (
                    <Button disabled={loadingMore} onClick={loadMoreProducts} className="mx-auto block">
                        {loadingMore ? (
                            <Loading w={20} />
                        ) : 'Load More Perfumes'}
                    </Button>
                )}
            </>
        )
    }
}