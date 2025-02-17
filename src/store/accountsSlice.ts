import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export interface IAccount {
  id: string
  email: string
  name: string
  surname: string
  phoneNumber: string
  username: string
  accessToken: string
  refreshToken: string
  expiresIn: number
  roles: string[]
  permissions: string[]
  avatar?: string
}

interface AccountsState {
  accounts: IAccount[]
  activeAccountId: string | null
}

const initialState: AccountsState = {
  accounts: [],
  activeAccountId: null,
}

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<IAccount>) => {
      // Check if account already exists
      const exists = state.accounts.some((acc) => acc.id === action.payload.id)
      if (!exists) {
        state.accounts.push(action.payload)
        // If this is the first account, set it as active
        if (!state.activeAccountId) {
          state.activeAccountId = action.payload.id
        }
      }
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter((acc) => acc.id !== action.payload)
      // If active account is removed, set first available account as active
      if (state.activeAccountId === action.payload) {
        state.activeAccountId = state.accounts[0]?.id || null
      }
    },
    setActiveAccount: (state, action: PayloadAction<string>) => {
      if (state.accounts.some((acc) => acc.id === action.payload)) {
        state.activeAccountId = action.payload
      }
    },
    clearAccounts: (state) => {
      state.accounts = []
      state.activeAccountId = null
    },
  },
})

export const { addAccount, removeAccount, setActiveAccount, clearAccounts } =
  accountsSlice.actions

// Selectors
export const selectAccounts = (state: RootState) => state.accounts.accounts
export const selectActiveAccount = (state: RootState) =>
  state.accounts.accounts.find(
    (acc) => acc.id === state.accounts.activeAccountId,
  )

export default accountsSlice.reducer
