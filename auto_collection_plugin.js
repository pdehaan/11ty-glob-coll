const fs = require("node:fs");
const path = require("node:path");

module.exports = function (eleventyConfig = {}, pluginConfig = {}) {
  const { baseDir, prefix, fileGlob } = pluginConfig;
  const dirs = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .reduce((acc = {}, dir = {}) => {
      if (dir.isDirectory()) {
        const key = prefix + dir.name;
        acc[key] = {
          key,
          name: dir.name,
          glob: path.join(baseDir, dir.name, fileGlob),
        };
      }
      return acc;
    }, {});

  for (const [name, data] of Object.entries(dirs)) {
    eleventyConfig.addCollection(name, (collectionApi) =>
      collectionApi.getFilteredByGlob(data.glob)
    );
  }
  eleventyConfig.addGlobalData(`${prefix}collections`, dirs);
};
