const autoCollection = require("./auto_collection_plugin");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("inspect", require("node:util").inspect);

  eleventyConfig.addPlugin(autoCollection, {
    baseDir: "./src/blog/",
    prefix: "blog_",
    fileGlob: "*.md",
  });

  return {
    dir: {
      input: "src",
      output: "www",
    },
  };
};
