// Data structure for different categories and their models
const categories = [
  {
    name: "ROUND CONTAINER",
    models: [
      {
        name: "4MP-HC-50",
        capacity: "50ml Hinged Container",
        src: "./assets/glb/round/50ml_hinged_container.glb",
        img: "./container_images/50 hinged container n.webp",
      },
      {
        name: "4MP-R-120",
        capacity: "120ml Round Container",
        src: "./assets/glb/round/120ml_round.glb",
        img: "./container_images/120 hinged container n.webp",
      },
      {
        name: "4MP-R-250",
        capacity: "250ml Round Container",
        src: "./assets/glb/round/250ml_round.glb",
        img: "./container_images/250ml n1.webp",
      },
      {
        name: "4MP-R-500",
        capacity: "500ml Round Container",
        src: "./assets/glb/round/500ml_round.glb",
        img: "./container_images/4.500ml container.webp",
      },
      {
        name: "4MP-R-750",
        capacity: "750ml Round Container",
        src: "./assets/glb/round/750ml_round.glb",
        img: "./container_images/5.750ml container n2.webp",
      },
    ],
  },
  {
    name: "TAMPER EVIDENT RECTANGULAR CONTAINER",
    models: [
      {
        name: "4MP-TER-500",
        capacity: "500ml Tamper Evident Rectangular Container",
        src: "./assets/glb/rectangle/500_rectangle.glb",
        img: "./container_images/6 - 500ml Tamper Evident Rectangular Container.webp",
      },
      {
        name: "4MP-TER-750",
        capacity: "750ml Tamper Evident Rectangular Container",
        src: "./assets/glb/rectangle/750_rectangle.glb",
        img: "./container_images/7 - 750ml Tamper Evident Rectangular Container.webp",
      },
      {
        name: "4MP-TER-1000",
        capacity: "1000ml Tamper Evident Rectangular Container",
        src: "./assets/glb/rectangle/1000_rectangle.glb",
        img: "./container_images/8 - 1000ml Tamper Evident Rectangular Container.webp",
      },
    ],
  },
  {
    name: "SIPPER GLASS",
    models: [
      {
        name: "4MP-DC-120",
        capacity: "120ml  Dessert cup",
        src: "./Model/120ml_dessert_cup.glb",
        img: "./container_images/sipper_models/120_dessert_cup.webp",
      },
      {
        name: "4MP-G-250",
        capacity: "250ml Glass",
        src: "./Model/250ml_glass.glb",
        img: "./container_images/sipper_models/250ml_glass.webp",
      },
      {
        name: "4MP-SG-250",
        capacity: "250ml Sipper glass",
        src: "./Model/250_Sipper_glass.glb",
        img: "./container_images/sipper_models/250ml_sipper_glass.webp",
      },
      {
        name: "4MP-GF-250",
        capacity: "250ml Glass with flat lid",
        src: "./Model/250_glasswith_flat_lid.glb",
        img: "./container_images/sipper_models/250ml_glass_with_flat_lid.webp",
      },
      {
        name: "4MP-G-350",
        capacity: "350ml Glass",
        src: "./Model/350ml_glass.glb",
        img: "./container_images/sipper_models/350ml_glass.webp",
      },
      {
        name: "4MP-SG-350",
        capacity: "350ml Sipper glass",
        src: "./Model/350_sipper_glass.glb",
        img: "./container_images/sipper_models/350ml_sipper_glass.webp",
      },
    ],
  },
];

let currentCategory = 0;
let selectedModel = 0;
let selectedPattern = 0;
let zoomLevel = 1;

// Initialize the page
function init() {
  loadModels();
  selectModel(0);
  selectPattern(0);
}

// Load models for current category
// function loadModels() {
//     const modelGrid = document.getElementById('modelGrid');
//     modelGrid.innerHTML = '';

