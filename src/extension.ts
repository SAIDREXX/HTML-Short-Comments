import * as vscode from 'vscode';

// This function is called when your extension is activated
// Esta función se llama cuando se activa tu extensión
export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidChangeTextDocument((event) => {
		const editor = vscode.window.activeTextEditor;
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
			const lastLine = document.lineAt(document.lineCount - 1);
			const lastLineText = lastLine.text;

			// If the last line ends with the character, replace it with a comment
			// Si la última línea termina con el carácter, reemplázalo con un comentario
			if (lastLineText.trim().endsWith(character)) {
				const commentText = lastLineText.replace(character, '').trim();
				const edit = new vscode.WorkspaceEdit();
				edit.replace(
					document.uri,
					lastLine.range,
					`<!-- ${commentText} -->`
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
		"xml",
	];
	return codeLanguages.includes(document.languageId);
}
