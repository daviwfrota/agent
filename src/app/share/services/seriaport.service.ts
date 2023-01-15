import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');

@Injectable({
    providedIn: 'root'
})
export class SerialPortService {
    ports = new BehaviorSubject<any[]>([]);

    list() {
        electron.ipcRenderer.send('getSerialPort');
        electron.ipcRenderer.on('receiveSerialPort',(event, serialPorts) => {
            this.ports.next(serialPorts);
        });
        return this.ports;
    }

    write(port, text) {
        electron.ipcRenderer.send('write', {port, text});
    }
}