/**
 * Get the list of synonyms of @expression
 * @param {string} expression
 * @returns
 */
function getSynonymsFromCnrtl(expression) {
	return getVocabularyFromCnrtl("https://www.cnrtl.fr/synonymie/", expression)
}

/**
 * Get the list of antonyms of @expression
 * @param {string} expression
 * @returns
 */
function getAntonymsFromCnrtl(expression) {
	return getVocabularyFromCnrtl("https://www.cnrtl.fr/antonymie/", expression)
}

/**
 * Get the list of synonyms or antonyms of @expression from cnrtl
 * @param {string} url
 * @param {string} expression
 * @returns {object} {message, words: list of vocabulary}
 */
function getVocabularyFromCnrtl(url, expression) {
	let html = getHtml(url + expression.toLowerCase())
	return parseVocabularyFromCnrtl(html)
}

function parseVocabularyFromCnrtl(html) {
	html = html.getContentText()

	// Check if it's an error page
	let isErrorPage = html.includes("<h2>Erreur</h2>")
	if (isErrorPage) {
		throw new Error("Word not found\n")
	}

	// Get the list of synonyms or antonyms
	let regexVocabulary = /(?:<td class="syno_format">|<td class="anto_format">)<a href="[\S]*?">([\s\S]*?)<\/a><\/td>/gm
	let words = matchGroupe(regexVocabulary, html, 1)

	// Get the list of accuracy
	let regexAccuracy = /<img src="\/images\/portail\/pbon\.png" height="16" width="(\d+)" alt=""\/>/gm
	let accuracies = matchGroupe(regexAccuracy, html, 1).map((accuracy) => Math.min(accuracy, 25) / 25)

	return {
		message: "",
		words: words,
		accuracies: accuracies,
	}
}
