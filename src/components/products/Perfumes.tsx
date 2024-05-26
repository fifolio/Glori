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



interface Products {
    category: string;
}

export default function Products({ category }: Products) {

    // Set the page Sub-Title and Sub-Description
    const [subTitle, setSubTitle] = useState<string>('');
    const [subDescription, setSubDescription] = useState<string>('');

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
    }, [category]);

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

                <div className="flex sm:mt-auto my-8 justify-evenly space-x-3 filters">

                    {/* Filter by brand */}
                    <Select>
                        <SelectTrigger className="w-[170px] shadow-sm">
                            <SelectValue placeholder="Filter by brand" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Filter by Brand</SelectLabel>
                            </SelectGroup>
                            <SelectItem value="BrandName1">Brand Name</SelectItem>
                            <SelectItem value="BrandName2">Brand Name</SelectItem>
                            <SelectItem value="BrandName3">Brand Name</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Filter by sort */}
                    <Select>
                        <SelectTrigger className="w-[170px] shadow-sm">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort by</SelectLabel>
                            </SelectGroup>
                            <SelectItem value="Newest">Newest</SelectItem>
                            <SelectItem value="PriceLowToHigh">Price: Low to High</SelectItem>
                            <SelectItem value="PriceHighToLow">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </div>

            {/* Perfumes section */}
            <div className="flex flex-wrap justify-evenly my-6">

                {[...Array(20)].map((index) => (
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

            {/* Load more button */}
            <div className="flex justify-center my-6">
                <Button className="w-52 bg-blue-700 hover:bg-blue-900 text-white font-light shadow-md hover:shadow-lg transition-shadow">Load more perfumes</Button>
            </div>
        </>
    )
}