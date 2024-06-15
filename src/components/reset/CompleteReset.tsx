import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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

// AUTH
import completeResetPassword from '@/backend/services/auth/completeResetPassword';

type FormDataTypes = {
    "password": string,
    "confirmPassword": string,
}

export default function CompleteReset({ userId, secret }: { userId: string, secret: string }) {

    // Update the page title
    document.title = `Glori | Complete Password Reset`;

    // Loading State while handling the submit
    const [loading, setLoading] = useState<boolean>(false),
        [newPassword, setNewPassword] = useState<string>(''),
        // Open the Dialog when form response successful
        [isOpen, setIsOpen] = useState<boolean>(false);

    // form validation
    const schema = yup.object().shape({
        password: yup.string().min(8).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password")]).required()
    })

    // Control the form data flow
    const { setValue, handleSubmit, formState: { errors } } = useForm<FormDataTypes>({
        resolver: yupResolver(schema)
    });

    // handle input changes
    const
        handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewPassword(e.target.value);
            setValue("password", e.target.value);
        },
        handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue("confirmPassword", e.target.value);
        };



    // handle form submit
    async function handleCompleteResetPasswordFormSubmit() {
        setLoading(true)
        const res = await completeResetPassword({ userId, secret, newPassword })
        if (res) {
            setIsOpen(true)
            setLoading(false)
        } else {
            toast.error(
                "<b>Uh oh! Password Reset Link Issue</b>",
                {
                    description: `<p>There seems to be a problem with the password reset link. It might have expired, or there could be a typo. Here's what you can do:</p>
                    <br/>
                   <p><b>Request a new password reset:</b> Click the "Request a new reset link" to receive a fresh reset link in your email.</p> <br />  
                   <p><b>Check your email carefully:</b> Make sure you're copying and pasting the entire reset link from the email without any extra spaces.</p>
                   `,

                    duration: 40000
                }
            );
            setLoading(false)
        }

    }




    return (
        <div className="mx-auto max-w-md space-y-6 h-[500px] mb-52 flex flex-col justify-center">
            <div className="space-y-2 text-center mt-32">
                <h1 className="text-2xl font-bold">Set Your New Password</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your new password below to proceed with the reset process and regain access to your account.
                </p>
            </div>
            <hr />
            <form onSubmit={handleSubmit(handleCompleteResetPasswordFormSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Enter Your New Password</Label>
                    <p className="text-gray-500 text-sm min-w-fit">
                        Please enter your <span className="text-orange-600">8 characters</span> or more password.
                    </p>
                    <Input onChange={handlePasswordChange} id="password" type="password" placeholder="Enter new password" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm The New Password</Label>
                    <p className="text-gray-500 text-sm min-w-fit">
                        Re-enter the same new password to confirm it.
                    </p>
                    <Input onChange={handleConfirmPasswordChange} id="confirmPassword" type="password" placeholder="Confirm new password" required />
                    {/* Handle confirmPassword message Error */}
                    {errors.confirmPassword ? (<p className="text-red-500 text-sm">Passwords do not match. Please re-enter matching passwords.</p>) : null}
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 transition shadow-md">
                    {loading ? (<Loading w={24} />) : 'Update Password'}
                </Button>

                <div className={`flex items-center text-sm`}>
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Request a new password reset btn */}
                <div className="mt-10 min-w-full">
                    <Button className='w-full'>
                    <a href="/reset" className='min-w-full py-2 mx-auto shadow-sm text-sm hover:shadow-md transition'>
                            Request a new reset link
                    </a>
                    </Button>
                </div>
            </form>

            {/* Dialog to show when Successfully form processed */}
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className='w-full'>
                        <AlertDialogTitle className='mx-auto'>Password Updated Successfully! </AlertDialogTitle>
                        <AlertDialogDescription className='text-center'>
                            <div>
                                <img src="/images/success.gif" alt="Password got Updated" />
                            </div>
                            <p>
                                You've successfully changed your password. You can now log in using your new password.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Link to="/" className='w-full'>
                            <AlertDialogAction className='w-full'>Done</AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}