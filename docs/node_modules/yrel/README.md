![](https://github.com/romelperez/yrel/raw/main/yrel.jpg)

# Yrel

[![version](https://img.shields.io/npm/v/yrel)](https://npmjs.org/package/yrel)
[![tests](https://github.com/romelperez/yrel/workflows/tests/badge.svg)](https://github.com/romelperez/yrel/actions)
[![codefactor](https://www.codefactor.io/repository/github/romelperez/yrel/badge)](https://www.codefactor.io/repository/github/romelperez/yrel)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/yrel.svg)](https://bundlephobia.com/package/yrel)
[![downloads](https://img.shields.io/npm/dm/yrel.svg)](https://npmjs.org/package/yrel)
[![github stars](https://img.shields.io/github/stars/romelperez/yrel.svg?style=social&label=stars)](https://github.com/romelperez/yrel)
[![license](https://img.shields.io/github/license/romelperez/yrel.svg)](https://github.com/romelperez/yrel/blob/main/LICENSE)

~2.7kB JavaScript JSON schema validation with TypeScript type inference.

## Install

For any ESM and CommonJS JavaScript environment. If TypeScript is used, version 4.5+ is required.

```bash
npm i yrel
```

For UMD version:

```ts
import { y, validateYrel } from 'yrel/build/umd/yrel.umd.cjs'
```

```html
<script src="https://cdn.jsdelivr.net/npm/yrel/build/umd/yrel.umd.cjs" />
```

```html
<script src="https://unpkg.com/yrel/build/umd/yrel.umd.cjs" />
```

## Basic Usage

```ts
import { y, validateYrel } from 'yrel'

const schema = y.object({
  name: y.string().min(2),
  age: y.number().gte(18)
})

const data = {
  name: 'yrel',
  age: 21
}

const validation = validateYrel(schema, data)

console.log(validation.isValid) // true
console.log(validation.data) // { name: 'yrel', age: 21 }
console.log(validation.issues) // []
```

## Type Inference

```ts
import { y, type InferYrel } from 'yrel'

const schema = y.object({
  name: y.string().min(2).max(100),
  age: y.number().gte(18).lte(150).optional(),
  pets: y.array(y.string()).min(2).max(10)
})

type Schema = InferYrel<typeof schema>
/*
{
  name: string;
  age?: number | undefined;
  pets: string[]
}
*/

const data = {
  name: 'yrel',
  age: 21,
  pets: ['dog', 'cat']
} satisfies Schema
```

## Optional and Nullable

All schemas can be optional and/or nullable.

```ts
const schema = y.string().optional()
type Schema = InferYrel<typeof schema> // string | undefined
```

```ts
const schema = y.number().nullable()
type Schema = InferYrel<typeof schema> // number | null
```

```ts
const schema = y.object({
  name: y.string().optional(),
  age: y.number().nullable(),
  is_married: y.boolean().optional().nullable()
})
type Schema = InferYrel<typeof schema>
/*
{
  name?: string | undefined
  age: number | null
  is_married?: boolean | undefined | null
}
*/
```

The methods should be called at the end of schema definition.

## Preprocessors

All schemas can be pre-processed before validation. After checking a value is
not optional nor nullable, a schema can be pre-processed to change its data type
or anything required.

```ts
const schema = y.string().preprocess(data => String(data))
validateYrel(schema, 100) // { isValid: true, data: '100' }
```

## Defaults

All schemas can have a default value if the received data is `undefined`.

```ts
const schema = y.string().defaultsTo('cat')
validateYrel(schema, undefined) // { isValid: true, data: 'cat' }
validateYrel(schema, 'dog') // { isValid: true, data: 'dog' }
```

It can not be used with optional schemas since it will mark it as valid and
ignore the default value.

## Coercers

After checking a value is not optional nor nullable, and running all defined pre-processors,
some schemas can be coerced to their data types.

```ts
const schema = y.string().coerce()
validateYrel(schema, 100) // { isValid: true, data: '100' }
```

_See [API](#api) for more details._

## Transformers

All schemas data can be transformed. When a schema is valid, the schema data can
be transformed to a new value of the same type.

```ts
const schema = y.string().transform(data => data.toLowerCase())
validateYrel(schema, 'ABC') // { isValid: true, data: 'abc' }
```

## Error Handling

Yrel provides a set of validators with predefined error codes for the error report.

```ts
const schema = y.object({
  name: y.string().min(2),
  age: y.number().gte(18)
})

const validation = validateYrel(schema, {
  name: true,
  age: 12
})

console.log(validation.isValid) // false
console.log(validation.data) // undefined
console.log(validation.issues)
/*
[
  {
    "key": "name",
    "errors": [
      ["err_string"]
    ]
  },
  {
    "key": "age",
    "errors": [
      ["err_number_gte", { "gte": 18 }]
    ]
  }
]
*/
```

The report error `key` is a string with the path to the schema which reported
the error joined by dots. For arrays and tuples, the item index is used.

```ts
const schema = y.object({
  users: y.array(
    y.object({
      name: y.string(),
      pets: y.array(y.string())
    })
  )
})
const validation = validateYrel(schema, {
  users: [
    { name: 'a', pets: [] },
    { name: 'b', pets: ['cat', 100, 'dog', true] }
  ]
})

console.log(validation.issues)
/*
[
  {
    "key": "users.1.pets.1",
    "errors": [
      ["err_string"]
    ]
  },
  {
    "key": "users.1.pets.3",
    "errors": [
      ["err_string"]
    ]
  }
]
*/
```

If the error is in the root schema, the key is an empty string.

```ts
const schema = y.string()
const validation = validateYrel(schema, 100)

console.log(validation.issues)
/*
[
  {
    "key": "",
    "errors": [
      ["err_string"]
    ]
  }
]
*/
```

A custom root key can be configured too with `validateYrel(schema, data, { rootKey: 'root' })`.

## Custom Validators

All schemas support the `.validate(data => YrelValidation)` method to add custom
validators. They must return either `true` or a list of errors. Every error is tuple
with the predefined error code and the according parameters if applicable.

Validators libraries such as [validator](https://npmjs.com/package/validator) can
be used for more custom validations.

```ts
import { y, validateYrel, type YrelValidation } from 'yrel'
import isEmail from 'validator/lib/isEmail'

const validateEmail = (value: string): YrelValidation =>
  isEmail(String(value)) || [['err_string_email']]

const schema = y.object({
  name: y.string().min(2),
  age: y.number().gte(18),
  email: y.string().validate(validateEmail)
})

const validation = validateYrel(schema, {
  name: 'yrel',
  age: 18,
  email: 'yrel@example'
})

console.log(validation.isValid) // false
console.log(validation.issues)
/*
[
  {
    "key": "email",
    "errors": [
      ["err_string_email"]
    ]
  }
]
*/
```

Yrel comes with a predefined list of error codes with possible extra parameters for
the error report. The following is a list of them. If the type to the right is `undefined`
it says that it does not require parameters. Otherwise, it defines the parameters types.

- `err_unknown: undefined`
- `err_boolean: undefined`
- `err_boolean_truthy: undefined`
- `err_number: undefined`
- `err_number_gt: [{ gt: number }]`
- `err_number_gte: [{ gte: number }]`
- `err_number_lt: [{ lt: number }]`
- `err_number_lte: [{ lte: number }]`
- `err_number_integer: undefined`
- `err_number_currency: undefined`
- `err_string: undefined`
- `err_string_nonempty: undefined`
- `err_string_trim: undefined`
- `err_string_length: [{ length: number }]`
- `err_string_min: [{ min: number }]`
- `err_string_max: [{ max: number }]`
- `err_string_date_time: undefined`
- `err_string_date: undefined`
- `err_string_time: undefined`
- `err_string_lowercase: undefined`
- `err_string_uppercase: undefined`
- `err_string_capitalcase: [{ lower: boolean }]`
- `err_string_email: undefined`
- `err_string_credit_card: undefined`
- `err_string_url: undefined`
- `err_string_uuid: undefined`
- `err_literal: [{ literal: boolean | number | string }]`
- `err_array: undefined`
- `err_array_nonempty: undefined`
- `err_array_length: [{ length: number }]`
- `err_array_min: [{ min: number }]`
- `err_array_max: [{ max: number }]`
- `err_union: undefined`
- `err_tuple: undefined`
- `err_object: undefined`
- `err_object_unexpected_props: [{ props: string[] }]`
- `err_record: undefined`
- `err_record_keys: [{ keys: string[] }]`

One error with parameters can be the `err_number_gte` which requires the parameter
`gte: number`, so the report may be `['err_number_gte', { gte: 18 }]`.

## Custom Error Reports

Validators can return custom error reports. They need to be expressed as a tuple
`['err_custom', string, object?]`.

```ts
import { y, validateYrel, type YrelValidation } from 'yrel'

// Check that the string has the format "xxx-xxx".
const validateUserId = (value: string): YrelValidation =>
  (/^\w{3,3}-\w{3,3}$/).test(value) || [['err_custom', 'my_custom_error_invalid_user_id']]

const schema = y.object({
  id: y.string().validate(validateUserId),
  name: y.string().min(2),
  age: y.number().gte(18),
  pets: y.array(
    y.union(
      [y.literal('dog'), y.literal('cat'), y.literal('parrot')],
      { errors: [['err_custom', 'my_custom_error_invalid_pet']] }
    )
  )
})

const validation = validateYrel(schema, {
  id: 'abc-d',
  name: 'yrel',
  age: 18,
  pets: ['cat', 'monkey', 'dog', 'fish']
})

console.log(validation.isValid) // false
console.log(validation.issues)
/*
[
  {
    "key": "id",
    "errors": [
      ["err_custom", "my_custom_error_invalid_user_id"]
    ]
  },
  {
    "key": "pets.1",
    "errors": [
      ["err_custom", "my_custom_error_invalid_pet"]
    ]
  },
  {
    "key": "pets.3",
    "errors": [
      ["err_custom", "my_custom_error_invalid_pet"]
    ]
  }
]
*/
```

## Error Translations

Yrel reports the validation issues with only the error codes with their
respective parameters.

A example validation use case can be:

```ts
import { y, validateYrel } from 'yrel'

const schema = y.object({
  name: y.string().min(2).max(10),
  age: y.number().gte(0).lte(100),
  married: y.boolean().optional(),
  sex: y.union(
    [y.literal('female'), y.literal('male')],
    { errors: [['err_custom', 'err_custom_sex']] } // Custom error report.
  ).optional(),
  pets: y.array(y.string().nonempty().max(10)).max(3).nullable()
})

const data = {
  name: 'y',
  age: -1,
  married: 10,
  sex: 'unicorn',
  pets: [true, 'unknown species']
}

const validation = validateYrel(schema, data)
```

Since the data is invalid, the following issues are reported:

```json
[
  {
    "key": "name",
    "errors": [
      ["err_string_min", { "min": 2 }]
    ]
  },
  {
    "key": "age",
    "errors": [
      ["err_number_gte", { "gte": 0 }]
    ]
  },
  {
    "key": "married",
    "errors": [
      ["err_boolean"]
    ]
  },
  {
    "key": "sex",
    "errors": [
      ["err_custom", "err_custom_sex"]
    ]
  },
  {
    "key": "pets.0",
    "errors": [
      ["err_string"]
    ]
  },
  {
    "key": "pets.1",
    "errors": [
      ["err_string_max", { "max": 10 }]
    ]
  }
]
```

If they need to be presented to the end user, a tool like
[Ukti](https://github.com/romelperez/ukti) can be used to translate them.
Then each issue can be mapped to their respective translation:

```ts
import { type YrelErrorTranslations } from 'yrel'
import { createUktiTranslator, type UktiTranslations } from 'ukti'

// For custom error reports.
type ErrorCustomTranslations = {
  err_custom_sex: undefined
}

const translations: UktiTranslations<YrelErrorTranslations & ErrorCustomTranslations> = {
  en: {
    err_boolean: 'This field should be a boolean.',
    err_number: 'A valid number is required.',
    err_number_gt: 'This number should be greater than {{gt}}.',
    err_number_gte: 'This number should be at least {{gte}}.',
    err_number_lt: 'This number should be less than {{lt}}.',
    err_number_lte: 'This number should be at most {{lte}}.',
    err_string: 'This text field is required.',
    err_string_min: 'The field should have at least {{min}} character{{min === 1 ? "" : "s"}}.',
    err_string_max: 'The field should have at most {{max}} character{{max === 1 ? "" : "s"}}.',
    // ...
    err_custom_sex: 'Invalid sex.'
  }
}

const translate = createUktiTranslator<YrelErrorTranslations & ErrorCustomTranslations>({
  locale: 'en',
  translations
})

// Using the previous Yrel schema validation result:
if (!validation.isValid) {
  validation.issues.forEach(issue => {
    issue.errors.forEach(err => {
      // Type-safety is not enforced here but should be enforced when creating
      // the translation definition.
      const errorMessage = err[0] === 'err_custom'
        ? (translate[err[1] as keyof ErrorCustomTranslations] as any)(err[2])
        : (translate[err[0]] as any)(err[1])
      console.log(`${issue.key}:`, errorMessage)
    })
  })
}

// Logs:
// 'name: The field should have at least 2 characters.'
// 'age: This number should be at least 0.'
// 'married: This field should be a boolean.'
// 'sex: Invalid sex.'
// 'pets.0: This text field is required.'
// 'pets.1: The field should have at most 10 characters.'
```

See [Ukti](https://github.com/romelperez/ukti) for more details on translations.

## Custom Schemas

Schemas with custom data types can be created with the general schema `.any<type>()`.

```ts
const schema = y
  .any<'cat' | 'dog'>()
  .validate(data => data === 'cat' || data === 'dog' || [['err_custom', 'not_a_pet']])

type Schema = InferYrel<typeof schema> // 'cat' | 'dog'

validateYrel(schema, 'cat') // { isValid: true }
validateYrel(schema, 'dolphin') // { isValid: false }
```

## Schema Detection

```ts
import { y, isYrel } from 'yrel'

const fakeSchema = {}
const validSchema = y.string()

console.log(isYrel(fakeSchema)) // false
console.log(isYrel(validSchema)) // true
```

## API

### `y.any<Data = any>(): YrelSchemaAny<Data>`

Any kind of value.

```ts
const schema = y.any() // any
```

### `y.boolean(): YrelSchemaBoolean`

Boolean values.

```ts
const schema = y.boolean() // boolean
```

#### `.coerce()`

Force the data input value to `Boolean(input)` before validation.

```ts
const schema = y.boolean().coerce()
validateYrel(schema, 0) // { isValid: true, data: false }
validateYrel(schema, '') // { isValid: true, data: false }
validateYrel(schema, 100) // { isValid: true, data: true }
validateYrel(schema, 'abc') // { isValid: true, data: true }
validateYrel(schema, {}) // { isValid: true, data: true }
```

#### `.truthy()`

Only `true` values.

### `y.number(): YrelSchemaNumber`

Numeric and finite numbers.

```ts
const schema = y.number() // number
```

#### `.coerce()`

Force the data input value to `Number(input)` before validation. `Date` objects
are coerced with `.getTime()`.

```ts
const schema = y.number().coerce()
validateYrel(schema, true) // { isValid: true, data: 1 }
validateYrel(schema, '100') // { isValid: true, data: 100 }
validateYrel(schema, new Date()) // { isValid: true, data: 1695336434720 }
```

#### `.gt(value: number)`

A number greater than the defined value.

#### `.gte(value: number)`

A number greater than or equal to the defined value.

#### `.lt(value: number)`

A number less than the defined value.

#### `.lte(value: number)`

A number less than or equal to the defined value.

#### `.integer()`

A safe integer number.

### `y.string(): YrelSchemaString`

A string value.

```ts
const schema = y.string() // string
```

To validate an optional non-empty string validation, it can be done like this:

```ts
const schema = y.union([y.string().date(), y.literal('')])
validateYrel(schema, '2000-10-10') // valid
validateYrel(schema, '') // valid
```

#### `.coerce()`

Force the data input value to `String(input)` before validation. `Date` objects
are coerced with `.toISOString()`.

```ts
const schema = y.string().coerce()
validateYrel(schema, true) // { isValid: true, data: 'true' }
validateYrel(schema, 100) // { isValid: true, data: '100' }
validateYrel(schema, new Date()) // { isValid: true, data: '2023-09-21T22:46:09.059Z' }
```

#### `.nonempty()`

Non empty string.

#### `.trim()`

A string without spaces at the beginning or end.

#### `.length(value: number)`

A string with specified length.

#### `.min(value: number)`

A string with at least the specified length.

#### `.max(value: number)`

A string with at most the specified length.

#### `.datetime(value: number)`

A valid datetime string in ISO 8601 format. e.g.:

```ts
'2050-10-25T14:45:30Z'
'2050-10-25T14:45:30.3Z'
'2050-10-25T14:45:30.37Z'
'2050-10-25T14:45:30.370Z'
```

#### `.date(value: number)`

A valid date string fragment of the ISO 8601 format. e.g. `2050-10-25`.

#### `.time(value: number)`

A valid time string fragment of the ISO 8601 format. e.g.:

```ts
'14:45:30'
'14:45:30.3'
'14:45:30.37'
'14:45:30.370'
```

#### `.lowercase()`

A string in lowercase.

#### `.uppercase()`

A string in uppercase.

#### `.capitalcase(conf?: { lower?: boolean })`

A string in capital case. By default, it allows any uppercase characters such as `Abc Def`
or `ABc DEF`. If `.capitalcase({ lower: true })` is defined, it will only accept lowercase
chactaters for non-first word letters such as `Abc Def`.

### `y.literal(value: boolean | number | string): YrelSchemaLiteral`

A literal primitive value.

```ts
const schema = y.literal('cat') // 'cat'
```

### `y.array(schema: YrelSchema)`

An array of the specified schema.

```ts
const schema = y.array(y.string()) // string[]
```

#### `.nonempty()`

Non empty arrays.

#### `.length(value: number)`

An array of the specified length.

#### `.min(value: number)`

An array of at least the specified length.

#### `.max(value: number)`

An array of at most the specified length.

### `y.union(schemas: [YrelSchema, YrelSchema, ...YrelSchema[]]): YrelSchemaUnion`

A value that matches one of the specified schemas.

```ts
const schema = y.union([
  y.number(),
  y.literal('cat'),
  y.literal('dog'),
  y.literal('parrot')
])
// number | 'cat' | 'dog' | 'parrot'
```

For dynamically created union of literals, the dynamic types can be set like:

```ts
import { type YrelSchemaLiteral } from 'yrel'

type Languages = 'en' | 'es' | 'fr' | 'hi' | 'zh'
const languages: Languages[] = ['en', 'es', 'fr', 'hi', 'zh']

const schema = y.union<[YrelSchemaLiteral<Languages>, YrelSchemaLiteral<Languages>]>(
  languages.map(lang => y.literal(lang)) as [
    YrelSchemaLiteral<Languages>,
    YrelSchemaLiteral<Languages>
  ]
)
type Schema = InferYrel<typeof schema> // 'en' | 'es' | 'fr' | 'hi' | 'zh'
```

Or using a custom type with `y.any<type>()`.

### `y.tuple(schemas: [YrelSchema, ...YrelSchema[]]): YrelSchemaTuple`

An array with fixed number of elements and each of them with a specific data schema.

```ts
const schema = y.tuple([
  y.number(),
  y.string(),
  y.boolean().optional()
])
// [number, string, boolean | undefined]
```

### `y.object(shape: Record<string, YrelSchema>): YrelSchemaObject`

A plain object and each property with the specified data schema.

```ts
const schema = y.object({
  name: y.string(),
  age: y.number()
})
// { name: string; age: number; }
```

#### `.shape`

The object shape structure.

#### `.passthrough()`

By default the object data schema will report an error if the validated object contains
unexpected properties which are not defined in the schema shape. This will allow such
properties.

### `y.record(key: YrelSchemaString, value: YrelSchema): YrelSchemaRecord`

A plain object with a not specified number of properties. All object keys have to be
string with `y.string()`.

```ts
const schema = y.record(y.string(), y.number())
// { [key: string]: number }
```

To validate the record key:

```ts
const schema = y.record(y.string().date(), y.boolean())
// { [name: string]: boolean }

validateYrel(schema, { '2000': true, '2001': false }) // invalid
validateYrel(schema, { '2000-10-10': true, '2000-10-11': false }) // valid
```

## Logo

The Yrel logo is an [illustration](https://kuridelblack.tumblr.com/post/189438276843/yrel-light-of-hope)
of the character [Yrel](https://wowpedia.fandom.com/wiki/Yrel) in the game
[World of Warcraft](https://worldofwarcraft.blizzard.com) from the awesome illustrator
**[@KuridelBlack](https://twitter.com/KuridelBlack)**. Check out her work at
[linktr.ee/kuridelblack](https://linktr.ee/kuridelblack).
