<p align="center">
    <img width="300" height="300" src="./letter-logo.png">
</p>

A validation library inspired by [FluentValidation](https://github.com/FluentValidation/FluentValidation) of C# and [fluentvalidation-ts](https://github.com/AlexJPotter/fluentvalidation-ts) of [@AlexJPotter](https://github.com/AlexJPotter)

# So what's different?

A lot of validation libraries out there, don't use the lambda functions to capture the property of the object that they're about to validate and pass it as strings.  
  
That to me is really bad productivity wise, because the (glorious) Typescript Compiler doesn't give you a hint, when for some reason you change the name of the function.  
  
Also, many of the libraries I've seen, do really complex stuff, that to my experience, I never had to use. The goal of this library was to make it lightweight, fast and easy to use.

# How do I use it?
Simple! It works like any other validation library. For example: 
```typescript
interface Person {
    name: string,
    age: number
};

class PersonValidator extends AbstractValidator<Person> {
    constructor() {
        super();

        this.ruleFor(x => x.name)
            .isNotEmpty() // Checks if the name is not empty
            .withMessage("NAMES! NAMES! GIVE ME NAMES") // A (little too dramatic) custom message
            .hasMinLengthOf(4); // Or you can opt out and use the default ones instead
    }
}
```

Now we have set up the custom validator for our object. So, all we have to do is to validate it.

```typescript
const person = <Person> {
    name: "Connor Kenway",
    age: 34
};

const personValidator = new PersonValidator();
const result = personValidator.validate(person);
```

The result is of type 
```typescript
interface IValidationResult {
    success: boolean,
    errors?: IValidationErrors[]
}
```

So in order to check the errors you'll have to do
```typescript
    const validationResult = personValidator.validate(person);

    if (!validationResult.success) {
        console.log(validationResult.errors);
    }
```
And it will look like this
```typescript
[
    {
        property: "The property of the given object",
        error: "Custom Message Here!"
    }
]
```

# Cool Features!
This library supports custom rules!  
```typescript
class PersonValidator extends AbstractValidator<Person> {
    constructor() {
        super();

        this.ruleFor(x => x.age)
            .customRule(45, (value, person) => {
                if (person.age > 1000)
                    return false;
                
                return true
            })
            .withMessage("You're too old for this");
    }
}
```
This would easily be done with some of the other rules, but it was a demonstration that you can write your own function for validation if you want and you can also add a custom message on top of it like any other rule!

# Future plans?
My plan for the future is to integrate my validators to be traslated to that of express-validator, so you can use a "type-safe" way to validate your objects,
without again relying on strings! Star it so you can find out!

## Special Thanks
To [Evangelina Nika](https://www.linkedin.com/in/evangelina-nika-b4aa141ba/) that designed the logo!
