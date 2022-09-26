# Pet API

## API that takes an excel file as input, parses it and stores the data in the database and returns the data in JSON format.
**Deployed on [Railway](https://pet.up.railway.app/). Test the endpoints on [Swagger](https://pet.up.railway.app/)**

### Tools/Libraries used :
    multer  -  To upload the excel file
    xlsx    -  To parse the excel file

### Implementation :
    1.  The excel file is uploaded using multer
    2.  The excel file is parsed using xlsx into a JSON object
    3.  The data is stored in the database
    4.  The data is returned in JSON format
---


## Steps to run the code :

### Clone the repository
    $ git clone https://github.com/rohit1kumar/bug-free-potato.git

### Install dependencies & run
    $ cd bug-free-potato
    $ npm install && npm start

### Go to http://localhost:3000/ to see the app running.

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
