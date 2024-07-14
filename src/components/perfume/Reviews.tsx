import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
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
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Loading, { LoadingScreen } from "../ui/loading"
import { toast } from "sonner"

// ICONS
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";


// SERVICES
import { getReviews } from "@/backend/services/products/getReviews"
import { createReview } from "@/backend/services/products/createReview"
import { deleteReview } from "@/backend/services/products/deleteReview"
import { updateReview } from "@/backend/services/products/updateReview"
import { getIsHelpful } from "@/backend/services/products/getIsHelpful"
import { updateIsHelpful } from "@/backend/services/products/updateIsHelpful"


// STATES
import useUserState from "@/lib/states/userStates"
import useUserId from "@/lib/states/userId"

interface Review {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $updatedAt: string;
    isHelpful: string[];
    productId: string;
    rating: string;
    review: string;
    userId: string;
    user: {
        username: string;
        avatar: string;
    };
}

export default function Reviews({ loadingScreen }: { loadingScreen: boolean }) {

    const
        { loggedinUserId } = useUserId(),
        { id: perfumeId } = useParams<string>(),
        // Check if user logged-in
        { isLoggedin } = useUserState(),
        [submitDisabled, setSubmitDisabled] = useState<boolean>(true),

        [loadingSubmit, setLoadingSubmit] = useState<boolean>(false),
        [loadingDelete, setLoadingDelete] = useState<{ [key: string]: boolean }>({}),
        [updateReviews, setUpdateReviews] = useState<boolean>(false),
        [voting, setVoting] = useState<{ [key: string]: boolean }>({}),
        // Edit Review
        [isOpen, setIsOpen] = useState<boolean>(false),
        [reviewId, setReviewId] = useState<string | null>(null),
        [editedReviewText, setEditedReviewText] = useState<string>(''),
        [editedRating, setEditedRating] = useState<string>('');

    const
        // Collect the Review Comment
        [review, setReview] = useState<string>(''),
        [rating, setRating] = useState<string>('5');

    const
        // Store all reviews post-fetching
        [allReviews, setAllReviews] = useState<[]>([]),
        // Store the number of rates
        [numberOfRates, setNumberOfRates] = useState<number>(0);



    // Calculate the Rating Stars
    function generateStarRating(starsArray: number) {
        // Count the number of filled stars
        const filledStarsCount = starsArray;

        // Maximum number of stars
        const maxStars = 5;

        // Create filled stars string
        let filledStars = '★'.repeat(filledStarsCount);

        // Calculate the number of unfilled stars
        let unfilledStars = '☆'.repeat(maxStars - filledStarsCount);

        // Return the full star rating string
        return filledStars + unfilledStars;
    }

    // handle create new comment func
    async function handleCreateNewComment() {
        setLoadingSubmit(true);

        // Check if user loggedin & perfume Id is valid
        if (isLoggedin && perfumeId) {
            await createReview(perfumeId, loggedinUserId, review, rating)
                .then(() => {
                    setReview('')
                    setRating('5')
                    setLoadingSubmit(false)
                    setUpdateReviews(!updateReviews)
                    toast.success('Review submitted successfully')
                    setTimeout(() => {
                        setIsOpen(false)
                    }, 2000)
                })
        } else {
            setLoadingSubmit(false)
            toast.error("Please Log-in or Sign-up to submit your review.")
        }
    }

    // handle Delete Review
    async function handleDeleteReview(reviewId: string) {
        setLoadingDelete((prev) => ({ ...prev, [reviewId]: true }))
        await deleteReview(reviewId)
            .then(() => {
                setUpdateReviews(!updateReviews)
                toast.success('Your review deleted successfully')
                setLoadingDelete((prev) => ({ ...prev, [reviewId]: false }))
            })
            .catch((err) => {
                console.log('Error while deleting the review', err)
                toast.error('Oops! something went wrong, please try again later');
                setLoadingDelete((prev) => ({ ...prev, [reviewId]: false }))
            })
    }

    // Pass the dialog `Edit Review` the states need to update
    function setEditReview(review: Review) {
        setEditedReviewText(review.review)
        setEditedRating(review.rating)
        setReviewId(review.$id)
        setLoadingSubmit(false)
    }

    // Handle update review function
    async function handleUpdateReview() {
        setLoadingSubmit(true)
        await updateReview({
            reviewId: reviewId as string,
            review: editedReviewText,
            rating: editedRating,
        }).then(() => {
            setUpdateReviews(!updateReviews)
            toast.success('Review edited successfully')
        }).finally(() => {
            setTimeout(() => {
                setReviewId(null)
                setLoadingSubmit(false)
            }, 2000)
        })
    }

    // Handle isHelpful func.
    async function handleIsHelpful(reviewId: string) {

        // Set the Btn loadingState true
        setVoting((prevIds) => ({ ...prevIds, [reviewId]: true }))

        let isHelpfulArray: string[] = [];

        try {
            // Get the clicked document's isHelpful array
            const res = await getIsHelpful(reviewId);

            // Pass and Store the response to the local array (isHelpfulArray)
            isHelpfulArray = res;

            // Check if the user ID is included or not
            const userIdIndex = isHelpfulArray.find((prevIds) => prevIds === `${loggedinUserId}`);

            // ADD THE USER-ID
            if (userIdIndex === undefined) {
                const updatedIsHelpfulArray = [...isHelpfulArray, loggedinUserId];
                await updateIsHelpful(reviewId, updatedIsHelpfulArray)
                    .then(() => {
                        setUpdateReviews(!updateReviews)
                        setTimeout(() => {
                            setVoting((prevIds) => ({ ...prevIds, [reviewId]: false }))
                        }, 2000)
                    }).catch(() => {
                        toast.error("Oops! something went wrong, please make sure you're logged-in and try again");
                    })

                // REMOVE THE USER-ID
            } else if (typeof userIdIndex === 'string') {
                const updatedIsHelpfulArray = isHelpfulArray.filter((prevIds) => prevIds !== loggedinUserId);
                await updateIsHelpful(reviewId, updatedIsHelpfulArray)
                    .then(() => {
                        setUpdateReviews(!updateReviews)
                        setTimeout(() => {
                            setVoting((prevIds) => ({ ...prevIds, [reviewId]: false }))
                        }, 2000)
                    }) 
            }

        } catch (error) {
            toast.error("Oops! something went wrong, please make sure you're logged-in and try again");
            console.error(error);
            setVoting((prevIds) => ({ ...prevIds, [reviewId]: false }))
        }
    }



    // Check if the new Review state contain a value
    useEffect(() => {
        if (review.length >= 1) {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }, [review])

    // Get Reviews
    useEffect(() => {
            if (perfumeId) {
                async function getAllReviews() {
                    await getReviews(perfumeId as string)
                        .then((res) => {
                            setAllReviews(res.documents);
                            // Get the numbers of Rates from the return documents
                            const numOfRates = res.documents.map((review: { rating: string }) => Number(review.rating));
                            const allNumOfRates: number[] = numOfRates;

                            // Calculate the average of Number of Rates
                            let total: number = 0;
                            for (let i: number = 0; i < allNumOfRates.length; i++) {
                                total += allNumOfRates[i];
                            }
                            const average: number = total / allNumOfRates.length;

                            setNumberOfRates(average);
                        })
                }
                getAllReviews();
            }
    }, [updateReviews, isLoggedin, perfumeId])

    if (loadingScreen) {
        return <LoadingScreen />
    } else {
        return (
            <div className="p-6 border rounded-lg mt-5">

                {/* Header section */}
                <div className="flex-col lg:flex lg:flex-row lg:justify-between items-center sm:text-left text-center header mb-3">

                    {/* Title + Subtitle */}
                    <div className="title-subtitle mb-5">
                        <h2 className="text-2xl font-bold">Delve into Customer Experiences</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Discover Fragrance Journeys Through the Lens of Fellow Connoisseurs
                        </p>
                    </div>

                    {/* Filters + Sort by + Write a review */}
                    <div className={`${allReviews.length == 0 ? 'hidden' : ''} actions flex space-x-3 sm:justify-start justify-center`}>

                        {/* Write a review */}
                        <Dialog open={isOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setIsOpen(true)} size="sm">Write a review</Button>
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
                                        onChange={(e) => setReview(e.target.value)}
                                        value={review}
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
                                    <Select defaultValue='5' onValueChange={(e) => setRating(e)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (<FaStar key={i} />))}
                                                    <span className="ml-2">
                                                        (5 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="4">
                                                <div className="flex items-center">
                                                    {[...Array(4)].map((_, i) => (<FaStar key={i} />))}
                                                    <span className="ml-2">
                                                        (4 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="3">
                                                <div className="flex items-center">
                                                    {[...Array(3)].map((_, i) => (<FaStar key={i} />))}
                                                    <span className="ml-2">
                                                        (3 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="2">
                                                <div className="flex items-center">
                                                    {[...Array(2)].map((_, i) => (<FaStar key={i} />))}
                                                    <span className="ml-2">
                                                        (2 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="1">
                                                <div className="flex items-center">
                                                    {[...Array(1)].map((_, i) => (<FaStar key={i} />))}
                                                    <span className="ml-2">
                                                        (1 stars)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>


                                <DialogFooter>
                                    <Button onClick={() => setIsOpen(false)} type="button" className="text-white bg-red-600 hover:bg-red-800">
                                        Cancel
                                    </Button>
                                    <Button disabled={submitDisabled} onClick={handleCreateNewComment} type="button" className="w-full mb-4 sm:mb-0">
                                        <span className={loadingSubmit ? 'hidden' : 'flex items-center'}>
                                            Submit My Review
                                            <LuSend size="14" className="ml-3" />
                                        </span>
                                        <span className={loadingSubmit ? '' : 'hidden'}>
                                            <Loading w={24} />
                                        </span>
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
                <div className={`${allReviews.length == 0 ? 'hidden' : ''} flex justify-center sm:justify-start items-center w-full`}>
                    <div className="text-4xl font-bold">{Math.floor(numberOfRates)}/5</div>

                    {/* Stars */}
                    <div className="flex items-center ml-1 mr-2 text-3xl">
                        {(generateStarRating(Math.floor(numberOfRates)))}
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400">({allReviews.length > 1 ? `${allReviews.length} Reviews` : `${allReviews.length} Review`})</div>
                </div>

                {/* Reviews */}
                <div className="mt-6">
                    <ScrollArea className="h-[400px] pr-2 w-full border-t-[1px] pt-2">

                        {/* Users Reviews */}
                        {allReviews.length == 0 ? (
                            <div className="flex flex-row w-full">
                                <div className="w-full hidden xl:flex mr-2">
                                    <img src="/images/feedback.jpg" className="w-auto h-[400px] mx-auto rounded-md shadow-md object-cover" />
                                </div>
                                <div className="w-full space-x-6">
                                    <center className="mt-5">
                                        <h1 className="text-3xl font-bold ">No Reviews yet 😴</h1>
                                        <br />
                                        <h1 className="text-md font-medium text-gray-600">You want to be the first? 😍 <br /> Here's how to add a good & helpful review:</h1>
                                    </center>
                                    <div className="text-center">
                                        <ol className="mt-4 text-muted-foreground">
                                            <li><span className="text-black font-semibold">Describe</span> your experience with the perfume in a few sentences.</li>
                                            <li><span className="text-black font-semibold">Mention</span> the scent notes or fragrance profile that you enjoyed.</li>
                                            <li><span className="text-black font-semibold">Share</span> how long the perfume lasted on your skin or clothes.</li>
                                            <li><span className="text-black font-semibold">Provide</span> any other details that could help other customers make an informed decision.</li>
                                        </ol>
                                    </div>

                                    <div className="mt-10 mx-auto flex justify-center">

                                        {/* Write a review */}
                                        <Dialog open={isOpen}>
                                            <DialogTrigger asChild>
                                                <Button onClick={() => setIsOpen(true)} size="lg" className="shadow-lg">Write a review now</Button>
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
                                                        onChange={(e) => setReview(e.target.value)}
                                                        value={review}
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
                                                    <Select defaultValue='5' onValueChange={(e) => setRating(e)}>
                                                        <SelectTrigger className="bg-white">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="5">
                                                                <div className="flex items-center">
                                                                    {[...Array(5)].map((_, i) => (<FaStar key={i} />))}
                                                                    <span className="ml-2">
                                                                        (5 stars)
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="4">
                                                                <div className="flex items-center">
                                                                    {[...Array(4)].map((_, i) => (<FaStar key={i} />))}
                                                                    <span className="ml-2">
                                                                        (4 stars)
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="3">
                                                                <div className="flex items-center">
                                                                    {[...Array(3)].map((_, i) => (<FaStar key={i} />))}
                                                                    <span className="ml-2">
                                                                        (3 stars)
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="2">
                                                                <div className="flex items-center">
                                                                    {[...Array(2)].map((_, i) => (<FaStar key={i} />))}
                                                                    <span className="ml-2">
                                                                        (2 stars)
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="1">
                                                                <div className="flex items-center">
                                                                    {[...Array(1)].map((_, i) => (<FaStar key={i} />))}
                                                                    <span className="ml-2">
                                                                        (1 stars)
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>


                                                <DialogFooter>
                                                    <Button onClick={() => setIsOpen(false)} type="button" className="text-white bg-red-600 hover:bg-red-800">
                                                        Cancel
                                                    </Button>
                                                    <Button disabled={submitDisabled} onClick={handleCreateNewComment} type="button" className="w-full mb-4 sm:mb-0">
                                                        <span className={loadingSubmit ? 'hidden' : 'flex items-center'}>
                                                            Submit My Review
                                                            <LuSend size="14" className="ml-3" />
                                                        </span>
                                                        <span className={loadingSubmit ? '' : 'hidden'}>
                                                            <Loading w={24} />
                                                        </span>
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {allReviews.map((review: Review, index) => (
                                    <>
                                        <div className={`${review.userId == loggedinUserId ? 'bg-yellow-50' : ''} flex items-start gap-4 mb-5 p-3 rounded-md`}>
                                            <Avatar className="w-10 h-10 border">
                                                <AvatarImage src={`${review.user.avatar}`} />
                                            </Avatar>

                                            <div className="flex-1 grid gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="font-medium" key={index}>{review.user ? review.user.username : 'unknown'}</div>
                                                    <div className="flex items-center gap-0.5 ml-auto">
                                                        <div className="flex items-center">
                                                            {[...Array(Number(review.rating))].map(() => (<FaStar />))}
                                                            <span className="ml-2 hidden sm:flex">
                                                                ({review.rating} stars)
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mt-[-5px]">
                                                    <time className="text-sm text-gray-500 dark:text-gray-400">
                                                        {review.$createdAt === review.$updatedAt ? (
                                                            <span>{review.$createdAt.split('T')[0]}</span>
                                                        ) : (
                                                            <span>{review.$createdAt.split('T')[0]}</span>
                                                            // <span>{review.$updatedAt.split('T')[0]} (edited)</span>
                                                        )}
                                                    </time>
                                                </div>
                                                <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                                                    <p>
                                                        {review.review}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div>
                                                        <Button
                                                            onClick={() => handleIsHelpful(review.$id)}
                                                            type="button"
                                                            variant="outline"
                                                            className={
                                                                review.isHelpful.includes(`${loggedinUserId}`) ? 'bg-blue-500 hover:bg-blue-600 hover:text-white text-white' : ''
                                                            }>
                                                            {voting[review.$id] ? (
                                                                <Loading w={20} />
                                                            ) : (
                                                                review.isHelpful.includes(`${loggedinUserId}`) ? (
                                                                    <>
                                                                        <AiFillLike className="w-4 h-4 mr-2" />
                                                                        Unvote ({review.isHelpful.length})
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <AiOutlineLike className="w-4 h-4 mr-2" />
                                                                        Vote ({review.isHelpful.length})
                                                                    </>
                                                                )
                                                            )}
                                                        </Button>
                                                    </div>
                                                    <div className="space-x-3">

                                                        {review.userId == loggedinUserId ? (
                                                            <>
                                                                {/* Edit review dialog */}
                                                                <Dialog open={reviewId === review.$id}>
                                                                    <DialogTrigger asChild>
                                                                        <Button onClick={() => setEditReview(review)} type="button" variant="outline">Edit</Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent className="sm:max-w-[425px]">
                                                                        <DialogHeader>
                                                                            <DialogTitle>Edit Your Scent Story</DialogTitle>
                                                                            <DialogDescription>
                                                                                Your thoughts matter! Re-leave your mark on the fragrance canvas.
                                                                            </DialogDescription>
                                                                        </DialogHeader>
                                                                        <div>
                                                                            <Textarea
                                                                                onChange={(e) => setEditedReviewText(e.target.value)}
                                                                                value={editedReviewText}
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
                                                                            <Select defaultValue={editedRating} onValueChange={(e) => setEditedRating(e)}>
                                                                                <SelectTrigger className="bg-white">
                                                                                    <SelectValue placeholder="Select" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="5">
                                                                                        <div className="flex items-center">
                                                                                            {[...Array(5)].map(() => (<FaStar />))}
                                                                                            <span className="ml-2">
                                                                                                (5 stars)
                                                                                            </span>
                                                                                        </div>
                                                                                    </SelectItem>
                                                                                    <SelectItem value="4">
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
                                                                                    <SelectItem value="2">
                                                                                        <div className="flex items-center">
                                                                                            {[...Array(2)].map(() => (<FaStar />))}
                                                                                            <span className="ml-2">
                                                                                                (2 stars)
                                                                                            </span>
                                                                                        </div>
                                                                                    </SelectItem>
                                                                                    <SelectItem value="1">
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
                                                                            <Button disabled={loadingSubmit} onClick={() => setReviewId(null)} type="button" className="text-white bg-red-600 hover:bg-red-800">
                                                                                Cancel
                                                                            </Button>
                                                                            <Button disabled={loadingSubmit} onClick={() => handleUpdateReview()} type="button" className="mb-4 sm:mb-0 w-full text-white bg-blue-600 hover:bg-blue-800">
                                                                                <span className={loadingSubmit ? 'hidden' : 'flex items-center'}>
                                                                                    Edit My Review
                                                                                    <LuSend size="14" className="ml-3" />
                                                                                </span>
                                                                                <span className={loadingSubmit ? '' : 'hidden'}>
                                                                                    <Loading w={24} />
                                                                                </span>
                                                                            </Button>
                                                                        </DialogFooter>
                                                                    </DialogContent>
                                                                </Dialog>

                                                                <Button disabled={loadingDelete[review.$id]} type="button" onClick={() => handleDeleteReview(review.$id)} variant="destructive">
                                                                    {loadingDelete[review.$id] ? (
                                                                        'Wiping...'
                                                                    ) : 'Wipe'}
                                                                </Button>
                                                            </>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Separator className="mb-5" />
                                    </>
                                )).reverse()}
                            </>
                        )}

                        {allReviews.length > 0 && (
                            <div className="flex flex-col justify-center w-full mx-auto">
                                <center className="my-12 text-2xl text-gray-500 font-semibold">
                                    <h1>
                                        No more reviews to show
                                    </h1>
                                </center>
                            </div>
                        )}
                    </ScrollArea>
                </div>


            </div>
        )
    }

} 