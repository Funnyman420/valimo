import { AbstractRule } from "./rules/abstract.rule";
import { CoreRule } from "./rules/core.rule";
import { ValidatorGenerator } from "./validator.generator";
import { IValidationError } from "./errors/validation.error"


export abstract class AbstractValidator<T> {
    public rules: { [property: string]: CoreRule<T>[] } = {};

    constructor() { }

    public ruleFor(propertyNameFunc: (subject: T) => any): ValidatorGenerator<T> {
        const p = new Proxy({} as any, {
            get(target, prop) { return prop }
        });

        const propertyName: string = propertyNameFunc(p);

        return new ValidatorGenerator<T>(this, propertyName);
    }

    public validate(object: T)  {
        const errors: IValidationError[] = []

        for (let propertyName in this.rules) {
            const errorMessagesForRule: string[] = [];

            for (let rule of this.rules[propertyName]) {
                const errorResult = rule.validate(object[propertyName as keyof T], object);

                if (errorResult != null)
                    errorMessagesForRule.push(errorResult);
            }

            if (errorMessagesForRule !== [])
                errors.push({
                    property: propertyName,
                    errors: errorMessagesForRule
                })
        }

        return errors.length > 0 
        ? errors 
        : null;
    }
}