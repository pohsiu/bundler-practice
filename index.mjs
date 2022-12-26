// index.mjs
import JestHasteMap from 'jest-haste-map';
import { cpus } from 'os';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import yargs from 'yargs';
import Resolver from 'jest-resolve';
import fs from 'fs';
// Get the root path to our project (Like `__dirname`).
const root = join(dirname(fileURLToPath(import.meta.url)), 'product');

const hasteMapOptions = {
  extensions: ['js'],
  maxWorkers: cpus().length,
  name: 'jest-bundler',
  platforms: [],
  rootDir: root,
  roots: [root],
};
// Need to use `.default` as of Jest 27.
const hasteMap = new JestHasteMap.default(hasteMapOptions);
// This line is only necessary in `jest-haste-map` version 28 or later.
await hasteMap.setupCachePath(hasteMapOptions);
const { hasteFS, moduleMap } = await hasteMap.build();
console.log(hasteFS.getAllFiles());
// ['/path/to/product/apple.js', '/path/to/product/banana.js', …]

const options = yargs(process.argv).argv;
const entryPoint = resolve(process.cwd(), options.entryPoint);
if (!hasteFS.exists(entryPoint)) {
  throw new Error(
    '`--entry-point` does not exist. Please provide a path to a valid file.',
  );
}
 
console.log(chalk.bold(`❯ Building ${chalk.blue(options.entryPoint)}`));

const resolver = new Resolver.default(moduleMap, {
  extensions: ['.js'],
  hasCoreModules: false,
  rootDir: root,
});
 
const seen = new Set();
const modules = new Map();
const queue = [entryPoint];
let id = 0;
while (queue.length) {
  const module = queue.shift();
  if (seen.has(module)) {
    continue;
  }
  seen.add(module);
 
  // Resolve each dependency and store it based on their "name",
  // that is the actual occurrence in code via `require('<name>');`.
  const dependencyMap = new Map(
    hasteFS
      .getDependencies(module)
      .map((dependencyName) => [
        dependencyName,
        resolver.resolveModule(module, dependencyName),
      ]),
  );
 
  const code = fs.readFileSync(module, 'utf8');
  // Extract the "module body", in our case everything after `module.exports =`;
 
  const metadata = {
    id: id++,
    code,
    dependencyMap,
  };
  modules.set(module, metadata);
  queue.push(...dependencyMap.values());
}
 
console.log(chalk.bold(`❯ Found ${chalk.blue(seen.size)} files`));
 
console.log(chalk.bold(`❯ Serializing bundle`));

const wrapModule = (id, code) =>
  `define(${id}, function(module, exports, require) {\n${code}});`;
// Go through each module (backwards, to process the entry-point last).

const output = [];
for (const [module, metadata] of Array.from(modules).reverse()) {
  let { code, id } = metadata;
  for (const [dependencyName, dependencyPath] of metadata.dependencyMap) {
    // Inline the module body of the dependency into the module that requires it.
    
    code = code.replace(
      new RegExp(
        // Escape `.` and `/`.
        `require\\(('|")${dependencyName.replace(/[\/.]/g, '\\$&')}\\1\\)`,
      ),
      `require(${modules.get(dependencyPath).id})`,
    );
  }
  output.push(wrapModule(id, code));
}
 
output.unshift(fs.readFileSync('./require.js', 'utf8'));
output.push('requireModule(0);');
console.log(output.join('\n'));

if (options.output) {
  fs.writeFileSync(options.output, output.join('\n'));
}