// Save all types of errors for future checkes
const errorsStore = [
    // AUTH - SIGNUP / LOGIN
    'general_argument_invalid', // This element will be linked to a custom error return in checkOnAuthErrors.ts
    'user_password_mismatch',
    'password_recently_used',
    'password_personal_data',
    'user_phone_not_found',
    'user_missing_id',
    'user_oauth2_bad_request',
    'user_jwt_invalid',
    'user_blocked',
    'user_invalid_token',
    'user_email_not_whitelisted',
    'user_invalid_code',
    'user_ip_not_whitelisted',
    'user_invalid_credentials',
    'user_anonymous_console_prohibited',
    'user_session_already_exists',
    'user_unauthorized',
    'user_oauth2_unauthorized',
    'team_invalid_secret',
    'team_invite_mismatch',
    'user_not_found',
    'user_session_not_found',
    'user_identity_not_found',
    'team_not_found',
    'team_invite_not_found',
    'team_membership_mismatch',
    'membership_not_found',
    'user_already_exists',
    'user_email_already_exists',
    'user_phone_already_exists',
    'team_invite_already_exists',
    'team_already_exists',
    'membership_already_confirmed',
    'user_password_reset_required',
    'user_oauth2_provider_error',
    'user_count_exceeded',
    'user_auth_method_unsupported'
];

export default errorsStore;