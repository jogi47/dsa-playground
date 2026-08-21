# Topic 5.6: Preserve Information Provenance and Handle Uncertainty in Multi-Source Synthesis

This note explains how to synthesize across many documents, tools, and subagents without losing where claims came from or how certain they are. For the exam, Topic 5.6 is not mainly about "add citations at the end." It is about preserving claim-level evidence, source dates, conflicts, and uncertainty through every layer of summarization.

Topic 5.1 focused on preserving critical context over long interactions. Topic 5.3 focused on propagating failures and coverage gaps across subagents. Topic 5.6 combines those ideas for research and extraction workflows: the final synthesis must show what is well-supported, what is contested, and what source context shaped the answer.

## Why This Topic Matters

Multi-source synthesis fails quietly when a polished final answer hides the evidence path.

Common failure pattern:

1. A search subagent gathers sources with URLs and dates.
2. A document subagent summarizes each source into prose.
3. A synthesis agent merges the prose.
4. The final report contains clean conclusions, but no one can tell which source supports which claim.
5. Conflicting numbers get averaged, ignored, or overwritten by the most recent-looking summary.

That is dangerous in the exam scenarios:

- In Scenario 3, a multi-agent research system must produce cited reports. If attribution is lost between subagents, the coordinator cannot verify the report.
- In Scenario 6, a structured extraction system may combine multiple documents. If contradictory values are hidden, downstream systems may store the wrong field with false confidence.

The central risk is false certainty. A synthesis may sound authoritative even when the evidence is mixed, stale, incomplete, or methodologically different.

## What the Exam Is Testing

For Topic 5.6, the exam is usually testing whether you understand these ideas:

- source attribution is often lost during summarization unless the workflow preserves claim-source mappings explicitly
- citations should attach to individual claims, not only to whole reports
- downstream synthesis agents must preserve and merge evidence metadata from upstream agents
- credible sources can conflict, and the correct response is usually to annotate the conflict rather than choose one value silently
- publication dates, data collection dates, document versions, and retrieval dates matter for temporal interpretation
- contested findings should be separated from well-established findings
- final rendering should fit the content type instead of forcing every finding into one generic summary format

The durable exam skill is:

```text
carry evidence metadata with every claim,
separate established findings from contested findings,
and make uncertainty visible instead of smoothing it away
```

## Current Anthropic Terminology vs Exam Wording

### Current docs have first-class citations, but provenance is still a workflow design problem

As of July 2, 2026, Anthropic's Claude API docs include a `Citations` feature for document-grounded answers. Documents and search results can be passed with citation support so Claude can return source pointers tied to text spans, pages, or search-result blocks.

That helps Topic 5.6, but it does not remove the need for architecture.

You still need to decide:

- which sources are eligible evidence
- what metadata must be stored with each source
- how subagents return claim-source mappings
- how conflicts are represented
- how final reports preserve uncertainty
- which critical claims require human review or deterministic validation

The exam wording may say "source attribution" or "claim-source mappings." Current docs may say `citations`, `search_result` content blocks, or structured outputs. Treat those as implementation tools for the same broader concept: provenance must survive synthesis.

### Citations and structured outputs may require separate passes

Current Anthropic docs document both:

- `Citations` for grounding text in supplied documents and search results
- `structured outputs` using `output_config.format` for schema-constrained JSON

Important current nuance: citations and structured outputs are documented as incompatible in the same response when citations are enabled on user-provided documents or search results.

That means a strong production workflow may use multiple stages:

1. evidence extraction with citations enabled
2. application code stores claim-source mappings
3. structured synthesis or routing uses those mappings as normal input data
4. final rendering includes citations, source IDs, dates, and uncertainty fields

Do not assume one API parameter solves both provenance and schema enforcement in one step.

### Older wording may emphasize `Task`; current subagent wording often says `Agent`

Topic 5.6 mentions subagents because research systems often split search, document analysis, synthesis, and reporting. Older exam wording may refer to the `Task` tool; current Anthropic materials often use `Agent` for subagent invocation.

The tested concept is stable:

- subagents have isolated context
- they must return source metadata explicitly
- the coordinator cannot recover provenance that a subagent dropped

## The Core Mental Model

The simplest correct mental model is:

```text
source -> extracted claim + metadata -> claim-source map -> synthesis -> final report
```

The claim should never travel alone.

Every material claim should carry:

- what the claim says
- which source supports it
- where in the source it appears
- when the source was published, collected, or retrieved
- whether the source directly states it or the system inferred it
- whether other credible sources conflict with it
- how strong the support is

Another useful framing:

```text
summaries are lossy
claim-source maps are durable
uncertainty is data, not wording polish
```

## Provenance vs Citation vs Confidence

These terms are related, but they are not the same.

