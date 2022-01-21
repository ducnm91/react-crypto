import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import RepositoryFactory from '../../repositories/RepositoryFactory';

import { stableCoins, binanceCoins } from '../../config/coins';

const CoingeckoRepository = RepositoryFactory.get('coingecko');

export interface CoinState {
  status: 'idle' | 'loading' | 'failed';
  coins: any[];
  baseToken: string;
}

const initialState: CoinState = {
  coins: [],
  status: 'idle',
  baseToken: 'btc',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(getCoinsWidthRelatedDataAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getCoinsWidthRelatedDataAsync = createAsyncThunk(
  'counter/fetchCoin',
  async ({order, platform}:{order: string, platform: string}) => {
    const response = await CoingeckoRepository.getCoinsWidthRelatedData(order, platform);
    // The value we return becomes the `fulfilled` action payload
    const binanceCoinsData = response.data.filter((coin:any) => {
      return coin.market_cap_rank && 
              stableCoins.indexOf(coin.symbol) < 0 && 
              binanceCoins.indexOf(coin.symbol) >= 0
    });

    return binanceCoinsData.map((coin: any) =>{
      return {
        ...coin,
        remainingSupply: coin.max_supply ? (coin.circulating_supply / coin.max_supply) : 0
      }
    })
  }
);

export const coinSlice = createSlice({
  name: 'coin',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value += 1;
    // },
    // decrement: (state) => {
    //   // state.value -= 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setBaseToken: (state, action: PayloadAction<string>) => {
      state.baseToken = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getCoinsWidthRelatedDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCoinsWidthRelatedDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.coins = action.payload;
      });
  },
});

export const { setBaseToken } = coinSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCoin = (state: RootState) => state.coin.coins;
export const selectStatus = (state: RootState) => state.coin.status;
export const selectBaseToken = (state: RootState) => state.coin.baseToken;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default coinSlice.reducer;
