# donation-api-v2
Donation API

## Stack
*Language : Javascript(nodejs)*
*Framework : Expressjs*
*Database: MongoDB, Mongoose*

## Features
- Signup (JWT in cookie)
- Login (JWT in cookie)

### Donors
- Notify Admin
- See Own Donations

### Admin
- Get All donations
- Verify Donations
- Reject Donations with note
- Disburse Donations
- Get Breakdown
- Get Own Donations


# Routes
## Auth Routes
### Signup User
- Route: api/v2/auth/signup
- Method: POST
- Body: 
```
{
    "email": "testing@gmail.com",
    "password": "testing",
    "firstname": "Testing",
    "lastname": "Surname",
    "role": "admin" || undefined,
    "adminCode": adminCode || undefined
}
```
- Response:
```
{
    "status": "Success",
    "data": {
        "user": {
            "email": "testing@gmail.com",
            "firstname": "Testing",
            "lastname": "Surname",
            "role": "admin",
            "_id": "6476fb24b108c9f663fd8e3f",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NmZiMjRiMTA4YzlmNjYzZmQ4ZTNmIiwiaWF0IjoxNjg1NTE5MTQxLCJleHAiOjE2OTMyOTUxNDF9.sFnfo9UNHO_ycxwGbfwz-ZmktwijhxKR8vdGc4I5cso",
        "pendingDonations": [] || undefined (if not admin)
    }
}
```

### Login
- Route: api/v2/auth/login
- Method: POST
- Body: 
```
{
    "email": "testing@gmail.com",
    "password": "testing"
}
```

- Response:
```
{
    "status": "Success",
    "data": {
        "user": {
            "_id": "6476fb24b108c9f663fd8e3f",
            "email": "testing@gmail.com",
            "firstname": "Testing",
            "lastname": "Surname",
            "role": "admin",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NmZiMjRiMTA4YzlmNjYzZmQ4ZTNmIiwiaWF0IjoxNjg1NTMxMzE5LCJleHAiOjE2OTMzMDczMTl9.-v59eYhbwUVwYFnxApqs1fO2CKCupL29z5XGtKMHuto",

        "pendingDonations": [] || undefined (if not admin)
    }
}
```
### Forget Password
- Route: api/v2/auth/forgotPassword
- Method: PATCH
- Body: 
```
{
    "email": "testing@gmail.com"
}
```

- Response:
```
{
    "status": "success",
    "message": "Token sent to mail http://localhost:4040/api/v2/auth/resetpassword/13ead9591bb6040f378ff9ce778372f2487e771b7b82ce5d7b8ccf871b3c5c1e"
}
```

### Reset Password
- Route: api/v2/auth/resetpassword/13ead9591bb6040f378ff9ce778372f2487e771b7b82ce5d7b8ccf871b3c5c1e
- Method: PATCH
- Body: 
```
{
    "password": "zuzu",
    "confirmPassword": "zuzu"
}
```

- Response:
```
{
    "status": "Success",
    "data": {
        "user": {
            "_id": "6476fb24b108c9f663fd8e3f",
            "email": "testing@gmail.com",
            "firstname": "Testing",
            "lastname": "Surname",
            "role": "admin",
            "__v": 0,
            "passwordResetExpiry": null,
            "passwordToken": null
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3NmZiMjRiMTA4YzlmNjYzZmQ4ZTNmIiwiaWF0IjoxNjg1NTM5MjEwLCJleHAiOjE2OTMzMTUyMTB9.BhhP-cj4al2wMQNwYzNtvha8KcmAXbBjMWCvMeSpFDk",
        "pendingDonations": []
    }
}
```
## User Routes
### Notify Admin
- Route: api/v2/user/notify
- Method: POST
- Body: 
```
{
    "amount": 5000,
    "date": "2023-06-08"
}
```

- Response:
```
{
    "status": "success",
    "message": "Admin will be notified, and you will receive a response soon"
}
```
## Admin Routes
### Get All Donations
- Route: api/v2/admin/donations
- Method: GET

- Response:
```
{
    "status": "success",
    "data": {
        "donations": [
            {
                "_id": "6477a3e3dd19733f43fd2989",
                "amount": 5000,
                "date": "2023-06-08T00:00:00.000Z",
                "donor_id": "6476fb24b108c9f663fd8e3f",
                "verified": "pending",
                "__v": 0
            }
        ]
    }
}
```
### Get My Donations
- Route: api/v2/admin/my-donations
- Method: GET

- Response:
```
{
    "status": "success",
    "message": "User donations gotten successfully!",
    "data": {
        "donations": []
    }
}
```
### Verify Donations
- Route: api/v2/admin/verify/:donation-id
- Method: PATCH

- Response:
```
{
    "status": "success",
    "message": "Donation verification successful!"
}
```
### Disburse
- Route: api/v2/admin/disburse
- Method: PATCH
- Body:
```
{
    "amount": 20000
}
```

- Response:
```
{
    "status": "success",
    "message": "Donation Breakdown",
    "data": {
        "breakdown": {
            "_id": "6477b19dc9d43d68e1fc66b8",
            "total": 90000,
            "disbursed": 40000,
            "balance": 50000
        }
    }
}
```
### Reject Donations
- Route: api/v2/admin/decline/:donation-id
- Method: POST
- Body:
```
  {
    "note": "Please correct the amount you specified in your donation"
    }
```

- Response:

```
{
    "status": "success",
    "message": "Donation decline with note"
}
```