//     categories[currentCategory].models.forEach((model, index) => {
//         const modelElement = document.createElement('div');
//         modelElement.className = `model-item ${index === selectedModel ? 'selected' : ''}`;
//         modelElement.onclick = () => selectModel(index);

//         modelElement.innerHTML = `
//         <div class="section-title">${name}</div>
//             <div class="model-preview"></div>

//             <div class="model-specs">${model.capacity}</div>
//         `;

//         modelGrid.appendChild(modelElement);
//     });
// }
function loadModels() {
  const modelGrid = document.getElementById("modelGrid");
  const categoryTitle = document.getElementById("categoryTitle");

  // Change heading dynamically
  categoryTitle.textContent = categories[currentCategory].name;

  // Clear previous models
  modelGrid.innerHTML = "";

  categories[currentCategory].models.forEach((model, index) => {
    const modelElement = document.createElement("div");
    modelElement.className = `model-item ${
      index === selectedModel ? "selected" : ""
    }`;
    modelElement.onclick = () => selectModel(index);

    modelElement.innerHTML = `
            <div class="model-preview">
                <img src="${model.img}"/>
                </div>
            
            <div class="model-specs">${model.capacity}</div>
        `;

    modelGrid.appendChild(modelElement);
  });
}

// Select category
function selectCategory(categoryIndex) {
  currentCategory = categoryIndex;
  selectedModel = 0;

  // Update active button
  document.querySelectorAll(".nav-btn").forEach((btn, index) => {
    btn.classList.toggle("active", index === categoryIndex);
  });

  loadModels();
  selectModel(0);
}

// Select model
function selectModel(modelIndex) {
  selectedModel = modelIndex;
  const model = categories[currentCategory].models[modelIndex];

  // Update selected model in grid
  document.querySelectorAll(".model-item").forEach((item, index) => {
    item.classList.toggle("selected", index === modelIndex);
  });

  // Update model display
  document.getElementById("modelTitle").textContent = model.name;
  document.getElementById("modelCapacity").textContent = model.capacity;

  // Update model viewer (placeholder for actual GLB loading)
  const placeholder = document.getElementById("modelPlaceholder");
  placeholder.innerHTML = `<model-viewer src="${model.src}" alt="${model.name}" auto-rotate camera-controls style="width: 100%; height: 100%;" id="viewer" disable-tap disable-pan></model-viewer>`;
}

// Select pattern
function selectPattern(patternIndex) {
  selectedPattern = patternIndex;

  // Update selected pattern
  document.querySelectorAll(".pattern-item").forEach((item, index) => {
    item.classList.toggle("selected", index === patternIndex);
  });

  // Apply pattern to current model (this would typically update the GLB texture)
  console.log(
    `Applied pattern ${patternIndex} to model ${categories[currentCategory].models[selectedModel].name}`
  );
}

// Zoom functions
function zoomIn() {
  zoomLevel = Math.min(zoomLevel + 0.2, 3);
  updateZoom();
}

function zoomOut() {
  zoomLevel = Math.max(zoomLevel - 0.2, 0.5);
  updateZoom();
}

function updateZoom() {
  const modelViewer = document.querySelector("model-viewer");
  if (modelViewer) {
    modelViewer.style.transform = `scale(${zoomLevel})`;
  }
}

// Export functions
function toggleDropdown() {
  document.getElementById("exportDropdown").classList.toggle("show");
}

function exportModel(format) {
  // Create download link
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;

  // Fill with white background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add model name as text (placeholder)
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    categories[currentCategory].models[selectedModel].name,
    canvas.width / 2,
    canvas.height / 2
  );

  // Convert to desired format and download
  const link = document.createElement("a");
  if (format === "svg") {
    // Create SVG content
    const svgContent = `
                    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="600" fill="white"/>
                        <text x="400" y="300" text-anchor="middle" font-family="Arial" font-size="24">${categories[currentCategory].models[selectedModel].name}</text>
                    </svg>
                `;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    link.href = URL.createObjectURL(blob);
  } else {
    canvas.toBlob(function (blob) {
      link.href = URL.createObjectURL(blob);
      link.download = `${categories[currentCategory].models[selectedModel].name}.${format}`;
      link.click();
    }, `image/${format}`);
    return;
  }

  link.download = `${categories[currentCategory].models[selectedModel].name}.${format}`;
  link.click();

  document.getElementById("exportDropdown").classList.remove("show");
}

