import React from 'react';
import { IPCReducerType } from './interface';

const IPCContext = React.createContext<IPCReducerType>({} as IPCReducerType);

export default IPCContext;
