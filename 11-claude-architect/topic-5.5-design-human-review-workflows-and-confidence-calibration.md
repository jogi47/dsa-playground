# Topic 5.5: Design Human Review Workflows and Confidence Calibration

This note explains how to decide which structured extraction outputs can be accepted automatically, which should be sampled for quality monitoring, and which must go to human review. For the exam, Topic 5.5 is not mainly about "trust high confidence." It is about proving that confidence means something on the fields and document types that matter.

Topic 4.4 focused on validation, retry, and feedback loops for extraction quality. Topic 5.5 moves one layer downstream: after the pipeline can produce and validate structured output, how do you spend limited human reviewer time without letting silent errors reach production?

## Why This Topic Matters

Human review is expensive, but blind automation is worse when extraction errors affect money, compliance, identity, medical facts, legal obligations, or downstream records.

Scenario 6 in the exam guide makes the risk concrete. A structured extraction system may report high overall accuracy while still failing badly on one field or document type:

- invoices from one vendor parse well, but scanned invoices from another vendor fail
- `invoice_total` is reliable, but `tax_id` is often wrong
- short contracts work, but amended contracts with exhibits produce contradictions
- high-confidence outputs hide novel error patterns because nobody samples them

The exam wants the architecture that reduces review load only after measuring quality where quality can actually vary.

The strongest system does not ask humans to review everything forever. It also does not auto-accept everything above an uncalibrated model score. It uses confidence, validation results, document type, field risk, contradiction flags, and ongoing sampling to route work.

## What the Exam Is Testing

For Topic 5.5, the exam is usually testing whether you understand these ideas:

- aggregate accuracy can hide poor performance in specific document types, fields, languages, vendors, or layouts
- field-level accuracy matters more than document-level averages when downstream systems act on individual fields
- model-reported confidence is useful only after calibration against labeled examples
- low confidence, source ambiguity, validation failure, and contradictions should route to human review
- high-confidence outputs still need stratified random sampling to detect silent regressions
- review thresholds should be set from labeled validation data, not intuition
- reviewer capacity should be focused on the highest-risk and least-trusted outputs

The durable exam skill is:

```text
measure extraction quality by segment,
calibrate confidence against labeled truth,
and route review based on evidence, risk, and uncertainty
```

## Current Anthropic Terminology vs Exam Wording

### Topic 5.5 is a workflow pattern, not one built-in Anthropic feature

As of July 2, 2026, current Anthropic docs do not expose one universal "confidence calibration" or "human review workflow" switch for extraction systems.

The current Anthropic pieces map to this topic like this:

- `structured outputs` and strict tool use help produce parseable fields
- citations and evidence fields can help preserve source support
- the Console Evaluation tool and custom eval scripts help compare outputs against expected answers
- human review routing is usually application logic around Claude, not a single Claude API parameter

So if the exam says "confidence calibration," read it as an architecture and evaluation discipline, not as a magic model setting.

### "Confidence score" means model output unless you build a calibrated score

Claude can be asked to output a confidence field in a JSON schema. That does not make the number calibrated.

For Topic 5.5, the difference is critical:

- uncalibrated confidence: what the model says about its own certainty
- calibrated confidence: a score whose meaning has been checked against labeled data

An exam-safe answer never treats `confidence: 0.93` as proof by itself. It asks whether past outputs with similar scores, fields, and document types were actually correct.

### Current structured-output controls solve shape, not trust

Current Anthropic structured-output docs describe JSON outputs and strict tool use for schema-constrained responses. That is useful, but it only guarantees the output is easier to parse.

It does not guarantee:

- the value came from the correct document span
- the value belongs in the right field
- the document was internally consistent
- the confidence score reflects real correctness probability

Topic 5.5 starts after that distinction.

## The Core Mental Model

The simplest correct mental model is:

```text
extraction
    ->
validation and confidence output
    ->
segment-level quality measurement
    ->
calibrated thresholds
    ->
route to auto-accept, random audit, or human review
    ->
feed reviewer labels back into evals and thresholds
```

Another useful framing:

