import axios from "axios";
import { ethers, Wallet } from 'ethers';

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
    wallet: Wallet;

    constructor() {
        this.baseURL = 'https://th-backend-api.vercel.app';
        this.wallet = new ethers.Wallet(import.meta.env.VITE_PRIVATE);
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
            const message = id + tgHandle + referrerID;
            const sig = await this.wallet.signMessage(message);
            const result = await axios.post(this.baseURL + '/users/create', {
                id,
                tgHandle,
                referrerID,
                sig
            });
            console.log(result);
            return true;
        } catch (error: any) {
            console.log(error);
            return false;
        }
    }

    async clickNewUser(id: string, referrerID: string) {
        try {
            console.log('clickNewUser: ', id, referrerID)
            const result = await axios.post(this.baseURL + '/users/newClick', {
                id,
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