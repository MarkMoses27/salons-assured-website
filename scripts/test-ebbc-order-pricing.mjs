import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as pricing from '../src/lib/ebbc2026/config.ts';

const source = readFileSync(new URL('../src/app/api/ebbc2026/orders/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
async function run(attendees, wrongTotal = false) {
  let insertedOrder;
  let insertedTickets;
  let deleted = false;
  const database = {
    from(table) {
      return {
        insert(value) {
          if (table === 'ebbc_orders') {
            insertedOrder = value;
            const total = value.ticket_quantity * value.unit_price_kes - value.discount_amount_kes;
            return { select: () => ({ single: async () => ({ data: { ...value, id: 'test-order', order_number: 'TEST', total_amount_kes: wrongTotal ? total + 1 : total } }) }) };
          }
          assert.equal(table, 'ebbc_tickets');
          insertedTickets = value;
          return { select: async () => ({ data: value.map((ticket, index) => ({ ...ticket, id: String(index), ticket_number: `TEST-${index}` })) }) };
        },
        delete: () => ({ eq: async () => { deleted = true; } }),
      };
    },
  };
  const exports = {};
  const context = vm.createContext({ exports, console: { error() {}, warn() {} }, require(name) {
    if (name === 'next/server') return { NextResponse: { json: (body, init) => ({ body, status: init.status }) } };
    if (name === '@/lib/ebbc2026/config') return pricing;
    if (name === '@/lib/supabase/admin') return { supabaseAdmin: database };
    throw Error(`Unexpected import ${name}`);
  } });
  vm.runInContext(compiled, context);
  const result = await exports.POST({ json: async () => ({
    buyerFullName: 'Pricing Test', buyerEmail: 'pricing-test@example.com', buyerPhone: '0700000000',
    totalAmountKes: 1, discountAmountKes: 999999,
    attendees: attendees.map(a => ({ fullName: 'Test Attendee', country: 'Kenya', ...a })),
  }) });
  return { result, insertedOrder, insertedTickets, deleted };
}
const attendees = [
  { eventDate: '2026-11-17', category: 'Beauty Student' },
  { eventDate: '2026-11-18', category: 'Stylist' },
  { eventDate: '2026-11-18', category: 'Beauty Student' },
];
const success = await run(attendees);
assert.equal(success.result.status, 201);
assert.equal(success.result.body.order.totalAmountKes, 10000);
assert.equal(success.insertedOrder.discount_amount_kes, 3500);
assert.equal(success.insertedTickets.length, 3);
const mismatch = await run(attendees, true);
assert.equal(mismatch.result.status, 500);
assert.equal(mismatch.deleted, true);
assert.equal(mismatch.insertedTickets, undefined);
const invalidDate = await run([{ eventDate: '2026-11-19', category: 'Beauty Student' }]);
assert.notEqual(invalidDate.result.status, 201);
assert.equal(invalidDate.insertedOrder, undefined);
console.log('Order API checks passed: server-calculated mixed total, ignored client amounts, mismatch cleanup, invalid-day rejection.');
