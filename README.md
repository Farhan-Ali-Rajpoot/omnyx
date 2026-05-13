# Omnyx-NextJS (Experimental Research)

> **Status: Archived / Research Experiment** > This repository contains the original exploration into high-performance UI inheritance and React-like routing patterns implemented in Rust. It has been succeeded by the bare-metal backend engine: [Omnyx-Core](link-to-new-repo).

## 🧪 The Experiment
The goal of this project was to explore if the architectural purity of Rust could be applied to complex, layout-driven frontend UIs (Parallel Routes, Layout Nesting, and State Hydration) without the overhead of a traditional Virtual DOM.

### Key Research Areas:
* **UI Inheritance:** Mapping hierarchical layouts to Rust's ownership model.
* **Auth Flow Architecture:** Implementing secure, sharp authentication patterns in a systems-centric environment.
* **Routing Logic:** Experimenting with coordinate-based DOM patching (L1, S1, P1) for surgical updates.

## 🏁 The Conclusion
During development, it became clear that while Rust excels at systems-level performance, the "UI Inheritance" tax on the frontend often conflicts with the "Bare-Metal" goals of the framework. 

**Lessons Learned:**
1. Rust is the ultimate tool for the **Engine** (Backend/Infrastructure), but JavaScript/TypeScript remains the standard for the **Dashboard** (UI).
2. The Virtual DOM is a bottleneck, but the solution isn't just "Rust for Frontend"—it's a high-performance, protocol-first backend.

*This project is preserved here as a demonstration of architectural patterns and original full-stack logic.*

# Omnyx

**The Bare-Metal Infrastructure Backbone for High-Performance AI & Data Services.**

Omnyx is a high-speed, protocol-first Rust framework designed for engineers who prioritize systems efficiency over UI bloat. Powered by **Pingora**, it is built to handle massive throughput with zero-copy memory overhead.

[![Crates.io](https://img.shields.io/crates/v/omnyx.svg)](https://crates.io/crates/omnyx)

## 🚀 Installation

Add Omnyx to your project:

```bash
cargo add omnyx