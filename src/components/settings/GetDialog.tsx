import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { getUserMetaData } from "@/backend/services/user/getUser";

// Services
import updateEmail from "@/backend/services/user/updateEmail";
import updateUsername from "@/backend/services/user/updateUsername";


// STATES
import useIsSettingsCustomDialogOpen from "@/lib/states/isSettingsCustomDialogOpen";
import checkOnUpdateEmailErrors from "@/lib/errors/checkOnUpdateEmailErrors";

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

type GetDialogTypes = {
    contentFor: string;
}

export default function GetDialog({ contentFor }: GetDialogTypes) {

    // Turn on/off dialog
    const { isOpen, setIsOpen } = useIsSettingsCustomDialogOpen(),
        [loading, setLoading] = useState<boolean>(false),
        // Set the Errors messages
        [updateEmailError, setUpdateEmailError] = useState<string>('');

    // User the Close button on the Dialog to update the Value of the inputs Whenever user close the we
    const [updateData, setUpdateData] = useState<boolean>(false)

    // Get the logged-in user meta data
    const [userData, setUserData] = useState<Models.User<Models.Preferences>>();

    // Store user password
    const [password, setPassword] = useState<string>(''),
        // Meta Data Store
        [newEmail, setNewEmail] = useState<string>(''),
        [newUsername, setNewUsername] = useState<string>(''),
        [newPhoneNumber, setNewPhoneNumber] = useState<string>(''),
        // Show the results after update
        [resutls, setResults] = useState<boolean>(false);




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

    // Handle CandleBtn
    function handleCandleBtn() {
        setIsOpen(false)
        setTimeout(() => {
            setUpdateData(!updateData)
            setResults(false)
        }, 1000)
    }

    // Get the logged in user metadata, then pass the required data as a placeholders in the Meta Data Store
    async function getLoggedinUser() {
        const userMetaData = await getUserMetaData()
        userMetaData ? setUserData(userMetaData) : null;
    }

    useEffect(() => {
        getLoggedinUser()
        setUpdateData(!updateData)

        // Set Dialogs Placeholders
        setNewEmail(`${userData?.email}`)
        setNewUsername(`${userData?.name}`)
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

                                        {/* Show Update Resutls */}
                                        <div className={`${resutls ? '' : 'hidden'}`}>
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


                                        <Table className={`${resutls ? 'hidden' : ''}`}>
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

                                        <div className={resutls ? 'hidden' : 'flex flex-col sm:flex-row item-start sm:space-x-3'}>
                                            <Input id="email" type="email" placeholder={newEmail} required className="text-black sm:mb-0 mb-3" onChange={(e) => setNewEmail(e.target.value)} />
                                            <Input id="password" type="password" placeholder="••••••••••" required className="text-black" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <p className={`${updateEmailError === '' && 'hidden'} text-sm text-red-900 text-start w-full bg-red-200 border border-red-400 p-2 shadow-sm rounded-lg`}>
                                            {updateEmailError}
                                        </p>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className={resutls ? 'hidden' : 'flex flex-row sm:items-center items-end justify-end space-x-3 mt-3'}>
                                <AlertDialogCancel onClick={handleCandleBtn}>Cancel</AlertDialogCancel>
                                <AlertDialogAction type="submit" disabled={loading}>{loading ? (<Loading w={24} />) : 'Update Email'}</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            )
            break;
        case 'UpdateUsername':
            return (
                <AlertDialog open={isOpen}>
                    <AlertDialogContent>
                        <form onSubmit={(e) => handleUpdateUsernameSubmit(e)}>
                            <AlertDialogHeader className='w-full'>
                                <AlertDialogTitle className='mx-auto'>Update Your Username</AlertDialogTitle>
                                <AlertDialogDescription className='text-center'>
                                    <div className="space-y-4 mt-3">

                                        {/* Show Update Resutls */}
                                        <div className={`${resutls ? '' : 'hidden'}`}>
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


                                        <Table className={`${resutls ? 'hidden' : ''}`}>
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

                                        <div className={resutls ? 'hidden' : 'flex flex-col sm:flex-row item-start sm:space-x-3'}>
                                            <Input type="text" placeholder={newUsername} minLength={3} maxLength={20} required className="text-black sm:mb-0 mb-3" onChange={(e) => setNewUsername(e.target.value)} />
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className={resutls ? 'hidden' : 'flex flex-row sm:items-center items-end justify-end space-x-3 mt-3'}>
                                <AlertDialogCancel onClick={handleCandleBtn}>Cancel</AlertDialogCancel>
                                <AlertDialogAction type="submit" disabled={loading}>{loading ? (<Loading w={24} />) : 'Update Username'}</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            )
            break;
        default:
            break;
    }
}