```text
confidence routes attention
labels calibrate confidence
sampling protects against hidden drift
```

Confidence is not the final authority. It is a triage signal that becomes useful only when validated against real examples.

## Human Review Routing Model

A production review workflow usually has at least three lanes.

| Lane | Inputs | What happens | Why |
| --- | --- | --- | --- |
| Auto-accept | high calibrated confidence, no validation errors, low-risk segment | store or send downstream | reviewer time is not wasted on well-measured cases |
| Random audit | high-confidence outputs sampled by document type and field | human checks a small stratified sample | catches regressions that confidence did not detect |
| Human review | low confidence, validation failure, contradiction, high-risk field, weak segment | reviewer corrects or approves | uncertain or risky outputs get human attention |

The key is that "high confidence" does not mean "never reviewed." It means "eligible for lower review rate after calibration."

## Why Aggregate Accuracy Is Dangerous

Aggregate accuracy is useful for a dashboard, but weak as an automation decision.

Suppose a pipeline reports:

```text
overall extraction accuracy: 97%
```

That number might hide a pattern like this:

| Segment | Field | Accuracy |
| --- | --- | --- |
| typed invoices | invoice total | high |
| typed invoices | vendor name | high |
| scanned invoices | tax ID | weak |
| amended contracts | effective date | weak |

The exact numbers are not the point. The exam point is that automation risk lives in the segment, not only in the average.

A better dashboard breaks quality down by:

- document type
- source system or vendor
- field name
- field criticality
- language or locale, if relevant
- layout family or OCR quality
- confidence band
- validation outcome

Only then can you decide where to reduce review.

## Field-Level Confidence

Document-level confidence is often too coarse.

Weak pattern:

```json
{
  "document_type": "invoice",
  "confidence": 0.94,
  "fields": {
    "vendor_name": "Acme Supplies",
    "invoice_total": "1250.00",
    "tax_id": "91-1234567"
  }
}
```

This hides the fact that each field may have a different evidence quality.

Stronger pattern:

```json
{
  "document_type": "invoice",
  "fields": {
    "vendor_name": {
      "value": "Acme Supplies",
      "confidence": 0.98,
      "evidence": "Acme Supplies"
    },
    "invoice_total": {
      "value": "1250.00",
      "confidence": 0.96,
      "evidence": "Total Due: $1,250.00"
    },
    "tax_id": {
      "value": "91-1234567",
      "confidence": 0.61,
      "evidence": "partially visible OCR text"
    }
  },
  "document_flags": {
    "ocr_quality": "low",
    "contradiction_detected": false
  }
}
```

Now routing can be field-specific:

- auto-accept `vendor_name`
- auto-accept or audit `invoice_total`
- send `tax_id` to human review

That is much better than sending the whole document to one lane based on one score.

## Confidence Calibration

Calibration asks a simple question:

```text
When the system says this field is 90% confident, is it actually correct about 90% of the time for similar cases?
```

For exam purposes, you do not need to memorize a particular statistical method. You do need to know the workflow:

1. Build a labeled validation set with expected field values.
2. Run the extraction pipeline and collect field-level confidence.
3. Compare predicted values to labels by field and document type.
4. Group results into confidence bands.
5. Choose review thresholds based on observed error rates and business risk.
6. Recalibrate when prompts, schemas, models, OCR, document mix, or upstream systems change.

The key is that thresholds come from measured performance.

Weak pattern:

```text
Auto-accept anything above 0.80 because 0.80 sounds high.
```

Stronger pattern:

```text
For typed invoices, auto-accept invoice_total only when calibrated confidence >= threshold X
and validation passes.
For scanned invoices, keep invoice_total under human review until labeled results show
the threshold is reliable for that segment.
```

Use real thresholds in a production system, but avoid treating the exam's examples as universal constants. The correct threshold depends on field risk, reviewer capacity, and measured error tolerance.

## Stratified Random Sampling

Stratified random sampling means you sample from important slices of the workload, not only from the whole pool.

For Topic 5.5, the most important use is sampling high-confidence outputs.

Why sample high-confidence outputs?

