import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ICONS
import { MdAddPhotoAlternate } from "react-icons/md";

// SERVICES
import { handleCreateStore } from "@/backend/services/store/createStore";

// STATES
import useUserId from "@/lib/states/userId";
import useCheckStoreState from "@/lib/states/userStoreState";

// UI
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import Loading from "../ui/loading";


export default function Create() {

    // set the page title
    document.title = `Glori | Create a Store`;

    const navigate = useNavigate();

    // Set isStoreValid State
    const { setIsStoreValid } = useCheckStoreState();

    // Set Public state for the user ID
    const { loggedinUserId } = useUserId(),
        [userID, setUserID] = useState<string>(''),
        [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    useEffect(() => {
        setUserID(loggedinUserId)
    }, [loggedinUserId])


    // Collect the form data values
    const [name, setName] = useState<string>(''),
        // Store the logo to preview
        [logoPreview, setLogoPreview] = useState<string | undefined>(undefined),
        // Store the logo to upload
        [logoPreProsessed, setLogoPreProsessed] = useState<File | undefined>(undefined),
        [bio, setBio] = useState<string>(''),
        [email, setEmail] = useState<string>(''),
        [phone, setPhone] = useState<string>(''),
        [website, setWebsite] = useState<string>(''),
        [instagram, setInstagram] = useState<string>(''),
        [x, setX] = useState<string>(''),
        [facebook, setFacebook] = useState<string>(''),
        [youtube, setYoutube] = useState<string>('');


    // Handle form submit
    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadingSubmit(true);

        if (logoPreProsessed === undefined) {
            toast.error("Oops! You need to upload a Brand Logo to create your store.");
            setLoadingSubmit(false);
        } else {

            // Handle Brand Logo Upload
            const data = new FormData();
            data.append("file", logoPreProsessed ? logoPreProsessed : '');
            data.append("upload_preset", "glorious");

            axios.post("https://api.cloudinary.com/v1_1/dprqv5quy/image/upload", data).then(async (res) => {
                // if the picture url is ready, store it at logoUrl state
                if (res.data.url) {
                    await handleCreateStore({
                        userID: userID,
                        name: name,
                        logoUrl: res.data.url,
                        bio: bio,
                        email: email,
                        phone: phone,
                        website: website,
                        instagram: instagram,
                        x: x,
                        facebook: facebook,
                        youtube: youtube,
                    }).then((response) => {
                        const storeId = response?.$id;
                        const storeName = response?.name;
                        toast.success(`Great! You have just created your ${storeName} store successfully`)
                        navigate(`/store/${storeId}`)
                        setIsStoreValid(true)
                        setLoadingSubmit(false);
                        // Scroll top
                        window.scrollTo({
                            top: -10,
                            behavior: 'instant'
                        });
                    }).catch((error) => {
                        console.log(error);
                        setLoadingSubmit(false);
                    });
                } else {
                    console.error("Error on the response url");
                    setLoadingSubmit(false);
                }
            }).catch((error) => {
                console.error("Error uploading the image", error);
                setLoadingSubmit(false);
            });
        }
    }



    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-16">
            <div className="grid gap-4 lg:grid-cols-2 md:gap-12">
                <div className="grid gap-6">

                    {/* store Editing */}
                    <div className="grid gap-2">
                        <h1 className="text-3xl font-bold">Create Your Store</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Welcome to the beginning of your online store journey! Provide detailed and accurate information about your store to attract and engage potential customers. A well-crafted store profile not only enhances your store’s visibility but also builds trust and credibility with buyers, ensuring they can easily find and connect with you. Let’s make your store stand out and thrive in the marketplace!
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={(e) => handleFormSubmit(e)} className="grid gap-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <h2 className="text-2xl font-bold mb-3">Basic Details</h2>
                                <div className="grid md:grid-cols-1 gap-6 mb-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Brand Name</Label>
                                        <Input onChange={(e) => setName(e.target.value)} required id="name" placeholder="Enter your full brand name" />
                                    </div>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="store-logo">Brand Logo</Label>
                                    <div className="flex items-center justify-center border border-gray-200 rounded-lg h-32 dark:border-gray-800">
                                        <Input onChange={(e) => {
                                            const preview = URL.createObjectURL(e.target.files?.[0] as File);
                                            setLogoPreview(preview)
                                            const brandLogo = e.target.files?.[0];
                                            setLogoPreProsessed(brandLogo)
                                        }} accept="image/*" type="file" id="brand-logo" className="hidden" />
                                        <label htmlFor="brand-logo" className="cursor-pointer">
                                            {logoPreview ? (
                                                <>
                                                    <img src={`${logoPreview}`} width={115} className="aspect-square rounded-full object-cover shadow-lg border border-white" />
                                                </>
                                            ) : (
                                                <MdAddPhotoAlternate className="w-20 h-20 text-gray-500" />
                                            )}
                                        </label>
                                    </div>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea onChange={(e) => setBio(e.target.value)} required id="bio" placeholder="Enter your store bio" className="min-h-[100px]" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <h2 className="text-2xl font-bold mb-3">Contact Details</h2>
                                <div className="grid md:grid-cols-2 gap-6 mb-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input onChange={(e) => setEmail(e.target.value)} required id="email" type="email" placeholder="Enter your store email" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input onChange={(e) => setPhone(e.target.value)} required id="phone" type="tel" placeholder="Enter your store phone number" />
                                    </div>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="website">Website</Label>
                                    <Input onChange={(e) => setWebsite(e.target.value)} required id="website" type="url" placeholder="Enter your store website" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <h2 className="text-2xl font-bold mb-3">Social Media</h2>
                                <div className="grid md:grid-cols-2 gap-6 mb-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="instagram">Instagram</Label>
                                        <Input onChange={(e) => setInstagram(e.target.value)} required id="instagram" type="url" placeholder="Enter your store Instagram URL" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="X">X</Label>
                                        <Input onChange={(e) => setX(e.target.value)} required id="X" type="url" placeholder="Enter your store X URL" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 mb-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="facebook">Facebook</Label>
                                        <Input onChange={(e) => setFacebook(e.target.value)} required id="facebook" type="url" placeholder="Enter your store Facebook URL" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="youtube">YouTube</Label>
                                        <Input onChange={(e) => setYoutube(e.target.value)} required id="youtube" type="url" placeholder="Enter your store YouTube channel URL" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button disabled={loadingSubmit} type="submit" className="justify-self-end bg-blue-600 hover:bg-blue-800 transition">
                            {loadingSubmit ? <Loading w={24} /> : <p>Create Store</p>}
                        </Button>
                    </form>
                </div>


                {/* FAQ */}
                <div className="mt-12 md:mt-0">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <h2 className="text-xl font-bold">FAQ</h2>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <h4 className="text-md font-bold">Why is it important to set my brand name?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    Updating your brand name ensures that buyers know which brand they are purchasing from, adding a professional touch and building trust. It also helps in maintaining clear and recognizable branding.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <h4 className="text-md font-bold">Why should I set a brand Logo?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    A brand Logo adds a professional touch to your store, making it more relatable and trustworthy. It helps buyers feel more connected to your brand and can improve your credibility on the platform.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <h4 className="text-md font-bold">Why is having a bio important?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    Store bio is a brief introduction to who you are and what your Store provide. A well-written bio can attract potential buyers by giving them insight into your store personality and expertise in luxury perfumes.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <h4 className="text-md font-bold">Why do I need to provide my store email address?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    Providing an email address ensures that you receive important notifications and can communicate efficiently with buyers.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <h4 className="text-md font-bold">Why is updating my store phone number necessary?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    Updating your phone number ensures that you can be reached quickly for urgent communications regarding your listings and sales. It enhances the overall responsiveness and reliability of your store.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <h4 className="text-md font-bold">Why should I add my store website URL?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    Adding your website URL gives buyers a chance to learn more about you and your other offerings. It can drive additional traffic to your site and provide more credibility to your store.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <h4 className="text-md font-bold">Why is it beneficial to set my social media links?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    Linking your store social media stores helps build a stronger connection with your buyers. It allows them to follow your sets, engage with your content, and become part of your community, potentially increasing your sales and brand loyalty.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}