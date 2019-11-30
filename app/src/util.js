import {
  isPlainObject,
  mapValues,
  map,
  mapKeys,
  camelCase,
  snakeCase
} from "lodash";

const deepMapObjects = (mapper, obj, fn) => {
  if (Array.isArray(obj)) {
    return map(obj, val => deepMapObjects(mapper, val, fn));
  }
  if (isPlainObject(obj)) {
    return mapper(
      mapValues(obj, val => deepMapObjects(mapper, val, fn)),
      fn
    );
  }
  return obj;
};

const deeplyMapObjects = mapper => (obj, fn) => deepMapObjects(mapper, obj, fn);

export const camelCaseKeys = (obj: {}): {} =>
  deeplyMapObjects(mapKeys)(obj, (val, key) => camelCase(key));

export const snakeCaseKeys = (obj: {}): {} =>
  deeplyMapObjects(mapKeys)(obj, (val, key) => snakeCase(key));
