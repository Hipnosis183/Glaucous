module.exports = {
	pluginOptions: {
		electronBuilder: {
			contextIsolation: false,
			nodeIntegration: true,
			externals: ['nedb-promises'],
			builderOptions: {
				"productName": "Viridian",
				"appId": "com.viridian",
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