// Edit function
// function editModel() {
//     window.location.href = 'index.html', '_blank';
// }
function editModel() {
  let selectCategoryFinal;
  if (currentCategory == 0) {
    selectCategoryFinal = "round";
  } else if (currentCategory == 1) {
    selectCategoryFinal = "rectangle";
  } else {
    selectCategoryFinal = "round";
  }
  sessionStorage.setItem("model_type", selectCategoryFinal);
  window.open("edit.html", "_blank");
}

window.addEventListener("message", (event) => {
  // Optional: verify origin for security
  // if (event.origin !== "https://yourdomain.com") return;

  const dataURL = event.data;

  if (typeof dataURL === "string" && dataURL.startsWith("data:image/png")) {
    console.log("Received PNG image from editor");
    console.log(`Here is the image url: \n ${dataURL}`);

    // Now use this dataURL as texture for your GLB model
    // Example: apply it as texture
    applyTextureToModel(dataURL);
  }
});

async function applyTextureToModel(pngDataURL) {
  const modelViewer = document.getElementById("viewer");
  // await modelViewer.updateComplete;

  const materials = modelViewer.model?.materials;
  if (!materials || !materials.length) {
    console.error("Model not loaded or has no materials.");
    return;
  }

  // ✅ Find the material named 'label'
  const labelMat = materials.find((m) => m.name === "texture_area");


  if (!labelMat) {
    console.error("❌ 'label' material not found.");
    return;
  }

  try {
    const texture = await createTextureFromDataURL(pngDataURL, modelViewer);
    labelMat.pbrMetallicRoughness.setBaseColorTexture(texture);
    console.log("✅ Texture applied to 'label' material.");
  } catch (error) {
    console.error("❌ Failed to apply texture to 'label':", error);
  }
}

// Helper: Create texture from base64 PNG (no fetch)
async function createTextureFromDataURL(dataURL, modelViewer) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      console.log("✅ Image loaded successfully");
      document.body.appendChild(img); // See the image

      try {
        const texture = modelViewer.createTexture(img);

        if (!texture || typeof texture !== "object") {
          throw new Error(
            "Texture creation failed or returned invalid object."
          );
        }

        resolve(texture);
      } catch (e) {
        console.error("❌ Texture creation failed:", e);
        reject(e);
      }
    };

    img.onerror = (err) => {
      console.error("❌ Image failed to load from data URL");
      console.debug("Failed Data URL Preview:", dataURL.slice(0, 200));
      reject(new Error("Failed to load image from data URL"));
    };

    // Validate and assign data URL
    if (typeof dataURL !== "string" || !dataURL.startsWith("data:image/png")) {
      return reject(
        new Error("Invalid dataURL passed to createTextureFromDataURL")
      );
    }

    console.log("Setting img.src...");
    img.src = dataURL;
  });
}

// GLB Import function
function handleGLBImport(event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(`Imported GLB file: ${file.name}`);
    // Here you would typically process the GLB file and add it to the models array
  }
}

// Pattern Import function
function handlePatternImport(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(`Imported pattern: ${file.name}`);
      // Here you would typically create a new pattern from the imported image
    };
    reader.readAsDataURL(file);
  }
}

