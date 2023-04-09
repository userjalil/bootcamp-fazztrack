const homes = [
    {
        id: 1,
        type: '45',
        jenis: 'Modern',
        warna: 'Coral',
    },
    {
        id: 2,
        type: '54',
        jenis: 'Minimalis',
        warna: 'Navy Blue',
    },
    {
        id: 3,
        type: '60',
        jenis: 'Kondotel',
        warna: 'Celery',
    },
    {
        id: 4,
        type: '70',
        jenis: 'Cluster',
        warna: 'Abu',
    }
]

const findAllHomes = (req, res) => {
    const data = homes;
    const result = {
        status: "ok",
        data: data,
    };
    res.json(result);
};

const getHomesById = (req, res) => {
    const { id } = req.params
    let home
    for (let i = 0; i < homes.length; i++) {
        if (homes[i].id === Number(id)) {
            home = homes[i]
        }
    }
    if (home === undefined) {
        return res.status(404).json({
            status: 'failed',
            message: `data ${id} not found`
        })
    }
    res.json({ status: 'ok', data: home })
};

module.exports = { findAllHomes, getHomesById };