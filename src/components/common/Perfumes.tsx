// import { useState, useEffect } from 'react';
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
import { Separator } from "@/components/ui/separator"



type Collections = {
    quantity?: number;
    title?: string;
    subTitle?: string;
    AllowFiltering?: boolean;
    NavigateToCollectionsPageBtn?: boolean;
}

export default function Collections({
    quantity,
    AllowFiltering,
    NavigateToCollectionsPageBtn
}: Collections) {




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

                {[...Array(quantity ? quantity : 10)].map((index) => (
                    <div key={index} className="sm:w-[265px] sm:h-[265px] w-[85%] sm:mb-32 mb-10 capitalize product-card">
                        <Badge className="absolute z-20 bg-stone-900 hover:bg-stone-900 text-white rounded-none">Brand</Badge>

                        {/* Preview Images */}

                        {/* <Link to={`/perfumes/${index}`} className="relative z-10"> */}
                        <Carousel className="hover:cursor-w-resize">
                            <CarouselContent>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                                <CarouselItem><img src="http://placehold.co/500" /></CarouselItem>
                            </CarouselContent>

                        </Carousel>
                        {/* </Link> */}

                        {/* Card Details */}
                        <div className="details my-1">

                            {/* Title + Description */}
                            <Link to={`/perfumes/${index}`}>
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

            {/* Load more button */}
            <div className="flex justify-center my-6">
                <Button className={`${NavigateToCollectionsPageBtn ? 'hidden' : ''} w-52 bg-blue-700 hover:bg-blue-900 text-white font-light shadow-md hover:shadow-lg transition-shadow`}>
                    Show more Perfumes
                </Button>
                <Button className={`${NavigateToCollectionsPageBtn ? '' : 'hidden'} w-52 bg-blue-700 hover:bg-blue-900 text-white font-light shadow-md hover:shadow-lg transition-shadow`}>
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