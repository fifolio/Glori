import { useState } from 'react'

// UI
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// ICONS
import { FcGoogle } from "react-icons/fc";

export default function Auth() {

    // check on the steps state
    const [steps, setSteps] = useState<number>(25),
        // Catch the email / password / username from input
        [email, setEmail] = useState<string>(''),
        [password, setPassword] = useState<string>(''),
        [username, setUsername] = useState<string>(''),
        // Track the state wether if user is registered or Not
        [isUserRegistered] = useState<boolean>(false)

    // Store custom context for form labels
    const formContext = {
        default: {
            email: 'Please provide your email address you want to login or create an account with.'
        },
        registered: {
            password: 'Please enter your password.',
        },
        unregistered: {
            username: 'Pick a unique username that represents your identity on our platform, which also will be visible to other users.',
            password: "Choose a strong password with at least 8 characters, including letters, numbers, and special symbols to ensure your account's security.",
        }
    }




    return (
        <div className="flex-col w-full">
            {/* Title + Sub-title */}
            <header className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className={`${steps > 25 ? 'text-lg' : 'text-2xl'} transition font-bold mb-3`}>Welcome to Glori</h1>

                    {/* Progress Bar */}
                    <Progress value={steps} className="h-0.5 mb-8" />
                </div>
            </header>

            <div className="mt-6">
                {/* === STEP 1 (Welcome) === */}
                <div className={`${steps == 25 ? 'block' : 'hidden'}`}>
                    <p className="text-gray-500 text-sm">
                        We’ve designed a smart and seamless way to help you identify whether you’re already registered or need to create a new account. Simply follow the next steps to log in or sign up automatically, and embark on your unique fragrance journey with us.
                    </p>
                </div>

                {/* === STEP 2 (Email) === */}
                <div className={`${steps == 50 ? 'block' : 'hidden'}`}>
                    <p className="text-gray-500 text-sm">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold text-black text-[15px]">Email Address</Label>
                            <p className="text-gray-500 text-sm">{formContext.default.email}</p>
                            <Input
                                id="email"
                                type="email"
                                placeholder="glori@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </p>
                </div>

                {/* === STEP 3 (Password) || (Username + Password) === */}
                <div className={`${steps == 75 ? 'block' : 'hidden'}`}>
                    <p className="text-gray-500 text-sm">

                        {isUserRegistered ? (

                            // Password + "I forget it" Link
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold text-black text-[15px]">Password</Label>
                                <div className="flex justify-between w-full">
                                    <p className="text-gray-500 text-sm min-w-fit">
                                        {formContext.registered.password}

                                    </p>
                                    <a href="/reset" className="text-blue-900 hover:underline text-sm">I forget it</a>

                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        ) : (

                            // Username + Password
                            <div className="space-y-2">

                                {/* Username */}
                                <Label htmlFor="email" className="font-bold text-black text-[15px]">Username</Label>
                                <p className="text-gray-500 text-sm">
                                    {formContext.unregistered.username}
                                </p>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Your name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />

                                <br />

                                {/* Password */}
                                <Label htmlFor="email" className="font-bold text-black text-[15px]">Password</Label>
                                <p className="text-gray-500 text-sm">
                                    {formContext.unregistered.password}
                                </p>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </p>
                </div>

                {/* === STEP 4 (Join in) === */}
                <div className={`${steps == 100 ? 'block' : 'hidden'}`}>
                    <p className="text-gray-500 text-sm">
                        Join complete
                    </p>
                </div>
            </div>


            <Button disabled={steps > 75 ? true : false} className={`${steps > 80 ? 'hidden' : ''} mt-5 w-full`} onClick={() => setSteps(steps + 25)}>
                {
                    steps == 25 ? (<p>Let's get started</p>) : '' || steps >= 75 ? (isUserRegistered ? 'Login' : 'Sign up Now') : (<p>Next</p>)
                }
            </Button>

            <div className={`${steps  > 25 ? 'hidden' : ''} flex items-center text-sm my-4`}>
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <Button variant="outline" className={`mx-auto w-full ${steps  > 25 ? 'hidden' : ''}`}>
            <FcGoogle className="mr-2" size="20" /> Continue with Google
            </Button>
        </div>
    )
}