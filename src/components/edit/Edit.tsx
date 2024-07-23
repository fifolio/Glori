import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

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
import { toast } from "sonner"


// ICONS
import { TbCubeSend } from "react-icons/tb";

// STATES
import useUserId from "@/lib/states/userId"
import useEditProduct from "@/lib/states/useEditProductId"

// SERVICES
import { getProduct } from "@/backend/services/products/getProduct"
import { updateProduct } from "@/backend/services/products/updateProduct"






export default function Edit() {

    // Get the product ID from its state to edit
    const { editProductId } = useEditProduct();

    const
        navigate = useNavigate(),
        [loadingScreen, setLoadingScreen] = useState<boolean>(true),
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
        [fragranceFamily, setFragranceFamily] = useState<string>(''),
        [usage, setUsage] = useState<string>(''),
        [longevity, setLongevity] = useState<string>(''),
        [collection, setCollection] = useState<string>(''),
        [sillage, setSillage] = useState<string>(''),
        [occasion, setOccasion] = useState<string>(''),

        // Store the preview photo #1 + #2 + #3
        [photo1Preview, setPhoto1Preview] = useState<string | undefined>(undefined),
        [photo2Preview, setPhoto2Preview] = useState<string | undefined>(undefined),
        [photo3Preview, setPhoto3Preview] = useState<string | undefined>(undefined),

        // Store the photo #1 + #2 + #3 to upload
        [photo1ToUpload, setPhoto1ToUpload] = useState<File | undefined>(undefined),
        [photo2ToUpload, setPhoto2ToUpload] = useState<File | undefined>(undefined),
        [photo3ToUpload, setPhoto3ToUpload] = useState<File | undefined>(undefined),

        // Data fetched from the product
        [photos, setPhotos] = useState<string[]>([]),
        [sizes, setSizes] = useState<string[]>([]),
        [fragranceNotes, setFragranceNotes] = useState<string[]>([]),
        [ingredients, setIngredients] = useState<string[]>([]);

    const
        defaultFragranceNotes: string[] = ['Rose', 'Jasmine', 'Lavender', 'Vanilla', 'Musk', 'Amber', 'Bergamot', 'Sandalwood', 'Patchouli', 'Cedarwood', 'Lemon', 'Orange Blossom', 'Iris', 'Vetiver', 'Tobacco', 'Coconut', 'Pineapple', 'Peach', 'Apple', 'Blackcurrant'],

        defaultIngredients: string[] = ['alcohol-denat', 'water', 'fragrance', 'benzyl-salicylate', 'limonene', 'linalool', 'coumarin', 'citronellol', 'geraniol', 'citral', 'eugenol', 'benzyl-benzoate', 'benzyl-alcohol', 'farnesol', 'isoeugenol', 'anise-alcohol', 'cinnamal'],

        defaultSizes: string[] = ['50ml', '100ml', '200ml'];

    // Update the page title
    document.title = `Glori | Edit ${title}`;


    const
        handleSelectedFragrance = (newValue: string) => {
            setFragranceNotes((prevSelectedValues) =>
                // If newValue is already in the array prevSelectedValues, 
                prevSelectedValues.includes(newValue) ?
                    // it filters out newValue from the array.
                    prevSelectedValues.filter((item) => item !== newValue) :
                    // If newValue is not in the array prevSelectedValues, it adds newValue to the array using the spread operator (...):
                    [...prevSelectedValues, newValue]);
        },
        handleSelectedIngredient = (newValue: string) => {
            // If newValue is already in the array prevSelectedValues,
            setIngredients((prevSelectedValues) => prevSelectedValues.includes(newValue) ?
                // it filters out newValue from the array.
                prevSelectedValues.filter((item) => item !== newValue) :
                // If newValue is not in the array prevSelectedValues, it adds newValue to the array using the spread operator (...):
                [...prevSelectedValues, newValue]);
        },
        handleSelectedSizes = (newValue: string) => {
            setSizes((prevSelectedValues) => prevSelectedValues.includes(newValue) ?
                prevSelectedValues.filter((item) => item !== newValue) : [...prevSelectedValues, newValue])
        };

    // Handle form submit
    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadingSubmit(true);
    
        // Checks and Validations
        if (ingredients.length < 1) {
            toast.error("Oops! You need to select at least 1 ingredient of your perfume to continue.");
            setLoadingSubmit(false);
        } else if (fragranceNotes.length < 1) {
            toast.error("Oops! You need to select at least 1 Fragrance note of your perfume to continue.");
            setLoadingSubmit(false);
        } else if (collection === '') {
            toast.error("Oops! You need to select in which collection your perfume should be listed to continue.");
            setLoadingSubmit(false);
        } else if (sizes.length < 1) {
            toast.error("Oops! You need to select what is the available sizes of your perfume bottle to continue.");
            setLoadingSubmit(false);
        } else if (fragranceFamily === '') {
            toast.error("Oops! You must select what is Fragrance Family of your perfume to continue.");
            setLoadingSubmit(false);
        } else if (usage === '') {
            toast.error("Oops! You must select the usage of your perfume to continue.");
            setLoadingSubmit(false);
        } else if (longevity === '') {
            toast.error("Oops! You must select the longevity of your perfume to continue.");
            setLoadingSubmit(false);
        } else if (sillage === '') {
            toast.error("Oops! You must select the sillage of your perfume to continue.");
            setLoadingSubmit(false);
        } else if (occasion === '') {
            toast.error("Oops! You must select the occasion of your perfume to continue.");
            setLoadingSubmit(false);
        } else {
            // Handle Photos Upload (if needed)
            const uploadPhoto = async (photoData: FormData) => {
                try {
                    const res = await axios.post("https://api.cloudinary.com/v1_1/dprqv5quy/image/upload", photoData);
                    return res.data.url;
                } catch (error) {
                    console.error("Error uploading photo:", error);
                    return null;
                }
            };
    
            const newPhotos = [...photos];
    
            // Function to handle each photo upload and update the specific index
            const handlePhotoUpload = async (photoToUpload: any, index: any) => {
                if (photoToUpload) {
                    const photoData = new FormData();
                    photoData.append("file", photoToUpload);
                    photoData.append("upload_preset", "glorious");
                    const photoUrl = await uploadPhoto(photoData);
                    if (photoUrl) {
                        newPhotos[index] = photoUrl;
                    }
                }
            };
    
            await handlePhotoUpload(photo1ToUpload, 0);
            await handlePhotoUpload(photo2ToUpload, 1);
            await handlePhotoUpload(photo3ToUpload, 2);
    
            // Ensure only non-empty URLs are included
            const filteredPhotos = newPhotos.filter(photo => photo);
    
            if (filteredPhotos.length > 0) {
                await updateProduct(editProductId, {
                    userId: userID,
                    title: title,
                    description: description,
                    price: price,
                    size: sizes,
                    fragranceFamily: fragranceFamily,
                    ingredients: ingredients,
                    fragranceNotes: fragranceNotes,
                    usage: usage,
                    longevity: longevity,
                    sillage: sillage,
                    occasion: occasion,
                    photos: filteredPhotos,
                    collection: collection,
                    store: userID,
                }).then((response) => {
                    const perfumeId = response?.$id;
                    console.log(response);
                    toast.success(`You just updated ${title} successfully`);
                    setLoadingSubmit(false);
                    setTimeout(() => {
                        navigate(`/perfumes/${perfumeId}`);
                        // Scroll top
                        window.scrollTo({
                            top: -10,
                            behavior: 'instant'
                        });
                    }, 1000);
                });
            } else {
                toast.error("Error: No photos provided.");
                setLoadingSubmit(false);
            }
        }
    }
    

    useEffect(() => {
        if (editProductId) {
            async function getCurrentProduct() {
                const results = await getProduct(editProductId)

                if (results) {
                    if (results.code === 404) {
                        navigate('/')
                        document.title = `Glori | House of Fragrances`;
                    } else {
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
                    }
                }
                setTimeout(() => {
                    setLoadingScreen(false)
                }, 1000)

            }
            // Run Get current product details func.
            getCurrentProduct();
        }
    }, [editProductId]);

    // console.log(photos[0])

    if (loadingScreen) {
        return <LoadingScreen />
    } else {
        return (
            <div>

                {/* Form */}
                <div className="container w-auto md:max-w-[800px] px-4 mx-auto md:px-6 lg:px-8 z-10">
                    <div className="grid gap-6 mb-12 mt-12">
                        <div className="grid gap-2">
                            <h1 className="text-3xl font-bold">Update <span className="text-slate-700">{title}</span></h1>
                            <p className="text-gray-500">
                                Edit out the form below to update your perfume details.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={(e) => handleFormSubmit(e)} className="grid gap-6">

                        {/* title */}
                        <div className="grid gap-2 md:max-w-full max-w-[99%]">
                            <Label htmlFor="title">Product Title</Label>
                            <Input required value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter product title" />
                        </div>

                        {/* Description */}
                        <div className="grid gap-2 md:max-w-full max-w-[99%]">
                            <Label htmlFor="description">Description</Label>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px]" id="description" placeholder="Enter product description" />
                        </div>

                        {/* Collections */}
                        <div className="grid gap-2 md:max-w-full max-w-[99%]">
                            <Label htmlFor="collection">Collection</Label>
                            <Select onValueChange={(e) => setCollection(e)}>
                                <SelectTrigger className="capitalize shadow-sm">
                                    <SelectValue placeholder={`${collection}`} />
                                </SelectTrigger>
                                <SelectContent className="capitalize">
                                    <SelectItem value="luxury">luxury</SelectItem>
                                    <SelectItem value="warm">warm</SelectItem>
                                    <SelectItem value="florals">florals</SelectItem>
                                    <SelectItem value="fresh">fresh</SelectItem>
                                    <SelectItem value="unisex">unisex</SelectItem>
                                    <SelectItem value="limited">limited</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 md:max-w-full max-w-[99%]">
                            <div className="grid gap-2">
                                {/* Occasion */}
                                <Select onValueChange={(e) => setOccasion(e)}>
                                    <Label htmlFor="occasion">Occasion</Label>
                                    <SelectTrigger className="w- shadow-sm capitalize">
                                        <SelectValue placeholder={`${occasion}`} />
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
                                <Label htmlFor="Size">Size</Label>
                                <div className="flex flex-row flex-wrap items-center mt-2">
                                    {defaultSizes.map((size) => (
                                        <Button
                                            type="button"
                                            key={size}
                                            value={size}
                                            variant="outline"
                                            onClick={() => handleSelectedSizes(size)}
                                            className={`${sizes.includes(size) ? 'bg-blue-500 text-white' : ''} w-fit mb-2 mr-2`}>
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-6 md:max-w-full max-w-[99%]">
                            {/* Fragrance Family */}
                            <div className="grid gap-2">
                                <Label htmlFor="fragranceFamily">Fragrance Family</Label>
                                <Select onValueChange={(e) => setFragranceFamily(e)}>
                                    <SelectTrigger className="w- shadow-sm capitalize">
                                        <SelectValue placeholder={`${fragranceFamily}`} />
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
                                    <SelectTrigger className="w- shadow-sm capitalize">
                                        <SelectValue placeholder={`${usage}`} />
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

                        <div className="grid md:grid-cols-2 gap-6 md:max-w-full max-w-[99%]">
                            {/* Longevity */}
                            <div className="grid gap-2">
                                <Select onValueChange={(e) => setLongevity(e)}>
                                    <Label htmlFor="longevity">Longevity</Label>
                                    <SelectTrigger className="w- shadow-sm capitalize">
                                        <SelectValue placeholder={`${longevity}`} />
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
                                    <SelectTrigger className="w- shadow-sm capitalize">
                                        <SelectValue placeholder={`${sillage}`} />
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

                        <div className="grid md:grid-cols-2 gap-6 md:max-w-full max-w-[99%]">
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
                                            className={`${fragranceNotes.includes(fragrance) ? 'bg-green-500 text-white' : ''} w-fit mb-2 mr-2`}>
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
                                            className={`${ingredients.includes(ingredient) ? 'bg-green-500 text-white' : ''} w-fit mb-2 mr-2`}>
                                            {ingredient.replace(/-/g, ' ')}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2 md:max-w-full max-w-[99%]">
                            <Label htmlFor="price">Price</Label>
                            <Input required value={price} onChange={(e) => setPrice(e.target.value)} id="price" type="number" placeholder="Enter price" />
                        </div>


                        {/* Photos */}
                        <div className="grid gap-6">
                            <div className="grid gap-2 ">
                                <Label htmlFor="photos">Product Photos</Label>
                                <div className="flex md:flex-row flex-col justify-between md:mx-0 mx-auto md:space-y-0 space-y-3 ">

                                    <div className="border border-gray-300 rounded-lg md:w-[225px] w-[300px] md:h-[225px] h-[300px] hover:shadow-lg transition-shadow">
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
                                                <img src={`${photos[0]}`} className="w-[100%] h-[100%] aspect-square rounded-lg object-cover shadow-lg border border-white" />
                                            )}
                                        </label>
                                    </div>


                                    <div className="border border-gray-300 rounded-lg md:w-[225px] w-[300px] md:h-[225px] h-[300px] hover:shadow-lg transition-shadow">
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
                                                <img src={`${photos[1]}`} className="w-[100%] h-[100%] aspect-square rounded-lg object-cover shadow-lg border border-white" />
                                            )}
                                        </label>
                                    </div>

                                    <div className="border border-gray-300 rounded-lg md:w-[225px] w-[300px] md:h-[225px] h-[300px] hover:shadow-lg transition-shadow">
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
                                                <img src={`${photos[2]}`} className="w-[100%] h-[100%] aspect-square rounded-lg object-cover shadow-lg border border-white" />
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <Button type="submit" disabled={loadingSubmit} className="w-full mt-6 bg-blue-600 hover:bg-blue-800 transition mb-12">
                            {loadingSubmit ? <Loading w={24} /> : (<>Save {title} Updates <TbCubeSend size="24" className="ml-2" /></>)}
                        </Button>
                    </form>
                </div>

            </div >
        )
    }
}