| Term | Meaning | Exam risk if missing |
| --- | --- | --- |
| Provenance | Full origin trail for a claim or value | final answer cannot be audited |
| Citation | Pointer to source location supporting a claim | source support becomes vague |
| Confidence | System's estimate of reliability | uncertainty gets hidden or overstated |
| Coverage | Which sources or branches were checked | missing research looks complete |
| Methodology | How a source produced a value | conflicting numbers look like direct contradictions |

A report can have citations but weak provenance if it does not preserve dates, source type, collection method, or conflict status.

A report can have confidence scores but weak provenance if the reader cannot inspect the source support.

For the exam, the strongest answer usually combines:

- source IDs
- claim IDs
- direct evidence snippets or citation locations
- source metadata
- conflict annotations
- coverage notes
- final uncertainty labels

## Implementation and Workflow Guidance

### 1. Require structured claim-source mappings from subagents

Do not let subagents return only prose summaries.

Weak subagent output:

```text
Several sources suggest adoption increased in 2025, but the exact rate varies.
```

Stronger subagent output:

```yaml
claims:
  - claim_id: c1
    claim: Adoption increased in 2025.
    support_status: supported
    evidence:
      - source_id: s1
        source_title: 2025 Market Survey
        source_url: https://example.com/market-survey
        publication_date: 2026-01-15
        data_collection_period: 2025-Q4
        location: section 2
        excerpt: "..."
    uncertainty:
      level: medium
      reason: source reports survey data from one region only
```

The exact schema can vary. The exam point is that downstream agents receive evidence as structured state, not as buried wording.

### 2. Separate source registry from claim registry

A good synthesis pipeline usually keeps two related structures.

The source registry describes sources:

```yaml
sources:
  - source_id: s1
    title: 2025 Market Survey
    url: https://example.com/market-survey
    author_or_publisher: Example Research Group
    publication_date: 2026-01-15
    data_collection_period: 2025-Q4
    retrieved_at: 2026-07-02
    source_type: survey_report
    notes: regional sample; methodology disclosed
```

The claim registry maps claims to those sources:

```yaml
claims:
  - claim_id: c1
    claim: Adoption increased in 2025.
    evidence_source_ids: [s1, s3]
    conflict_source_ids: [s2]
    confidence_label: moderate
    status: contested
```

This prevents repeated source metadata from bloating every claim while keeping every claim auditable.

### 3. Preserve dates as first-class fields

Dates are not decoration in multi-source synthesis.

You often need multiple dates:

- `publication_date`: when the source was published
- `data_collection_period`: when the underlying data was collected
- `document_effective_date`: when a policy or contract became active
- `retrieved_at`: when your system accessed the source
- `version_date`: when a source version was last updated

Without dates, the system may misread time as contradiction.

Example:

| Source | Reported value | Collection period | Interpretation |
| --- | --- | --- | --- |
| Source A | 12% | 2024-Q4 | earlier baseline |
| Source B | 18% | 2025-Q4 | later measurement |

This may be trend evidence, not conflict evidence.

But this is a real conflict:

| Source | Reported value | Collection period | Interpretation |
| --- | --- | --- | --- |
| Source A | 12% | 2025-Q4 | same period |
| Source B | 18% | 2025-Q4 | conflicting values |

The exam expects you to preserve enough temporal metadata to tell the difference.

### 4. Keep contested findings separate from established findings

A final report should not blend everything into one certainty level.

Useful report sections:

- well-established findings
- contested findings
- source-limited findings
- missing coverage
- assumptions and open questions

Example:

```text
Well-established:
- Three independent sources agree that the policy changed after January 2026.

Contested:
- Refund-rate impact is unclear. Source A reports a decrease for Q1 2026, while Source B reports no material change for the same period. The sources use different sampling methods.

Coverage gaps:
- Internal exception-handling documents were not available, so conclusions apply only to public policy text and uploaded customer records.
```

That is stronger than a single confident paragraph that hides disagreement.

### 5. Preserve conflicting credible values with attribution

When credible sources disagree, do not average, pick, or discard without a reason.

Weak pattern:

```text
The market size is about $10B.
```

Stronger pattern:

```text
Market-size estimates vary:

| Source | Estimate | Date | Method note |
| --- | --- | --- | --- |
| Source A | $8.7B | 2025 report | survey-based |
| Source B | $12.1B | 2026 report | revenue-model estimate |

The difference should be treated as contested, not reconciled, unless a downstream reviewer chooses a preferred methodology.
```

This is exactly what Topic 5.6 means by preserving conflicting values with attribution.

### 6. Track direct statements separately from model inferences

Not all claims have the same evidence type.

Use fields such as:

- `direct_quote`
- `paraphrase`
- `calculation`
- `model_inference`
- `source_absent`

Example:

```yaml
claim:
  text: The customer is likely eligible for a replacement.
  evidence_type: model_inference
  direct_sources:
    - order delivered damaged
    - warranty period active
  missing_inputs:
    - photo evidence not yet reviewed
  status: provisional
```

