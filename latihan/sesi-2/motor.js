var motor = [
    {
        merek:'Yamaha',
        jenis:'R25',
        CC:'250',
    }, 
    {
        merek:'Honda',
        jenis:'CBR',
        CC:'250',
    }, 
    {
        merek:'Suzuki',
        jenis:'GSX',
        CC:'250',
    }, 
    {
        merek:'Kawasaki',
        jenis:'ZX25',
        CC:'250'
    },
];
for (i=0; i<motor.length; i++){
    console.log('Motor ke- '+(i+1)+':');
    console.log('Merek: '+motor[i].merek);
    console.log('Jenis: '+motor[i].jenis);
    console.log('CC: '+motor[i].CC);
}