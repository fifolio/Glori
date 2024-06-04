import { Link } from "react-router-dom"
import Perfumes from "@/components/common/Perfumes"

// UI
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// ICONS
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";


export default function Seller() {

    // Fake seller
    const seller = {
        name: "Chanel",
        profilePic: "https://placehold.co/100",
        bio: "Glori Perfumes is a family-owned business that has been crafting high-quality, artisanal perfumes for over 50 years. We take pride in using only the finest natural ingredients and time-honored techniques to create scents that are both luxurious and captivating.",
        email: "info@gloriperfumes.com",
        phone: "+1 (555) 123-4567",
        website: "www.gloriperfumes.com",
        products: [
            {
                id: 1,
                name: "Enchanted Rose",
                image: "/placeholder.svg",
                price: 49.99,
            },
            {
                id: 2,
                name: "Citrus Breeze",
                image: "/placeholder.svg",
                price: 39.99,
            },
            {
                id: 3,
                name: "Midnight Jasmine",
                image: "/placeholder.svg",
                price: 59.99,
            },
            {
                id: 4,
                name: "Sandalwood Musk",
                image: "/placeholder.svg",
                price: 54.99,
            },
        ],
    }

    return (
        <div className="max-w-6xl mx-auto lg:w-[900px] px-4 md:px-6 py-16 md:py-16">

            {/* Header: Seller picture, name, username */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 md:mb-12">
                <Avatar className="w-28 h-28">
                    <img src={seller.profilePic} />
                    <AvatarFallback>{seller.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col md:flex-row items-start justify-between md:w-full text-center md:text-left">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{seller.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400">Perfume Store</p>
                    </div>
                </div>

                {/* Edit Profile + Sell New Perfume*/}
                <div className="flex flex-col md:flex-row justify-center md:space-x-3 space-y-3 md:space-y-0 md:mt-0 w-full md:w-fit">
                    <Link to="/edit" className="w-fit mx-auto md:mx-0">
                        <Button variant="outline" className="text-sm w-fit">
                            Edit Profile
                        </Button>
                    </Link>
                    <Link to="/sell" className="w-fit mx-auto md:mx-0">
                        <Button variant="default" className="text-sm w-fit">
                            Sell New Perfume
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Bio + Contact Us */}
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 mb-8 md:mb-12 text-md">
                <div>
                    <h2 className="text-lg font-bold mb-4">About {seller.name}</h2>
                    <p className="text-gray-500 leading-relaxed md:w-5/6">{seller.bio}</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold mb-4">Contact {seller.name}</h2>

                    {/* Phone + Emali + Website */}
                    <div className="flex flex-col space-y-1 text-md">
                        <div className="flex items-center gap-2">
                            <MdAlternateEmail className="w-5 h-5 text-gray-500" />
                            <a href="#" className="text-gray-500 hover:underline">
                                {seller.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdOutlinePhone className="w-5 h-5 text-gray-500" />
                            <a href="#" className="text-gray-500 hover:underline">
                                {seller.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <TbWorldWww className="w-5 h-5 text-gray-500" />
                            <a
                                href="#"
                                className="text-gray-500 hover:underline"
                                target="_blank"
                            >
                                {seller.website}
                            </a>
                        </div>
                    </div>

                    {/* Media Icons */}
                    <div className="flex justify-start w-full rounded-lg mt-3">
                        <Link to="#" className="mr-3">
                            <img src="/images/icons/insta.png" height="25" width="25" />
                        </Link>
                        <Link to="#" className="mr-3">
                            <img src="/images/icons/snap.png" height="25" width="25" />
                        </Link>
                        <Link to="#" className="mr-3">
                            <img src="/images/icons/x.png" height="25" width="25" />
                        </Link>
                        <Link to="#" className="mr-3">
                            <img src="/images/icons/ytube.png" height="25" width="25" />
                        </Link>
                        <Link to="#" className="mr-3">
                            <img src="/images/icons/face.png" height="25" width="25" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Products */}
            <Perfumes AllowFiltering={true} />
        </div>

    )
}