"use strict";
/**
 * Custom validation functions for phone numbers and email addresses
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtils = void 0;
exports.isValidEgyptianPhoneNumber = isValidEgyptianPhoneNumber;
exports.isValidEmail = isValidEmail;
/**
 * Validates Egyptian phone numbers
 * Supports formats:
 * - Mobile numbers: +20, 020, or 20 followed by 9-10 digits
 * - Landline numbers: +20, 020, or 20 followed by area codes and subscriber numbers
 * - Formats like +20-XX-XXXXXXX or +20XXXXXXXXX
 * @param phoneNumber The phone number to validate
 * @returns true if valid, false otherwise
 */
function isValidEgyptianPhoneNumber(phoneNumber) {
    if (!phoneNumber)
        return true; // Optional validation - empty values are valid
    // Remove all spaces, hyphens, and parentheses for standardization
    const cleanedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    // Regular expression for Egyptian phone numbers
    // Supports:
    // - +20XXXXXXXXX (with country code)
    // - 020XXXXXXXX (with leading zero)
    // - 20XXXXXXXX (without leading zero)
    // - Various separator formats
    const egyptianPhoneRegex = /^(\+2|02)?0?[1-9]\d{8,9}$/;
    // Check if the cleaned number matches the pattern
    if (egyptianPhoneRegex.test(cleanedNumber)) {
        // Additional check: if it starts with +20 or 020, ensure it has the right length
        const normalizedNumber = cleanedNumber.startsWith('+2') ? cleanedNumber.substring(1) :
            cleanedNumber.startsWith('02') ? cleanedNumber.substring(2) :
                cleanedNumber;
        // Egyptian numbers typically are 11 digits (20 + 9 digits) or 10 digits (2 + 8 digits after removing 0)
        if (normalizedNumber.length === 11 && normalizedNumber.startsWith('20')) {
            return true;
        }
        else if (normalizedNumber.length === 10 && normalizedNumber.startsWith('2')) {
            return true;
        }
    }
    // Alternative pattern for landline numbers with area codes
    // More comprehensive regex that handles various Egyptian number formats
    const alternativePattern = /^(\+20|20|020)[1-9]\d{7,8}$/;
    if (alternativePattern.test(cleanedNumber)) {
        return true;
    }
    // Handle formatted numbers like +20-XX-XXXXXXX
    const formattedPattern = /^\+20-?\d{2}-?\d{7,8}$/;
    if (formattedPattern.test(phoneNumber)) {
        return true;
    }
    return false;
}
/**
 * Validates email addresses
 * Checks for proper email format including:
 * - Valid email structure with @ symbol and domain
 * - Proper domain format with TLD
 * - Appropriate character restrictions
 * @param email The email address to validate
 * @returns true if valid, false otherwise
 */
function isValidEmail(email) {
    if (!email)
        return true; // Optional validation - empty values are valid
    // Regular expression for email validation
    // Based on RFC 5322 standard with some practical limitations
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}
/**
 * Validation utility object containing both validation functions
 */
exports.ValidationUtils = {
    /**
     * Validates a phone number (Egyptian format)
     * @param phoneNumber The phone number to validate
     * @returns Object with validity and error message
     */
    validatePhone: (phoneNumber) => {
        const isValid = isValidEgyptianPhoneNumber(phoneNumber);
        return {
            isValid,
            errorMessage: isValid ? null : 'Please enter a valid Egyptian phone number (e.g., +201234567890)'
        };
    },
    /**
     * Validates an email address
     * @param email The email address to validate
     * @returns Object with validity and error message
     */
    validateEmail: (email) => {
        const isValid = isValidEmail(email);
        return {
            isValid,
            errorMessage: isValid ? null : 'Please enter a valid email address'
        };
    }
};
