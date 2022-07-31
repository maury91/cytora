# Star Wars explorer

This project uses SWAPI in order to display information about the Star Wars lore.

## Installation

To install all the dependencies simply run
```bash
yarn
```

## Starting the app

To start the app simply run
```bash
yarn start
```

## How Caching works

Caching is done through 2 levels:

The first level is the entity caching, singular entities are cached, this means that if an entity was returned in a list when the entity will be needed by itself outside of the list no call to the server for that single entity will be needed.

The second level is API caching, this caching is provided by RTK Query and every call the API is cached to avoid making the exact same call in the future. This is useful when searching or getting the list of People.

## Frameworks and libraries used

### Create-react-app

Create-react-app has been used to bootstrap the project, it provides the basic tools to run a simple React App

### Redux Toolkit

Redux toolkit is the recommended way to work with Redux, in this project two main functionalities of Redux Toolkit are used:

#### Redux Toolkit Slices

A slice is an automatically generated part of the state, the main difference with classic Redux is that in the reducer the state must be mutated. Actions are auto-generated

### Redux Toolkit Query

Redux toolkit provides a system to make and cache queries ( and mutations ), the queries are cached has one, entities across queries are not cached.

In order to cache entities across queries data must be normalised and accessed before runnign the query. This is what  hooks like `useGetPlanetQuery` do. 

### React Router

React router has been used for routing

### Bootstrap

I would normally prefer to use Material UI, but the Test description said to use a CSS Framework and Bootstrap is very minimalistic and uses nearly no Javascript.

## Testing

Testing is done through Jest, meeting 100% of coverage wasn't the goal so I avoided writing similar tests and instead I provided a test for each type of testing.

* _src/components/Error.test.tsx_ this file contains a simple example of snapshot testing. The Error component has no logic inside of it so a simple snapshot to test it is enough.
* _src/components/Search.test.tsx_ this file contains an example of testing a user journey. The Search component has some inside state and business logic, a simple snapshot would not be enough, so the component is rendered and used like the user would use it.
* _src/store/favorite/favorite.test.s_ this file contains an example of how to test a Redux slice.