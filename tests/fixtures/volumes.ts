/** Google Books API v1 volumes shaped like real responses (the live API rate-limits CI IPs). */
export const dune = {
  kind: "books#volume",
  id: "B1hSG45JCX4C",
  etag: "dune",
  selfLink: "https://www.googleapis.com/books/v1/volumes/B1hSG45JCX4C",
  volumeInfo: {
    title: "Dune",
    subtitle: "Deluxe Edition",
    authors: ["Frank Herbert"],
    publisher: "Penguin",
    publishedDate: "2005-08-02",
    description: "<p>Set on the desert planet <b>Arrakis</b>, Dune is the story of Paul Atreides.</p>",
    industryIdentifiers: [
      { type: "ISBN_10", identifier: "0441013597" },
      { type: "ISBN_13", identifier: "9780441013593" },
    ],
    pageCount: 528,
    categories: ["Fiction"],
    averageRating: 4.5,
    ratingsCount: 2391,
    imageLinks: {
      smallThumbnail: "http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5",
      thumbnail: "http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1",
    },
    previewLink: "http://books.google.com/books?id=B1hSG45JCX4C",
    infoLink: "http://books.google.com/books?id=B1hSG45JCX4C",
  },
};

export const goodOmens = {
  kind: "books#volume",
  id: "lHXbDwAAQBAJ",
  etag: "omens",
  selfLink: "https://www.googleapis.com/books/v1/volumes/lHXbDwAAQBAJ",
  volumeInfo: {
    title: "Good Omens",
    authors: ["Terry Pratchett", "Neil Gaiman", "A. N. Other"],
    publishedDate: "1990",
    industryIdentifiers: [{ type: "ISBN_10", identifier: "0060853980" }],
    pageCount: 412,
    categories: ["Fantasy", "Humor"],
    imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=lHXbDwAAQBAJ&img=1&zoom=5" },
  },
};

/** A sparse record: no authors, pages, categories, identifiers or images. */
export const bare = {
  kind: "books#volume",
  id: "bareVolume01",
  etag: "bare",
  selfLink: "https://www.googleapis.com/books/v1/volumes/bareVolume01",
  volumeInfo: { title: "Untitled Manuscript" },
};

export const volumes = [dune, goodOmens, bare];
