type MethodType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
type BodyType = "json" | "formData"
type AuthType = "bearerToken" | "basic" | "none"

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