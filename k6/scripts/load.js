import http from 'k6/http';
import { check, sleep } from 'k6';

// Load: ramp 0->10 VUs over 10s, hold 10 VUs for 20s, ramp down over 10s.
// Confirms behavior under an expected, sustained level of concurrent traffic.
export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.02'],
  },
};

const BASE_URL = 'https://httpbin.org';

export default function () {
  // Each VU loops the scenario 3 times per iteration to generate sustained request volume.
  for (let i = 0; i < 3; i++) {
    const getRes = http.get(`${BASE_URL}/get`);
    check(getRes, { 'GET /get status is 200': (r) => r.status === 200 });

    const postRes = http.post(
      `${BASE_URL}/post`,
      JSON.stringify({ test: 'load', iteration: i }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    check(postRes, { 'POST /post status is 200': (r) => r.status === 200 });

    sleep(1);
  }
}
