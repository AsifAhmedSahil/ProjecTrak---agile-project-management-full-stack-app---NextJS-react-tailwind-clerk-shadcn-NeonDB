import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";
import UseLoading from "./use-loader";

const Header = async() => {
  await checkUser()
  return (
    <header>
      <nav className="py-6 px-8 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={200}
            height={56}
            alt="logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        <div className="flex gap-4 items-center">
          <Link href={"/project/create"}>
            <Button variant="destructive" className="flex gap-2 items-center">
              <PenBox size={18} />
              <span>Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/onboarding">
                <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu/>
          </SignedIn>
        </div>
      </nav>

      <UseLoading/>
    </header>
  );
};

export default Header;
