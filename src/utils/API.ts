
export default async function request(endpoint:string){
    const res = await fetch(`https://sandbox.creos.me/api/v1/${endpoint}`);

    return res.ok 
           ? res.json() 
           : res.json().then(err => Promise.reject(err))
} 