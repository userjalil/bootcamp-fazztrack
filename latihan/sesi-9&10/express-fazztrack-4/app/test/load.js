const http = require('k6/http')
const { Counter } = require('k6/metrics')
const { check, sleep } = require('k6')

let ErrorCounter = new Counter('errors')

export const options = {
    stages: [
        // Ramp-up from 1 to 5 VUs in 10s
        { duration: '10s', target: 700 },

        // Stay at rest on 5 VUs for 5s
        { duration: '15s', target: 700 },

        // Ramp-down from 5 to 0 VUs for 5s
        { duration: '20s', target: 0 }
    ],
    thresholds: {
        errors: ['count<10']
    }
}

export default function () {
    const endpoint = Math.random() < 0.9 ? 'products' : 'users'
    let res = http.get(`http://localhost:8080/${endpoint}/`)
    let success = check(res, {
        'status is 200': (r) => r.status === 200
    })
    if (!success) {
        ErrorCounter.add(1)
    }

    sleep(2)
}
