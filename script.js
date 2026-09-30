const products = [
  {name:"Cutlass", category:"Equipment & Spares", price:5100, note:"Farm tool"},
  {name:"Indorama Urea", category:"Fertilizers", price:3700, note:"Solid fertilizer"},
  {name:"Dangote Urea", category:"Fertilizers", price:3700, note:"Solid fertilizer"},
  {name:"NPK 15:15 Golden", category:"Fertilizers", price:5500, note:"Solid fertilizer"},
  {name:"NPK 20:20 Golden", category:"Fertilizers", price:48000, note:"Solid fertilizer"},
  {name:"Dragon 1L", category:"Fast-acting Herbicides", price:3700, note:"Kills weeds faster down to the roots"},
  {name:"ParaQ 1L", category:"Fast-acting Herbicides", price:3700, note:"Kills weeds faster down to the roots"},
  {name:"Fieldklear 1L", category:"Fast-acting Herbicides", price:6500, note:"Kills weeds faster down to the roots"},
  {name:"Express Pro 5L", category:"Fast-acting Herbicides", price:18000, note:"Kills weeds faster down to the roots"},
  {name:"Express Pro 1L", category:"Fast-acting Herbicides", price:3700, note:"Kills weeds faster down to the roots"},
  {name:"Fieldklear Pro", category:"Fast-acting Herbicides", price:3300, note:"Fast-acting weed control"},
  {name:"Clampdown 1L", category:"Fast-acting Herbicides", price:3900, note:"Kills weeds faster down to the roots"},
  {name:"Bush Klear 1L", category:"Slow-acting Herbicides", price:3200, note:"Kills weeds slowly down to the roots"},
  {name:"Bush Klear 5L", category:"Slow-acting Herbicides", price:16500, note:"Kills weeds slowly down to the roots"},
  {name:"Force Up 1L", category:"Slow-acting Herbicides", price:2800, note:"Kills weeds slowly down to the roots"},
  {name:"Razedown 1L", category:"Slow-acting Herbicides", price:3200, note:"Kills weeds slowly down to the roots"},
  {name:"Nwura Wura 1L", category:"Slow-acting Herbicides", price:3000, note:"Kills weeds slowly down to the roots"},
  {name:"Uproot 1L", category:"Slow-acting Herbicides", price:3100, note:"Kills weeds slowly down to the roots"},

  // Products below are in the catalogue but do not yet have a published price.
  ...["Legume Force","Best","Daquashi","Avtar","Owonderful","Organic Booster","Rocket","Magic Force","Relisate","Sun-winner","XPressPro","Reactive Force","Dress Force","Aceta","Organic Maize","Supergrow","Royauron","Atraforce","DD Force","Striker","Pest Off","Reaper","Sniper","Relimine","Boots","Sprayers","Crossfire","Razer","Sharpshooter","Royazate","Cypeforce","Zap","Cypermethrin","Lambdacal","Lara Force","Lara Force Gold","Sprayer Spare Parts","Dragon Super","Gallant Power Plus","Grazor","Roya 2-4-D","Agric Seeds","Royatrazine","Chase","Force Toxin","Push Out","Red Force","Clamp Down","Field Klear Pro","Cypergreen","NPK 15.15.15","NPK 20.10.10"].map(name => ({
    name,
    category: /NPK|Urea/i.test(name) ? "Fertilizers" :
              /seed/i.test(name) ? "Seeds" :
              /sprayer|spare|cutlass/i.test(name) ? "Equipment & Spares" :
              /booster|supergrow|formaize|organic/i.test(name) ? "Other Agro Inputs" :
              "Pesticides & Insecticides",
    price:null,
    note:"Price available on WhatsApp"
  }))
];

const waNumber = "2347035593362";
let activeCategory = "All";
let searchTerm = "";

const money = n => n == null ? "Contact for price" : `₦${n.toLocaleString("en-NG")}`;

function waLink(productName){
  const text = `Hello IDUN-NU AGBE, I want to order ${productName}. Please confirm availability and total price.`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}

function render(){
  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const haystack = `${p.name} ${p.category} ${p.note}`.toLowerCase();
    return matchesCategory && haystack.includes(searchTerm.toLowerCase());
  });

  document.getElementById("resultCount").textContent = `${filtered.length} product${filtered.length===1?"":"s"} found`;
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  grid.innerHTML = "";
  empty.hidden = filtered.length !== 0;

  filtered.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-top"><span class="product-category">${p.category}</span></div>
      <h3>${p.name}</h3>
      <p class="product-note">${p.note}</p>
      <div class="price">${money(p.price)}${p.price != null ? "<small> / listed price</small>" : ""}</div>
      <a class="order-btn" href="${waLink(p.name)}" target="_blank" rel="noopener">Order on WhatsApp →</a>
    `;
    grid.appendChild(card);
  });
}

function setCategory(category){
  activeCategory = category;
  document.querySelectorAll(".category-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.category === category));
  document.querySelectorAll(".chip").forEach(btn => btn.classList.toggle("active", btn.dataset.category === category));
  render();
}

const categories = ["All","Fast-acting Herbicides","Slow-acting Herbicides","Fertilizers","Pesticides & Insecticides","Seeds","Equipment & Spares","Other Agro Inputs"];
const chips = document.getElementById("categoryChips");
categories.forEach(cat => {
  const b = document.createElement("button");
  b.className = "chip" + (cat === "All" ? " active" : "");
  b.dataset.category = cat;
  b.textContent = cat;
  b.addEventListener("click", () => setCategory(cat));
  chips.appendChild(b);
});

document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => setCategory(btn.dataset.category));
});

document.getElementById("searchInput").addEventListener("input", e => {
  searchTerm = e.target.value.trim();
  render();
});

document.getElementById("clearFilters").addEventListener("click", () => {
  searchTerm = "";
  activeCategory = "All";
  document.getElementById("searchInput").value = "";
  setCategory("All");
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();
render();
