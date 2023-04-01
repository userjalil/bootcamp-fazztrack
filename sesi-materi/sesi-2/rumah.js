var rumah = [
    {
        type:'45',
        jenis:'Modern',
        warna:'Coral',
    }, 
    {
        type:'54',
        jenis:'Minimalis',
        warna:'Navy Blue',
    }, 
    {
        type:'60',
        jenis:'Kondotel',
        warna:'Celery',
    }, 
    {
        type:'70',
        jenis:'Cluster',
        warna:'Abu',
    },
];
for (i=0; i<rumah.length; i++){
    console.log('Rumah ke- '+(i+1)+':');
    console.log('Type Rumah: '+rumah[i].type);
    console.log('Jenis: '+rumah[i].jenis);
    console.log('Warna: '+rumah[i].warna);
}