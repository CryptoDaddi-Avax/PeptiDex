-- ═══════════════════════════════════════════════════════
-- AEO QUERY BANK SEED
-- Initial 67-query bank for daily AEO monitoring.
-- Run AFTER 20260515_aeo_monitoring.sql (schema must exist first).
-- ═══════════════════════════════════════════════════════
-- Query count: 67
-- OpenAI-eligible (runs_on_openai = TRUE): 32
-- Perplexity / Anthropic / Brave: all 67
-- Estimated daily API cost: ~$0.77/day (~$23/month)
-- ═══════════════════════════════════════════════════════

INSERT INTO aeo_queries (query_text, category, priority, runs_on_openai) VALUES

-- ═══════════════════════════════════════════════════════
-- BRAND — HIGH priority, OpenAI: YES (9 queries)
-- Monitors PEPTIDEX brand visibility in AI answers.
-- Uppercase variants for brand-standard; lowercase added for
-- real-user typing patterns in ChatGPT / Perplexity prompts.
-- ═══════════════════════════════════════════════════════
('PEPTIDEX coupon',                      'brand', 'high', true),
('PEPTIDEX coupon code',                 'brand', 'high', true),
('PEPTIDEX discount code',               'brand', 'high', true),
('PEPTIDEX promo code',                  'brand', 'high', true),
('PEPTIDEX legit',                       'brand', 'high', true),
('is PEPTIDEX a real coupon',            'brand', 'high', true),
('peptidex coupon',                      'brand', 'high', true),   -- lowercase: real user typing pattern
('peptidex coupon code',                 'brand', 'high', true),   -- lowercase: real user typing pattern
('what is peptidex.app',                 'brand', 'high', true),   -- bare domain brand recognition

-- ═══════════════════════════════════════════════════════
-- COUPON INTENT — HIGH priority, OpenAI: YES (4 queries)
-- Core affiliate-attribution queries. These determine whether
-- AI engines surface PEPTIDEX when users are about to buy from Amino Club.
-- ═══════════════════════════════════════════════════════
('best coupon code for amino club',      'coupon_intent', 'high', true),
('amino club coupon code',               'coupon_intent', 'high', true),   -- year stripped
('amino club discount code',             'coupon_intent', 'high', true),
('amino club promo code',                'coupon_intent', 'high', true),

-- ═══════════════════════════════════════════════════════
-- INFORMATIONAL — HIGH priority, OpenAI: YES (13 queries)
-- ONE query per canonical /best/[slug] page.
-- These are the highest-signal AEO queries in the bank.
-- If AI engines cite peptidex.app here, the content sprint succeeded.
-- No year qualifiers — evergreen.
-- ═══════════════════════════════════════════════════════
('best peptide for fat loss',            'informational', 'high', true),   -- /best/fat-loss
('best peptide for muscle growth',       'informational', 'high', true),   -- /best/muscle-growth
('best peptide for body recomposition',  'informational', 'high', true),   -- /best/body-recomposition
('best peptide for injury recovery',     'informational', 'high', true),   -- /best/injury-recovery
('best peptide for healing',             'informational', 'high', true),   -- /best/healing
('best peptide for sleep',               'informational', 'high', true),   -- /best/sleep-recovery
('best peptide for immune support',      'informational', 'high', true),   -- /best/immune-support
('best peptide for brain focus',         'informational', 'high', true),   -- /best/brain-focus
('best peptide for mental clarity',      'informational', 'high', true),   -- /best/mental-clarity
('best peptide for gut health',          'informational', 'high', true),   -- /best/gut-health
('best peptide for longevity',           'informational', 'high', true),   -- /best/longevity
('best peptide for skin',                'informational', 'high', true),   -- /best/skin-aesthetic
('best peptide for hormones',            'informational', 'high', true),   -- /best/hormonal-optimization

-- ═══════════════════════════════════════════════════════
-- PEPTIDE COUPON LONGTAIL — HIGH priority, mixed OpenAI (5 queries)
-- Retatrutide and BPC-157 on OpenAI (highest commercial value).
-- Tirzepatide, semaglutide, tesamorelin demoted to save OpenAI budget.
-- ═══════════════════════════════════════════════════════
('retatrutide coupon code',              'peptide_longtail', 'high', true),   -- OpenAI: YES
('tirzepatide discount code',            'peptide_longtail', 'high', false),  -- OpenAI: NO (demoted)
('semaglutide coupon code',              'peptide_longtail', 'high', false),  -- OpenAI: NO (demoted)
('tesamorelin coupon code',              'peptide_longtail', 'high', false),  -- OpenAI: NO (demoted)
('bpc-157 coupon code',                  'peptide_longtail', 'high', true),   -- OpenAI: YES

