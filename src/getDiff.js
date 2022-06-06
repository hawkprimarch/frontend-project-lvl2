import path from 'path';
import _ from 'lodash';

const getNormalizePath = (filepath) => {
  const pathOffile = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
  return pathOffile;
};

const getDiff = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union([...Object.keys(obj1), ...Object.keys(obj2)]));
  const cb = (acc, key) => {
    const valueOfObj1 = obj1[key];
    const valueOfObj2 = obj2[key];
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (valueOfObj1 === valueOfObj2) {
        acc.push({ name: key, fixed: valueOfObj1 });
      } else {
        acc.push({ name: key, oldValue: valueOfObj1, newValue: valueOfObj2 });
      }
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      acc.push({ name: key, oldValue: valueOfObj1 });
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      acc.push({ name: key, newValue: valueOfObj2 });
    }
    return acc;
  };
  const result = allKeys.reduce(cb, []);
  return result;
};

const printAnswer = (objOfDiff) => {
  const cb = (acc, key) => {
    if (_.has(key, 'fixed')) {
      acc.push(`   ${key.name}: ${key.fixed}`);
    }
    if ((_.has(key, 'oldValue'))) {
      acc.push(` - ${key.name}: ${key.oldValue}`);
    }
    if ((_.has(key, 'newValue'))) {
      acc.push(` + ${key.name}: ${key.newValue}`);
    }
    return acc;
  };
  const answer = objOfDiff.reduce(cb, []);
  console.log(`{\n${answer.join('\n')}\n}`);
};

export { getNormalizePath, getDiff, printAnswer };
