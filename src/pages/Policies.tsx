import { Cookies, Header, Privacy, Terms } from "@/components";
import { Separator } from "@/components/ui/separator";

export default function Policies() {
    return (
        <div className="md:container container-fluid w-full max-w-2xl mx-auto py-12 md:py-16 px-4 md:px-6">
            <Header />
            <Separator />
            <Privacy />
            <Separator />
            <Cookies />
            <Separator />
            <Terms />
        </div>
    )
}