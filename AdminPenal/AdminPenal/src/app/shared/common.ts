import { UserInfo } from '../models/userInfo';

export class Common {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0,  v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    static parseJwt(token): UserInfo {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
}
