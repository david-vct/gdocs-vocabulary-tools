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
	let data = getSynonymsFromCnrtl(expression) //getSynonyms(expression)
	showSidebar(`Synonymes ${expression}`, data, "views/vocabulary")
}

// Antonyms Interface
function showAntonymsInterface() {
	let expression = getSelectedText()
	let data = getAntonyms(expression)
	showSidebar(`Antonymes ${expression}`, data, "views/vocabulary")
}

// Conjugation Interface
function showConjugationInterface() {
	let expression = getSelectedText()
	let data = getConjugation(expression)
	showDialog(`Conjugaison ${expression}`, data, "views/conjugation")
}
