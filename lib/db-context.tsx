import React from 'react';
import { createDb } from '@db';

export const DbContext = React.createContext(createDb());
