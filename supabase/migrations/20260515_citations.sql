-- Time-series separation for submissions vs ongoing checks
CREATE TABLE citations_aggregator_submissions (
    id SERIAL PRIMARY KEY,
    aggregator_id VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    submission_status VARCHAR NOT NULL, -- enum: 'not_submitted', 'submitted', 'live', 'expired', 'rejected'
    submitted_date TIMESTAMP WITH TIME ZONE,
    listing_url VARCHAR,
    verified_live_date TIMESTAMP WITH TIME ZONE,
    last_checked TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    category_policy_acknowledged BOOLEAN DEFAULT FALSE,
    ftc_disclosure_included BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE citations_aggregator_checks (
    id SERIAL PRIMARY KEY,
    aggregator_submission_id INTEGER REFERENCES citations_aggregator_submissions(id) ON DELETE CASCADE,
    check_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR NOT NULL, -- 'live', 'dead', 'error'
    http_status INTEGER,
    response_size INTEGER,
    code_visible BOOLEAN DEFAULT FALSE,
    error_message TEXT
);

-- Separate schema for organic search discovery
CREATE TABLE citations_search_discovery (
    id SERIAL PRIMARY KEY,
    query_used VARCHAR NOT NULL,
    search_engine VARCHAR NOT NULL,
    result_url VARCHAR NOT NULL UNIQUE,
    result_title VARCHAR,
    result_snippet TEXT,
    source_classification VARCHAR NOT NULL, -- 'direct_aggregator', 'direct_merchant', 'community_post', 'scrape_aggregator', 'archive_cache'
    discovered_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    peptidex_referenced BOOLEAN DEFAULT FALSE,
    competing_codes_found JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE citations_search_runs (
    id SERIAL PRIMARY KEY,
    run_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    queries_executed INTEGER DEFAULT 0,
    results_processed INTEGER DEFAULT 0,
    errors INTEGER DEFAULT 0,
    api_cost_estimate NUMERIC(10, 4) DEFAULT 0.0000
);

-- Row Level Security (RLS) - Admin only
ALTER TABLE citations_aggregator_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations_aggregator_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations_search_discovery ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations_search_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY admin_all_submissions ON citations_aggregator_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY admin_all_checks ON citations_aggregator_checks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY admin_all_discovery ON citations_search_discovery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY admin_all_runs ON citations_search_runs FOR ALL USING (auth.role() = 'authenticated');
