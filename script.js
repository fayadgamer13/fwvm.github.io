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
<script>
  const memorySlider = document.getElementById('memorySlider');
  const memoryDisplay = document.getElementById('memoryDisplay');
  memorySlider.addEventListener('input', () => {
    memoryDisplay.textContent = `${memorySlider.value} MB`;
  });

  const thumbInput = document.getElementById('vmThumbnail');
  const thumbPreview = document.getElementById('thumbPreview');
  thumbInput.addEventListener('change', () => {
    const file = thumbInput.files[0];
    if (file) {
      thumbPreview.src = URL.createObjectURL(file);
      thumbPreview.style.display = 'block';
    }
  });

  function downloadQEMU() {
    document.getElementById('downloadStatus').textContent = "Downloading QEMU...";
    // Simulate download
    setTimeout(() => {
      document.getElementById('downloadStatus').textContent = "QEMU downloaded successfully.";
    }, 2000);
  }

  function downloadDebian() {
    document.getElementById('downloadStatus').textContent = "Downloading Debian emulator...";
    setTimeout(() => {
      document.getElementById('downloadStatus').textContent = "Debian emulator downloaded.";
    }, 2000);
  }

  function finalizeVM() {
    alert("VM Created! You can now launch it from the dashboard.");
    // You can add file saving logic here using Termux or AIDE APIs
  }
</script>
<label>
  Memory (MB):
  <input type="range" id="memorySlider" min="4" max="131072" value="4096" />
  <input type="number" id="memoryInput" min="4" max="131072" value="4096" />
</label>
<div id="memoryPreviewBar"></div>