const url = 'sample.pdf'; // Replace with your PDF path

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

pdfjsLib.getDocument(url).promise.then(pdf => {
  const viewer = document.getElementById('pdf-viewer');

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    pdf.getPage(pageNum).then(page => {
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      viewer.appendChild(canvas);

      const renderContext = { canvasContext: context, viewport: viewport };
      page.render(renderContext);
    });
  }
});


// JSON Editable Form Rendering
const jsonData = {
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Editor"
};

window.onload = function () {
  const form = document.getElementById('json-form');
  for (const key in jsonData) {
    const value = jsonData[key];
    const field = document.createElement('div');
    field.className = 'json-field';

    const label = document.createElement('label');
    label.textContent = key;
    label.className = 'form-label';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.name = key;
    input.placeholder = `Enter ${key}`;
    input.value = value;

    field.appendChild(label);
    field.appendChild(input);
    form.appendChild(field);
  }
};

function saveData() {
  const form = document.getElementById('json-form');
  const formData = new FormData(form);
  const result = {};
  for (const [key, value] of formData.entries()) {
    result[key] = value;
  }
  console.log('Updated JSON:', result);
  alert("JSON data saved in console (replace with API call if needed).");
}
