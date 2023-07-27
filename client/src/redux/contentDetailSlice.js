import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  name: '',
  photo: '',
  category: {
    name: '',
    price: null
  },
  format: '',
  size: '',
  release_date: '',
  release_year: '',
  subtitles: null,
  spanish: null,
  description: '',
  platform: '',
  countrie: '',
  seasons: [],
  actors: [],
  genders: [],
  images: [],
}

export const contentDetailSlice = createSlice({
    name: 'contentDetail',
    initialState,
    reducers: {
        addContentDetail: (state, action) => {
            return action.payload
        }
    }
})

export const { addContentDetail, addVideoUrl } = contentDetailSlice.actions
export default contentDetailSlice.reducer