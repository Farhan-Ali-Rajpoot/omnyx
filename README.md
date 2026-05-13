# Omnyx (Experimental R&D Archive)

**An experimental attempt to explore Next.js-inspired frontend architecture inside Rust using WebAssembly (Wasm).**

Omnyx was a research project built to test whether modern frontend concepts like:

- Nested layouts
- Reactive UI patching
- Server/client rendering coordination
- Lightweight rendering pipelines

could work efficiently in a Rust-native full-stack environment.

Instead of using a Virtual DOM, Omnyx implemented a custom coordinate-based DOM patching runtime written for WebAssembly.

The goal was simple:

> Explore whether Rust could realistically power modern frontend systems beyond backend infrastructure.

[![Crates.io](https://img.shields.io/crates/v/omnyx.svg)](https://crates.io/crates/omnyx)

---

> [!WARNING]
> ## Project Status: Archived Experimental Prototype
>
> Omnyx is preserved only as a research experiment and proof-of-concept.
>
> This project ultimately concluded that Rust is excellent for backend systems and infrastructure engineering, but currently not practical for large-scale frontend ecosystem development.

---

# 🚀 Try the Prototype

```bash
cargo add omnyx
```

---

# 💡 Why This Experiment Started

Modern frontend frameworks heavily rely on runtime abstractions:

- Virtual DOM diffing
- Reactive hooks
- Hydration systems
- Large client-side state engines

Omnyx attempted to explore a lower-level alternative using Rust + Wasm.

The runtime used direct coordinate-based DOM patching instead of Virtual DOM tree diffing in order to reduce browser overhead and improve rendering efficiency.

---

# 🛠 What the Experiment Discovered

From a pure performance standpoint, the architecture worked.

The real problem was not speed.

The real problem was the frontend ecosystem.

Modern frontend engineering depends on massive JavaScript ecosystems that simply do not exist in Rust-Wasm environments.

Examples:

- `three.js` for 3D rendering
- `react-icons`
- `lucide-react`
- charting libraries
- animation engines
- accessibility systems
- mature UI component ecosystems

In JavaScript/React ecosystems, these tools are instantly available.

In Rust frontend development, developers are forced to manually build basic UI infrastructure from scratch.

Even simple frontend tasks become expensive engineering problems.

---

# ⚖️ Final Conclusion

This experiment led to a very clear engineering conclusion:

## Rust Wins the Backend

Rust is exceptional for:

- High-performance backend servers
- Infrastructure systems
- Databases
- Networking
- Concurrent systems
- APIs
- Systems programming

Rust belongs in the engine layer.

---

## JavaScript Wins the Frontend

JavaScript remains the dominant frontend language because its ecosystem is unmatched.

Frontend development today depends heavily on:

- UI libraries
- Rendering engines
- Browser tooling
- Design systems
- Visualization frameworks
- Rapid iteration ecosystems

Frameworks like React and Next.js succeed not only because of the language, but because of the ecosystem surrounding them.

That ecosystem currently cannot be replicated in Rust.

---

# 🏁 Lessons Learned

Omnyx proved that low-level frontend rendering in Rust is technically possible.

But it also proved that frontend development is fundamentally ecosystem-driven, not just performance-driven.

The best modern architecture is often:

- Rust for backend systems
- JavaScript/TypeScript for frontend interfaces

Rust builds the machine.

JavaScript builds the dashboard.

---

Built with 🦀 by **Farhan Ali**