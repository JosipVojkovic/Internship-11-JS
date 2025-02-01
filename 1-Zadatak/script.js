let books = [];

while (true) {
  let title = "";
  let price = -1;
  let genre = "";
  const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

  while (title === "") {
    title = prompt(
      "Unesite naslov knjige ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (title === null) break;

    if (title === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (title === null) break;

  while (isNaN(price) || price <= 0 || !priceRegex.test(price.toString())) {
    price = prompt(
      "Unesite cijenu knjige ili pritisnite 'odustani' ('cancel') za kraj: "
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

  while (genre === "") {
    genre = prompt(
      "Unesite zanr knjige ili pritisnite 'odustani' ('cancel') za kraj: "
    );
    if (genre === null) break;

    if (genre === "") {
      alert("Unos ne smije biti prazan. Pokusajte ponovno.");
    }
  }
  if (genre === null) break;

  books.push({ title, price, genre });
}

if (books.length === 0) {
  console.log("Nema unesenih knjiga.");
} else {
  let averagePrice =
    books.reduce((sum, book) => sum + book.price, 0) / books.length;
  console.log(`Prosječna cijena knjiga: ${averagePrice.toFixed(2)}€`);

  books.forEach((book) => {
    book.deviation = Math.abs(book.price - averagePrice);
  });

  const maxDeviation = Math.max(...books.map((book) => book.deviation));
  const mostDeviantBook = books.find((book) => book.deviation === maxDeviation);

  console.log("\nKnjiga s najvećim odstupanjem:");
  console.log(
    `Naslov: ${mostDeviantBook.title}, Cijena: ${
      mostDeviantBook.price
    }, Žanr: ${
      mostDeviantBook.genre
    }, Odstupanje: ${mostDeviantBook.deviation.toFixed(2)}€`
  );

  const sortedBooks = [...books].sort((a, b) => b.deviation - a.deviation);

  console.log("\nKnjige sortirane prema odstupanju:");
  sortedBooks.forEach((book) => {
    console.log(
      `${book.title}: ${book.deviation.toFixed(2)}€ (Cijena: ${
        book.price
      }€, Žanr: ${book.genre})`
    );
  });
}
