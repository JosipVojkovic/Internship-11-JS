document.getElementById("processCities").addEventListener("click", function () {
  let input = prompt("Unesite nazive gradova odvojene zarezom:");

  if (!input) {
    alert("Morate unijeti barem jedan grad!");
    return;
  }

  let cities = input
    .split(",")
    .map((city) => city.trim())
    .filter((city) => city.length > 0);

  if (cities.length === 0) {
    alert("Niste unijeli ispravan popis gradova!");
    return;
  }

  cities.sort((a, b) => a.localeCompare(b));

  const filteredCities = cities.filter((city) => city.length > 5);

  const csvData = filteredCities.join(", ");

  document.getElementById("output").textContent =
    csvData || "Nema gradova s više od 5 slova.";

  document.getElementById("downloadBtn").onclick = function () {
    if (filteredCities.length === 0) {
      alert("Nema podataka za preuzimanje!");
      return;
    }
    const blob = new Blob([csvData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gradovi.txt";
    link.click();
  };
});
