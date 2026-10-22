import http from 'k6/http';
import { check, sleep } from 'k6';

// Smoke: 1 VU, 10s — proves the scenario itself is correct before spending any real load budget.
export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'https://httpbin.org';

export default function smokeTest() {
  const getRes = http.get(`${BASE_URL}/get`);
  check(getRes, {
    'GET /get status is 200': (r) => r.status === 200,
    'GET /get response time < 500ms': (r) => r.timings.duration < 500,
  });

  const postRes = http.post(
    `${BASE_URL}/post`,
    JSON.stringify({ test: 'smoke' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(postRes, {
    'POST /post status is 200': (r) => r.status === 200,
    'POST /post response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}

