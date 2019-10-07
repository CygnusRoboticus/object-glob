import get from "lodash.get";
import set from "lodash.set";
import { match } from "micromatch";

export function objectGlob(target: { [k: string]: any }, memoizeKeys = true) {
  const keys = recurseKeys(target, { separator: "/" });

  return (glob: string) => {
    const matches = match(
      memoizeKeys ? keys : recurseKeys(target, { separator: "/" }),
      glob
    );

    return matches.reduce((acc, path) => {
      const segments = path.split("/");
      set(acc, segments, get(target, segments));
      return acc;
    }, {});
  };
}

interface IFlattenOptions {
  separator: string;
}

const defaultOptions: IFlattenOptions = { separator: "." };

function recurseKeys(target: { [k: string]: any }, options = defaultOptions) {
  const opts: IFlattenOptions = Object.assign(
    Object.assign({}, defaultOptions, options)
  );

  const keys: string[] = [];

  const recurse = (obj: { [k: string]: any }, prev?: string) => {
    for (let key of Object.keys(obj)) {
      const val = obj[key];
      key = (prev ? prev + opts.separator : "") + esc(key, opts);

      if (Array.isArray(val)) {
        keys.push(key);
        recurse(val, key);
      } else if (val !== null && typeof val === "object") {
        recurse(val, key);
      } else {
        keys.push(key);
      }
    }
  };

  recurse(target);
  return keys;
}

function esc(key: string, options: IFlattenOptions) {
  return key.split(options.separator).join("\\" + options.separator);
}
