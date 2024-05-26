import { Badge } from "../ui/badge"
import { Link } from "react-router-dom"

// UI
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"

// type Props = {};

export default function Features() {
    return (
        <>

            {/* Header section */}
            <div className="sm:container sm:text-left text-center header mb-6">
                <h2 className="text-2xl font-bold">Featured Perfumes</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Check out our latest collection of stylish and high-quality perfumes
                </p>
            </div>


            {/* Perfumes section */}
            <div className="flex flex-wrap justify-evenly my-6">

                {[...Array(4)].map((index) => (
                    <div key={index} className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">
                        <Badge className="absolute z-10 bg-stone-900 hover:bg-stone-900 text-white rounded-none">Brand</Badge>

                        {/* Preview Images */}
                        <Link to={`/product/$${index}`}>
                            <Carousel className="hover:cursor-w-resize">
                                <CarouselContent>
                                    <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                    <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                    <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                </CarouselContent>

                            </Carousel>
                        </Link>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <Link to="#">
                                <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                                <p className="text-sm">Fill Your Space with a Cozy Scent</p>
                            </Link>

                            {/* Price + Buy Button */}
                            <div className="flex items-center py-1 w-full">
                                <div className="font-bold mr-5 text-sm">
                                    <span>$16.99</span>
                                </div>
                                <div className="w-full">
                                    <Button variant="outline" className="w-full font-light shadow-none">Add to Cart</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </>
    )
}