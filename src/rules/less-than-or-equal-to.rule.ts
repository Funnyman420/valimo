import { NumberError } from "../errors/number.error";
import { AbstractRule } from "./abstract.rule";

export class LessThanOrEqualToRule<TModel, TValue>
    extends AbstractRule<TModel, TValue> {
    constructor(threshold: number) {
        super((value: TValue) => {
            if (value == null)
                return null;

            if (typeof value !== 'number')
                throw new NumberError(typeof this);

            return value <= threshold
                ? null
                : `Value must be less than or equal to ${threshold.toLocaleString()}`;
        })
    }
}