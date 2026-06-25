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
import { Plus, X } from "lucide-react";
import { ChangeEvent, SubmitEvent, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const defaultformdata: FormDataInputs = {
    id: crypto.randomUUID(),
    name: "",
    value: "",
    tick: true,
    type: "text",
    file: null
}


const defaultheaders: CustomHeader[] = [
    {
        id: crypto.randomUUID(),
        key: "Accept",
        value: "*/*",
        tick: true
    },
]

const defaultAuthValues: AuthValues = {
    username: "",
    password: "",
    token: ""
}


const page = () => {
    const [url, setUrl] = useState<string>("");
    const [res, setRes] = useState<string>("");
    const [bodyType, setBodyType] = useState<BodyType>("json");
    const [json, setJson] = useState<string>('');
    const [customHeaders, setCustomHeaders] = useState<CustomHeader[]>(defaultheaders);
    const [formData, setformData] = useState<FormDataInputs[]>([defaultformdata]);
    const [method, setMethod] = useState<MethodType>("GET");
    const [authtype, setAuthType] = useState<AuthType>("bearerToken")
    const [authValues, setAuthValues] = useState<AuthValues>(defaultAuthValues);

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

    const handleChangeHeader = (id: string, e: ChangeEvent<HTMLInputElement, HTMLInputElement>, name: string) => {
        const newHeaders = customHeaders.map((f) => {
            if (f.id === id) {
                return {
                    ...f,
                    [name]: e.target.value
                } as const
            }
            else return f
        })
        setCustomHeaders(newHeaders)
    }
    const handleChangeValue = (id: string, e: ChangeEvent<HTMLInputElement, HTMLInputElement>, name: string) => {

        const newformdata = formData.map((f) => {
            if (f.id === id) {
                if (name === "name" || f.type === "text")
                    return {
                        ...f,
                        [name]: e.target.value
                    } as const
                return {
                    ...f,
                    file: e.target.files?.[0],
                    [name]: e.target.value
                } as const
            }
            else return f
        })
        setformData(newformdata)
    }
    const handleChangeFileType = (id: string, checked: boolean) => {
        const newformdata = formData.map((f) => {
            if (f.id === id) {
                return {
                    ...f,
                    type: checked ? "file" : "text",
                    value: "",
                    file: null
                } as const
            }
            else return f
        })
        setformData(newformdata)
    }
    const handleChangeTickType = (id: string, checked: boolean) => {
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
    const handleChangeTickTypeHeader = (id: string, checked: boolean) => {
        const newHeaders = customHeaders.map((f) => {
            if (f.id === id) {
                return {
                    ...f,
                    tick: checked
                } as const
            }
            else return f
        })

        setCustomHeaders(newHeaders)
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
                    <TabsContent value="_headers">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customHeaders.map((ch) => (
                                    <TableRow key={ch.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Checkbox onCheckedChange={(c) => handleChangeTickTypeHeader(ch.id, c as boolean)} checked={ch.tick} />
                                                <X onClick={() => setCustomHeaders((prev) => prev.filter((p) => p.id !== ch.id))} size={20} />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Input value={ch.key} onChange={(e) => { handleChangeHeader(ch.id, e, "key") }} placeholder="Enter Key" />
                                        </TableCell>
                                        <TableCell>
                                            <Input value={ch.value} onChange={(e) => { handleChangeHeader(ch.id, e, "value") }} placeholder="Enter Value" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button onClick={() => setCustomHeaders((f) => [...f, {
                            key: "", value: "", tick: true,
                            id: crypto.randomUUID()
                        }])} className="mt-4" variant="outline" size="sm">
                            <Plus /> Add More
                        </Button>
                    </TabsContent>
                    <TabsContent value="_body">
                        <RadioGroup value={bodyType} onValueChange={(value) => { setBodyType(value as BodyType) }} className="w-fit flex my-2">
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
                                        <MyInput disabled={!f.tick} id={`${f.id}-name-formdata`} value={f.name} onChange={(e) => handleChangeValue(f.id, e, "name")} label="Name" />
                                        {f.type === "text" ? <MyInput disabled={!f.tick} id={`${f.id}-value-formdata`} value={f.value} onChange={(e) => handleChangeValue(f.id, e, "value")} className="min-w-60" label="Value" type={"text"} />
                                            :
                                            <>
                                                <label htmlFor={`${f.id}-value-formdata`} className="border-b-gray-400 border pb-1">{f.value}</label>
                                                <MyInput disabled={!f.tick} className={`min-w-60 ${f.value ? "hidden" : ""}`} id={`${f.id}-value-formdata`} onError={() => { }} onChange={(e) => handleChangeValue(f.id, e, "value")} label="Value" type={"file"} />
                                            </>
                                        }
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Switch disabled={!f.tick} onCheckedChange={(flag) => handleChangeFileType(f.id, flag)} className="rounded-3xl" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Switch for {f.type === "file" ? "text" : "file"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                ))}
                                <Button onClick={() => setformData((f) => [...f, {
                                    ...defaultformdata,
                                    id: crypto.randomUUID()
                                }])} className="mt-4" variant="outline" size="sm">
                                    <Plus /> Add More
                                </Button>
                            </>
                            :
                            <Textarea rows={5} value={json} onChange={(val) => setJson(val.target.value)} className="text-xl!" placeholder="Type your message here." />}
                    </TabsContent>
                    <TabsContent value="_auth">

                        <Select value={authtype} onValueChange={(t) => setAuthType(t as AuthType)} >
                            <SelectTrigger className={
                                cn("w-full max-w-48",
                                )
                            }>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup>
                                    <SelectLabel>Auth Types</SelectLabel>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="bearerToken">Bearer Token</SelectItem>
                                    <SelectItem value="basic">Basic Auth</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {authtype === "bearerToken" &&
                            <Textarea rows={5}
                                value={authValues.token}
                                onChange={(e) => setAuthValues((a) => ({ ...a, token: e.target.value }))}
                                placeholder="Enter Token here" />
                        }
                        {authtype === "basic" &&
                            <div className="flex gap-2">
                                <MyInput id={'auth-username'} value={authValues.username} onChange={(e) => setAuthValues((prev) =>
                                    ({ ...prev, username: e.target.value }))} label="Username" />
                                <MyInput id={'auth-password'} value={authValues.password} onChange={(e) => setAuthValues((prev) =>
                                    ({ ...prev, password: e.target.value }))} label="Password" />
                            </div>
                        }
                    </TabsContent>
                    <TabsContent value="_response">Reponse here</TabsContent>
                </Tabs>
            </div>
        </div>);
}


export default page;