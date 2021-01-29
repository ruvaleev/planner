import mocks from 'mocks';

import * as areasSliceActions from 'redux/slices/areas';
import createStore from 'redux/store';

mocks();

describe('areasReducer', () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe('fetchAreas', () => {
    it('fetches areas from backend', async () => {
      expect(store.getState().areasReducer.areas.length).toEqual(0);

      await store.dispatch(areasSliceActions.fetchAreas());

      expect(store.getState().areasReducer.areas.length).toEqual(2);
    });
  });

  describe('createArea', () => {
    const areaTitle = 'New Area Title';
    const validAreaData = { title: areaTitle };

    it('creates new area and appends in to store', async () => {
      expect(store.getState().areasReducer.areas.length).toEqual(0);

      await store.dispatch(areasSliceActions.createArea(validAreaData));

      expect(store.getState().areasReducer.areas.length).toEqual(1);
      expect(store.getState().areasReducer.areas[0].title).toEqual(areaTitle);
      expect(store.getState().areasReducer.isError).toEqual(false);
      expect(store.getState().areasReducer.error).toEqual(null);
    });
  });

  describe('removeArea', () => {
    it('removes area out of store', async () => {
      await store.dispatch(areasSliceActions.fetchAreas());
      const area = store.getState().areasReducer.areas[0];
      expect(store.getState().areasReducer.areas.length).toEqual(2);

      await store.dispatch(areasSliceActions.removeArea(area.id));

      expect(store.getState().areasReducer.areas.length).toEqual(1);
      expect(store.getState().areasReducer.areas[0].id).not.toEqual(area.id);
      expect(store.getState().areasReducer.isError).toEqual(false);
      expect(store.getState().areasReducer.error).toEqual(null);
    });
  });

  describe('chooseArea', () => {
    let choosenAreas;

    it('set areas choosen and all others unchoosen', async () => {
      await store.dispatch(areasSliceActions.fetchAreas());
      const unchoosenArea = store.getState().areasReducer.areas.find((area) => !area.choosen);

      choosenAreas = store.getState().areasReducer.areas.filter((area) => area.choosen);
      expect(choosenAreas.length).toEqual(1);
      expect(choosenAreas[0].id).not.toEqual(unchoosenArea.id);

      await store.dispatch(areasSliceActions.chooseArea(unchoosenArea.id));

      choosenAreas = store.getState().areasReducer.areas.filter((area) => area.choosen);
      expect(choosenAreas.length).toEqual(1);
      expect(choosenAreas[0].id).toEqual(unchoosenArea.id);
    });
  });

  describe('createTodo', () => {
    let todoTitle;
    let area;
    let validTodoData;

    it('creates new todo and appends in to store', async () => {
      todoTitle = 'New Todo Title';
      await store.dispatch(areasSliceActions.fetchAreas());
      [area] = store.getState().areasReducer.areas;
      validTodoData = { title: todoTitle, areaId: area.id };
      expect(store.getState().areasReducer.areas[0].todos.length).toEqual(1);

      await store.dispatch(areasSliceActions.createTodo(validTodoData));

      expect(store.getState().areasReducer.areas[0].todos.length).toEqual(2);
      expect(store.getState().areasReducer.areas[0].todos[1].title).toEqual(todoTitle);
      expect(store.getState().areasReducer.isError).toEqual(false);
      expect(store.getState().areasReducer.error).toEqual(null);
    });
  });

  describe('removeTodo', () => {
    let area;
    let todo;
    let validData;

    it('removes todo out of store', async () => {
      await store.dispatch(areasSliceActions.fetchAreas());
      [area] = store.getState().areasReducer.areas;
      [todo] = area.todos;
      validData = { id: todo.id, areaId: area.id };
      expect(store.getState().areasReducer.areas[0].todos.length).toEqual(1);

      await store.dispatch(areasSliceActions.removeTodo(validData));

      expect(store.getState().areasReducer.areas[0].todos.length).toEqual(0);
      expect(store.getState().areasReducer.isError).toEqual(false);
      expect(store.getState().areasReducer.error).toEqual(null);
    });
  });

  describe('toggleReady', () => {
    let area;
    let completedFlag;
    let todo;
    let validData;

    function checkCompletedFlag(providedStore, id) {
      return (
        providedStore.getState().areasReducer.areas[0].todos.find(
          (areaTodo) => areaTodo.id === id,
        ).completed
      );
    }
    it('toggles todo completed flag', async () => {
      await store.dispatch(areasSliceActions.fetchAreas());
      [area] = store.getState().areasReducer.areas;
      [todo] = area.todos;
      completedFlag = todo.completed;
      validData = { todoId: todo.id, areaId: area.id };

      expect(checkCompletedFlag(store, todo.id)).toEqual(completedFlag);

      store.dispatch(areasSliceActions.toggleReady(validData));
      expect(checkCompletedFlag(store, todo.id)).toEqual(!completedFlag);

      store.dispatch(areasSliceActions.toggleReady(validData));
      expect(checkCompletedFlag(store, todo.id)).toEqual(completedFlag);
    });
  });
});
