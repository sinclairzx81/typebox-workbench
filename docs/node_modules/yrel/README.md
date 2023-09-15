![](https://github.com/romelperez/yrel/raw/main/yrel.jpg)

# Yrel

[![version](https://img.shields.io/npm/v/yrel.svg)](https://npmjs.org/package/yrel)
[![tests](https://github.com/romelperez/yrel/workflows/tests/badge.svg)](https://github.com/romelperez/yrel/actions)
[![codefactor](https://www.codefactor.io/repository/github/romelperez/yrel/badge)](https://www.codefactor.io/repository/github/romelperez/yrel)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/yrel.svg)](https://bundlephobia.com/package/yrel)
[![downloads](https://img.shields.io/npm/dm/yrel.svg)](https://npmjs.org/package/yrel)
[![github stars](https://img.shields.io/github/stars/romelperez/yrel.svg?style=social&label=stars)](https://github.com/romelperez/yrel)
[![license](https://img.shields.io/github/license/romelperez/yrel.svg?maxAge=2592000)](https://github.com/romelperez/yrel/blob/main/LICENSE)

~2.3kB JavaScript JSON schema validation with TypeScript type inference.

## Install

For any ESM and CommonJS JavaScript environment. If TypeScript is used, version 4.5+ is required.

```bash
npm install yrel
```

## Basic Usage

```ts
import { v, validate } from 'yrel'

const schema = v.object({
  name: v.string().min(2),
  age: v.number().gte(18)
})

const data = {
  name: 'romel',
  age: 21
}

const validation = validate(schema, data)

console.log(validation.isValid) // true
console.log(validation.data) // { name: 'romel', age: 21 }
console.log(validation.issues) // []
```

`validation.data` is just passed from the received data with the type of the schema
if it is valid. Otherwise, it would be `undefined`.

## Type Inference

```ts
import { v, type InferDataSchemaType } from 'yrel'

const schema = v.object({
  name: v.string().min(2).max(100),
  age: v.number().gte(18).lte(150).optional(),
  pets: v.array(v.string()).min(2).max(10)
})

type Schema = InferDataSchemaType<typeof schema>
/*
{
  name: string;
  age?: number | undefined;
  pets: string[]
}
*/

const data = {
  name: 'romel',
  age: 21,
  pets: ['dog', 'cat']
} satisfies Schema
```

## Optional and Nullable

All schemas can be optional and/or nullable.

```ts
const schema = v.string().optional()
type Schema = InferDataSchemaType<typeof schema> // string | undefined
```

```ts
const schema = v.number().nullable()
type Schema = InferDataSchemaType<typeof schema> // number | null
```

```ts
const schema = v.object({
  name: v.string().optional(),
  age: v.number().nullable(),
  is_married: v.boolean().optional().nullable()
})
type Schema = InferDataSchemaType<typeof schema>
/*
{
  name?: string | undefined
  age: number | null
  is_married?: boolean | undefined | null
}
*/
```

## Error Handling

Yrel provides a set of validators with predefined error codes for the error report.

```ts
import { v, validate } from 'yrel'

const schema = v.object({
  name: v.string().min(2),
  age: v.number().gte(18)
})

const validation = validate(schema, {
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
import { v, validate } from 'yrel'

const schema = v.object({
  users: v.array(
    v.object({
      name: v.string(),
      pets: v.array(v.string())
    })
  )
})
const validation = validate(schema, {
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
import { v, validate } from 'yrel'

const schema = v.string()
const validation = validate(schema, 100)

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

## Custom Validators

All schemas support the `.validate(value => DataValidation)` method to add custom
validators. They must return either `true` or a list of errors. Every error is tuple
with the predefined error code and the according parameters if applicable.

Validators libraries such as [validator](https://npmjs.com/package/validator) can
be used for more custom validations.

```ts
import { v, validate, type DataValidation } from 'yrel'
import isEmail from 'validator/lib/isEmail'

const validateEmail = (value: string): DataValidation =>
  isEmail(String(value)) || [['err_string_email']]

const schema = v.object({
  name: v.string().min(2),
  age: v.number().gte(18),
  email: v.string().validate(validateEmail)
})

const validation = validate(schema, {
  name: 'romel',
  age: 18,
  email: 'romel@example'
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

Yrel comes with a predefined list of errors with possible extra parameters for
the error report. The following is a list of them. If the type to the right is `undefined`
it says that it does not require parameters.

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
- `err_string_capitalcase: undefined`
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

One error with parameters can be the `err_number_gte` which requires the parameter
`gte: number`, so the report may be `['err_number_gte', { gte: 18 }]`.

## Custom Error Reports

Validators can return custom error reports. They need to be expressed as a tuple
`['err_custom', string, object?]`.

```ts
import { v, validate, type DataValidation } from 'yrel'

// Check that the string has the format "xxx-xxx".
const validateUserId = (value: string): DataValidation =>
  (/^\w{3,3}-\w{3,3}$/).test(value) || [['err_custom', 'my_custom_error_invalid_user_id']]

const schema = v.object({
  id: v.string().validate(validateUserId),
  name: v.string().min(2),
  age: v.number().gte(18),
  pets: v.array(
    v.union(
      [v.literal('dog'), v.literal('cat'), v.literal('parrot')],
      { errors: [['err_custom', 'my_custom_error_invalid_pet']] }
    )
  )
})

const validation = validate(schema, {
  id: 'abc-d',
  name: 'romel',
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

## Schema Detection

```ts
import { v, isSchema } from 'yrel'

const fakeSchema = {}
const validSchema = v.string()

console.log(isSchema(fakeSchema)) // false
console.log(isSchema(validSchema)) // true
```

## API

### `v.any(): DataSchemaAny`

Any kind of value.

### `v.boolean(): DataSchemaBoolean`

Boolean values.

#### `.truthy()`

Only `true` values.

### `v.number(): DataSchemaNumber`

Numeric and finite numbers.

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

### `v.string(): DataSchemaString`

A string value.

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

A valid datetime string in ISO 8601 format. e.g. `2050-10-25T14:45:30.370Z`.

#### `.date(value: number)`

A valid date string fragment of the ISO 8601 format. e.g. `2050-10-25`.

#### `.time(value: number)`

A valid time string fragment of the ISO 8601 format. e.g. `14:45:30.370`.

#### `.lowercase()`

A string in lowercase.

#### `.uppercase()`

A string in uppercase.

#### `.capitalcase()`

A string in capital case allowing any uppercase characters such as `Abc Def` or `ABc DEF`.

### `v.literal(value: boolean | number | string): DataSchemaLiteral`

A literal primitive value.

### `v.array(schema: DataSchema)`

An array of the specified schema.

#### `.nonempty()`

Non empty arrays.

#### `.length(value: number)`

An array of the specified length.

#### `.min(value: number)`

An array of at least the specified length.

#### `.max(value: number)`

An array of at most the specified length.

### `v.union(schemas: [DataSchema, ...DataSchema[]]): DataSchemaUnion`

A value that matches one of the specified schemas.

```ts
const schema = v.union([
  v.number(),
  v.literal('cat'),
  v.literal('dog'),
  v.literal('parrot')
])
// number | 'cat' | 'dog' | 'parrot'
```

### `v.tuple(schemas: [DataSchema, ...DataSchema[]]): DataSchemaTuple`

An array with fixed number of elements and each of them with a specific data schema.

```ts
const schema = v.tuple([
  v.number(),
  v.string(),
  v.boolean().optional()
])
// [number, string, boolean | undefined]
```

### `v.object(shape: Record<string, DataSchema>): DataSchemaTuple`

A plain object and each property with the specified data schema.

```ts
const schema = v.object({
  name: v.string(),
  age: v.number()
})
// { name: string; age: number; }
```

#### `.passthrough()`

By default the object data schema will report an error if the validated object contains
unexpected properties which are not defined in the schema shape. This will disable the error.

## Logo

The Yrel logo is an [illustration](https://kuridelblack.tumblr.com/post/189438276843/yrel-light-of-hope)
of the character [Yrel](https://wowpedia.fandom.com/wiki/Yrel) in the game
[World of Warcraft](https://worldofwarcraft.blizzard.com) from the awesome illustrator
**[@KuridelBlack](https://twitter.com/KuridelBlack)**. Check out her work at
[linktr.ee/kuridelblack](https://linktr.ee/kuridelblack).
