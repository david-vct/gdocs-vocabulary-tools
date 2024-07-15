/**
 * Get the list of synonyms of @expression
 * @param {string} expression
 * @returns {object} {words, accuracies} or {error}
 */
function getSynonymsFromCnrtl(expression) {
	return getVocabularyFromCnrtl("https://www.cnrtl.fr/synonymie/", expression)
}

/**
 * Get the list of antonyms of @expression
 * @param {string} expression
 * @returns {object} {words, accuracies} or {error}
 */
function getAntonymsFromCnrtl(expression) {
	return getVocabularyFromCnrtl("https://www.cnrtl.fr/antonymie/", expression)
}

/**
 * Get the list of synonyms or antonyms of @expression from cnrtl
 * @param {string} url
 * @param {string} expression
 * @returns {object} {words, accuracies} or {error}
 */
function getVocabularyFromCnrtl(url, expression) {
	let response = getHtml(url + expression.toLowerCase())

	if (response.getResponseCode() != 200) {
		return { error: `Un problème est survenu\n(vocabulary scraper - code ${response.getResponseCode()})` }
	}

	let html = response.getContentText()
	return parseVocabularyFromCnrtl(html)
}

/**
 * Gets the list of synonyms or antonyms in @html
 * @param {string} html
 * @returns {object} {words, accuracies} or {error}
 */
function parseVocabularyFromCnrtl(html) {
	// Check if it's an error page
	let isErrorPage = html.includes("<h2>Erreur</h2>")
	if (isErrorPage) {
		return { error: `Le mot n'a pas été trouvé\n(page d'erreur)` }
	}

	// Get the list of synonyms or antonyms
	let regexVocabulary = /(?:<td class="syno_format">|<td class="anto_format">)<a href=".*?">(.*?)<\/a><\/td>/gm
	let words = matchGroupe(regexVocabulary, html, 1)

	// Get the list of accuracy
	let regexAccuracy = /<img src="\/images\/portail\/pbon\.png" height="16" width="(\d+)" alt=""\/>/gm
	let accuracies = matchGroupe(regexAccuracy, html, 1).map((accuracy) => Math.min(accuracy, 25) / 25)

	if (words.length === 0 || words.length !== accuracies.length) {
		return { error: `Un problème est survenu\n(nombre de mots incorrect)` }
	}

	return {
		words: words,
		accuracies: accuracies,
	}
}
