import * as vscode from 'vscode';

// This function is called when your extension is activated
// Esta función se llama cuando se activa tu extensión
export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidChangeTextDocument((event) => {
		const document = event.document;

		// Check if the document is a code document
		// Comprueba si el documento es un documento de código
		if (isCodeDocument(document)) {

			// Get the configuration for 'htmlshortcomment'
			// Obtén la configuración para 'htmlshortcomment'
			const config = vscode.workspace.getConfiguration('htmlshortcomment');
			const character = config.get("defineCharacterToReplace", "//");

			// Get the last line of the document
			// Obtén la última línea del documento
			const actualLine = event.contentChanges[0]?.range.start.line;
			if (actualLine === undefined){
				return;// If there's no line, exit the function
			}  

			const lastLine = document.lineAt(actualLine);
			const lastLineText = lastLine.text;

			// If the lastLineText contains an HTML tag, remove it and save it in a new const
			// Si lastLineText contiene una etiqueta HTML, elimínala y guárdala en una nueva constante
			let htmlTag = '';
			let lastLineTextClean = '';
			const match = lastLineText.match(/<[^>]*>/);
			if (match) {
				htmlTag = match[0];
				lastLineTextClean = lastLineText.replace(htmlTag, '').trim();
			} else {
				lastLineTextClean = lastLineText;
			}

			// If the last line ends with the character, replace it with a comment
			// Si la última línea termina con el carácter, reemplázalo con un comentario
			if (lastLineTextClean.trim().endsWith(character)) {
				const commentText = lastLineTextClean.replace(character, '').trim();
				const edit = new vscode.WorkspaceEdit();
				edit.replace(
					document.uri,
					lastLine.range,
					 `${htmlTag} <!-- ${commentText} -->`
				);

				// Apply the edit to the workspace
				// Aplica la edición al espacio de trabajo
				vscode.workspace.applyEdit(edit);
			}
		}
	});
}

// This function is called when your extension is deactivated
// Esta función se llama cuando se desactiva tu extensión
export function deactivate() {}

// This function checks if the document is a code document
// Esta función comprueba si el documento es un documento de código
function isCodeDocument(document: vscode.TextDocument) {
	const codeLanguages = [
		"astro",
		"html",
		"svg",
		"xhtml",
		"xml",
		"xsl"
	];
	
	return codeLanguages.includes(document.languageId);
}
