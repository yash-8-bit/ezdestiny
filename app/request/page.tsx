"use client";

import { MyInput } from "@/components/_ui/myinput";
import { getColorMethod } from "@/components/_ui/utils";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FactoryIcon, Plus } from "lucide-react";
import { SubmitEvent, useState } from "react";

const defaultformdata = {
    id: 1,
    name: "",
    value: "",
    tick: true,
    type: "text"
} as const

const page = () => {
    const [url, setUrl] = useState<string>("");
    const [res, setRes] = useState<string>("");
    const [bodyType, setBodyType] = useState<"json" | "formData">("json");
    const [json, setJson] = useState<string>('');
    const [formData, setformData] = useState<{
        id: number;
        name: string;
        tick: boolean;
        value: string | File;
        type: "file" | "text"
    }[]>([defaultformdata]);
    const [method, setMethod] = useState<MethodType>("GET");
    async function handle(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const res = await fetch(url, {
                method: method,

            });
            console.log(res.headers.get("content-type"));
            console.log(JSON.stringify(await res.json()));
        }
        catch (err: any) {
            console.log(err)
        }
    }
    const handleChangeValue = (id: number, value: any) => {
        const newformdata = formData.map((f) => {
            if (f.id === id) {
                return {
                    ...f,
                    value: value
                } as const
            }
            else return f
        })
        setformData(newformdata)
    }
    const handleChangeFileType = (id: number, checked: boolean) => {
        const newformdata = formData.map((f) => {
            if (f.id === id) {
                return {
                    ...f,
                    type: checked ? "file" : "text",
                    value: ""
                } as const
            }
            else return f
        })
        setformData(newformdata)
    }
    const handleChangeTickType = (id: number, checked: boolean) => {
        const newformdata = formData.map((f) => {
            if (f.id === id) {
                return {
                    ...f,
                    tick: checked
                } as const
            }
            else return f
        })
        setformData(newformdata)
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
                    <TabsList >
                        <TabsTrigger value="_headers">Headers</TabsTrigger>
                        <TabsTrigger value="_auth">Auth</TabsTrigger>

                        <TabsTrigger value="_body">Body</TabsTrigger>
                        <TabsTrigger value="_response">Response</TabsTrigger>
                    </TabsList>
                    <TabsContent value="_headers">headers here</TabsContent>
                    <TabsContent value="_body">
                        <RadioGroup value={bodyType} onValueChange={(value) => { setBodyType(value as any) }} className="w-fit flex my-2">
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="json" id="_radiojson" />
                                <Label htmlFor="_radiojson">Json</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="formData" id="_radioformdata" />
                                <Label htmlFor="_radioformdata">Form Data</Label>
                            </div>
                        </RadioGroup>
                        {bodyType === "formData" ?
                            <>
                                {formData.map((f) => (
                                    <div key={f.id} className="flex my-5 gap-2 items-center">
                                        <Checkbox checked={f.tick} onCheckedChange={(val) => handleChangeTickType(f.id, val as any)} />
                                        <MyInput value={f.name} onChange={(e) => handleChangeValue(f.id, e.target.value)} label="Name" />
                                        <MyInput value={f.value as any} onChange={(e) => handleChangeValue(f.id, e.target.value)} className="min-w-60" label="Value" type={f.type} />
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Switch onCheckedChange={(flag) => handleChangeFileType(f.id, flag)} className="rounded-3xl" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Switch for {f.type === "file" ? "text" : "file"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                ))}
                                <Button onClick={() => setformData((f) => [...f, {
                                    ...defaultformdata,
                                    id: f.length + 1
                                }])} className="mt-4" variant="outline" size="sm">
                                    <Plus /> Add More
                                </Button>
                            </>
                            :
                            <Textarea rows={5} value={json} onChange={(val) => setJson(val.target.value)} className="text-xl!" placeholder="Type your message here." />}
                    </TabsContent>
                    <TabsContent value="_auth">Auth here</TabsContent>
                    <TabsContent value="_response">Reponse here</TabsContent>
                </Tabs>
            </div>
        </div>);
}


export default page;