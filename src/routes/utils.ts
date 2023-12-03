import { writable, type Writable } from 'svelte/store';

export const dates: Writable<Set<string>> = writable(new Set());
