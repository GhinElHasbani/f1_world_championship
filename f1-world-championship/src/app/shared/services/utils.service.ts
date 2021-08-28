// import { Injectable, Injector } from '@angular/core';
// import { HttpClient, HttpResponse } from '@angular/common/http';
// import { HttpBaseClass } from '../bases/http-base.class';
// import { Observable, of } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';

// @Injectable()
// export class UtilsService extends HttpBaseClass {
//     private cachedLookups: LookupsCachingModel[] = [];

//     constructor(httpClient: HttpClient, injector: Injector) {
//         super(httpClient, injector);
//     }

//     /**
//      * Function used to get any lookup from the server
//      */
//     public getLookupsService(lookups: string[], moduleName: string): Observable<HttpResponse<any>> {
//         const cachedData: any = {};
//         const lookupToFetch = [];
//         lookups.forEach(lookup => {
//             const cachedLookup = this.cachedLookups.find(l => l.lookupName === lookup);
//             if (cachedLookup && this.isDataValid(cachedLookup?.insertedTime)) {
//                 cachedData[cachedLookup.lookupName] = cachedLookup.lookupData[cachedLookup.lookupName];
//             } else if (cachedLookup && !this.isDataValid(cachedLookup?.insertedTime)) {
//                 const index = this.cachedLookups.findIndex(l => l.lookupName === cachedLookup.lookupName);
//                 if (index > -1) {
//                     this.cachedLookups.splice(index, 1);
//                     lookupToFetch.push(lookup);
//                 }
//             } else {
//                 lookupToFetch.push(lookup);
//             }
//         });
//         let filteredlookups = lookupToFetch.filter(l => (l != null && l != ''));
//         if (filteredlookups?.length > 0) {
//             return this.get(`lookups/${filteredlookups.join(',')}`, undefined, true, environment.aidCardUrl, false).pipe(tap(data => {
//                 Object.keys(data.body).forEach(k => {
//                     this.cachedLookups.push({lookupName: k, lookupData: {}, insertedTime: new Date()});
//                     this.cachedLookups.find(l => l.lookupName === k).lookupData[k] = data.body[k];
//                 });
//                 Object.keys(cachedData).forEach(k => {
//                     data.body[k] = cachedData[k];
//                 });
//                 return data.body;
//             }));
//         } else {
//             return of(new HttpResponse({ status: 200, body: cachedData }));
//         }
//     }

//     private isDataValid(addedDate: Date): boolean {
//         const now = new Date();
//         return now.getTime() - addedDate.getTime() < 6 * 60 * 60 * 1000;
//     }

//     public clearAllCachedLookups(){
//         this.cachedLookups = [];
//     }
// }

// interface LookupsCachingModel {
//     lookupName: string;
//     lookupData: any;
//     insertedTime: Date;
// }
