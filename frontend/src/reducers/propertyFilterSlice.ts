import { createSlice, createAction } from '@reduxjs/toolkit';

export const setPropertyFilter = createAction<object>('setPropertyFilter');
export const clearPropertyFilter = createAction('clearPropertyFilter');

export interface IPropertyFilterState {}

const initialState: IPropertyFilterState = {};

/**
 * The following is a shorthand method for creating a reducer with paired actions and action creators.
 * All functionality related to this concept is contained within this file.
 * See https://redux-toolkit.js.org/api/createslice for more details.
 */
const propertyFilterSlice = createSlice({
  name: 'propertyFilter',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder: any) => {
    // note that redux-toolkit uses immer to prevent state from being mutated.
    builder.addCase(setPropertyFilter, (state: any, action: any) => {
      return action.payload;
    });
    builder.addCase(clearPropertyFilter, (state: any) => {
      return { ...initialState };
    });
  },
});

export default propertyFilterSlice;
