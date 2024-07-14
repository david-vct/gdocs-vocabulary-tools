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
	let data = getSynonymsFromCnrtl(expression)
	showSidebar(`Synonymes de ${expression}`, data, "views/vocabulary")
}

// Antonyms Interface
function showAntonymsInterface() {
	let expression = getSelectedText()
	let data = getAntonymsFromCnrtl(expression)
	showSidebar(`Antonymes de ${expression}`, data, "views/vocabulary")
}

// Conjugation Interface
function showConjugationInterface() {
	let expression = getSelectedText()
	let data = getConjugation(expression)
	showDialog(`Conjugaison de ${expression}`, data, "views/conjugation")
}
