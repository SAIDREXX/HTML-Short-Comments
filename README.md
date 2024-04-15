# HTML Short Comments

<div align="center">

[![en](https://img.shields.io/badge/lang-en-red.svg)](./README.md)
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](./README.es.md)

![GitHub stars](https://img.shields.io/github/stars/SAIDREXX/HTML-Short-Comments)
![GitHub Forks](https://img.shields.io/github/forks/SAIDREXX/HTML-Short-Comments)
![GitHub PRs](https://img.shields.io/github/issues-pr/SAIDREXX/HTML-Short-Comments)
![GitHub issues](https://img.shields.io/github/issues/SAIDREXX/HTML-Short-Comments)
![GitHub Contributors](https://img.shields.io/github/contributors/SAIDREXX/HTML-Short-Comments)

</div>

HTML Short Comments is an extension for Visual Studio Code that allows to improve productivity when commenting lines of code in files with comment syntax: `<!-- This is a comment -->`

## Configuration ⚙️

This extension can be configured in the User preferences.

`"htmlshortcomment.defineCharacterToReplace": string`
This setting allows you to define the ending characters of a comment line for replacement, by default the default characters are`//`

### Example  📄

`"htmlshortcomment.defineCharacterToReplace": %%`

The characters `%%` are defined to end the comment.

`Este es un Comentario%%` > `<!-- Este es un Comentario -->`

## Supported Languages 💻

- Astro 🚀
- HTML 🌐
- SVG 🖼️
- XML 🏷️
