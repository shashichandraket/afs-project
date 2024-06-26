import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
];

const Navbar = () => {
  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex mr-auto">
            <Link to="/" className="ml-2 font-bold text-xl flex">
              Hive
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}>
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">Hive</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}>
                      {label}
                    </a>
                  ))}
                  <a
                    href="https://github.com/Cobol-Tech/Main"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}>
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </a>

                  {!token ? (
                    <Link
                      to="/signup"
                      className={`border ${buttonVariants({
                        variant: "default",
                      })}`}>
                      Sign Up
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/dashboard"
                        className={`border ${buttonVariants({
                          variant: "default",
                        })}`}>
                        Dashboard
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "link",
                })}`}>
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <ModeToggle />
            <a
              href="https://github.com/Cobol-Tech/Main"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}>
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Github
            </a>
            {!token ? (
              <Link
                to="/signup"
                className={`border ${buttonVariants({
                  variant: "default",
                })}`}>
                Sign Up
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`border ${buttonVariants({
                    variant: "default",
                  })}`}>
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
