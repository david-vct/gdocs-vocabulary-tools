/**
 * Get the list of synonyms of @expression
 * @param {string} expression
 * @returns
 */
function getSynonyms(expression) {
	return getVocabulary("https://synonymo.fr/synonyme/", expression)
}

/**
 * Get the list of antonyms of @expression
 * @param {string} expression
 * @returns
 */
function getAntonyms(expression) {
	return getVocabulary("https://antonyme.org/antonyme/", expression)
}

/**
 * Get the list of synonyms or antonyms of @expression
 * @param {string} url
 * @param {string} expression
 * @returns {object} {message, words: list of vocabulary}
 */
function getVocabulary(url, expression) {
	let html = getHtml(url + expression.toLowerCase())
	return searchVocabulary(expression, html)
}

/**
 * Get the list of synonyms or antonyms of @expression in @html
 * @param {string} expression
 * @param {string} html
 * @returns {object} {message, words: list of vocabulary}
 */
function searchVocabulary(expression, html) {
	// Get the main container of the vocabulary
	let container = html.toString().match(/<div class="fiche"[\s\S]*?<\/div>/)

	// If is an error page
	if (!container) {
		throw new Error("Vocabulary search failed\n" + html)
	}

	// Get the list of synonyms or antonyms
	let words = container.toString().match(/(?<=<a class="word".*>)(.*)(?=<\/a>)/g)
	let message = ""

	// If there are some synonyms or antonyms
	if (words) {
		if (words.length > 1) {
			message = "Plusieurs résultats trouvés !"
		} else {
			message = "Un seul résultat !"
		}
	} else {
		// Get the list of similar words
		words = container.toString().match(/(?<=<a.*>)(.*)(?=<\/a>)/g)

		// If there are some similar expressions
		if (words) {
			message = "Aucun résultat trouvé, voici quelques mots similaires"
		} else {
			message = "Aucun résultat trouvé"
			words = [":("]
		}
	}

	return { message: message, words: words }
}
