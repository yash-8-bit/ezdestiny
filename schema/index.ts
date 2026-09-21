import z from "zod";

export const AuthValuesSchema = z.preprocess((f) => {
    if (typeof (f) === "string") {
        try {
            return JSON.parse(f);
        }
        catch (err) {
            return f;
        }
    }
    return f;
}, z.object({
    username: z.string().trim(),
    password: z.string().trim(),
    token: z.string().trim(),
}).nullish())
export const KeyValuePairSchema = z.array(z.preprocess((f) => {
    if (typeof (f) === "string") {
        try {
            return JSON.parse(f);
        }
        catch (err) {
            return f;
        }
    }
    return f;
}, z.object({
    key: z.string().trim().min(1, "Minimum key length 1 required"),
    value: z.string().trim().min(1, "Minimum value length 1 required"),
})))
export const FormDataSchema = z.object({
    name: z.string().trim().min(1, "Minimum 1 length required"),
    value: z.union([z.string().trim().min(1, "Minimum 1 length required"),
    z.file()
    ]),
})

export const RequestSchema = z.object({
    _url: z.url("Give a Valid Url").min(10, "Minimum length of url is 10").max(500, "Maximum length of url is 500"),
    _bodyType: z.enum(["json", "formData", "none"]).default("none"),
    _method: z.enum(["GET", "POST", "DELETE", "PUT", "PATCH"]),
    _json: z.string("Give a Valid Json").min(2, "Minmum length is 2").nullish(),
    _authtype: z.enum(["bearerToken", "basic", "none"]).default("none"),
    _authValues: AuthValuesSchema,
    _customHeaders: KeyValuePairSchema,
    _customParams : KeyValuePairSchema

})
