"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [newSpaceName, setNewSpaceName] = useState<string>("");
  const [newSpaceId, setNewSpaceId] = useState<string>("");
  const [joinSpaceId, setJoinSpaceId] = useState<string>("");
  const router = useRouter();

  async function createRoom() {
    if (!newSpaceName) return;
    try {
      const res = await axios.post("/api/space", {
        spaceName: newSpaceName,
      });
      console.log(res.data.space.id);
      setNewSpaceId(res.data.space.id);
      console.log(newSpaceName);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full px-8 ">
      {/* create Space */}
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <div className="w-96">
          <Tabs defaultValue="create" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="join">Join</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a space</CardTitle>
                  <CardDescription>
                    Create a space to start the Jam.
                  </CardDescription>
                </CardHeader>
                {newSpaceId && (
                  <>
                    <CardContent className=" text-sm font-bold">
                      &ldquo;{newSpaceId}&ldquo;
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(newSpaceId);
                        }}
                      >
                        Copy Code
                      </Button>
                    </CardFooter>
                  </>
                )}
                {!newSpaceId && (
                  <>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="create">Space Name</Label>
                        <Input
                          id="create"
                          placeholder="Enter the space name"
                          onChange={(e) => {
                            setNewSpaceName(e.target.value);
                          }}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={createRoom}>Create Space</Button>
                    </CardFooter>{" "}
                  </>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="join">
              <Card>
                <CardHeader>
                  <CardTitle>Join a space</CardTitle>
                  <CardDescription>
                    Join a space to start the Jam.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="create">Space Id</Label>
                    <Input
                      id="create"
                      placeholder="Enter the space Id"
                      onChange={(e) => {
                        setJoinSpaceId(e.target.value);
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      if (!joinSpaceId) return;

                      console.log("asdasd");

                      router.push(`/space/${joinSpaceId}`);
                    }}
                  >
                    Join Space
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;
