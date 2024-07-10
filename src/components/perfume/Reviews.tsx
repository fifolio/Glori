import { useParams } from "react-router-dom"
import { useEffect } from "react"
// UI
import {
    DropdownMenuTrigger,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
    DropdownMenuContent,
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LoadingScreen } from "../ui/loading"

// ICONS
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

// SERVICES
import { getFeedback } from "@/backend/services/products/getFeedback"

// STATES
import useUserState from "@/lib/states/userStates"
import useUserId from "@/lib/states/userId"

export default function Reviews({loadingScreen}: {loadingScreen: boolean}) {

    const
        { loggedinUserId } = useUserId(),
        { id: perfumeId } = useParams<string>(),
        // Check if user logged-in
        { isLoggedin } = useUserState();

    // Check for comments
    useEffect(() => {
        if (isLoggedin) {
            // get the isLiked value and pass it as a State
            async function handleGetComments() {
                await getFeedback(`${perfumeId}`, `${loggedinUserId}`)
                    .then((res) => {
                        if (res.length > 0) {
                            console.log('comments', res.comment)
                            // setHasFeedbackDoc(true)
                            // setIsLiked(res[0].comment)
                        } else {
                            console.log('comments', res.comment)
                            // setHasFeedbackDoc(false);
                        }
                    });
            }
            handleGetComments();
        } else {
            // setComments(null)
        }
    }, [isLoggedin, perfumeId])

    if (loadingScreen) {
        return <LoadingScreen />
    } else {
        return (
            <div className="p-6 border rounded-lg mt-5">

                {/* Header section */}
                <div className="flex-col lg:flex lg:flex-row lg:justify-between items-center sm:text-left text-center header mb-4">
                    {/* Title + Subtitle */}
                    <div className="title-subtitle mb-5">
                        <h2 className="text-2xl font-bold">Delve into Customer Experiences</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Discover Fragrance Journeys Through the Lens of Fellow Connoisseurs
                        </p>
                    </div>

                    {/* Filters + Sort by + Write a review */}
                    <div className="actions flex space-x-3 sm:justify-start justify-center">

                        {/* Write a review */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">Write a review</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Share Your Scent Story</DialogTitle>
                                    <DialogDescription>
                                        Your thoughts matter! Leave your mark on the fragrance canvas.
                                    </DialogDescription>
                                </DialogHeader>
                                <div>
                                    <Textarea
                                        placeholder="Pour Your Perfume Ponderings Here..."
                                        style={{
                                            resize: 'none',
                                            height: '200px'
                                        }}
                                    />
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-3 w-52 mb-5">
                                    <Label htmlFor="quantity">Rating</Label>
                                    <Select defaultValue="1">
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map(() => (<FaStar />))}
                                                    <span className="ml-2">
                                                        (5 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="2">
                                                <div className="flex items-center">
                                                    {[...Array(4)].map(() => (<FaStar />))}
                                                    <span className="ml-2">
                                                        (4 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="3">
                                                <div className="flex items-center">
                                                    {[...Array(3)].map(() => (<FaStar />))}
                                                    <span className="ml-2">
                                                        (3 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="4">
                                                <div className="flex items-center">
                                                    {[...Array(2)].map(() => (<FaStar />))}
                                                    <span className="ml-2">
                                                        (2 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="5">
                                                <div className="flex items-center">
                                                    {[...Array(1)].map(() => (<FaStar />))}
                                                    <span className="ml-2">
                                                        (1 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>


                                <DialogFooter>
                                    <Button type="submit" className="w-full">
                                        Submit My Review
                                        <LuSend size="14" className="ml-3" />
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Sort by */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline">
                                    <RiArrowUpDownFill className="w-4 h-4 mr-2" />
                                    Sort by
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[120px]">
                                <DropdownMenuRadioGroup value="newest">
                                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="highest">Highest Rating</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="lowest">Lowest Rating</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline">
                                    <FiFilter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[100px]">
                                <DropdownMenuLabel>Filter Reviews</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem>5 stars</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>4 stars</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>3 stars</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>2 stars</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>1 star</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Number of rates */}
                <div className="flex justify-center sm:justify-start items-center w-full">
                    <div className="text-4xl font-bold">4.8</div>
                    <div className="flex items-center gap-0.5 mr-2">
                        <FaStar className="w-5 h-5 fill-primary" />
                        <FaStar className="w-5 h-5 fill-primary" />
                        <FaStar className="w-5 h-5 fill-primary" />
                        <FaStar className="w-5 h-5 fill-primary" />
                        <FaStar className="w-5 h-5 fill-slate-400 " />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">(1,234 reviews)</div>
                </div>

                {/* Reviews */}
                <div className="mt-6">
                    <ScrollArea className="h-[400px] pr-2 w-full">

                        {/* Users Reviews */}

                        {[...Array(10)].map(() => (
                            <>
                                <div className="flex items-start gap-4 mb-5">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="font-medium">Sarah Johnson</div>
                                            <div className="flex items-center gap-0.5 ml-auto">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map(() => (<FaStar />))}
                                                    <span className="ml-2">
                                                        (5 stars)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <time className="text-sm text-gray-500 dark:text-gray-400">2 days ago</time>
                                        </div>
                                        <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                                            <p>
                                                I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's
                                                been a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even
                                                some healthier options.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline">
                                                <FaRegThumbsUp className="w-4 h-4 mr-2" />
                                                Helpful (23)
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Separator className="mb-5" />
                            </>
                        ))}

                    </ScrollArea>
                </div>


            </div>
        )
    }

} 