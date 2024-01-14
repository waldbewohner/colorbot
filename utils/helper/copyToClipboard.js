
import clipboardModule from "clipboardy"

async function copyToClipboard(text) {
    clipboardModule.writeSync(text); // Verwenden von 'default', falls es sich um einen Standardexport handelt
  }

  export default copyToClipboard