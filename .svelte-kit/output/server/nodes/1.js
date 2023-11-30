

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1b5c530e.js","_app/immutable/chunks/scheduler.4bb87acb.js","_app/immutable/chunks/index.b08f38e7.js","_app/immutable/chunks/singletons.6d1af6f8.js","_app/immutable/chunks/index.f612393b.js"];
export const stylesheets = [];
export const fonts = [];
