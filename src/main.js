/* ----- GLOBALS ----- */

var ui = DocumentApp.getUi()

/* ----- MENU ----- */

function onOpen() {
	ui.createMenu("Vocabulaire")
		.addItem("Synonymes", "showSynonymsInterface")
		.addItem("Antonymes", "showAntonymsInterface")
		.addItem("Conjugaison", "showConjugationInterface")
		.addToUi()
}

/* ----- INTERFACES ----- */

// Synonyms Interface
function showSynonymsInterface() {
	let expression = getSelectedText()
	let data = getSynonyms(expression)
	showVocabularyInterface("Synonymes", expression, data, "views/vocabulary")
}

// Antonyms Interface
function showAntonymsInterface() {
	let expression = getSelectedText()
	let data = getAntonyms(expression)
	showVocabularyInterface("Antonymes", expression, data, "views/vocabulary")
}

// Conjugation Interface
function showConjugationInterface() {
	let expression = getSelectedText()
	let data = getConjugation(expression)
	showVocabularyInterface("Conjugaison", expression, data, "views/conjugation")
}