- low-confidence outputs are already reviewed, so their errors are visible
- high-confidence errors are more dangerous because they bypass normal review
- new document layouts may initially look easy to the model but contain hidden traps
- aggregate monitoring may miss a small but important segment

Good strata usually include:

- document type
- field name
- confidence band
- source or vendor
- layout family
- OCR quality
- model or prompt version

Example sampling plan:

```yaml
sampling:
  population: high_confidence_auto_accepted_outputs
  strata:
    - document_type
    - field_name
    - source_system
    - confidence_band
  review_goal:
    - estimate error rate by segment
    - detect novel error patterns
    - decide whether review thresholds should change
```

The exam-safe point:

```text
sample the outputs you think are safe, not only the outputs you already distrust
```

## Contradictions and Ambiguity Should Override Confidence

Some source states should route to human review even when the model reports high confidence.

Examples:

- two pages show different totals
- OCR is low quality in the field region
- a contract has an amendment that conflicts with the base agreement
- a field appears in multiple places with different values
- the value is inferred rather than directly stated
- validation flags a cross-field inconsistency

In those cases, a strong extraction schema includes explicit flags:

```json
{
  "effective_date": {
    "value": "2026-04-01",
    "confidence": 0.88,
    "evidence": "Section 2 states effective April 1, 2026"
  },
  "review_flags": [
    {
      "type": "contradictory_source",
      "field": "effective_date",
      "message": "Base agreement says April 1, amendment says May 1."
    }
  ],
  "recommended_route": "human_review"
}
```

The routing rule should be deterministic:

```text
if contradiction_detected -> human_review
if validation_failure is non-trivial -> human_review or retry first
if source_missing for required field -> human_review or abstain, not confident fill
```

This connects Topic 5.5 back to Topic 4.4. Validation and contradiction detection provide routing signals; calibration decides how much to trust the remaining scores.

## Implementation and Workflow Guidance

### 1. Define review lanes before tuning thresholds

Start with explicit routing outcomes:

- `auto_accept`
- `audit_sample`
- `human_review`
- `retry_extraction`
- `abstain_or_missing`

Do not collapse every uncertain case into "human review." Some failures are fixable with a retry; some are source-missing and should be represented as missing; some are high-confidence but still need audit sampling.

### 2. Make the extraction output review-aware

Include fields that make review routing possible:

- value
- field-level confidence
- evidence snippet or location
- validation status
- contradiction flag
- source quality flag
- document type
- prompt or model version

Without these fields, the router has to guess from a flat JSON object.

### 3. Calibrate on labeled validation data

Use a labeled validation set that represents the segments you want to automate.

A weak validation set contains only easy, clean examples.

A stronger validation set includes:

- common document types
- rare but important document types
- low-quality scans
- confusing layouts
- missing fields
- contradictory fields
- examples from each major source system or vendor

Calibration should happen before reducing review, and again after material changes to the pipeline.

### 4. Analyze by document type and field

Do not approve automation from a single score.

Review tables should answer questions like:

- Is `invoice_total` reliable on scanned invoices?
- Is `effective_date` reliable on amended contracts?
- Are low-quality OCR documents routed correctly?
- Which fields dominate reviewer corrections?
- Which confidence band contains unexpected errors?

Only reduce human review for segments that have enough labeled evidence and acceptable risk.

### 5. Sample high-confidence outputs continuously

Even after calibration, keep an audit stream.

This catches:

- new document layouts
- OCR regressions
- prompt drift
- model-version behavior changes
- upstream format changes
- edge cases not represented in the validation set

If the audit finds a pattern, do not merely correct the individual records. Feed the pattern back into:

- the validation set
- prompts
- schemas
- deterministic validators
- review thresholds
- document-type classifiers

### 6. Prioritize reviewer capacity by risk

Human reviewers are limited. Routing should prioritize:

- high-value fields
- irreversible downstream actions
- low calibrated confidence
- contradictory sources
- weak segments
- new or unmeasured document types

This is better than first-in-first-out review when risk varies sharply.

### 7. Log reviewer decisions as evaluation data

Reviewer labels should become durable evaluation data.

Capture:

