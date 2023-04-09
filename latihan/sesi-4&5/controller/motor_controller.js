// const users = [
//     { id: 1, firstname: 'nama1', alamat: 'alamat nama1' },
//     { id: 2, firstname: 'nama2', alamat: 'alamat nama2' },
//     { id: 3, firstname: 'nama3', alamat: 'alamat nama3' }
// ]
const motors = [
  {
    id: 1,  
    merek:'Yamaha',
    jenis:'R25',
    CC:'250',
  }, 
  {
    id: 2,
    merek:'Honda',
    jenis:'CBR',
    CC:'250',
  }, 
  {
    id: 3,
    merek:'Suzuki',
    jenis:'GSX',
    CC:'250',
  },
  {
    id: 4,
    merek:'Kawasaki',
    jenis:'ZX25',
    CC:'250'
  }
]

const findAllMotors = (req, res) => {
    const data = motors;
   
    const result = {
      status: "ok",
      data: data,
    };
    res.json(result);
  };

  const getMotorsById = (req, res) => {
    const { id } = req.params
    let motor
    for (let i = 0; i < motors.length; i++) {
      if (motors[i].id === Number(id)) {
        motor = motors[i]
      }
    }
    if (motor === undefined) {
      return res.status(404).json({ status: 'failed', message: `data ${id} not found` })
    }
    res.json({ status: 'ok', data: motor })
  };
 
module.exports = { findAllMotors, getMotorsById };
