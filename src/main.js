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
	showVocabularyInterface("Synonymes", "views/vocabulary", getSynonyms)
}

// Antonyms Interface
function showAntonymsInterface() {
	showVocabularyInterface("Antonymes", "views/vocabulary", getAntonyms)
}

// Conjugation Interface
function showConjugationInterface() {
	console.log("HEY")
	showVocabularyInterface("Conjugaison", "views/conjugation", getConjugation)
}
