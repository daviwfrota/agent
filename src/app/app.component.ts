import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AutoUpdateService } from './share/services/auto-update.service';
import { SerialPortService } from './share/services/seriaport.service';
import { UserService } from './share/services/user.service';

export interface UserInfo {
  username?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'agent';
  user: UserInfo = {};
  ports = [];

  updateAvaliable = false;
  percentage = 0;
  isFinish = false;

  version = "0.0.1";
  constructor(
    private readonly _serialPortService: SerialPortService,
    private readonly _userService: UserService,
    private readonly _detectChanges: ChangeDetectorRef,
    private readonly _autoUpdate: AutoUpdateService) {

      this._autoUpdate.updateAvaliable.subscribe(res => {
        console.log(res);
        this.updateAvaliable = res;
      });

      this._autoUpdate.updateIsDownloading.subscribe(res => {
        this.percentage = res;
      });

      this._autoUpdate.updateIsFinish.subscribe(res => {
        this.isFinish = res;
      });
  }

  ngOnInit(): any {
    this.listPorts();
    this.getUser();
  }

  cancel() {
    this.updateAvaliable = false;
  }

  update() {
    this._autoUpdate.startUpdate();
  }

  restart() {
    this._autoUpdate.restart();
  }

  getUser() {
    this._userService.get()
      .subscribe(user => {
        this.user = user;
        console.log(user);
        this._detectChanges.detectChanges();
      });
  }

  listPorts() {
    this
      ._serialPortService
      .list()
      .subscribe(ports => {
        this.ports = ports;
        console.log(ports);
      });
  }
}
