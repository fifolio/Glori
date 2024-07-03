import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// SERVICES
import { handleCreateProduct } from "@/backend/services/products/createProduct"

// UI
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Loading from "../ui/loading"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"


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
        [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    useEffect(() => {
        setUserID(loggedinUserId)
    }, [loggedinUserId])

    const
        // Collect the form data values
        [title, setTitle] = useState<string>(''),
        [description, setDescription] = useState<string>(''),
        [price, setPrice] = useState<string>(''),
        [size, setSize] = useState<string>(''),
        [fragranceFamily, setFragranceFamily] = useState<string>(''),
        [selectedIngredients, setSelectedIngredients] = useState<string[]>([]),
        [selectedFragranceNotes, setSelectedFragranceNotes] = useState<string[]>([]),
        [selectedCollections, setSelectedCollections] = useState<string[]>([]),
        [usage, setUsage] = useState<string>(''),
        [longevity, setLongevity] = useState<string>(''),
        [sillage, setSillage] = useState<string>(''),
        [occasion, setOccasion] = useState<string>(''),

        // Store the preview photo #1 + #2 + #3
        [photo1Preview, setPhoto1Preview] = useState<string | undefined>(undefined),
        [photo2Preview, setPhoto2Preview] = useState<string | undefined>(undefined),
        [photo3Preview, setPhoto3Preview] = useState<string | undefined>(undefined),

        // Store the photo #1 + #2 + #3 to upload
        [photo1ToUpload, setPhoto1ToUpload] = useState<File | undefined>(undefined),
        [photo2ToUpload, setPhoto2ToUpload] = useState<File | undefined>(undefined),
        [photo3ToUpload, setPhoto3ToUpload] = useState<File | undefined>(undefined);

    const
        defaultFragranceNotes: string[] = ['Rose', 'Jasmine', 'Lavender', 'Vanilla', 'Musk', 'Amber', 'Bergamot', 'Sandalwood', 'Patchouli', 'Cedarwood', 'Lemon', 'Orange Blossom', 'Iris', 'Vetiver', 'Tobacco', 'Coconut', 'Pineapple', 'Peach', 'Apple', 'Blackcurrant'],

        defaultIngredients: string[] = ['alcohol-denat', 'water', 'fragrance', 'benzyl-salicylate', 'limonene', 'linalool', 'coumarin', 'citronellol', 'geraniol', 'citral', 'eugenol', 'benzyl-benzoate', 'benzyl-alcohol', 'farnesol', 'isoeugenol', 'anise-alcohol', 'cinnamal'],

        collections: string[] = ['luxury', 'warm', 'florals', 'fresh', 'unisex', 'limited'];

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
        },
        handleSelectedCollections = (newValue: string) => {
            setSelectedCollections((prevSelectedValues) => prevSelectedValues.includes(newValue) ?
                prevSelectedValues.filter((item) => item !== newValue) : [...prevSelectedValues, newValue])
        };

    // Handle form submit
    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadingSubmit(true);

        // Checks and Validations
        // Photos
        if (photo1Preview === undefined || photo2Preview === undefined || photo3Preview === undefined) {
            toast.error("Oops! You need to upload 3 Photos of your perfume to continue.");
            setLoadingSubmit(false);

            // Ingredients
        } else if (selectedIngredients.length < 1) {
            toast.error("Oops! You need to select at least 1 ingredient of your perfume to continue.");
            setLoadingSubmit(false);

            // Fragrance Notes
        } else if (selectedFragranceNotes.length < 1) {
            toast.error("Oops! You need to select at least 1 Fragrance note of your perfume to continue.");
            setLoadingSubmit(false);

            // Collections
        } else if (selectedCollections.length < 1) {
            toast.error("Oops! You need to select in which collection your perfume should be listed to continue.");
            setLoadingSubmit(false);

            // Size
        } else if (size === '') {
            toast.error("Oops! You need to select what is the size of your perfume bottle to continue.");
            setLoadingSubmit(false);

            // Fragrance Family
        } else if (fragranceFamily === '') {
            toast.error("Oops! You must select what is Fragrance Family of your perfume to continue.");
            setLoadingSubmit(false);

            // Usage
        } else if (usage === '') {
            toast.error("Oops! You must select the usage of your perfume to continue.");
            setLoadingSubmit(false);

            // Longevity
        } else if (longevity === '') {
            toast.error("Oops! You must select the longevity of your perfume to continue.");
            setLoadingSubmit(false);

            // Sillage
        } else if (sillage === '') {
            toast.error("Oops! You must select the sillage of your perfume to continue.");
            setLoadingSubmit(false);

            // occasion
        } else if (occasion === '') {
            toast.error("Oops! You must select the occasion of your perfume to continue.");
            setLoadingSubmit(false);
        } else {
            // Handle Photos Upload
            const
                photo1Data = new FormData(),
                photo2Data = new FormData(),
                photo3Data = new FormData();

            photo1Data.append("file", photo1ToUpload ? photo1ToUpload : '');
            photo1Data.append("upload_preset", "glorious");

            photo2Data.append("file", photo2ToUpload ? photo2ToUpload : '');
            photo2Data.append("upload_preset", "glorious");

            photo3Data.append("file", photo3ToUpload ? photo3ToUpload : '');
            photo3Data.append("upload_preset", "glorious");

            const uploadPhoto = async (photoData: FormData) => {
                try {
                    const res = await axios.post("https://api.cloudinary.com/v1_1/dprqv5quy/image/upload", photoData);
                    return res.data.url;
                } catch (error) {
                    console.error("Error uploading photo:", error);
                    return null;
                }
            };

            // Collect all the photos URL's after upload in an array
            const photosUrls: string[] = [];

            const photo1Url = await uploadPhoto(photo1Data);
            if (photo1Url) photosUrls.push(photo1Url);

            const photo2Url = await uploadPhoto(photo2Data);
            if (photo2Url) photosUrls.push(photo2Url);

            const photo3Url = await uploadPhoto(photo3Data);
            if (photo3Url) photosUrls.push(photo3Url);

            if (photosUrls.length === 3) {
                await handleCreateProduct({
                    userId: userID,
                    title: title,
                    description: description,
                    price: price,
                    size: size,
                    fragranceFamily: fragranceFamily,
                    ingredients: selectedIngredients,
                    fragranceNotes: selectedFragranceNotes,
                    usage: usage,
                    longevity: longevity,
                    sillage: sillage,
                    occasion: occasion,
                    photos: photosUrls,
                    collections: selectedCollections,
                }).then((response) => {
                    const perfumeId = response?.$id;
                    toast.success(`You just listed ${title} to sell successfully`);
                    setLoadingSubmit(false);
                    setTimeout(() => {
                        navigate(`/perfumes/${perfumeId}`);
                        // Scroll top
                        window.scrollTo({
                            top: -10,
                            behavior: 'instant'
                        });
                    }, 1000)
                });
            } else {
                setLoadingSubmit(false);
                toast.error("Oops! There was an issue uploading the photos. Please try again.");
            }
        }
    }



    return (
        <div>
            {/* Header */}
            <header className="relative bg-[#F5F5F5] mt-10 py-20 md:py-32 lg:py-40 sm:rounded-xl overflow-hidden">
                <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
                    <source src='https://videos.pexels.com/video-files/7815734/7815734-hd_1280_720_25fps.mp4' type="video/mp4" />
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
                        <form onSubmit={(e) => handleFormSubmit(e)} className="grid gap-6">

                            {/* title */}
                            <div className="grid gap-2">
                                <Label htmlFor="title">Product Title</Label>
                                <Input required onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter product title" />
                            </div>

                            {/* Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Enter product description" />
                            </div>

                            {/* Collections */}
                            <div className="grid gap-2">
                                <Label htmlFor="collection">Collection</Label>
                                <div className="flex flex-row flex-wrap items-center mt-2">
                                    {collections.map((collection) => (
                                        <Button
                                            type="button"
                                            key={collection}
                                            value={collection}
                                            variant="outline"
                                            onClick={() => handleSelectedCollections(collection)}
                                            className={`${selectedCollections.includes(collection) ? 'bg-blue-500 text-white' : ''} w-fit capitalize  mr-2 md:mb-0 mb-2`}>
                                            {collection}
                                        </Button>
                                    ))}
                                </div>
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
                                    <Label htmlFor="size">Size</Label>
                                    <Select onValueChange={(e) => setSize(e)}>
                                        <SelectTrigger className="w- shadow-sm">
                                            <SelectValue placeholder="Choose bottle size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="50ml">50ml</SelectItem>
                                            <SelectItem value="100ml">100ml</SelectItem>
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
                                <Input required onChange={(e) => setPrice(e.target.value)} id="price" type="number" placeholder="Enter price" />
                            </div>

                            {/* Photos */}
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="photos">Product Photos</Label>
                                    <div className="flex md:flex-row flex-col justify-between md:mx-0 mx-auto md:space-y-0 space-y-3">

                                        <div className="border border-gray-300 rounded-lg md:w-[225px] w-[400px] md:h-[225px] h-[400px] hover:shadow-lg transition-shadow">
                                            <input type="file" id="photo1" className="hidden" onChange={(e) => {
                                                const preview = URL.createObjectURL(e.target.files?.[0] as File);
                                                setPhoto1Preview(preview);
                                                const photoToUpload = e.target.files?.[0];
                                                setPhoto1ToUpload(photoToUpload)
                                            }} />
                                            <label htmlFor="photo1" className="cursor-pointer">
                                                {photo1Preview ? (
                                                    <>
                                                        <img src={`${photo1Preview}`} className="w-[100%] h-[100%] aspect-square rounded-lg object-cover shadow-lg border border-white" />
                                                    </>
                                                ) : (
                                                    <span className="flex items-center h-full w-full">
                                                        <MdAddPhotoAlternate className="mx-auto w-[50%] h-[50%] text-gray-500" />
                                                    </span>
                                                )}
                                            </label>
                                        </div>


                                        <div className="border border-gray-300 rounded-lg md:w-[225px] w-[400px] md:h-[225px] h-[400px] hover:shadow-lg transition-shadow">
                                            <input type="file" id="photo2" className="hidden" onChange={(e) => {
                                                const preview = URL.createObjectURL(e.target.files?.[0] as File);
                                                setPhoto2Preview(preview);
                                                const photoToUpload = e.target.files?.[0];
                                                setPhoto2ToUpload(photoToUpload)
                                            }} />
                                            <label htmlFor="photo2" className="cursor-pointer">
                                                {photo2Preview ? (
                                                    <>
                                                        <img src={`${photo2Preview}`} className="w-[100%] h-[100%] aspect-square rounded-lg object-cover shadow-lg border border-white" />
                                                    </>
                                                ) : (
                                                    <span className="flex items-center h-full w-full">
                                                        <MdAddPhotoAlternate className="mx-auto w-[50%] h-[50%] text-gray-500" />
                                                    </span>
                                                )}
                                            </label>
                                        </div>

                                        <div className="border border-gray-300 rounded-lg md:w-[225px] w-[400px] md:h-[225px] h-[400px] hover:shadow-lg transition-shadow">
                                            <input type="file" id="photo3" className="hidden" onChange={(e) => {
                                                const preview = URL.createObjectURL(e.target.files?.[0] as File);
                                                setPhoto3Preview(preview);
                                                const photoToUpload = e.target.files?.[0];
                                                setPhoto3ToUpload(photoToUpload)
                                            }} />
                                            <label htmlFor="photo3" className="cursor-pointer">
                                                {photo3Preview ? (
                                                    <>
                                                        <img src={`${photo3Preview}`} className="w-[100%] h-[100%] aspect-square rounded-lg object-cover shadow-lg border border-white" />
                                                    </>
                                                ) : (
                                                    <span className="flex items-center h-full w-full">
                                                        <MdAddPhotoAlternate className="mx-auto w-[50%] h-[50%] text-gray-500" />
                                                    </span>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <Button type="submit" disabled={loadingSubmit} className="w-full mt-6 bg-blue-600 hover:bg-blue-800 transition">
                                {loadingSubmit ? <Loading w={24} /> : (<>Sell {title} Now <TbCubeSend size="24" className="ml-2" /></>)}
                            </Button>
                        </form>
                    </div>
                </div >
            </div >
        </div >
    )
}