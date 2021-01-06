import React from 'react';

import { rootPath } from 'helpers/routes';

const NotFound = () => (
  <div className="flex flex-col justify-center items-center h-screen">
    Страница не найдена
    <a href={rootPath()} className="title">Вернуться на главную</a>
  </div>
);

export default NotFound;
