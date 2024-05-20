import { useEffect, useState } from 'react';
import axios from 'axios';

// UI
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

// Define the interface for the image data
interface Images {
    id: string;
    urls: {
        full: string;
    };
}

export default function Hero() {

    // Store photos from API
    const [images, setImages] = useState<Images[]>([])

    useEffect(() => {
        const clientId: string = `${import.meta.env.VITE_UNSPLASH_CLIENT_ID}` as string
        axios.get(`${import.meta.env.VITE_UNSPLASH_API_URL}/search/photos?query=perfumes&client_id=${clientId}&per_page=5&orientation=landscape`)
            .then((res) => {
                setImages(res.data.results as Images[])
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <section className="py-12 md:py-24 lg:py-12">
            <div className="grid gap-6 md:gap-8 px-4 md:px-6">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Welcome to Our Autumn Collection
                    </h1>
                    <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Discover our latest selection of cozy and stylish autumn-inspired Perfumes.
                    </p>
                </div>


                <Carousel className="w-full hover:cursor-w-resize">
                    <CarouselContent>
                        {images.map((img) => (
                            <CarouselItem key={img.id}>
                                <img
                                    alt="Cozy Blanket"
                                    className="rounded-lg object-cover w-full aspect-[3/1]"
                                    height="400"
                                    src={img.urls.full}
                                    width="1200"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}