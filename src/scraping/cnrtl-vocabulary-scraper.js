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
	let isErrorPage = html.includes("<h2>Erreur</h2>")
	if (isErrorPage) {
		throw new Error("Vocabulary search failed\n" + html)
	}

	// Get the list of synonyms or antonyms
	let regexVocabulary = /(?:<td class="syno_format">|<td class="anto_format">)<a href="[\S]*?">([\s\S]*?)<\/a><\/td>/gm
	let matchs = html.matchAll(regexVocabulary)
	matchs = [...matchs]

	if (!matchs || matchs.length === 0) {
		throw new Error("No synonyms or antonyms found " + elements)
	}

	// Reduce matchs to the inner text of the html elements
	let words = matchs.map((match) => match[1])

	return {
		message: "Lets go",
		words: words,
	}
}
