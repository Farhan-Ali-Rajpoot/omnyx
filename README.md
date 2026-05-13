# **The Next.js-inspired Full-Stack Framework for Rust.**

Omnyx is a research-driven, full-stack framework designed to bring the structural layout mechanics and file-system developer experience (DX) of modern frameworks like Next.js into the high-performance world of Rust. It features a custom client-side runtime that leverages absolute coordinate-based DOM patching to achieve precise reactivity completely free of a Virtual DOM.

[![Crates.io](https://img.shields.io/crates/v/omnyx.svg)](https://crates.io/crates/omnyx)

---

# 🚀 Test This Library

To explore the architecture, audit the custom rendering engine, or test the routing core, add Omnyx to your project:

```bash
cargo add omnyx
```

---

# 💡 Why This Project Was Started

Omnyx was born out of frustration with the modern JavaScript frontend landscape. The reliance on heavy single-page application (SPA) architectures and the "reactive magic" of traditional frameworks (like React hooks, complex global state management, and the Virtual DOM) introduces a severe abstraction tax.

The Virtual DOM spends valuable CPU cycles diffing massive memory trees in the browser environment, leading to performance degradation on complex dashboards and data-heavy applications.

The initial mission of Omnyx was to prove that you could have the best of both worlds:

## The Modern DX

- File-system style routing
- Structural layout inheritance
- Parallel routes
- Nested view state

## Systems-Level Efficiency

- Native Rust engine compiling to WebAssembly (Wasm)
- No Virtual DOM
- Bare-metal rendering efficiency

---

# 🛠 Architectural Blueprint & Core Features

To achieve this, the framework moved away from traditional reactivity and implemented a custom addressing system:

## Nested Layout Inheritance

First-class support for hierarchical UI layouts directly mapped onto Rust’s strict compile-time ownership and lifetime models.

## Coordinate-Based Patching

Instead of a Virtual DOM, Omnyx maps components using precise, absolute identifier coordinates.

Example:

```text
L1 -> Layout 1
S1 -> Section 1
P1 -> Patch 1
```

The client-side runtime uses these coordinates for surgical DOM reconciliation and direct patching, making state updates incredibly lightweight.

## Bare-Metal Core

Built to utilize zero-copy serialization mechanisms to process data payloads between the server and client with minimal allocation overhead.

## Auth-Ready Flow Architecture

Native architectural entry points designed to handle secure, low-overhead session tracking and professional-grade authentication natively within a systems context.

---

# 🛑 Why This Project Was Stopped (Experimental Findings)

While the core coordinate routing and layout compilation work successfully, building complex production web applications on the framework revealed critical ecosystem constraints.

---

# 1. The Frontend Library Tax

Modern user interfaces require thousands of specialized, highly polished components developers take for granted in the JavaScript ecosystem.

## Examples

### UI & Design Primitives

- `react-icons`
- `lucide-react`

### Accessible Component Engines

- TanStack Table
- Headless state machines
- ARIA accessibility systems

> In Rust-Wasm, these primitives simply do not exist at ecosystem scale.

An engineer building a SaaS application is forced to spend enormous engineering velocity rebuilding foundational UI infrastructure.

---

# 2. The "Canvas Tax" on Data Visualization

Building modern corporate dashboards requires advanced data representation:

- Real-time graphs
- Charts
- Maps
- Tooltips
- Interactive rendering

In pure Rust, this often means manual Canvas API interaction or low-level SVG manipulation.

Compared to React chart ecosystems, the productivity gap is substantial.

---

# ⚖️ The Engineering Verdict

## ❌ Suboptimal: Global Web SaaS & Dashboards

For consumer platforms, dashboards, and public-facing web products:

### Best Stack

- Rust backend engine
- TypeScript/React frontend shell

This provides:

- Maximum iteration speed
- Massive UI ecosystem access
- Faster product delivery

---

## ⚙️ Optimal: Single-Binary Utilities & Local Clouds

Rust-native frontend compilation excels for:

- Embedded system GUIs
- Database dashboards
- Hardware monitoring panels
- Air-gapped infrastructures
- Localhost-only software

In these environments, deployment simplicity outweighs ecosystem limitations.

---

# 🏁 Current Status

Omnyx is preserved as a proof-of-concept and open-source research archive exploring:

- Coordinate-based rendering pipelines
- Zero-VDOM UI state tracking
- Absolute routing algorithms

Developers are encouraged to clone, audit, and experiment with the architecture.

---

Built with 🦀 by **Farhan Ali**