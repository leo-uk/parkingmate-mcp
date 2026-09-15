import assert from 'node:assert/strict';

const endpoint = 'https://mcp.parkingmateuk.com/mcp';
let session;
async function request(method, params, id) {
  assert.ok(['initialize', 'tools/list'].includes(method));
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', ...(session ? { 'Mcp-Session-Id': session, 'MCP-Protocol-Version': '2025-03-26' } : {}) },
    body: JSON.stringify({ jsonrpc: '2.0', id, method, params }),
    signal: AbortSignal.timeout(30000),
  });
  assert.ok(response.ok, `Connection returned HTTP ${response.status}`);
  session = response.headers.get('mcp-session-id') || session;
  const body = await response.text();
  const messages = response.headers.get('content-type')?.includes('text/event-stream')
    ? body.replaceAll('\r\n', '\n').split('\n\n').map(event => event.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n')).filter(Boolean).map(data => JSON.parse(data))
    : [JSON.parse(body)];
  const message = messages.find(item => item.id === id);
  assert.ok(message?.result && !message.error, `${method} did not return a successful result`);
  return message.result;
}
const initialized = await request('initialize', { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'parkingmate-public-connection-check', version: '1.0.0' } }, 1);
const listed = await request('tools/list', {}, 2);
assert.ok(Array.isArray(listed.tools));
console.log(JSON.stringify({ endpoint, server: initialized.serverInfo, tools: listed.tools.map(tool => tool.name), businessToolsCalled: 0 }, null, 2));
