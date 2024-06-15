import { useEffect } from "react";
import completeVerify from "@/backend/services/user/completeVerify";

// STATES
import useVerificationAlertState from "@/lib/states/verificationAlert";

// UI
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type CompleteVerifyProps = {
    userId: string;
    secret?: string;
  }

export default function CompleteVerify({ userId, secret }: CompleteVerifyProps ) {

    // Check and update of the Verification Alert 
    const { isOpen, setIsOpen } = useVerificationAlertState();

    // Update the page title
    document.title = `Glori | Complete Verification`;

    // Send data to be verify 
    async function sendData() {
        const res = await completeVerify({userId, secret});
        if (res) {
            return null
        } else {
            console.log("(CompleteVerify.tsx): Oops!, something wen't wrong, Please try the verification process again.")
        }
    }

    useEffect(() => {
        sendData()
    }, [])

    if (isOpen === true) {
        setIsOpen(false)
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-lg md:shadow-lg max-w-md w-full space-y-9 mt-[-60px]">
                    <div className="text-center">
                        <img src="/images/success.gif" alt="Successfully Verified" className="w-[250px] mx-auto" />
                        <h1 className="text-2xl font-bold mt-4">Account Verified</h1>
                        <p className="text-gray-500 mt-2">
                            Congratulations! Your account has been successfully verified.
                        </p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Link to="/">
                            <Button>
                                Explore Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }


}
