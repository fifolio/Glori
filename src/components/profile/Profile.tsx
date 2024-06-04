// UI
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Perfumes from "@/components/common/Perfumes"

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
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold">{seller.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">Perfume Store</p>
                </div>
            </div>

            {/* Bio + Contact Us */}
            <div className="flex flex-col md:flex-row space-y-6 mb-8 md:mb-12 text-md">
                <div>
                    <h2 className="text-lg font-bold mb-4">About {seller.name}</h2>
                    <p className="text-gray-500 leading-relaxed md:w-5/6">{seller.bio}</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold mb-4">Contact {seller.name}</h2>
                    <div className="flex flex-col space-y-1 text-md">
                        <div className="flex items-center">
                            {/* <InboxIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> */}
                            <a href="#" className="text-gray-500 hover:underline">
                                {seller.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* <PhoneIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> */}
                            <a href="#" className="text-gray-500 hover:underline">
                                {seller.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* <GlobeIcon className="w-5 h-5 text-gray-500  /> */}
                            <a
                                href="#"
                                className="text-gray-500 dark:text-gray-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {seller.website}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <Perfumes AllowFiltering={true} />

        </div>
    )
}