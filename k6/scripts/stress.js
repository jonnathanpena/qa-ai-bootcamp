import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Educational stress test: the goal is to locate the breaking point, not to sustain peak load.
// Intentionally has NO pass/fail threshold on error rate — a stress test characterizes failure,
// it doesn't assert it stays below a bar.
export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 20 },
    { duration: '10s', target: 30 },
    { duration: '10s', target: 40 },
  ],
};

const BASE_URL = 'https://httpbin.org';
const errorRate = new Trend('error_rate');

export function setup() {
  console.log(
    'This stress test is designed to find the breaking point, not to destroy the target. ' +
      'When error rate exceeds 5%, the test operator should pause and investigate ' +
      '(mirroring Kruger/Amdocs finding: 13/14 endpoints collapsed at 9-29 VUs).'
  );
}

export default function () {
  let failures = 0;
  const totalRequests = 2;

  const getRes = http.get(`${BASE_URL}/get`);
  const getOk = check(getRes, { 'GET /get status is 200': (r) => r.status === 200 });
  if (!getOk) failures++;

  const postRes = http.post(
    `${BASE_URL}/post`,
    JSON.stringify({ test: 'stress' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  const postOk = check(postRes, { 'POST /post status is 200': (r) => r.status === 200 });
  if (!postOk) failures++;

  // Recorded per-iteration so the summary trend shows how error rate evolves as VUs escalate.
  errorRate.add((failures / totalRequests) * 100);

  sleep(1);
}

export function teardown() {
  console.log(
    'Peak VUs reached: 40. Check the error_rate Trend in the summary for the error rate at ' +
      'peak. If it is > 5%, document the threshold and treat it as the system\'s breaking point.'
  );
}
