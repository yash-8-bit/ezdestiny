"use client";

import { getColorMethod } from "@/components/_ui/utils";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { SubmitEvent, useState } from "react";

const page = () => {
    const [url, setUrl] = useState<string>("");
    const [res, setRes] = useState<string>("");
    const [method, setMethod] = useState<MethodType>("GET");
    async function handle(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const res = await fetch(url, {
                method: method
            });
            console.log(res.headers.get("content-type"));
            console.log(JSON.stringify(await res.json()));
        }
        catch (err: any) {
            console.log(err)
        }
    }
    return (
        <div className="mt-10">
            <form onSubmit={handle}>
                <Field>
                    <ButtonGroup>
                        <Select value={method} onValueChange={(t) => setMethod(t as MethodType)} >
                            <SelectTrigger className={
                                cn("w-full max-w-48", getColorMethod(method),
                                    "font-bold text-base"
                                )
                            }>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Methods</SelectLabel>
                                    <SelectItem value="GET">GET</SelectItem>
                                    <SelectItem value="POST">POST</SelectItem>
                                    <SelectItem value="PATCH">PATCH</SelectItem>
                                    <SelectItem value="PUT">PUT</SelectItem>
                                    <SelectItem value="DELETE">DELETE</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input value={url} onChange={(e) => setUrl(e.target.value.trim())} id="input-button-group" placeholder="Enter or paste the url" />
                        <Button disabled={!url} variant="default">Search</Button>
                    </ButtonGroup>
                </Field>
            </form>
            <div className="p-2">
                <Tabs defaultValue="_headers" >
                    <TabsList>
                        <TabsTrigger value="_headers">Headers</TabsTrigger>
                        <TabsTrigger value="_response">Response</TabsTrigger>
                    </TabsList>
                    <TabsContent value="_headers">headers here</TabsContent>
                    <TabsContent value="_response">Reponse here</TabsContent>
                </Tabs>
            </div>
        </div>);
}


export default page;