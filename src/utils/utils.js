/**
 * Get the html from a url
 * @param {string} url
 * @returns {GoogleAppsScript.URL_Fetch.HTTPResponse}
 */
function getHtml(url) {
	let options = {
		method: "get",
		validateHttpsCertificates: false,
		muteHttpExceptions: true,
	}

	return UrlFetchApp.fetch(url, options)
}

/**
 * Gets @string with the first letter capitalized
 * @param {string} string
 * @returns
 */
function firstLetterToUpperCase(string) {
	return string[0].toUpperCase() + string.slice(1)
}
