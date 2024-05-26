import { Link } from "react-router-dom";
// UI
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge";


// type Props = {}
export default function TopSelling() {
    return (
        <div className="rounded-xl shadow-sm bg-[#f8f9fb]">

            {/* Header section */}
            <div className="sm:container text-center header py-12 mt-6" >
                <h2 className="text-2xl font-bold">Our Most Popular Fragrances</h2>
                <p className="text-gray-500">
                    Here's what our customers can't get enough of
                </p>
            </div>


            {/* Featured Products section */}
            <div className="flex flex-wrap justify-evenly" >

                {[...Array(3)].map((index) => (
                    <div key={index} className="sm:w-[380px] sm:h-[380px] w-[85%] sm:mb-32 mb-10 capitalize product-card">
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

        </div>
    );
}