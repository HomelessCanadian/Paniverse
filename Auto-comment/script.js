function autoComment() {
    const codeTextArea = document.getElementById('codeTextArea');
    const commentPhraseInput = document.getElementById('commentPhraseInput');
    const commentPhrase = commentPhraseInput.value;
    const code = codeTextArea.value;

    // Split the code into lines
    const lines = code.split('\n');

    // Add comments to each line
    for (let i = 0; i < lines.length; i++) {
        lines[i] = commentPhrase + ' ' + lines[i];
    }

    // Join the lines back into a string
    const commentedCode = lines.join('\n');

    // Update the textarea with the commented code
    codeTextArea.value = commentedCode;
}

function autoUncomment() {
    const codeTextArea = document.getElementById('codeTextArea');
    const commentPhraseInput = document.getElementById('commentPhraseInput');
    const commentPhrase = commentPhraseInput.value;
    const code = codeTextArea.value;

    // Split the code into lines
    const lines = code.split('\n');

    // Remove comments from each line
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(commentPhrase + ' ', '');
    }

    // Join the lines back into a string
    const uncommentedCode = lines.join('\n');

    // Update the textarea with the uncommented code
    codeTextArea.value = uncommentedCode;
}