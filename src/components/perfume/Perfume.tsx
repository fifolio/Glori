import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

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
import { toast } from "sonner"
import Loading, { LoadingScreen } from "../ui/loading"

// ICONS
import { IoShareSocial } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { FcLike } from "react-icons/fc"

// SERVICES
import { getProduct } from "@/backend/services/products/getProduct"
import { getStore } from "@/backend/services/store/getStore"
import { getLikes } from "@/backend/services/products/getLikes"
import { updateIsLiked } from "@/backend/services/products/updateIsLiked"
import { createIsLiked } from "@/backend/services/products/createIsLiked"
import { addToCart } from "@/backend/services/cart/addToCart"

// STATES
import useLoadingPerfume from "@/lib/states/useLoadingPerufme"
import useIsLiked from "@/lib/states/useIsLiked"
import useUserState from "@/lib/states/userStates"
import useUserId from "@/lib/states/userId"
import useUpdateCart from "@/lib/states/useUpdateCart"
import usePerfumeCategory from "@/lib/states/usePerfumeCategory"


export default function Perfume() {

    // set the category from the public state
    const { setCategory } = usePerfumeCategory();

    const
        { loggedinUserId } = useUserId(),
        { id: perfumeId } = useParams<string>(),
        // Check if user logged-in
        { isLoggedin } = useUserState(),
        // Check if user has related feedback to the current product
        [hasFeedbackDoc, setHasFeedbackDoc] = useState<boolean | null>(null),
        navigate = useNavigate(),
        { loadingPerfume, setLoadingPerfume } = useLoadingPerfume(),
        [loadingAddaingToCart, setLoadingAddingToCart] = useState<boolean>(false);


    const { cartState, setCartState } = useUpdateCart();

    const
        // Get product details from API and pass the data to the UI
        [fragranceFamily, setFragranceFamily] = useState<string>(''),
        [fragranceNotes, setFragranceNotes] = useState<string[]>([]),
        [ingredients, setIngredients] = useState<string[]>([]),
        [description, setDescription] = useState<string>(''),
        [collection, setCollection] = useState<string>(''),
        [longevity, setLongevity] = useState<string>(''),
        [storeName, setStoreName] = useState<string>(''),
        [occasion, setOccasion] = useState<string>(''),
        [photos, setPhotos] = useState<string[]>([]),
        [sillage, setSillage] = useState<string>(''),
        [storeId, setStoreId] = useState<string>(''),
        [usage, setUsage] = useState<string>(''),
        [title, setTitle] = useState<string>(''),
        [price, setPrice] = useState<string>(''),
        [sizes, setSizes] = useState<string[]>([]);


    const
        // Collect the data for Cart
        [selectedQuantity, setSelectedQuantity] = useState<string>('1'),
        [selectedSize, setSelectedSize] = useState<string | null>(null);


    // Calculate the final Price function 
    function calcFinalPrice() {

        let defaultPrice: number = Number(price);
        let finalPrice: number = defaultPrice;

        // Validate and calculate quantity
        let quantity: number = Number(selectedQuantity);
        if (quantity >= 1 && quantity <= 5) {
            finalPrice *= quantity;
        } else {
            quantity = 1; // Default to 1 if the selected quantity is out of range
        }

        // Add price for size if selected
        if (selectedSize === '100') {
            finalPrice += 50;
        } else if (selectedSize === '200') {
            finalPrice += 100;
        }

        return finalPrice
    }

    // Pass the current use Feedback to the UI
    const { isLiked, setIsLiked } = useIsLiked();

    // Handle update isLiked State func
    async function handleUpdateIsLiked(newState: boolean) {
        if (isLoggedin) {
            if (hasFeedbackDoc) {
                setIsLiked(newState)
                await updateIsLiked(storeId, perfumeId as string, newState);
            } else if (!hasFeedbackDoc) {
                await createIsLiked(
                    loggedinUserId,
                    perfumeId as string,
                    newState
                ).then((res) => {
                    setIsLiked(res.isLiked)
                })
            }
        } else {
            setIsLiked(false)
            toast.error("Please Log-in or Sign-up to activate the Like button.")
        }
    }

    // Handle AddtoCart func.
    async function handleAddToCart() {

        // Validations
        if (selectedSize == null) {
            return toast.error('You must select which bottle size will be added to your cart')
        }

        if (isLoggedin) {
            setLoadingAddingToCart(true)

            await addToCart({
                userId: loggedinUserId,
                productTitle: title,
                productDetails: perfumeId as string,
                size: Number(selectedSize),
                quantity: Number(selectedQuantity),
                defaultPrice: Number(price)
            })
                .then(() => {
                    setCartState(!cartState)
                    toast.success(`Added ${title} to your cart successfully`)
                    setLoadingAddingToCart(false)
                })
        } else {
            toast.error(`Oops! You must log-in or Sign-up first to Add items`)
        }
    }


    // Scroll top when perfumeID updated
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    // Set the Page title
    document.title = `Glori | ${title ? title : 'Loading...'}`;

    // Handle Copy Store Link
    function copyStoreLink() {
        const linkElement = document.getElementById("perfumeLink") as HTMLInputElement;
        const value = linkElement.value;
        navigator.clipboard.writeText(value)
        toast.success("Perfume Link Copied")
    }


    useEffect(() => {
        if (isLoggedin) {
            // get the isLiked value and pass it as a State
            async function handleGetIsLiked() {
                await getLikes(`${perfumeId}`, `${storeId}`)
                    .then((res) => {
                        if (res.length > 0) {
                            setHasFeedbackDoc(true)
                            setIsLiked(res[0].isLiked)
                        } else {
                            setHasFeedbackDoc(false);
                        }
                    });
            }
            handleGetIsLiked();
        } else {
            setIsLiked(false)
        }
    }, [isLoggedin, storeId])

    useEffect(() => {
        // calling scroll top function
        scrollTopFunc()

        if (perfumeId) {
            async function getCurrentProduct() {
                const results = await getProduct(`${perfumeId}`)

                if (results) {
                    if (results.code === 404) {
                        navigate('/')
                        document.title = `Glori | House of Fragrances`;
                    } else {

                        await getStore(results.userId)
                            .then((store) => {
                                setStoreId(store.$id)
                                setStoreName(store.name)
                            })

                        setFragranceFamily(results.fragranceFamily)
                        setFragranceNotes(results.fragranceNotes)
                        setIngredients(results.ingredients)
                        setDescription(results.description)
                        setCollection(results.collection)
                        setLongevity(results.longevity)
                        setOccasion(results.occasion)
                        setPhotos(results.photos)
                        setSillage(results.sillage)
                        setUsage(results.usage)
                        setTitle(results.title)
                        setPrice(results.price)
                        setSizes(results.size)

                        // Set public 'collection' state
                        setCategory(results.collection)
                    }
                }
                setTimeout(() => {
                    setLoadingPerfume(false)
                }, 1000)

            }
            // Run Get current product details func.
            getCurrentProduct();

            // Run the final price calc func.
            calcFinalPrice();
        }
    }, [perfumeId]);

    if (loadingPerfume === true) {
        return <LoadingScreen />
    } else {
        return (
            <div className="bg-[#f8f9fb] rounded-xl pb-6">

                {/* Perfume details: breadcrumb, name, owner, price */}
                <header className="xl:flex items-center py-6 px-4 md:px-6 mt-8 w-full">
                    <Breadcrumb className="sm:w-[500px] w-[320px] capitalize sm:ml-0 ml-[-5px] mr-0 pr-0">
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
                                <BreadcrumbLink href={`/collections/${collection}`}>{collection}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Perfumes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="xl:container flex items-center justify-between w-2/2 sm:mt-auto mt-2">
                        <div className="sm:flex items-left">
                            <div className="text-gray-900 text-left">
                                <span className="font-bold text-2xl">
                                    {title}
                                </span>
                                <span className="mx-2">
                                    By
                                </span>
                                <Link to={`/store/${storeId}`} className="font-bold">
                                    {storeName}
                                </Link>
                            </div>
                        </div>
                        <div className="sm:text-4xl text-2xl font-bold sm:block hidden">
                            ${price}
                        </div>
                    </div>
                </header>

                {/* Perfume details: gallery, details */}
                <div className="lg:flex w-full items-start justify-between px-4 capitalize">
                    <center className="sm:w-fit w-auto">
                        {/* gallery */}
                        <div className="gallery sm:min-w-[400px] w-full min-h-[400px]">
                            <Carousel className="hover:cursor-w-resize mx-auto">
                                <CarouselContent>
                                    <CarouselItem><img src={`${photos[0]}`} className="rounded-lg aspect-square object-cover min-h-[650px]" /></CarouselItem>
                                    <CarouselItem><img src={`${photos[1]}`} className="rounded-lg aspect-square object-cover min-h-[650px]" /></CarouselItem>
                                    <CarouselItem><img src={`${photos[2]}`} className="rounded-lg aspect-square object-cover min-h-[650px]" /></CarouselItem>
                                </CarouselContent>

                            </Carousel>
                        </div>
                    </center>


                    {/* Details / Payment */}
                    <div className="flex-col flex-wrap w-full lg:px-6 lg:mt-2 mt-4">
                        <h2 className="text-lg font-bold mb-3">About the Fragrance</h2>

                        <div className=" max-w-[100%] mb-3 text-[15px]">
                            <p className="text-md font-light lowercase">
                                {description}
                            </p>

                            <h2 className="text-lg font-bold my-3">Additional Information</h2>

                            <div className="mb-3 mt-2">

                                <div className="w-[100%] flex-col flex-wrap lg:flex lg:flex-row mb-1 sm:mb-0 items-left">
                                    <div className="font-semibold mr-1">Fragrance Notes:</div>
                                    {fragranceNotes.map((fragrance, index) => (
                                        <span key={index} className="mr-1 text-md font-light">
                                            {index === fragranceNotes.length - 1 ? fragrance.replace('-', ' ') : `${fragrance.replace('-', ' ')}, `}
                                        </span>
                                    ))}
                                </div>

                                <div className="w-[100%] flex-col flex-wrap lg:flex lg:flex-row mb-1 sm:mb-0 items-left">
                                    <div className="font-semibold mr-1">Ingredients:</div>
                                    {ingredients.map((ingredient, index) => (
                                        <span key={index} className="mr-1 text-md font-light">
                                            {index === ingredients.length - 1 ? ingredient.replace('-', ' ') : `${ingredient.replace('-', ' ')}, `}
                                        </span>
                                    ))}
                                </div>

                                <div className="w-[100%] flex-col flex-wrap lg:flex lg:flex-row mb-1 sm:mb-0 items-left">
                                    <div className="font-semibold mr-1">Fragrance Family:</div>
                                    <div className="text-md font-light">
                                        {fragranceFamily}
                                    </div>
                                </div>

                                <div className="w-[100%] flex-col flex-wrap lg:flex lg:flex-row mb-1 sm:mb-0 items-left">
                                    <div className="font-semibold mr-1">Usage:</div>
                                    <div className="mr-1 text-md font-light">
                                        {usage.replace('-', ' ')}
                                    </div>
                                </div>

                                <div className="w-[100%] flex-col flex-wrap lg:flex lg:flex-row mb-1 sm:mb-0 items-left">
                                    <div className="font-semibold mr-1">Longevity:</div>
                                    <div className="mr-1 text-md font-light">
                                        {longevity.replace('-', ' ')}
                                    </div>
                                </div>

                                <div className="w-[100%] flex-col flex-wrap lg:flex lg:flex-row mb-1 sm:mb-0 items-left">
                                    <div className="font-semibold mr-1">Sillage:</div>
                                    <div className="mr-1 text-md font-light">
                                        {sillage}
                                    </div>
                                </div>

                                <div className="w-[100%] flex-col flex-wrap lg:flex lg:flex-row mb-1 sm:mb-0 items-left">
                                    <div className="font-semibold mr-1">Occasion:</div>
                                    <div className="mr-1 text-md font-light">
                                        {occasion}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-lg font-bold my-3">Purchase Options</h2>

                        <div className="flex flex-row mb-3 w-full">

                            {/* Quantity */}
                            <div className="w-20 mr-3">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Select defaultValue="1" onValueChange={e => setSelectedQuantity(e)}>
                                    <SelectTrigger className="bg-white mt-2 shadow-none">
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

                            {/* Size */}
                            <div className="w-full mr-3">
                                <Label htmlFor="quantity">Available Size</Label>
                                <RadioGroup onValueChange={e => setSelectedSize(e)} id="size" className="flex flex-row mt-2">
                                    {sizes.map((size, index) => (
                                        <Label
                                            className="bg-white border cursor-pointer rounded-md px-4 py-2 space-x-2 flex items-center w-fit"
                                            htmlFor="size"
                                            key={index}
                                        >
                                            <RadioGroupItem key={index} id="size" value={size === '100ml' ? '100' : size === '200ml' ? '200' : '50'} />
                                            <span key={index + 2}>{size == '100ml' ? '100ml (+50)' : size == '200ml' ? '200ml (+$100)' : size}</span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>


                        <Separator />

                        {/* Purchase Options */}
                        <div className="flex-col sm:flex sm:flex-row mt-4">

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
                                            <Label htmlFor="perfumeLink" className="sr-only">
                                                Link
                                            </Label>
                                            <Input
                                                id="perfumeLink"
                                                defaultValue={window.location.href}
                                                readOnly
                                            />
                                        </div>
                                        <Button type="button" onClick={copyStoreLink} size="sm" className="px-3">
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
                                {isLoggedin && isLiked === true ? (
                                    <Button onClick={() => handleUpdateIsLiked(false)} type="button" className="flex justify-between hover:border-gray-300 md:p-6 p-5 border border-red-300 w-full sm:w-auto bg-pink-200 text-pink-600" variant="outline">
                                        <div className="mr-4">
                                            <FcLike size="20" />
                                        </div>
                                        <div>
                                            Liked
                                        </div>
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleUpdateIsLiked(true)} type="button" className="flex justify-between md:p-6 p-5 border w-full sm:w-auto" variant="outline">
                                        <div className="mr-4">
                                            <FaRegHeart size="20" />
                                        </div>
                                        <div>
                                            Like
                                        </div>
                                    </Button>
                                )}
                                {/* {loggedinUserId.length > 2 && isLiked === true ? (
                                    <Button onClick={() => handleUpdateIsLiked(false)} type="button" className="flex justify-between hover:border-gray-300 md:p-6 p-5 border border-red-300 w-full sm:w-auto bg-pink-200 text-pink-600" variant="outline">
                                        <div className="mr-4">
                                            <FcLike size="20" />
                                        </div>
                                        <div>
                                            Liked
                                        </div>
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleUpdateIsLiked(true)} type="button" className="flex justify-between md:p-6 p-5 border w-full sm:w-auto" variant="outline">
                                        <div className="mr-4">
                                            <FaRegHeart size="20" />
                                        </div>
                                        <div>
                                            Like
                                        </div>
                                    </Button>
                                )} */}
                            </div>

                            {/* Add to Cart / Buy Now */}
                            <div className="flex justify-center sm:justify-end mb-4 sm:mb-0 w-full sm:w-1/2">
                                <Button disabled={loadingAddaingToCart} onClick={() => handleAddToCart()} className="flex md:p-6 p-5 border w-full sm:w-auto">
                                    {loadingAddaingToCart ? (
                                        <Loading w={24} />
                                    ) : (
                                        <>
                                            <div className="mr-4">
                                                (${calcFinalPrice()})
                                            </div>
                                            Add to Cart
                                        </>
                                    )}
                                </Button>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        )
    }
}