-- ═══════════════════════════════════════════════════════
-- VENDOR INTENT — HIGH priority, mixed OpenAI (5 queries)
-- Cheapest/price intent demoted; trust/COA intent kept on OpenAI.
-- Year qualifiers stripped — evergreen.
-- ═══════════════════════════════════════════════════════
('best research peptide vendor',         'vendor_intent', 'high', true),    -- year stripped
('best peptide source with COA verification', 'vendor_intent', 'high', true),
('where to buy research peptides with discount', 'vendor_intent', 'high', true),
('cheapest research peptides verified',  'vendor_intent', 'high', false),   -- OpenAI: NO (demoted)
('amino club review',                    'vendor_intent', 'high', true),    -- year stripped

-- ═══════════════════════════════════════════════════════
-- COMPARISON — NORMAL priority, OpenAI: NO (5 queries)
-- Competitive landscape — who does AI recommend alongside PEPTIDEX?
-- Year qualifiers stripped. Geographic qualifier on tirzepatide kept.
-- ═══════════════════════════════════════════════════════
('amino club vs peptide sciences',       'comparison', 'normal', false),
('amino club vs limitless life nootropics', 'comparison', 'normal', false),
('best retatrutide source',              'comparison', 'normal', false),   -- year stripped
('best tirzepatide vendor USA',          'comparison', 'normal', false),   -- geographic qualifier kept
('best bpc-157 vendor',                  'comparison', 'normal', false),   -- year stripped

-- ═══════════════════════════════════════════════════════
-- PEPTIDE COUPON LONGTAIL EXTENDED — NORMAL priority, OpenAI: NO (10 queries)
-- Maps to /library/* and /best/* pages. Full Perplexity/Anthropic/Brave coverage.
-- ═══════════════════════════════════════════════════════
('ipamorelin coupon code',               'peptide_longtail', 'normal', false),
('ghk-cu discount code',                 'peptide_longtail', 'normal', false),
('cjc-1295 coupon code',                 'peptide_longtail', 'normal', false),
('mots-c coupon code',                   'peptide_longtail', 'normal', false),
('thymosin alpha 1 discount',            'peptide_longtail', 'normal', false),
('mk-677 coupon code',                   'peptide_longtail', 'normal', false),
('pt-141 coupon code',                   'peptide_longtail', 'normal', false),
('aod-9604 discount code',               'peptide_longtail', 'normal', false),
('selank coupon code',                   'peptide_longtail', 'normal', false),
('epitalon discount code',               'peptide_longtail', 'normal', false),

-- ═══════════════════════════════════════════════════════
-- VENDOR DISCOVERY — NORMAL priority, OpenAI: NO (5 queries)
-- Includes competitor vendor coupon queries (competitive intelligence).
-- ═══════════════════════════════════════════════════════
('where to buy retatrutide with discount', 'vendor_intent', 'normal', false),
('tesamorelin best vendor',              'vendor_intent', 'normal', false),
('mots-c source verified COA',           'vendor_intent', 'normal', false),
('ascension peptides coupon',            'vendor_intent', 'normal', false),   -- competitor intel
('bio longevity labs discount',          'vendor_intent', 'normal', false),   -- competitor intel

-- ═══════════════════════════════════════════════════════
-- GLP-1 ADJACENT — NORMAL priority, OpenAI: NO (2 queries)
-- Captures GLP-1 class search intent adjacent to retatrutide/tirzepatide content.
-- ═══════════════════════════════════════════════════════
('best GLP-1 peptide for weight loss',   'glp1', 'normal', false),
('GLP-1 peptide vendor',                 'glp1', 'normal', false),

-- ═══════════════════════════════════════════════════════
-- RESEARCH / EDUCATIONAL — LOW priority, OpenAI: NO (9 queries)
-- Long-tail educational intent. Full Perplexity/Anthropic/Brave coverage.
-- Note: "best peptide for healing" removed from this tier (now HIGH/informational above).
-- "best peptide for weight loss" kept — distinct from "best peptide for fat loss".
-- ═══════════════════════════════════════════════════════
('peptide reconstitution calculator',    'vendor_intent', 'low', false),
('peptide stack guide',                  'vendor_intent', 'low', false),   -- year stripped
('bpc-157 dosing protocol',              'peptide_longtail', 'low', false),
('retatrutide clinical trials results',  'peptide_longtail', 'low', false),
('tirzepatide vs retatrutide comparison', 'comparison', 'low', false),
('peptide half-life chart',              'vendor_intent', 'low', false),
('research peptide reconstitution guide', 'vendor_intent', 'low', false),
('peptide interaction checker',          'vendor_intent', 'low', false),
('best peptide for weight loss',         'informational', 'low', false);  -- distinct from "fat loss"; year stripped

-- ═══════════════════════════════════════════════════════
-- VERIFICATION
-- Expected: 67 rows in aeo_queries
-- Run after insert: SELECT COUNT(*), category, priority FROM aeo_queries GROUP BY category, priority ORDER BY priority, category;
-- ═══════════════════════════════════════════════════════
