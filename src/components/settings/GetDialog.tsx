import { Models } from "appwrite";
import { useEffect, useState } from "react";
import axios from "axios";

// Services
import { getUserMetaData } from "@/backend/services/user/getUser";
import updateEmail from "@/backend/services/user/updateEmail";
import updateUsername from "@/backend/services/user/updateUsername";
import { getUserProfilePicture, handleUpdateAvatar } from "@/backend/services/user/updateProfilePicture";
import { handleDeleteStore } from "@/backend/services/store/deleteStore";
import { getStore } from "@/backend/services/store/getStore";

// STATES
import useIsSettingsCustomDialogOpen from "@/lib/states/isSettingsCustomDialogOpen";
import checkOnUpdateEmailErrors from "@/lib/errors/checkOnUpdateEmailErrors";
import useCheckStoreState from "@/lib/states/userStoreState";


// ICONS
import { IoCloudUploadOutline } from "react-icons/io5";

// UI
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "../ui/alert-dialog";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { Input } from "../ui/input";
import Loading from "../ui/loading";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { toast } from "sonner";

type GetDialogTypes = {
    contentFor: string;
}

export default function GetDialog({ contentFor }: GetDialogTypes) {

    // Set isStoreValid State
    const { setIsStoreValid } = useCheckStoreState();

    // Turn on/off dialog
    const { isOpen, setIsOpen } = useIsSettingsCustomDialogOpen(),
        [loading, setLoading] = useState<boolean>(false),
        [uploading, setUploading] = useState<boolean>(false),
        // Set the Errors messages
        [updateEmailError, setUpdateEmailError] = useState<string>('');

    // Use the Close button on the Dialog to update the Value of the inputs Whenever user close the we
    const [updateData, setUpdateData] = useState<boolean>(false)

    // Get the logged-in user meta data
    const [userData, setUserData] = useState<Models.User<Models.Preferences>>();

    // Store user password
    const [password, setPassword] = useState<string>(''),
        // Meta Data Store
        [newEmail, setNewEmail] = useState<string>(''),
        [newUsername, setNewUsername] = useState<string>(''),
        // Show the results after update
        [results, setResults] = useState<boolean>(false);


    // Get / Update the user profile picture
    // The default/current user Avatar
    const [avatar, setAvatar] = useState<string>('/public/images/avatar.jpg'),
        // Store the NEW user avatar to Preview
        [previewAvatar, setPreviewAvatar] = useState<string | undefined>(undefined),
        // Store the new avatar to upload
        [newAvatar, setNewAvatar] = useState<File | undefined>(undefined);


    const
        // Get the email user entered to check to delete store
        [emailToCheck, setEmailToCheck] = useState<string>(''),
        // Get the user Store name
        [storeName, setStoreName] = useState<string>('');

    // Turn the loading state off when the new avatar uploaded
    useEffect(() => {
        setLoading(false)
    }, [previewAvatar])




    // handle Update Email form submit
    async function handleUpdateEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        await updateEmail(newEmail, password)
            .then((res) => {
                // Check on Errors store if there's a match to the Error occurred, if there's any, error type must be send to checkOnUpdateEmailErrors and return with its error description
                const returnError = checkOnUpdateEmailErrors(res);
                if (returnError) {
                    setUpdateEmailError(returnError)
                } else {
                    setUpdateEmailError('')
                    setResults(true)
                }
                setLoading(false)
            })
    }

    // handle Update Username form submit
    async function handleUpdateUsernameSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        await updateUsername(newUsername)
            .then(() => {
                setResults(true)
                setLoading(false)
            })
    }

    // handle Update Profile Picture submit
    async function handleUpdateProfilePicture() {
        setUploading(true)
        const data = new FormData();
        data.append("file", newAvatar ? newAvatar : '');
        data.append("upload_preset", "glorious");

        axios.post("https://api.cloudinary.com/v1_1/dprqv5quy/image/upload", data).then(async (res) => {

            // if the picture url ready, send it to the user document in the backend
            if (res.data.url) {

                // Collect the userID and picture Url to be send
                let payload = {
                    userID: `${userData?.$id}`,
                    newAvatarUrl: `${res.data.url}`
                }

                await handleUpdateAvatar(payload).then(() => {
                    toast.success("Your Profile Picture Updated Successfully!");
                    setNewAvatar(undefined)
                    setUploading(false)
                }).catch((error) => {
                    toast.error("Oops! We can not upload your picture at the moment, Please try again later.");
                    console.log(error)
                    setNewAvatar(undefined)
                    setUploading(false)
                })

            } else {
                console.error("Error on the response url")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    // handle Delete Store form submit
    async function handleDeleteStoreSubmit() {
        setLoading(true)
        const storeId = userData?.$id as string;
        const userEmail = userData?.email as string;

        if (emailToCheck.toLowerCase() !== userEmail) {
            toast.error("The email address you entered does not match our records. Please try again.")
            setLoading(false)
        } else {
            await handleDeleteStore(`${storeId}`)
                .then(() => {
                    setResults(true)
                    setIsStoreValid(false)
                    setLoading(false)
                })
        }

    }

    // Handle CandleBtn
    function handleCandleBtn() {
        // reset the previewAvatar to undefined
        setPreviewAvatar(undefined);

        setLoading(false)
        setIsOpen(false)
        setTimeout(() => {
            setUpdateData(!updateData)
            setResults(false)
        }, 1000)
    }

    // Get current logged-in user profile picture
    useEffect(() => {
        if (userData) {
            if (userData.$id.length > 5) {
                async function getUserShoppingDetailsFunc() {
                    const res = await getUserProfilePicture(userData ? userData.$id : '');
                    if (res) {
                        setAvatar(res)
                        setLoading(false)
                    }
                }
                getUserShoppingDetailsFunc();
            }
        }
    }, [updateData]);


    // Get the logged in user metadata, then pass the required data as a placeholders in the Meta Data Store
    async function getLoggedinUser() {
        const userMetaData = await getUserMetaData()
        userMetaData ? setUserData(userMetaData) : null;
    }

    async function getStoreDetails() {
        await getStore(userData?.$id as string)
            .then((res) => setStoreName(res.name));
    }

    useEffect(() => {
        getLoggedinUser()
        setUpdateData(!updateData)
        setNewAvatar(undefined)
        // Set Dialogs Placeholders
        setNewEmail(`${userData?.email}`)
        setNewUsername(`${userData?.name}`)

        getStoreDetails();

    }, [userData?.email])

    switch (contentFor) {
        case 'UpdateEmail':
            return (
                <AlertDialog open={isOpen}>
                    <AlertDialogContent>
                        <form onSubmit={(e) => handleUpdateEmailSubmit(e)}>
                            <AlertDialogHeader className='w-full'>
                                <AlertDialogTitle className='mx-auto'>Update Your Email Address</AlertDialogTitle>
                                <AlertDialogDescription className='text-center'>
                                    <div className="space-y-4 mt-3">

                                        {/* Show Update results */}
                                        <div className={`${results ? '' : 'hidden'}`}>
                                            <div className="bg-white rounded-lg max-w-md w-full mt-[-60px]">
                                                <div className="text-center mt-7">
                                                    <img src="/images/success.gif" alt="Successfully Updated" className="w-[250px] mx-auto" />
                                                    <h1 className="text-2xl font-bold mt-4">Email Updated</h1>
                                                    <p className="text-gray-500 mt-4">
                                                        Your email has been successfully updated. Please verify your new email address to complete the update process.
                                                    </p>
                                                </div>
                                                <div className="mt-9">
                                                    <Link to="/verify" onClick={() => setLoading(true)}>
                                                        <Button disabled={loading}>{loading ? (<Loading w={24} />) : 'Verify Email Now'}</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>


                                        <Table className={`${results ? 'hidden' : ''}`}>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[40px]">Step</TableHead>
                                                    <TableHead>Instructions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50">
                                                            1
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-start">
                                                        <div>
                                                            <p className="text-sm text-gray-500 font-light">
                                                                Please enter your new email address. Make sure to provide a valid email address to continue receiving important notifications and updates.
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="text-start">
                                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50">
                                                            2
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-start">
                                                        <div>
                                                            <p className="text-sm text-gray-500 font-light">
                                                                To begin the process of updating your email address, please enter your current password. This step is crucial to ensure the security of your account and to verify your identity.
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="text-start">
                                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50">
                                                            3
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-start">
                                                        <div>
                                                            <p className="text-sm text-gray-500 font-light">
                                                                Your email address has been successfully updated. You will now receive all future notifications at your new email address. In addition, you'll need to verify the new email by completing the <span className="text-black font-semibold">verification process</span>.
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                        <div className={results ? 'hidden' : 'flex flex-col sm:flex-row item-start sm:space-x-3'}>
                                            <Input id="email" type="email" placeholder={newEmail} required className="text-black sm:mb-0 mb-3" onChange={(e) => setNewEmail(e.target.value)} />
                                            <Input id="password" type="password" placeholder="••••••••••" required className="text-black" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <p className={`${updateEmailError === '' && 'hidden'} text-sm text-red-900 text-start w-full bg-red-200 border border-red-400 p-2 shadow-sm rounded-lg`}>
                                            {updateEmailError}
                                        </p>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className={results ? 'hidden' : 'flex flex-row sm:items-center items-end justify-end space-x-3 mt-3'}>
                                <AlertDialogCancel onClick={handleCandleBtn}>Cancel</AlertDialogCancel>
                                <AlertDialogAction type="submit" disabled={loading}>{loading ? (<Loading w={24} />) : 'Update Email'}</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            )
        case 'UpdateUsername':
            return (
                <AlertDialog open={isOpen}>
                    <AlertDialogContent>
                        <form onSubmit={(e) => handleUpdateUsernameSubmit(e)}>
                            <AlertDialogHeader className='w-full'>
                                <AlertDialogTitle className='mx-auto'>Update Your Username</AlertDialogTitle>
                                <AlertDialogDescription className='text-center'>
                                    <div className="space-y-4 mt-3">

                                        {/* Show Update results */}
                                        <div className={`${results ? '' : 'hidden'}`}>
                                            <div className="bg-white rounded-lg max-w-md w-full mt-[-60px]">
                                                <div className="text-center mt-7">
                                                    <img src="/images/success.gif" alt="Successfully Updated" className="w-[250px] mx-auto" />
                                                    <h1 className="text-2xl font-bold mt-4">Username Successfully Updated</h1>
                                                    <p className="text-gray-500 mt-4">
                                                        Your username has been successfully updated. This new username will be displayed in your future comments and activities.
                                                    </p>
                                                </div>
                                                <div className="mt-9">
                                                    <Button onClick={handleCandleBtn}>Done</Button>
                                                </div>
                                            </div>
                                        </div>


                                        <Table className={`${results ? 'hidden' : ''}`}>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[40px]">Step</TableHead>
                                                    <TableHead>Instructions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50">
                                                            1
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-start">
                                                        <div>
                                                            <p className="text-sm text-gray-500 font-light">
                                                                Please enter your new username. Your username must be <p className="text-black font-semibold">between 3 to 20 characters</p> and should reflect your real name.
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="text-start">
                                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50">
                                                            2
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-start">
                                                        <div>
                                                            <p className="text-sm text-gray-500 font-light">
                                                                To begin updating your username, click on "Update Username".
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>


                                        <div className={results ? 'hidden' : 'flex flex-col sm:flex-row item-start sm:space-x-3'}>
                                            <Input type="text" placeholder={newUsername} min={3} minLength={3} maxLength={20} max={20} required className="text-black sm:mb-0 mb-3" onChange={(e) => setNewUsername(e.target.value)} />
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className={results ? 'hidden' : 'flex flex-row sm:items-center items-end justify-end space-x-3 mt-3'}>
                                <AlertDialogCancel onClick={handleCandleBtn}>Cancel</AlertDialogCancel>
                                <AlertDialogAction type="submit" disabled={loading}>{loading ? (<Loading w={24} />) : 'Update Username'}</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            )
        case 'UpdateProfilePicture':
            return (
                <AlertDialog open={isOpen}>
                    <AlertDialogContent className="p-0">
                        <Card className="w-full border-0 m-0">
                            <CardHeader>
                                <CardTitle>Update Profile Picture</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-center">
                                    {loading ? (
                                        <Loading w={128} />
                                    ) : (
                                        <img
                                            src={previewAvatar ? previewAvatar : avatar}
                                            alt="Profile Picture"
                                            width={128}
                                            height={128}
                                            className="aspect-square rounded-full object-cover shadow-md border"
                                        />
                                    )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    For best results, upload a high-quality image with a square aspect ratio, such as 1:1. The recommended size is
                                    500x500 pixels or higher.
                                </div>
                                <div className="flex sm:flex-row flex-col justify-between gap-2">
                                    <Button variant="destructive" onClick={handleCandleBtn} disabled={uploading}>Close</Button>
                                    <Button className="w-full p-0 m-0" disabled={uploading}>
                                        <Label htmlFor="fileInput" className="flex items-center justify-center py-3  cursor-pointer w-full rounded-md">
                                            Upload New Picture
                                        </Label>
                                    </Button>
                                    <Input id="fileInput" type="file" accept="image/*" onChange={(e) => {
                                        const newProfilePicture = e.target.files?.[0];
                                        setNewAvatar(newProfilePicture)
                                        setLoading(true)
                                        setPreviewAvatar(newProfilePicture ? URL.createObjectURL(newProfilePicture) : undefined)
                                    }} className="hidden" />
                                    <Button variant="outline" onClick={handleUpdateProfilePicture} disabled={uploading || newAvatar === undefined && true}>
                                        {uploading ? (
                                            <>
                                                <Loading w={20} />
                                                <span className="mx-2">
                                                    Please wait..
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <IoCloudUploadOutline size="20" />
                                                <span className="mx-2">
                                                    Upload Now
                                                </span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </AlertDialogContent>
                </AlertDialog>
            )
        case 'DeleteStore':
            return (
                <AlertDialog open={isOpen}>
                    <AlertDialogContent>
                        <form>
                            <AlertDialogHeader className='w-full'>
                                <AlertDialogTitle className='mx-auto'>Confirm Store Deletion</AlertDialogTitle>
                                <AlertDialogDescription className='text-center'>
                                    <div className="space-y-4 mt-3">

                                        {/* Show Update results */}
                                        <div className={`${results ? '' : 'hidden'}`}>
                                            <div className="bg-white rounded-lg max-w-md w-full mt-[-60px]">
                                                <div className="text-center mt-7">
                                                    <img src="/images/success.gif" alt="Successfully Updated" className="w-[250px] mx-auto" />
                                                    <h1 className="text-2xl font-bold mt-4">Store Successfully Deleted</h1>
                                                    <p className="text-gray-500 mt-4">
                                                        Your store, {storeName}, and all associated products have been successfully deleted.
                                                    </p>
                                                </div>
                                                <div className="mt-9">
                                                    <Button type="button" onClick={handleCandleBtn}>Done</Button>
                                                </div>
                                            </div>
                                        </div>


                                        <div className={`${results ? 'hidden' : ''} border text-red-900 border-red-500 bg-red-200 rounded-lg text-left`}>
                                            {/* Dialog Message */}
                                            <div className="mt-2 px-7 py-3">
                                                <p className="text-sm">
                                                    You are about to delete your store, <strong>{storeName}</strong>, and all the products associated with it. This action cannot be undone.
                                                </p>
                                            </div>
                                            {/* Security Instructions */}
                                            <div className="px-7 mb-3">
                                                <p className="text-sm">
                                                    For security reasons, please enter your email address to confirm the deletion.
                                                </p>
                                            </div>
                                        </div>


                                        <div className={results ? 'hidden' : 'flex flex-col sm:flex-row item-start sm:space-x-3'}>
                                            <Input type="email" placeholder="email@example.com" required className="text-black sm:mb-0 mb-3" onChange={(e) => setEmailToCheck(e.target.value)} />
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className={results ? 'hidden' : 'flex flex-row justify-between space-x-3 mt-3'}>
                                <AlertDialogAction type="button" onClick={() => handleDeleteStoreSubmit()} className="bg-red-600" disabled={loading}>{loading ? (<Loading w={24} />) : 'Delete now'}</AlertDialogAction>
                                <AlertDialogCancel onClick={handleCandleBtn}>Cancel</AlertDialogCancel>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            )
        default:
            break;
    }
}