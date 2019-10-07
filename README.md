# object-glob

Basic utility for searching an object for all keys matching a glob pattern.

## Installation

- `yarn add object-glob`
- `npm install --save object-glob`

## Usage

```typescript
import { objectGlob } from "object-glob";

const obj = {
  root: {
    nested: {
      leaf: "leaf"
    },
    alsoNested: {
      branch: "branch"
    },
    leaf: "keys"
  },
  leaf: "only"
};

const filter = objectGlob(obj);

filter("**/leaf");
// {
//   root: {
//     nested: {
//       leaf: "leaf"
//     },
//     leaf: "keys"
//   },
//   leaf: "only"
// }
```