// Close dropdown when clicking outside
window.onclick = function (event) {
  if (!event.target.matches(".export-btn")) {
    const dropdown = document.getElementById("exportDropdown");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
};

// Initialize when page loads
window.addEventListener("DOMContentLoaded", init);

// Add this function to your existing JavaScript code
function togglePatternsSection() {
  const patternsSection = document.querySelector(".patterns-section");

  // Hide patterns section only when Sipper Glass (category 2) is active
  if (currentCategory === 2) {
    patternsSection.style.display = "none";
  } else {
    patternsSection.style.display = "block";
  }
}

// Update your existing selectCategory function
function selectCategory(categoryIndex) {
  currentCategory = categoryIndex;
  selectedModel = 0;

  // Update active button
  document.querySelectorAll(".nav-btn").forEach((btn, index) => {
    btn.classList.toggle("active", index === categoryIndex);
  });

  loadModels();
  selectModel(0);

  // Add this line to toggle patterns section visibility
  togglePatternsSection();
}

// Update your existing init function
function init() {
  loadModels();
  selectModel(0);
  selectPattern(0);

  // Add this line to set initial state
  togglePatternsSection();
}

// Add this function to toggle the model grid layout
function toggleModelGridLayout() {
  const modelGrid = document.getElementById("modelGrid");
  const modelItems = document.querySelectorAll(".model-item"); // Use querySelectorAll, not getElementById

  // Remove grid display for Tamper Evident (category 1), keep grid for others
  if (currentCategory === 1) {
    modelGrid.style.display = "flex";
    modelGrid.style.flexDirection = "column";
    modelGrid.style.gap = "15px";

    // Apply styles to all model items
    modelItems.forEach((item) => {
      item.style.display = "flex";
      item.style.flexDirection = "row";
      item.style.marginRight = "auto";
      item.style.marginLeft = "auto";
      // item.style.width = '100%';
      item.style.height = "auto";
    });
  } else {
    modelGrid.style.display = "grid";
    modelGrid.style.gridTemplateColumns = "1fr 1fr";
    modelGrid.style.gap = "8px";

    // Reset model items to default
    modelItems.forEach((item) => {
      item.style.display = "flex";
      item.style.flexDirection = "column";
      item.style.width = "80%";
      item.style.height = "135px";
    });
  }
}

// Update your existing selectCategory function
function selectCategory(categoryIndex) {
  currentCategory = categoryIndex;
  selectedModel = 0;

  // Update active button
  document.querySelectorAll(".nav-btn").forEach((btn, index) => {
    btn.classList.toggle("active", index === categoryIndex);
  });

  loadModels();
  selectModel(0);

  // Add this line to toggle patterns section visibility
  togglePatternsSection();

  // Add this line to toggle model grid layout
  toggleModelGridLayout();
}

// Update your existing init function
function init() {
  loadModels();
  selectModel(0);
  selectPattern(0);

  // Add this line to set initial state
  togglePatternsSection();

  // Add this line to set initial grid layout
  toggleModelGridLayout();
}

function downloadGLB() {
  const model = categories[currentCategory].models[selectedModel];
  const link = document.createElement("a");
  link.href = model.src;
  // link.download = model.name + ".glb";
  link.download = model.capacity + ".glb";

  link.click();
}
async function captureScreenshot() {
  const modelViewer = document.querySelector("model-viewer");
  const canvas = await html2canvas(modelViewer); // html2canvas captures the element
  return canvas.toDataURL("image/png"); // return a data URL
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const model = categories[currentCategory].models[selectedModel];

  const modelViewer = document.querySelector("model-viewer");
  const canvas = await html2canvas(modelViewer);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("landscape", "pt", "a4");
  pdf.text(model.name, 40, 40);

  const pdfWidth = pdf.internal.pageSize.getWidth() - 80;
  const pdfHeight = pdf.internal.pageSize.getHeight() - 100;
  pdf.addImage(imgData, "PNG", 40, 60, pdfWidth, pdfHeight);

  pdf.save(model.name + ".pdf");
}

// Pattern texture URLs
const patternTextures = [
  "./50-ml/50ml-G.png",
  "./50-ml/50ml-R.png",
  "./50-ml/50ml-Y.png",
];

// let currentPatternTexture = patternTextures[0];

// Updated selectPattern function
function selectPattern(patternIndex) {
  selectedPattern = patternIndex;
  currentPatternTexture = patternTextures[patternIndex];

  // Update selected pattern in UI
  document.querySelectorAll(".pattern-item").forEach((item, index) => {
    item.classList.toggle("selected", index === patternIndex);
  });

  // Apply pattern texture to the 3D model
  applyPatternToModel();

  console.log(`Selected pattern ${patternIndex}`);
}

// Function to apply pattern texture to the model
// Function to apply pattern texture to the model
async function applyPatternToModel() {
  const modelViewer = document.querySelector("model-viewer");
  if (!modelViewer) return;

  // await modelViewer.model.updateComplete;

  const materials = modelViewer.model.materials;

  // Find your label material
  const labelMat = materials.find((m) =>
    m.name.toLowerCase().includes("texture_area")
  );
  if (!labelMat) {
    console.warn("⚠ No 'label' material found");
    return;
  }

  console.log("Applying pattern:", currentPatternTexture);

  // Use model-viewer's built-in texture loader
  const tex = await modelViewer.createTexture(currentPatternTexture);

  // Apply texture safely
  labelMat.pbrMetallicRoughness.baseColorTexture.setTexture(tex);

  // Force refresh
  modelViewer.requestUpdate();
}

// Function to apply texture to a specific mesh
function applyTextureToMesh(mesh) {
  const modelViewer = document.querySelector("model-viewer");

  if (!mesh.material) {
    console.error("Mesh has no material");
    return;
  }

  // Clone material to avoid affecting other meshes
  mesh.material = mesh.material.clone();

  console.log("Loading texture:", currentPatternTexture);

  // Load the image
  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = function () {
    console.log("✓ Texture image loaded");

    try {
      // Create a canvas texture
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Access Three.js through model-viewer's internal scene
      const scene = modelViewer.model;
      const THREE = scene.constructor;

      // Create Three.js texture
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      texture.wrapS = 1000; // RepeatWrapping
      texture.wrapT = 1000; // RepeatWrapping

      // Apply to material
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;

      console.log("✓ Texture applied successfully!");

      // Force render update
      modelViewer.requestUpdate();
    } catch (error) {
      console.error("Error creating texture:", error);
    }
  };

  img.onerror = function () {
    console.error("Failed to load texture image:", currentPatternTexture);
  };

  img.src = currentPatternTexture;
}

// Updated selectModel function - REPLACE your existing one
function selectModel(modelIndex) {
  selectedModel = modelIndex;
  const model = categories[currentCategory].models[modelIndex];

  // Update selected model in grid
  document.querySelectorAll(".model-item").forEach((item, index) => {
    item.classList.toggle("selected", index === modelIndex);
  });

  // Update model display
  document.getElementById("modelTitle").textContent = model.name;
  document.getElementById("modelCapacity").textContent = model.capacity;

  // Update model viewer
  const placeholder = document.getElementById("modelPlaceholder");
  placeholder.innerHTML = `<model-viewer 
        src="${model.src}" 
        alt="${model.name}" 
        auto-rotate 
        camera-controls 
        style="width: 100%; height: 100%;"
        id="viewer" disable-tap disable-pan
        >
    </model-viewer>`;

  // Wait for model-viewer to be created, then apply pattern
  setTimeout(() => {
    const newModelViewer = document.querySelector("model-viewer");
    if (newModelViewer) {
      newModelViewer.addEventListener(
        "load",
        () => {
          console.log("New model loaded, applying pattern...");
          applyPatternToModel();
        },
        { once: true }
      );
    }
  }, 100);
}

// Custom pattern upload handler
function handlePatternImport(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;

      // Add to pattern textures array
      patternTextures.push(imageUrl);

      // Create new pattern item in UI
      const patternGrid = document.querySelector(".pattern-grid");
      const newPattern = document.createElement("div");
      newPattern.className = "pattern-item";
      newPattern.style.background = `url(${imageUrl})`;
      newPattern.style.backgroundSize = "cover";
      newPattern.onclick = () => selectPattern(patternTextures.length - 1);
      patternGrid.appendChild(newPattern);

      // Automatically select and apply the new pattern
      selectPattern(patternTextures.length - 1);

      console.log(`Imported and applied pattern: ${file.name}`);
    };
    reader.readAsDataURL(file);
  }
}

