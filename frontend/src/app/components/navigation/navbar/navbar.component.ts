import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DialogService} from "../../../services/view-services/dialog.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/http/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public dialogService: DialogService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  toUserPage() {
    this.router.navigateByUrl(`/people/${this.userService.getAuthUserId()}`);
  }

  exit() {
    this.userService.exit();
    this.router.navigateByUrl(`/home`);
  }
}
