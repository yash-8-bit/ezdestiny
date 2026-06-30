type MethodType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
type BodyType = "json" | "formData" | "none"
type AuthType = "bearerToken" | "basic" | "none"
type TabsType = "_headers" | "_auth" | "_body" | "_response"


interface FormDataInputs {
    id: string;
    name: string;
    tick: boolean;
    value: string;
    file: File | null | undefined;
    type: "file" | "text"
}
interface CustomHeader {
    id: string;
    tick: boolean;
    key: string,
    value: string
}
interface AuthValues {
    token: string;
    username: string;
    password: string
}
interface CustomResponseType {
    data: any;
    headersData?:{
        [key : string]:string;
    };
    type?: "data" | "information" | "error";
    Datatype?: "json" | "text";
    subtype?: string;
    statusCode?: number;
    totalTime?: number;
}