This avoids turning a model conclusion into a source fact.

### 7. Make provenance survive summarization layers

Each compression step should preserve the evidence map.

Weak pipeline:

```text
source notes -> summary -> shorter summary -> final report
```

Stronger pipeline:

```text
source notes
    -> extracted claims with source IDs
    -> merged claim registry
    -> synthesis over claim registry
    -> final report with citations and conflict notes
```

The synthesis agent should be instructed to:

- never drop `source_id`
- merge duplicate claims while preserving all supporting sources
- keep conflict records attached
- preserve source dates
- mark claims as unsupported if evidence is missing
- separate "not found" from "not checked"

### 8. Design output schemas for uncertainty

A useful schema has explicit uncertainty fields.

Example:

```json
{
  "claim_id": "c17",
  "claim": "The policy applies to orders placed after March 1, 2026.",
  "status": "contested",
  "supporting_sources": [
    {
      "source_id": "policy-v4",
      "location": "section 3",
      "publication_date": "2026-03-01",
      "evidence_type": "direct_statement"
    }
  ],
  "conflicting_sources": [
    {
      "source_id": "faq-v3",
      "location": "refund FAQ",
      "publication_date": "2026-02-20",
      "evidence_type": "direct_statement"
    }
  ],
  "uncertainty": {
    "level": "high",
    "reason": "two official documents conflict and no supersession rule was provided"
  },
  "recommended_route": "human_review"
}
```

This lets the coordinator route contested findings instead of relying on polished prose.

### 9. Render content in the format that preserves meaning

The outline explicitly tests rendering choices.

Do not force every output into the same format.

| Content type | Better rendering | Why |
| --- | --- | --- |
| financial values | table with source, amount, date, currency, method | prevents hidden numeric conflicts |
| news or chronology | timeline with publication and event dates | preserves temporal sequence |
| technical findings | structured list with claim, evidence, severity, caveat | supports scanning and verification |
| policy analysis | rule table plus exceptions and source sections | separates rule from interpretation |
| extraction conflicts | field-level comparison table | shows which value came from which document |

Format is part of reliability. A table can preserve distinctions that prose would blur.

### 10. Include coverage notes in final synthesis

The final answer should say what was and was not checked.

Useful coverage fields:

- sources reviewed
- source types omitted
- unavailable sources
- date range covered
- regions, systems, or document types excluded
- subagent branches that failed or returned empty results

This connects Topic 5.6 to Topic 5.3. If a branch failed, the synthesis should not sound complete.

Example:

```text
Coverage note:
- Reviewed: public policy pages, uploaded customer contract, and three search results from 2026.
- Not reviewed: internal exception-policy repository because access was unavailable.
- Therefore: conclusions about public policy are supported; conclusions about internal exception handling are incomplete.
```

## Multi-Agent Research Pattern

A strong Scenario 3 architecture often looks like this:

```text
coordinator
    ->
search subagent returns source registry + search-result citations
    ->
document analysis subagent returns claim-source mappings
    ->
verification subagent checks high-impact claims against source text
    ->
synthesis subagent merges claims into established, contested, and incomplete sections
    ->
reporting subagent renders tables, timelines, and prose as appropriate
```

Each subagent should receive an output contract.

Search subagent returns:

- source IDs
- URLs or document IDs
- titles
- publishers
- publication dates
- retrieval dates
- result snippets or cited search-result blocks

Document analysis subagent returns:

- extracted claims
- source locations
- relevant excerpts
- data collection dates
- direct-vs-inferred labels
- uncertainty notes

Synthesis subagent returns:

- merged claim registry
- well-supported findings
- contested findings
- unsupported or missing findings
- source coverage notes
- final report draft

The coordinator owns the merge policy. A subagent should not silently decide that one credible source "wins" unless its role explicitly includes adjudication criteria.

## Structured Extraction Pattern

In Scenario 6, provenance is field-level.

Weak extraction:

```json
{
  "effective_date": "2026-04-01",
  "contract_value": "250000"
}
```

Stronger extraction:

```json
{
  "fields": {
    "effective_date": {
      "value": "2026-04-01",
      "status": "contested",
      "sources": [
        {
          "document_id": "base-contract",
          "location": "page 1",
          "evidence": "effective April 1, 2026"
        }
      ],
      "conflicts": [
        {
          "document_id": "amendment-2",
          "location": "page 2",
          "evidence": "effective May 1, 2026"
        }
      ],
      "recommended_route": "human_review"
    },
    "contract_value": {
      "value": "250000",
      "currency": "USD",
      "status": "supported",
      "sources": [
        {
          "document_id": "base-contract",
          "location": "fee schedule"
        }
      ]
    }
  }
}
```

