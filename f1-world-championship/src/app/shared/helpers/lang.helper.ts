import { FormGroup } from '@angular/forms';
import { PropVal } from '../models/frontend/prop-val.model';


export class LanguageHelper {
    /** Generic Helpers */
    static isDefined(entity: any): boolean {
        return entity !== undefined && entity !== null;
    }
    static isNotDefined(entity: any): boolean {
        return !this.isDefined(entity);
    }

    static isConstructorName(entity: any, constructorName: string): boolean {
        return this.isDefined(entity) &&
            entity.constructor.toString().indexOf(constructorName) > -1;
    }
    static stringify(entity: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        return JSON.stringify(entity, replacer, space);
    }
    static parse(entity: any, reviver?: (key: any, value: any) => any) {
        return JSON.parse(entity, reviver);
    }
    static JSONDeepClone(entity: any) {
        return this.parse(this.stringify(entity));
    }
    static deepClone(obj: any) {
        if (obj == null || typeof (obj) !== 'object' || obj instanceof FormGroup) {
            return obj;
        }

        const temp = new obj.constructor();

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = this.deepClone(obj[key]);
            }
        }

        return temp;
    }
    static objectAssign(entities: any[], targetEntity = {}): any {
        return Object.assign(targetEntity, ...entities);
    }
    static sortAsc(entities: any[]) {
        const isArray = this.isArray(entities);
        let sortedArray = [];
        if (isArray) {
            sortedArray = entities.sort(this.ascSortingFn);
        }
        return sortedArray;
    }
    static sortDesc(entities: any[]) {
        const isArray = this.isArray(entities);
        let sortedArray = [];
        if (isArray) {
            sortedArray = entities.sort(this.descSortingFn);
        }
        return sortedArray;
    }
    static descSortingFn(a: any, b: any) {
        if (a > b) {
            return 0;
        } else if (a === b) {
            return 0;
        } else {
            return 1;
        }
    }
    static ascSortingFn(a: any, b: any) {
        if (a > b) {
            return 1;
        } else if (a === b) {
            return 0;
        } else {
            return 0;
        }
    }
    static scrollTo(options?: ScrollToOptions) {
        window.scrollTo(options);
    }


    /** Object Helpers */
    /**
     * We remove properties from source object that are not included in target object
     * We add properties that are in target object but not in source object (keeping their original value)
     * @param source is the object that will be converted to the target object
     * @param target is the object that we are converting to
     */
    static convertFromSourceToTarget(source: PropVal, target: PropVal) {
        const sourceClone = this.JSONDeepClone(source);
        const targetClone = this.JSONDeepClone(target);
        const isSourceDefined = this.isDefined(sourceClone);
        const isTargetDefined = this.isDefined(targetClone);
        if (isSourceDefined && isTargetDefined) {
            this.loopOverProps(
                sourceClone,
                (prop: any) => {
                    const propExistInTarget = this.isPropPartOfThisObj(targetClone, prop);
                    if (!propExistInTarget) {
                        delete sourceClone[prop];
                    }
                }
            );
            this.loopOverProps(
                targetClone,
                (prop: any) => {
                    targetClone[prop] = this.isArray(targetClone[prop]) ?
                        ((<any[]>targetClone[prop]).shift() || null) :
                        targetClone[prop];
                }
            );
        }
        return Object.assign({}, targetClone, sourceClone);
    }
    static objHasProps(obj: PropVal): boolean {
        const isObj = this.isObj(obj);
        return isObj ? this.getObjNbrOfKeys(obj) > 0 : false;
    }
    static getObjNbrOfKeys(obj: PropVal): number {
        const isObj = this.isObj(obj);
        return isObj ? Object.keys(obj).length : 0;
    }
    static isPropDefined(obj: PropVal, dotSeperatedProps: string): boolean {
        return this.reduceProps(
            obj,
            dotSeperatedProps,
            (prev: any, currProp: any) => this.isPropPartOfThisObj(prev, currProp)
        );
    }
    static isObjAndPropDefined(obj: PropVal, prop: string) {
        const isObjDefined = this.isDefined(obj) && this.isObj(obj);
        const isPropDefined = this.isDefinedAndNotEmptyOrWhiteSpace(prop);
        return isObjDefined && isPropDefined;
    }
    static getPropValueIfObjIsDefined(obj: any, prop: any) {
        return this.isObjAndPropDefined(obj, prop) ? obj[prop] : undefined;
    }
    static isObj(entity: any): boolean {
        return this.isConstructorName(entity, 'Object') || (!this.isArray(entity) && typeof entity === 'object');
    }
    static createNewObject(): {} {
        return {};
    }
    static getObjProps(obj: PropVal) {
        const isObjDefined = this.isDefined(obj);
        if (isObjDefined) {
            return Object.keys(obj);
        }
        return [];
    }
    static setPropsValue(obj: any, propsVal: PropVal) {
        const isObjDefined = this.isDefined(obj);
        const isPropsValsDefined = this.isDefined(propsVal);
        obj = isObjDefined ? obj : this.createNewObject();
        if (isPropsValsDefined) {
            const props = this.getObjProps(propsVal);
            props.forEach(prop => this.setPropValueIfObjIsDefined(obj, prop, propsVal[prop]));
        }
        return obj;
    }
    static setPropValueIfObjIsDefined(obj: any, prop: string, value: any) {
        if (this.isObjAndPropDefined(obj, prop)) {
            obj[prop] = value;
        }
        return obj;
    }
    static isPropPartOfThisObj(obj: PropVal, prop: string): boolean {
        return this.isObjAndPropDefined(obj, prop) ? prop in obj : false;
    }
    static getPropValue<T = any>(obj: PropVal, dotSeperatedProps: string): T {
        return this.reduceProps(
            obj,
            dotSeperatedProps,
            (cumulativeObject: any, currProp: any) => this.isPropPartOfThisObj(cumulativeObject, currProp) ? cumulativeObject[currProp] : undefined
        );
    }
    static deleteUndefinedProps(obj: PropVal) {
        const isObjDefined = this.isDefined(obj);
        if (isObjDefined) {
            this.loopOverProps(obj, (prop: any) => {
                const isPropValDefined = this.isDefined(obj[prop]);
                if (!isPropValDefined) {
                    delete obj[prop];
                }
            });
        }
        return obj;
    }
    static loopOverProps(obj: PropVal, action: Function) {
        const isObjDefined = this.isDefined(obj);
        if (isObjDefined) {
            const props = this.getObjProps(obj);
            props.forEach(prop => action(prop));
        }
    }
    static reduceProps(obj: PropVal, dotSeperatedProps: string, condition: any, initialValue?: any): any {
        let value;
        if (
            this.isObjAndPropDefined(obj, dotSeperatedProps) &&
            this.isDefined(condition)
        ) {
            const props = dotSeperatedProps.split('.');
            value = props.reduce(
                (prev, currProp) => condition(prev, currProp),
                this.isDefined(initialValue) ? initialValue : obj
            );
        }
        return value;
    }
    static getFirstPropVal(obj: PropVal) {
        const isObjDefined = this.isDefined(obj);
        if (isObjDefined) {
            const props = this.getObjProps(obj);
            return obj[props[0]];
        }
        return obj;
    }


    /** Array Helpers */
    static isArray(entity: any): boolean {
        return this.isConstructorName(entity, 'Array');
    }
    static mapArray(array: any[], action: Function) {
        const isArrayDefined = this.isDefined(array);
        if (isArrayDefined) {
            array = array.map(item => action(item));
        }
        return array;
    }

    static arrayCount(array: any[]) {
        return this.isArray(array) ? array.length : undefined;
    }
    static pushIf(item: any, array: any[], condition?: any) {
        const arrayDefined = this.isArray(array);
        const itemDefined = this.isDefined(item);
        const conditionDefined = this.isDefined(condition);
        if (arrayDefined && itemDefined) {
            if (conditionDefined) {
                if (condition) {
                    array.push(item);
                }
            } else {
                array.push(item);
            }
        }
        return array;
    }


    static sortArrayByProperty(data: any[], prop: string, sortDirection: string, type: string) {
        data.sort((a, b) => {
            switch (type.toLowerCase()) {
                case 'date':
                case 'datetime':
                    return new Date(a[prop]).getTime() - new Date(b[prop]).getTime();

                case 'amount':
                case 'decimal':
                    return a[prop] - b[prop];
                default: return new String(a[prop]).localeCompare(b[prop]);
            }
        });

        if (sortDirection == 'desc') data.reverse();
        return data;
    }

    static arrayToObj(array: string[]) {
        const arrayDefined = this.isDefined(array);
        const arrayIsArray = this.isArray(array);
        const obj = {};
        if (arrayDefined && arrayIsArray) {
            array.forEach(item => obj[item] = undefined);
        }
        return obj;
    }

    /** Number Helpers */
    static isDefinedAndPositive(entity: any): boolean {
        return this.isDefined(entity) && this.isPositive(entity);
    }
    static isPositive(entity: number) {
        return entity > 0;
    }
    static isNumber(entity: any): boolean {
        return this.isConstructorName(entity, 'Number');
    }
    static minNbr(...nbrs: number[]) {
        const ascArray = this.sortAsc(nbrs);
        return ascArray[0];
    }
    static maxNbr(...nbrs: number[]) {
        const descArray = this.sortDesc(nbrs);
        return descArray[0];
    }
    static sliceArray(array: any[], startIndex: number, lastIndex: number) {
        const arrayDefined = this.isDefined(array);
        if (arrayDefined) {
            return array.slice(startIndex, lastIndex);
        }
        return [];
    }


    /** String Helpers */
    static isEmptyString(entity: any): boolean {
        return entity === '';
    }
    static isWhiteSpace(entity: any): boolean {
        return LanguageHelper.isString(entity) && entity.length > 0 && entity.trim().length === 0;
    }
    static isDefinedAndNotEmptyOrWhiteSpace(entity: any): boolean {
        return this.isDefined(entity) && !LanguageHelper.isEmptyString(entity) && !LanguageHelper.isWhiteSpace(entity);
    }
    static isString(entity: any): boolean {
        return this.isConstructorName(entity, 'String');
    }
    static removeFromEndOfString(str: string, nbrOfChars: number) {
        const isStringDefined = this.isDefinedAndNotEmptyOrWhiteSpace(str);
        if (isStringDefined) {
            const nbOfCharsInStr = str.length;
            const allowedNbrOfCharsToBeTruncated = this.minNbr(nbrOfChars, nbOfCharsInStr);
            str = str.slice(0, nbOfCharsInStr - allowedNbrOfCharsToBeTruncated);
        }
        return str;
    }
    static appendStringIfDefined(baseStr: string, strToAppend: string) {
        const isBaseStrString = this.isString(baseStr);
        const isStrToAppendString = this.isString(strToAppend);
        if (isBaseStrString && isStrToAppendString) {
            return `${baseStr}${strToAppend}`;
        }
        return baseStr;
    }

    static toLowerCase(entity: any) {
        const isEntityAString = this.isString(entity);
        return isEntityAString ? entity.toLowerCase() : entity;
    }
    static strLength(str: string) {
        const strDefined = this.isDefined(str) && this.isString(str);
        return strDefined ? str.length : 0;
    }
    static appendCharBefore(str: string, char: string, beforeStr: string) {
        const strDefined = this.isDefined(str) && this.isString(str);
        const charDefined = this.isDefined(char) && this.isString(char);
        const beforeStrDefined = this.isDefined(beforeStr) && this.isString(beforeStr);
        if (strDefined && charDefined && beforeStrDefined) {
            return str.replace(beforeStr, `${char}${beforeStr}`);
        }
        return str;
    }
    static capitalize(...strings: string[]): string[] | any {
        const stringsDefined = this.isDefined(strings);
        if (stringsDefined) {
            return strings.map(str => {
                const strDefined = this.isDefined(str) && this.isString(str) && this.strLength(str) > 0;
                return strDefined ? `${str[0].toUpperCase()}${str.slice(1)}` : str;
            });
        }
    }

    /** Date Helpers */
    static isDate(entity: any): boolean {
        return this.isConstructorName(entity, 'Date') || this.isConstructorName(new Date(entity), 'Date');
    }

    /** Boolean Helpers */
    static isBoolean(entity: any): boolean {
        return this.isConstructorName(entity, 'Boolean');
    }

    static removeTimeFromDate(value: string): string {
        let date = new Date(value);
        value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        return value;
    }

    static removeOffsetFromDate(value: string): string {
        let date = new Date(value);
        value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return value;
    }

    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    static isObject(item: any) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    /**
     * Method to return the value of the property inside in a nested object.
     * @param obj this is the nested object containing the value
     * @param prop this is the list of nested properties to get the value seperated by a comma
     * @returns {boolean}
     */
    static getValuePromNestedObj(obj: any, prop: string): any {
        if (prop?.includes('.')) {
            const props = this.splitOnFirstOccurence(prop, '.');

            let val = this.getPropValueIfObjIsDefined(obj, props[0]);;
            return this.getValuePromNestedObj(val, prop.split('.').slice(1).join('.'));
        }
        else {
            return this.getPropValueIfObjIsDefined(obj, prop);
        }
    }

    static splitOnFirstOccurence(text: string, char: string): string[] {
        return [text.split(char)[0], text.split(char).slice(1).join(char)]
    }

}
