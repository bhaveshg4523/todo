export const jsonGenerate=(statuscode,message,data=null)=>{
    return {status:statuscode,message:message,data:data};
}