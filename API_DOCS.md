# Freelancer Marketplace API Documentation

## Base URL

`http://localhost:5000/api`

---

## Authentication APIs

### Register User

**POST** `/auth/register`

#### Request Body

```json
{
  "name": "Ubaid Awan",
  "email": "ubaid@gmail.com",
  "password": "123456",
  "role": "freelancer"
}
```

---

### Login User

**POST** `/auth/login`

#### Request Body

```json
{
  "email": "ubaid@gmail.com",
  "password": "123456"
}
```

---

### Get Profile

**GET** `/auth/profile`

#### Headers

```text
Authorization: Bearer <token>
```

---

## User APIs

### Get All Users

**GET** `/users`

---

### Get Single User

**GET** `/users/:id`

---

### Update Profile

**PUT** `/users/profile`

#### Headers

```text
Authorization: Bearer <token>
```

---

### Delete User

**DELETE** `/users/:id`

#### Headers

```text
Authorization: Bearer <token>
```

---

## Gig APIs

### Create Gig

**POST** `/gigs`

#### Headers

```text
Authorization: Bearer <freelancer-token>
```

#### Request Body

```json
{
  "title": "Node.js Backend Development",
  "description": "I will build a scalable backend",
  "price": 500,
  "category": "Web Development",
  "tags": ["NodeJS", "Express", "MongoDB"],
  "image": "https://example.com/image.jpg"
}
```

---

### Get All Gigs

**GET** `/gigs`

---

### Get Single Gig

**GET** `/gigs/:id`

---

### Get My Gigs

**GET** `/gigs/my-gigs/all`

#### Headers

```text
Authorization: Bearer <freelancer-token>
```

---

### Update Gig

**PUT** `/gigs/:id`

#### Headers

```text
Authorization: Bearer <freelancer-token>
```

---

### Delete Gig

**DELETE** `/gigs/:id`

#### Headers

```text
Authorization: Bearer <freelancer-token>
```

---

## Order APIs

### Create Order

**POST** `/orders/:gigId`

#### Headers

```text
Authorization: Bearer <client-token>
```

---

### Get My Orders

**GET** `/orders/my-orders`

#### Headers

```text
Authorization: Bearer <client-token>
```

---

### Get Received Orders

**GET** `/orders/received`

#### Headers

```text
Authorization: Bearer <freelancer-token>
```

---

### Update Order Status

**PATCH** `/orders/:id/status`

#### Headers

```text
Authorization: Bearer <freelancer-token>
```

#### Request Body

```json
{
  "status": "completed"
}
```

---

## Review APIs

### Create Review

**POST** `/reviews/:gigId`

#### Headers

```text
Authorization: Bearer <client-token>
```

#### Request Body

```json
{
  "rating": 5,
  "comment": "Excellent work and fast delivery"
}
```

---

### Get Gig Reviews

**GET** `/reviews/gig/:gigId`

---

## Dashboard APIs

### Dashboard Stats

**GET** `/dashboard/stats`

#### Headers

```text
Authorization: Bearer <token>
```

---

### Dashboard Revenue

**GET** `/dashboard/revenue`

#### Headers

```text
Authorization: Bearer <token>
```

---

### Recent Orders

**GET** `/dashboard/recent-orders`

#### Headers

```text
Authorization: Bearer <token>
```

---

### Recent Reviews

**GET** `/dashboard/recent-reviews`

#### Headers

```text
Authorization: Bearer <token>
```

---

## Authentication Requirements

Protected APIs require:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## Response Format

### Success Response

```json
{
  "success": true
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```
