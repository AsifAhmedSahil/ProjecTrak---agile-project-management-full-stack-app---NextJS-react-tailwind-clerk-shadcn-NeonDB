import CompanyCarousel from "@/components/company-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, ChevronRight, Layout } from "lucide-react";
import Link from "next/link";
import faqs from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Streamline your project flow with our visually engaging Kanban boards, designed to enhance team collaboration and productivity.",
    icon: Layout,
  },
  {
    title: "Effective Sprint Planning",
    description:
      "Plan and execute sprints with ease, keeping your team aligned and focused on delivering impactful results, on time.",
    icon: Calendar,
  },
  {
    title: "Advanced Reporting & Analytics",
    description:
      "Unlock powerful insights into your team's performance with in-depth, customizable reports that drive informed decision-making.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* hero section */}
      <section className="container mx-auto text-center py-40">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold pb-6 flex flex-col gradient-title ">
          Transform Your Workflow <br />
          <span>with ProjecTrak</span>
        </h1>
        <p className="text-xl font-semibold max-w-3xl mx-auto mb-10 text-gray-300 ">
          Empower your team with our intuitive project management solution.
        </p>

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

      {/* ---------------------------------------- */}

      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                  <h4 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* ---------------------------------------- */}

      <section className=" py-20 ">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Trusted by Industry Leaders
          </h3>
          <CompanyCarousel />
        </div>
      </section>
      {/* ---------------------------------------- */}

      <section className=" bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible>
            {
              faqs.map((faq,index) =>(
                <AccordionItem key={index} value={`item-${index}`} className="w-full">
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
                
              </AccordionContent>
            </AccordionItem>
              ))
            }
          </Accordion>
        </div>
      </section>
    </div>
  );
}
