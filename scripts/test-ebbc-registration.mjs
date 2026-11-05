import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import * as pricing from "../src/lib/ebbc2026/config.ts";

// Exercise the actual page handlers with isolated state and a fake order API.
// These tests never contact Supabase or create live registrations.
const source = readFileSync(
  new URL("../src/app/ebbc2026/tickets/page.tsx", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  },
}).outputText;
function harness() {
  let cursor = 0;
  const slots = [];
  const requests = [];
  const jsx = (type, props) => ({ type, props: props || {} });
  const exports = {};
  const context = vm.createContext({
    exports,
    URLSearchParams,
    console,
    requestAnimationFrame: (fn) => fn(),
    window: { scrollTo() {}, location: {} },
    document: { getElementById: () => ({ scrollIntoView() {} }) },
    fetch: async (url, options) => {
      requests.push({ url, body: JSON.parse(options.body) });
      return {
        ok: true,
        json: async () => ({
          ok: true,
          order: {
            orderNumber: "TEST-ONLY",
            quantity: requests[0].body.attendees.length,
            totalAmountKes: pricing.getEBBCOrderPricing(
              requests[0].body.attendees,
            ).totalAmountKes,
          },
        }),
      };
    },
    require(name) {
      if (name === "react")
        return {
          useState(initial) {
            const i = cursor++;
            if (!(i in slots)) slots[i] = initial;
            return [
              slots[i],
              (value) => {
                slots[i] =
                  typeof value === "function" ? value(slots[i]) : value;
              },
            ];
          },
          useRef(initial) {
            const i = cursor++;
            return (slots[i] ??= { current: initial });
          },
        };
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "next/link") return { default: "a" };
      if (name === "lucide-react")
        return new Proxy({}, { get: (_, key) => key });
      if (name === "@/lib/ebbc2026/config") return pricing;
      throw Error(`Unexpected import: ${name}`);
    },
  });
  vm.runInContext(compiled, context);
  let tree;
  const nodes = () => {
    const result = [];
    function visit(node) {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) {
        node.forEach(visit);
        return;
      }
      result.push(node);
      visit(node.props?.children);
    }
    visit(tree);
    return result;
  };
  const render = () => {
    cursor = 0;
    tree = exports.default();
  };
  const find = (predicate) => {
    const node = nodes().find(predicate);
    assert.ok(node, "Expected form control");
    return node;
  };
  const text = (node) =>
    typeof node === "string"
      ? node
      : Array.isArray(node)
        ? node.map(text).join("")
        : node?.props
          ? text(node.props.children)
          : "";
  const click = (label) => {
    find(
      (n) =>
        n.type === "button" &&
        (n.props["aria-label"] === label || text(n).trim() === label),
    ).props.onClick();
    render();
  };
  const field = (id, value) => {
    find((n) => n.props.id === id).props.onChange({ target: { value } });
    render();
  };
  const next = () => {
    find((n) => n.type === "form").props.onSubmit({ preventDefault() {} });
    render();
  };
  const fill = (prefix, name, email) => {
    field(`${prefix}-fullName`, name);
    field(`${prefix}-email`, email);
    field(`${prefix}-phone`, "0712345678");
  };
  render();
  return {
    requests,
    nodes,
    find,
    text,
    click,
    field,
    next,
    fill,
    render,
    choose(day, category, index = 0) {
      click(`${day}${day === "Day 1" ? "17" : "18"} November 2026`);
      field(`category-${index}`, category);
    },
    toggle(value) {
      find(
        (n) => n.type === "input" && n.props.type === "checkbox",
      ).props.onChange({ target: { checked: value } });
      render();
    },
  };
}
const individual = harness();
individual.next();
assert.ok(individual.nodes().some((n) => n.props.role === "alert"));
assert.equal(individual.requests.length, 0);
individual.choose("Day 2", "Beauty Student");
individual.next();
individual.next();
assert.ok(individual.nodes().some((n) => n.props.role === "alert"));
individual.fill("attendee0", "Student Attendee", "student@example.com");
individual.field("attendee0-email", "invalid");
individual.next();
assert.ok(individual.nodes().some((n) => n.props.role === "alert"));
individual.field("attendee0-email", "student@example.com");
individual.field("referral-code", "ref123");
individual.next();
assert.equal(individual.requests.length, 0, "Review must not create an order");
individual.click("Back");
assert.equal(
  individual.find((n) => n.props.id === "attendee0-fullName").props.value,
  "Student Attendee",
);
individual.toggle(true);
individual.next();
assert.ok(
  individual.nodes().some((n) => n.props.role === "alert"),
  "Separate payer must be valid",
);
individual.fill("contact", "Other Payer", "payer@example.com");
individual.next();
individual.click("Back");
individual.toggle(false);
individual.next();
individual.next();
individual.next();
await new Promise((resolve) => setImmediate(resolve));
assert.equal(
  individual.requests.length,
  1,
  "Rapid submits create only one request",
);
const payload = individual.requests[0].body;
assert.equal(payload.buyerFullName, "Student Attendee");
assert.equal(payload.buyerEmail, "student@example.com");
assert.equal(payload.referralCode, "REF123");
assert.equal(
  pricing.getEBBCOrderPricing(payload.attendees).totalAmountKes,
  2500,
);

