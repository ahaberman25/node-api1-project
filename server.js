const express = require("express")

const server = express()

server.use(express.json())

let users = [
	{ id: "1", name: "Jane Doe" },
	{ id: "2", name: "John Doe" },
	{ id: "3", name: "Jack Doe" },
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
	// never trust data coming from the client,
	// always validate it to some degree. make sure it's what you're expecting
	if (!req.body.name) {
		return res.status(400).json({
			message: "Need a name for the user",
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