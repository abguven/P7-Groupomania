import { Component, OnInit } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  isAuth$!: Observable<boolean>;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isAuth$ = this.auth.isAuth$.pipe(
      shareReplay(1)
    );
  }

  onLogout(){
    this.auth.logout();
  }

}
