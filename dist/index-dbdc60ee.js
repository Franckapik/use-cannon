import e, {
  useContext as n,
  useState as t,
  useRef as r,
  useEffect as o,
  useLayoutEffect as i,
  useMemo as s,
  createContext as a,
  Suspense as u,
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
  Geometry as v,
  Vector3 as x,
  Face3 as h,
} from 'three'
import { useFrame as b } from 'react-three-fiber'
function w() {
  return (w =
    Object.assign ||
    function (e) {
      for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n]
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
      }
      return e
    }).apply(this, arguments)
}
const M = new l()
function F(e, n, t) {
  return (
    (n.args = t(n.args)),
    e.position.set(...(n.position || [0, 0, 0])),
    e.rotation.set(...(n.rotation || [0, 0, 0])),
    n
  )
}
function C(e, n, t) {
  void 0 !== n && (e.position.fromArray(t.positions, 3 * n), e.quaternion.fromArray(t.quaternions, 4 * n))
}
function k(e, n) {
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
let A = 0
function L(e, t, o, a) {
  const u = r(null),
    c = a || u,
    { worker: p, bodies: d, buffers: f, refs: m, events: v, subscriptions: x } = n(W)
  i(() => {
    c.current || (c.current = new l())
    const n = c.current,
      r = p
    let i,
      s = [n.uuid]
    return (
      n instanceof g
        ? (n.instanceMatrix.setUsage(y),
          (s = new Array(n.count).fill(0).map((e, t) => n.uuid + '/' + t)),
          (i = s.map((e, r) => {
            const i = F(M, t(r), o)
            return M.updateMatrix(), n.setMatrixAt(r, M.matrix), (n.instanceMatrix.needsUpdate = !0), i
          })))
        : (i = [F(n, t(0), o)]),
      i.forEach((e, t) => {
        ;(m[s[t]] = n), e.onCollide && ((v[s[t]] = e.onCollide), (e.onCollide = !0))
      }),
      r.postMessage({ op: 'addBodies', type: e, uuid: s, props: i }),
      () => {
        i.forEach((e, n) => {
          delete m[s[n]], e.onCollide && delete v[s[n]]
        }),
          r.postMessage({ op: 'removeBodies', uuid: s })
      }
    )
  }, []),
    b(() => {
      if (c.current && f.positions.length && f.quaternions.length)
        if (c.current instanceof g)
          for (let e = 0; e < c.current.count; e++) {
            const n = d.current[c.current.uuid + '/' + e]
            void 0 !== n && (C(M, n, f), M.updateMatrix(), c.current.setMatrixAt(e, M.matrix)),
              (c.current.instanceMatrix.needsUpdate = !0)
          }
        else C(c.current, d.current[c.current.uuid], f)
    })
  const h = s(() => {
    const e = (e) => (void 0 !== e ? c.current.uuid + '/' + e : c.current.uuid),
      n = (n, t, r) => c.current && p.postMessage({ op: n, uuid: e(t), props: r }),
      t = (e, t) => (r) => {
        const o = A++
        return (
          (x[o] = r),
          n('subscribe', t, { id: o, type: e }),
          () => {
            delete x[o], n('unsubscribe', t, o)
          }
        )
      },
      r = (e, n) => e + n.charAt(0).toUpperCase() + n.slice(1),
      o = (e, o) => ({
        set: (t, i, s) => n(r('set', e), o, [t, i, s]),
        copy: ({ x: t, y: i, z: s }) => n(r('set', e), o, [t, i, s]),
        subscribe: t(e, o),
      }),
      i = (e, o) => ({ set: (t) => n(r('set', e), o, t), subscribe: t(e, o) })
    function s(e) {
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
    const a = {}
    return w({}, s(void 0), { at: (e) => a[e] || (a[e] = s(e)) })
  }, [])
  return [c, h]
}
function U(e, n) {
  return L('Plane', e, () => [], n)
}
function R(e, n, t) {
  const r = L('Box', e, (e) => e || [0.5, 0.5, 0.5], t)
  return k(r[0], n), r
}
function S(e, n, t) {
  const r = L('Cylinder', e, (e) => e, t)
  return k(r[0], n), r
}
function V(e, n, t) {
  return L('Heightfield', e, (e) => e, t)
}
function D(e, n, t) {
  return L('Particle', e, () => [], t)
}
function I(e, n, t) {
  const r = L('Sphere', e, (e) => [null != e ? e : 1], t)
  return k(r[0], n), r
}
function P(e, n) {
  return L(
    'Trimesh',
    e,
    (e) => {
      const n = e instanceof v ? e.vertices : e[0],
        t = e instanceof v ? e.faces : e[1]
      return [
        n.map((e) => (e instanceof x ? [e.x, e.y, e.z] : e)),
        t.map((e) => (e instanceof h ? [e.a, e.b, e.c] : e)),
      ]
    },
    n
  )
}
function T(e, n, t) {
  const r = L(
    'ConvexPolyhedron',
    e,
    (e) => {
      const n = e instanceof v ? e.vertices : e[0],
        t = e instanceof v ? e.faces : e[1],
        r = e instanceof v ? e.faces.map((e) => e.normal) : e[2]
      return [
        n.map((e) => (e instanceof x ? [e.x, e.y, e.z] : e)),
        t.map((e) => (e instanceof h ? [e.a, e.b, e.c] : e)),
        r && r.map((e) => (e instanceof x ? [e.x, e.y, e.z] : e)),
      ]
    },
    t
  )
  return k(r[0], n), r
}
function B(e, n) {
  return L('Compound', e, (e) => e || [], n)
}
function E(e, t, i, a = {}, u = []) {
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
            props: [t.current.uuid, i.current.uuid, a],
          }),
          () => c.postMessage({ op: 'removeConstraint', uuid: l })
        )
    }, u)
  const m = s(
    () => ({
      enable: () => c.postMessage({ op: 'enableConstraint', uuid: l }),
      disable: () => c.postMessage({ op: 'disableConstraint', uuid: l }),
    }),
    u
  )
  return [t, i, m]
}
function j(e, n, t, r = []) {
  return E('PointToPoint', e, n, t, r)
}
function q(e, n, t, r = []) {
  return E('ConeTwist', e, n, t, r)
}
function O(e, n, t, r = []) {
  return E('Distance', e, n, t, r)
}
function z(e, n, t, r = []) {
  return E('Hinge', e, n, t, r)
}
function G(e, n, t, r = []) {
  return E('Lock', e, n, t, r)
}
function H(e, i, s, a = []) {
  const { worker: u, events: c } = n(W),
    [l] = t(() => p.generateUUID()),
    d = r(null),
    f = r(null)
  return (
    (e = null == e ? d : e),
    (i = null == i ? f : i),
    o(() => {
      if (e.current && i.current)
        return (
          u.postMessage({ op: 'addSpring', uuid: l, props: [e.current.uuid, i.current.uuid, s] }),
          (c[l] = () => {}),
          () => {
            u.postMessage({ op: 'removeSpring', uuid: l }), delete c[l]
          }
        )
    }, a),
    [e, i]
  )
}
function _(e, r, i, s = []) {
  const { worker: a, events: u } = n(W),
    [c] = t(() => p.generateUUID())
  o(
    () => (
      (u[c] = i),
      a.postMessage({ op: 'addRay', uuid: c, props: w({ mode: e }, r) }),
      () => {
        a.postMessage({ op: 'removeRay', uuid: c }), delete u[c]
      }
    ),
    s
  )
}
function J(e, n, t = []) {
  _('Closest', e, n, t)
}
function K(e, n, t = []) {
  _('Any', e, n, t)
}
function N(e, n, t = []) {
  _('All', e, n, t)
}
function Q(e, t) {
  const o = t || r(null),
    { worker: a } = n(W)
  i(() => {
    var n
    o.current || (o.current = new l())
    const t = a
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
  const u = s(() => {
    const e = (e, n) => o.current && a.postMessage({ op: e, uuid: o.current.uuid, props: n })
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
  return [o, u]
}
const W = a({}),
  X = 'undefined' == typeof window ? () => null : c(() => import('./Provider-42edc225.js'))
function Y(n) {
  return e.createElement(u, { fallback: null }, e.createElement(X, n))
}
export {
  Y as P,
  w as _,
  R as a,
  S as b,
  W as c,
  V as d,
  D as e,
  I as f,
  P as g,
  T as h,
  B as i,
  j,
  q as k,
  O as l,
  z as m,
  G as n,
  H as o,
  J as p,
  K as q,
  N as r,
  Q as s,
  U as u,
}
