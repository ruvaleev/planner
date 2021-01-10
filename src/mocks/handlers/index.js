import areas from './areas';
import authentications from './authentications';
import todos from './todos';

const handlers = areas.concat(authentications, todos);

export default handlers;
