// UI
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// ICONS
import { HiOutlineSelector } from "react-icons/hi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { TbCubeSend } from "react-icons/tb";





export default function Sell() {
    return (
        <div>
            {/* Header */}
            <header className="relative bg-[#F5F5F5] mt-10 py-20 md:py-32 lg:py-40 sm:rounded-xl overflow-hidden">
                <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
                    <source src="https://videos.pexels.com/video-files/7815734/7815734-hd_1280_720_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-4">Sell Your Luxury Perfumes on Glori</h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto">
                        Reach a niche market of luxury perfume enthusiasts and enjoy a hassle-free selling experience.
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5"></div> {/* Optional overlay for better text readability */}
            </header>

            {/* How to List Your Perfumes */}
            <section className="py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto grid gap-8">
                        <div>
                            <h2 className="text-3xl font-bold">How to List Your Perfumes</h2>
                            <p className="text-gray-500 mt-4 text-md">
                                Selling your luxury perfumes on Glori is easy. Simply follow these steps:
                            </p>
                            <ol className="mt-6 space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Create Your Listing</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-md">
                                            Fill out the product details, upload high-quality images, and set your price.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Reach Luxury Buyers</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-md">
                                            Your perfumes will be showcased to our niche audience of luxury fragrance enthusiasts.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Secure Transactions</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-md">
                                            We handle all payments securely, so you can focus on fulfilling orders.
                                        </p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                    </div>
                </div>
            </section>

            {/* Form */}
            <div className="container md:w-[750px] mx-auto px-4 md:px-6 pt-6 pb-28">
                <div className="grid md:grid-cols-1">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <h1 className="text-3xl font-bold">Add a New Perfume</h1>
                            <p className="text-gray-500">
                                Fill out the form below to list a new perfume product on Glori.
                            </p>
                        </div>
                        <form className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Product Title</Label>
                                <Input id="title" placeholder="Enter product title" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Enter product description" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" type="number" placeholder="Enter price" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="size">Size</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between">
                                                Select Size
                                                <HiOutlineSelector className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full">
                                            <DropdownMenuItem>50ml</DropdownMenuItem>
                                            <DropdownMenuItem>100ml</DropdownMenuItem>
                                            <DropdownMenuItem>150ml</DropdownMenuItem>
                                            <DropdownMenuItem>200ml</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fragrance-notes">Fragrance Notes</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between">
                                            Select Fragrance Notes
                                            <HiOutlineSelector className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                        <DropdownMenuItem>Floral</DropdownMenuItem>
                                        <DropdownMenuItem>Citrus</DropdownMenuItem>
                                        <DropdownMenuItem>Woody</DropdownMenuItem>
                                        <DropdownMenuItem>Spicy</DropdownMenuItem>
                                        <DropdownMenuItem>Fruity</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fragrance-family">Fragrance Family</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between">
                                            Select Fragrance Family
                                            <HiOutlineSelector className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                        <DropdownMenuItem>Floral</DropdownMenuItem>
                                        <DropdownMenuItem>Citrus</DropdownMenuItem>
                                        <DropdownMenuItem>Woody</DropdownMenuItem>
                                        <DropdownMenuItem>Spicy</DropdownMenuItem>
                                        <DropdownMenuItem>Fruity</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ingredients">Ingredients</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between">
                                            Select Ingredients
                                            <HiOutlineSelector className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                        <DropdownMenuItem>Floral</DropdownMenuItem>
                                        <DropdownMenuItem>Citrus</DropdownMenuItem>
                                        <DropdownMenuItem>Woody</DropdownMenuItem>
                                        <DropdownMenuItem>Spicy</DropdownMenuItem>
                                        <DropdownMenuItem>Fruity</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="usage">Usage</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between">
                                            Select Usage
                                            <HiOutlineSelector className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                        <DropdownMenuItem>Everyday</DropdownMenuItem>
                                        <DropdownMenuItem>Formal</DropdownMenuItem>
                                        <DropdownMenuItem>Casual</DropdownMenuItem>
                                        <DropdownMenuItem>Bedtime</DropdownMenuItem>
                                        <DropdownMenuItem>Workout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="longevity">Longevity</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between">
                                                Select Longevity
                                                <HiOutlineSelector className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full">
                                            <DropdownMenuItem>Short</DropdownMenuItem>
                                            <DropdownMenuItem>Medium</DropdownMenuItem>
                                            <DropdownMenuItem>Long</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sillage">Sillage</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between">
                                                Select Sillage
                                                <HiOutlineSelector className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full">
                                            <DropdownMenuItem>Light</DropdownMenuItem>
                                            <DropdownMenuItem>Medium</DropdownMenuItem>
                                            <DropdownMenuItem>Heavy</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="occasion">Occasion</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between">
                                            Select Occasion
                                            <HiOutlineSelector className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                        <DropdownMenuItem>Everyday</DropdownMenuItem>
                                        <DropdownMenuItem>Formal</DropdownMenuItem>
                                        <DropdownMenuItem>Casual</DropdownMenuItem>
                                        <DropdownMenuItem>Date Night</DropdownMenuItem>
                                        <DropdownMenuItem>Special Occasion</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="photos">Product Photos</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="flex items-center justify-center border border-gray-200 rounded-lg h-32">
                                            <input type="file" id="photo1" className="hidden" />
                                            <label htmlFor="photo1" className="cursor-pointer">
                                                <MdAddPhotoAlternate className="w-24 h-24 text-gray-500" />
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-center border border-gray-200 rounded-lg h-32">
                                            <input type="file" id="photo2" className="hidden" />
                                            <label htmlFor="photo2" className="cursor-pointer">
                                                <MdAddPhotoAlternate className="w-24 h-24 text-gray-500" />
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-center border border-gray-200 rounded-lg h-32">
                                            <input type="file" id="photo3" className="hidden" />
                                            <label htmlFor="photo3" className="cursor-pointer">
                                                <MdAddPhotoAlternate className="w-24 h-24 text-gray-500" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="w-full mt-6 bg-blue-700 hover:bg-blue-800 ">
                                Sell Chanel No.5 Now <TbCubeSend size="24" className="ml-3"/>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}