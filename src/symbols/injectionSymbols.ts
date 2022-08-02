import type { InjectionKey } from "vue";
import type PocketBase from 'pocketbase'

export const pocketBaseSymbol: InjectionKey<PocketBase> = Symbol("PBClient");
