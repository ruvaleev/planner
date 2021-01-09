import React from 'react';
import { useHistory } from 'react-router-dom';

import { rootPath } from 'helpers/routes';

function NotFound() {
  const history = useHistory();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      Страница не найдена
      <button type="button" onClick={() => history.push(rootPath())} className="title cursor-pointer">Вернуться на главную</button>
    </div>
  );
}

export default NotFound;
