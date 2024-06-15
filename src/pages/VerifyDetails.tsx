import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// STATES
import useUserState from '@/lib/states/userStates';

// UI
import { CompleteVerify, Verify } from "@/components";
import { LoadingScreen } from '@/components/ui/loading';



export default function VerifyDetails() {

    // Check if the user is Logged-in
    const { isLoggedin } = useUserState();

    // Store the UserId & the Secret key to be pushed to CompleteVerify.tsx
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [secret, setSecret] = useState<string | undefined>(undefined);

    // Display the loading screen while fetching
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userIdParam = params.get('userId');
        const secretParam = params.get('secret');

        if (userIdParam && secretParam) {
            setUserId(userIdParam);
            setSecret(secretParam);
            setLoading(false);
        } else {
            setUserId(undefined);
            setSecret(undefined);
            setLoading(false);
        }
    }, []);


    if (!isLoggedin) {
        return (
            <Navigate to="/" />
        )
    } else if (isLoggedin && userId) {
        return (
            <div className="md:container container-fluid">
                <CompleteVerify  userId={userId} secret={secret}/>
            </div>
        )
    } else if (userId == undefined) {
        return (
            <div className={`md:container container-fluid`}>
            {loading && <LoadingScreen />}
                <Verify />
            </div>
        )
    }
}

// else {
//     { loading && (<LoadingScreen />) }
//     if (userId === null) {
//         setLoading(false)
//         return (
//             <div className={`md:container container-fluid`}>
//                 <Verify />
//             </div>
//         )
//     } 