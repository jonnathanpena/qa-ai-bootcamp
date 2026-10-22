# Spec: Insurance Portal (PolicyDekho)

## System Under Test

PolicyDekho — a demo insurance portal (TesterRank sandbox, https://www.testerrank.com/insurance)
simulating a real insurer's customer portal: policy dashboard, health/life/vehicle policy
purchase, claims filing with document upload, a premium calculator with cascading dropdowns,
payments/renewals, document upload, and nominee management.

## Capabilities In Scope

### 1. Policy listing / dashboard
- View all active policies in a table (policy number, type, plan, premium, status, next due date).
- Filter/identify a policy's status (Active/Inactive/Pending) by its policy number.
- Read the next premium due date for a given policy.

### 2. Health insurance quote flow
- Select an insurance category (e.g. Health) from a cascading dropdown.
- Select a subcategory that loads dynamically based on the chosen category.
- Select a plan that loads dynamically based on the chosen subcategory.
- View the calculated premium amount for the selected category/subcategory/plan combination.

### 3. Policy details
- Navigate from a dashboard row into that policy's details page.
- Verify the policy number on the details page matches the row that was clicked.
- Verify coverage amount, premium amount, and status badge are displayed and non-empty.

### 4. Plan comparison
- Select two plans (via the quote flow) to compare side by side.
- Verify both selected plan names appear in the comparison view.
- Verify a premium value is shown for each compared plan.

### 5. Claim submission with document upload
- Fill a claim form with policy number, claim amount, and description.
- Upload a supporting document (PDF/JPG).
- Submit the claim and receive a generated claim number (format observed: `CLM-YYYY-NNN`).
- Track the claim status (filed → pending documents → approved/rejected).

### 6. Premium calculator verification
- Given category/subcategory/plan selections, verify the displayed premium is a valid currency
  amount (e.g. matches `/₹\d+/`).

## Out of Scope (for this demo — discussed verbally in interview, not coded)

- Advanced security testing: SQL injection in policy search/claims, XSS in nominee names or
  document descriptions, IDOR on policy/claim detail endpoints, premium manipulation via dev
  tools, session fixation.
- Payment gateway integration (multiple payment methods, failed-payment retry, receipts).
- Nominee CRUD and beneficiary-percentage validation (must total 100%).

These are called out explicitly rather than silently ignored, to be transparent about scope
boundaries of a time-boxed demo.

## Expected Behaviors (Acceptance Criteria)

### Policy listing / dashboard
- Given the dashboard is loaded, the policy table displays at least one row with a well-formed
  policy number (e.g. `SL-HLT-2024-0291`).
- Given a known policy number, its status badge renders one of: Active, Inactive, Pending.
- Given a known policy number, a next-due-date value is rendered in a human-readable date format.

### Health insurance quote flow
- Given a category is selected, the subcategory dropdown becomes populated and enabled.
- Given a subcategory is selected, the plan dropdown becomes populated and enabled.
- Given category → subcategory → plan are all selected, a premium amount matching `/₹\d+/` is
  displayed.

### Claim submission with document upload
- Given valid policy number, amount, and description, and an uploaded document, submitting the
  claim produces a claim number matching `/CLM-\d{4}-\d+/`.
- Given a successful submission, the claim status is shown as one of the known lifecycle states.
