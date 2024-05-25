// UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


// type Props = {};

export default function Newsletter() {
    return (
        <div className="relative sm:mx-auto mx-3 pt-[50px] pb-[100px] rounded-xl my-10 text-white bg-cover bg-center" style={{ backgroundImage: "url('/images/newsletter.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-80 sm:bg-opacity-50 rounded-xl"></div> {/* Optional overlay for better text readability */}

            {/* Header section */}
            <div className="relative container text-center header py-5 mt-6 z-10">
                <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
                <p className="text-gray-200 mt-2">
                    Be the first to know about our new perfume launches, exclusive offers, and more.
                </p>
            </div>

            <div className="relative flex w-full max-w-sm items-center space-x-2 mx-auto z-10 sm:p-auto p-3">
                <Input type="email" placeholder="Email" className="bg-white text-black" />
                <Button type="submit" variant="secondary">Subscribe</Button>
            </div>
        </div>
    )
}