import { Features, Hero, TopSelling } from "@/components";

export default function Home() {
  return (
    <div className="md:container container-fluid">
      <Hero />
      <Features />
      <TopSelling />
    </div>
  )
}
