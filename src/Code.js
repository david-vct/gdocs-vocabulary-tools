/* ----- GLOBALS ----- */
var ui = DocumentApp.getUi()

/* ----- Menu ----- */
function onOpen() {
	ui.createMenu("Bae ©")
		.addItem("Synonymes", "showSynonymsInterface")
		.addItem("Conjugaison", "showConjugationInterface")
		.addToUi()
}

function showSynonymsInterface() {
	console.log("Synonyms")
}

function showConjugationInterface() {
	console.log("Antonyms")
}
