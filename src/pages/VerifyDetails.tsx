import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// UI
import { CompleteVerify, Verify } from "@/components";
// import { LoadingScreen } from '@/components/ui/loading';

// STATES
import useUserState from '@/lib/states/userStates';

export default function VerifyDetails() {

    // Check if the user is Logged-in
    const { isLoggedin } = useUserState();

    // Set Loading spinner
    // const [loading, setLoading] = useState<boolean>(true)

    // Store the UserId & the Secret key to be pushed to CompleteReset.tsx
    const [userId, setUserId] = useState<string | null>(null);
    const [secret, setSecret] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userIdParam = params.get('userId');
        const secretParam = params.get('secret');

        if (userIdParam && secretParam) {
            setUserId(userIdParam);
            setSecret(secretParam);
            // setLoading(false)
        } else {
            // setLoading(false)
            null
        }
    }, []);


    if (!isLoggedin) {
        return (
            <Navigate to="/" />
        )
    } else if (isLoggedin && userId && secret) {
        return (
            <div className="md:container container-fluid">
                <CompleteVerify userId={userId} secret={secret} />
            </div>
        )
    } else {
        return (
            <div className="md:container container-fluid">
                <Verify />
            </div>
        )
    }
}