import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// UI
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
import { getAllProducts } from '@/backend/services/products/getAllProduct';
import Loading, { LoadingScreen } from '../ui/loading';
import { RiArrowUpDownFill } from 'react-icons/ri';
import usePerfumeCategory from '@/lib/states/usePerfumeCategory';

type Product = {
    $id: string;
};

export default function Perfumes() {

    // Get the category from the public state
    const { category } = usePerfumeCategory();

    // Set the page Sub-Title and Sub-Description
    const
        [subTitle, setSubTitle] = useState<string>(''),
        [subDescription, setSubDescription] = useState<string>(''),
        [loadingScreen, setLoadingScreen] = useState<boolean>(true),
        [loadingMore, setLoadingMore] = useState<boolean>(false),
        [allProduct, setAllProduct] = useState<Product[] | []>([]),
        [productsTotal, setProductsTotal] = useState<number | null>(null),
        [cursor, setCursor] = useState<string | null>(null);

    const
        // Filters
        [sortByFilter, setSortByFilter] = useState<string>('');

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    // Update when using Sort-filter
    useEffect(() => {
        async function fetchProducts() {
            setLoadingScreen(true);
            await getAllProducts(category, sortByFilter)
                .then((res: any) => {
                    setAllProduct(res.documents);
                    setProductsTotal(res.total);
                    setLoadingScreen(false);
                    setLoadingMore(false);
                });
        }

        fetchProducts();
    }, [sortByFilter, category]);

    // Update when click on Load-More btn
    useEffect(() => {
        async function fetchMoreProducts() {
            await getAllProducts(category, sortByFilter, cursor as string)
                .then((res: any) => {
                    setAllProduct((prevProducts) => [...prevProducts, ...res.documents]);
                    setProductsTotal(res.total);
                    setLoadingScreen(false);
                    setLoadingMore(false);
                });
        }


        fetchMoreProducts();
    }, [cursor, category]);

    const loadMoreProducts = () => {
        setLoadingMore(true)
        if (allProduct.length > 0) {
            setCursor(allProduct[allProduct.length - 1].$id);
        }
    };

    // Fetch products when page Url changes
    useEffect(() => {
        async function fetchAllProducts() {
            setLoadingScreen(true);
            await getAllProducts(category, sortByFilter)
                .then((res: any) => {
                    setAllProduct(res.documents);
                    setProductsTotal(res.total);
                    setLoadingScreen(false);
                    setLoadingMore(false);
                });
        }
        fetchAllProducts()
    }, [category])

    useEffect(() => {
        switch (category) {
            case 'luxury':
                setSubTitle('Luxury Classics');
                setSubDescription("Sophisticated fragrances that never go out of style")
                break;
            case 'fresh':
                setSubTitle('Fresh & Clean');
                setSubDescription("Revitalizing scents for a refreshing aura")
                break;
            case 'warm':
                setSubTitle('Warm & Spicy');
                setSubDescription("Captivating fragrances with a hint of spice")
                break;
            case 'unisex':
                setSubTitle('Unisex Delights');
                setSubDescription("Versatile and alluring fragrances suitable for everyone")
                break;
            case 'florals':
                setSubTitle('Sensual Florals');
                setSubDescription("Enchanting and romantic scents that captivate the senses")
                break;
            case 'limited':
                setSubTitle('Limited Editions');
                setSubDescription("Exclusive and unique scents for discerning connoisseurs")
                break;
            default:
                setSubTitle('Explore Our Collections');
                setSubDescription("")
                break;
        }

    }, [subTitle, category]);

    if (loadingScreen) {
        return <LoadingScreen />
    } else {
        return (
            <>

                {/* Header section */}
                <div className="sm:container sm:text-left sm:flex text-center justify-between header mt-10 mb-6">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold capitalize">{subTitle} Perfumes</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {subDescription}
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="sm:flex sm:mt-auto my-8 justify-evenly space-x-3 filters hidden">

                        {/* Filter by brand */}
                        {/* <Select>
                            <SelectTrigger className="w-[170px] shadow-sm">
                                <SelectValue placeholder="Filter by brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Filter by Brand</SelectLabel>
                                </SelectGroup>
                                <Separator />
                                <SelectItem value="BrandName1">Brand Name</SelectItem>
                                <SelectItem value="BrandName2">Brand Name</SelectItem>
                                <SelectItem value="BrandName3">Brand Name</SelectItem>
                            </SelectContent>
                        </Select> */}

                        {/* Filter by sort */}
                        <Select onValueChange={e => { setSortByFilter(e) }}>
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

                {/* Perfumes section */}
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
                                        <Link to={`/perfumes/${item.$id}`}>
                                            <Button className="float-right" onClick={scrollTopFunc}>
                                                View Product
                                            </Button>
                                        </Link>

                                    </div>
                                </div>
                            </div>

                            {/* Mobile filters */}
                            <div className={`container sm:hidden block filters-bottom bg-white w-full fixed py-4 left-0 bottom-0 z-30`}>

                                {/* Filter by sort */}
                                <Select onValueChange={e => { setSortByFilter(e) }}>
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

                {/* Load more button */}
                <div className="flex justify-center my-6">
                    {allProduct.length < (productsTotal || 0) && (
                        <Button disabled={loadingMore} onClick={loadMoreProducts} className="mx-auto flex justify-center w-52 bg-blue-600 hover:bg-blue-800 text-white font-light shadow-md hover:shadow-lg transition-shadow">
                            {loadingMore ? (
                                <Loading w={20} />
                            ) : 'Load More Perfumes'}
                        </Button>
                    )}
                </div>

                {/* Filters Button (For Mobiles) */}
                <div className="container sm:hidden filters-bottom bg-white w-full flex justify-evenly fixed py-4 bottom-0 z-30">
                    {/* Filter by brand */}
                    {/* <Select>
                        <SelectTrigger className="w-[170px] shadow-sm">
                            <SelectValue placeholder="Filter by brand" />
                        </SelectTrigger>
                        <SelectContent className="z-50">
                            <SelectGroup>
                                <SelectLabel>Filter by Brand</SelectLabel>
                                <Separator />
                            </SelectGroup>
                            <SelectItem value="BrandName1">Brand Name</SelectItem>
                            <SelectItem value="BrandName2">Brand Name</SelectItem>
                            <SelectItem value="BrandName3">Brand Name</SelectItem>
                        </SelectContent>
                    </Select> */}

                    {/* Filter by sort */}
                    <Select onValueChange={e => { setSortByFilter(e), scrollTopFunc() }}>
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
            </>
        )
    }
}