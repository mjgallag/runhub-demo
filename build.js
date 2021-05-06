(async () => {
  const path = require('path');
  const fs = require('fs/promises');

  const { nodeFileTrace } = require('@vercel/nft');

  const srcDir = `${process.cwd()}`;

  process.chdir(path.dirname(process.argv[1]));

  const { fileList, warnings } = await nodeFileTrace([
    `${srcDir}/${process.argv[2]}`,
  ]);

  warnings.forEach((warning) => {
    console.warn(warning);
  });

  const buildDir = `build/${srcDir.substring(process.cwd().length + 1)}`;

  await fs.rm(buildDir, { recursive: true, force: true });
  await fs.mkdir(buildDir, { recursive: true });
  await Promise.all(
    fileList.map(async (file) => {
      if ((await fs.lstat(file)).isSymbolicLink()) {
        await fs.symlink(await fs.readlink(file), `${buildDir}/${file}`);
      } else {
        await fs.mkdir(`${buildDir}/${path.dirname(file)}`, {
          recursive: true,
        });
        await fs.copyFile(file, `${buildDir}/${file}`);
        try {
          const mapFile = `${file}.map`;

          await fs.stat(mapFile);
          await fs.copyFile(mapFile, `${buildDir}/${mapFile}`);
        } catch {}
      }
    })
  );
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
