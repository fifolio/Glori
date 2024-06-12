import { useEffect, useState } from 'react';
import { Reset, CompleteReset } from "@/components";

// UI
import { LoadingScreen } from '@/components/ui/loading';

export default function ResetDetails() {

    // Set Loading spinner
    const [loading, setLoading] = useState<boolean>(true)

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
            setLoading(false)
        } else {
        setLoading(false)
        }
    }, []);


    return (
        <div className="md:container container-fluid">
            {loading ? (
                <LoadingScreen />
            ) :
                (userId && secret ? (
                    <CompleteReset userId={userId} secret={secret} />
                ) : (
                    <Reset />
                ))
            }
        </div>
    )
}