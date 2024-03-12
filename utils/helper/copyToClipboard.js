
import clipboardModule from "clipboardy"

async function copyToClipboard(text) {
    clipboardModule.writeSync(text);
  }

  export default copyToClipboard