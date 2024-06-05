import { Link } from "react-router-dom"
import { useEffect } from "react"

// UI
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
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

// ICONS
import { IoShareSocial } from "react-icons/io5";
// import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";



interface Perfume {
    perfumeID: string;
}

export default function Perfume({ perfumeID }: Perfume) {

    console.log(perfumeID)

    const perfumeCollection: string = 'Luxury Classics',
        perfumeName: string = 'Chanel No 5 Eau De Toilette',
        perfumeOwner: string = 'Chanel',
        perfumePrice: number = 45.99


    // Get the current page URL for the Share button
    const pageURL = window.location.href;

    // Scroll top when perfumeID updated
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    useEffect(() => {
        // Update the page title with the current perfume name
        document.title = `Glori | ${perfumeName}`;

        // calling scroll top function
        scrollTopFunc()
    }, [perfumeID])

    return (

        <div className="bg-[#f8f9fb] rounded-xl pb-6">

            {/* Perfume details: breadcrumb, name, owner, price */}
            <header className="xl:flex items-center py-6 px-4 md:px-6 mt-8 w-full">
                <Breadcrumb className="w-full xl:w-1/2">
                    <BreadcrumbList>
                        <BreadcrumbItem className="sm:block hidden">
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="sm:block hidden" />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/collections" className="sm:block hidden">Collections</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="sm:block hidden" />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/collections/${perfumeCollection}`}>{perfumeCollection}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Perfumes</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="xl:container flex items-center justify-between w-2/2 sm:mt-auto mt-2">
                    <div className="sm:flex items-center sm:space-x-3">
                        <div className="text-2xl font-bold">{perfumeName}</div>
                        <div className="text-gray-900 pt-1 ">by
                            <Link to="/store/id" className="ml-1 font-bold">
                                {perfumeOwner}
                            </Link>
                        </div>
                    </div>
                    <div className="sm:text-4xl text-2xl font-bold sm:block hidden">
                        ${perfumePrice}
                    </div>
                </div>
            </header>

            {/* Perfume details: gallery, details */}
            <div className="lg:flex w-full items-start justify-between px-4">

                {/* gallery */}
                <div className="gallery w-full min-h-[500px]">
                    <Carousel className="hover:cursor-w-resize mx-auto">
                        <CarouselContent>
                            <CarouselItem><img src="https://hips.hearstapps.com/hmg-prod/images/06-ic32-n5-100ans-carre-6-hd-1616167247.png" className="rounded-lg aspect-square object-cover min-h-[650px]" /></CarouselItem>
                            <CarouselItem><img src="https://www.sephora.com/productimages/sku/s719260-main-zoom.jpg" className="rounded-lg aspect-square object-cover min-h-[650px]" /></CarouselItem>
                            <CarouselItem><img src="https://thebeautygypsy.com/wp-content/uploads/2021/05/chanel-no-5-history-1500x2250-optimized.jpg" className="rounded-lg aspect-square object-cover min-h-[650px]" /></CarouselItem>
                        </CarouselContent>

                    </Carousel>
                </div>

                {/* Details / Payment */}
                <div className="flex-col w-full lg:px-6 lg:mt-2 mt-4">
                    <h2 className="text-lg font-bold mb-3">About the Fragrance</h2>

                    <div className="w-full mb-3 text-[15px]">
                        <p>
                            Experience the captivating essence of Acme Luxury Perfume, a sophisticated blend of the finest
                            ingredients. This exquisite fragrance opens with a vibrant citrus note, followed by a heart of delicate
                            floral accords and a warm, sensual base.
                        </p>

                        <h2 className="text-lg font-bold my-3">Additional Information</h2>
                        <div className="w-full mb-3 mt-2">
                            <div className="flex-col sm:flex sm:flex-row mb-1 sm:mb-0 items-center sm:space-x-2">
                                <div className="text-gray-500 dark:text-gray-400">Fragrance Notes:</div>
                                <div>Bergamot, Jasmine, Sandalwood</div>
                            </div>
                            <div className="flex-col sm:flex sm:flex-row mb-1 sm:mb-0 items-center sm:space-x-2">
                                <div className="text-gray-500 dark:text-gray-400">Fragrance Family:</div>
                                <div>Floral, Woody</div>
                            </div>
                            <div className="flex-col sm:flex sm:flex-row mb-1 sm:mb-0 items-center sm:space-x-2">
                                <div className="text-gray-500 dark:text-gray-400">Ingredients:</div>
                                <div>Alcohol Denat., Fragrance, Aqua</div>
                            </div>
                            <div className="flex-col sm:flex sm:flex-row mb-1 sm:mb-0 items-center sm:space-x-2">
                                <div className="text-gray-500 dark:text-gray-400">Usage:</div>
                                <div>Apply to pulse points and enjoy</div>
                            </div>

                            <div className="flex-col sm:flex sm:flex-row mb-1 sm:mb-0 items-center sm:space-x-2">
                                <div className="text-gray-500 dark:text-gray-400">Longevity:</div>
                                <div>6-8 hours</div>
                            </div>
                            <div className="flex-col sm:flex sm:flex-row mb-1 sm:mb-0 items-center sm:space-x-2">
                                <div className="text-gray-500 dark:text-gray-400">Sillage:</div>
                                <div>Moderate</div>
                            </div>
                            <div className="flex-col sm:flex sm:flex-row mb-1 sm:mb-0 items-center sm:space-x-2">
                                <div className="text-gray-500 dark:text-gray-400">Occasion:</div>
                                <div>Formal, Evening</div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold my-3">Purchase Options</h2>

                    {/* Size */}
                    <div className="flex-col w-full mb-2 ">
                        <Label htmlFor="size" className="mb-2">Size</Label>
                        <RadioGroup className="flex-col sm:flex sm:flex-row items-center sm:space-x-1" defaultValue="50ml" id="size">
                            <Label
                                className="bg-white border cursor-pointer rounded-md px-4 py-2 flex items-center space-x-2 
                                [&:has(:checked)]:bg-green-500"
                                htmlFor="size-50ml"
                            >
                                <RadioGroupItem id="size-50ml" value="50ml" />
                                <span>50ml</span>
                            </Label>
                            <Label
                                className="bg-white border cursor-pointer rounded-md px-4 py-2 flex items-center space-x-2 
                                [&:has(:checked)]:bg-green-500"
                                htmlFor="size-100ml"
                            >
                                <RadioGroupItem id="size-100ml" value="100ml" />
                                <span>100ml (+ $50)</span>
                            </Label>
                            <Label
                                className="bg-white border cursor-pointer rounded-md px-4 py-2 flex items-center space-x-2 
                                [&:has(:checked)]:bg-green-500"
                                htmlFor="size-200ml"
                            >
                                <RadioGroupItem id="size-200ml" value="200ml" />
                                <span>200ml (+ $100)</span>
                            </Label>
                        </RadioGroup>
                    </div>

                    {/* Quantity */}
                    <div className="flex-col w-24 mb-10">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Select defaultValue="1">
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    <Separator />
                    {/* Purchase Options */}
                    <div className="flex-col sm:flex sm:flex-row mt-5">

                        {/* Share dialog */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="flex justify-between mr-3 md:p-6 p-5 border w-full sm:w-auto">
                                    <div className="mr-4">
                                        <IoShareSocial size="20" />
                                    </div>
                                    <div>
                                        Share
                                    </div>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Share this Perfume</DialogTitle>
                                    <DialogDescription>
                                        Share this perfume with friends! Anyone with the link can view this page.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center space-x-2">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="link" className="sr-only">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
                                            defaultValue={pageURL}
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

                        {/* Like Button */}
                        <div className="flex justify-center sm:justify-start mb-4 mr-4 sm:mb-0 space-x-2 w-full mt-3 sm:mt-0">
                            <Button className="flex justify-between md:p-6 p-5 border w-full sm:w-auto" variant="outline">
                                <div className="mr-4">
                                    <FaRegHeart size="20" />
                                    {/* <FcLike size="20"/> */}
                                </div>
                                <div>
                                    Like
                                </div>
                            </Button>
                        </div>

                        {/* Add to Cart / Buy Now */}
                        <div className="flex justify-center sm:justify-end mb-4 sm:mb-0 w-full sm:w-1/2">
                            <Button className="flex md:p-6 p-5 border w-full sm:w-auto">
                                <div className="mr-4">
                                    (${perfumePrice})
                                </div>
                                <div>
                                    Add to Cart
                                </div>
                            </Button>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}