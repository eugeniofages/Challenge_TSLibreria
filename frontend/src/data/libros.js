const libros = [
    {
      "nombre": "Dune",
      "autor": "Frank Herbert",
      "descripcion": "A complex and multifaceted tale set in a distant future"
    },
    {
      "nombre": "Foundation",
      "autor": "Isaac Asimov",
      "descripcion": "A series of interconnected stories that explore the rise and fall of civilizations"
    },
    {
      "nombre": "Neuromancer",
      "autor": "William Gibson",
      "descripcion": "A groundbreaking novel that popularized the cyberpunk genre"
    },
    {
      "nombre": "1984",
      "autor": "George Orwell",
      "descripcion": "A dystopian novel set in a totalitarian society"
    },
    {
      "nombre": "Brave New World",
      "autor": "Aldous Huxley",
      "descripcion": "A classic work of dystopian fiction"
    },
    {
      "nombre": "The Hitchhiker's Guide to the Galaxy",
      "autor": "Douglas Adams",
      "descripcion": "A comedic science fiction series"
    },
    {
      "nombre": "Ender's Game",
      "autor": "Orson Scott Card",
      "descripcion": "A story of a child prodigy trained to fight an alien race"
    },
    {
      "nombre": "The Martian",
      "autor": "Andy Weir",
      "descripcion": "A tale of survival on Mars"
    },
    {
      "nombre": "Snow Crash",
      "autor": "Neal Stephenson",
      "descripcion": "A cyberpunk novel set in a near-future America"
    },
    {
      "nombre": "I, Robot",
      "autor": "Isaac Asimov",
      "descripcion": "A collection of interconnected stories exploring the ethics of artificial intelligence"
    },
    {
      "nombre": "The War of the Worlds",
      "autor": "H.G. Wells",
      "descripcion": "A pioneering work of alien invasion fiction"
    },
    {
      "nombre": "Fahrenheit 451",
      "autor": "Ray Bradbury",
      "descripcion": "A dystopian novel set in a future where books are banned"
    },
    {
      "nombre": "The Time Machine",
      "autor": "H.G. Wells",
      "descripcion": "A tale of time travel and the distant future of humanity"
    },
    {
      "nombre": "Do Androids Dream of Electric Sheep?",
      "autor": "Philip K. Dick",
      "descripcion": "The basis for the film Blade Runner, it explores the nature of humanity and artificial intelligence"
    },
    {
      "nombre": "The Dispossessed",
      "autor": "Ursula K. Le Guin",
      "descripcion": "A novel set in a future where two planets represent capitalist and anarchist societies"
    },
    {
      "nombre": "The Left Hand of Darkness",
      "autor": "Ursula K. Le Guin",
      "descripcion": "A tale of a genderless society and the complexities of human relationships"
    },
    {
      "nombre": "Starship Troopers",
      "autor": "Robert A. Heinlein",
      "descripcion": "A military science fiction novel that explores themes of war and citizenship"
    },
    {
      "nombre": "The Forever War",
      "autor": "Joe Haldeman",
      "descripcion": "A story of an interstellar war and the effects of time dilation"
    },
    {
      "nombre": "The Handmaid's Tale",
      "autor": "Margaret Atwood",
      "descripcion": "A dystopian novel set in a patriarchal society"
    },
    {
      "nombre": "I Am Legend",
      "autor": "Richard Matheson",
      "descripcion": "A post-apocalyptic vampire novel"
    },
    {
      "nombre": "Hyperion",
      "autor": "Dan Simmons",
      "descripcion": "A space opera that weaves together multiple storylines"
    },
    {
      "nombre": "The Stand",
      "autor": "Stephen King",
      "descripcion": "A post-apocalyptic novel of a world decimated by a deadly virus"
    },
    {
      "nombre": "The Dune Chronicles",
      "autor": "Frank Herbert",
      "descripcion": "A series of science fiction novels set in the Dune universe"
    },
    {
      "nombre": "Childhood's End",
      "autor": "Arthur C. Clarke",
      "descripcion": "A story of humanity's transformation under the influence of an alien race"
    },
    {
      "nombre": "The Moon is a Harsh Mistress",
      "autor": "Robert A. Heinlein",
      "descripcion": "A tale of a lunar colony's struggle for independence from Earth"
    },
    {
      "nombre": "Ringworld",
      "autor": "Larry Niven",
      "descripcion": "A novel that explores a massive artificial ring around a distant star"
    },
    {
      "nombre": "The Road",
      "autor": "Cormac McCarthy",
      "descripcion": "A post-apocalyptic tale of a father and son's journey across a desolate landscape"
    },
    {
      "nombre": "A Wrinkle in Time",
      "autor": "Madeleine L'Engle",
      "descripcion": "A children's science fiction novel that explores the concept of time travel"
    },
    {
      "nombre": "The War of the End of the World",
      "autor": "Mario Vargas Llosa",
      "descripcion": "A historical fiction novel set during a rebellion in 19th century Brazil"
    },
    {
      "nombre": "The Andromeda Strain",
      "autor": "Michael Crichton",
      "descripcion": "A techno-thriller about a team of scientists investigating a deadly extraterrestrial microorganism"
    },
    {
      "nombre": "Doomsday Book",
      "autor": "Connie Willis",
      "descripcion": "A time travel novel that explores the effects of a pandemic in the past"
    },
    {
      "nombre": "The Three-Body Problem",
      "autor": "Liu Cixin",
      "descripcion": "The first in a trilogy that explores humanity's first contact with an alien civilization"
    },
    {
      "nombre": "A Canticle for Leibowitz",
      "autor": "Walter M. Miller Jr.",
      "descripcion": "A post-apocalyptic novel set in a future where the Catholic Church preserves human knowledge"
    },
    {
      "nombre": "The Giver",
      "autor": "Lois Lowry",
      "descripcion": "A dystopian novel set in a society where all memories are erased"
    },
    {
      "nombre": "The Windup Girl",
      "autor": "Paolo Bacigalupi",
      "descripcion": "A biopunk novel set in a future where energy is scarce"
    },
    {
      "nombre": "The Man in the High Castle",
      "autor": "Philip K. Dick",
      "descripcion": "An alternate history novel set in a world where the Axis powers won World War II"
    },
    {
      "nombre": "Red Mars",
      "autor": "Kim Stanley Robinson",
      "descripcion": "The first in a trilogy that explores the colonization and terraforming of Mars"
    },
    {
      "nombre": "The Diamond Age",
      "autor": "Neal Stephenson",
      "descripcion": "A cyberpunk novel set in a future where nanotechnology is prevalent"
    },
    {
      "nombre": "The Forever War",
      "autor": "Joe Haldeman",
      "descripcion": "A story of an interstellar war and the effects of time dilation"
    },
    {
      "nombre": "The Handmaid's Tale",
      "autor": "Margaret Atwood",
      "descripcion": "A dystopian novel set in a patriarchal society"
    },
    {
      "nombre": "I Am Legend",
      "autor": "Richard Matheson",
      "descripcion": "A post-apocalyptic vampire novel"
    },
    {
      "nombre": "Hyperion",
      "autor": "Dan Simmons",
      "descripcion": "A space opera that weaves together multiple storylines"
    },
    {
      "nombre": "The Stand",
      "autor": "Stephen King",
      "descripcion": "A post-apocalyptic novel of a world decimated by a deadly virus"
    },
    {
      "nombre": "The Dune Chronicles",
      "autor": "Frank Herbert",
      "descripcion": "A series of science fiction novels set in the Dune universe"
    },
    {
      "nombre": "Childhood's End",
      "autor": "Arthur C. Clarke",
      "descripcion": "A story of humanity's transformation under the influence of an alien race"
    },
    {
      "nombre": "The Moon is a Harsh Mistress",
      "autor": "Robert A. Heinlein",
      "descripcion": "A tale of a lunar colony's struggle for independence from Earth"
    },
    {
      "nombre": "Ringworld",
      "autor": "Larry Niven",
      "descripcion": "A novel that explores a massive artificial ring around a distant star"
    },
    {
      "nombre": "The Road",
      "autor": "Cormac McCarthy",
      "descripcion": "A post-apocalyptic tale of a father and son's journey across a desolate landscape"
    },
    {
      "nombre": "A Wrinkle in Time",
      "autor": "Madeleine L'Engle",
      "descripcion": "A children's science fiction novel that explores the concept of time travel"
    }
  ]


  export default  libros