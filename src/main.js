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
	let title = "Synonymes de " + firstUpperCase(expression)
	showVocabularyInterface(title, "views/vocabulary", getSynonyms)
}

// Antonyms Interface
function showAntonymsInterface() {
	let title = "Antonymes de " + firstUpperCase(expression)
	showVocabularyInterface(title, "views/vocabulary", getAntonyms)
}

// Conjugation Interface
function showConjugationInterface() {
	var expression = getSelection()

	//Call the HTML file and set the width and height
	var template = HtmlService.createTemplateFromFile("Conjugation_t")
	template.expression = expression
	var html = template.evaluate().setWidth(800).setHeight(500)

	//Display the dialog
	var dialog = ui.showModalDialog(html, "Conjugaison de " + firstUpperCase(expression))
}
