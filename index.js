const fs = require("fs");
const path = require("path");
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
			file = path.resolve(views + "/" + file + ".crather");

			let templateContent = fs.readFileSync(file).toString();

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

function replaceScripts(content, scripts, data, callback) {
	if(content.search(/{{;(.*?)}}/g) !== -1) {
		let replacementMatches = content.match(/{{;(.*?)}}/g);
		let replacements = [];
		for (let i = 0; i < replacementMatches.length; i++) {
			if(replacements.indexOf(replacementMatches[i]) === -1) {
				replacements.push(replacementMatches[i]);
			}
		}

		let left = replacements.length;
		let finish = function () {
			left--;
			if(left <= 0) {
				if(content.search(/{{;(.*?)}}/g) !== -1) {
					replaceScripts(content, scripts, callback);
				} else {
					callback(content);
				}
			}
		};

		for (let i = 0; i < replacements.length; i++) {
			let file = replacements[i].replace("{{;", "").replace("}}", "").trim();
			file = file.split(".").join("/");
			file = path.resolve(scripts + "/" + file + ".js");

			let script = require(file);
			if(typeof script === "function") {
				script(data, function (returned) {
					if(returned !== null && returned !== undefined) {
						while(content.search(replacements[i]) !== -1) {
							content = content.replace(replacements[i], returned);
						}
					}

					finish();
				});
			} else {
				finish();
				throw new Error("Script files must return functions");
			}
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

			let replace = function (replace_callback) {
				replaceTemplates(rendered, options.settings["views"] || "./views", function (replaced) {
					rendered = replaced;

					replaceScripts(rendered, options.settings["scripts"] || "./scripts", options, function (replaced) {
						rendered = replaced;

						replaceValues(rendered, options, function (replaced) {
							rendered = replaced;

							if(rendered.search(/{{(.*?)}}/g) !== -1) {
								replace(replace_callback);
							} else {
								return replace_callback(rendered);
							}
						});
					});
				});
			};

			replace(function (rendered) {
				return callback(null, rendered);
			});
		}
	});
}

module.exports = crather;