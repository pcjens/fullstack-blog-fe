const blogs = [
    {
        "id": "5bfb0a56c6ab3d1bff3d5d16",
        "title": "Something Great",
        "author": "McAuthorist",
        "url": "example.com/new",
        "likes": 2,
        "user": {
            "_id": "5bfae6fcf38e4364afee4e0f",
            "username": "newuser",
            "name": "New user"
        }
    },
    {
        "id": "5bfb31817f7394056617ca42",
        "title": "Something Great IV",
        "author": "McAuthorist",
        "url": "see.here",
        "likes": 0,
        "user": {
            "_id": "5bfae6fcf38e4364afee4e0f",
            "username": "newuser",
            "name": "New user"
        }
    },
    {
        "id": "5bfb33da7f7394056617ca45",
        "title": "Amazing Book",
        "author": "McAuthorist",
        "url": "book.buy",
        "likes": 0,
        "user": {
            "_id": "5bfae6fcf38e4364afee4e0f",
            "username": "newuser",
            "name": "New user"
        }
    },
    {
        "id": "5bfc7b117e820a7657369fef",
        "title": "My Own Mock Blog",
        "author": "Another User",
        "url": "hah.com",
        "likes": 11,
        "user": {
            "_id": "5bfc7a447e820a7657369fee",
            "username": "anotheruser",
            "name": "Another user"
        }
    },
    {
        "id": "5bfc7b9d7e820a7657369ff0",
        "title": "let's see",
        "author": "again",
        "url": "letsee",
        "likes": 1,
        "user": {
            "_id": "5bfc7a447e820a7657369fee",
            "username": "anotheruser",
            "name": "Another user"
        }
    },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (token) => {}

export default { getAll, setToken, blogs }
