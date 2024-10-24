import { defaultChatID } from "@/utils/constant";
import axios from "axios";

export class TelegramBot {
    baseURL: string;
    token: string;

    constructor() {
        this.baseURL = "https://api.telegram.org/";
        this.token = import.meta.env.VITE_BOT_TOKEN;
    }

    async getPFPURL(chat_id: string): Promise<{title: string, desc: string, pfpURL: string}> {
        let result = {
            title: '',
            desc: '',
            pfpURL: ''
        };
        
        try {
            const chatResult = await axios.get(`${this.baseURL}bot${this.token}/getChat?chat_id=${chat_id}`);
            // console.log(chatResult.data.result)
            const file_id = chatResult.data.result.photo.big_file_id
            const pfpFileLink = await axios.get(`${this.baseURL}bot${this.token}/getFile?file_id=${file_id}`);   
            const pfpURL = `https://api.telegram.org/file/bot${this.token}/` + pfpFileLink.data.result.file_path;
            result = {
                title: chatResult.data.result.title,
                desc: chatResult.data.result.description,
                pfpURL: pfpURL
            }
        } catch (error) {
            console.log(error)
        }

        return result;
    }

    async isJoinedGroup(user_id: string) {

        try {
            const result = await axios.get(`${this.baseURL}bot${this.token}/getChatMember?chat_id=${defaultChatID}&user_id=${user_id}`);
            // console.log(chatResult.data.result)
            if (result.data.result.status == "member" || result.data.result.status == "creator") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
}