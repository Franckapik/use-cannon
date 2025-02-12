import type { MaterialOptions, RayOptions } from 'cannon-es'
import type { Event } from './index'
import * as THREE from 'three'
import React from 'react'
export declare type AtomicProps = {
  mass?: number
  material?: MaterialOptions
  linearDamping?: number
  angularDamping?: number
  allowSleep?: boolean
  sleepSpeedLimit?: number
  sleepTimeLimit?: number
  collisionFilterGroup?: number
  collisionFilterMask?: number
  fixedRotation?: boolean
}
export declare type BodyProps = AtomicProps & {
  args?: any
  position?: number[]
  rotation?: number[]
  velocity?: number[]
  angularVelocity?: number[]
  linearFactor?: number[]
  angularFactor?: number[]
  type?: 'Dynamic' | 'Static' | 'Kinematic'
  onCollide?: (e: Event) => void
}
export declare type ShapeType =
  | 'Plane'
  | 'Box'
  | 'Cylinder'
  | 'Heightfield'
  | 'Particle'
  | 'Sphere'
  | 'Trimesh'
  | 'ConvexPolyhedron'
export declare type BodyShapeType = ShapeType | 'Compound'
export declare type PlaneProps = BodyProps & {}
export declare type BoxProps = BodyProps & {
  args?: number[]
}
export declare type CylinderProps = BodyProps & {
  args?: [number, number, number, number]
}
export declare type ParticleProps = BodyProps & {}
export declare type SphereProps = BodyProps & {
  args?: number
}
export declare type TrimeshProps = BodyProps & {
  args?: THREE.Geometry | [(THREE.Vector3 | number[])[], (THREE.Face3 | number[])[]]
}
export declare type HeightfieldProps = BodyProps & {
  args?: [
    number[],
    {
      minValue?: number
      maxValue?: number
      elementSize?: number
    }
  ]
}
export declare type ConvexPolyhedronProps = BodyProps & {
  args?: THREE.Geometry | [(THREE.Vector3 | number[])[], (THREE.Face3 | number[])[]]
}
export declare type CompoundBodyProps = BodyProps & {
  shapes: BodyProps &
    {
      type: ShapeType
    }[]
}
declare type PlaneFn = (index: number) => PlaneProps
declare type BoxFn = (index: number) => BoxProps
declare type CylinderFn = (index: number) => CylinderProps
declare type HeightfieldFn = (index: number) => HeightfieldProps
declare type ParticleFn = (index: number) => ParticleProps
declare type SphereFn = (index: number) => SphereProps
declare type TrimeshFn = (index: number) => TrimeshProps
declare type ConvexPolyhedronFn = (index: number) => ConvexPolyhedronProps
declare type CompoundBodyFn = (index: number) => CompoundBodyProps
declare type WorkerVec = {
  set: (x: number, y: number, z: number) => void
  copy: ({ x, y, z }: THREE.Vector3 | THREE.Euler) => void
  subscribe: (callback: (value: number[]) => void) => void
}
export declare type WorkerProps<T> = {
  [K in keyof T]: {
    set: (value: T[K]) => void
    subscribe: (callback: (value: T[K]) => void) => () => void
  }
}
export declare type WorkerApi = WorkerProps<AtomicProps> & {
  position: WorkerVec
  rotation: WorkerVec
  velocity: WorkerVec
  angularVelocity: WorkerVec
  linearFactor: WorkerVec
  angularFactor: WorkerVec
  applyForce: (force: number[], worldPoint: number[]) => void
  applyImpulse: (impulse: number[], worldPoint: number[]) => void
  applyLocalForce: (force: number[], localPoint: number[]) => void
  applyLocalImpulse: (impulse: number[], localPoint: number[]) => void
}
declare type PublicApi = WorkerApi & {
  at: (index: number) => WorkerApi
}
export declare type Api = [React.MutableRefObject<THREE.Object3D | undefined>, PublicApi]
export declare type ConstraintTypes = 'PointToPoint' | 'ConeTwist' | 'Distance' | 'Hinge' | 'Lock'
export declare type ConstraintOptns = {
  maxForce?: number
  collideConnected?: boolean
  wakeUpBodies?: boolean
}
export declare type PointToPointConstraintOpts = ConstraintOptns & {
  pivotA: number[]
  pivotB: number[]
}
export declare type ConeTwistConstraintOpts = ConstraintOptns & {
  pivotA?: number[]
  axisA?: number[]
  pivotB?: number[]
  axisB?: number[]
  angle?: number
  twistAngle?: number
}
export declare type DistanceConstraintOpts = ConstraintOptns & {
  distance?: number
}
export declare type HingeConstraintOpts = ConstraintOptns & {
  pivotA?: number[]
  axisA?: number[]
  pivotB?: number[]
  axisB?: number[]
}
export declare type LockConstraintOpts = ConstraintOptns & {}
export declare type SpringOptns = {
  restLength?: number
  stiffness?: number
  damping?: number
  worldAnchorA?: number[]
  worldAnchorB?: number[]
  localAnchorA?: number[]
  localAnchorB?: number[]
}
export declare function usePlane(fn: PlaneFn, fwdRef?: React.MutableRefObject<THREE.Object3D>): Api
export declare function useBox(
  fn: BoxFn,
  bounding?: boolean,
  fwdRef?: React.MutableRefObject<THREE.Object3D>
): Api
export declare function useCylinder(
  fn: CylinderFn,
  bounding?: boolean,
  fwdRef?: React.MutableRefObject<THREE.Object3D>
): Api
export declare function useHeightfield(
  fn: HeightfieldFn,
  bounding?: boolean,
  fwdRef?: React.MutableRefObject<THREE.Object3D>
): Api
export declare function useParticle(
  fn: ParticleFn,
  bounding?: boolean,
  fwdRef?: React.MutableRefObject<THREE.Object3D>
): Api
export declare function useSphere(
  fn: SphereFn,
  bounding?: boolean,
  fwdRef?: React.MutableRefObject<THREE.Object3D>
): Api
export declare function useTrimesh(fn: TrimeshFn, fwdRef?: React.MutableRefObject<THREE.Object3D>): Api
export declare function useConvexPolyhedron(
  fn: ConvexPolyhedronFn,
  bounding?: boolean,
  fwdRef?: React.MutableRefObject<THREE.Object3D>
): Api
export declare function useCompoundBody(
  fn: CompoundBodyFn,
  fwdRef?: React.MutableRefObject<THREE.Object3D>
): Api
declare type ConstraintApi = [
  React.MutableRefObject<THREE.Object3D | undefined>,
  React.MutableRefObject<THREE.Object3D | undefined>,
  {
    enable: () => void
    disable: () => void
  }
]
export declare function usePointToPointConstraint(
  bodyA: React.MutableRefObject<THREE.Object3D | undefined>,
  bodyB: React.MutableRefObject<THREE.Object3D | undefined>,
  optns: PointToPointConstraintOpts,
  deps?: any[]
): ConstraintApi
export declare function useConeTwistConstraint(
  bodyA: React.MutableRefObject<THREE.Object3D | undefined>,
  bodyB: React.MutableRefObject<THREE.Object3D | undefined>,
  optns: ConeTwistConstraintOpts,
  deps?: any[]
): ConstraintApi
export declare function useDistanceConstraint(
  bodyA: React.MutableRefObject<THREE.Object3D | undefined>,
  bodyB: React.MutableRefObject<THREE.Object3D | undefined>,
  optns: DistanceConstraintOpts,
  deps?: any[]
): ConstraintApi
export declare function useHingeConstraint(
  bodyA: React.MutableRefObject<THREE.Object3D | undefined>,
  bodyB: React.MutableRefObject<THREE.Object3D | undefined>,
  optns: HingeConstraintOpts,
  deps?: any[]
): ConstraintApi
export declare function useLockConstraint(
  bodyA: React.MutableRefObject<THREE.Object3D | undefined>,
  bodyB: React.MutableRefObject<THREE.Object3D | undefined>,
  optns: LockConstraintOpts,
  deps?: any[]
): ConstraintApi
export declare function useSpring(
  bodyA: React.MutableRefObject<THREE.Object3D | undefined>,
  bodyB: React.MutableRefObject<THREE.Object3D | undefined>,
  optns: SpringOptns,
  deps?: any[]
): React.MutableRefObject<THREE.Object3D | undefined>[]
declare type RayOptns = Omit<RayOptions, 'mode' | 'from' | 'to' | 'result' | 'callback'> & {
  from?: number[]
  to?: number[]
}
export declare function useRaycastClosest(options: RayOptns, callback: (e: Event) => void, deps?: any[]): void
export declare function useRaycastAny(options: RayOptns, callback: (e: Event) => void, deps?: any[]): void
export declare function useRaycastAll(options: RayOptns, callback: (e: Event) => void, deps?: any[]): void
declare type RaycastVehiclePublicApi = {
  setSteeringValue: (value: number, wheelIndex: number) => void
  applyEngineForce: (value: number, wheelIndex: number) => void
  setBrake: (brake: number, wheelIndex: number) => void
}
declare type RaycastVehicleApi = [React.MutableRefObject<THREE.Object3D | undefined>, RaycastVehiclePublicApi]
declare type WheelInfoOptions = {
  radius?: number
  directionLocal?: number[]
  suspensionStiffness?: number
  suspensionRestLength?: number
  maxSuspensionForce?: number
  maxSuspensionTravel?: number
  dampingRelaxation?: number
  dampingCompression?: number
  frictionSlip?: number
  rollInfluence?: number
  axleLocal?: number[]
  chassisConnectionPointLocal?: number[]
  isFrontWheel?: boolean
  useCustomSlidingRotationalSpeed?: boolean
  customSlidingRotationalSpeed?: number
}
declare type RaycastVehicleProps = {
  chassisBody: React.MutableRefObject<THREE.Object3D | undefined>
  wheels: React.MutableRefObject<THREE.Object3D | undefined>[]
  wheelInfos: WheelInfoOptions[]
  indexForwardAxis?: number
  indexRightAxis?: number
  indexUpAxis?: number
}
declare type RaycastVehicleFn = () => RaycastVehicleProps
export declare function useRaycastVehicle(
  fn: RaycastVehicleFn,
  fwdRef?: React.MutableRefObject<THREE.Object3D>
): RaycastVehicleApi
export {}
