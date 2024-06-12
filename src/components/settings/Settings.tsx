// import { useState } from "react"

// UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "../ui/separator";

export default function Settings() {

    // Update the page title
    document.title = `Glori | Settings`;

    const disabledBtn: boolean = false;

    return (
        <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

            {/* Basic Account Settings */}
            <div className="space-y-8">
                <h1 className="text-3xl font-bold mb-10 mt-5">Account Settings</h1>

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
                            <Button className="w-full sm:w-fit" variant={disabledBtn ? 'outline' : 'default'} disabled={disabledBtn ? true : false}>{disabledBtn ? (
                                <span className="flex items-center space-x-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span className="text-sm font-medium text-black">Verified</span>
                                </span>
                            ) : 'Verify Account'}</Button>
                        </div>
                    </div>
                </div>

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
                            <Button className="w-full sm:w-fit">Reset Password</Button>
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
                            <Button className="w-full sm:w-fit">Update Email</Button>
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
                            <Button className="w-full sm:w-fit">Update Username</Button>
                        </div>
                    </div>
                </div>

                {/* Update Phone Number */}
                <div>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">Update Phone Number</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Change the phone number associated with your account.
                            </p>
                        </div>

                        <div className="sm:mt-0 mt-3 w-full sm:w-fit">
                            <Button className="w-full sm:w-fit">Update Phone Number</Button>
                        </div>
                    </div>
                </div>

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
                            <Button className="w-full sm:w-fit">Update Profile Picture</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-16 w-52 mx-auto" />

            {/* Basic Account Settings */}
            <div className="space-y-8 bg-gray-100 rounded-lg p-3 mb-14">
                <h1 className="text-2xl font-bold mb-10 mt-5">Shopping Details</h1>

                <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-2">Shipment Information</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Update the address for your shipments.</p>
                    <form className="grid gap-4">
                        <Input placeholder="Street Address" />
                        <div className="flex flex-col sm:flex-row justify-between sm:space-x-3 space-y-4 sm:space-y-0">
                            <div className="w-full space-y-4">
                                <Input placeholder="City" />
                                <Input placeholder="State" />
                            </div>
                            <div className="w-full space-y-4">
                                <Input placeholder="Zip Code" />
                                <Button className="w-full">Update Shipment Address</Button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Credit Card Information */}
                <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-2">Credit Card Information</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Update your credit card details.</p>
                    <form className="grid gap-4">
                        <Input placeholder="Card Number" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Expiry Date" />
                            <Input placeholder="CVC" />
                        </div>
                        <Button className="w-full">Update Credit Card</Button>
                    </form>
                </div>
            </div>

        </div>
    )
}