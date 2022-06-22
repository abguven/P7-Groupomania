import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "avatarAlt"
}) 
export class AvatarAltPipe implements PipeTransform{
    transform(user: { user_name:string, last_name:string, avatar_url:string }):string {
        return `Photo de profil de ${user.user_name} ${user.last_name}`;        
    }
}