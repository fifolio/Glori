import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { handleShipmentInformation, handleCreditCardInformation, getShoppingDetails } from '@/backend/services/user/shoppingDetails';
import useUserId from '@/lib/states/userId';

// UI
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from '../ui/label';
import Loading, { LoadingScreen } from '../ui/loading';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// Define an interface for the shopping details
interface ShoppingDetails {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
}


export default function ShoppingDetails() {





    // Get the current user id from the public state
    const { loggedinUserId } = useUserId(),
        [userID, setUserID] = useState<string>(''),
        [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setUserID(loggedinUserId)
    }, [loggedinUserId])


    const [loadingShipment, setLoadingShipment] = useState<boolean>(false),
        [loadingCreditCard, setLoadingCreditCard] = useState<boolean>(false);


    // Get the Logged-in user meta data
    const [userShoppingDetails, setUserShoppingDetails] = useState<Models.Document>();


    // Store Shipment Information values
    const [streetAddress, setStreetAddress] = useState<string>(''),
        [city, setCity] = useState<string>(''),
        [state, setState] = useState<string>(''),
        [zipCode, setZipCode] = useState<string>('');

    // Store Credit Card Information values
    const [cardNumber, setCardNumber] = useState<string>(''),
        [expiryMonth, setExpiryMonth] = useState<string>(''),
        [expiryYear, setExpiryYear] = useState<string>(''),
        [cvc, setCvc] = useState<string>('');


    async function handleShipmentInformationForm(e: React.FormEvent) {
        e.preventDefault();
        setLoadingShipment(true)
        await handleShipmentInformation({ userID, streetAddress, city, state, zipCode })
            .then(() => {
                toast.success("Shipment information updated successfully!");
                setLoadingShipment(false)
            })
            .catch(() => {
                toast.error("Failed to submit shipment information. Please try again.");
                setLoadingShipment(false)
            })
    }


    async function handleCreditCardInformationForm(e: React.FormEvent) {
        e.preventDefault();
        setLoadingCreditCard(true)
        await handleCreditCardInformation({ userID, cardNumber, expiryMonth, expiryYear, cvc })
            .then(() => {
                toast.success("Credit Card information updated successfully!");
                setLoadingCreditCard(false)
            })
            .catch(() => {
                toast.error("Failed to submit Credit Card information. Please try again.");
                setLoadingCreditCard(false)
            })
    }




    
    
    // Get current logged-in user Shopping Data
    useEffect(() => {
        if (userID) {
            if (userID.length >= 5) {
                async function getUserShoppingDetailsFunc() {
                    const res = await getShoppingDetails(userID);
                    if (res) {
                        setUserShoppingDetails(res as Models.Document)
                        setLoading(false)
                    } else {
                        setUserShoppingDetails(undefined)
                        setLoading(false)
                    }
                }
                getUserShoppingDetailsFunc();
            }
        }
    }, [userID]);

    // Update the default inputs value
    useEffect(() => {
        setStreetAddress(userShoppingDetails?.streetAddress);
        setCity(userShoppingDetails?.city);
        setState(userShoppingDetails?.state);
        setZipCode(userShoppingDetails?.zipCode);
        setCardNumber(userShoppingDetails?.cardNumber);
        setExpiryMonth(userShoppingDetails?.expiryMonth);
        setExpiryYear(userShoppingDetails?.expiryYear);
        setCvc(userShoppingDetails?.cvc);
    }, [userShoppingDetails])

    if (loading) {
        return <LoadingScreen />
    } else {
        return (
            <>
                {/* Shopping Details Settings */}
                <div className="space-y-8 bg-gray-100 rounded-lg p-3 mb-14" >
                    <h1 className="text-2xl font-bold mb-10 mt-5">Shopping Details</h1>

                    {/* Shipment Information */}
                    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-2">Shipment Information</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Update the address for your shipments.</p>
                        <form className="grid gap-4" onSubmit={handleShipmentInformationForm}>
                            <Input required placeholder="Street Address" onChange={(e) => setStreetAddress(e.target.value)} value={streetAddress} />
                            <div className="flex flex-col sm:flex-row justify-between sm:space-x-3 space-y-4 sm:space-y-0">
                                <div className="w-full space-y-4">
                                    <Input required placeholder="City" onChange={(e) => setCity(e.target.value)} value={city} />
                                    <Input required placeholder="State" onChange={(e) => setState(e.target.value)} value={state} />
                                </div>
                                <div className="w-full space-y-4">
                                    <Input required placeholder="Zip Code" onChange={(e) => setZipCode(e.target.value)} value={zipCode} />
                                    <Button className="w-full">
                                        {loadingShipment ? (<Loading w={24} />) : 'Update Shipment Address'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Credit Card Information */}
                    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-2">Credit Card Information</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Update your credit card details.</p>
                        <form onSubmit={handleCreditCardInformationForm} className="grid gap-4">

                            <Label htmlFor='cardNumber'>Credit Card Number</Label>
                            <Input required name='cardNumber' type='number' placeholder="4111-1120-1426-7661" maxLength={16} minLength={16} onChange={(e) => setCardNumber(e.target.value)} value={cardNumber} />

                            <div className='flex flex-row w-full space-x-3'>
                                <div className='flex flex-col w-full'>
                                    <Label htmlFor='expiryDate' className='mb-4'>Expiry Date</Label>

                                    <div className="flex flex-row space-x-3">
                                        <Select onValueChange={(e) => setExpiryMonth(e)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={expiryMonth} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                                <SelectItem value="6">6</SelectItem>
                                                <SelectItem value="7">7</SelectItem>
                                                <SelectItem value="8">8</SelectItem>
                                                <SelectItem value="9">9</SelectItem>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="11">11</SelectItem>
                                                <SelectItem value="12">12</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Select onValueChange={(e) => setExpiryYear(e)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={expiryYear} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2024">2024</SelectItem>
                                                <SelectItem value="2025">2025</SelectItem>
                                                <SelectItem value="2026">2026</SelectItem>
                                                <SelectItem value="2027">2027</SelectItem>
                                                <SelectItem value="2028">2028</SelectItem>
                                                <SelectItem value="2029">2029</SelectItem>
                                                <SelectItem value="2030">2030</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>

                                <div className='flex flex-col w-full'>
                                    <Label htmlFor='cvc' className='mb-4'>CVC / CVV</Label>
                                    <Input required name='cvc' type='number' placeholder="012" onChange={(e) => setCvc(e.target.value)} value={cvc} />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                {loadingCreditCard ? (<Loading w={24} />) : 'Update Credit Card'}
                            </Button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}