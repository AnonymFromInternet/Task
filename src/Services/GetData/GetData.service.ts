import { ResponseInterface } from '../../Types/Response.interface'
import { MockData } from './MockData/MockData.ts'

const getData = (): Promise<ResponseInterface> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({items: MockData.items})
        }, 1500)
    })
}

const apiService = {
    getData,
}

export default apiService