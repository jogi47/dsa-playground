# 🎯 DSA Playground

> A comprehensive TypeScript learning resource for Data Structures, Algorithms, Design Patterns, and System Design.

![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)
![Patterns](https://img.shields.io/badge/Patterns-112-purple?style=flat-square)
![Problems](https://img.shields.io/badge/Problems-26-orange?style=flat-square)

---

## ✨ Features

| Category | Count | Description |
|----------|-------|-------------|
| 🏗️ **Design Patterns** | 112 | Core GoF + PoEAA + DDD + Refactoring patterns |
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
  - [Refactoring Patterns](#refactoring-patterns)
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
│   ├── 📂 ddd/               # 21 domain-driven design patterns
│   │   ├── building-blocks/
│   │   ├── strategic/
│   │   └── supple-design/
│   └── 📂 refactoring/       # 61 refactoring patterns
│       ├── basic/
│       ├── encapsulation/
│       ├── moving-features/
│       ├── organizing-data/
│       ├── simplifying-conditional/
│       ├── refactoring-apis/
│       ├── inheritance/
│       └── docs/
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

### Refactoring Patterns

Refactoring patterns from Martin Fowler's "Refactoring: Improving the Design of Existing Code" (2nd Edition).

<details>
<summary><b>🔧 Basic Refactorings (11)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Extract Function** | Create a new function from code fragment |
| **Inline Function** | Replace function call with function body |
| **Extract Variable** | Replace expression with named variable |
| **Inline Variable** | Replace variable with its value |
| **Change Function Declaration** | Rename function or change parameters |
| **Encapsulate Variable** | Wrap variable access in functions |
| **Rename Variable** | Give variable a clearer name |
| **Introduce Parameter Object** | Replace related parameters with object |
| **Combine Functions into Class** | Group functions operating on same data |
| **Combine Functions into Transform** | Create transformation function for data |
| **Split Phase** | Separate code into distinct phases |

</details>

<details>
<summary><b>🔧 Encapsulation (9)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Encapsulate Record** | Replace record with class |
| **Encapsulate Collection** | Return copy, not reference |
| **Replace Primitive with Object** | Wrap primitive in meaningful class |
| **Replace Temp with Query** | Extract temp calculation to method |
| **Extract Class** | Split class with multiple responsibilities |
| **Inline Class** | Merge class with insufficient behavior |
| **Hide Delegate** | Remove dependency on delegate's interface |
| **Remove Middle Man** | Let clients call delegate directly |
| **Substitute Algorithm** | Replace algorithm with clearer one |

</details>

<details>
<summary><b>🔧 Moving Features (9)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Move Function** | Move function to better context |
| **Move Field** | Move field to class that uses it more |
| **Move Statements into Function** | Move statements into called function |
| **Move Statements to Callers** | Move statements out to callers |
| **Replace Inline Code with Function Call** | Replace code with existing function |
| **Slide Statements** | Move related code together |
| **Split Loop** | Separate loops that do multiple things |
| **Replace Loop with Pipeline** | Use collection pipeline operations |
| **Remove Dead Code** | Delete unreachable or unused code |

</details>

<details>
<summary><b>🔧 Organizing Data (5)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Split Variable** | Create separate variable for each purpose |
| **Rename Field** | Give field a clearer name |
| **Replace Derived Variable with Query** | Replace stored calculation with method |
| **Change Reference to Value** | Make object immutable value object |
| **Change Value to Reference** | Share single instance across system |

</details>

<details>
<summary><b>🔧 Simplifying Conditional Logic (6)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Decompose Conditional** | Extract condition and branches to functions |
| **Consolidate Conditional Expression** | Combine related conditions |
| **Replace Nested Conditional with Guard Clauses** | Use guard clauses for special cases |
| **Replace Conditional with Polymorphism** | Use polymorphism instead of conditionals |
| **Introduce Special Case** | Handle special case with dedicated class |
| **Introduce Assertion** | Make assumptions explicit with assertions |

</details>

<details>
<summary><b>🔧 Refactoring APIs (10)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Separate Query from Modifier** | Split function that queries and modifies |
| **Parameterize Function** | Add parameter to generalize function |
| **Remove Flag Argument** | Replace flag with separate functions |
| **Preserve Whole Object** | Pass whole object instead of fields |
| **Replace Parameter with Query** | Remove parameter obtainable from other data |
| **Replace Query with Parameter** | Pass value instead of querying global state |
| **Remove Setting Method** | Make field immutable after construction |
| **Replace Constructor with Factory Function** | Use factory for flexible creation |
| **Replace Function with Command** | Wrap function in command object |
| **Replace Command with Function** | Simplify command back to function |

</details>

<details>
<summary><b>🔧 Dealing with Inheritance (11)</b></summary>

| Pattern | Description |
|---------|-------------|
| **Pull Up Method** | Move method from subclasses to superclass |
| **Pull Up Field** | Move field from subclasses to superclass |
| **Pull Up Constructor Body** | Move common constructor code to super |
| **Push Down Method** | Move method from superclass to subclasses |
| **Push Down Field** | Move field from superclass to subclasses |
| **Replace Type Code with Subclasses** | Use subclasses instead of type field |
| **Remove Subclass** | Replace subclass with field in superclass |
| **Extract Superclass** | Create superclass from common features |
| **Collapse Hierarchy** | Merge superclass and subclass |
| **Replace Subclass with Delegate** | Use composition instead of inheritance |
| **Replace Superclass with Delegate** | Delegate instead of inheriting |

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
npx ts-node patterns/core/01-factory-method.ts

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
