import { FormDataSchema, RequestSchema } from "@/schema";
import { NextRequest } from "next/server";

const getFinalAuth = (_authtype: AuthType, _authValues: AuthValues) => {
    switch (_authtype) {
        case "basic":
            return { key: "Authorization", value: `Basic ${Buffer.from(`${_authValues.username}:${_authValues.password}`).toString("base64")}` }
        case "bearerToken":
            return { key: "Authorization", value: `Bearer ${_authValues.token}` }
        default:
            return null;
    }
}



export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const _url = formData.get('_url');
        const _method = formData.get('_method');
        const _bodyType = formData.get('_bodyType');
        const _json = formData.get('_json');
        const _authtype = formData.get('_authtype');
        const _authValues = formData.get('_authValues');
        const _customHeaders = formData.getAll('_customHeaders');

        const safeParsed = RequestSchema.safeParse({
            _url,
            _method,
            _json,
            _bodyType,
            _authtype,
            _authValues,
            _customHeaders,
        })
        if (safeParsed.success) {
            let finalbody: string | FormData = safeParsed.data._bodyType === "json" ? _json as string : "";
            if (safeParsed.data._bodyType === "formData") {
                const fd = new FormData();
                const keys = formData.keys();
                const valueKeys = keys.filter((k) => k.includes("formdataValues<!-->"));

                valueKeys.forEach((v) => {
                    const parsefd = FormDataSchema.safeParse({
                        name: v.split("<!-->")?.[1] || "",
                        value: formData.get(v)
                    })
                    if (parsefd.success)
                        fd.append(parsefd.data.name, parsefd.data.value)
                })
                finalbody = fd;
            }
            const headers = new Headers();
            if (safeParsed.data._bodyType === "json")
                headers.append('Content-Type', 'application/json');
            safeParsed.data._customHeaders.forEach((val) => {
                headers.append(val.key, val.value)
            })
            let finalAuth = getFinalAuth(safeParsed.data._authtype, safeParsed.data._authValues as any);
            if (finalAuth)
                headers.append(finalAuth.key, finalAuth.value);

            let time1 = performance.now();

            const request = new Request(safeParsed.data._url, {
                method: safeParsed.data._method,
                headers,
                body: finalbody ? finalbody : null
            })
            const _res = await fetch(request);
            let time2 = performance.now();
            let data: string = "";
            let totalTime = (time2 - time1) / 1000;
            const ContentType = _res.headers.get("Content-type");
            if (ContentType?.includes("text")) {
                data = await _res.text();
                return Response.json({
                    "data": data,
                    statusCode: _res.status,
                    "Datatype": "text", totalTime
                }, {
                    status: 200
                })
            }
            if (_res.headers.get("Content-type")?.includes("application/json")) {
                data = await _res.json();
                return Response.json({
                    "data": data,
                    statusCode: _res.status,
                    "Datatype": "json", totalTime
                }, {
                    status: 200
                })
            }
            return Response.json({
                "data": "No Response or This Platform Cannot handle",
                statusCode: _res.status,
                "Datatype": "text",
                totalTime
            }, {
                status: 200
            })
        }
        else{
            console.log(safeParsed.error)
        }
    }
    catch (err) {
        return Response.json({
            "data": "Something Wrong in Our Platform",
            statusCode: 500,
            "Datatype": "text",
            totalTime: 0
        })
    }
}