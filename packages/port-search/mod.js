import { daggy, liftF, Task } from "./deps.js";

const Search = daggy.taggedSum("Search", {
  CreateIndex: ["name", "mappings"],
  DestroyIndex: ["name"],
  IndexDoc: ["index", "doc"],
  GetDoc: ["index", "id"],
  UpdateDoc: ["index", "id", "doc"],
  DeleteDoc: ["index", "id"],
  Query: ["index", "query"],
});

export const SearchPort = (adapter) => ({
  createIndex: (name, mappings) =>
    liftF(
      Search.CreateIndex(name, mappings),
    ).foldMap(adapter, Task.of),
  destroyIndex: (name) =>
    liftF(Search.DestroyIndex(name)).foldMap(adapter, Task.of),
  indexDoc: (index, doc) =>
    liftF(
      Search.IndexDoc(index, doc),
    ).foldMap(adapter, Task.of),
  getDoc: (index, id) =>
    liftF(Search.GetDoc(index, id)).foldMap(adapter, Task.of),
  updateDoc: (index, id, doc) =>
    liftF(Search.UpdateDoc(index, id, doc)).foldMap(adapter, Task.of),
  deleteDoc: (index, id) =>
    liftF(Search.DeleteDoc(index, id)).foldMap(adapter, Task.of),
  query: (index, query) =>
    liftF(
      Search.Query(index, query),
    ).foldMap(adapter, Task.of),
});
