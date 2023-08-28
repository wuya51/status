export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "sveltekit-gh-pages/_app",
	assets: new Set([".nojekyll"]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.97a2bf56.js","app":"_app/immutable/entry/app.ec8b5c3b.js","imports":["_app/immutable/entry/start.97a2bf56.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/singletons.438abfca.js","_app/immutable/chunks/paths.e61a64ac.js","_app/immutable/entry/app.ec8b5c3b.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.0719bd3d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
