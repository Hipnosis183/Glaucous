module.exports = {
	pluginOptions: {
		electronBuilder: {
			contextIsolation: false,
			nodeIntegration: true,
			externals: ['nedb-promises'],
			builderOptions: {
				"productName": "frontend-vue",
				"appId": "com.frontend-vue",
				"mac": {
					"icon": "build/icons/icon.icns"
				},
				"win": {
					"icon": "build/icons/icon.ico"
				},
				"linux": {
					"icon": "build/icons/icon.png",
					"target": "appImage"
				}
			}
		}
	}
}