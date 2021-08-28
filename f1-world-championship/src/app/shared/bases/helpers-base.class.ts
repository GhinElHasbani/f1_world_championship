import { HttpResponse } from '@angular/common/http';
import { Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { FrameworkHelper, LanguageHelper } from '../helpers';
import { PropVal } from '../models/frontend';

@Directive()
export class HelpersBaseClass {
    languageHelper = LanguageHelper;
    frameworkHelper = FrameworkHelper;

    clearFormConfig(formConfig: any) {
        return this.frameworkHelper.clearFormConfig(formConfig);
    }

    getBody<BodyModel>(res: HttpResponse<BodyModel>) {
        return this.frameworkHelper.getBody<BodyModel>(res);
    }

    getPropValue<T = any>(obj: PropVal, dotSeparatedProps: string): T {
        return this.languageHelper.getPropValue(obj, dotSeparatedProps);
    }

    setPropsValue(obj: PropVal, propsVal: PropVal) {
        return this.languageHelper.setPropsValue(obj, propsVal);
    }

    isDefined(entity: any) {
        return this.languageHelper.isDefined(entity);
    }

    isNotDefined(entity: any) {
        return this.languageHelper.isNotDefined(entity);
    }

    isDefinedAndPositive(entity: any) {
        return this.languageHelper.isDefinedAndPositive(entity);
    }

    isDefinedAndNotEmptyOrWhiteSpace(entity: any) {
        return this.languageHelper.isDefinedAndNotEmptyOrWhiteSpace(entity);
    }

    arrayCount(array: any[]) {
        return this.languageHelper.arrayCount(array);
    }

    scrollTop() {
        this.languageHelper.scrollTo({ top: 0 });
    }

    unsubscribeAll(subscriptions: Subscription[]) {
        this.frameworkHelper.unsubscribeAll(subscriptions);
    }

    formatDate(date: Date)
    {
        if(!date) return null;
        date = new Date(date);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }
}
