import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  decrementFollowers,
  fetchCards,
  fetchPagination,
  incrementFollowers,
} from './operation';
import { useDispatch } from 'react-redux';

const initialState = {
  cards: [],
  totalItems: 0,
  isLoading: false,
  error: null,
  page: 1,
  limit: 9,
};

// const dispatch = useDispatch;

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updatePage: (state, action) => {
      console.log(state);
      console.log(action);
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCards.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log(action);
        console.log(!action.payload === 0);
        if (action.payload === 0) {
          alert('Контент отсутствует');
        } else {
          state.cards = action.payload;
        }
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(incrementFollowers.fulfilled, (state, action) => {
        const { cardId, updatedFollowers } = action.payload;
        const cardIndex = state.cards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
          state.cards[cardIndex].followers = updatedFollowers;
        }
      })
      .addCase(decrementFollowers.fulfilled, (state, action) => {
        const { cardId, updatedFollowers } = action.payload;
        const cardIndex = state.cards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
          state.cards[cardIndex].followers = updatedFollowers;
        }
      });
    //   .addCase(fetchPagination.fulfilled, (state, action) => {
    //     state.page = action.payload;
    //   });
  },
});
export const { updatePage } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
