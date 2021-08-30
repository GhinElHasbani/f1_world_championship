import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SectionModel } from '../models/frontend';

@Injectable()
export class SectionService {

    private sectionSelected$ = new Subject<SectionModel>();

    constructor() { }

    sendSection(section: SectionModel) {
        this.sectionSelected$.next(section);
    }

    clearSection() {
        this.sectionSelected$.next();
    }

    getSection(): Observable<SectionModel> {
        return this.sectionSelected$.asObservable();
    }

}