import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
const electron = (<any>window).require('electron');

@Injectable({
    providedIn: 'root'
})
export class AutoUpdateService {
    updateAvaliable = new BehaviorSubject<boolean>(false);
    updateIsDownloading = new BehaviorSubject<number>(0);
    updateIsFinish = new BehaviorSubject<boolean>(true);
    constructor() {
        electron.ipcRenderer.on('update-avaliable', () => {
            this.updateAvaliable.next(true);
        });

        electron.ipcRenderer.on('download-progress', (_, percentage) => {
            this.updateIsDownloading.next(percentage);
        });

        electron.ipcRenderer.on('update-downloaded', () => {
            this.updateIsFinish.next(true);
        });
    }

    startUpdate() {
        electron.ipcRenderer.send('get-release');
    }

    restart() {
        electron.ipcRenderer.send('restart-app');
    }
}