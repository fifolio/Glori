import { useEffect, useState } from "react";
import verify from "@/backend/services/user/verify";
import { FiSend } from "react-icons/fi";

// STATES
import { getUserMetaData } from "@/backend/services/user/getUser";

// UI
import { Button } from "../ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table"
import Loading from '../ui/loading'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'

export default function Verify() {

    // Update the page title
    document.title = `Glori | Verification Process`;


    // Loading State while handling the sending
    const [loading, setLoading] = useState<boolean>(false),
        // Open the Dialog when form response successful
        [isOpen, setIsOpen] = useState<boolean>(false),
        // Store the email from UserMetaData
        [email, setEmail] = useState<string>(''),
        // Control the disability of the Send btn
        [disableBtnAfterSend, setDisableBtnAfterSend] = useState<boolean>(false),
        // Set Timer after send
        [timeLeft, setTimeLeft] = useState(0);


    // Get the user email to display on the Dialog
    async function getUserEmail() {
        const data = await getUserMetaData();
        if (data) {
            setEmail(data.email)
        }
    }
    useEffect(() => {
        getUserEmail()
    }, []);



    // Handle SendVerificationLink
    async function sendVerificationLink() {
        setLoading(true)
        const res = await verify();
        if (res) {
            setIsOpen(true)
            setLoading(false)
            setDisableBtnAfterSend(true)
            setTimeLeft(60)
        } else {
            toast.error(`Oops!, There was an error sending the link. Please reload and try again. If it still doesn't work, <a href="/contact" class="text-blue-800">Contact Us</a> and we'll get you sorted.`)
            setLoading(false)
        }
    }

    // Set a countdown timer to run after Send 
    useEffect(() => {
        if (timeLeft > 0) {
            setDisableBtnAfterSend(true)
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setDisableBtnAfterSend(false)
        }
    }, [timeLeft]);





    return (
        <div className="mx-auto max-w-2xl space-y-6 py-12 md:py-24">

            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Verification Process</h1>
                <p className="text-gray-500 dark:text-gray-400">Follow these simple steps to verify your account:</p>
            </div>


            <div className="space-y-8 text-center">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]">Step</TableHead>
                            <TableHead>Instructions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50 dark:text-gray-900">
                                    1
                                </span>
                            </TableCell>
                            <TableCell className="text-start">
                                <div>
                                    <p>Click the 'Send a verification email' button below.</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This will trigger a verification email to be sent to your registered email address.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-start">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50 dark:text-gray-900">
                                    2
                                </span>
                            </TableCell>
                            <TableCell className="text-start">
                                <div>
                                    <p>You will receive a verification link in your email.</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Check your inbox for the email and click on the verification link.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-start">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50 dark:text-gray-900">
                                    3
                                </span>
                            </TableCell>
                            <TableCell className="text-start">
                                <div>
                                    <p>Click on the link you received.</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        The verification link will take you to the verification page.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white dark:bg-gray-50 dark:text-gray-900">
                                    4
                                </span>
                            </TableCell>
                            <TableCell className="text-start">
                                <div>
                                    <p>
                                        The link will automatically direct you to the verification page where your account will be verified.
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Once you reach the verification page, your account will be successfully verified.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button className="w-56" onClick={sendVerificationLink} disabled={disableBtnAfterSend}>
                    {loading ? (
                        <Loading w={24} />
                    ) : disableBtnAfterSend ? (
                        <div className="flex items-center space-x-1">
                            <span>Resend in</span>
                            <span>{timeLeft}</span>
                            <span>seconds</span>
                        </div>
                    ) : (
                        <span className="flex items-center space-x-2">
                            <p>Send Verification Email</p>
                            <FiSend />
                        </span>
                    )}
                </Button>
            </div>

            {/* ALERT: Verification Sent */}
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className='w-full'>
                        <AlertDialogTitle className='mx-auto'>Verification Link Sent</AlertDialogTitle>
                        <AlertDialogDescription className='text-center'>
                            <div>
                                <img src="/images/verifying.gif" alt="verifying" className="w-[300px] mx-auto" />
                            </div>
                            <p className="text-gray-800">
                                A verification email is on its way to <span className="text-black font-semibold">{email}</span>. Click the link to complete your verification.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='flex flex-row items-end space-x-3'>
                        <AlertDialogAction className="min-w-full" onClick={() => setIsOpen(false)}>I understand</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}