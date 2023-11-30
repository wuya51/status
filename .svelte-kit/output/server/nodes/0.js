import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.6f8acc5e.js","_app/immutable/chunks/scheduler.4bb87acb.js","_app/immutable/chunks/index.b08f38e7.js"];
export const stylesheets = [];
export const fonts = [];
