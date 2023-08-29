import axios from 'axios';
import { makeUrl } from '../constants';
import type { ViewObj } from '../types';

const api = axios.create({
  baseURL: makeUrl(),
});

export const getIndex = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error(`Failed to get index: ${error.message}`);
    throw error;
  }
}

export const getView = async (payload: ViewObj) => {
  try {
    const response = await api.post('/view', payload);
    return response.data;
  } catch (error) {
    console.error(`Failed to get view: ${error.message}`);
    throw error;
  }
}
