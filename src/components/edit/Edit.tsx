import { Link } from "react-router-dom"

// UI
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// ICONS
import { HiOutlineSelector } from "react-icons/hi";
import { MdAddPhotoAlternate } from "react-icons/md";





export default function Edit() {

    // Update the page title
    document.title = `Glori | Sell New Perfume`;

    // Fake Data
    const perfumeTitle = 'Chanel No. 5';


    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    return (
        <div>
            {/* Form */}
            <div className="container md:w-[750px] mx-auto px-4 md:px-6 pt-16 pb-28">
                <div className="grid md:grid-cols-1">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <h1 className="text-3xl font-bold">Edit {perfumeTitle}</h1>
                            <p className="text-gray-500">
                                Fill out the form below to update your perfume details on Glori.
                            </p>
                        </div>
                        <form className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Product Title</Label>
                                <Input id="title" placeholder="Enter product title" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Enter product description" className="h-44" />
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
                                        <div className="flex items-center justify-center border border-gray-300 rounded-lg h-32">
                                            <input type="file" id="photo1" className="hidden" />
                                            <label htmlFor="photo1" className="cursor-pointer">
                                                <MdAddPhotoAlternate className="w-24 h-24 text-gray-500" />
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-center border border-gray-300 rounded-lg h-32">
                                            <input type="file" id="photo2" className="hidden" />
                                            <label htmlFor="photo2" className="cursor-pointer">
                                                <MdAddPhotoAlternate className="w-24 h-24 text-gray-500" />
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-center border border-gray-300 rounded-lg h-32">
                                            <input type="file" id="photo3" className="hidden" />
                                            <label htmlFor="photo3" className="cursor-pointer">
                                                <MdAddPhotoAlternate className="w-24 h-24 text-gray-500" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cancel + Save Updates */}
                            <div className="flex items-center space-x-3">
                                <Link to="/store/id" onClick={scrollTopFunc}>
                                    <Button type="submit" className="w-fit">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 ">
                                    Save Updates
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}