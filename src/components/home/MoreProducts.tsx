// UI
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "../ui/button"


function MoreProducts() {
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

                {/* Featured Products section */}
                <div className="flex space-x-3 justify-evenly">

                    <div className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">

                        {/* Preview Images */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                            <p className="text-sm">Fill Your Space with a Cozy Scent</p>

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

                    <div className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">

                        {/* Preview Images */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                            <p className="text-sm">Fill Your Space with a Cozy Scent</p>

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

                    <div className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">

                        {/* Preview Images */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                            <p className="text-sm">Fill Your Space with a Cozy Scent</p>

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

                    <div className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">

                        {/* Preview Images */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                            <p className="text-sm">Fill Your Space with a Cozy Scent</p>

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

                    <div className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">

                        {/* Preview Images */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                            <p className="text-sm">Fill Your Space with a Cozy Scent</p>

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

                    <div className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">

                        {/* Preview Images */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                            <p className="text-sm">Fill Your Space with a Cozy Scent</p>

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

                    <div className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">

                        {/* Preview Images */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                            <p className="text-sm">Fill Your Space with a Cozy Scent</p>

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

                    <div className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">

                        {/* Preview Images */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <h6 className="font-semibold">chanel no 5 eau de toilette</h6>
                            <p className="text-sm">Fill Your Space with a Cozy Scent</p>

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

                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default MoreProducts