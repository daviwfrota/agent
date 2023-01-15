import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from "src/app/app.component";
const electron = (<any>window).require('electron');

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user = new BehaviorSubject<UserInfo>({});
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