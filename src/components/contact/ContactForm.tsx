import { useState } from 'react'
import { Link } from 'react-router-dom'

// UI
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Loading from '../ui/loading'
import { toast } from 'sonner'

// ICONS
import { GoInbox } from "react-icons/go";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { LuSend } from 'react-icons/lu'

// SERVICES
import { connectSupport } from '@/backend/services/contactUs/contactSupport'

export default function ContactForm() {

    // Update the page title
    document.title = `Glori | Contact Us`;

    const
        // Collect form data
        [username, setUsername] = useState<string>(''),
        [email, setEmail] = useState<string>(''),
        [subject, setSubject] = useState<string>(''),
        [message, setMessage] = useState<string>(''),
        [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // form inputs validation
        if (username == '') {
            toast.error('You must enter your name to continue')
            return;
        } else if (email == '') {
            toast.error('You must enter your email to continue')
            return;
        } else if (subject == '') {
            toast.error('You must enter your subject to continue')
            return;
        } else if (message == '') {
            toast.error('You must enter your message to continue')
            return;
        } else {


            setLoadingSubmit(true)
            await connectSupport({ username, email, subject, message })
                .then((res) => {
                    if (res == true) {
                        toast.success("Your message sent to Glori's Customer Support Team successfully")
                        setUsername('')
                        setEmail('')
                        setSubject('')
                        setMessage('')
                        setLoadingSubmit(false)
                    } else {
                        toast.error('Error occur while submitting your message, please reload the page and try again')
                        setLoadingSubmit(false)
                    }
                })
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
            <div className="grid gap-12 md:gap-16">

                {/* Get in Touch */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-[700px]">
                        Have a question, comment, or concern about our products or services? We're here to help. Feel free to reach
                        out to our team and we'll get back to you as soon as possible.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Contact Information</h2>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <GoInbox className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <span>contact@glori.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdOutlinePhoneInTalk className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <span>+2830 133 4367</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <FiMapPin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <span>
                                    123 Perfume Lane,
                                    <br />
                                    Fragrance City, SC 12345
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Contact Form</h2>

                        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input onChange={(e) => setUsername(e.target.value)} value={username} id="name" placeholder="Enter your name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input onChange={(e) => setEmail(e.target.value)} value={email} id="email" type="email" placeholder="Enter your email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input onChange={(e) => setSubject(e.target.value)} value={subject} id="subject" placeholder="Enter a subject" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea onChange={(e) => setMessage(e.target.value)} value={message} id="message" placeholder="Enter your message" className="min-h-[150px]" />
                            </div>
                            <Button disabled={loadingSubmit} type="submit">
                                {loadingSubmit ? <Loading w={24} /> : (<span className="flex items-center"><p className='mr-2'>Send message</p> <LuSend size={16}/></span>)}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Customer Support + Follow Us */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Customer Support</h2>
                        <div className="space-y-2">
                            <p>Our customer support team is available Monday through Friday, 9am to 5pm EST.</p>
                            <p>
                                We strive to respond to all inquiries within 1 business day. For urgent matters, please call our support
                                line.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Follow Us</h2>
                        <div className="flex items-center gap-4">
                            <Link
                                to="https://www.linkedin.com/in/fifolio/" target='_blank'
                                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <FaLinkedinIn className="h-6 w-6" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link
                                to="https://github.com/fifolio/Glori" target='_blank'
                                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <FaGithubSquare className="h-6 w-6" />
                                <span className="sr-only">Github</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}