import { watch } from 'babas';
import React from 'react';

export const DbContext = React.createContext(watch({}));
