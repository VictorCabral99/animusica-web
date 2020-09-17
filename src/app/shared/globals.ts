import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class Globals {
    public animeAPI: string = ""
    public visivelMiniPlayer: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false)
}