# DENZL

> The must-watch Denzel's movies

- [DENZL](#denzl)
  - [🎯 Objectives of the project](#%f0%9f%8e%af-objectives-of-the-project)
  - [👩‍💻 Installation](#%f0%9f%91%a9%e2%80%8d%f0%9f%92%bb-installation)
  - [Definition and Configuration](#definition-and-configuration)
    - [Definition](#definition)
  - [🏃‍♀️ Usage](#%f0%9f%8f%83%e2%80%8d%e2%99%80%ef%b8%8f-usage)
    - [REST & GraphQL endpoints](#rest--graphql-endpoints)
      - [`GET /movies/populate/:id`](#get-moviespopulateid)
      - [`GET /movies`](#get-movies)
      - [`GET /movies/:id`](#get-moviesid)
      - [`GET /movies/search`](#get-moviessearch)
      - [POST /movies/:id](#post-moviesid)
    - [GraphQL implemented](#graphql-implemented)
      - [Here are the endpoints with the schema](#here-are-the-endpoints-with-the-schema)
    - [Bonus - The Client side](#bonus---the-client-side)
    - [Todo:](#todo)

## 🎯 Objectives of the project

**Build a REST and GRAPHQL API to get the must-watch Denzel's movies, as well as a client app**.

## 👩‍💻 Installation

1. Fork the project via `github`

2. Clone your forked repository project `https://github.com/YOUR_USERNAME/denzel`

```sh
❯ cd /path/to/workspace
❯ git clone git@github.com:YOUR_USERNAME/denzel.git
```

2. **To launch the APIs (with nodemon)**:

```sh
❯ cd /server
❯ npm run dev
```

3. **To launch the client (React app)**:

```sh
❯ cd /client
❯ npm start
```

## Definition and Configuration

### Definition

- A **must-watch** movie is a movie with a `metascore` higher than `70`.
- API's are listening locally on the port `9292`.
- Data is stored in a [MongoDB Atlas cluster](https://www.mongodb.com/cloud/atlas).
- The APIs are Dockerized and hosted on Heroku.
- To test and check your API, I used a client called [Insomnia](https://insomnia.rest).
- The front-end is deployed with [Netlify](https://www.netlify.com).

## 🏃‍♀️ Usage

### REST & GraphQL endpoints

#### `GET /movies/populate/:id`

Populate the database with all the [Denzel's movies from IMDb](https://www.imdb.com/name/nm0000243).

```sh
❯ curl -H "Accept: application/json" http://localhost:9292/movies/populate/nm0000243
{
  "total": 58
}
```

#### `GET /movies`

Fetch a random **must-watch** movie.

```sh
❯ curl -H "Accept: application/json" http://localhost:9292/movies
{
  "link": "https://www.imdb.com/title/tt0765429/?ref_=nm_flmg_act_15",
  "id": "tt0765429",
  "metascore": 76,
  "poster": "https://m.media-amazon.com/images/M/MV5BMjFmZGI2YTEtYmJhMS00YTE5LWJjNjAtNDI5OGY5ZDhmNTRlXkEyXkFqcGdeQXVyODAwMTU1MTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "rating": 7.8,
  "synopsis": "An outcast New York City cop is charged with bringing down Harlem drug lord Frank Lucas, whose real life inspired this partly biographical film.",
  "title": "American Gangster (2007)",
  "votes": 376.889,
  "year": 2007
}
```

#### `GET /movies/:id`

Fetch a specific movie.

```sh
❯ curl -H "Accept: application/json" http://localhost:9292/movies/tt0477080
{
  "link": "https://www.imdb.com/title/tt0477080/?ref_=nm_flmg_act_11",
  "id": "tt0477080",
  "metascore": 69,
  "poster": "https://m.media-amazon.com/images/M/MV5BMjI4NDQwMDM0N15BMl5BanBnXkFtZTcwMzY1ODMwNA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "rating": 6.8,
  "synopsis": "With an unmanned, half-mile-long freight train barreling toward a city, a veteran engineer and a young conductor race against the clock to prevent a catastrophe.",
  "title": "Unstoppable (2010)",
  "votes": 177.986,
  "year": 2010
}
```

#### `GET /movies/search`

Search for Denzel's movies.

This endpoint accepts the following optional query string parameters:

- `limit` - number of movies to return (default: 5)
- `metascore` - filter by metascore (default: 0)

The results array is sorted by metascore in descending way.

```sh
❯ curl -H "Accept: application/json" http://localhost:9292/movies/search?limit=5&metascore=77
{
  "limit": 5,
  "total": 3,
  "results": [
  {
    "id": "tt2671706",
    "link": "https://www.imdb.com/title/tt2671706/?ref_=nm_flmg_act_3",
    "metascore": 79,
    "poster": "https://m.media-amazon.com/images/M/MV5BOTg0Nzc1NjA0MV5BMl5BanBnXkFtZTgwNTcyNDQ0MDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 7.2,
    "synopsis": "A working-class African-American father tries to raise his family in the 1950s, while coming to terms with the events of his life.",
    "title": "Fences (2016)",
    "votes": 84.291,
    "year": 2016
  },
  {
    "id": "tt0115956",
    "link": "https://www.imdb.com/title/tt0115956/?ref_=nm_flmg_act_31",
    "metascore": 77,
    "poster": "https://m.media-amazon.com/images/M/MV5BODJlOTlkNzUtN2U2OC00NWUxLTg3MjgtNGVmZGU5ZTk0ZjM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 6.6,
    "synopsis": "A U.S. Army officer, despondent about a deadly mistake he made, investigates a female chopper commander's worthiness for the Medal of Honor.",
    "title": "À l'épreuve du feu (1996)",
    "votes": 46.271,
    "year": 1996
  },
  {
    "id": "tt0112857",
    "link": "https://www.imdb.com/title/tt0112857/?ref_=nm_flmg_act_32",
    "metascore": 78,
    "poster": "https://m.media-amazon.com/images/M/MV5BNjI3NjFiNmMtMmQ1ZC00OTUwLWJlMWMtM2UxY2M2NDQ0OWJhXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 6.7,
    "synopsis": "An African-American man is hired to find a woman, and gets mixed up in a murderous political scandal.",
    "title": "Le diable en robe bleue (1995)",
    "votes": 15.686,
    "year": 1995
  }]
}
```

#### POST /movies/:id

Save a watched date and a review.

This endpoint accepts the following post parameters:

- `date` - the watched date
- `review` - the personal review

```sh
❯ curl -X POST -d '{"date": "2019-03-04", "review": "😍 🔥"}' -H "Content-Type: application/json" http://localhost:9292/movies/tt0328107
{
  "_id": "507f191e810c19729de860ea"
}
```

### GraphQL implemented

Same definitions as REST API with `/graphql` endpoint.

- Populate the database
- Fetch a random **must-watch** movie
- Fetch a specific movie
- Search for Denzel's movies
- Save a watched date and a review.

#### Here are the endpoints with the schema

```js
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString
    },
    populate: {
      type: populateType,
      args: {
        id: { type: GraphQLString }
      }
    },
    randomMovie: {
      type: movieType
    },
    movie: {
      type: movieType,
      args: {
        id: { type: GraphQLString }
      }
    },
    searchMovie: {
      type: movieSearchType,
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
        metascore: { type: GraphQLInt, defaultValue: 0 }
      }
    },
    postReview: {
      type: movieIdType,
      args: {
        id: { type: GraphQLString },
        date: { type: GraphQLString, defaultValue: null },
        review: { type: GraphQLString, defaultValue: null }
      }
    }
  }
```

```sh
❯ curl -d '{"query": "randomMovie {link metascore synopsis title year}"}' -H "Content-Type: application/json" http://localhost:9292/graphql
{
  "data": {
    "movie": {
      "link": "https://www.imdb.com/title/tt0174856/?ref_=nm_flmg_act_23",
      "metascore": 74,
      "synopsis": "The story of Rubin \"Hurricane\" Carter, a boxer wrongly imprisoned for murder, and the people who aided in his fight to prove his innocence.",
      "title": "Hurricane Carter (1999)",
      "year": 1999
    }
  }
}
```

### Bonus - The Client side

Built a client side web application.

The app is made as such:

You can search through **either one of the two APIs**, and select a **limit** and a **metascore** threshold.

- If the limit is 1, it fetches a random **must-watch movie.**
- Else, it uses the search movies endpoint to:

  - display the title
  - display the synopsis
  - display the cover
  - display the metascore
  - display the review
  - allow to open the IMDb record
