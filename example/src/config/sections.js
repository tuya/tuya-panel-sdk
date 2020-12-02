import { elementsRouters } from './routers';
import { produceRouterDatas } from '../utils';

export default [
  {
    title: null,
    data: produceRouterDatas(elementsRouters),
  },
];
