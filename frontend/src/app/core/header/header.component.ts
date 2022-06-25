import { Component, OnInit } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  userId!: string;
  isAuth$!: Observable<boolean>;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {    
    this.isAuth$ = this.auth.isAuth$.pipe(
      shareReplay(1),
      tap(() => this.userId = this.auth.getCredentials().userId)      
    );
  }

  onLogout(){
    this.auth.logout();
  }

  

}
