import { isValidEgyptianPhoneNumber, isValidEmail, ValidationUtils } from './validation';

// Test cases for Egyptian phone number validation
console.log('=== Egyptian Phone Number Validation Tests ===');

const phoneTestCases = [
    '+201234567890',      // Valid mobile number with country code
    '+20-12-3456789',     // Valid format with separators
    '+2012-3456789',      // Another valid format
    '020123456789',       // Valid with leading zero
    '20123456789',        // Valid without leading +
    '+201012345678',      // Another valid mobile format
    'invalid-number',     // Invalid
    '+1234567890',        // Wrong country code
    '1234567890',         // Missing country code info
    '',                   // Empty (should be valid since validation is optional)
];

phoneTestCases.forEach(phone => {
    const result = ValidationUtils.validatePhone(phone);
    console.log(`Phone: ${phone.padEnd(20)} | Valid: ${result.isValid} | Message: ${result.errorMessage || 'OK'}`);
});

console.log('\n=== Email Validation Tests ===');

const emailTestCases = [
    'test@example.com',           // Valid email
    'user.name@domain.co.uk',     // Valid with subdomains
    'user+tag@example.org',       // Valid with plus sign
    'user@domain',                // Invalid - no TLD
    'user.name@.com',             // Invalid - no domain
    '@domain.com',                // Invalid - no local part
    'user@domain..com',           // Invalid - double dot
    '',                           // Empty (should be valid since validation is optional)
    'valid.email@sub.domain.com'  // Valid complex email
];

emailTestCases.forEach(email => {
    const result = ValidationUtils.validateEmail(email);
    console.log(`Email: ${email.padEnd(25)} | Valid: ${result.isValid} | Message: ${result.errorMessage || 'OK'}`);
});

console.log('\n=== Direct Function Tests ===');

// Test direct function usage
console.log('Direct phone validation:', isValidEgyptianPhoneNumber('+201234567890'));
console.log('Direct email validation:', isValidEmail('test@example.com'));