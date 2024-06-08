type Loading = {
    w: number,
}

export default function Loading({ w }: Loading) {
    return (
        <>
            <img src="/images/loading.gif" width={w} />
        </>
    )
}