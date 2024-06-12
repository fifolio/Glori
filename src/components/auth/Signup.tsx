import { useState } from "react";
import { signup } from "@/backend/services/auth/signup";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

type FormDataTypes = {
    "email": string;
    "password": string;
    "username": string;
    "confirmPassword": string;
}


export default function Signup() {

    // form validation
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        username: yup.string().required(),
        confirmPassword: yup.string().oneOf([yup.ref("password")]).required()
    })

    const { setValue, handleSubmit, formState: { errors } } = useForm<FormDataTypes>({
        resolver: yupResolver(schema)
    });

    // States to collect user form data
    const
        { email, setEmail } = useSignupData(),
        { password, setPassword } = useSignupData(),
        { username, setUsername } = useSignupData(),
        [confirmPassword, setConfirmPassword] = useState<string>(''),

        // Alerts States if [Successful]
        { showSignupAlert, setShowSignupAlert } = useErrorAlert(),

        // Set the Form type 
        { setFormType } = useJoinFormType(),

        // Show Loading Spinner while Submit
        [loading, setLoading] = useState<boolean>(false);


    // handle inputs changes
    const
        handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setValue('email', e.target.value);
        },
        handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setValue('password', e.target.value);
        },
        handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
            setValue('username', e.target.value);
        },
        handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
            setValue('confirmPassword', e.target.value);
        }


    // Handle data submit
    async function handleDataSubmit(data: FormDataTypes) {
        setShowSignupAlert(false)
        setLoading(true)

        try {
            const results = await signup({ email: data.email, password: data.password, username: data.username });

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

    // Disable the "Enter" key from submitting a form or doing anything in a form or component
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleDataSubmit)} onKeyDown={handleKeyDown}>
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
                                    <Label className="font-bold text-black text-[15px]">Email Address</Label>
                                    <p className="text-gray-500 text-sm">
                                        Please provide your email address you want to create an account with.
                                    </p>
                                    <Input
                                        className={email ? 'text-black' : ''}
                                        id="email"
                                        type="email"
                                        onChange={handleEmailChange}
                                        placeholder="glori@example.com"
                                        required
                                    />
                                </div>
                            </p>
                        </div>

                        <div className="flex-col space-y-4 justify-between">

                            {/* Username  */}
                            <div className="space-y-2">
                                <Label className="font-bold text-black text-[15px]">Username</Label>
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
                                    onChange={handleUsernameChange}
                                    required
                                />
                            </div>

                            {/* Password  + confirm password*/}
                            <div className="md:flex md:flex-row md:space-x-4">


                                {/* Password */}
                                <div className="w-full">
                                    <Label className="font-bold text-black text-[15px]">Password</Label>
                                    <Input
                                        className={`${password ? 'text-black' : ''} mt-3`}
                                        id="password"
                                        type="password"
                                        onChange={handlePasswordChange}
                                        placeholder="••••••••••"
                                        required
                                    />

                                </div>

                                {/* Confirm Password */}
                                <div className="md:mt-0 mt-3 w-full">
                                    <Label className="font-bold text-black text-[15px]">Confirm Password</Label>
                                    <Input
                                        className={`${confirmPassword ? 'text-black' : ''} mt-3`}
                                        id="confirmPassword"
                                        type="password"
                                        onChange={handleConfirmPasswordChange}
                                        placeholder="••••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Handle confirmPassword message Error */}
                            {errors.confirmPassword ? (<p className="text-red-500 text-sm">Passwords do not match. Please re-enter matching passwords.</p>) : null}

                            <div className="w-full">
                                <p className="text-gray-500 text-sm min-w-fit">
                                Please enter your <span className="text-orange-600">8 characters</span> or more password.
                                </p>
                            </div>
                        </div>

                        {/* Sign up OR Login */}
                        <div className="flex items-center mt-6 space-x-3">

                            {/* Go to Login */}
                            <Button disabled={loading} className="bg-blue-600 hover:bg-blue-800 shadow-md transition"
                                onClick={backToLogin}>
                                Go to Login
                            </Button>

                            {/* Signup Now */}
                            <Button
                                className='w-full'
                                disabled={(username.length > 3) && (email.length > 3) && (password.length > 8) && (confirmPassword.length > 8) ? false : true}>
                                {loading ? (<Loading w={24} />) : 'Signup Now'}
                            </Button>


                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}