const group = harness();
group.choose("Day 1", "Stylist");
group.click("Increase attendee quantity");
// Select the second ticket's day directly; both tickets expose day buttons.
group
  .nodes()
  .filter(
    (n) =>
      n.type === "button" && group.text(n) === "Day 2" + "18 November 2026",
  )[1]
  .props.onClick();
group.render();
group.field("category-1", "Beauty Student");
group.next();
group.fill("attendee0", "First Attendee", "first@example.com");
group.click("Use first attendee’s details");
group.field("attendee1-fullName", "Second Attendee");
group.toggle(true);
group.fill("contact", "Group Payer", "group@example.com");
group.next();
group.next();
await new Promise((resolve) => setImmediate(resolve));
assert.equal(group.requests.length, 1);
assert.equal(group.requests[0].body.buyerEmail, "group@example.com");
assert.equal(group.requests[0].body.attendees[1].eventDate, "2026-11-18");
assert.equal(group.requests[0].body.attendees[1].fullName, "Second Attendee");
assert.equal(
  pricing.getEBBCOrderPricing(group.requests[0].body.attendees).totalAmountKes,
  7000,
);
// Both-day selection must price each date separately and collect details once.
for (const category of pricing.EBBC2026.participantCategories) {
  const both = harness();
  both.click("Both days17 & 18 November 2026");
  both.field("category-0", category);
  const expected =
    4500 + pricing.getEBBCTicketPriceKes(undefined, "2026-11-18", category);
  assert.ok(
    both
      .nodes()
      .some(
        (n) =>
          both.text(n) ===
          `Attendance price: KES ${new Intl.NumberFormat("en-KE").format(expected)}`,
      ),
  );
  // Changing the category must immediately update the price without losing dates.
  both.field("category-0", "Beauty Student");
  assert.ok(
    both.nodes().some((n) => both.text(n) === "Attendance price: KES 7,000"),
  );
  both.field("category-0", category);
  both.next();
  assert.equal(
    both
      .nodes()
      .filter((n) => n.type === "input" && n.props.id?.startsWith("attendee"))
      .length,
    5,
  );
  both.fill("attendee0", "Both Days Attendee", "both@example.com");
  both.next();
  assert.equal(both.requests.length, 0);
  both.next();
  await new Promise((resolve) => setImmediate(resolve));
  const entries = both.requests[0].body.attendees;
  assert.equal(entries.length, 2);
  assert.equal(entries[0].eventDate, "2026-11-17");
  assert.equal(entries[1].eventDate, "2026-11-18");
  assert.equal(entries[0].fullName, entries[1].fullName);
  assert.equal(entries[0].email, entries[1].email);
  assert.equal(pricing.getEBBCOrderPricing(entries).totalAmountKes, expected);
}

const limit = harness();
for (let index = 0; index < 5; index++)
  limit.click("Increase attendee quantity");
for (let index = 0; index < 6; index++) {
  limit
    .nodes()
    .filter(
      (n) =>
        n.type === "button" &&
        limit.text(n) === "Both days17 & 18 November 2026",
    )
    [index].props.onClick();
  limit.render();
  limit.field(`category-${index}`, "Beauty Student");
}
limit.next();
assert.ok(
  limit
    .nodes()
    .some(
      (n) =>
        n.props.role === "alert" &&
        limit.text(n).includes("exceeds 10 day tickets"),
    ),
);
assert.equal(limit.requests.length, 0);

console.log(
  "Registration checks passed: step validation, no early orders, preserved details, optional payer, referral code, group totals and duplicate-submit guard.",
);
