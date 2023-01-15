import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SerialPortService } from './share/services/seriaport.service';
import { UserService } from './share/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'agent';
  user = {};
  ports = []
  constructor(
    private readonly _serialPortService: SerialPortService,
    private readonly _userService: UserService,
    private readonly _detectChanges: ChangeDetectorRef) {}

  ngOnInit(): any {
    this.listPorts();
    this.getUser();
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
