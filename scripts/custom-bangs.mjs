/**
 * @typedef {import('./types.mjs').Bang} Bang
 */

/**
 * User-defined bangs. Useful for custom bangs and overrides.
 *
 * @type {Array<Bang>}
 */
export default [
  {
    s: "GitHub (starlingbank code)",
    t: "ghsb",
    u: "https://github.com/search?utf8=%E2%9C%93&q={{{s}}}+org:starlingbank",
  },
  {
    s: "GitHub (starlingbank repos)",
    t: "ghsbr",
    u: "https://github.com/search?utf8=%E2%9C%93&q={{{s}}}+org:starlingbank&type=repositories",
  },
];
