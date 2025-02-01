let students = [];

while (true) {
  let firstName = "";
  let lastName = "";
  let points = -1;

  while (firstName === "") {
    firstName = prompt(
      "Unesite ime studenta ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (firstName === null) break;

    if (firstName === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (firstName === null) break;

  while (lastName === "") {
    lastName = prompt(
      "Unesite prezime studenta ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (lastName === null) break;

    if (lastName === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (lastName === null) break;

  while (isNaN(points) || points < 0 || points > 100) {
    points = prompt(
      "Unesite broj bodova studenta ili pritisnite 'odustani' ('cancel') za kraj: "
    );

    if (points === null) break;

    points = Math.round(parseFloat(points));

    if (isNaN(points)) {
      alert("Unos nije broj. Pokusajte ponovno.");
    } else if (points < 0 || points > 100) {
      alert(
        "Unos ne smije biti broj manji od 0 ili veci od 100. Pokusajte ponovno."
      );
    }
  }
  if (points === null) break;

  students.push({ firstName, lastName, points });
}

if (students.length === 0) {
  console.log("Nema unesenih studenata.");
} else {
  let categories = {
    "0-25%": [],
    "25-50%": [],
    "50-75%": [],
    "75-100%": [],
  };

  students.forEach((student) => {
    let percentage = student.points;

    if (percentage <= 25) {
      categories["0-25%"].push(student);
    } else if (percentage <= 50) {
      categories["25-50%"].push(student);
    } else if (percentage <= 75) {
      categories["50-75%"].push(student);
    } else {
      categories["75-100%"].push(student);
    }
  });

  for (let key in categories) {
    categories[key].sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  let averageScores = {};
  for (let key in categories) {
    let total = categories[key].reduce(
      (sum, student) => sum + student.points,
      0
    );
    let count = categories[key].length;
    averageScores[key] = count > 0 ? (total / count).toFixed(2) : "N/A";
  }

  console.log("Kategorije studenata prema rezultatima testova:");

  for (let key in categories) {
    console.log(`\nKategorija: ${key}`);
    console.log(`Prosjecni bodovi: ${averageScores[key]}`);
    if (categories[key].length === 0) {
      console.log("Nema studenata u ovoj kategoriji.");
    } else {
      categories[key].forEach((student) => {
        console.log(
          `${student.lastName}, ${student.firstName} - ${student.points} bodova`
        );
      });
    }
  }
}
