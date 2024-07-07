/**
 * Show the choosen vocabulary interface
 * @param {string} title
 * @param {string} viewName
 * @param {function} scrapingFunction
 */
function showVocabularyInterface(title, viewName, scrapingFunction) {
	// Create the vocabulary template
	let template = HtmlService.createTemplateFromFile(viewName)
	template.expression = getSelectedExpression()
	template.getFunction = scrapingFunction

	// Render the template to html
	let html = template.evaluate().setWidth(800).setHeight(500)

	// Display the dialog
	ui.showModalDialog(html, title + " : " + template.expression)
}

/**
 * Get the html from a url
 * @param {string} url
 * @returns
 */
function getHtml(url) {
	let options = {
		method: "get",
		validateHttpsCertificates: false,
		muteHttpExceptions: true,
	}

	return UrlFetchApp.fetch(url, options)
}

/**
 * Get the actual selected text
 * @returns {string}
 */
function getSelectedExpression() {
	let doc = DocumentApp.getActiveDocument()
	let selection = doc.getSelection()
	if (selection) {
		return "Errer"
	}

	let elements = selection.getRangeElements()
	if (elements.length != 1) {
		return "Errer"
	}

	// Get all the text from element
	let selectedText = elements[0].getElement().asText().getText()

	// Get only the selected text
	if (elements[0].isPartial()) {
		let startOffset = elements[0].getStartOffset()
		let endOffset = elements[0].getEndOffsetInclusive()
		selectedText = selectedText.substring(startOffset, endOffset + 1)
	}

	return selectedText.trim()
}

/**
 * Replace document selection by @text
 * @param {string} text
 * @returns
 */
function replaceSelection(text) {
	let doc = DocumentApp.getActiveDocument()
	let selection = doc.getSelection()
	if (selection) {
		return "Errer"
	}

	let elements = selection.getRangeElements()
	if (elements.length != 1) {
		return "Errer"
	}

	let element = elements[0].getElement()
	let startOffset = elements[0].getStartOffset() // -1 if whole element
	let endOffset = elements[0].getEndOffsetInclusive() // -1 if whole element

	if (startOffset != -1 && endOffset != -1) {
		let selectedText = element.asText().getText()
		// Add space at end
		if (selectedText[endOffset] == " ") {
			text += " "
		}
		// Upper case
		if (selectedText[startOffset] == selectedText[startOffset].toUpperCase()) {
			text = firstUpperCase(text)
		}
		// Replace text
		element.editAsText().deleteText(startOffset, endOffset)
		element.editAsText().insertText(startOffset, text)
	} else {
		text = firstUpperCase(text)
		element.setText(text)
	}

	return true
}

/* ----- SIMPLE METHODS ----- */
function firstUpperCase(string) {
	return string[0].toUpperCase() + string.slice(1)
}
