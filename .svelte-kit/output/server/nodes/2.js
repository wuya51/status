

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.e7bbc6dc.js","_app/immutable/chunks/scheduler.4bb87acb.js","_app/immutable/chunks/index.b08f38e7.js","_app/immutable/chunks/index.f612393b.js"];
export const stylesheets = ["_app/immutable/assets/2.9b9c9798.css"];
export const fonts = [];
