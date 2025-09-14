<label>
  Memory (MB):
  <input type="range" id="memorySlider" min="4" max="131072" value="4096" />
  <span id="memoryValue">4096 MB</span>
</label>
<div id="memoryPreviewBar"></div>
<script>
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value;
      terminalOutput.textContent += `\n$ ${cmd}\nCommand '${cmd}' not found`;
      terminalInput.value = '';
    }
  });
</script>
<script>
  const themeToggle = document.getElementById('themeToggle');
  const fontSelector = document.getElementById('fontSelector');

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
    } else {
      document.documentElement.style.setProperty('--bg-color', '#121212');
      document.documentElement.style.setProperty('--text-color', '#eee');
    }
  });

  fontSelector.addEventListener('change', () => {
    const selectedFont = fontSelector.value;
    document.documentElement.style.setProperty('--font-family', selectedFont);
  });
</script>