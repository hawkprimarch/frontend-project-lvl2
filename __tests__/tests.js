import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import { getDiff } from '../src/getDiff.js';
import trullyMass from '../__fixtures__/trueAnsw.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixture = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getDiff', () => {
  const obj1 = JSON.parse((fs.readFileSync(getFixture('file1.json'), 'utf-8')));
  const obj2 = JSON.parse((fs.readFileSync(getFixture('file2.json'), 'utf-8')));
  expect(getDiff(obj1, obj2)).toEqual(trullyMass);
  const obj3 = yaml.load((fs.readFileSync(getFixture('file3.yml'), 'utf-8')));
  const obj4 = yaml.load((fs.readFileSync(getFixture('file4.yml'), 'utf-8')));
  expect(getDiff(obj3, obj4)).toEqual(trullyMass);
});
