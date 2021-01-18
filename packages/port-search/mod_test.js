import { assertEquals } from "./deps_test.js";
import { Task } from "./deps.js";
import { SearchPort } from "./mod.js";

const { test } = Deno;

test("search port", () => {
  const adapter = (x) =>
    x.cata({
      CreateIndex: Task.fromPromise(
        (name, mappings) =>
          Promise.resolve(`${name}: ${JSON.stringify(mappings)}`),
      ),
      DestroyIndex: Task.fromPromise(() => Promise.resolve({ ok: true })),
      IndexDoc: Task.fromPromise(
        (index, doc) => Promise.resolve({ ok: true }),
      ),
      GetDoc: Task.of({ beep: "boop" }),
      UpdateDoc: Task.of({ ok: true }),
      DeleteDoc: Task.of({ ok: true }),
      Query: Task.fromPromise(
        (index, query) => Promise.resolve({ docs: [] }),
      ),
    });

  const service = SearchPort(adapter);

  const res = service.createIndex("hello", { fields: ["title"] });
  res.chain((res) => service.indexDoc("hello", { beep: "boop" }))
    .fork(
      (e) => {
        console.log(e);
        assertEquals(true, false);
      },
      (r) => assertEquals(true, true),
    );
});
