# Back-End

<h2> Root URL: https://be-sleeptracker.herokuapp.com/api </h2>

| Method | Description                           | Endpoint             |
| ------ | ------------------------------------- | -------------------- |
| POST   | Create a user account                 | /auth/register       |
| POST   | Login a user                          | /auth/login          |
| POST   | Create a Sleep Entry                  | /users/:id/sleeptracker   |
| GET    | Get List of Entries                   | /users/:id/sleeptracker |
| GET    | Get Single Sleep Entry                | /users/:id/sleeptracker/:sleepid |
| PUT    | Update Sleep Entry                    | /users/:id/sleeptracker/:sleepid      |
| DELETE | Delete Sleep Entry                    | /users/:id/sleeptracker/:sleepid      |

<h2> User  Register/Login Structure </h2>

### Users Table

| Key      | Type    | Required                |
| -------- | ------- | ----------------------- |
| id       | integer | Yes (server controlled) |
| username | string  | Yes                     |
| password | string  | Yes                     |

When registering and logging in, body should look like this
```
{
  username: 'string'
  password: 'string'
}
```
<h2> Sleep Tracker Set-Up </h2>

### Sleep Tracker Table

| Key      | Type    | Required                |
| -------- | ------- | ----------------------- |
| id       | integer | Yes (server controlled) |
| start_time | datetime  | Yes |
| end_time  | datetime   | Yes |
| total_hours | integer | Yes (May Try to get the server to do this)|
| awakeness | integer| Yes (Controlled by Front End)|
| user_id   | integer | Yes (Foreign Key)

When posting a new entry, body should look as follows
```
{
  start_time: Date
  end_time: Date
  total_hours: (start_time - end_time)
  awakeness: TBD
  user_id: #(Comes back in body of login)
}
```

## Register (Non-protected)
**HTTP Method:** *Post*
**URL:** */auth/register*

This path will register a new user and should return a 201 status message along with the new username and hashed password.

## Responses
```
Code: 201 (Created)
{
    "username": "jsmith",
    "password": "hashedpassword"
 }
```
Code: 500 (Internal Server Error)
```
{
  "message": "Internal Server Error, Error Returned: <error>"
}
```

## Login (Non-Protected)
**HTTP Method:** *Post*
**URL:**  */auth/login*

This will log you in and not only return a 200 message, but a token that you will need to store in local storage.

### Example
```
{
  username: "jsmith",
  password: "jsmith",
}
```
### Responses
Code: 200 (Successful Login)
```
{
  "message": "Ready for tracking data"
  "user_id": 3,
  "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6InRpbSIsImlhdCI6MTU5Nzk1NTQzNCwiZXhwIjoxNTk3OTU5MDM0fQ.8JfIJ_OPYPLImqcVYrFXX70Fz-sw1RtVPD1eor0VEXI
}
```
Code: 401 (Unauthorized)
```
{
  "message": "Invalid username or password"
}
```

Code: 500 (Internal Server Error)
```
{
  "message": "Internal Server Error, Error Returned: <error>"
}
```

## Create a New Entry (Protected)
**HTTP Method:** *Post*

**URL:** */user/:id/sleeptracker*

Creates a new sleep entry

### Example
```
{
  {
	"start_time": "2020-08-25 04:47:47",
	"end_time": "2020-08-25 10:47:47",
	"total_hours": (difference of start_time and end_time),
  	"awakeness": Based on Emoji rating,
	"user_id": 1(need this to add to correct user. get this from body of login) **Required**
}
```
### Responses
Code: 200 (Successful)
```
{
  "id": 1,
  "user_id": 1,
  "username": "check",
  "start_time": "2020-08-25 04:47:47",
  "end_time": "2020-08-25 10:47:47",
  "total_hours": 7,
  "awakeness": 4
}
```
Code: 401 (Unauthorized)
```
{
  message: "Not authorized"
}
```
Code: 500 (Internal Error)
```
{
  message: "API Error", error: err.message
}
```
### Get Requests
**HTTP Method:** *Get*

**URL:** */user/:id/sleeptracker*

Gets list of entries from a particular users

### Responses

Code: 200 (Successful Retrieval)
```
  [
    {
      "id": 1,
      "user_id": 1,
      "username": "check",
      "start_time": "2020-08-25 04:47:47",
      "end_time": "2020-08-25 10:47:47",
      "total_hours": 7,
      "awakeness": 4
    },
    {
      "id": 2,
      "user_id": 1,
      "username": "check",
      "start_time": "2020-08-25 04:47:47",
      "end_time": "2020-08-25 10:47:47",
      "total_hours": 7,
      "awakeness": 4
    },
    {
      "id": 3,
      "user_id": 1,
      "username": "check",
      "start_time": "2020-08-25 04:47:47",
      "end_time": "2020-08-25 10:47:47",
      "total_hours": 7,
      "awakeness": 4
    }
  ]
```
Code: 401 (Unauthorized)
```
{
  message: "Not authorized"
}
```
Code: 404 (Not Found)
```
{
message: "This user does not exist"
}
```
Code: 500 (Internal Error)
```
{
message: "API Error", error: err.message
}
```
**URL:** */users/:id/sleeptracker/:sleepid*

Retrieves a single Entry

### Responses

Code: 200 (Successful Retrieval)
```
{
  "id": 1,
  "user_id": 1,
  "username": "check",
  "start_time": "2020-08-25 04:47:47",
  "end_time": "2020-08-25 10:47:47",
  "total_hours": 7,
  "awakeness": 4
}
```
Code: 401 (Unauthorized)
```
{
  message: "Not authorized"
}
```
Code: 404 (Not Found)
```
{
  message: "This user does not exist"
}

or

{
 message: "No entry exists with this ID for this User"
}
```
###Put Requests
**HTTP Method:** *Put*

**URL:** */users/:id/sleeptracker/:sleepid*

Edits a single entry

### Example
```
{
  	"start_time": "2020-08-25 04:47:47",
  	"end_time": "2020-08-25 10:47:47",
  	"total_hours": 6,
    "awakeness": 4,
  	"user_id": 1
}
```

###Resposnes
Code: 200 (Successful Edit)
```
[
  {
    "id": 1,
    "user_id": 1,
    "username": "check",
    "start_time": "2020-08-25 04:47:47",
    "end_time": "2020-08-25 10:47:47",
    "total_hours": 6,
    "awakeness": 4
  }
]
```

Code: 404 (Not Found)
```
{
  message: "This user does not exist"
}

or

{
 message: "No entry exists with this ID for this User"
}
```
Code 500 (Internal Error)
```
{
  message: "API Error", error: err.message
}
```

### Delete Requests
**HTTP Method:** *Delete*
**URL:** */users/:id/sleepdtracker/:sleepid*

Deletes a single entry

### Response
Code: 200 (Succesfully Deleted Task)
```
{
  message: The entry has been removed
}
```

Code: 404 (Not Found)
```
{
  message: "This user does not exist"
}

or

{
 message: "No entry exists with this ID for this User"
}
```
Code 500 (Internal Error)
```
{
  message: "API Error", error: err.message
}
```
