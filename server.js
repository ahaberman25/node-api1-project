const express = require("express")

const server = express()

server.use(express.json())

let users = [
	{ id: "1", name: "Jane Doe", "bio": "I am a Dinosaur" },
	{ id: "2", name: "John Doe", "bio": "I am a Caveman" },
	{ id: "3", name: "Jack Doe", "bio": "I am a Poptart" },
]

// GET USERS
server.get("/users", (req, res) => {
	function getUsers() {
        return users
    }
	res.json(getUsers())
})

// GET BY ID
server.get("/users/:id", (req, res) => {
    
    function getUserById(id) {
        return users.find(u => u.id === id)
    }

    const user = getUserById(req.params.id)

	if (user) {
		res.json(user)
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

// ADD NEW USER
server.post("/users", (req, res) => {
	if (!req.body.name || !req.body.bio) {
		return res.status(400).json({
			message: "You are missing the name or bio",
		})
    }
    
    function createUser(data) {
        const payload = {
            id: String(users.length + 1),
            ...data,
        }
    
        users.push(payload)
        return payload
    }

	const newUser = createUser({
        name: req.body.name,
        bio: req.body.bio,
	})

	res.status(201).json(newUser)
})

// UPDATE USER
server.put("/users/:id", (req, res) => {

    function updateUser(id, data) {
        const index = users.findIndex(u => u.id === id)
        users[index] = {
            ...users[index],
            ...data,
        }
        
        return users[index]
    }

    function getUserById(id) {
        return users.find(u => u.id === id)
    }

	const user = getUserById(req.params.id)

	if (user) {
		const updatedUser = updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio,
		})

		res.json(updatedUser)
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

// DELETE USER
server.delete("/users/:id", (req, res) => {

    function getUserById(id) {
        return users.find(u => u.id === id)
    }

	const user = getUserById(req.params.id)

    function deleteUser(id) {
        users = users.filter(u => u.id != id)
    }

	if (user) {
		deleteUser(user.id)
		res.status(204).end()
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

server.listen(5000, () => {
	console.log("server started on port 5000")
})