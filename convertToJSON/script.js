function convertToJSON() {
    const input = document.getElementById('input').value;
    const lines = input.split('\n');
    const dialog = [];

    lines.forEach(line => {
        const [character, ...textParts] = line.split(':');
        if (character && textParts.length > 0) {
            dialog.push({
                character: character.trim(),
                text: textParts.join(':').trim()
            });
        }
    });

    const output = JSON.stringify(dialog, null, 2);
    document.getElementById('output').textContent = output;
}