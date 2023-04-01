const users = [
    { id: 1, firstname: 'nama1', alamat: 'alamat nama1' },
    { id: 2, firstname: 'nama2', alamat: 'alamat nama2' },
    { id: 3, firstname: 'nama3', alamat: 'alamat nama3' }
]

const findAllusers = (req, res) => {
    const data = users;
   
    const result = {
      status: "ok",
      data: data,
    };
    res.json(result);
  };

  const getUsersById = (req, res) => {
    const { id } = req.params
    let user
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === Number(id)) {
        user = users[i]
      }
    }
    if (user === undefined) {
      return res.status(404).json({ status: 'failed', message: `data ${id} not found` })
    }
    res.json({ status: 'ok', data: user })
  };
 
module.exports = { findAllusers, getUsersById };
