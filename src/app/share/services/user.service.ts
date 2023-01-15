import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user = new BehaviorSubject<any[]>([]);
    constructor() {
    }

    get() {
        electron.ipcRenderer.send('getUserInfo');
        electron.ipcRenderer.on('receiveUserInfo',(event, userInfo) => {
            this.user.next(userInfo);
        });
        return this.user;
    }

    write(port, text) {
        electron.ipcRenderer.send('write', {port, text});
    }
}