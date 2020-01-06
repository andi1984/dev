const { resolve } = require("path");
const { readdir } = require("fs").promises;

async function* getFiles(dir: string): AsyncGenerator<string> {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

// Only pass along events that meet a condition
// cf. https://gist.github.com/andi1984/45d789ab6f77d4c7c0817becb3d95888
async function* filter(
  stream: AsyncGenerator,
  test: (event: any) => boolean
): AsyncGenerator {
  for await (var event of stream) {
    if (test(event)) {
      yield event;
    }
  }
}

module.exports = {
  getFiles,
  filter
};
