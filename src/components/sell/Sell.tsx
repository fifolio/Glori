import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// UI
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Loading, { LoadingScreen } from "../ui/loading"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// ICONS
import { MdAddPhotoAlternate } from "react-icons/md";
import { TbCubeSend } from "react-icons/tb";

// STATES
import useUserId from "@/lib/states/userId"





export default function Sell() {

    // Update the page title
    document.title = `Glori | Sell New Perfume`;

    const
        navigate = useNavigate(),
        // Get Public state for the user ID
        { loggedinUserId } = useUserId(),
        [userID, setUserID] = useState<string>(''),
        [loadingSubmit, setLoadingSubmit] = useState<boolean>(false),
        [loadingScreen, setLoadingScreen] = useState<boolean>(false);;

    useEffect(() => {
        setUserID(loggedinUserId)
    }, [loggedinUserId])

    // Collect the form data values
    const
        [titleInSubmitBtn, setTitleInSubmitBtn] = useState<string>(''),
        [title, setTitle] = useState<string>(''),
        [description, setDescription] = useState<string>(''),
        [price, setPrice] = useState<string>(''),
        [size, setSize] = useState<string>(''),
        [fragranceFamily, setFragranceFamily] = useState<string>(''),
        [selectedIngredients, setSelectedIngredients] = useState<string[]>([]),
        [selectedFragranceNotes, setSelectedFragranceNotes] = useState<string[]>([]),
        [usage, setUsage] = useState<string>(''),
        [longevity, setLongevity] = useState<string>(''),
        [sillage, setSillage] = useState<string>(''),
        [occasion, setOccasion] = useState<string>(''),

        // Store the preview photo #1 + #2 + #3
        [photo1, setPhoto1] = useState<string | undefined>(undefined),
        [photo2, setPhoto2] = useState<string | undefined>(undefined),
        [photo3, setPhoto3] = useState<string | undefined>(undefined),
        // Store the preview photo #1 to upload
        [photo1PreProsessed, setPhoto1PreProsessed] = useState<File | undefined>(undefined),
        // Collect all the photos URL's after upload in an array
        [photos, setPhotos] = useState<string[]>([]);


    const
        defaultFragranceNotes: string[] = ['Rose', 'Jasmine', 'Lavender', 'Vanilla', 'Musk', 'Amber', 'Bergamot', 'Sandalwood', 'Patchouli', 'Cedarwood', 'Lemon', 'Orange Blossom', 'Iris', 'Vetiver', 'Tobacco', 'Coconut', 'Pineapple', 'Peach', 'Apple', 'Blackcurrant'],

        defaultIngredients: string[] = ['alcohol-denat', 'water', 'fragrance', 'benzyl-salicylate', 'limonene', 'linalool', 'coumarin', 'citronellol', 'geraniol', 'citral', 'eugenol', 'benzyl-benzoate', 'benzyl-alcohol', 'farnesol', 'isoeugenol', 'anise-alcohol', 'cinnamal'];

    const
        handleSelectedFragrance = (newValue: string) => {
            setSelectedFragranceNotes((prevSelectedValues) =>
                // If newValue is already in the array prevSelectedValues, 
                prevSelectedValues.includes(newValue) ?
                    // it filters out newValue from the array.
                    prevSelectedValues.filter((item) => item !== newValue) :
                    // If newValue is not in the array prevSelectedValues, it adds newValue to the array using the spread operator (...):
                    [...prevSelectedValues, newValue]);
        },
        handleSelectedIngredient = (newValue: string) => {
            // If newValue is already in the array prevSelectedValues,
            setSelectedIngredients((prevSelectedValues) => prevSelectedValues.includes(newValue) ?
                // it filters out newValue from the array.
                prevSelectedValues.filter((item) => item !== newValue) :
                // If newValue is not in the array prevSelectedValues, it adds newValue to the array using the spread operator (...):
                [...prevSelectedValues, newValue]);
        };


    // Update the placeholder text in the Submit Button with the Product name
    useEffect(() => {
        setTitleInSubmitBtn(title)
    }, [title])

    if (loadingScreen) {
        return <LoadingScreen />
    } else {
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
                                    <Input onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter product title" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Enter product description" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        {/* Occasion */}
                                        <Select onValueChange={(e) => setOccasion(e)}>
                                            <Label htmlFor="occasion">Occasion</Label>
                                            <SelectTrigger className="w- shadow-sm">
                                                <SelectValue placeholder="Select Occasion" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="date-night">Date Night</SelectItem>
                                                <SelectItem value="office-wear">Office Wear</SelectItem>
                                                <SelectItem value="evening-out">Evening Out</SelectItem>
                                                <SelectItem value="party">Party</SelectItem>
                                                <SelectItem value="summer">Summer</SelectItem>
                                                <SelectItem value="winter">Winter</SelectItem>
                                                <SelectItem value="spring">Spring</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Size */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Size</Label>
                                        <Select onValueChange={(e) => setSize(e)}>
                                            <SelectTrigger className="w- shadow-sm">
                                                <SelectValue placeholder="Choose bottle size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="50ml">50ml</SelectItem>
                                                <SelectItem value="100ml">100ml</SelectItem>
                                                <SelectItem value="150ml">150ml</SelectItem>
                                                <SelectItem value="200ml">200ml</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Fragrance Family */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="fragranceFamily">Fragrance Family</Label>
                                        <Select onValueChange={(e) => setFragranceFamily(e)}>
                                            <SelectTrigger className="w- shadow-sm">
                                                <SelectValue placeholder="Select Fragrance Family" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="floral">Floral</SelectItem>
                                                <SelectItem value="citrus">Citrus</SelectItem>
                                                <SelectItem value="woody">Woody</SelectItem>
                                                <SelectItem value="spicy">Spicy</SelectItem>
                                                <SelectItem value="fruity">Fruity</SelectItem>
                                                <SelectItem value="oriental">Oriental</SelectItem>
                                                <SelectItem value="aquatic">Aquatic</SelectItem>
                                                <SelectItem value="green">Green</SelectItem>
                                                <SelectItem value="gourmand">Gourmand</SelectItem>
                                                <SelectItem value="chypre">Chypre</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Usage */}
                                    <div className="grid gap-2">
                                        <Select onValueChange={(e) => setUsage(e)}>
                                            <Label htmlFor="usage">Usage</Label>
                                            <SelectTrigger className="w- shadow-sm">
                                                <SelectValue placeholder="Select Usage" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="everyday">Everyday</SelectItem>
                                                <SelectItem value="formal">Formal</SelectItem>
                                                <SelectItem value="casual">Casual</SelectItem>
                                                <SelectItem value="night-out">Night Out</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Longevity */}
                                    <div className="grid gap-2">
                                        <Select onValueChange={(e) => setLongevity(e)}>
                                            <Label htmlFor="longevity">Longevity</Label>
                                            <SelectTrigger className="w- shadow-sm">
                                                <SelectValue placeholder="Select Longevity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="short">Short</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="long">Long</SelectItem>
                                                <SelectItem value="very-long">Very Long</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Sillage */}
                                    <div className="grid gap-2">
                                        <Select onValueChange={(e) => setSillage(e)}>
                                            <Label htmlFor="sillage">Sillage</Label>
                                            <SelectTrigger className="w- shadow-sm">
                                                <SelectValue placeholder="Select Sillage" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="moderate">Moderate</SelectItem>
                                                <SelectItem value="heavy">Heavy</SelectItem>
                                                <SelectItem value="enormous">Enormous</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Fragrance Notes */}
                                    <div>
                                        <Label htmlFor="fragranceFamily">Fragrance Notes</Label>
                                        <div className="flex flex-row flex-wrap items-center mt-2">
                                            {defaultFragranceNotes.map((fragrance) => (
                                                <Button
                                                    type="button"
                                                    key={fragrance}
                                                    value={fragrance}
                                                    variant="outline"
                                                    onClick={() => handleSelectedFragrance(fragrance)}
                                                    className={`${selectedFragranceNotes.includes(fragrance) ? 'bg-green-500 text-white' : ''} w-fit mb-2 mr-2`}>
                                                    {fragrance.replace(/-/g, ' ')}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>


                                    {/* Ingredients */}
                                    <div>
                                        <Label htmlFor="ingredients">Ingredients</Label>
                                        <div className="flex flex-row flex-wrap items-center mt-2">
                                            {defaultIngredients.map((ingredient) => (
                                                <Button
                                                    type="button"
                                                    key={ingredient}
                                                    value={ingredient}
                                                    variant="outline"
                                                    onClick={() => handleSelectedIngredient(ingredient)}
                                                    className={`${selectedIngredients.includes(ingredient) ? 'bg-green-500 text-white' : ''} w-fit mb-2 mr-2`}>
                                                    {ingredient.replace(/-/g, ' ')}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input onChange={(e) => setPrice(e.target.value)} id="price" type="number" placeholder="Enter price" />
                                </div>

                                {/* Photos */}
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="photos">Product Photos</Label>
                                        <div className="flex md:flex-row flex-col justify-between md:mx-0 mx-auto md:space-y-0 space-y-3">

                                            <div className="border border-gray-300 rounded-lg md:w-[225px] w-[400px] md:h-[225px] h-[400px] hover:shadow-lg transition-shadow">
                                                <input type="file" id="photo1" className="hidden" />
                                                <label htmlFor="photo1" className="cursor-pointer">
                                                    {photo1 ? (
                                                        <>
                                                            <img src={`http://placeholder.co/200`} className="w-[100%] h-[100%] aspect-square rounded-lg object-cover shadow-lg border border-white" />
                                                        </>
                                                    ) : (
                                                        <span className="flex items-center h-full w-full">
                                                            <MdAddPhotoAlternate className="mx-auto w-[50%] h-[50%] text-gray-500" />
                                                        </span>
                                                    )}
                                                </label>
                                            </div>


                                            <div className="border border-gray-300 rounded-lg md:w-[225px] w-[400px] md:h-[225px] h-[400px] hover:shadow-lg transition-shadow">
                                                <input type="file" id="photo2" className="hidden" />
                                                <label htmlFor="photo1" className="cursor-pointer">
                                                    {photo1 ? (
                                                        <>
                                                            <img src={`${photo1}`} width={115} className="aspect-square rounded-full object-cover shadow-lg border border-white" />
                                                        </>
                                                    ) : (
                                                        <span className="flex items-center h-full w-full">
                                                            <MdAddPhotoAlternate className="mx-auto w-[50%] h-[50%] text-gray-500" />
                                                        </span>)}
                                                </label>
                                            </div>

                                            <div className="border border-gray-300 rounded-lg md:w-[225px] w-[400px] md:h-[225px] h-[400px] hover:shadow-lg transition-shadow">
                                                <input type="file" id="photo3" className="hidden" />
                                                <label htmlFor="photo1" className="cursor-pointer">
                                                    {photo1 ? (
                                                        <>
                                                            <img src={`${photo1}`} width={115} className="aspect-square rounded-full object-cover shadow-lg border border-white" />
                                                        </>
                                                    ) : (
                                                        <span className="flex items-center h-full w-full">
                                                            <MdAddPhotoAlternate className="mx-auto w-[50%] h-[50%] text-gray-500" />
                                                        </span>)}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-800 transition">

                                    {loadingSubmit ? <Loading w={24} /> : (<>Sell {titleInSubmitBtn} Now <TbCubeSend size="24" className="ml-2" /></>)}
                                </Button>
                            </form>
                        </div>
                    </div >
                </div >
            </div >
        )
    }
}