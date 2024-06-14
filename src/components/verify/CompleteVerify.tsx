type CompleteVerifyTypes = {
    userId: string;
    secret: string;
}

export default function CompleteVerify({userId, secret}: CompleteVerifyTypes){

    // Update the page title
    document.title = `Glori | Complete Verification`;

    const uid = userId;
    const sec = secret;

    return (
        <>
        Complete Verify Content: {uid} , {sec}
        </>
    )
}