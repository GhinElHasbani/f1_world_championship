import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SectionService {

    private sectionSelected$ = new Subject<string>();

    constructor() { }

    sendSection(section: string) {
        this.sectionSelected$.next(section);
    }

    clearSection() {
        this.sectionSelected$.next();
    }

    getSection(): Observable<any> {
        return this.sectionSelected$.asObservable();
    }

}