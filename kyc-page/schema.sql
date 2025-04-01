-- Schema for KYC Database
-- Created: 2024-03-22
-- Author: [Your Name]  

-- Enable UUID extension if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist
DROP TABLE IF EXISTS kyc_audit_log;
DROP TABLE IF EXISTS kyc_submissions;

-- Create main KYC table
CREATE TABLE kyc_submissions (
    id SERIAL PRIMARY KEY,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    
    -- Personal Information
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    residential_address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    
    -- Identification Information
    id_type VARCHAR(50) NOT NULL,
    id_number VARCHAR(100) NOT NULL,
    id_issue_date DATE NOT NULL,
    id_expiry_date DATE NOT NULL,
    
    -- Proof of Address
    proof_address_file_path VARCHAR(255) NOT NULL,
    
    -- Financial Information
    source_of_funds VARCHAR(50) NOT NULL,
    monthly_transaction_volume DECIMAL(15,2),
    
    -- Compliance Declarations
    legal_proceedings_involved BOOLEAN NOT NULL,
    is_pep BOOLEAN NOT NULL,
    
    -- Consent
    certified_info BOOLEAN NOT NULL,
    consent_given BOOLEAN NOT NULL,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit log table
CREATE TABLE kyc_audit_log (
    id SERIAL PRIMARY KEY,
    kyc_submission_id INTEGER REFERENCES kyc_submissions(id),
    action_type VARCHAR(50) NOT NULL,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action_by VARCHAR(100) NOT NULL,
    details TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_kyc_email ON kyc_submissions(email);
CREATE INDEX idx_kyc_status ON kyc_submissions(status);
CREATE INDEX idx_kyc_submission_date ON kyc_submissions(submission_date);
CREATE INDEX idx_kyc_audit_submission ON kyc_audit_log(kyc_submission_id);

-- Add comments to tables
COMMENT ON TABLE kyc_submissions IS 'Stores all KYC form submissions';
COMMENT ON TABLE kyc_audit_log IS 'Tracks all changes to KYC submissions';

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_kyc_submissions_updated_at
    BEFORE UPDATE ON kyc_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();