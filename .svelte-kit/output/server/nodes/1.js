

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.3e4b9e7c.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.0719bd3d.js","_app/immutable/chunks/singletons.3dcf58f1.js","_app/immutable/chunks/paths.ff98ce77.js"];
export const stylesheets = [];
export const fonts = [];
