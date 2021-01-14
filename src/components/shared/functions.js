/* eslint import/prefer-default-export: 0 */
export function selectTodos(todos, areaId) {
  return todos.filter((todo) => todo.fields.area_id[0] === areaId);
}
