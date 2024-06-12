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
import resetPassword from '@/backend/services/auth/resetPassword'

type FormDataTypes = {
    "email": string
}

export default function Reset() {



    // Update the page title
    document.title = `Glori | Password Reset`;

    // Loading State while handling the submit
    const [loading, setLoading] = useState<boolean>(false),
        // Open the Dialog when form response successful
        [isOpen, setIsOpen] = useState<boolean>(false);

    // Store input email value
    const [email, setEmail] = useState<string>('');

    // form validation
    const schema = yup.object().shape({
        email: yup.string().email().required(),
    })

    // Control the form data flow
    const { setValue, handleSubmit, formState: { errors } } = useForm<FormDataTypes>({
        resolver: yupResolver(schema)
    });

    // handle input change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setValue("email", e.target.value);
    };

    // handle Reset Password form function
    async function handleResetPasswordSubmit() {
        setLoading(true)
        const res = await resetPassword(`${email}`);
        if (res) {
            setIsOpen(true)
            setLoading(false)
        } else {
            toast.error("Oops!, We couldn't find an account associated with that email address.")
            setLoading(false)
        }

    }

    return (
        <div className="mx-auto max-w-md space-y-6 h-[500px] mb-24 flex flex-col justify-center">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Password Reset</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your email address below and we'll send you a link to reset your password.
                </p>
            </div>
            <form onSubmit={handleSubmit(handleResetPasswordSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" required onChange={handleEmailChange} />
                    {/* Handle email message Error */}
                    {errors.email?.message}
                </div>
                <Button type="submit" className="w-full">
                    {loading ? (<Loading w={24} />) : 'Send Password Reset Link'}
                </Button>
            </form>

            {/* Dialog to show when Successfully form processed */}
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className='w-full'>
                        <AlertDialogTitle className='mx-auto'>Password Reset Initiated</AlertDialogTitle>
                        <AlertDialogDescription className='text-center'>
                            <div>
                                <img src="/images/resetLinkSent.gif" alt="Reset Link Sent" />
                            </div>
                            <p>
                                We've sent a password reset email to <span className="font-bold">{email}</span>. Please check your inbox (including spam folders) and follow the instructions to create a new password.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Link to="/" className='w-full'>
                            <AlertDialogAction className='w-full'>Go Back Home</AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}