import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class OverlayService {
	private overlay = new BehaviorSubject(false);
	currentState = this.overlay.asObservable();

	constructor() { }

	changeState(state: boolean) {
		this.overlay.next(state)
	}
}