// Initialize - call this after DOMContentLoaded or at the end of init()
function initPatternSystem() {
  console.log("Pattern system initialized");

  // Apply initial pattern after model loads
  setTimeout(() => {
    applyPatternToModel();
  }, 1500);
}

// Pattern texture configurations for different categories
const patternConfigs = {
  0: {
    // Round Container
    textures: [
      "./50-ml/50ml-G.png",
      "./50-ml/50ml-R.png",
      "./50-ml/50ml-Y.png",
    ],
  },
  1: {
    // Tamper Evident Rectangular
    textures: [
      "./50-ml/rectangle-green.png",
      "./50-ml/rectangle-red.png",
      "./50-ml/rectangle-yellow.png",
    ],
  },
  2: {
    // Sipper Glass (no patterns)
    textures: [],
  },
};

// Update pattern textures array to use current category
let currentPatternTexture = patternConfigs[0].textures[0];

// New function to update pattern grid based on category
// New function to update pattern grid based on category
function updatePatternGrid() {
  const patternGrid = document.querySelector(".pattern-grid");
  const currentPatterns = patternConfigs[currentCategory].textures;

  // Clear existing patterns
  patternGrid.innerHTML = "";

  // Add patterns for current category
  currentPatterns.forEach((textureUrl, index) => {
    const patternItem = document.createElement("div");
    patternItem.className = `pattern-item ${index === 0 ? "selected" : ""}`;
    patternItem.style.background = `url(${textureUrl})`;
    patternItem.style.backgroundSize = "cover";
    patternItem.style.backgroundRepeat = "repeat";

    // Apply custom size only for Tamper Evident Rectangular (category 1)
    if (currentCategory === 1) {
      patternItem.style.width = "106px";
      patternItem.style.height = "71px";
    }

    patternItem.onclick = () => selectPattern(index);

    patternGrid.appendChild(patternItem);
  });

  // Reset to first pattern of the category
  if (currentPatterns.length > 0) {
    selectedPattern = 0;
    currentPatternTexture = currentPatterns[0];
  }
}

