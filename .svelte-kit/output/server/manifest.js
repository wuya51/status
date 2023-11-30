export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "sveltekit-gh-pages/_app",
	assets: new Set([".DS_Store",".nojekyll","android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.7a001fe9.js","app":"_app/immutable/entry/app.f3b8a82c.js","imports":["_app/immutable/entry/start.7a001fe9.js","_app/immutable/chunks/scheduler.4bb87acb.js","_app/immutable/chunks/singletons.6d1af6f8.js","_app/immutable/chunks/index.f612393b.js","_app/immutable/entry/app.f3b8a82c.js","_app/immutable/chunks/scheduler.4bb87acb.js","_app/immutable/chunks/index.b08f38e7.js"],"stylesheets":[],"fonts":[]},
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
