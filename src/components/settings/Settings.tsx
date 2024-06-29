import { useEffect, useState } from "react";
import { getUserMetaData } from "@/backend/services/user/getUser";
import useUserVerificationState from "@/lib/states/userVerificationState";
import GetDialog from "./GetDialog";
import ShoppingDetails from "./ShoppingDetails";

// STATES
import useIsSettingsCustomDialogOpen from "@/lib/states/isSettingsCustomDialogOpen";

// UI
import { Button } from "@/components/ui/button"
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import Loading from "../ui/loading";

export default function Settings() {

    // Update the page title
    document.title = `Glori | Settings`;

    const [loading, setLoading] = useState<boolean>(true);

    // Update the Verification State
    const { isVerified, setIsVerified } = useUserVerificationState();
    // Customize the Dialog content
    const [contentType, setContentType] = useState<string>(''),
        { setIsOpen } = useIsSettingsCustomDialogOpen();


    // check user Verification state
    async function checkVerification() {
        const res = await getUserMetaData()
        res && setIsVerified(res.emailVerification)
        setLoading(false)
    }

    // Handle Update Btns
    function updateEmail() {
        setContentType('UpdateEmail')
        setIsOpen(true)
    }
    function updateUsername() {
        setContentType('UpdateUsername')
        setIsOpen(true)
    }
    // function updatePhoneNumber() {
    //     setContentType('UpdatePhoneNumber')
    //     setIsOpen(true)
    // }

    function updateProfilePicture() {
        setContentType('UpdateProfilePicture')
        setIsOpen(true)
    }

    // function deleteAccount(){
    //     setContentType('DeleteAccount')
    //     setIsOpen(true)
    // }

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }


    useEffect(() => {
        checkVerification();

    }, [])

    return (
        <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

            {/* Basic Account Settings */}
            <div className="space-y-8">
                <h1 className="text-3xl font-bold mb-10 mt-5">Account Settings</h1>

                <Separator className="mt-16 w-52 mx-auto" />

                {/* Verify Your Account */}
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Verify Your Account</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Ensure your account is secure by verifying your identity.
                            </p>
                        </div>
                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Link to={isVerified ? '#' : '/verify'} className={`${isVerified ? 'cursor-text' : ''}`} onClick={scrollTopFunc}>
                                <Button className="w-full sm:w-fit" variant={isVerified ? 'outline' : 'default'} disabled={isVerified}>{isVerified ? (
                                    <span className="flex items-center space-x-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="text-sm font-medium text-black">Verified</span>
                                    </span>
                                ) :
                                    loading ? <Loading w={24} /> : 'Start Verification'
                                }</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Separator className="mt-16 w-52 mx-auto" />

                {/* Reset Password */}
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Reset Password</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Change your password to a new, more secure one.
                            </p>
                        </div>
                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Link to="/reset" onClick={scrollTopFunc}>
                                <Button className="w-full sm:w-fit">Reset Password</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Update Email */}
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Update Email</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Change the email address associated with your account.
                            </p>
                        </div>
                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Button className="w-full sm:w-fit" onClick={updateEmail}>Update Email</Button>
                        </div>
                    </div>
                </div>

                {/* Update Username */}
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Update Username</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Change the username displayed on your profile.
                            </p>
                        </div>
                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Button className="w-full sm:w-fit" onClick={updateUsername}>Update Username</Button>
                        </div>
                    </div>
                </div>

                {/* Update Phone Number */}
                {/* <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Update Phone Number</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Change the phone number associated with your account.
                            </p>
                        </div>

                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Button className="w-full sm:w-fit"  onClick={updatePhoneNumber}>Update Phone Number</Button>
                        </div>
                    </div>
                </div> */}

                {/* Profile Picture */}
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Profile Picture</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Update the profile picture associated with your account.
                            </p>
                        </div>

                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Button className="w-full sm:w-fit" onClick={updateProfilePicture}>Update Profile Picture</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Dialog */}
            <GetDialog contentFor={contentType} />

            <Separator className="my-16 w-52 mx-auto" />

            {/* Delete Your Account */}
            {/* <div className="space-y-8 mt-10">
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Delete Your Account</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Deleting your account will remove all its data permanently.
                            </p>
                        </div>
                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Button className="w-full sm:w-fit" variant="destructive" onClick={deleteAccount}>Delete Your Account</Button>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <Separator className="my-16 w-52 mx-auto" /> */}

            {/* Shopping Details Settings */}
            <ShoppingDetails/>

            <Separator className="mt-16 w-52 mx-auto" />

            {/* Store Settings */}
            <div className="space-y-8">
                <h1 className="text-3xl font-bold mt-10">Store Settings</h1>

                {/* Delete Your Store */}
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Delete Your Store</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Deleting your store will remove all its data permanently.
                            </p>
                        </div>
                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Button className="w-full sm:w-fit" variant="destructive">Delete Your Store</Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}