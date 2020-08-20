# Back-End
  
<h2> Root URL: https://be-sleeptracker.herokuapp.com/api </h2>

| Method | Description                           | Endpoint             |
| ------ | ------------------------------------- | -------------------- |
| POST   | Create a user account                 | /auth/register       |
| POST   | Login a user                          | /auth/login          |
| POST   | Create a Sleep Entry                  | /users/sleeptracker   |
| GET    | Get List of Entries                   | /users/:id/sleeptracker |
| PUT    | Update Sleep Entry                    | /users/sleeptracker/:id      |
| DELETE | Delete Sleep Entry                    | /users/sleeptracker/:id      |

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
| start_time | date  | Yes                     |
| end_time  | date   | Yes
| total_hours | integer | Yes (May Try to get the server to do this)|
| awakeness | integer| Yes (Will be frontend controlled) |
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
