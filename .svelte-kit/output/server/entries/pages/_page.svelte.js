import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
import { b as base } from "../../chunks/paths.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-8cljlu">status</h1> <p data-svelte-h="svelte-lmr5fu">Deployed to GitHub Pages</p> <p data-svelte-h="svelte-1vc1ga9">Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> <a href="${escape(base, true) + "/about"}" data-svelte-h="svelte-2hnrj4">About</a>`;
});
export {
  Page as default
};
