let equipment = [];

while (true) {
  let name = "";
  let price = -1;
  let status = "";
  const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

  while (name === "") {
    name = prompt(
      "Unesite ime opreme ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (name === null) break;

    if (name === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (name === null) break;

  while (isNaN(price) || price <= 0 || !priceRegex.test(price.toString())) {
    price = prompt(
      "Unesite cijenu opreme ili pritisnite 'odustani' ('cancel') za kraj: "
    );

    if (price === null) break;

    price = parseFloat(price);

    if (isNaN(price)) {
      alert("Unos nije broj. Pokusajte ponovno.");
    } else if (price <= 0) {
      alert(
        "Unos ne smije biti broj manji ili jednak nuli. Pokusajte ponovno."
      );
    } else if (!priceRegex.test(price.toString())) {
      alert(
        "Unos mora biti broj manji od 3 decimale (npr. 10, 10.5 ili 10.55). Pokusajte ponovno."
      );
    }
  }
  if (price === null) break;

  while (status.toLowerCase() !== "da" && status.toLowerCase() !== "ne") {
    status = prompt(
      "Unesite 'Da' ako je oprema dostupna, unesite 'Ne' ako je nedostupna ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (status === null) break;

    if (status === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    } else if (status.toLowerCase() !== "da" && status.toLowerCase() !== "ne") {
      alert("Unos mora biti 'Da' ili 'Ne'. Pokusajte ponovno.");
    }
  }
  if (status.toLowerCase() === "da") {
    status = true;
  } else if (status.toLowerCase() === "ne") {
    status = false;
  } else if (status === null) break;

  equipment.push({ name, price, status });
}

if (equipment.length === 0) {
  console.log("Nema unesene opreme.");
} else {
  let unavailableIndexes = equipment
    .map((item, index) => (!item.status ? index : -1))
    .filter((index) => index !== -1);
  console.log("Indeksi nedostupne opreme:", unavailableIndexes.join(","));

  let availableEquipment = equipment
    .filter((item) => item.status)
    .sort((a, b) => a.price - b.price);

  let cheap = availableEquipment.filter((item) => item.price <= 30);
  let medium = availableEquipment.filter(
    (item) => item.price > 30 && item.price <= 200
  );
  let expensive = availableEquipment.filter((item) => item.price > 200);

  console.log("Jeftina oprema:", cheap);
  console.log("Srednja oprema:", medium);
  console.log("Skupa oprema:", expensive);

  let totalValue = equipment.reduce((acc, item) => acc + item.price, 0);
  let unavailableValue = equipment
    .filter((item) => !item.status)
    .reduce((acc, item) => acc + item.price, 0);

  let unavailablePercentage = ((unavailableValue / totalValue) * 100).toFixed(
    2
  );
  console.log(
    "Postotak vrijednosti nedostupne opreme: " + unavailablePercentage + "%"
  );
}
