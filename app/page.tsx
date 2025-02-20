"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RxMagnifyingGlass } from "react-icons/rx";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useSelector, useDispatch } from "@/redux/store";
import { getResources } from "@/redux/slices/pokemon";
import { useEffect } from "react";

export default function Home() {
  // Initialize useDispatch to dispatch Redux actions
  const dispatch = useDispatch();

  // Select the 'cardDetails' data from the Redux store using useSelector
  const { pokemons, pokemonDetail } = useSelector((state) => state.pokemons);

  // useEffect hook to dispatch 'getResources' action when the component mounts
  useEffect(() => {
    dispatch(getResources());
  }, []);

  return (
    <main>
      <section className="p-4 pt-[25px] mx-auto my-0 w-full sm:w-[550px] md:w-[680px] lg:w-[850px] shadow-md">
        <h1 className="font-[400] text-[30px] text-[#919191]">Pokédex</h1>
      </section>
      <section className="bg-[#313131] p-4 pt-[25px]">
        <div className="mx-auto my-0 w-full sm:w-[550px] md:w-[680px] lg:w-[850px]">
          <h1 className="font-[400] text-[26px] text-white mb-3">
            Search By Name
          </h1>
          <div className="flex items-center gap-4">
            <Input
              className={cn("bg-white")}
              type="text"
              placeholder="Search"
            />
            <Button variant="destructive" size="lg">
              <RxMagnifyingGlass className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-[#616161] border-[#212121] border-[1px] border-solid p-2 relative">
        <div className="mx-auto my-0 w-full sm:w-[550px] md:w-[680px] lg:w-[850px]">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn("bg-transparent text-white font-[600]")}
                >
                  Advance Search
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-full sm:w-[550px] md:w-[680px] lg:w-[850px] lg:grid-cols-4">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </section>
      <section className="p-4 pt-[25px] mx-auto my-0 w-full sm:w-[550px] md:w-[680px] lg:w-[850px] shadow-md">
        <div className="grid gap-6 md:gap-5 lg:gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {pokemons.results.map((res, index) => {
            if (pokemonDetail.length == 0) {
              return false
            }
            return (
              <Card key={index}>
              <CardContent className={cn("p-0 mb-3")}>
                <AspectRatio ratio={4 / 4} className="bg-muted">
                  <Image
                    src={pokemonDetail[index]?.sprites?.other?.dream_world?.front_default || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"}
                    priority
                    sizes="contain"
                    alt="Photo by Drew Beamer"
                    fill
                    className="rounded-md object-contain"
                  />
                </AspectRatio>
              </CardContent>
              <CardFooter>
                <h3 className="text-[#313131] font-[700] capitalize">
                  {res.name}
                </h3>
              </CardFooter>
            </Card>
            )
          }
          )}
        </div>
      </section>
    </main>
  );
}
