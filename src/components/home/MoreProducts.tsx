import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LoadingScreen } from "../ui/loading";

// SERVICES
import { getAllProducts } from "@/backend/services/products/getAllProduct";


function MoreProducts() {

    const
        // Check if user logged-in
        [loadingScreen, setLoadingScreen] = useState<boolean>(true),
        // Use setUpdate when you need to update the fetching product
        [allProduct, setAllProduct] = useState<string[]>([]);

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    // Update when click on Load-More btn
    useEffect(() => {
        async function fetchMoreProducts() {
            await getAllProducts(undefined, 'oldest', undefined, 20)
                .then((res: any) => {
                    setAllProduct(res.documents);
                    setTimeout(() => {
                        setLoadingScreen(false);
                    }, 3000)
                });
        }

        fetchMoreProducts();
    }, []);


    return (
        <div>
            {/* Header section */}
            <div className="sm:container sm:text-left text-center mt-12 mb-6" >
                <h2 className="text-2xl font-bold">Discover More Treasures</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Explore our exquisite range of premium perfumes, each crafted to captivate and enchant.
                </p>
            </div>
            <ScrollArea className="w-full whitespace-nowrap sm:p-0 p-3">

                {/* Perfumes section */}
                <div className="flex flex-wrap justify-evenly my-6">
                    {loadingScreen ? (
                        <LoadingScreen />
                    ) :
                        allProduct.map((item: any) => (
                            <div key={item.$id} className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">
                                <Badge className="absolute z-10 bg-stone-900 hover:bg-stone-900 text-white rounded-none">By {item.store.name}</Badge>

                                {/* Preview Images */}
                                <Link to={`/perfumes/${item.$id}`}>
                                    <Carousel className="hover:cursor-w-resize">
                                        <CarouselContent>
                                            <CarouselItem><img src={`${item.photos[0]}`} /></CarouselItem>
                                            <CarouselItem><img src={`${item.photos[1]}`} /></CarouselItem>
                                            <CarouselItem><img src={`${item.photos[2]}`} /></CarouselItem>
                                        </CarouselContent>

                                    </Carousel>
                                </Link>

                                {/* Card Details */}
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

                            </div>
                        ))}
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default MoreProducts