import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* hero section */}
      <section className="container mx-auto text-center py-20">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold pb-6 flex flex-col gradient-title">
          Transform Your Workflow <br />
          <span>with ProjecTrak</span>
        </h1>
        <p>Empower your team with our intuitive project management solution.</p>

        <Link href={"/onboarding"}>
          <Button size="lg" className="mr-4">
            Get Started <ChevronRight size={18} className="ml-1" />
          </Button>
        </Link>
        <Link href={"#features"}>
          <Button size="lg" variant="outline" className="mr-4">
            Learn More
          </Button>
        </Link>
      </section>
    </div>
  );
}
