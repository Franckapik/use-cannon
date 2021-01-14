import e, {
  useContext as n,
  useState as t,
  useRef as r,
  useEffect as o,
  useLayoutEffect as i,
  useMemo as u,
  createContext as s,
  Suspense as a,
  lazy as c,
} from 'react'
import {
  Object3D as l,
  MathUtils as p,
  Box3 as d,
  Box3Helper as f,
  Color as m,
  InstancedMesh as g,
  DynamicDrawUsage as y,
  Geometry as x,
  Vector3 as v,
  Face3 as M,
} from 'three'
import { useFrame as w } from 'react-three-fiber'
const b = new l()
function h(e, n, t) {
  return (
    (n.args = t(n.args)),
    e.position.set(...(n.position || [0, 0, 0])),
    e.rotation.set(...(n.rotation || [0, 0, 0])),
    n
  )
}
function F(e, n, t) {
  void 0 !== n && (e.position.fromArray(t.positions, 3 * n), e.quaternion.fromArray(t.quaternions, 4 * n))
}
function C(e, n) {
  o(() => {
    const t = e.current
    if (t) {
      const e = new d()
      e.setFromObject(t), e.min.copy(t.worldToLocal(e.min)), e.max.copy(t.worldToLocal(e.max))
      const r = new f(e, new m('0xffffff'))
      return (
        (r.renderOrder = 1e7),
        (r.material.depthTest = !1),
        n && t.add(r),
        () => {
          t.remove(r)
        }
      )
    }
  }, [])
}
let k = 0
function A(e, t, o, s) {
  const a = r(null),
    c = s || a,
    { worker: p, bodies: d, buffers: f, refs: m, events: x, subscriptions: v } = n(W)
  i(() => {
    c.current || (c.current = new l())
    const n = c.current,
      r = p
    let i,
      u = [n.uuid]
    return (
      n instanceof g
        ? (n.instanceMatrix.setUsage(y),
          (u = new Array(n.count).fill(0).map((e, t) => n.uuid + '/' + t)),
          (i = u.map((e, r) => {
            const i = h(b, t(r), o)
            return b.updateMatrix(), n.setMatrixAt(r, b.matrix), (n.instanceMatrix.needsUpdate = !0), i
          })))
        : (i = [h(n, t(0), o)]),
      i.forEach((e, t) => {
        ;(m[u[t]] = n), e.onCollide && ((x[u[t]] = e.onCollide), (e.onCollide = !0))
      }),
      r.postMessage({ op: 'addBodies', type: e, uuid: u, props: i }),
      () => {
        i.forEach((e, n) => {
          delete m[u[n]], e.onCollide && delete x[u[n]]
        }),
          r.postMessage({ op: 'removeBodies', uuid: u })
      }
    )
  }, []),
    w(() => {
      if (c.current && f.positions.length && f.quaternions.length)
        if (c.current instanceof g)
          for (let e = 0; e < c.current.count; e++) {
            const n = d.current[c.current.uuid + '/' + e]
            void 0 !== n && (F(b, n, f), b.updateMatrix(), c.current.setMatrixAt(e, b.matrix)),
              (c.current.instanceMatrix.needsUpdate = !0)
          }
        else F(c.current, d.current[c.current.uuid], f)
    })
  const M = u(() => {
    const e = (e) => (void 0 !== e ? c.current.uuid + '/' + e : c.current.uuid),
      n = (n, t, r) => c.current && p.postMessage({ op: n, uuid: e(t), props: r }),
      t = (e, t) => (r) => {
        const o = k++
        return (
          (v[o] = r),
          n('subscribe', t, { id: o, type: e }),
          () => {
            delete v[o], n('unsubscribe', t, o)
          }
        )
      },
      r = (e, n) => e + n.charAt(0).toUpperCase() + n.slice(1),
      o = (e, o) => ({
        set: (t, i, u) => n(r('set', e), o, [t, i, u]),
        copy: ({ x: t, y: i, z: u }) => n(r('set', e), o, [t, i, u]),
        subscribe: t(e, o),
      }),
      i = (e, o) => ({ set: (t) => n(r('set', e), o, t), subscribe: t(e, o) })
    function u(e) {
      return {
        position: o('position', e),
        rotation: o('quaternion', e),
        velocity: o('velocity', e),
        angularVelocity: o('angularVelocity', e),
        linearFactor: o('linearFactor', e),
        angularFactor: o('angularFactor', e),
        mass: i('mass', e),
        linearDamping: i('linearDamping', e),
        angularDamping: i('angularDamping', e),
        allowSleep: i('allowSleep', e),
        sleepSpeedLimit: i('sleepSpeedLimit', e),
        sleepTimeLimit: i('sleepTimeLimit', e),
        collisionFilterGroup: i('collisionFilterGroup', e),
        collisionFilterMask: i('collisionFilterMask', e),
        fixedRotation: i('fixedRotation', e),
        applyForce(t, r) {
          n('applyForce', e, [t, r])
        },
        applyImpulse(t, r) {
          n('applyImpulse', e, [t, r])
        },
        applyLocalForce(t, r) {
          n('applyLocalForce', e, [t, r])
        },
        applyLocalImpulse(t, r) {
          n('applyLocalImpulse', e, [t, r])
        },
      }
    }
    const s = {}
    return { ...u(void 0), at: (e) => s[e] || (s[e] = u(e)) }
  }, [])
  return [c, M]
}
function L(e, n) {
  return A('Plane', e, () => [], n)
}
function U(e, n, t) {
  const r = A('Box', e, (e) => e || [0.5, 0.5, 0.5], t)
  return C(r[0], n), r
}
function R(e, n, t) {
  const r = A('Cylinder', e, (e) => e, t)
  return C(r[0], n), r
}
function S(e, n, t) {
  return A('Heightfield', e, (e) => e, t)
}
function V(e, n, t) {
  return A('Particle', e, () => [], t)
}
function D(e, n, t) {
  const r = A('Sphere', e, (e) => [null != e ? e : 1], t)
  return C(r[0], n), r
}
function I(e, n) {
  return A(
    'Trimesh',
    e,
    (e) => {
      const n = e instanceof x ? e.vertices : e[0],
        t = e instanceof x ? e.faces : e[1]
      return [
        n.map((e) => (e instanceof v ? [e.x, e.y, e.z] : e)),
        t.map((e) => (e instanceof M ? [e.a, e.b, e.c] : e)),
      ]
    },
    n
  )
}
function T(e, n, t) {
  const r = A(
    'ConvexPolyhedron',
    e,
    (e) => {
      const n = e instanceof x ? e.vertices : e[0],
        t = e instanceof x ? e.faces : e[1],
        r = e instanceof x ? e.faces.map((e) => e.normal) : e[2]
      return [
        n.map((e) => (e instanceof v ? [e.x, e.y, e.z] : e)),
        t.map((e) => (e instanceof M ? [e.a, e.b, e.c] : e)),
        r && r.map((e) => (e instanceof v ? [e.x, e.y, e.z] : e)),
      ]
    },
    t
  )
  return C(r[0], n), r
}
function B(e, n) {
  return A('Compound', e, (e) => e || [], n)
}
function E(e, t, i, s = {}, a = []) {
  const { worker: c } = n(W),
    l = p.generateUUID(),
    d = r(null),
    f = r(null)
  ;(t = null == t ? d : t),
    (i = null == i ? f : i),
    o(() => {
      if (t.current && i.current)
        return (
          c.postMessage({
            op: 'addConstraint',
            uuid: l,
            type: e,
            props: [t.current.uuid, i.current.uuid, s],
          }),
          () => c.postMessage({ op: 'removeConstraint', uuid: l })
        )
    }, a)
  const m = u(
    () => ({
      enable: () => c.postMessage({ op: 'enableConstraint', uuid: l }),
      disable: () => c.postMessage({ op: 'disableConstraint', uuid: l }),
    }),
    a
  )
  return [t, i, m]
}
function P(e, n, t, r = []) {
  return E('PointToPoint', e, n, t, r)
}
function q(e, n, t, r = []) {
  return E('ConeTwist', e, n, t, r)
}
function z(e, n, t, r = []) {
  return E('Distance', e, n, t, r)
}
function j(e, n, t, r = []) {
  return E('Hinge', e, n, t, r)
}
function G(e, n, t, r = []) {
  return E('Lock', e, n, t, r)
}
function H(e, i, u, s = []) {
  const { worker: a, events: c } = n(W),
    [l] = t(() => p.generateUUID()),
    d = r(null),
    f = r(null)
  return (
    (e = null == e ? d : e),
    (i = null == i ? f : i),
    o(() => {
      if (e.current && i.current)
        return (
          a.postMessage({ op: 'addSpring', uuid: l, props: [e.current.uuid, i.current.uuid, u] }),
          (c[l] = () => {}),
          () => {
            a.postMessage({ op: 'removeSpring', uuid: l }), delete c[l]
          }
        )
    }, s),
    [e, i]
  )
}
function O(e, r, i, u = []) {
  const { worker: s, events: a } = n(W),
    [c] = t(() => p.generateUUID())
  o(
    () => (
      (a[c] = i),
      s.postMessage({ op: 'addRay', uuid: c, props: { mode: e, ...r } }),
      () => {
        s.postMessage({ op: 'removeRay', uuid: c }), delete a[c]
      }
    ),
    u
  )
}
function J(e, n, t = []) {
  O('Closest', e, n, t)
}
function K(e, n, t = []) {
  O('Any', e, n, t)
}
function N(e, n, t = []) {
  O('All', e, n, t)
}
function Q(e, t) {
  const o = t || r(null),
    { worker: s } = n(W)
  i(() => {
    var n
    o.current || (o.current = new l())
    const t = s
    let r = [o.current.uuid]
    const i = e()
    return (
      t.postMessage({
        op: 'addRaycastVehicle',
        uuid: r,
        props: [
          null == (n = i.chassisBody.current) ? void 0 : n.uuid,
          i.wheels.map((e) => {
            var n
            return null == (n = e.current) ? void 0 : n.uuid
          }),
          i.wheelInfos,
          (null == i ? void 0 : i.indexForwardAxis) || 2,
          (null == i ? void 0 : i.indexRightAxis) || 0,
          (null == i ? void 0 : i.indexUpAxis) || 1,
        ],
      }),
      () => {
        t.postMessage({ op: 'removeRaycastVehicle', uuid: r })
      }
    )
  }, [])
  const a = u(() => {
    const e = (e, n) => o.current && s.postMessage({ op: e, uuid: o.current.uuid, props: n })
    return {
      setSteeringValue(n, t) {
        e('setRaycastVehicleSteeringValue', [n, t])
      },
      applyEngineForce(n, t) {
        e('applyRaycastVehicleEngineForce', [n, t])
      },
      setBrake(n, t) {
        e('setRaycastVehicleBrake', [n, t])
      },
    }
  }, [])
  return [o, a]
}
const W = s({}),
  X = 'undefined' == typeof window ? () => null : c(() => import('./Provider-99ba7f95.js'))
function Y(n) {
  return e.createElement(a, { fallback: null }, e.createElement(X, n))
}
export {
  Y as Physics,
  W as context,
  U as useBox,
  B as useCompoundBody,
  q as useConeTwistConstraint,
  T as useConvexPolyhedron,
  R as useCylinder,
  z as useDistanceConstraint,
  S as useHeightfield,
  j as useHingeConstraint,
  G as useLockConstraint,
  V as useParticle,
  L as usePlane,
  P as usePointToPointConstraint,
  N as useRaycastAll,
  K as useRaycastAny,
  J as useRaycastClosest,
  Q as useRaycastVehicle,
  D as useSphere,
  H as useSpring,
  I as useTrimesh,
}
