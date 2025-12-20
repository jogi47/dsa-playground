# 🎯 DSA Playground

> A comprehensive TypeScript learning resource for Data Structures, Algorithms, Design Patterns, and System Design.

![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)
![Patterns](https://img.shields.io/badge/Patterns-51-purple?style=flat-square)
![Problems](https://img.shields.io/badge/Problems-26-orange?style=flat-square)

---

## ✨ Features

| Category | Count | Description |
|----------|-------|-------------|
| 🏗️ **Design Patterns** | 51 | Core GoF + PoEAA + DDD patterns |
| 🧩 **DSA Problems** | 26 | Data structures, algorithms, and LeetCode-style problems |
| 📐 **System Design** | 7 | Real-world system architecture documents |
| 📘 **TypeScript** | Strict | Full type safety with comprehensive documentation |

---

## 📚 Table of Contents

- [Directory Structure](#-directory-structure)
- [Design Patterns](#-design-patterns)
  - [Core Patterns](#core-patterns-gof)
  - [PoEAA Patterns](#poeaa-patterns)
  - [DDD Patterns](#ddd-patterns)
- [DSA Problems](#-dsa-problems)
- [System Design](#-system-design)
- [Getting Started](#-getting-started)

---

## 📁 Directory Structure

```
dsa-playground/
├── 📂 patterns/
│   ├── 📂 core/              # 10 fundamental design patterns
│   ├── 📂 poeaa/             # 20 enterprise architecture patterns
│   │   ├── base/
│   │   ├── data-source/
│   │   ├── distribution/
│   │   ├── domain-logic/
│   │   ├── object-relational/
│   │   └── web-presentation/
│   └── 📂 ddd/               # 21 domain-driven design patterns
│       ├── building-blocks/
│       ├── strategic/
│       └── supple-design/
├── 📂 problems/
│   ├── 📂 core/              # Data structures & sorting algorithms
│   ├── 📂 easy/              # Easy difficulty problems
│   ├── 📂 medium/            # Medium difficulty problems
│   └── 📂 hard/              # Hard difficulty problems
├── 📂 system-design/         # System design documents
└── 📄 package.json
```

---

## 🏗️ Design Patterns

### Core Patterns (GoF)

| # | Pattern | Category | Description |
|---|---------|----------|-------------|
| 1 | **Factory Method** | Creational | Object creation without specifying exact class |
| 2 | **Singleton** | Creational | Single instance with global access point |
| 3 | **Builder** | Creational | Step-by-step complex object construction |
| 4 | **Prototype** | Creational | Clone existing objects without coupling |
| 5 | **Adapter** | Structural | Bridge incompatible interfaces |
| 6 | **Decorator** | Structural | Add behavior dynamically to objects |
| 7 | **Facade** | Structural | Simplified interface to complex subsystem |
| 8 | **Strategy** | Behavioral | Interchangeable algorithm families |
| 9 | **Observer** | Behavioral | Subscription-based event notification |
| 10 | **State** | Behavioral | Behavior changes based on internal state |

### PoEAA Patterns

Patterns of Enterprise Application Architecture by Martin Fowler.

<details>
<summary><b>🔷 Domain Logic Patterns (4)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Transaction Script** | Organizes business logic by procedures |
| **Domain Model** | Object model incorporating behavior and data |
| **Table Module** | Single instance handling logic for a table |
| **Service Layer** | Defines application boundary with operations |

</details>

<details>
<summary><b>🔷 Data Source Patterns (4)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Active Record** | Object wrapping a row with database access |
| **Data Mapper** | Layer separating domain objects from database |
| **Table Data Gateway** | Gateway to a database table |
| **Row Data Gateway** | Gateway to a single record |

</details>

<details>
<summary><b>🔷 Object-Relational Patterns (4)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Repository** | Collection-like interface for domain objects |
| **Unit of Work** | Maintains list of objects affected by transaction |
| **Identity Map** | Ensures each object loaded only once |
| **Lazy Load** | Defers loading of object data until needed |

</details>

<details>
<summary><b>🔷 Web Presentation Patterns (3)</b></summary>

| Pattern | Description |
|---------|-------------|
| **MVC** | Model-View-Controller separation |
| **Front Controller** | Single handler for all requests |
| **Page Controller** | Controller for each page/action |

</details>

<details>
<summary><b>🔷 Distribution Patterns (2)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Remote Facade** | Coarse-grained facade for remote access |
| **DTO** | Data transfer between processes |

</details>

<details>
<summary><b>🔷 Base Patterns (3)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Gateway** | Encapsulates access to external system |
| **Registry** | Well-known object for finding services |
| **Value Object** | Immutable object defined by its attributes |

</details>

### DDD Patterns

Domain-Driven Design patterns from Eric Evans' book.

<details>
<summary><b>🔶 Building Blocks (8)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Entity** | Object defined by identity, not attributes |
| **Value Object** | Immutable object defined by attributes |
| **Aggregate** | Cluster of objects with consistency boundary |
| **Domain Event** | Record of something that happened |
| **Domain Service** | Stateless operations on domain concepts |
| **Repository** | Collection-like interface for aggregates |
| **Factory** | Encapsulates complex object creation |
| **Module** | Grouping related domain concepts |

</details>

<details>
<summary><b>🔶 Strategic Design (8)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Bounded Context** | Explicit boundary with unified model |
| **Context Map** | Visualization of context relationships |
| **Shared Kernel** | Shared subset between contexts |
| **Customer/Supplier** | Upstream/downstream relationship |
| **Conformist** | Following upstream model as-is |
| **Anti-Corruption Layer** | Translation between contexts |
| **Open Host Service** | Protocol/API for external access |
| **Published Language** | Well-documented shared language |

</details>

<details>
<summary><b>🔶 Supple Design (5)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Intention-Revealing Interface** | Names that express intent |
| **Side-Effect-Free Functions** | Pure functions in domain |
| **Assertions** | Post-conditions and invariants |
| **Standalone Classes** | Self-contained, low dependency |
| **Specification** | Business rules as objects |

</details>

---

## 🧩 DSA Problems

### Core Data Structures & Algorithms

| Type | Implementations |
|------|----------------|
| **Data Structures** | Dynamic Array, Singly Linked List, Deque, BST, Hash Table, Heap, Graph, Disjoint Set, Segment Tree |
| **Sorting** | Insertion Sort, Merge Sort, Quick Sort |

### Problems by Difficulty

<details>
<summary><b>🟢 Easy (4 problems)</b></summary>

| Problem | Technique |
|---------|-----------|
| Two Sum | Hash Map |
| Contains Duplicate | Set |
| Valid Anagram | Character Count |
| Valid Palindrome | Two Pointers |

</details>

<details>
<summary><b>🟡 Medium (9 problems)</b></summary>

| Problem | Technique |
|---------|-----------|
| Group Anagrams | Hash Map |
| Top K Frequent Elements | Heap / Bucket Sort |
| Encode and Decode Strings | String Manipulation |
| Product of Array Except Self | Prefix/Suffix |
| Valid Sudoku | Hash Set |
| Longest Consecutive Sequence | Set |
| Two Sum II | Two Pointers |
| Three Sum | Two Pointers |
| Container with Most Water | Two Pointers |

</details>

<details>
<summary><b>🔴 Hard (1 problem)</b></summary>

| Problem | Technique |
|---------|-----------|
| Trapping Rain Water | Two Pointers / Stack |

</details>

---

## 📐 System Design

Comprehensive system design documents for real-world applications:

| # | System | Description |
|---|--------|-------------|
| 1 | **Todo App** | Full-stack task management application |
| 2 | **Trading App** | Trading platform architecture |
| 3 | **E2B Sandbox** | Code execution sandbox environment |
| 4 | **Lovable Clone** | AI-powered app builder |
| 5 | **Codeforces Clone** | Competitive programming platform |
| 6 | **Replit Clone** | Online IDE and development environment |
| 7 | **Cloudflare Workers Runtime** | Edge computing runtime |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dsa-playground.git
cd dsa-playground

# Install dependencies
npm install
```

### Running Examples

```bash
# Run any TypeScript file directly
npx ts-node patterns/core/001-factory-method.ts

# Run a DSA problem
npx ts-node problems/medium/001-group-anagrams.ts
```

---

## 📄 License

MIT

---

<p align="center">
  <sub>Built for learning and reference 📚</sub>
</p>
