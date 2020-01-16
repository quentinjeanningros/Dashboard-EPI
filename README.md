# DEV_dashboard_2019

The Rtype is a 4-week school project in which we were asked to produce a networkable videogame according to the desires of the user.

It is a project realized in CPP (Boost and Sfml).

This platform was developed by **Kevin SPEGT** and **Quentin JEANNINGROS**, 3rd year students {EPITECH} Strasbourg.

## Installation

The dashboard is a containerized project by docker and therefore requires its deployment. To run the following command :

```
$ docker-compose up --build
```

All services are defined and modifiable in the `docker-compose.yml` file.

## Infrastructure

The project is broken down into three parts: `front-end`, `back-end` and `database`.

The front-end: developed in React.js, the whole of the sources are in / client. By default, the front listens on the port `:8080`.

The Back-end: developed in Node.js, all sources are in / server. By default, the back listens on the port `:5000`.

The database: developed with MariaDB and managed by mysql, all the sources are in / db. By default, the database listens on the port `:3306`.

# List of Services and Widgets

### Authentification

The use of the dashboard requires the authentication of the user.

This authentication requires creating a user account. To do this:

- **POST** `/users`

    Description: Register a user account.

    Parameters:

    ```
    {
        username: string
        password: string
    }
    ```

    Response:

    ```
    {
        message: string
    }
    ```

- **POST** `/login`

    Description: Login a user to dashboard.

    Parameters:

    ```
    {
        username: string
        password: string
    }
    ```

    Response:

    ```
    {
        message: string
        token: string
    }
    ```

This token is necessary to make all other request to back-end.

### Service Weather

Authorization token is necessary to make these requests.

- #### Located weather

    **GET** `/weather/:city`

    Description: Get weather for located `:city`.

    Response:

    ```
    {
        temp: {
            temp: float
            temp_min: float
            temp_max: float
        },
        atmosphere: {
            pressure: float
            humidity: float
        },
        wind: {
            wind_speed: float
            wind_deg: float
        }
    }
    ```

### Service Cocktails

Authorization token is necessary to make these requests.

- #### Search cocktail by name

    **GET** `/cocktail/searchCocktail/:cocktail`

    Description: Get cocktail recipe and description for `:cocktail`.

    Response:

    ```
    {
        valid: boolean
        name: string
        instructions: string
        recipe: [string]
    }
    ```

- #### Search cocktail by ingredient

    **GET** `/cocktail/searchIngredients/:ingredient/:qty`

    Description: Get cocktail `:qty` possibilities for `:ingredient`.

    Response:

    ```
    {
        valid: boolean
        drinks: [string]
    }
    ```

### Service Strasbourg

Authorization token is necessary to make these requests.

- #### Parkings status

    **GET** `/parking/:parking`

    Description: Get `:parking` status.

    Response:

    ```
    {
        state: string
        empty: int
        total: int
    }
    ```

### Service Pokemon

Authorization token is necessary to make these requests.

- #### Search pokemon informations

    **GET** `/pokemon/pokedex/:pokemon`

    Description: Get `:pokemon` informations form pokedex.

    Response:

    ```
    {
        valid: boolean
        name: string
        id : int
        weight: int
        height: int
        type: string
        sprite: string
    }
    ```

- #### Search types affinities

    **GET** `/pokemon/types/:type`

    Description: Get `:type` affinities.

    Response:

    ```
    {
        valid: boolean
        name: string
        double_damage_from: [string]
        half_damage_from: [string]
        no_damage_from: [string]
        double_damage_to: [string]
        half_damage_to: [string]
        no_damage_to: [string]
    }
    ```




