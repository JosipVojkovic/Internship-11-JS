document
  .getElementById("equipmentForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let price = parseFloat(document.getElementById("price").value).toFixed(2);
    let status = document.getElementById("status").value;

    if (!name || isNaN(price) || price <= 0) {
      alert("Molimo unesite ispravan naziv i cijenu!");
      return;
    }

    equipment.push({ name, price, status });

    document.getElementById("equipmentForm").reset();

    updateEquipmentList();
  });

let equipment = [];

function updateEquipmentList() {
  let listElement = document.getElementById("equipmentList");
  listElement.innerHTML = "";

  equipment.sort((a, b) => {
    if (a.status !== b.status) return a.status === "dostupno" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  equipment.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} € (${item.status})`;
    li.className = item.status === "dostupno" ? "available" : "unavailable";
    listElement.appendChild(li);
  });

  let availableCount = equipment.filter(
    (item) => item.status === "dostupno"
  ).length;
  let unavailableCount = equipment.filter(
    (item) => item.status === "nedostupno"
  ).length;
  let totalCount = equipment.length;

  document.getElementById(
    "ratio"
  ).textContent = `Dostupno: ${availableCount}, Nedostupno: ${unavailableCount}, Omjer: ${(
    (availableCount / totalCount) *
    100
  ).toFixed(2)}% dostupno.`;
}
