const fs = require("fs");
const dotProp = require("dot-prop");

function replaceTemplates(content, views, callback) {
	if(content.search(/{{>(.*?)}}/g) !== -1) {
		let replacementMatches = content.match(/{{>(.*?)}}/g);
		let replacements = [];
		for (let i = 0; i < replacementMatches.length; i++) {
			if(replacements.indexOf(replacementMatches[i]) === -1) {
				replacements.push(replacementMatches[i]);
			}
		}

		for (let i = 0; i < replacements.length; i++) {
			let file = replacements[i].replace("{{>", "").replace("}}", "").trim();
			file = file.split(".").join("/");

			let templateContent = fs.readFileSync(views + "/" + file + ".crather").toString();

			while(content.search(replacements[i]) !== -1) {
				content = content.replace(replacements[i], templateContent);
			}
		}

		if(content.search(/{{>(.*?)}}/g) !== -1) {
			replaceTemplates(content, views, callback);
		} else {
			callback(content);
		}
	} else {
		callback(content);
	}
}

function replaceValues(content, data, callback) {
	if(content.search(/{{(.*?)}}/g) !== -1) {
		let replacementMatches = content.match(/{{(.*?)}}/g);
		let replacements = [];
		for (let i = 0; i < replacementMatches.length; i++) {
			if (replacements.indexOf(replacementMatches[i]) === -1) {
				replacements.push(replacementMatches[i]);
			}
		}

		for (let i = 0; i < replacements.length; i++) {
			let value = replacements[i].replace("{{", "").replace("}}", "").trim();

			while (content.search(replacements[i]) !== -1) {
				content = content.replace(replacements[i], (dotProp.get(data, value) || ""));

			}
		}
	}

	callback(content);

}

function crather(filePath, options, callback) {
	fs.readFile(filePath, function (err, content) {
		if(err) {
			return callback(err);
		} else {
			let rendered = content.toString();

			replaceTemplates(rendered, options.settings["views"], function (replaced) {
				rendered = replaced;

				replaceValues(rendered, options, function (replace) {
					rendered = replace;

					return callback(undefined, rendered);
				});
			});
		}
	});
}

module.exports = crather;