/**
 * @author David Vicente
 * @description Adds a menu to get synonyms or conjugations of selection
 */

/* ----- GLOBALS ----- */
var ui = DocumentApp.getUi()

/* ----- Menu ----- */
function onOpen() {
	ui.createMenu("Bae ©")
		.addItem("Synonymes", "showSynonymsInterface")
		.addItem("Antonymes", "showAntonymsInterface")
		.addItem("Conjugaison", "showConjugationInterface")
		.addToUi()
}

/* ----- INTERFACES ----- */

// Synonyms Interface
function showSynonymsInterface() {
	var expression = getSelection()

	//Call the HTML file and set the width and height
	var template = HtmlService.createTemplateFromFile("Synonyms_t")
	template.expression = expression
	template.getFunction = getSynonyms
	var html = template.evaluate().setWidth(800).setHeight(500)

	//Display the dialog
	var dialog = ui.showModalDialog(html, "Synonymes de " + firstUpperCase(expression))
}

// Antonyms Interface
function showAntonymsInterface() {
	var expression = getSelection()

	//Call the HTML file and set the width and height
	var template = HtmlService.createTemplateFromFile("Synonyms_t")
	template.expression = expression
	template.getFunction = getAntonyms
	var html = template.evaluate().setWidth(800).setHeight(500)

	//Display the dialog
	var dialog = ui.showModalDialog(html, "Antonymes de " + firstUpperCase(expression))
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

/* ----- GLOBAL FUNCTIONS ------ */

// Get the html code of url
function getHtml(url) {
	var options = {
		method: "get",
		validateHttpsCertificates: false,
		muteHttpExceptions: true,
	}

	var response = UrlFetchApp.fetch(url, options)
	return response
}

// Get selection of actual document
function getSelection() {
	var doc = DocumentApp.getActiveDocument()
	var selection = doc.getSelection()
	var expression

	if (selection) {
		var elements = selection.getRangeElements()
		if (elements.length == 1) {
			var element = elements[0].getElement()
			var startOffset = elements[0].getStartOffset() // -1 if whole element
			var endOffset = elements[0].getEndOffsetInclusive() // -1 if whole element
			var selectedText = element.asText().getText() // All text from element
			if (elements[0].isPartial()) selectedText = selectedText.substring(startOffset, endOffset + 1)

			expression = selectedText.trim()
		}
	} else expression = "Errer"
	return expression
}

// Replace selection by @text
function replaceSelection(text) {
	var doc = DocumentApp.getActiveDocument()
	var selection = doc.getSelection()

	if (selection) {
		var elements = selection.getRangeElements()
		if (elements.length == 1) {
			var element = elements[0].getElement()
			var startOffset = elements[0].getStartOffset() // -1 if whole element
			var endOffset = elements[0].getEndOffsetInclusive() // -1 if whole element

			if (startOffset != -1 && endOffset != -1) {
				var selectedText = element.asText().getText()
				// Add space at end
				if (selectedText[endOffset] == " ") text += " "
				// Upper case
				if (selectedText[startOffset] == selectedText[startOffset].toUpperCase()) text = firstUpperCase(text)
				// Replace text
				element.editAsText().deleteText(startOffset, endOffset)
				element.editAsText().insertText(startOffset, text)
			} else {
				text = firstUpperCase(text)
				element.setText(text)
			}
		}
	}
	return true
}

/* ----- SIMPLE METHODS ----- */
function firstUpperCase(string) {
	return string[0].toUpperCase() + string.slice(1)
}
