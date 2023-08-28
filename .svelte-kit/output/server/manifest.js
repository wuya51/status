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
		client: {"start":"_app/immutable/entry/start.1abe3fc4.js","app":"_app/immutable/entry/app.03ec76fc.js","imports":["_app/immutable/entry/start.1abe3fc4.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/singletons.3dcf58f1.js","_app/immutable/chunks/paths.ff98ce77.js","_app/immutable/entry/app.03ec76fc.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.0719bd3d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
