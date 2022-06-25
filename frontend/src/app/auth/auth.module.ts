import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../core/interceptors/auth.interceptor";
import { CookieService } from "ngx-cookie-service";

@NgModule({
    declarations:[
        LoginComponent
    ],
    imports:[
        CommonModule,
        SharedModule
    ],
    exports:[
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        CookieService
    ]
})
export class AuthModule {}