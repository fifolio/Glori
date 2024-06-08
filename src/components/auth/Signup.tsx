import { useState } from "react";
import { signup } from "@/backend/services/auth/signup";

// UI
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import Loading from "../ui/loading";


// STATES
import useJoinFormType from "@/lib/states/joinFormType";
import useSignupData from "@/lib/states/signupData";
import useErrorAlert from "@/lib/states/errorAlert";
import checkOnAuthErrors from "@/lib/errors/checkOnAuthErrors";
import errorsStore from "@/lib/errors/errorsStore";




export default function Signup() {


    // States to collect user form data
    const
        { email, setEmail } = useSignupData(),
        { password, setPassword } = useSignupData(),
        { username, setUsername } = useSignupData(),

        // Alerts States if [Successful]
        { showSignupAlert, setShowSignupAlert } = useErrorAlert(),

        // Set the Form type 
        { setFormType } = useJoinFormType(),

        // Show Loading Spinner while Submit
        [loading, setLoading] = useState<boolean>(false);


    // Handle data submit
    async function handleSubmit() {
        setShowSignupAlert(false)
        setLoading(true)

        try {
            const results = await signup({ email: email, password: password, username: username });

            // Check on Errors store if there's a match to the Error occurred, 
            // if there's any, error type must be send to checkOnAuthError and return with its error description
            const isTheresError = errorsStore.includes(results)
            if (isTheresError) {
                const errorType = errorsStore.find(errorType => errorType === results)
                toast.error(`${checkOnAuthErrors(errorType).errordescription}`)
                setLoading(false)
            } else if (!isTheresError && results) {
                setLoading(false)
                setShowSignupAlert(true)
            } else {
                setLoading(false)
                setShowSignupAlert(false)
            }

        } catch (error) {
            setLoading(false)
            console.error('An error occurred while Handling data submit (Signup form): ', error)
        }
    }

    // Handle BackToLogin btn
    function backToLogin() {
        setFormType('login')
        setShowSignupAlert(false)
    }



    return (
        <>
            <div className="mt-6">

                {/* Alerts */}
                <div className={`${showSignupAlert ? '' : 'hidden'}`}>

                    {/* Successful Msg */}
                    <div className="bg-green-200 text-green-800 border-green-500 shadow-sm rounded-md p-4">
                        <h1 className="text-lg font-bold mb-4 capitalize">Dear {username}</h1>
                        <p className="text-sm text-green-800">
                            Congratulations on joining our exclusive community of luxury perfume enthusiasts! Your account has been successfully created, and you're now part of a niche market where elegance and fragrance blend seamlessly. To complete your profile and start listing your exquisite perfumes, please <span className="font-bold">log in</span> to your account.
                        </p>
                    </div>

                    {/* Log in Now btn */}
                    <Button className='w-full mt-4 shadow-lg' onClick={backToLogin}>
                        Log in Now
                    </Button>
                </div>

                <div className={showSignupAlert ? 'hidden' : ''}>

                    {/* Email */}
                    <div >
                        <p className="text-gray-500 text-sm mb-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold text-black text-[15px]">Email Address</Label>
                                <p className="text-gray-500 text-sm">
                                    Please provide your email address you want to create an account with.
                                </p>
                                <Input
                                    className={email ? 'text-black' : ''}
                                    id="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="glori@example.com"
                                    required
                                />
                            </div>
                        </p>
                    </div>

                    <div className="flex-col space-y-4 justify-between">

                        {/* Username  */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold text-black text-[15px]">Username</Label>
                            <div className="flex justify-between w-full">
                                <p className="text-gray-500 text-sm min-w-fit">
                                    Pick a unique username that represents your identity on our platform.
                                </p>

                            </div>
                            <Input
                                className={username ? 'text-black' : ''}
                                id="username"
                                type="text"
                                placeholder="Amanda, James, Michelle, ..."
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password  */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold text-black text-[15px]">Password</Label>
                            <div className="flex justify-between w-full">
                                <p className="text-gray-500 text-sm min-w-fit">
                                    Please enter your 8 characters or more password.
                                </p>

                            </div>
                            <Input
                                className={password ? 'text-black' : ''}
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Sign up OR Login */}
                    <div className="flex items-center mt-6 space-x-3">

                        {/* Go to Login */}
                        <Button variant="outline" disabled={loading} className="border-gray-400"
                            onClick={backToLogin}>
                            Go to Login
                        </Button>

                        {/* Signup Now */}
                        <Button
                            className='w-full'
                            disabled={(username.length > 3) && (email.length > 3) && (password.length > 8) ? false : true}
                            onClick={handleSubmit}
                        >
                            {loading ? (<Loading w={24} />) : 'Signup Now'}
                        </Button>


                    </div>
                </div>
            </div>
        </>
    )
}