import mocks from 'mocks';

import * as todosSliceActions from 'redux/slices/todos';
import createStore from 'redux/store';

mocks();

describe('todosReducer', () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe('fetchTodos', () => {
    it('fetches todos from backend', async () => {
      expect(store.getState().todosReducer.todos.length).toEqual(0);
      await store.dispatch(todosSliceActions.fetchTodos());
      expect(store.getState().todosReducer.todos.length).toEqual(3);
    });
  });

  describe('createTodo', () => {
    const todoTitle = 'New Todo Title';
    const areaId = 'someAreaId';
    const validTodoData = { title: todoTitle, areaId };

    it('creates new area and appends in to store', async () => {
      expect(store.getState().todosReducer.todos.length).toEqual(0);
      await store.dispatch(todosSliceActions.createTodo(validTodoData));
      expect(store.getState().todosReducer.todos.length).toEqual(1);
      expect(store.getState().todosReducer.todos[0].fields.title).toEqual(todoTitle);
      expect(store.getState().todosReducer.todos[0].fields.area_id).toEqual([areaId]);
      expect(store.getState().todosReducer.isError).toEqual(false);
      expect(store.getState().todosReducer.error).toEqual(null);
    });
  });

  describe('removeTodo', () => {
    it('removes todo out of store', async () => {
      await store.dispatch(todosSliceActions.fetchTodos());
      const todo = store.getState().todosReducer.todos[0];
      expect(store.getState().todosReducer.todos.length).toEqual(3);

      await store.dispatch(todosSliceActions.removeTodo(todo.id));

      expect(store.getState().todosReducer.todos.length).toEqual(2);
      expect(store.getState().todosReducer.todos[0].id).not.toEqual(todo.id);
      expect(store.getState().todosReducer.todos[1].id).not.toEqual(todo.id);
      expect(store.getState().todosReducer.isError).toEqual(false);
      expect(store.getState().todosReducer.error).toEqual(null);
    });
  });

  describe('toggleReady', () => {
    function checkCompletedFlag(providedStore, id) {
      return (
        providedStore.getState().todosReducer.todos.find((todo) => todo.id === id).fields.completed
      );
    }
    it('toggles todo completed flag', async () => {
      await store.dispatch(todosSliceActions.fetchTodos());
      const todoId = store.getState().todosReducer.todos.find((todo) => !todo.fields.completed).id;

      expect(checkCompletedFlag(store, todoId)).toEqual(false);

      store.dispatch(todosSliceActions.toggleReady(todoId));
      expect(checkCompletedFlag(store, todoId)).toEqual(true);

      store.dispatch(todosSliceActions.toggleReady(todoId));
      expect(checkCompletedFlag(store, todoId)).toEqual(false);
    });
  });
});
