/* ----- SYNONYMS FUNCTIONS -----*/

// Returns object with a message error and the expression's synonyms array
function getSynonyms(expression) {
	var url = "http://synonymo.fr/synonyme/" + expression.toLowerCase()
	var html = getHtml(url)
	var data = searchSynonyms(expression, html)
	//ui.alert("End searchSynonyms");
	return data
}

function getAntonyms(expression) {
	var url = "http://antonyme.org/antonyme/" + expression.toLowerCase()
	var html = getHtml(url)
	var data = searchSynonyms(expression, html)
	//ui.alert("End searchSynonyms");
	return data
}

// Search synonyms of @expression on @html synonymo.fr
function searchSynonyms(expression, html) {
	var message, array
	var container = html.toString().match(/<div class="fiche">[\s\S]*?<\/div>/)

	// If html is not an error page
	if (container) {
		array = container.toString().match(/(?<=<a class="word".*>)(.*)(?=<\/a>)/g)
		// If there are some synonyms
		if (array) message = array.length > 1 ? array.length + " résultats trouvés !" : "Un seul résultat trouvé."
		else {
			array = container.toString().match(/(?<=<a.*>)(.*)(?=<\/a>)/g)
			// If no synonyms but some similar expressions
			if (array) message = "Aucun résultat trouvé :|"
			else {
				message = "Cette expression n'est pas dans nos données."
				array = [":("]
			}
		}
	}
	// Wrong page given
	else {
		message = "Une erreur est survenu avec l'expression <" + expression + ">."
		array = ["ಠ_ಠ"]
	}
	// Returns an object
	return { message: message, words: array }
}
