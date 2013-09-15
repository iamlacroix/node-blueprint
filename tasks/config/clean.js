/*
 * clean
 */

module.exports = {
  stylesheets:   ["<%= meta.buildPath + meta.cssPath %>"],
  javascripts:   ["<%= meta.buildPath + meta.jsPath %>"],
  static_assets: ["<%= meta.buildPath + meta.fontPath %>", "<%= meta.buildPath + meta.imagePath %>"]
};
