# PEPTIDEX Phase 1: Aggregator Research Report

This report outlines the 11 viable aggregator targets, classifying their submission types and highlighting their category policies to prevent domain blacklisting.

| Aggregator | Submission Type | Category Policy | Notes |
|------------|-----------------|-----------------|-------|
| **WorthEPenny** | `open_submission` | ✅ `allows_research_peptides` | Lenient submission policy. Typically allows health and supplement codes without issue. |
| **SimplyCodes** | `open_submission` | ⚠️ `ambiguous_supplements` | Relies on community/AI checkout verification. Supplements are allowed, but research peptides may trigger manual review. |
| **Knoji** | `open_submission` | ⚠️ `ambiguous_supplements` | Shares network infrastructure with SimplyCodes. Similar borderline policy on research chems. |
| **CouponFollow** | `editorial_only` | ⚠️ `unverified` | Primarily sources codes via merchant partnerships. Direct manual submission is restricted. |
| **RetailMeNot** | `open_submission` | 🛑 `prohibits_research_chemicals` | Strict ToS against pharmaceuticals, controlled substances, and unverified health claims. High risk of domain flagging. |
| **Wethrift** | `open_submission` | ✅ `allows_research_peptides` | Very lenient automated approval system. Many existing peptide vendors are successfully listed here. |
| **DealCatcher** | `merchant_only` | 🛑 `prohibits_research_chemicals` | Requires formal affiliate network partnership. Strict category exclusions. |
| **Slickdeals** | `account_submission` | 🛑 `prohibits_research_chemicals` | Extremely strict forum. Self-promotion and affiliate links result in instant permaban and domain blacklist. |
| **HotDeals** | `open_submission` | ⚠️ `ambiguous_supplements` | Standard open submission. Supplements generally clear, but research labeling is a gray area. |
| **DealsPlus** | `open_submission` | ⚠️ `ambiguous_supplements` | Similar to HotDeals. User-submitted content with light moderation. |
| **Rakuten** | `merchant_only` | 🛑 `prohibits_research_chemicals` | Requires joining the Rakuten Advertising network. Heavy vetting of merchants and strict category bans. |

### Summary
- **Greenlit (2):** Safe to target.
- **Hard Excluded (4):** Must be excluded from UI generation to prevent domain blacklisting.
- **Proceed with Caution (5):** UI should render yellow warning banner.
