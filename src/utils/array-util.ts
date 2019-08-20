type NotVoid = {} | null | undefined;

type PartialDeep<T> = {
    [P in keyof T]?: PartialDeep<T[P]>;
};

type ValueIteratee<T> = ((value: T) => NotVoid) | string | [string, any] | PartialDeep<T>;

export class ArrayUtil {

    public static max(collection: number[]): number {
        let max = Number.MIN_SAFE_INTEGER;
        for (const element of collection) {
            if (element > max) {
                max = element;
            }
        }
        return max;
    }

    public static min(collection: number[]): number {
        let min = Number.MAX_SAFE_INTEGER;
        for (const element of collection) {
            if (element < min) {
                min = element;
            }
        }
        return min;
    }

    public static maxBy<T>(collection: T[], iteratee?: ValueIteratee<T>): T {
        let result
        if (collection == null) {
            return result
        }
        let computed = Number.MIN_SAFE_INTEGER;
        for (const value of collection) {
            const current = (iteratee as (value) => any)(value);

            if (current != null && (computed === undefined
                ? (current === current && !ArrayUtil.isObjectLike(current))
                : (current > computed)
            )) {
                computed = current
                result = value
            }
        }
        return result
    }

    public static minBy<T>(collection: T[], iteratee?: ValueIteratee<T>): T {
        let result
        if (collection == null) {
            return result
        }
        let computed = Number.MAX_SAFE_INTEGER;
        for (const value of collection) {
            const current = (iteratee as (value) => any)(value);

            if (current != null && (computed === undefined
                ? (current === current && !ArrayUtil.isObjectLike(current))
                : (current < computed)
            )) {
                computed = current
                result = value
            }
        }
        return result
    }

    public static round(n: number, precision?: number): number {
        precision = precision == null ? 0 : Math.min(precision, 292);
        if (precision) {
            // Shift with exponential notation to avoid floating-point issues.
            // See [MDN](https://mdn.io/round#Examples) for more details.
            let pair = `${n}e`.split('e');
            const value = Math.round(+`${pair[0]}e${+pair[1] + precision}`);

            pair = `${value}e`.split('e');
            return +`${pair[0]}e${+pair[1] - precision}`;
        }
        return Math.round(n);
    }

    public static last<T>(array: T[]): T {
        return array[array.length - 1];
    }

    public static extend(target, ...objects: any[]): any {
        if (objects.length === 0) {
            return target;
        }
        for (const source of objects) {
            for (const prop in source) {
                if (!target[prop] && source.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    }

    private static isObjectLike(value) {
        // tslint:disable-next-line:triple-equals
        return value != null && typeof value == 'object';
      }
}