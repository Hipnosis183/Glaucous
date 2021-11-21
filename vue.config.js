module.exports = {
	pluginOptions: {
		electronBuilder: {
			contextIsolation: false,
			nodeIntegration: true,
			externals: ['nedb-promises'],
			builderOptions: {
				"productName": "Viridian",
				"appId": "com.viridian",
				"linux": {
					"artifactName": "${productName}-${version}-Linux64.${ext}",
					"target": ["appImage", "deb", "7z"],
					"category": "Game"
				},
				"win": {
					"artifactName": "${productName}-${version}-Win64.${ext}",
					"target": ["nsis", "7z"]
				},
				"nsis": {
					"oneClick": false,
					"allowToChangeInstallationDirectory": true
				},
			}
		}
	}
}