- original document reference
- model output
- model confidence
- validator output
- human-corrected value
- reason for correction
- routing lane
- prompt, model, OCR, and schema version

This turns review from a manual safety net into the feedback source for future evaluation and calibration.

## Example Routing Policy

The exact thresholds are placeholders. The pattern is what matters.

```yaml
routing_policy:
  retry_first:
    - schema_valid: false
    - deterministic_validation_error: fixable

  human_review:
    - contradiction_detected: true
    - source_quality: low
    - document_type: unmeasured
    - field_calibrated_confidence: below_threshold
    - field_risk: high

  audit_sample:
    - lane: auto_accept
    - sampling: stratified_by_document_type_field_and_confidence_band

  auto_accept:
    - schema_valid: true
    - deterministic_validation_error: false
    - contradiction_detected: false
    - document_type: measured
    - field_calibrated_confidence: above_threshold
```

This policy is stronger than:

```text
if confidence > 0.80, accept
else review
```

because it includes validation, source quality, contradiction detection, segment maturity, and audit sampling.

## Common Mistakes

- Treating model-reported confidence as calibrated probability.
- Using one document-level confidence score for all fields.
- Reducing review because overall accuracy is high while ignoring weak fields or document types.
- Reviewing only low-confidence outputs and never sampling high-confidence auto-accepted outputs.
- Choosing confidence thresholds by intuition instead of labeled validation results.
- Failing to recalibrate after changing the prompt, schema, OCR system, model, or document mix.
- Sending every uncertain output to humans without first separating retryable validation errors from true ambiguity.
- Ignoring contradictory source evidence because the extracted field has a high confidence score.
- Measuring document-level correctness when downstream risk is field-level.
- Letting reviewer corrections disappear instead of turning them into eval data.
- Assuming structured outputs guarantee semantic accuracy.
- Treating all fields as equal risk when some fields drive money movement, identity decisions, compliance, or legal obligations.

## Exam Takeaways

If you remember only a few things for Topic 5.5, remember these:

1. High aggregate accuracy can hide dangerous segment-level failures.
2. Measure extraction quality by document type and field, not only overall.
3. Field-level confidence is more useful than one document-level score.
4. Confidence scores must be calibrated against labeled validation data.
5. High-confidence outputs still need stratified random sampling.
6. Low confidence, contradictions, ambiguous sources, and validation failures should route to review or retry.
7. Reviewer capacity should be spent where uncertainty and business risk are highest.
8. Thresholds are operational decisions based on measured error rates, not universal constants.
9. Reviewer corrections should feed back into evals, prompts, schemas, and routing rules.
10. Current Anthropic structured-output terminology helps with parseability, but calibration and review routing remain application-level workflow design.

## Quick Self-Check

You understand Topic 5.5 if you can answer yes to these questions:

- Can I explain why 97% overall accuracy may still be unsafe for automation?
- Can I describe why confidence must be calibrated before it controls review routing?
- Can I design field-level confidence output for a structured extraction schema?
- Can I explain why high-confidence outputs still need random audit sampling?
- Can I choose strata for sampling, such as document type, field, source, and confidence band?
- Can I route contradictory or ambiguous source documents to humans even when the model reports high confidence?
- Can I distinguish retryable extraction errors from cases that need human judgment?
- Can I explain why document-level accuracy is weaker than field-level accuracy for downstream automation?
- Can I describe how reviewer corrections become evaluation data?

## References

- Local course outline: [factory/course-outline.md](./factory/course-outline.md)
- Local exam guide: [claude-certified-architect-foundations-certification-exam-guide.md](./claude-certified-architect-foundations-certification-exam-guide.md)
- Anthropic, "Structured outputs": https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- Anthropic, "Citations": https://platform.claude.com/docs/en/build-with-claude/citations
- Anthropic, "Using the Evaluation Tool": https://platform.claude.com/docs/en/test-and-evaluate/eval-tool
- Anthropic, "Ticket routing": https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing
- Anthropic Engineering, "Building effective agents" (December 19, 2024): https://www.anthropic.com/engineering/building-effective-agents