This output is more useful because downstream systems can:

- auto-accept supported fields
- route contested fields to review
- display evidence to reviewers
- avoid overwriting a conflict with a single value

## Conflict Handling Policy

A synthesis workflow needs explicit rules for conflict handling.

Good default policy:

```text
if credible sources conflict on a material value:
  preserve each value with source attribution
  compare publication and collection dates
  compare methodology and source authority
  mark the finding as contested unless a clear adjudication rule exists
  route high-impact contested findings to human review
```

Possible adjudication rules:

- newer version supersedes older version
- contract amendment supersedes base contract
- official policy source supersedes unofficial FAQ
- audited financial statement supersedes press article
- source with matching data collection period is preferred for a period-specific question

But those rules must be explicit. The model should not invent source hierarchy.

## Common Mistakes

### 1. Treating citations as report-level decoration

Problem:

- the report lists sources at the end but does not map claims to sources

Effect:

- readers cannot audit which evidence supports which conclusion

### 2. Summarizing away source metadata

Problem:

- subagents return prose without URLs, document IDs, dates, or page locations

Effect:

- downstream synthesis cannot recover provenance

### 3. Choosing one conflicting value without explanation

Problem:

- the synthesis silently selects one source's number

Effect:

- contested evidence becomes false certainty

### 4. Ignoring publication and collection dates

Problem:

- older and newer measurements are compared as if they describe the same moment

Effect:

- trends get misclassified as contradictions, or stale data looks current

### 5. Confusing "not found" with "not checked"

Problem:

- unavailable sources are summarized as if they contained no evidence

Effect:

- missing coverage becomes evidence of absence

### 6. Collapsing all uncertainty into a vague caveat

Problem:

- the final report says "some uncertainty remains" without linking it to claims

Effect:

- users cannot decide which findings are safe to act on

### 7. Treating model confidence as a substitute for evidence

Problem:

- a high-confidence label replaces source support

Effect:

- the answer may be fluent but unauditable

### 8. Forcing every result into prose

Problem:

- financial values, timelines, and field conflicts are flattened into paragraphs

Effect:

- important distinctions become harder to inspect

### 9. Losing subagent evidence because the coordinator only receives summaries

Problem:

- subagents do useful source work but return only final conclusions

Effect:

- the coordinator cannot verify, merge, or route contested claims

### 10. Assuming structured output guarantees factual correctness

Problem:

- JSON shape is valid, but values may still be unsupported, stale, or conflicted

Effect:

- downstream systems get parseable wrong answers

## Exam Takeaways

If you remember only a few things for Topic 5.6, remember these:

1. Provenance must be preserved at the claim or field level, not just in a bibliography.
2. Subagents should return structured claim-source mappings with source IDs, locations, excerpts, and dates.
3. Summarization is lossy unless the evidence map survives each compression step.
4. Credible conflicting values should be preserved and annotated, not silently reconciled.
5. Publication dates and data collection dates are essential for interpreting apparent conflicts.
6. Separate well-established findings from contested, provisional, unsupported, and source-limited findings.
7. Final reports should include coverage notes so missing sources do not look like complete research.
8. Use the right rendering format: tables for numeric conflicts, timelines for chronological claims, structured lists for technical findings.
9. Current Anthropic citations help source grounding, but workflow design still controls whether provenance survives across agents.
10. Structured outputs improve parseability; they do not by themselves prove source support or resolve uncertainty.

## Quick Self-Check

You understand Topic 5.6 if you can answer yes to these questions:

- Can I explain why a final bibliography is weaker than claim-level source mapping?
- Can I design a subagent output schema that preserves source IDs, dates, locations, and excerpts?
- Can I distinguish a direct source statement from a model inference?
- Can I explain why two credible values may be temporal differences rather than contradictions?
- Can I preserve conflicting values with attribution instead of selecting one silently?
- Can I separate well-established findings from contested and source-limited findings?
- Can I design a final report with a coverage note that names unavailable sources or failed branches?
- Can I choose tables, timelines, prose, or structured lists based on the content being synthesized?
- Can I explain why current citations and structured outputs may need separate workflow stages?
- Can I connect older `Task` wording to current `Agent` subagent terminology without losing the provenance concept?

## References

- Local course outline: [factory/course-outline.md](./factory/course-outline.md)
- Local exam guide: [claude-certified-architect-foundations-certification-exam-guide.md](./claude-certified-architect-foundations-certification-exam-guide.md)
- Anthropic, "Citations": https://platform.claude.com/docs/en/build-with-claude/citations
- Anthropic, "Search results": https://platform.claude.com/docs/en/build-with-claude/search-results
- Anthropic, "Structured outputs": https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- Anthropic, "Reduce hallucinations": https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Anthropic Engineering, "Building effective agents" (December 19, 2024): https://www.anthropic.com/engineering/building-effective-agents
