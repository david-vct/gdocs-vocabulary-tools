/**
 * Show the choosen vocabulary interface
 * @param {string} title
 * @param {string} expression
 * @param {object} data
 * @param {string} viewName
 */
function showVocabularyInterface(title, expression, data, viewName) {
	// Create the vocabulary template
	let template = HtmlService.createTemplateFromFile(viewName)
	template.expression = expression
	template.data = data

	// Render the template to html
	let html = template.evaluate().setWidth(800).setHeight(500)

	// Display the dialog
	ui.showModalDialog(html, title + " : " + expression)
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
 * Gets the text the user has selected. If there is no selection,
 * this function displays an error message
 *
 * @return {string} The selected text
 */
function getSelectedText() {
	const selection = DocumentApp.getActiveDocument().getSelection()
	const text = []
	if (selection) {
		const elements = selection.getRangeElements()
		for (let i = 0; i < elements.length; ++i) {
			if (elements[i].isPartial()) {
				const element = elements[i].getElement().asText()
				const startIndex = elements[i].getStartOffset()
				const endIndex = elements[i].getEndOffsetInclusive()

				text.push(element.getText().substring(startIndex, endIndex + 1))
			} else {
				const element = elements[i].getElement()
				// Only translate elements that can be edited as text; skip images and
				// other non-text elements.
				if (element.editAsText) {
					const elementText = element.asText().getText()
					// This check is necessary to exclude images, which return a blank
					// text element.
					if (elementText) {
						text.push(elementText)
					}
				}
			}
		}
	}
	if (!text.length) throw new Error("Please select some text.")
	return text.join()
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
