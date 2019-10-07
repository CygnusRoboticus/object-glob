// tslint:disable max-classes-per-file

import { assert } from "chai";
import "mocha";
import { objectGlob } from "../src/index";

describe("object-glob", () => {
  it("filters object keys", () => {
    const filter = objectGlob({
      leaf: "only",
      root: {
        alsoNested: {
          branch: "branch"
        },
        array: { leaf: [1, 2, 3, 4] },
        leaf: ["keys", { leaf: "mixed" }],
        nested: {
          leaf: "leaf"
        },
        nestedObject: [{ leaf: "leaf" }]
      }
    });

    assert.deepEqual(filter("**/leaf"), {
      leaf: "only",
      root: {
        array: { leaf: [1, 2, 3, 4] },
        leaf: ["keys", { leaf: "mixed" }],
        nested: {
          leaf: "leaf"
        },
        nestedObject: [{ leaf: "leaf" }]
      }
    });
  });
});
