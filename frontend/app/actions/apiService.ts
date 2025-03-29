import { getAccessToken } from "./serverActions";


const apiService = {
    get: async function (url:string) : Promise<any> {
        console.log('get', url)

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(respose => respose.json())
            .then(json => {
                console.log('Respose', json)

                resolve(json)
            })

            .catch(error => {
                reject(error)
            })
        }) 
    },


    post: async function (url:string, data:any) : Promise<any> {
        console.log('post: ', url, data)

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(respose => respose.json())
            .then(json => {
                console.log('Respose', json)

                resolve(json)
            })

            .catch(error => {
                reject(error)
            })
        }) 
    },


    postWithoutToken: async function (url:string, data:any) : Promise<any> {
        console.log('post: ', url, data)

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'Application/json',
                }
            })
            .then(respose => respose.json())
            .then(json => {
                console.log('Respose', json)

                resolve(json)
            })

            .catch(error => {
                reject(error)
            })
        }) 
    },


    put: async function (url:string, data:any) : Promise<any> {
        console.log('post: ', url, data)

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}${url}`, {
                method: 'PUT',
                body: data,
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(respose => respose.json())
            .then(json => {
                console.log('Respose', json)

                resolve(json)
            })

            .catch(error => {
                reject(error)
            })
        }) 
    },


    patch: async function (url:string, data:any) : Promise<any> {
        console.log('post: ', url, data)

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}${url}`, {
                method: 'PATCH',
                body: data,
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(respose => respose.json())
            .then(json => {
                console.log('Respose', json)

                resolve(json)
            })

            .catch(error => {
                reject(error)
            })
        }) 
    },


    delete: async function (url:string, data:any) : Promise<any> {
        console.log('post: ', url, data)

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}${url}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(respose => respose.json())
            .then(json => {
                console.log('Respose', json)

                resolve(json)
            })

            .catch(error => {
                reject(error)
            })
        }) 
    },

}


export default apiService;