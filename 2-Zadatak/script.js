let employees = [];

while (true) {
  let firstName = "";
  let lastName = "";
  let industry = "";
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

  while (industry === "") {
    industry = prompt(
      "Unesite industriju u kojoj radi zaposlenik ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (industry === null) break;

    if (industry === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (industry === null) break;

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

  employees.push({ firstName, lastName, industry, salary });
}

if (employees.length === 0) {
  console.log("Nema unesenih zaposlenika.");
} else {
  const industryStats = {};

  employees.forEach((employee) => {
    if (!industryStats[employee.industry]) {
      industryStats[employee.industry] = {
        totalSalary: 0,
        count: 0,
        employees: [],
      };
    }

    industryStats[employee.industry].totalSalary += employee.salary;
    industryStats[employee.industry].count++;
    industryStats[employee.industry].employees.push(employee);
  });

  const filteredIndustries = Object.entries(industryStats)
    .filter(([_, data]) => data.count >= 2)
    .map(([name, data]) => ({
      name,
      average: data.totalSalary / data.count,
      count: data.count,
      employees: data.employees,
    }));

  filteredIndustries.sort((a, b) => a.name.localeCompare(b.name));

  if (filteredIndustries.length === 0) {
    console.log("Nema industrija s najmanje dva zaposlenika.");
  } else {
    console.log("Statistika po industrijama:");
    filteredIndustries.forEach((industry) => {
      console.log(`\nIndustrija: ${industry.name}`);
      console.log(`Prosječna plaća: ${industry.average.toFixed(2)}€`);
      console.log(`Broj zaposlenih: ${industry.count}`);
      console.log("Zaposlenici:");
      industry.employees.forEach((emp) => {
        console.log(
          `- ${emp.firstName} ${emp.lastName}: ${emp.salary.toFixed(2)}€`
        );
      });
    });
  }
}
