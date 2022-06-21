import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "timeAgo"
}) export class TimeAgoPipe implements PipeTransform{
    timeDiffs = {
        minute: 60 * 1000,
        hour: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        year: 365 * 24 * 60 * 60 * 1000,
    }
    transform(value: string | Date): any {
        const now = Date.now();
        const then = new Date(value).getTime();
        const diff = now - then;
        if (diff < this.timeDiffs.minute){
            return "Il y a quelques secondes";
        }else if (diff < this.timeDiffs.hour){
            return "Il y a quelques minutes";
        }else if (diff < this.timeDiffs.day){
            return "Il y a quelques heures";
        }else if (diff < this.timeDiffs.week){
            return "Il y a quelques jours";
        }else if (diff < this.timeDiffs.month){
            return "Il y a quelques semaines";
        }else if (diff < this.timeDiffs.year){
            return "Il y a quelques mois"
        }else {
            return "Il y a plus d'un an";
        }
    }
}