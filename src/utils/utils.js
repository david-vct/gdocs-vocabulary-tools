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

	response = UrlFetchApp.fetch(url, options)

	switch (response.getResponseCode()) {
		case 200:
			return response
		case 404:
			throw new Error(`Page not found`)
		default:
			throw new Error(`Fetch failed with response code ${response.getResponseCode()}`)
	}
}

/**
 * Gets @string with the first letter capitalized
 * @param {string} string
 * @returns
 */
function firstLetterToUpperCase(string) {
	return string[0].toUpperCase() + string.slice(1)
}
