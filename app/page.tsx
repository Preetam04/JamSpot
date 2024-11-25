"use client";
import FeatureCard from "@/components/FeatureCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Radio, ThumbsUp, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex h-full items-center flex-col justify-center ">
      <Navbar />
      <section className=" mt-20 h-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background self-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight  sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Create, Join, Stream, & <br />{" "}
                <span className="text-primary">Recommend Music Together</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                JamSpot lets you create virtual rooms, stream your favorite
                songs, and get recommendations from friends in real-time.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                className=""
                onClick={() => {
                  router.push("/auth");
                }}
              >
                Start Listening
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="h-full py-12 md:py-24 lg:py-32 bg-background self-center "
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Create & Join Rooms"
              description="Create your own music room or join existing ones to connect with friends and music lovers."
            />
            <FeatureCard
              icon={<Radio className="h-10 w-10" />}
              title="Stream Music"
              description="As a room creator, stream your favorite songs from popular music platforms."
            />
            <FeatureCard
              icon={<ThumbsUp className="h-10 w-10" />}
              title="Get Recommendations"
              description="Discover new music with real-time recommendations from room participants."
            />
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="mt-6 r text-sm text-gray-500">
            © Developed by{" "}
            <Link
              href="https://github.com/Preetam04"
              className="border-b border-b-gray-500"
            >
              Preetam Patil
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
