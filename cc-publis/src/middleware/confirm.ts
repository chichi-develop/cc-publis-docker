import { Middleware } from 'redux';

// TODO: <question> redux middleware はTSにすべきか？
const confirmMiddleware: Middleware = store => next => action => {
  if (!action.meta || !action.meta.confirm) {
    return next(action);
  }

  if (window.confirm(action.meta.confirm)) {
    // eslint-disable-next-line no-param-reassign
    delete action.meta.confirm;

    return next(action);
  }
};

export default confirmMiddleware;
