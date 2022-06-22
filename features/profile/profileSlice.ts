import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubmitObj } from "../../components/edit-profile-form";

export type Profile = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return await response.json();
  }
);

export const fetchProfile = createAsyncThunk(
  "profiles/fetchProfile",
  async (id: string) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    return await response.json();
  }
);

export const updateProfile = createAsyncThunk(
  "profiles/updateProfile",
  async (obj: SubmitObj) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${obj.id}`,
      {
        method: "PUT",
        body: JSON.stringify(obj),
      }
    );

    return await response.json();
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: [] as Profile[],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfiles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.error.message;
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.profiles.length) {
          state.profiles = state.profiles.map((p) => {
            if (p.id === action.payload.id) {
              return action.payload;
            }
            return p;
          });
        } else {
          state.profiles = [action.payload];
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.profiles = state.profiles.map((p) => {
        //   if (p.id === action.payload.id) {
        //     return action.payload;
        //   }
        //   return p;
        // });
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
