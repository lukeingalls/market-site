module.exports = {
	"env": {
		"browser": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2021,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"react/react-in-jsx-scope": "off",
		"indent": [
			"error",
			4,
			{ "SwitchCase": 1 }
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
