import { useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

import { login } from "@/backend/services/auth/login";


// UI
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label";
import Loading from "../ui/loading";
import { toast } from "sonner";


// ICONS
import { FcGoogle } from "react-icons/fc";

// STATES
import useSignupData from "@/lib/states/signupData";
import errorsStore from "@/lib/errors/errorsStore";
import checkOnAuthErrors from "@/lib/errors/checkOnAuthErrors";
import useUserState from "@/lib/states/userStates";


type FormDataTypes = {
    "email": string,
    "password": string,
}

export default function Login() {

    // form validation
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })

    const { setValue, handleSubmit } = useForm<FormDataTypes>({
        resolver: yupResolver(schema)
    });


    // Get the user data after a successful Sign up (If its ready), then place its specific inputs
    const
        // Email:
        { email: EmailFromSignup } = useSignupData(),
        [email, setEmail] = useState<string>(`${EmailFromSignup}`),
        // Password:
        { password: PasswordFromSignup } = useSignupData(),
        [password, setPassword] = useState<string>(`${PasswordFromSignup}`);

    // Pass the form data to the global state
    const
        handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setValue('email', e.target.value);
        },
        handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setValue('password', e.target.value);
        };


    const
        // Update the user Logged-in state
        { setIsLoggedin } = useUserState();

    const

        // Show Loading Spinner while Submit
        [loading, setLoading] = useState<boolean>(false);


    // Handle data submit
    async function handleDataSubmit(data: FormDataTypes) {

        setLoading(true)

        try {
            const results = await login({ email: data.email, password: data.password });

            // Check on Errors store if there's a match to the Error occurred, 
            // if there's any, error type must be send to checkOnAuthError and return with its error description
            const isTheresError = errorsStore.includes(results)
            if (isTheresError) {
                const errorType = errorsStore.find(errorType => errorType === results)
                toast.error(`${checkOnAuthErrors(errorType).errordescription}`)
                setLoading(false)
            } else if (!isTheresError && results) {

                setIsLoggedin(true);
                setLoading(false)

            } else {
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
            console.error('An error occurred while Handling data submit (Signup form): ', error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleDataSubmit)}>
                <div className="mt-6">


                    {/* Email */}
                    <div>
                        <p className="text-gray-500 text-sm mb-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold text-black text-[15px]">Email Address</Label>
                                <p className="text-gray-500 text-sm">
                                    Please provide your email address you want to login with.
                                </p>
                                <Input
                                    className={`lowercase ${email ? 'text-black' : ''}`}
                                    id="email"
                                    type="email"
                                    placeholder="glori@example.com"
                                    value={email ? email : ''}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                        </p>
                    </div>

                    {/* Password + "I forget it" Link */}
                    <div>
                        <p className="text-gray-500 text-sm">

                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold text-black text-[15px]">Password</Label>
                                <div className="flex justify-between w-full">
                                    <p className="text-gray-500 text-sm w-4/5">
                                        Please enter your 8 characters or more password.
                                    </p>
                                    <a href="/reset" className="text-blue-900 hover:underline text-sm w-1/1">I forget it</a>

                                </div>
                                <Input
                                    className={password ? 'text-black' : ''}
                                    id="password"
                                    type="password"
                                    placeholder="••••••••••"
                                    value={password ? password : ''}
                                    onChange={handlePasswordChange}
                                    required

                                />
                            </div>

                        </p>
                    </div>

                </div>

                {/* Submit Btn */}
                <Button type="submit" className='w-full mt-4' disabled={email.length < 3 || password.length < 8}>
                    {loading ? (<Loading w={24} />) : 'Get in'}
                </Button>

                <div className={`flex items-center text-sm my-4`}>
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <Button variant="outline" className={`mx-auto w-full`}>
                    <FcGoogle className="mr-2" size="20" /> Continue with Google
                </Button>

            </form>
        </>
    )
}