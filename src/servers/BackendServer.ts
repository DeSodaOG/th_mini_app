import axios from "axios";

export interface UserInfo {
    id: string,
    tghandle: string,
    referrerid: string,
    parentreferrerid: string,
    affiliateamount: number,
    subaffiliateamount: number,
    createdat: string,
    updateat: string,
    score: number,
}

export class BackendServer { 
    baseURL: string;
    constructor() {
        this.baseURL = 'https://th-backend-api.vercel.app';
    }

    async getAllUsers() {
        try {
            const chatResult = await axios.get(this.baseURL + '/users');
            return chatResult.data.responseObject;
        } catch (error) {
            return []
        }        
    }

    async getUserInfo(id: string): Promise<UserInfo> {
        try {
            const chatResult = await axios.get(this.baseURL + '/users/' + id);
            return chatResult.data.responseObject;
        } catch (error) {
            return {
                id: '',
                tghandle: '',
                referrerid: '',
                parentreferrerid: '',
                createdat: '',
                updateat: '',
                affiliateamount: 0,
                subaffiliateamount: 0,
                score: 0,
            };
        }
    }

    async getUserAffiliatesInfo(id: string): Promise<UserInfo[]> {
        try {
            const chatResult = await axios.get(this.baseURL + '/users/getAffiliates/' + id);
            return chatResult.data.responseObject;
        } catch (error) {
            return [];
        }
        
    }

    async createNewUser(id: string, tgHandle: string, referrerID: string) {
        try {
            console.log('createNewUser: ', id, tgHandle, referrerID)
            const result = await axios.post(this.baseURL + '/users/create', {
                id,
                tgHandle,
                referrerID,
            });
            console.log(result);
            return true;
        } catch (error: any) {
            console.log(error);
            return false;
        }
    }
}