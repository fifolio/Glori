// UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


// type Props = {};

export default function Newsletter() {
    return (
        <div className="mb-6">
            {/* Header section */}
            <div className="container text-center header py-5 mt-6" >
                <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Be the first to know about our new perfume launches, exclusive offers, and more.
                </p>
            </div>

            <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
                <Input type="email" placeholder="Email" />
                <Button type="submit">Subscribe</Button>
            </div>
        </div>
    )
}