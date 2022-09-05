export const TOKEN_NAME = 'token';
export const VERIFICATION_TOKEN_NAME = 'verified';

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        CURRENT_USER: '/auth/current-user',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        MASTER_PASSWORD: {
            CHECK: '/auth/check-master-password',
            GENERATE: '/auth/generate-master-password',
        },
    },
    DASHBOARD: {
        COMMON: '/common/dashboard',
    },
    FOCUS: '/focuses',
    IDEAS: {
        GET: '/ideas/get',
        ADD: '/ideas/add',
        UPDATE: '/ideas/update',
        DELETE: '/ideas/delete',
    },
    JOURNALS: {
        GET: '/journals/get',
        ADD: '/journals/add',
        UPDATE: '/journals/update',
    },
    PERSONAL: {
        GET: '/personal',
        CREATE: '/personal/create',
    },
};