// Modified selectPattern function
function selectPattern(patternIndex) {
  selectedPattern = patternIndex;
  const currentPatterns = patternConfigs[currentCategory].textures;

  if (currentPatterns.length === 0) return; // No patterns for this category

  currentPatternTexture = currentPatterns[patternIndex];

  // Update selected pattern in UI
  document.querySelectorAll(".pattern-item").forEach((item, index) => {
    item.classList.toggle("selected", index === patternIndex);
  });

  // Apply pattern texture to the 3D model
  applyPatternToModel();

  console.log(
    `Selected pattern ${patternIndex} for category ${currentCategory}`
  );
}

// Update your existing selectCategory function to include pattern grid update
function selectCategory(categoryIndex) {
  currentCategory = categoryIndex;
  selectedModel = 0;

  // Update active button
  document.querySelectorAll(".nav-btn").forEach((btn, index) => {
    btn.classList.toggle("active", index === categoryIndex);
  });

  loadModels();
  selectModel(0);

  // Update pattern grid for new category
  updatePatternGrid();

  // Toggle patterns section visibility
  togglePatternsSection();

  // Toggle model grid layout
  toggleModelGridLayout();
}

// Update your existing init function
function init() {
  loadModels();
  selectModel(0);

  // Initialize pattern grid
  updatePatternGrid();

  // Set initial state
  togglePatternsSection();
  toggleModelGridLayout();
}
