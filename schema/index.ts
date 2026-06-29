import z from "zod";

export const AuthValuesSchema = z.object({
    username: z.string().trim(),
    password: z.string().trim(),
    token: z.string().trim(),
}).nullish()
export const HeadersSchema = z.array(z.preprocess((f) => {
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
    key: z.string().trim().min(1, "Minimum 1 length required"),
    value: z.string().trim().min(1, "Minimum 1 length required"),
})))
export const FormDataSchema = z.object({
    name: z.string().trim().min(1, "Minimum 1 length required"),
    value: z.union([z.string().trim().min(1, "Minimum 1 length required"),
    z.file()
    ]),
})

export const RequestSchema = z.object({
    _url: z.url("Give a Valid Url").min(10, "Minimum length of url is 10").max(100, "Maximum length of url is 100"),
    _bodyType: z.enum(["json", "formData", "none"]).default("none"),
    _method: z.enum(["GET", "POST", "DELETE", "PUT", "PATCH"]),
    _json: z.string("Give a Valid Json").min(2, "Minmum length is 2").nullish(),
    _authtype: z.enum(["bearerToken", "basic", "none"]).default("none"),
    _authValues: AuthValuesSchema,
    _customHeaders: HeadersSchema,

})
