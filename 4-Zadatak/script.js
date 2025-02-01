let plants = [];

while (true) {
  let name = "";
  let color = "";
  const colors = [
    "plava",
    "crvena",
    "žuta",
    "zelena",
    "narančasta",
    "ljubičasta",
    "roza",
    "crna",
    "siva",
    "bijela",
    "smeđa",
  ];
  let calories = 0;

  while (name === "") {
    name = prompt(
      "Unesite ime biljke ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (name === null) break;

    if (name === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (name === null) break;

  while (!colors.includes(color.toLowerCase())) {
    color = prompt(
      `Unesite boju biljke (plava, crvena, žuta, zelena, narančasta, ljubičasta, roza, crna, siva, bijela ili smeđa)
       ili pritisnite 'odustani' ('cancel') za kraj: `
    );
    if (color === null) break;

    if (color === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    } else if (!colors.includes(color.toLowerCase())) {
      alert("Unesena boja ne postoji. Pokusajte ponovno.");
    }
  }
  if (color === null) break;

  while (isNaN(calories) || calories <= 0) {
    calories = prompt(
      "Unesite kalorije biljke ili pritisnite 'odustani' ('cancel') za kraj: "
    );

    if (calories === null) break;

    calories = Math.round(parseFloat(calories));

    if (isNaN(calories)) {
      alert("Unos nije broj. Pokusajte ponovno.");
    } else if (calories <= 0) {
      alert(
        "Unos ne smije biti broj manji ili jednak nuli. Pokusajte ponovno."
      );
    }
  }
  if (calories === null) break;

  plants.push({ name, color, calories });
}

if (plants.length === 0) {
  console.log("Nema unesenih biljaka.");
} else {
  let colorGroups = {};

  plants.forEach((plant) => {
    if (!colorGroups[plant.color]) {
      colorGroups[plant.color] = { totalCalories: 0, plants: [] };
    }
    colorGroups[plant.color].totalCalories += plant.calories;
    colorGroups[plant.color].plants.push(plant.name);
  });

  let sortedColors = Object.keys(colorGroups).sort();

  let topColors = Object.entries(colorGroups)
    .sort((a, b) => b[1].totalCalories - a[1].totalCalories)
    .slice(0, 3);

  console.log("Biljke grupirane prema boji:");
  sortedColors.forEach((color) => {
    console.log(`Boja: ${color}`);
    console.log(`Ukupne kalorije: ${colorGroups[color].totalCalories}`);
    console.log(`Biljke: ${colorGroups[color].plants.join(", ")}`);
    console.log("------------------------------");
  });

  console.log("Top 3 boje s najvećim kalorijskim doprinosom:");
  topColors.forEach(([color, data], index) => {
    console.log(
      `${index + 1}. Boja: ${color} - ${data.totalCalories} kalorija`
    );
  });
}
