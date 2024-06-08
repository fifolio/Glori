// UI
import { Button } from "@/components/ui/button"

// AUTH
import Signup from "./Signup";
import Login from "./Login";

// STATES
import useJoinFormType from "@/lib/states/joinFormType";
import useErrorAlert from "@/lib/states/errorAlert";
import useSignupData from "@/lib/states/signupData";

export default function Auth() {

    // Reset the Signup form data State when user click on {Signup Now!}
    const { setEmail, setPassword, setUsername } = useSignupData()


    const
        // Set and Show forms:
        { formType, setFormType } = useJoinFormType(),
        // turn On/Off the Successful alert after signup:
        { showSignupAlert, setShowSignupAlert } = useErrorAlert();


    // Handle Login btn
    function login() {
        setFormType('login')
        setShowSignupAlert(false)
    }

    // Handle Signup btn
    function signup() {
        setFormType('signup')
        if (showSignupAlert || !showSignupAlert) {
            setShowSignupAlert(false)
        }

        // Reset the email, username, password
        setEmail('')
        setPassword('')
        setUsername('')
    }



    return (
        <div className="flex-col w-full">
            {/* Title + Sub-title */}
            <header className="mx-auto max-w-md space-y-3 border-b-[1px] pb-1">
                <div className="space-y-2 text-center">
                    <h1 className={`text-lg transition font-bold mb-3`}>
                        Welcome to Glori
                    </h1>
                </div>
            </header>

            {formType == 'signup' ? (
                <Signup />
            ) : (
                <Login />
            )}

            {/* Login / Signup */}
            <div className={`text-center space-y-2 mt-4 ${formType == 'signup' ? 'hidden' : ''}`}>

                {formType == 'signup' ? (
                    <p className="text-sm">
                        Already have an account?
                        <Button variant="link" onClick={login}>Login now!</Button></p>
                ) : (
                    <p className="text-sm">
                        Don't have an account?
                        <Button variant="link" onClick={signup}>Sign Up Now!</Button></p>
                )}

            </div>

        </div>
    )
}