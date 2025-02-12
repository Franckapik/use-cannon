import type { Object3D } from 'three'
import type { WorkerCollideEvent, WorkerRayhitEvent } from './Provider'
import type { AtomicProps } from './hooks'
import React from 'react'
import { ProviderProps } from './Provider'
export * from './hooks'
export declare type Buffers = {
  positions: Float32Array
  quaternions: Float32Array
}
export declare type Refs = {
  [uuid: string]: Object3D
}
export declare type Event =
  | (Omit<WorkerRayhitEvent['data'], 'body'> & {
      body: Object3D | null
    })
  | (Omit<WorkerCollideEvent['data'], 'body' | 'target'> & {
      body: Object3D
      target: Object3D
    })
export declare type Events = {
  [uuid: string]: (e: Event) => void
}
export declare type Subscriptions = {
  [id: string]: (value: AtomicProps[keyof AtomicProps] | number[]) => void
}
export declare type ProviderContext = {
  worker: Worker
  bodies: React.MutableRefObject<{
    [uuid: string]: number
  }>
  buffers: Buffers
  refs: Refs
  events: Events
  subscriptions: Subscriptions
}
declare const context: React.Context<ProviderContext>
declare function Physics(props: ProviderProps): JSX.Element
export { Physics, context }
