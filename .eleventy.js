function toArrayOrNull(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val.filter(Boolean);
  return [val];
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("hymns", () => {
    const hymns = require("./src/_data/hymns.json");

    return hymns.map(h => ({
      ...h,
      lyricists:       toArrayOrNull(h.lyricists),
      musicians:       toArrayOrNull(h.musicians),
      keys:            toArrayOrNull(h.keys),
      topic_tags:      toArrayOrNull(h.topic_tags),
      scripture_tags:  toArrayOrNull(h.scripture_tags)
    }));
  });

  eleventyConfig.addGlobalData("hymnHeaders", () => {
    const hymns = require("./src/_data/hymns.json");
    return hymns.length > 0 ? Object.keys(hymns[0]) : [];
  });

  eleventyConfig.addFilter("toTags", function(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val.filter(Boolean);
    return [val];
  });

  eleventyConfig.addFilter("joinList", function(val) {
  if (!val) return "";
  if (Array.isArray(val)) {
    return val.filter(Boolean).join(", ");
  }
  return val;
});

  return {
    dir: { input: "src", output: "_site", includes: "_includes" }
  };
};