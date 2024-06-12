// UI
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

// ICONS
import { MdAddPhotoAlternate } from "react-icons/md";

export default function Update() {

    // Update the page title
    document.title = `Glori | Update Board`;

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-16">
            <div className="grid gap-4 lg:grid-cols-2 md:gap-12">
                <div className="grid gap-6">

                    {/* store Editing */}
                    <div className="grid gap-2">
                        <h1 className="text-3xl font-bold">Update Store Settings</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Update your store information with accurate details to enhance customer reach and interaction. Providing comprehensive and accurate information ensures that potential buyers can easily find and connect with you.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="grid gap-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <h2 className="text-2xl font-bold mb-3">Basic Details</h2>
                                <div className="grid md:grid-cols-1 gap-6 mb-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Brand Name</Label>
                                        <Input id="name" placeholder="Enter your full brand name" />
                                    </div>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="store-logo">Brand Logo</Label>
                                    <div className="flex items-center justify-center border border-gray-200 rounded-lg h-32 dark:border-gray-800">
                                        <input type="file" id="store-logo" className="hidden" />
                                        <label htmlFor="store-logo" className="cursor-pointer">
                                            <MdAddPhotoAlternate className="w-20 h-20 text-gray-500" />
                                        </label>
                                    </div>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea id="bio" placeholder="Enter your store bio" className="min-h-[100px]" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <h2 className="text-2xl font-bold mb-3">Contact Details</h2>
                                <div className="grid md:grid-cols-2 gap-6 mb-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Enter your store email" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" type="tel" placeholder="Enter your store phone number" />
                                    </div>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" type="url" placeholder="Enter your store website" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <h2 className="text-2xl font-bold mb-3">Social Media</h2>
                                <div className="grid md:grid-cols-2 gap-6 mb-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="instagram">Instagram</Label>
                                        <Input id="instagram" type="url" placeholder="Enter your store Instagram URL" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="X">X</Label>
                                        <Input id="X" type="url" placeholder="Enter your store X URL" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6 mb-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="facebook">Facebook</Label>
                                        <Input id="facebook" type="url" placeholder="Enter your store Facebook URL" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="youtube">YouTube</Label>
                                        <Input id="youtube" type="url" placeholder="Enter your store YouTube channel URL" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="justify-self-end bg-blue-600 hover:bg-blue-800 transition">
                            Save Updates
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
                                <h4 className="text-md font-bold">Why is it important to update my brand name?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    Updating your brand name ensures that buyers know which brand they are purchasing from, adding a professional touch and building trust. It also helps in maintaining clear and recognizable branding.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <h4 className="text-md font-bold">Why should I upload a brand Logo?</h4>
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
                                <h4 className="text-md font-bold">Why is it beneficial to update my social media links?</h4>
                                <p className="text-gray-500 text-[15px]">
                                    Linking your store social media stores helps build a stronger connection with your buyers. It allows them to follow your updates, engage with your content, and become part of your community, potentially increasing your sales and brand loyalty.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}