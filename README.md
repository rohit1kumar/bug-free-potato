# Pet API

<!-- - Explain your implementation and tools/libraries used in README.md file in the repository
- Document the steps to get your code up and running on localhost
- If possible, deploy your solution to a service like heroku, aws, etc and use MongoDB Atlas (This step is optional, but will give you brownie points) -->

## API that takes an excel file as input, parses it and stores the data in the database and returns the data in JSON format, deployed on [Railway](https://pet.up.railway.app/)

---

## Getting Stated

### Clone the repository
    $ git clone https://github.com/rohit1kumar/bug-free-potato.git

### Install dependencies
    $ cd bug-free-potato
    $ npm install

### Run the server
    $ npm start



## Test the Endpoints on [Swagger](https://pet.up.railway.app/)

---

## API Endpoints

**POST /api/v1/pet**
- Add pet data to the database

Request Body:

- Upload the excel file using postman as `form-data` with key as `file` by selecting file option in postman.

Response Body:

```
    {
        "status": "success",
        "message": "Data added successfully"
    }
 ```

**GET /api/v1/pet**

- Get all the pet's data, with the following query parameters:
    - `name`- Name of the pet
    - `type`- Type of the pet
    - `breed`- Breed of the pet
    - `age`- Age of the pet

    - `page` - Page number (default: 1)
    - `limit` - Number of items per page (default: 10)
    - `sort` - Sort by `name`, `type`, `breed`, `age` (default: `CreatedAt`), use `-` before field name to sort in descending order (eg: `-name`)

Query Parameters:

```
    ?limit=20&sort=name
```
Response Body:

```
    {
        "status": "success",
        "nbHits": 2,
        "data": [
            {
                "_id": "6331c30c1915b32f0a3b1551",
                "name": "Abagail",
                "type": "Magpie, australian",
                "breed": "Gymnorhina tibicen",
                "age": 758,
                "createdAt": "2022-09-26T15:19:36.139Z"
            },
            {
                "_id": "6331c30c1915b32f0a3b12f7",
                "name": "Abbe",
                "type": "Sacred ibis",
                "breed": "Threskionis aethiopicus",
                "age": 156,
                "createdAt": "2022-09-26T15:19:36.139Z"
            }
        ]
    }
```

**GET /api/v1/pet/:id**

- Get a pet's data by id

Response Body:

```
    {
        "status": "success",
        "data": {
            "_id": "6331c30c1915b32f0a3b1551",
            "name": "Abagail",
            "type": "Magpie, australian",
            "breed": "Gymnorhina tibicen",
            "age": 758,
            "createdAt": "2022-09-26T15:19:36.139Z"
        }
    }
```

**PATCH /api/v1/pet/:id**

- Update a pet's data by id (only name, type, breed, age can be updated)

Request Body:

```
    {
        "name": "Abagail"
    }

```

Response Body:

```
{
    "status": "success",
    message: "Data updated successfully"
    "data": {
        "_id": "6331c30c1915b32f0a3b12fa",
        "name": "Abagail",
        "type": "American racer",
        "breed": "name",
        "age": 159,
        "createdAt": "2022-09-26T15:19:36.139Z"
    }
}
```

**DELETE /api/v1/pet/:id**

- Delete a pet's data by id

Response Body:

```
    {
        "status": "success",
        "message": "Data deleted successfully"
    }
```
