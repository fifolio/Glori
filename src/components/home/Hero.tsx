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
        regular: string;
    };
}

export default function Hero() {


    // Store photos from API
    const [images, setImages] = useState<Images[]>([]);


    // Store the current month number for the Hero title
    const currentMonth: number = new Date().getMonth();


    useEffect(() => {
        const url = "https://api.unsplash.com/photos/random";
        const query = "perfume";
        axios.get(url, {
            params: {
                query,
                count: 5,
                client_id: `${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`,
                orientation: 'landscape',
            },
        }).then((res) => {
            setImages(res.data as Images[])
        })

    }, []);


    
    return (
        <section className="py-12 md:py-24 lg:py-12">
            <div className="grid gap-6 md:gap-8 px-4 md:px-6">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Welcome to Our
                        {
                            currentMonth === 3 ||
                                currentMonth === 4 ||
                                currentMonth === 5 ? ' Spring ' :
                                currentMonth === 6 ||
                                    currentMonth === 7 ||
                                    currentMonth === 8 ? ' Summer ' :
                                    currentMonth === 9 ||
                                        currentMonth === 10 ||
                                        currentMonth === 11 ? ' Autumn ' :
                                        currentMonth === 12 ||
                                            currentMonth === 1 ||
                                            currentMonth === 2 ? ' Winter ' : ' '
                        }
                        Collection
                    </h1>
                    <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Discover our latest selection of cozy and stylish {
                            currentMonth === 3 ||
                                currentMonth === 4 ||
                                currentMonth === 5 ? ' spring' :
                                currentMonth === 6 ||
                                    currentMonth === 7 ||
                                    currentMonth === 8 ? ' summer' :
                                    currentMonth === 9 ||
                                        currentMonth === 10 ||
                                        currentMonth === 11 ? ' autumn' :
                                        currentMonth === 12 ||
                                            currentMonth === 1 ||
                                            currentMonth === 2 ? ' winter' : ' '
                        }-inspired Perfumes.
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
                                    src={img.urls.regular}
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