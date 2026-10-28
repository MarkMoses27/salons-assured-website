import assert from 'node:assert/strict';
import { EBBC2026, getEBBCTicketPriceKes, getEBBCOrderPricing, isEBBCEarlyBirdActive } from '../src/lib/ebbc2026/config.ts';

for (const category of EBBC2026.participantCategories) {
  assert.equal(getEBBCTicketPriceKes(undefined, '2026-11-17', category), 4500, `Day 1: ${category}`);
  const expected = category === 'Beauty Student' ? 2500
    : ['Stylist', 'Barber', 'Braider', 'Nail Technician', 'Therapist'].includes(category) ? 3000 : 4500;
  assert.equal(getEBBCTicketPriceKes(undefined, '2026-11-18', category), expected, `Day 2: ${category}`);
}
assert.equal(getEBBCTicketPriceKes(), 4500);
assert.equal(getEBBCTicketPriceKes(undefined, '2026-11-17', 'Beauty Student'), 4500);
assert.equal(getEBBCTicketPriceKes(undefined, '', 'Beauty Student'), 4500);
assert.equal(getEBBCTicketPriceKes(undefined, '2026-11-18', 'unknown'), 4500);
const mixed = getEBBCOrderPricing([
  { eventDate: '2026-11-17', category: 'Beauty Student' },
  { eventDate: '2026-11-18', category: 'Stylist' },
  { eventDate: '2026-11-18', category: 'Beauty Student' },
  { eventDate: '2026-11-18', category: 'Salon or Spa Owner' },
]);
assert.deepEqual(mixed.ticketPricesKes, [4500, 3000, 2500, 4500]);
assert.equal(mixed.totalAmountKes, 14500);
assert.equal(mixed.discountAmountKes, 3500);
assert.equal(4500 * 4 - mixed.discountAmountKes, mixed.totalAmountKes);
assert.equal(getEBBCOrderPricing([
  { eventDate: '2026-11-17', category: 'Beauty Student' },
  { eventDate: '2026-11-18', category: 'Beauty Student' },
]).totalAmountKes, 7000);
assert.equal(isEBBCEarlyBirdActive(new Date('2026-08-01')), false);
console.log('Pricing checks passed: both days, every category, mixed orders, two-day attendance, fallback rates and expired early bird.');
