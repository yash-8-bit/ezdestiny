
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
        const _url = formData.get('_url') as string;
        const _method = formData.get('_method') as MethodType;
        const _bodyType = formData.get('_bodyType') as BodyType;
        const _json = formData.get('_json') as string;
        const _authtype = formData.get('_authtype') as AuthType;
        const _authValues = JSON.parse(formData.get('_authValues') as string) as AuthValues;
        const _customHeaders = formData.getAll('_customHeaders');
        const headers = new Headers();
        if (_bodyType === "json")
            headers.append('Content-Type', 'application/json');
        _customHeaders.forEach((val) => {
            let parsedValue = JSON.parse(val as string) as CustomHeader;
            if (parsedValue.tick)
                headers.append(parsedValue.key, parsedValue.value)
        })
        let finalbody: string | FormData = _bodyType === "json" ? _json : "";
        let finalAuth = getFinalAuth(_authtype, _authValues);
        if (finalAuth)
            headers.append(finalAuth.key, finalAuth.value);
        if (finalbody === "" && _bodyType === "formData") {
            const fd = new FormData();
            const keys = formData.keys();
            const valueKeys = keys.filter((k) => k.includes("formdataValues<!-->"));
            valueKeys.forEach((v) => {
                fd.append(v.split("<!-->")?.[1], formData.get(v)!)
            })
            finalbody = fd;
        }
        let time1 = performance.now();
        const request = new Request(_url, {
            method: _method,
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
            "data": "No Response",
            statusCode: _res.status,
            "Datatype": "text",
            totalTime
        }, {
            status: 200
        })
    }
    catch (err) {
        console.log(err)
        return Response.json({
            "data": "error",
            statusCode: 500,
            "Datatype": "text",
            totalTime: 0
        })
    }
}