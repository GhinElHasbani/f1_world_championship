import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { LanguageHelper } from './lang.helper';
// import { BoolEquivalentString } from '../constants';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';

export class FrameworkHelper extends LanguageHelper {

    static clearFormConfig(formConfig: any) {
        const formConfigIsDefined = this.isDefined(formConfig);
        if (formConfigIsDefined) {
            Object.keys(formConfig).forEach(prop => {
                const obj = formConfig[prop];
                this.clearFormConfigObjectProperty(obj);
            });
        }
        return formConfig;
    }

    static clearFormConfigObjectProperty(obj: any) {
        const objIsDefined = this.isDefined(obj);
        if (objIsDefined) {
            if (obj instanceof FormControl) {
                // (obj as FormControl).reset();
            }
        }
    }


    static getBody<BodyModel>(response: HttpResponse<BodyModel>): BodyModel {
        return this.getPropValueIfObjIsDefined(response, 'body');
    }

    static getHeaders(response: HttpResponse<any>): HttpHeaders {
        return this.getPropValueIfObjIsDefined(response, 'headers');
    }

    static getFromBody(response: HttpResponse<any>, prop: string) {
        return this.getPropValueIfObjIsDefined(this.getBody(response), prop);
    }

    static getFromHeader(response: HttpResponse<any>, prop: string) {
        return this.getHeaders(response).get(prop);
    }

    static getParamFromRouteParents(route: ActivatedRouteSnapshot, paramName: string): any {
        let result = null;
        while (!this.isDefined(result = route.params[paramName]) && this.isDefined(route.parent)) {
            result = route.parent;
        }
        return result;
    }

    static getParamFromRouteChildren(route: ActivatedRouteSnapshot, paramName: string): any {
        let result = null;
        while (!this.isDefined(result = route.params[paramName]) && this.isDefined(route.firstChild)) {
            result = route.firstChild;
        }
        return result;
    }

    static exportToFile(data: any, fileName: string, fileType?: string) {
        let text = atob(data.body);
        let file = new Blob([text], { type: (fileType || 'text/csv') });
        var fileURL = URL.createObjectURL(file);
        //Uglier hack to download the file as CSV. Stupid JS.
        let a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    static unsubscribe(subscription: Subscription) {
        if (this.isDefined(subscription)) {
            subscription.unsubscribe();
        }
    }

    static unsubscribeAll(subscriptions: Subscription[]) {
        if (this.isDefined(subscriptions)) {
            subscriptions.forEach(
                subscription => this.unsubscribe(subscription)
            );
        }
    }

    static getFromHeaderAndParse(response: HttpResponse<any>, dotSeperatedProps: string) {
        let value;
        const headers = this.getHeaders(response);
        if (this.isObjAndPropDefined(headers, dotSeperatedProps)) {
            const props = dotSeperatedProps.split('.');
            const header = this.parse(this.getFromHeader(response, props.shift()));
            value = props.reduce((prev, currProp) => {
                return this.isPropPartOfThisObj(prev, currProp) ? prev[currProp] : undefined;
            }, header);
        }
        return value;
    }
}
