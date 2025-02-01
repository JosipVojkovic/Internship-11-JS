let employees = [];

while (true) {
  let firstName = "";
  let lastName = "";
  let sector = "";
  let salary = 0;

  const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

  while (firstName === "") {
    firstName = prompt(
      "Unesite ime zaposlenika ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (firstName === null) break;

    if (firstName === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (firstName === null) break;

  while (lastName === "") {
    lastName = prompt(
      "Unesite prezime zaposlenika ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (lastName === null) break;

    if (lastName === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (lastName === null) break;

  while (sector === "") {
    sector = prompt(
      "Unesite sektor u kojem radi zaposlenik ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (sector === null) break;

    if (sector === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (sector === null) break;

  while (isNaN(salary) || salary <= 0 || !priceRegex.test(salary.toString())) {
    salary = prompt(
      "Unesite placu zaposlenika ili pritisnite 'odustani' ('cancel') za kraj: "
    );

    if (salary === null) break;

    salary = parseFloat(salary);

    if (isNaN(salary)) {
      alert("Unos nije broj. Pokusajte ponovno.");
    } else if (salary <= 0) {
      alert(
        "Unos ne smije biti broj manji ili jednak nuli. Pokusajte ponovno."
      );
    } else if (!priceRegex.test(salary.toString())) {
      alert(
        "Unos mora biti broj manji od 3 decimale (npr. 10, 10.5 ili 10.55). Pokusajte ponovno."
      );
    }
  }
  if (salary === null) break;

  employees.push({ firstName, lastName, sector, salary });
}

if (employees.length === 0) {
  console.log("Nema unesenih zaposlenika.");
} else {
  let totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

  let sectorStats = {};

  employees.forEach((employee) => {
    if (!sectorStats[employee.sector]) {
      sectorStats[employee.sector] = { totalSalary: 0, employees: [] };
    }
    sectorStats[employee.sector].totalSalary += employee.salary;
    sectorStats[employee.sector].employees.push(employee);
  });

  let sectorSummary = Object.keys(sectorStats).map((sector) => {
    let totalSectorSalary = sectorStats[sector].totalSalary;
    let sectorPercentage = (totalSectorSalary / totalSalary) * 100;

    return {
      sector,
      totalSectorSalary,
      sectorPercentage,
      employees: sectorStats[sector].employees,
    };
  });

  sectorSummary.sort((a, b) => b.sectorPercentage - a.sectorPercentage);

  console.log(`Ukupna plaća svih zaposlenika: ${totalSalary.toFixed(2)}€`);
  console.log("------------------------------");

  sectorSummary.forEach((sector) => {
    console.log(`Sektor: ${sector.sector}`);
    console.log(
      `Ukupna plaća sektora: ${sector.totalSectorSalary.toFixed(2)}€`
    );
    console.log(
      `Doprinos sektora ukupnoj plaći: ${sector.sectorPercentage.toFixed(2)}%`
    );
    console.log("Zaposlenici i njihov doprinos unutar sektora:");

    sector.employees.forEach((employee) => {
      let employeePercentage =
        (employee.salary / sector.totalSectorSalary) * 100;
      console.log(
        ` - ${employee.firstName} ${
          employee.lastName
        }: ${employee.salary.toFixed(2)}€ (${employeePercentage.toFixed(2)}%)`
      );
    });

    console.log("------------------------------");
  });
}
