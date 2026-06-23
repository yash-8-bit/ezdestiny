export const getColorMethod =(method : MethodType):string =>{
    const colors : Record<string,string> = {
        "GET":"text-[#009966]",
        "POST":"text-[#00998A]",
        "PUT":"text-[#FFDD00]",
        "PATCH":"text-[#FFDD00]",
        "DELETE":"text-[#CC0000]"
    }
    return colors[method];
}
