// Prefix app-owned absolute URLs only in the GitHub Pages build.
// Local Vinext preview keeps its original paths and behavior.
module.exports = function pagesPaths(source) {
  return source.replace(/(["'`])\/(?!\/)(?=(?:images\/|articles(?:["'`/?#])|blog(?:["'`/?#-])|products\/|#|["'`]))/g, '$1/leadfair-materials/');
};
