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
 * Gets the text the user has selected
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
				// Only translate elements that can be edited as text
				if (element.editAsText) {
					const elementText = element.asText().getText()
					// This check is necessary to exclude images, which return a blank text element
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
 * Replaces the text of the current selection with the provided text, or
 * inserts text at the current cursor location. (There will always be either
 * a selection or a cursor.) If multiple elements are selected, only inserts the
 * translated text in the first element that can contain text and removes the
 * other elements.
 *
 * @param {string} newText The text with which to replace the current selection.
 */
function insertText(newText) {
	const selection = DocumentApp.getActiveDocument().getSelection()
	if (selection) {
		let replaced = false
		const elements = selection.getRangeElements()
		if (elements.length === 1 && elements[0].getElement().getType() === DocumentApp.ElementType.INLINE_IMAGE) {
			throw new Error("Can't insert text into an image.")
		}
		for (let i = 0; i < elements.length; ++i) {
			if (elements[i].isPartial()) {
				const element = elements[i].getElement().asText()
				const startIndex = elements[i].getStartOffset()
				const endIndex = elements[i].getEndOffsetInclusive()
				element.deleteText(startIndex, endIndex)
				if (!replaced) {
					element.insertText(startIndex, newText)
					replaced = true
				} else {
					// This block handles a selection that ends with a partial element. We
					// want to copy this partial text to the previous element so we don't
					// have a line-break before the last partial.
					const parent = element.getParent()
					const remainingText = element.getText().substring(endIndex + 1)
					parent.getPreviousSibling().asText().appendText(remainingText)
					// We cannot remove the last paragraph of a doc. If this is the case,
					// just remove the text within the last paragraph instead.
					if (parent.getNextSibling()) {
						parent.removeFromParent()
					} else {
						element.removeFromParent()
					}
				}
			} else {
				const element = elements[i].getElement()
				if (!replaced && element.editAsText) {
					// Only translate elements that can be edited as text, removing other
					// elements.
					element.clear()
					element.asText().setText(newText)
					replaced = true
				} else {
					// We cannot remove the last paragraph of a doc. If this is the case,
					// just clear the element.
					if (element.getNextSibling()) {
						element.removeFromParent()
					} else {
						element.clear()
					}
				}
			}
		}
	} else {
		const cursor = DocumentApp.getActiveDocument().getCursor()
		const surroundingText = cursor.getSurroundingText().getText()
		const surroundingTextOffset = cursor.getSurroundingTextOffset()

		// If the cursor follows or preceds a non-space character, insert a space
		// between the character and the translation. Otherwise, just insert the
		// translation.
		if (surroundingTextOffset > 0) {
			if (surroundingText.charAt(surroundingTextOffset - 1) !== " ") {
				newText = " " + newText
			}
		}
		if (surroundingTextOffset < surroundingText.length) {
			if (surroundingText.charAt(surroundingTextOffset) !== " ") {
				newText += " "
			}
		}
		cursor.insertText(newText)
	}
}

/* ----- SIMPLE METHODS ----- */
function firstUpperCase(string) {
	return string[0].toUpperCase() + string.slice(1)
}
