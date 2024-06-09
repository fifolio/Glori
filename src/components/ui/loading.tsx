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

export function LoadingScreen(){
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <img src="/images/loading.gif" className="w-10" />
        </div>
    )
}